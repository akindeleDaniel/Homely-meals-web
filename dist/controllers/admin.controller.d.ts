import { Controller } from "tsoa";
export declare class AdminController extends Controller {
    private auth;
    login(b: any): Promise<{
        message: string;
        token?: undefined;
    } | {
        token: string;
        message?: undefined;
    }>;
    get(r: any): Promise<{
        id: string;
        phoneNumber: string;
        items: any;
        subtotal: number;
        deliveryFee: number;
        total: number;
        status: string;
        deliveryType: "pickup" | "delivery";
        deliveryAddress: string | undefined;
        pickupLocation: string | undefined;
        deliveryWindow: string | undefined;
        createdAt: NativeDate;
    }[]>;
    update(id: string, b: any, r: any): Promise<{
        id: string;
        phoneNumber: string;
        items: any;
        subtotal: number;
        deliveryFee: number;
        total: number;
        status: string;
        deliveryType: "pickup" | "delivery";
        deliveryAddress: string | null | undefined;
        pickupLocation: string | null | undefined;
        deliveryWindow: string | null | undefined;
        createdAt: NativeDate;
    }>;
}
//# sourceMappingURL=admin.controller.d.ts.map