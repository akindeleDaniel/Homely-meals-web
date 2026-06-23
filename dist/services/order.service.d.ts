import { Cart } from "./cart.service";
import { OrderDTO } from "../interfaces/order.interface";
export declare const ORDER_STATUSES: readonly ["pending", "paid", "preparing", "ready", "delivered"];
export type OrderStatus = (typeof ORDER_STATUSES)[number];
type CreatedOrder = OrderDTO & {
    id: string;
    paymentReference?: string;
    items: {
        plates: number;
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
    currency: string;
    status: string;
    pickupLocation?: string;
    deliveryWindow: string;
    createdAt: Date;
};
export declare const formatOrderItemsText: (items: CreatedOrder["items"] | Cart["items"]) => string;
export declare const createOrder: (data: OrderDTO & {
    userId?: string;
    cart: Cart;
    paymentReference?: string;
}) => Promise<CreatedOrder>;
export declare const createOrderFromPaystackMetadata: (reference: string, metadata: Record<string, any>, customerEmail?: string) => Promise<CreatedOrder>;
export {};
//# sourceMappingURL=order.service.d.ts.map