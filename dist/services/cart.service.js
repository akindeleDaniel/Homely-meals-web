"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartService = void 0;
const prices_1 = require("../constants/prices");
const cart_model_1 = __importDefault(require("../models/cart.model"));
const assertWholeNumber = (label, value, allowZero = false) => {
    if (!Number.isInteger(value) || value < 0 || (!allowZero && value === 0)) {
        throw new Error(`${label} must be ${allowZero ? "zero or a positive" : "a positive"} whole number`);
    }
};
const mergeByName = (current, incoming) => {
    const map = new Map();
    for (const item of current) {
        map.set(item.name, { ...item });
    }
    for (const item of incoming) {
        const existing = map.get(item.name);
        if (existing) {
            map.set(item.name, { ...existing, quantity: existing.quantity + item.quantity });
        }
        else {
            map.set(item.name, { ...item });
        }
    }
    return [...map.values()];
};
const normalizeItems = (input) => {
    const plates = input.plates ?? 0;
    assertWholeNumber("Plates", plates, true);
    const proteins = (input.proteins ?? []).map((item) => {
        if (!(0, prices_1.isProtein)(item.name)) {
            throw new Error(`Invalid protein: ${item.name}`);
        }
        assertWholeNumber(`Quantity for ${item.name}`, item.quantity);
        return { name: item.name, quantity: item.quantity };
    });
    const combos = (input.combos ?? []).map((item) => {
        if (!(0, prices_1.isCombo)(item.name)) {
            throw new Error(`Invalid combo: ${item.name}`);
        }
        assertWholeNumber(`Quantity for ${item.name}`, item.quantity);
        return { name: item.name, quantity: item.quantity };
    });
    return {
        plates,
        proteins: mergeByName([], proteins),
        combos: mergeByName([], combos),
    };
};
const getSubtotal = (items) => {
    const plateTotal = items.plates * prices_1.BASE_PRICE;
    const proteinTotal = items.proteins.reduce((sum, item) => sum + prices_1.PROTEIN_PRICES[item.name] * item.quantity, 0);
    const comboTotal = items.combos.reduce((sum, item) => sum + prices_1.COMBO_PRICES[item.name] * item.quantity, 0);
    return plateTotal + proteinTotal + comboTotal;
};
const getItemsText = (items) => {
    const parts = [
        items.plates > 0 ? `${items.plates} x Stir-Fried Spaghetti` : "",
        ...items.proteins.map((item) => `${item.quantity} x ${item.name}`),
        ...items.combos.map((item) => `${item.quantity} x ${item.name}`),
    ].filter(Boolean);
    return parts.join(", ");
};
const isEmptyItems = (items) => {
    return items.plates === 0 && items.proteins.length === 0 && items.combos.length === 0;
};
const formatCart = (cart) => {
    const items = normalizeItems({
        plates: cart.items?.plates ?? 0,
        proteins: cart.items?.proteins ?? [],
        combos: cart.items?.combos ?? [],
    });
    return {
        items,
        subtotal: cart.subtotal ?? getSubtotal(items),
        currency: cart.currency || prices_1.CURRENCY,
        itemsText: cart.itemsText || getItemsText(items),
    };
};
class CartService {
    static async getCart(userId) {
        let cart = await cart_model_1.default.findOne({ userId });
        if (!cart) {
            cart = await cart_model_1.default.create({
                userId,
                items: { plates: 0, proteins: [], combos: [] },
                subtotal: 0,
                currency: prices_1.CURRENCY,
                itemsText: "",
            });
        }
        return formatCart(cart);
    }
    static async add(userId, input) {
        const incoming = normalizeItems(input);
        if (isEmptyItems(incoming)) {
            throw new Error("No items in cart");
        }
        const current = await this.getCart(userId);
        const merged = {
            plates: current.items.plates + incoming.plates,
            proteins: mergeByName(current.items.proteins, incoming.proteins),
            combos: mergeByName(current.items.combos, incoming.combos),
        };
        return this.replace(userId, merged);
    }
    static async replace(userId, input) {
        const items = normalizeItems(input);
        if (isEmptyItems(items)) {
            throw new Error("No items in cart");
        }
        const subtotal = getSubtotal(items);
        const itemsText = getItemsText(items);
        const cart = await cart_model_1.default.findOneAndUpdate({ userId }, {
            userId,
            items,
            subtotal,
            currency: prices_1.CURRENCY,
            itemsText,
        }, { upsert: true, new: true });
        return formatCart(cart);
    }
    static async get(userId) {
        return this.getCart(userId);
    }
    static async clear(userId) {
        await cart_model_1.default.findOneAndDelete({ userId });
    }
    static isEmpty(cart) {
        return isEmptyItems(cart.items);
    }
}
exports.CartService = CartService;
//# sourceMappingURL=cart.service.js.map