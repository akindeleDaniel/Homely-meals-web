import OrderSchema from "../models/order.models";
import { DELIVERY_FEES, DELIVERY_WINDOW, DeliveryArea } from "../constants/delivery";

interface CreateOrderInput {
  userEmail: string;
  phoneNumber: string;
  cart: any;
  deliveryType: "pickup" | "delivery";
  deliveryArea?: DeliveryArea;
  deliveryAddress?: string;
}

export const createOrder = async (input: CreateOrderInput) => {
  let fee = 0;

  if (input.deliveryType === "delivery") {
    if (!input.deliveryArea || !input.deliveryAddress) {
      throw new Error("Delivery info required");
    }
    fee = DELIVERY_FEES[input.deliveryArea];
  }

  const order = await OrderSchema.create({
    userEmail: input.userEmail,
    phoneNumber: input.phoneNumber,
    items: input.cart,
    subtotal: input.cart.subtotal,
    deliveryFee: fee,
    total: input.cart.subtotal + fee,
    deliveryType: input.deliveryType,
    deliveryAddress: input.deliveryAddress,
    pickupLocation:
      input.deliveryType === "pickup" ? "Perfect Touch (GK)" : undefined,
    deliveryWindow: DELIVERY_WINDOW,
    status: "pending",
  });

  return {
    id: order._id.toString(),
    phoneNumber: order.phoneNumber,
    items: order.items,
    subtotal: order.subtotal,
    deliveryFee: order.deliveryFee,
    total: order.total,
    status: order.status,
    deliveryType: order.deliveryType,
    deliveryAddress: order.deliveryAddress,
    pickupLocation: order.pickupLocation,
    deliveryWindow: order.deliveryWindow,
    createdAt: order.createdAt,
  };
};
