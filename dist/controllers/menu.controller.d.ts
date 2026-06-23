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
            price: 500 | 1000 | 1500;
        }[];
        combos: {
            name: string;
            price: 4500 | 4000 | 2500 | 3000 | 3500;
        }[];
    }>;
}
//# sourceMappingURL=menu.controller.d.ts.map