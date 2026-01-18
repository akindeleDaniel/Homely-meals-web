import OrderSchema from "../models/order.models";
import { DELIVERY_FEES, DELIVERY_WINDOW, DeliveryArea } from "../constants/delivery";
import { CartService } from "./cart.service";
import { OrderDTO, OrderItems } from "../interfaces/order.interface";

export const createOrder = async (data:OrderDTO
):Promise<OrderDTO & {
  items:{
    proteins:{name:string; quantity:number}[]
    combos:{name:string; quantity:number}[]
  }
  subtotal:number;
  deliveryFee:number;
  total: number;
  status:string;
  pickupLocation?:string;
  deliveryWindow:string;
  createdAt:Date;
}> =>{
  const cart = CartService.get();
  let deliveryFee = 0;

  if (data.deliveryType === "delivery") {
    if (!data.deliveryArea || !data.deliveryAddress) {
      throw new Error("Delivery address and area required");
    }
    deliveryFee = DELIVERY_FEES[data.deliveryArea];
  }

  const total = cart.subtotal + deliveryFee;

  const order = await OrderSchema.create({
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
    status: "pending",
  });

  CartService.clear();

  const items = order.items as OrderItems

  return {
    phoneNumber: order.phoneNumber,
    items: {
      proteins:
        items.proteins?.map(p => ({
          name: p.name!,
          quantity: p.quantity!,
        })) ?? [],
      combos:
        items.combos?.map(c => ({
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
