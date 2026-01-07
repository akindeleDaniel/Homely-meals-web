import { Controller } from "tsoa";
export declare class MenuController extends Controller {
    getHome(): Promise<{
        headline: string;
        subtext: string;
        orderButtonText: string;
        baseMeal: {
            name: string;
            price: number;
            currency: string;
        };
        deliveryInfo: {
            window: string;
            note: string;
        };
        proteins: {
            name: string;
            price: number;
        }[];
        combos: {
            name: string;
            price: number;
        }[];
    }>;
}
//# sourceMappingURL=menu.controller.d.ts.map