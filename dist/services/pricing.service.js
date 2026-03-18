"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateOrderTotals = void 0;
const delivery_1 = require("../constants/delivery");
const calculateOrderTotals = (cart, deliveryType, deliveryArea) => {
    let deliveryFee = 0;
    if (deliveryType === "delivery") {
        if (!deliveryArea) {
            throw new Error("Delivery area required");
        }
        deliveryFee = delivery_1.DELIVERY_FEES[deliveryArea];
    }
    const total = cart.subtotal + deliveryFee;
    return {
        subtotal: cart.subtotal,
        deliveryFee,
        total
    };
};
exports.calculateOrderTotals = calculateOrderTotals;
//# sourceMappingURL=pricing.service.js.map