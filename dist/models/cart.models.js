"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const CartSchema = new mongoose_1.default.Schema({
    userEmail: { type: String, required: true },
    baseMeal: String,
    proteins: [String],
    combo: String,
    subtotal: { type: Number, required: true },
}, { timestamps: true });
exports.default = mongoose_1.default.model("Cart", CartSchema);
//# sourceMappingURL=cart.models.js.map