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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_models_1 = __importDefault(require("../models/user.models"));
const cart_service_1 = require("../services/cart.service");
const telegram_1 = require("../utils/telegram");
const dotenv_1 = __importDefault(require("dotenv"));
const order_models_1 = __importDefault(require("../models/order.models"));
const user_models_2 = __importDefault(require("../models/user.models"));
dotenv_1.default.config();
let MainController = class MainController extends tsoa_1.Controller {
    auth(req) {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader) {
                throw new Error("No authorization header");
            }
            console.log("AUTH HEADER:", req.headers.authorization);
            const token = authHeader.split(" ")[1];
            if (!token) {
                throw new Error("No token provided");
            }
            if (!process.env.JWT_SECRET) {
                throw new Error("JWT_SECRET not set");
            }
            return jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        }
        catch (err) {
            console.error("JWT AUTH ERROR:", err);
            throw err;
        }
    }
    async register(b) {
        b.password = await bcrypt_1.default.hash(b.password, 10);
        await user_models_1.default.create(b);
        return { message: "Registered" };
    }
    async login(b) {
        const u = await user_models_1.default.findOne({ email: b.email });
        if (!u || !u.password) {
            return { message: "Invalid credentials" };
        }
        const ok = await bcrypt_1.default.compare(b.password, u.password);
        if (!ok) {
            return { message: "Invalid credentials" };
        }
        return {
            token: jsonwebtoken_1.default.sign({ email: u.email }, process.env.JWT_SECRET, {
                expiresIn: "1d",
            }),
        };
    }
    addCart(b, r) {
        const user = this.auth(r);
        return cart_service_1.CartService.add(user.email, b);
    }
    async createOrder(req, body, r) {
        const authUser = this.auth(req);
        const user = await user_models_2.default.findOne({ email: authUser.email });
        if (!user) {
            throw new Error("User not found");
        }
        ;
        const cart = cart_service_1.CartService.get(user.email);
        if (!cart) {
            throw new Error("Cart is empty");
        }
        const total = cart.subtotal;
        const items = cart.proteins?.length
            ? cart.proteins
            : cart.combo
                ? [cart.combo]
                : [cart.baseMeal];
        const order = new order_models_1.default({
            user: user._id,
            phoneNumber: user.phoneNumber,
            deliveryType: body.deliveryType,
            deliveryArea: body.deliveryArea,
            deliveryAddress: body.deliveryAddress,
            items,
            subtotal: cart.subtotal,
            total,
        });
        await order.save();
        const itemsText = cart.proteins && cart.proteins.length ?
            cart.proteins.join(", ")
            : cart.combo ??
                cart.baseMeal ??
                "No items";
        const message = `
        🍔 *NEW ORDER*
        👤 User: ${user.email}
        📞 Phone: ${user.phoneNumber}
        🍽 Items: ${itemsText}
        💰 Subtotal: ₦${cart.subtotal}
        🚚 Delivery Fee: ₦${order.deliveryFee}
        🧾 Total: ₦${order.total}
        📦 Type: ${order.deliveryType}
        📍 Address: ${order.deliveryAddress ?? "Pickup: Perfect Touch (GK)"}
        ⏳ Status: ${order.status}
      `;
        await (0, telegram_1.Telegram)(message);
        cart_service_1.CartService.clear(user.email);
        return {
            id: order.id.toString(),
            phoneNumber: order.phoneNumber,
            items: order.items,
            subtotal: order.subtotal,
            deliveryFee: order.deliveryFee,
            total: order.total,
            status: order.status,
            deliveryType: order.deliveryType,
            deliveryAddress: order.deliveryAddress ?? undefined,
            pickupLocation: order.pickupLocation ?? undefined,
            deliveryWindow: order.deliveryWindow ?? undefined,
            createdAt: order.createdAt,
        };
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
    __param(1, (0, tsoa_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], MainController.prototype, "addCart", null);
__decorate([
    (0, tsoa_1.Post)("order"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Body)()),
    __param(2, (0, tsoa_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], MainController.prototype, "createOrder", null);
exports.MainController = MainController = __decorate([
    (0, tsoa_1.Route)("main"),
    (0, tsoa_1.Tags)("Main")
], MainController);
//# sourceMappingURL=user.controller.js.map