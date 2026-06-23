import OrderSchema from "../models/order.models";
import User from "../models/user.models";
import { DELIVERY_FEES, DELIVERY_WINDOW } from "../constants/delivery";
import { CURRENCY } from "../constants/prices";
import { CartService, Cart } from "./cart.service";
import { OrderDTO, OrderItems } from "../interfaces/order.interface";

export const ORDER_STATUSES = ["pending", "paid", "preparing", "ready", "delivered"] as const;
export type OrderStatus = (typeof ORDER_STATUSES)[number];

type CreatedOrder = OrderDTO & {
  id: string;
  paymentReference?: string;
  items: {
    plates: number;
    proteins: { name: string; quantity: number }[];
    combos: { name: string; quantity: number }[];
  };
  subtotal: number;
  deliveryFee: number;
  total: number;
  currency: string;
  status: string;
  pickupLocation?: string;
  deliveryWindow: string;
  createdAt: Date;
};

const normalizeOrderItems = (items: OrderItems = {}) => {
  return {
    plates: items.plates ?? 0,
    proteins:
      items.proteins?.map((item) => ({
        name: item.name,
        quantity: item.quantity,
      })) ?? [],
    combos:
      items.combos?.map((item) => ({
        name: item.name,
        quantity: item.quantity,
      })) ?? [],
  };
};

const formatOrder = (order: any, email?: string): CreatedOrder => {
  const items = normalizeOrderItems(order.items as OrderItems);

  return {
    id: order._id.toString(),
    email: email ?? order.userEmail ?? "",
    paymentReference: order.paymentReference ?? undefined,
    phoneNumber: order.phoneNumber,
    items,
    subtotal: order.subtotal,
    deliveryType: order.deliveryType,
    deliveryAddress: order.deliveryAddress ?? undefined,
    deliveryArea: undefined,
    pickupLocation: order.pickupLocation ?? undefined,
    deliveryFee: order.deliveryFee,
    total: order.total,
    currency: order.currency ?? CURRENCY,
    status: order.status,
    deliveryWindow: order.deliveryWindow ?? DELIVERY_WINDOW,
    createdAt: order.createdAt,
  };
};

export const formatOrderItemsText = (items: CreatedOrder["items"] | Cart["items"]) => {
  return [
    items.plates > 0 ? `${items.plates} x Stir-Fried Spaghetti` : "",
    ...(items.proteins ?? []).map((item) => `${item.quantity} x ${item.name}`),
    ...(items.combos ?? []).map((item) => `${item.quantity} x ${item.name}`),
  ]
    .filter(Boolean)
    .join(", ");
};

export const createOrder = async (
  data: OrderDTO & { userId?: string; cart: Cart; paymentReference?: string }
): Promise<CreatedOrder> => {
  if (data.paymentReference) {
    const existing = await OrderSchema.findOne({ paymentReference: data.paymentReference });
    if (existing) {
      return formatOrder(existing, data.email);
    }
  }

  const cart = data.cart;
  if (!cart || !cart.items || CartService.isEmpty(cart)) {
    throw new Error("Cart is empty");
  }

  let deliveryFee = 0;

  if (data.deliveryType === "delivery") {
    if (!data.deliveryArea || !data.deliveryAddress) {
      throw new Error("Delivery address and area required");
    }
    deliveryFee = DELIVERY_FEES[data.deliveryArea];
  }

  const total = cart.subtotal + deliveryFee;

  const order = await OrderSchema.create({
    userId: data.userId,
    userEmail: data.email,
    paymentReference: data.paymentReference,
    phoneNumber: data.phoneNumber,
    items: cart.items,
    subtotal: cart.subtotal,
    currency: cart.currency || CURRENCY,
    deliveryType: data.deliveryType,
    deliveryFee,
    deliveryAddress: data.deliveryType === "delivery" ? data.deliveryAddress : undefined,
    pickupLocation: data.deliveryType === "pickup" ? "Perfect Touch (GK)" : undefined,
    total,
    deliveryWindow: DELIVERY_WINDOW,
    status: "paid",
  });

  if (data.userId) {
    await User.findByIdAndUpdate(data.userId, {
      $push: { orders: order._id },
    });
    await CartService.clear(data.userId);
  }

  return formatOrder(order, data.email);
};

export const createOrderFromPaystackMetadata = async (
  reference: string,
  metadata: Record<string, any>,
  customerEmail?: string
): Promise<CreatedOrder> => {
  const email = metadata.email ?? customerEmail;
  if (!email || !metadata.phoneNumber || !metadata.deliveryType || !metadata.items) {
    throw new Error("Paystack metadata is incomplete");
  }

  const cart: Cart = {
    items: {
      plates: metadata.items.plates ?? 0,
      proteins: metadata.items.proteins ?? [],
      combos: metadata.items.combos ?? [],
    },
    subtotal: Number(metadata.subtotal ?? 0),
    currency: CURRENCY,
    itemsText: "",
  };

  return createOrder({
    userId: metadata.userId,
    cart,
    email,
    phoneNumber: metadata.phoneNumber,
    deliveryType: metadata.deliveryType,
    deliveryArea: metadata.deliveryArea,
    deliveryAddress: metadata.deliveryAddress,
    paymentReference: reference,
  });
};
