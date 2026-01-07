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
var MainController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainController = void 0;
const tsoa_1 = require("tsoa");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_models_1 = __importDefault(require("../models/user.models"));
const order_models_1 = __importDefault(require("../models/order.models"));
const twilio_1 = require("../utils/twilio");
const cart_service_1 = require("../services/cart.service");
const delivery_1 = require("../constants/delivery");
let MainController = MainController_1 = class MainController extends tsoa_1.Controller {
    verifyToken(req) {
        const authHeader = req.headers.authorization;
        if (!authHeader)
            throw new Error("Authorization header missing");
        const token = authHeader.split(" ")[1];
        if (!token)
            throw new Error("Token missing");
        return jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
    }
    isOrderWindowOpen() {
        const now = new Date();
        const day = now.getDay();
        const hour = now.getHours();
        if (day === 1 && hour >= 7)
            return true;
        if (day === 2)
            return true;
        if (day === 3 && hour < 7)
            return true;
        return false;
    }
    async getLanding() {
        return {
            message: "Welcome to Homely Meals Wednesday Specials",
            actions: [
                { type: "button", text: "Register", link: "/main/register" },
                { type: "button", text: "Login", link: "/main/login" },
            ],
            deliveryWindow: "Wednesday 2:00 PM – 5:00 PM",
            deliveryFees: {
                gk: 500,
                "outside-gk": 1500
            }
        };
    }
    async register(body) {
        const existingUser = await user_models_1.default.findOne({ email: body.email });
        if (existingUser) {
            return { message: "User already exists" };
        }
        const hashedPassword = await bcrypt_1.default.hash(body.password, 10);
        await user_models_1.default.create({
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            phoneNumber: body.phoneNumber,
            password: hashedPassword,
        });
        return {
            message: "User registered successfully",
            user: { email: body.email,
                firstName: body.firstName,
                lastName: body.lastName },
        };
    }
    async login(body) {
        const user = await user_models_1.default.findOne({ email: body.email });
        if (!user)
            return { message: "Invalid email or password" };
        const match = await bcrypt_1.default.compare(body.password, user.password);
        if (!match)
            return { message: "Invalid email or password" };
        const token = jsonwebtoken_1.default.sign({ email: user.email, firstName: user.firstName }, process.env.JWT_SECRET, { expiresIn: "1d" });
        return { message: `Welcome back, ${user.firstName}!`, token };
    }
    async addToCart(body, req) {
        const user = this.verifyToken(req);
        return cart_service_1.CartService.add(user.email, body);
    }
    async getCart(req) {
        const user = this.verifyToken(req);
        return MainController_1.carts[user.email] || { message: "Cart is empty" };
    }
    async clearCart(req) {
        const user = this.verifyToken(req);
        delete MainController_1.carts[user.email];
        return { message: "Cart cleared" };
    }
    async placeOrder(body, req) {
        const user = this.verifyToken(req);
        if (!this.isOrderWindowOpen()) {
            return {
                message: "Ordering is open from Monday 7:00 AM to Wednesday 7:00 AM only.",
            };
        }
        const cart = MainController_1.carts[user.email];
        if (!cart) {
            return { message: "Cart is empty. Add items before placing an order." };
        }
        const dbUser = await user_models_1.default.findOne({ email: user.email });
        if (!dbUser) {
            return { message: "User not found." };
        }
        let deliveryFee = 0;
        if (body.deliveryType === "delivery") {
            if (!body.deliveryAddress || !body.deliveryArea) {
                return { message: "Delivery address is required for home delivery." };
            }
            deliveryFee = delivery_1.DELIVERY_FEES[body.deliveryArea] || 0;
        }
        const total = cart.subtotal + deliveryFee;
        const order = await order_models_1.default.create({
            userEmail: dbUser.email,
            phoneNumber: dbUser.phoneNumber,
            items: cart,
            subtotal: cart.subtotal,
            deliveryFee,
            total,
            deliveryType: body.deliveryType,
            deliveryAddress: body.deliveryAddress,
            pickupLocation: body.deliveryType === "pickup" ? "Perfect Touch (GK)" : undefined,
            deliveryWindow: "Wednesday 2:00 PM – 5:00 PM",
            status: "pending",
        });
        await (0, twilio_1.sendWhatsApp)(user.phoneNumber, `Hi ${user.firstName}, your order has been placed successfully!
   Status: ${order.status}.
   We will notify you once it's confirmed. Thank you for choosing Homely Meals!`);
        delete MainController_1.carts[user.email];
        return {
            id: order._id.toString(),
            phoneNumber: order.phoneNumber,
            items: cart,
            subtotal: cart.subtotal,
            deliveryFee,
            total,
            status: order.status,
            deliveryType: body.deliveryType,
            deliveryAddress: order.deliveryAddress || undefined,
            pickupLocation: order.pickupLocation || undefined,
            deliveryWindow: order.deliveryWindow ?? undefined,
            createdAt: order.createdAt,
        };
    }
};
exports.MainController = MainController;
MainController.carts = {};
__decorate([
    (0, tsoa_1.Get)("landing"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MainController.prototype, "getLanding", null);
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
    __metadata("design:returntype", Promise)
], MainController.prototype, "addToCart", null);
__decorate([
    (0, tsoa_1.Get)("cart"),
    __param(0, (0, tsoa_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MainController.prototype, "getCart", null);
__decorate([
    (0, tsoa_1.Post)("cart/clear"),
    __param(0, (0, tsoa_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MainController.prototype, "clearCart", null);
__decorate([
    (0, tsoa_1.Post)("order/place"),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MainController.prototype, "placeOrder", null);
exports.MainController = MainController = MainController_1 = __decorate([
    (0, tsoa_1.Route)("main"),
    (0, tsoa_1.Tags)("Main")
], MainController);
//# sourceMappingURL=user.controller.js.map