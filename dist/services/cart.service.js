"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartService = void 0;
const prices_1 = require("../constants/prices");
class CartService {
    static add(email, body) {
        let subtotal = 0;
        if (body.combo) {
            subtotal = prices_1.COMBO_PRICES[body.combo] || 0;
            this.carts[email] = { combo: body.combo, subtotal };
        }
        else {
            subtotal = prices_1.BASE_PRICE;
            if (body.proteins && body.proteins.length > 0) {
                subtotal += body.proteins.reduce((sum, protein) => sum + (prices_1.PROTEIN_PRICES[protein] ?? 0), 0);
            }
            this.carts[email] = {
                baseMeal: "Stir-Fried Spaghetti",
                proteins: body.proteins || [],
                subtotal,
            };
        }
        return this.carts[email];
    }
    static get(email) {
        return this.carts[email] || null;
    }
    static clear(email) {
        delete this.carts[email];
    }
}
exports.CartService = CartService;
CartService.carts = {};
//# sourceMappingURL=cart.service.js.map