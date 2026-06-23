import { Controller } from "tsoa";
export declare class AdminController extends Controller {
    private auth;
    register(body: {
        name: string;
        email: string;
        password: string;
    }): Promise<{
        message: string;
    }>;
    login(body: {
        email: string;
        password: string;
    }): Promise<{
        token: string;
        admin: {
            name: string;
            email: string | null | undefined;
        };
        message: string;
    }>;
    get(req: any): Promise<{
        id: any;
        userEmail: any;
        paymentReference: any;
        phoneNumber: any;
        items: any;
        subtotal: any;
        currency: any;
        deliveryFee: any;
        total: any;
        status: any;
        deliveryType: any;
        deliveryAddress: any;
        pickupLocation: any;
        deliveryWindow: any;
        createdAt: any;
        updatedAt: any;
    }[]>;
    update(id: string, body: {
        status: string;
    }, req: any): Promise<{
        id: string;
        userEmail: string | null | undefined;
        paymentReference: string | null | undefined;
        phoneNumber: string;
        items: any;
        subtotal: number;
        currency: string;
        deliveryFee: number;
        total: number;
        status: string;
        deliveryType: "pickup" | "delivery";
        deliveryAddress: string | null | undefined;
        pickupLocation: string | null | undefined;
        deliveryWindow: string | null | undefined;
        createdAt: NativeDate;
        updatedAt: NativeDate;
    }>;
}
//# sourceMappingURL=admin.controller.d.ts.map