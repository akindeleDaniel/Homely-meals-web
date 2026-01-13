import OrderSchema from "../models/order.models";
import { DELIVERY_FEES, DELIVERY_WINDOW, DeliveryArea } from "../constants/delivery";
import { CartService } from "./cart.service";

interface CreateOrderInput {
  phoneNumber: string;
  deliveryType: "pickup" | "delivery";
  deliveryArea?: DeliveryArea;
  deliveryAddress?: string;
}

export const createOrder = async (input: CreateOrderInput) => {
  const cart = CartService.get();
  let deliveryFee = 0;

  if (input.deliveryType === "delivery") {
    if (!input.deliveryArea || !input.deliveryAddress) {
      throw new Error("Delivery address and area required");
    }
    deliveryFee = DELIVERY_FEES[input.deliveryArea];
  }

  const total = cart.subtotal + deliveryFee;

  const order = await OrderSchema.create({
    phoneNumber: input.phoneNumber,
    items: cart.items,
    subtotal: cart.subtotal,
    deliveryType: input.deliveryType,
    deliveryFee,
    deliveryAddress: input.deliveryAddress,
    pickupLocation:
    input.deliveryType === "pickup" ? "Perfect Touch (GK)" : undefined,
    total,
    deliveryWindow: DELIVERY_WINDOW,
    status: "pending",
  });

  CartService.clear();

  return {
    phoneNumber: order.phoneNumber,
    items: order.items,
    subtotal: order.subtotal,
    deliveryType: order.deliveryType,
    deliveryAddress: order.deliveryAddress,
    pickupLocation: order.pickupLocation,
    deliveryFee: order.deliveryFee,
    total: order.total,
    status: order.status,
    deliveryWindow: order.deliveryWindow,
    createdAt: order.createdAt,
  };
};
