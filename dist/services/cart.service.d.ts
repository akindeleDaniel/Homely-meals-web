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
    static getCart(userId: string): Promise<{
        items: {
            proteins: {
                name: Protein;
                quantity: number;
            }[] | undefined;
            combos: {
                name: Combo;
                quantity: number;
            }[] | undefined;
        };
        subtotal: number;
        currency: string;
        itemsText: string;
    }>;
    static add(userId: string, input: {
        proteins?: proteinItems[];
        combos?: comboItems[];
    }): Promise<{
        items: {
            proteins?: proteinItems[];
            combos?: comboItems[];
        };
        subtotal: number;
        currency: string;
        itemsText: string;
    }>;
    static get(userId: string): Promise<{
        items: {
            proteins: {
                name: Protein;
                quantity: number;
            }[] | undefined;
            combos: {
                name: Combo;
                quantity: number;
            }[] | undefined;
        };
        subtotal: number;
        currency: string;
        itemsText: string;
    }>;
    static clear(userId: string): Promise<void>;
}
//# sourceMappingURL=cart.service.d.ts.map