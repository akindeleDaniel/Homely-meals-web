import { Cart } from "./cart.service";
import { OrderDTO } from "../interfaces/order.interface";
export declare const createOrder: (data: OrderDTO & {
    userId?: string;
    cart: Cart;
}) => Promise<OrderDTO & {
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