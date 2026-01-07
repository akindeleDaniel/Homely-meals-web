"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const order_models_1 = __importDefault(require("../models/order.models"));
const delivery_1 = require("../constants/delivery");
const OrderService = async (user, cart, body) => {
    let deliveryFee = 0;
    if (body.deliveryType === "delivery") {
        if (!body.deliveryAddress || !body.deliveryArea) {
            throw new Error("Delivery address required");
        }
        deliveryFee = delivery_1.DELIVERY_FEES[body.deliveryArea];
    }
    return order_models_1.default.create({
        userEmail: user.email,
        phoneNumber: user.phoneNumber,
        items: cart,
        subtotal: cart.subtotal,
        deliveryFee,
        total: cart.subtotal + deliveryFee,
        deliveryType: body.deliveryType,
        deliveryAddress: body.deliveryAddress,
        pickupLocation: body.deliveryType === "pickup" ? "Perfect Touch (GK)" : undefined,
        deliveryWindow: delivery_1.DELIVERY_WINDOW,
        status: "pending",
    });
};
exports.OrderService = OrderService;
//# sourceMappingURL=order.service.js.map