import { Controller } from "tsoa";
interface AdminLoginRequest {
    email: string;
    password: string;
}
interface updateOrderStatusRequest {
    status: "pending" | "confirmed" | "delivered";
}
export declare class AdminController extends Controller {
    private verifyAdmin;
    login(body: AdminLoginRequest): Promise<{
        message: string;
        token?: undefined;
    } | {
        message: string;
        token: string;
    }>;
    updateOrderStatus(orderId: string, req: any, body: updateOrderStatusRequest): Promise<{
        message: string;
        order?: undefined;
    } | {
        message: string;
        order: import("mongoose").Document<unknown, {}, {
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
        };
    }>;
    getAllOrders(req: any): Promise<{
        id: string;
        phoneNumber: string;
        items: any;
        subtotal: number | null | undefined;
        deliveryFee: number | null | undefined;
        total: number | null | undefined;
        status: "pending" | "confirmed" | "delivered";
        deliveryType: "pickup" | "delivery" | null | undefined;
        deliveryAddress: string | undefined;
        pickupLocation: string | undefined;
        deliveryWindow: string | null | undefined;
        createdAt: NativeDate;
    }[]>;
}
export {};
//# sourceMappingURL=admin.controller.d.ts.map