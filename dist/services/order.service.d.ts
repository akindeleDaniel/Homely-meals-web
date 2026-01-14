import { OrderDTO } from "../interfaces/order.interface";
export declare const createOrder: (data: OrderDTO) => Promise<{
    phoneNumber: string;
    items: {
        proteins: {
            name: string;
            quantity: number;
        }[];
        combos: {
            name: string;
            quantity: number;
        }[];
    };
    subtotal: number;
    deliveryType: "pickup" | "delivery";
    deliveryAddress: string | undefined;
    pickupLocation: string | undefined;
    deliveryFee: number;
    total: number;
    status: string;
    deliveryWindow: string;
    createdAt: NativeDate;
}>;
//# sourceMappingURL=order.service.d.ts.map