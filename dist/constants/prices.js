"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCombo = exports.isProtein = exports.COMBO_PRICES = exports.PROTEIN_PRICES = exports.BASE_PRICE = exports.CURRENCY = void 0;
exports.CURRENCY = "₦";
exports.BASE_PRICE = 2000;
exports.PROTEIN_PRICES = {
    Egg: 500,
    Beef: 1000,
    Fish: 1000,
    "Plantain + Fish": 1500,
    Chicken: 1500,
    Sardine: 1500,
    Coleslaw: 500,
};
exports.COMBO_PRICES = {
    "Stir-Fried Spag + Sardine & Fried Fish": 4500,
    "Stir-Fried Spag + Egg & Fried Fish": 4000,
    "Stir-Fried Spag + Egg": 2500,
    "Stir-Fried Spag + Beef": 3000,
    "Stir-Fried Spag + Fish & Plantain": 3500,
    "Stir-Fried Spag + Dodo & Beef": 3500,
};
const isProtein = (value) => {
    return value in exports.PROTEIN_PRICES;
};
exports.isProtein = isProtein;
const isCombo = (value) => {
    return value in exports.COMBO_PRICES;
};
exports.isCombo = isCombo;
//# sourceMappingURL=prices.js.map