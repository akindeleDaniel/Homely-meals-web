"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartService = void 0;
const prices_1 = require("../constants/prices");
class CartService {
    static add(input) {
        if (!input.combos && !input.proteins) {
            throw new Error("No items in cart");
        }
        if (!input.combos && input.proteins) {
            throw new Error("Cannot mix proteins and combos");
        }
        let subtotal = 0;
        let itemsText = "";
        if (input.proteins) {
            subtotal = prices_1.BASE_PRICE;
            itemsText = input.proteins
                .map(p => {
                if (p.quantity <= 0) {
                    throw new Error(`Invalid quantity for protein ${p.name}`);
                }
                subtotal += prices_1.PROTEIN_PRICES[p.name] * p.quantity;
                return `${p.quantity} x ${p.name}`;
            }).join(", ");
        }
        if (input.combos) {
            itemsText = input.combos
                .map(c => {
                if (c.quantity <= 0) {
                    throw new Error(`Invalid quantity for combo ${c.name}`);
                }
                subtotal += prices_1.COMBO_PRICES[c.name] * c.quantity;
                return `${c.quantity} x ${c.name}`;
            }).join(", ");
        }
        this.cart = {
            items: input,
            subtotal,
            currency: "₦",
            itemsText,
        };
        return this.cart;
    }
    static get() {
        if (!this.cart) {
            throw new Error("Cart is empty");
        }
        return this.cart;
    }
    static clear() {
        this.cart = null;
    }
}
exports.CartService = CartService;
CartService.cart = null;
//# sourceMappingURL=cart.service.js.map