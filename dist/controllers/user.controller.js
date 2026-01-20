"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainController = void 0;
const tsoa_1 = require("tsoa");
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_models_1 = __importDefault(require("../models/user.models"));
const cart_service_1 = require("../services/cart.service");
const telegram_1 = require("../utils/telegram");
const dotenv_1 = __importDefault(require("dotenv"));
const order_service_1 = require("../services/order.service");
dotenv_1.default.config();
let MainController = class MainController extends tsoa_1.Controller {
    async register(b) {
        b.password = await bcrypt_1.default.hash(b.password, 10);
        await user_models_1.default.create(b);
        return { message: "Registered" };
    }
    async login(body) {
        if (!body.email || !body.password) {
            throw new Error("Email and password are required");
        }
        const user = await user_models_1.default.findOne({ email: body.email });
        if (!user || !user.password) {
            throw new Error("Invalid email or password");
        }
        const ok = await bcrypt_1.default.compare(body.password, user.password);
        if (!ok) {
            throw new Error("Invalid email or password");
        }
        return { message: "Logged in", };
    }
    ;
    addCart(body) {
        return cart_service_1.CartService.add(body);
    }
    async placeOrder(body) {
        if (!body.phoneNumber) {
            throw new Error("Phone number is required");
        }
        const order = await (0, order_service_1.createOrder)({
            phoneNumber: body.phoneNumber,
            deliveryType: body.deliveryType,
            deliveryArea: body.deliveryArea,
            deliveryAddress: body.deliveryAddress
        });
        const itemsText = [
            ...(order.items.proteins ?? []).map(p => `${p.quantity} x ${p.name}`),
            ...(order.items.combos ?? []).map(c => `${c.quantity} x ${c.name}`),
        ].join(", ") || "No Items";
        const message = order.deliveryType === "delivery"
            ? `
🍔 NEW ORDER
📞 Phone: ${order.phoneNumber}
🍽 Items: ${itemsText}
🚚 Delivery Fee: ₦${order.deliveryFee}
💰 Total: ₦${order.total}
📍 Address: ${order.deliveryAddress}
`
            : `
🍔 NEW ORDER (PICKUP)
📞 Phone: ${order.phoneNumber}
🍽 Items: ${itemsText}
💰 Total: ₦${order.total}
📍 Pickup: ${order.pickupLocation}
`;
        await (0, telegram_1.Telegram)(message);
        return { message: "Order placed successfully. Thank you for choosing Homely Made Meals" };
    }
};
exports.MainController = MainController;
__decorate([
    (0, tsoa_1.Post)("register"),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MainController.prototype, "register", null);
__decorate([
    (0, tsoa_1.Post)("login"),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MainController.prototype, "login", null);
__decorate([
    (0, tsoa_1.Post)("cart/add"),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MainController.prototype, "addCart", null);
__decorate([
    (0, tsoa_1.Post)("order"),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MainController.prototype, "placeOrder", null);
exports.MainController = MainController = __decorate([
    (0, tsoa_1.Route)("main"),
    (0, tsoa_1.Tags)("Main")
], MainController);
//# sourceMappingURL=user.controller.js.map