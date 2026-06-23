import { Combo, Protein } from "../constants/prices";
export type proteinItems = {
    name: Protein;
    quantity: number;
};
export type comboItems = {
    name: Combo;
    quantity: number;
};
export interface CartItemsInput {
    plates?: number;
    proteins?: proteinItems[];
    combos?: comboItems[];
}
export interface Cart {
    items: {
        plates: number;
        proteins: proteinItems[];
        combos: comboItems[];
    };
    subtotal: number;
    currency: string;
    itemsText: string;
}
export declare class CartService {
    static getCart(userId: string): Promise<Cart>;
    static add(userId: string, input: CartItemsInput): Promise<Cart>;
    static replace(userId: string, input: CartItemsInput): Promise<Cart>;
    static get(userId: string): Promise<Cart>;
    static clear(userId: string): Promise<void>;
    static isEmpty(cart: Cart): boolean;
}
//# sourceMappingURL=cart.service.d.ts.map