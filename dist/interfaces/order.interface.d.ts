import { CartItem } from "./cart.interface";
export interface Order {
    id: string;
    phoneNumber: string;
    items: CartItem;
    subtotal: number;
    deliveryFee: number;
    total: number;
    status: "pending" | "confirmed" | "delivered";
    deliveryType: "pickup" | "delivery";
    deliveryAddress?: string;
    pickupLocation?: string;
    deliveryWindow?: string;
    createdAt: Date;
}
//# sourceMappingURL=order.interface.d.ts.map