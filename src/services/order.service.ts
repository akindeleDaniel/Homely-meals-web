import orderModel from "../models/order.models";
import { DELIVERY_FEES, DELIVERY_WINDOW, DeliveryArea} from "../constants/delivery";

interface PlaceOrderBody {
    deliveryType: "pickup" | "delivery";
    deliveryArea?: DeliveryArea;
    deliveryAddress?: string;
}

export const OrderService = async (
  user: any,
  cart: any,
  body: PlaceOrderBody
) => {
  let deliveryFee = 0;

  if (body.deliveryType === "delivery") {
      if (!body.deliveryAddress || !body.deliveryArea) {
          throw new Error("Delivery address required");
        }
        deliveryFee = DELIVERY_FEES[body.deliveryArea];
      }

  return orderModel.create({
    userEmail: user.email,
    phoneNumber: user.phoneNumber,
    items: cart,
    subtotal: cart.subtotal,
    deliveryFee,
    total: cart.subtotal + deliveryFee,
    deliveryType: body.deliveryType,
    deliveryAddress: body.deliveryAddress,
    pickupLocation:
      body.deliveryType === "pickup" ? "Perfect Touch (GK)" : undefined,
    deliveryWindow: DELIVERY_WINDOW,
    status: "pending",
  });
};
