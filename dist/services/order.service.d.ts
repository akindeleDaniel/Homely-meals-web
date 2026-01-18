import { Orderdto } from "../interfaces/order.interface";
export declare const createOrder: (data: Orderdto) => Promise<Orderdto & {
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
    deliveryFee: number;
    total: number;
    status: string;
    pickupLocation?: string;
    deliveryWindow: string;
    createdAt: Date;
}>;
//# sourceMappingURL=order.service.d.ts.map