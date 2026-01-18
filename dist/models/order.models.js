"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const OrderSchema = new mongoose_1.default.Schema({
    userEmail: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    items: {
        type: mongoose_1.default.Schema.Types.Mixed,
        required: true,
    },
    subtotal: { type: Number, required: true },
    deliveryFee: { type: Number, required: true },
    total: { type: Number, required: true },
    currency: { type: String, required: true },
    deliveryType: {
        type: String,
        enum: ["pickup", "delivery"],
        required: true
    },
    deliveryAddress: String,
    pickupLocation: String,
    deliveryWindow: String,
    status: {
        type: String,
        default: "pending",
    }
}, { timestamps: true });
exports.default = mongoose_1.default.model("Order", OrderSchema);
//# sourceMappingURL=order.models.js.map