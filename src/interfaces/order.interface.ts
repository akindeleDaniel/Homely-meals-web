import { DeliveryArea } from "../constants/delivery";

export interface OrderItem {
  name: string;
  quantity: number;
}

export interface OrderItems {
  proteins: OrderItem[];
  combos: OrderItem[];
}

export interface OrderDTO {
  phoneNumber: string;
    deliveryType: "pickup" | "delivery";
    deliveryArea?: DeliveryArea;
    deliveryAddress?: string;
}
