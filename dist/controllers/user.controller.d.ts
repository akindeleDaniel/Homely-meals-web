import { Controller } from "tsoa";
import { Order as OrderDTO } from "../interfaces/order.interface";
import { DeliveryArea } from "../constants/delivery";
import { Protein, Combo } from "../services/cart.service";
export declare class MainController extends Controller {
    private auth;
    register(b: any): Promise<{
        message: string;
    }>;
    login(b: any): Promise<{
        message: string;
        token?: undefined;
    } | {
        token: string;
        message?: undefined;
    }>;
    addCart(b: {
        proteins?: Protein[];
        combo?: Combo;
    }, r: any): import("../services/cart.service").Cart;
    createOrder(req: any, body: {
        deliveryType: "pickup" | "delivery";
        deliveryArea?: DeliveryArea;
        deliveryAddress?: string;
    }, r: any): Promise<OrderDTO>;
}
//# sourceMappingURL=user.controller.d.ts.map