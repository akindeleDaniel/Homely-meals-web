export declare const BASE_PRICE = 2000;
export declare const PROTEIN_PRICES: {
    readonly Egg: 500;
    readonly Beef: 1000;
    readonly Fish: 1000;
    readonly "Plantain + Fish": 1500;
    readonly Chicken: 1500;
    readonly Sardine: 1500;
    readonly coleslaw: 500;
};
export declare const COMBO_PRICES: {
    readonly "Stir-Fried Spag + Sardine & Fried Fish": 4500;
    readonly "Stir-Fried Spag + Egg & Fried Fish": 4000;
    readonly "Stir-Fried Spag + Egg": 2500;
    readonly "Stir-Fried Spag + Beef": 3000;
    readonly "Stir-Fried Spag + Fish & Plantain": 3500;
    readonly "Stir-Fried Spag + Dodo & Beef": 3500;
};
export type Protein = keyof typeof PROTEIN_PRICES;
export type Combo = keyof typeof COMBO_PRICES;
//# sourceMappingURL=prices.d.ts.map