"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartService = void 0;
const prices_1 = require("../constants/prices");
const carts = {};
exports.CartService = {
    add(email, body) {
        let subtotal = body.combo
            ? prices_1.COMBO_PRICES[body.combo]
            : prices_1.BASE_PRICE +
                (body.proteins || []).reduce((s, p) => s + (prices_1.PROTEIN_PRICES[p] || 0), 0);
        carts[email] = { ...body, subtotal };
        return carts[email];
    },
    get(email) {
        return carts[email];
    },
    clear(email) {
        delete carts[email];
    },
};
//# sourceMappingURL=cart.service.js.map