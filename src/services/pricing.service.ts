import { DELIVERY_FEES, DeliveryArea } from "../constants/delivery";
import { Cart } from "./cart.service";

export type PricingResult = {
  subtotal: number;
  deliveryFee: number;
  total: number;
};

export const calculateOrderTotals = (
  cart: Cart,
  deliveryType: "pickup" | "delivery",
  deliveryArea?: DeliveryArea
): PricingResult => {

  let deliveryFee = 0;

  if (deliveryType === "delivery") {
    if (!deliveryArea) {
      throw new Error("Delivery area required");
    }
    deliveryFee = DELIVERY_FEES[deliveryArea];
  }

  const total = cart.subtotal + deliveryFee;

  return {
    subtotal: cart.subtotal,
    deliveryFee,
    total
  };
};
