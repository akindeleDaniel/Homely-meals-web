import { CartItem } from "../interfaces/cart.interface";
import { PROTEIN_PRICES, COMBO_PRICES } from "../constants/prices";
export interface AddToCartRequest {
    proteins?: (keyof typeof PROTEIN_PRICES)[];
    combo?: keyof typeof COMBO_PRICES;
}
export declare class CartService {
    private static carts;
    static add(email: string, body: AddToCartRequest): CartItem;
    static get(email: string): CartItem | null;
    static clear(email: string): void;
}
//# sourceMappingURL=cart.service.d.ts.map