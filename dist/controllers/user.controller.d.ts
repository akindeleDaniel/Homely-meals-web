import { Controller } from "tsoa";
import { Order } from "../interfaces/order.interface";
import { CartItem } from "../interfaces/cart.interface";
interface RegisterRequest {
    firstName: string;
    email: string;
    password: string;
    lastName: string;
    phoneNumber: string;
}
interface LoginRequest {
    email: string;
    password: string;
}
interface AddToCartRequest {
    proteins?: string[];
    combo?: string;
}
interface PlaceOrderRequest {
    deliveryType: "pickup" | "delivery";
    deliveryAddress?: string;
    deliveryArea?: "gk" | "outside-gk";
}
export declare class MainController extends Controller {
    private static carts;
    private verifyToken;
    private isOrderWindowOpen;
    getLanding(): Promise<{
        message: string;
        actions: {
            type: string;
            text: string;
            link: string;
        }[];
        deliveryWindow: string;
        deliveryFees: {
            gk: number;
            "outside-gk": number;
        };
    }>;
    register(body: RegisterRequest): Promise<{
        message: string;
        user?: undefined;
    } | {
        message: string;
        user: {
            email: string;
            firstName: string;
            lastName: string;
        };
    }>;
    login(body: LoginRequest): Promise<{
        message: string;
        token?: string;
    }>;
    addToCart(body: AddToCartRequest, req: any): Promise<CartItem>;
    getCart(req: any): Promise<CartItem | {
        message: string;
    }>;
    clearCart(req: any): Promise<{
        message: string;
    }>;
    placeOrder(body: PlaceOrderRequest, req: any): Promise<Order | {
        message: string;
    }>;
}
export {};
//# sourceMappingURL=user.controller.d.ts.map