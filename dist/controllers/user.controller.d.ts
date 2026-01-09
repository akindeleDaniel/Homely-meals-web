import { Controller } from "tsoa";
import { Order as OrderDTO } from "../interfaces/order.interface";
import { DeliveryArea } from "../constants/delivery";
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
    addCart(b: any, r: any): any;
    place(b: {
        deliveryType: "pickup" | "delivery";
        deliveryArea?: DeliveryArea;
        deliveryAddress?: string;
    }, r: any): Promise<OrderDTO>;
}
//# sourceMappingURL=user.controller.d.ts.map