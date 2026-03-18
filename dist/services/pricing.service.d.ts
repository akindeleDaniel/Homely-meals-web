import { DeliveryArea } from "../constants/delivery";
import { Cart } from "./cart.service";
export type PricingResult = {
    subtotal: number;
    deliveryFee: number;
    total: number;
};
export declare const calculateOrderTotals: (cart: Cart, deliveryType: "pickup" | "delivery", deliveryArea?: DeliveryArea) => PricingResult;
//# sourceMappingURL=pricing.service.d.ts.map