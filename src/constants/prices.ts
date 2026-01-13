  export const BASE_PRICE = 2000;

  export const PROTEIN_PRICES = {
    Egg: 500,
    Beef: 1000,
    Fish: 1000,
    "Plantain + Fish": 1500,
    Chicken: 1500,
    Sardine: 1500,
    coleslaw: 500,
  } as const;

  export const COMBO_PRICES = {
    "Stir-Fried Spag + Sardine & Fried Fish": 4500,
    "Stir-Fried Spag + Egg & Fried Fish": 4000,
    "Stir-Fried Spag + Egg": 2500,
    "Stir-Fried Spag + Beef": 3000,
    "Stir-Fried Spag + Fish & Plantain": 3500,
    "Stir-Fried Spag + Dodo & Beef": 3500,
  } as const;

  export type Protein = keyof typeof PROTEIN_PRICES;
  export type Combo = keyof typeof COMBO_PRICES;