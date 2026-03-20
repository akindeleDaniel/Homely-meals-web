"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    phoneNumber: { type: String },
    password: { type: String, required: true },
    cart: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Cart" },
    orders: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "Order" }],
    declinedOrders: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "Order" }],
}, { timestamps: true });
exports.default = mongoose_1.default.model("User", UserSchema);
//# sourceMappingURL=user.models.js.map