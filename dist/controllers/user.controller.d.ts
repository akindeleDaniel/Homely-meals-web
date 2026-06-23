import { Controller } from "tsoa";
import type { CartItemsInput } from "../services/cart.service";
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
        token: string;
        user: {
            id: any;
            email: any;
            firstName: any;
            lastName: any;
            phoneNumber: any;
        };
    }>;
    login(body: LoginRequest): Promise<{
        message: string;
        token: string;
        user: {
            id: any;
            email: any;
            firstName: any;
            lastName: any;
            phoneNumber: any;
        };
    }>;
    welcome(): Promise<{
        message: string;
    }>;
    addCart(req: any, body: CartItemsInput): Promise<import("../services/cart.service").Cart>;
    replaceCart(req: any, body: CartItemsInput): Promise<import("../services/cart.service").Cart>;
    getCart(req: any): Promise<import("../services/cart.service").Cart>;
    clearCart(req: any): Promise<{
        message: string;
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