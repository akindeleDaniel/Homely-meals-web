import { DeliveryArea } from "../constants/delivery";
interface PlaceOrderBody {
    deliveryType: "pickup" | "delivery";
    deliveryArea?: DeliveryArea;
    deliveryAddress?: string;
}
export declare const OrderService: (user: any, cart: any, body: PlaceOrderBody) => Promise<import("mongoose").Document<unknown, {}, {
    phoneNumber: string;
    userEmail: string;
    items: any;
    status: "pending" | "confirmed" | "delivered";
    subtotal?: number | null | undefined;
    deliveryFee?: number | null | undefined;
    total?: number | null | undefined;
    deliveryAddress?: string | null | undefined;
    pickupLocation?: string | null | undefined;
    deliveryWindow?: string | null | undefined;
    deliveryType?: "pickup" | "delivery" | null | undefined;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    phoneNumber: string;
    userEmail: string;
    items: any;
    status: "pending" | "confirmed" | "delivered";
    subtotal?: number | null | undefined;
    deliveryFee?: number | null | undefined;
    total?: number | null | undefined;
    deliveryAddress?: string | null | undefined;
    pickupLocation?: string | null | undefined;
    deliveryWindow?: string | null | undefined;
    deliveryType?: "pickup" | "delivery" | null | undefined;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}>;
export {};
//# sourceMappingURL=order.service.d.ts.map