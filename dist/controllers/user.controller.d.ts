import { Controller } from "tsoa";
import { proteinItems, comboItems } from "../services/cart.service";
import type { OrderDTO } from "../interfaces/order.interface";
interface LoginRequest {
    email: string;
    password: string;
}
export declare class MainController extends Controller {
    private authenticate;
    register(body: {
        email: string;
        password: string;
        firstName: string;
        lastName: string;
        phoneNumber: string;
    }): Promise<{
        message: string;
    }>;
    login(body: LoginRequest): Promise<{
        message: string;
        token: string;
        user: {
            id: string;
            fullName: string;
        };
    }>;
    welcome(): Promise<{
        message: string;
    }>;
    addCart(req: any, body: {
        proteins?: proteinItems[];
        combos?: comboItems[];
    }): Promise<{
        items: {
            proteins?: proteinItems[];
            combos?: comboItems[];
        };
        subtotal: number;
        currency: string;
        itemsText: string;
    }>;
    getCart(req: any): Promise<{
        items: {
            proteins: {
                name: import("../constants/prices").Protein;
                quantity: number;
            }[] | undefined;
            combos: {
                name: import("../constants/prices").Combo;
                quantity: number;
            }[] | undefined;
        };
        subtotal: number;
        currency: string;
        itemsText: string;
    }>;
    checkout(req: any, body: OrderDTO): Promise<{
        paymentUrl: string;
        orderRef: string;
    }>;
    placeOrder(req: any, body: OrderDTO & {
        orderRef: string;
    }): Promise<{
        message: string;
    }>;
}
export {};
//# sourceMappingURL=user.controller.d.ts.map