"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartService = void 0;
const prices_1 = require("../constants/prices");
class CartService {
    static get(email) {
        return this.carts.get(email);
    }
    static clear(email) {
        this.carts.delete(email);
    }
    static add(email, body) {
        let subtotal = prices_1.BASE_PRICE;
        if (body.combo) {
            subtotal = prices_1.COMBO_PRICES[body.combo];
        }
        if (body.proteins?.length) {
            subtotal += body.proteins.reduce((sum, p) => {
                return sum + prices_1.PROTEIN_PRICES[p];
            }, 0);
        }
        const cart = {
            baseMeal: "Stir-Fried Spaghetti",
            proteins: body.proteins,
            combo: body.combo,
            subtotal,
            currency: "₦",
        };
        this.carts.set(email, cart);
        return cart;
    }
}
exports.CartService = CartService;
CartService.carts = new Map();
//# sourceMappingURL=cart.service.js.map