import { PROTEIN_PRICES, COMBO_PRICES } from "../constants/prices";
type Protein = keyof typeof PROTEIN_PRICES;
type Combo = keyof typeof COMBO_PRICES;
interface Cart {
    baseMeal: string;
    proteins?: Protein[];
    combo?: Combo;
    subtotal: number;
    currency: string;
}
export declare class CartService {
    private static carts;
    static get(email: string): Cart | undefined;
    static clear(email: string): void;
    static add(email: string, body: {
        proteins?: Protein[];
        combo?: Combo;
    }): Cart;
}
export {};
//# sourceMappingURL=cart.service.d.ts.map