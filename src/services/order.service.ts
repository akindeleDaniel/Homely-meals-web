import OrderSchema from "../models/order.models";
import User from "../models/user.models";
import { DELIVERY_FEES, DELIVERY_WINDOW, DeliveryArea } from "../constants/delivery";
import { CartService, Cart } from "./cart.service";
import { OrderDTO, OrderItems } from "../interfaces/order.interface";

export const createOrder = async (
  data: OrderDTO & { userId?: string; cart: Cart }
): Promise<
  OrderDTO & {
    items: {
      proteins: { name: string; quantity: number }[];
      combos: { name: string; quantity: number }[];
    };
    subtotal: number;
    deliveryFee: number;
    total: number;
    status: string;
    pickupLocation?: string;
    deliveryWindow: string;
    createdAt: Date;
  }
> => {
  const cart = data.cart;
  if (!cart || !cart.items || cart.subtotal === undefined) {
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
    phoneNumber: data.phoneNumber,
    items: cart.items,
    subtotal: cart.subtotal,
    deliveryType: data.deliveryType,
    deliveryFee,
    deliveryAddress: data.deliveryAddress,
    pickupLocation:
      data.deliveryType === "pickup" ? "Perfect Touch (GK)" : undefined,
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

  const items = order.items as OrderItems;

  return {
    email: data.email,
    phoneNumber: order.phoneNumber,
    items: {
      proteins:
        items.proteins?.map((p) => ({
          name: p.name!,
          quantity: p.quantity!,
        })) ?? [],
      combos:
        items.combos?.map((c) => ({
          name: c.name!,
          quantity: c.quantity!,
        })) ?? [],
    },
    subtotal: order.subtotal,
    deliveryType: order.deliveryType,
    deliveryAddress: order.deliveryAddress ?? undefined,
    pickupLocation: order.pickupLocation ?? undefined,
    deliveryFee: order.deliveryFee,
    total: order.total,
    status: order.status,
    deliveryWindow: order.deliveryWindow ?? DELIVERY_WINDOW,
    createdAt: order.createdAt,
  };
};
