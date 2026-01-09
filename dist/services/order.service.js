"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrder = void 0;
const order_models_1 = __importDefault(require("../models/order.models"));
const delivery_1 = require("../constants/delivery");
const createOrder = async (input) => {
    let fee = 0;
    if (input.deliveryType === "delivery") {
        if (!input.deliveryArea || !input.deliveryAddress) {
            throw new Error("Delivery info required");
        }
        fee = delivery_1.DELIVERY_FEES[input.deliveryArea];
    }
    const order = await order_models_1.default.create({
        userEmail: input.userEmail,
        phoneNumber: input.phoneNumber,
        items: input.cart,
        subtotal: input.cart.subtotal,
        deliveryFee: fee,
        total: input.cart.subtotal + fee,
        deliveryType: input.deliveryType,
        deliveryAddress: input.deliveryAddress,
        pickupLocation: input.deliveryType === "pickup" ? "Perfect Touch (GK)" : undefined,
        deliveryWindow: delivery_1.DELIVERY_WINDOW,
        status: "pending",
    });
    return {
        id: order._id.toString(),
        phoneNumber: order.phoneNumber,
        items: order.items,
        subtotal: order.subtotal,
        deliveryFee: order.deliveryFee,
        total: order.total,
        status: order.status,
        deliveryType: order.deliveryType,
        deliveryAddress: order.deliveryAddress,
        pickupLocation: order.pickupLocation,
        deliveryWindow: order.deliveryWindow,
        createdAt: order.createdAt,
    };
};
exports.createOrder = createOrder;
//# sourceMappingURL=order.service.js.map