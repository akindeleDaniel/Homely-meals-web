"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const cartSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
    },
    items: {
        plates: {
            type: Number,
            default: 0,
        },
        proteins: [
            {
                name: String,
                quantity: Number,
            },
        ],
        combos: [
            {
                name: String,
                quantity: Number,
            },
        ],
    },
    subtotal: {
        type: Number,
        required: true,
        default: 0,
    },
    currency: {
        type: String,
        default: "₦",
    },
    itemsText: {
        type: String,
        default: "",
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model("Cart", cartSchema);
//# sourceMappingURL=cart.model.js.map