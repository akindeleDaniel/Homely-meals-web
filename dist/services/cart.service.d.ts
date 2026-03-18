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
    static getCart(userId: string): Promise<import("mongoose").Document<unknown, {}, {
        userId: import("mongoose").Types.ObjectId;
        subtotal: number;
        items?: {
            proteins: import("mongoose").Types.DocumentArray<{
                name?: string | null | undefined;
                quantity?: number | null | undefined;
            }, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, {
                name?: string | null | undefined;
                quantity?: number | null | undefined;
            }> & {
                name?: string | null | undefined;
                quantity?: number | null | undefined;
            }>;
            combos: import("mongoose").Types.DocumentArray<{
                name?: string | null | undefined;
                quantity?: number | null | undefined;
            }, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, {
                name?: string | null | undefined;
                quantity?: number | null | undefined;
            }> & {
                name?: string | null | undefined;
                quantity?: number | null | undefined;
            }>;
        } | null | undefined;
    } & import("mongoose").DefaultTimestampProps, {
        id: string;
    }, {
        timestamps: true;
    }> & Omit<{
        userId: import("mongoose").Types.ObjectId;
        subtotal: number;
        items?: {
            proteins: import("mongoose").Types.DocumentArray<{
                name?: string | null | undefined;
                quantity?: number | null | undefined;
            }, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, {
                name?: string | null | undefined;
                quantity?: number | null | undefined;
            }> & {
                name?: string | null | undefined;
                quantity?: number | null | undefined;
            }>;
            combos: import("mongoose").Types.DocumentArray<{
                name?: string | null | undefined;
                quantity?: number | null | undefined;
            }, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, {
                name?: string | null | undefined;
                quantity?: number | null | undefined;
            }> & {
                name?: string | null | undefined;
                quantity?: number | null | undefined;
            }>;
        } | null | undefined;
    } & import("mongoose").DefaultTimestampProps & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    static add(input: {
        proteins?: proteinItems[];
        combos?: comboItems[];
    }): Cart;
    static get(): Cart;
    static clear(): void;
}
//# sourceMappingURL=cart.service.d.ts.map