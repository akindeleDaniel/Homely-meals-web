import { Protein, Combo } from "../constants/prices";
export type proteinItems = {
    name: Protein;
    quantity: number;
};
export type comboItems = {
    name: Combo;
    quantity: number;
};
export interface Cart {
    items: {
        proteins?: proteinItems[];
        combos?: comboItems[];
    };
    subtotal: number;
    currency: string;
    itemsText: string;
}
export declare class CartService {
    private static cart;
    static add(input: {
        proteins?: proteinItems[];
        combos?: comboItems[];
    }): Cart;
    static get(): Cart;
    static clear(): void;
}
//# sourceMappingURL=cart.service.d.ts.map