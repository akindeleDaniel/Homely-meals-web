import { DeliveryArea } from "../constants/delivery";
interface CreateOrderInput {
    userEmail: string;
    phoneNumber: string;
    cart: any;
    deliveryType: "pickup" | "delivery";
    deliveryArea?: DeliveryArea;
    deliveryAddress?: string;
}
export declare const createOrder: (input: CreateOrderInput) => Promise<{
    id: string;
    phoneNumber: string;
    items: any;
    subtotal: number;
    deliveryFee: number;
    total: number;
    status: "pending" | "confirmed" | "delivered";
    deliveryType: "pickup" | "delivery";
    deliveryAddress: string | null | undefined;
    pickupLocation: string | null | undefined;
    deliveryWindow: string | null | undefined;
    createdAt: NativeDate;
}>;
export {};
//# sourceMappingURL=order.service.d.ts.map