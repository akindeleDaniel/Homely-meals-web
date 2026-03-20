"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartService = void 0;
const prices_1 = require("../constants/prices");
const cart_model_1 = __importDefault(require("../models/cart.model"));
class CartService {
    static async getCart(userId) {
        let cart = await cart_model_1.default.findOne({ userId });
        if (!cart) {
            cart = await cart_model_1.default.create({
                userId,
                items: { proteins: [], combos: [] },
                subtotal: 0,
                currency: "₦",
                itemsText: "",
            });
        }
        const formattedItems = {
            proteins: cart.items?.proteins?.map((p) => ({
                name: p.name,
                quantity: p.quantity,
            })),
            combos: cart.items?.combos?.map((c) => ({
                name: c.name,
                quantity: c.quantity,
            })),
        };
        return {
            items: formattedItems,
            subtotal: cart.subtotal,
            currency: cart.currency || "₦",
            itemsText: cart.itemsText || "",
        };
    }
    static async add(userId, input) {
        if (!input.combos && !input.proteins) {
            throw new Error("No items in cart");
        }
        if (input.combos && input.proteins) {
            throw new Error("Cannot mix proteins and combos");
        }
        let subtotal = 0;
        let itemsText = "";
        if (input.proteins) {
            subtotal = prices_1.BASE_PRICE;
            itemsText = input.proteins
                .map((p) => {
                if (p.quantity <= 0) {
                    throw new Error(`Invalid quantity for protein ${p.name}`);
                }
                subtotal += prices_1.PROTEIN_PRICES[p.name] * p.quantity;
                return `${p.quantity} x ${p.name}`;
            })
                .join(", ");
        }
        if (input.combos) {
            subtotal = prices_1.BASE_PRICE;
            itemsText = input.combos
                .map((c) => {
                if (c.quantity <= 0) {
                    throw new Error(`Invalid quantity for combo ${c.name}`);
                }
                subtotal += prices_1.COMBO_PRICES[c.name] * c.quantity;
                return `${c.quantity} x ${c.name}`;
            })
                .join(", ");
        }
        await cart_model_1.default.findOneAndUpdate({ userId }, {
            userId,
            items: input,
            subtotal,
            currency: "₦",
            itemsText,
        }, { upsert: true, new: true });
        return {
            items: input,
            subtotal,
            currency: "₦",
            itemsText,
        };
    }
    static async get(userId) {
        const cart = await cart_model_1.default.findOne({ userId });
        if (!cart) {
            throw new Error("Cart is empty");
        }
        const formattedItems = {
            proteins: cart.items?.proteins?.map((p) => ({
                name: p.name,
                quantity: p.quantity,
            })),
            combos: cart.items?.combos?.map((c) => ({
                name: c.name,
                quantity: c.quantity,
            })),
        };
        return {
            items: formattedItems,
            subtotal: cart.subtotal,
            currency: cart.currency || "₦",
            itemsText: cart.itemsText || "",
        };
    }
    static async clear(userId) {
        await cart_model_1.default.findOneAndDelete({ userId });
    }
}
exports.CartService = CartService;
//# sourceMappingURL=cart.service.js.map