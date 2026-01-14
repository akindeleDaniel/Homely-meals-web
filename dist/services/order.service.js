"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrder = void 0;
const order_models_1 = __importDefault(require("../models/order.models"));
const delivery_1 = require("../constants/delivery");
const cart_service_1 = require("./cart.service");
const createOrder = async (data) => {
    const cart = cart_service_1.CartService.get();
    let deliveryFee = 0;
    if (data.deliveryType === "delivery") {
        if (!data.deliveryArea || !data.deliveryAddress) {
            throw new Error("Delivery address and area required");
        }
        deliveryFee = delivery_1.DELIVERY_FEES[data.deliveryArea];
    }
    const total = cart.subtotal + deliveryFee;
    const order = await order_models_1.default.create({
        phoneNumber: data.phoneNumber,
        items: cart.items,
        subtotal: cart.subtotal,
        deliveryType: data.deliveryType,
        deliveryFee,
        deliveryAddress: data.deliveryAddress,
        pickupLocation: data.deliveryType === "pickup" ? "Perfect Touch (GK)" : undefined,
        total,
        deliveryWindow: delivery_1.DELIVERY_WINDOW,
        status: "pending",
    });
    cart_service_1.CartService.clear();
    return {
        phoneNumber: order.phoneNumber,
        items: {
            proteins: order.items?.proteins?.map(p => ({
                name: p.name,
                quantity: p.quantity,
            })) ?? [],
            combos: order.items?.combos?.map(c => ({
                name: c.name,
                quantity: c.quantity,
            })) ?? [],
        },
        subtotal: order.subtotal,
        deliveryType: order.deliveryType,
        deliveryAddress: order.deliveryAddress ?? undefined,
        pickupLocation: order.pickupLocation ?? undefined,
        deliveryFee: order.deliveryFee,
        total: order.total,
        status: order.status,
        deliveryWindow: order.deliveryWindow ?? delivery_1.DELIVERY_WINDOW,
        createdAt: order.createdAt,
    };
};
exports.createOrder = createOrder;
//# sourceMappingURL=order.service.js.map