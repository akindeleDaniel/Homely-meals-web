import { Controller } from "tsoa";
import { proteinItems, comboItems } from "../services/cart.service";
import type { Orderdto } from "../interfaces/order.interface";
export declare class MainController extends Controller {
    register(b: {
        email: string;
        password: string;
        firstName: string;
        lastName: string;
    }): Promise<{
        message: string;
    }>;
    login(body: {
        email: string;
        password: string;
    }): Promise<{
        message: string;
    }>;
    addCart(body: {
        proteins?: proteinItems[];
        combos?: comboItems[];
    }): import("../services/cart.service").Cart;
    placeOrder(body: Orderdto): Promise<{
        message: string;
    }>;
}
//# sourceMappingURL=user.controller.d.ts.map