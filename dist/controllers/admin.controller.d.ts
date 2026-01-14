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
        items: {
            proteins: import("mongoose").Types.DocumentArray<{
                name?: string | null | undefined;
                quantity?: number | null | undefined;
            }, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, {
                name?: string | null | undefined;
                quantity?: number | null | undefined;
            }> & {
                name?: string | null | undefined;
                quantity?: number | null | undefined;
            }>;
            combos: import("mongoose").Types.DocumentArray<{
                name?: string | null | undefined;
                quantity?: number | null | undefined;
            }, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, {
                name?: string | null | undefined;
                quantity?: number | null | undefined;
            }> & {
                name?: string | null | undefined;
                quantity?: number | null | undefined;
            }>;
        } | null | undefined;
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
        items: {
            proteins: import("mongoose").Types.DocumentArray<{
                name?: string | null | undefined;
                quantity?: number | null | undefined;
            }, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, {
                name?: string | null | undefined;
                quantity?: number | null | undefined;
            }> & {
                name?: string | null | undefined;
                quantity?: number | null | undefined;
            }>;
            combos: import("mongoose").Types.DocumentArray<{
                name?: string | null | undefined;
                quantity?: number | null | undefined;
            }, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, {
                name?: string | null | undefined;
                quantity?: number | null | undefined;
            }> & {
                name?: string | null | undefined;
                quantity?: number | null | undefined;
            }>;
        } | null | undefined;
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