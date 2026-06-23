"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrderFromPaystackMetadata = exports.createOrder = exports.formatOrderItemsText = exports.ORDER_STATUSES = void 0;
const order_models_1 = __importDefault(require("../models/order.models"));
const user_models_1 = __importDefault(require("../models/user.models"));
const delivery_1 = require("../constants/delivery");
const prices_1 = require("../constants/prices");
const cart_service_1 = require("./cart.service");
exports.ORDER_STATUSES = ["pending", "paid", "preparing", "ready", "delivered"];
const normalizeOrderItems = (items = {}) => {
    return {
        plates: items.plates ?? 0,
        proteins: items.proteins?.map((item) => ({
            name: item.name,
            quantity: item.quantity,
        })) ?? [],
        combos: items.combos?.map((item) => ({
            name: item.name,
            quantity: item.quantity,
        })) ?? [],
    };
};
const formatOrder = (order, email) => {
    const items = normalizeOrderItems(order.items);
    return {
        id: order._id.toString(),
        email: email ?? order.userEmail ?? "",
        paymentReference: order.paymentReference ?? undefined,
        phoneNumber: order.phoneNumber,
        items,
        subtotal: order.subtotal,
        deliveryType: order.deliveryType,
        deliveryAddress: order.deliveryAddress ?? undefined,
        deliveryArea: undefined,
        pickupLocation: order.pickupLocation ?? undefined,
        deliveryFee: order.deliveryFee,
        total: order.total,
        currency: order.currency ?? prices_1.CURRENCY,
        status: order.status,
        deliveryWindow: order.deliveryWindow ?? delivery_1.DELIVERY_WINDOW,
        createdAt: order.createdAt,
    };
};
const formatOrderItemsText = (items) => {
    return [
        items.plates > 0 ? `${items.plates} x Stir-Fried Spaghetti` : "",
        ...(items.proteins ?? []).map((item) => `${item.quantity} x ${item.name}`),
        ...(items.combos ?? []).map((item) => `${item.quantity} x ${item.name}`),
    ]
        .filter(Boolean)
        .join(", ");
};
exports.formatOrderItemsText = formatOrderItemsText;
const createOrder = async (data) => {
    if (data.paymentReference) {
        const existing = await order_models_1.default.findOne({ paymentReference: data.paymentReference });
        if (existing) {
            return formatOrder(existing, data.email);
        }
    }
    const cart = data.cart;
    if (!cart || !cart.items || cart_service_1.CartService.isEmpty(cart)) {
        throw new Error("Cart is empty");
    }
    let deliveryFee = 0;
    if (data.deliveryType === "delivery") {
        if (!data.deliveryArea || !data.deliveryAddress) {
            throw new Error("Delivery address and area required");
        }
        deliveryFee = delivery_1.DELIVERY_FEES[data.deliveryArea];
    }
    const total = cart.subtotal + deliveryFee;
    const order = await order_models_1.default.create({
        userId: data.userId,
        userEmail: data.email,
        paymentReference: data.paymentReference,
        phoneNumber: data.phoneNumber,
        items: cart.items,
        subtotal: cart.subtotal,
        currency: cart.currency || prices_1.CURRENCY,
        deliveryType: data.deliveryType,
        deliveryFee,
        deliveryAddress: data.deliveryType === "delivery" ? data.deliveryAddress : undefined,
        pickupLocation: data.deliveryType === "pickup" ? "Perfect Touch (GK)" : undefined,
        total,
        deliveryWindow: delivery_1.DELIVERY_WINDOW,
        status: "paid",
    });
    if (data.userId) {
        await user_models_1.default.findByIdAndUpdate(data.userId, {
            $push: { orders: order._id },
        });
        await cart_service_1.CartService.clear(data.userId);
    }
    return formatOrder(order, data.email);
};
exports.createOrder = createOrder;
const createOrderFromPaystackMetadata = async (reference, metadata, customerEmail) => {
    const email = metadata.email ?? customerEmail;
    if (!email || !metadata.phoneNumber || !metadata.deliveryType || !metadata.items) {
        throw new Error("Paystack metadata is incomplete");
    }
    const cart = {
        items: {
            plates: metadata.items.plates ?? 0,
            proteins: metadata.items.proteins ?? [],
            combos: metadata.items.combos ?? [],
        },
        subtotal: Number(metadata.subtotal ?? 0),
        currency: prices_1.CURRENCY,
        itemsText: "",
    };
    return (0, exports.createOrder)({
        userId: metadata.userId,
        cart,
        email,
        phoneNumber: metadata.phoneNumber,
        deliveryType: metadata.deliveryType,
        deliveryArea: metadata.deliveryArea,
        deliveryAddress: metadata.deliveryAddress,
        paymentReference: reference,
    });
};
exports.createOrderFromPaystackMetadata = createOrderFromPaystackMetadata;
//# sourceMappingURL=order.service.js.map