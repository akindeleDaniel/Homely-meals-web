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
const order_service_1 = require("../services/order.service");
const paystack_service_1 = require("../services/paystack.service");
const delivery_1 = require("../constants/delivery");
const prices_1 = require("../constants/prices");
const uuid_1 = require("uuid");
dotenv_1.default.config();
const signUserToken = (user) => {
    return jsonwebtoken_1.default.sign({ id: user._id.toString(), email: user.email }, process.env.JWT_SECRET || "", { expiresIn: "1d" });
};
const getUserPayload = (user) => ({
    id: user._id.toString(),
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    phoneNumber: user.phoneNumber,
});
let MainController = class MainController extends tsoa_1.Controller {
    authenticate(req) {
        const authHeader = req.headers.authorization;
        if (!authHeader?.startsWith("Bearer ")) {
            this.setStatus(401);
            throw new Error("Authorization token missing");
        }
        const token = authHeader.split(" ")[1];
        if (!token) {
            this.setStatus(401);
            throw new Error("Authorization token missing");
        }
        const payload = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "");
        if (!payload?.id) {
            this.setStatus(401);
            throw new Error("Invalid token");
        }
        return payload;
    }
    async register(body) {
        const existing = await user_models_1.default.findOne({ email: body.email });
        if (existing) {
            this.setStatus(409);
            throw new Error("User already exists");
        }
        const hashed = await bcrypt_1.default.hash(body.password, 10);
        const user = await user_models_1.default.create({
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            phoneNumber: body.phoneNumber,
            password: hashed,
            orders: [],
            declinedOrders: [],
        });
        await cart_service_1.CartService.getCart(user._id.toString());
        return {
            message: "Registered",
            token: signUserToken(user),
            user: getUserPayload(user),
        };
    }
    async login(body) {
        if (!body.email || !body.password) {
            this.setStatus(400);
            throw new Error("Email and password are required");
        }
        const user = await user_models_1.default.findOne({ email: body.email });
        if (!user || !user.password) {
            this.setStatus(401);
            throw new Error("Invalid email or password");
        }
        const ok = await bcrypt_1.default.compare(body.password, user.password);
        if (!ok) {
            this.setStatus(401);
            throw new Error("Invalid email or password");
        }
        return {
            message: "Logged in",
            token: signUserToken(user),
            user: getUserPayload(user),
        };
    }
    async welcome() {
        return {
            message: "WELCOME TO HOMELY MADE MEALS",
        };
    }
    async addCart(req, body) {
        const payload = this.authenticate(req);
        return cart_service_1.CartService.add(payload.id, body);
    }
    async replaceCart(req, body) {
        const payload = this.authenticate(req);
        return cart_service_1.CartService.replace(payload.id, body);
    }
    async getCart(req) {
        const payload = this.authenticate(req);
        return cart_service_1.CartService.getCart(payload.id);
    }
    async clearCart(req) {
        const payload = this.authenticate(req);
        await cart_service_1.CartService.clear(payload.id);
        return { message: "Cart cleared" };
    }
    async checkout(req, body) {
        const payload = this.authenticate(req);
        if (!body.email || !body.phoneNumber) {
            this.setStatus(400);
            throw new Error("Email and phone number are required");
        }
        const cart = await cart_service_1.CartService.get(payload.id);
        if (!cart || cart_service_1.CartService.isEmpty(cart)) {
            this.setStatus(400);
            throw new Error("Cart is empty");
        }
        let total = cart.subtotal;
        let deliveryFee = 0;
        if (body.deliveryType === "delivery") {
            if (!body.deliveryArea || !body.deliveryAddress) {
                this.setStatus(400);
                throw new Error("Delivery area and address are required for delivery");
            }
            if (delivery_1.DELIVERY_FEES[body.deliveryArea] === undefined) {
                this.setStatus(400);
                throw new Error("Invalid delivery area. Choose either 'gk' or 'outside-gk'");
            }
            deliveryFee = delivery_1.DELIVERY_FEES[body.deliveryArea];
            total += deliveryFee;
        }
        else if (body.deliveryType === "pickup") {
            if (body.deliveryArea || body.deliveryAddress) {
                this.setStatus(400);
                throw new Error("Pickup should not include delivery area or address");
            }
        }
        else {
            this.setStatus(400);
            throw new Error("Invalid delivery type. Choose 'pickup' or 'delivery'");
        }
        const orderRef = `ORD_${(0, uuid_1.v4)()}`;
        const paystackResponse = await (0, paystack_service_1.initializePaystack)({
            email: body.email,
            amount: total * 100,
            reference: orderRef,
            callbackUrl: body.callbackUrl,
            metadata: {
                email: body.email,
                userId: payload.id,
                phoneNumber: body.phoneNumber,
                deliveryType: body.deliveryType,
                deliveryAddress: body.deliveryAddress,
                deliveryArea: body.deliveryArea,
                items: cart.items,
                subtotal: cart.subtotal,
                currency: cart.currency || prices_1.CURRENCY,
                deliveryFee,
                total,
            },
        });
        if (!paystackResponse.status) {
            this.setStatus(500);
            throw new Error("Failed to initialize payment");
        }
        return {
            paymentUrl: paystackResponse.data.authorization_url,
            orderRef,
        };
    }
    async placeOrder(req, body) {
        const payload = this.authenticate(req);
        if (!body.orderRef) {
            this.setStatus(400);
            throw new Error("orderRef is required");
        }
        if (!body.phoneNumber) {
            this.setStatus(400);
            throw new Error("Phone number is required");
        }
        if (!body.email) {
            this.setStatus(400);
            throw new Error("Email is required");
        }
        const verifyResult = await (0, paystack_service_1.verifyPaystack)(body.orderRef);
        if (!verifyResult.status || !verifyResult.data || verifyResult.data.status !== "success") {
            this.setStatus(400);
            throw new Error("Payment not confirmed or failed");
        }
        const cart = await cart_service_1.CartService.get(payload.id);
        const order = await (0, order_service_1.createOrder)({
            userId: payload.id,
            cart,
            email: body.email,
            phoneNumber: body.phoneNumber,
            deliveryType: body.deliveryType,
            deliveryArea: body.deliveryArea,
            deliveryAddress: body.deliveryAddress,
            paymentReference: body.orderRef,
        });
        const itemsText = (0, order_service_1.formatOrderItemsText)(order.items);
        const message = order.deliveryType === "delivery"
            ? `NEW ORDER\nPhone: ${order.phoneNumber}\nItems: ${itemsText || "No items"}\nDelivery Fee: ${prices_1.CURRENCY}${order.deliveryFee}\nTotal: ${prices_1.CURRENCY}${order.total}\nAddress: ${order.deliveryAddress}`
            : `NEW ORDER (PICKUP)\nPhone: ${order.phoneNumber}\nItems: ${itemsText || "No items"}\nTotal: ${prices_1.CURRENCY}${order.total}\nPickup: ${order.pickupLocation}`;
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
    (0, tsoa_1.Get)("welcome"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MainController.prototype, "welcome", null);
__decorate([
    (0, tsoa_1.Post)("cart/add"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MainController.prototype, "addCart", null);
__decorate([
    (0, tsoa_1.Put)("cart"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MainController.prototype, "replaceCart", null);
__decorate([
    (0, tsoa_1.Get)("cart"),
    __param(0, (0, tsoa_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MainController.prototype, "getCart", null);
__decorate([
    (0, tsoa_1.Delete)("cart"),
    __param(0, (0, tsoa_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MainController.prototype, "clearCart", null);
__decorate([
    (0, tsoa_1.Post)("checkout"),
    (0, tsoa_1.SuccessResponse)("200", "Payment Initialized"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MainController.prototype, "checkout", null);
__decorate([
    (0, tsoa_1.Post)("order"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MainController.prototype, "placeOrder", null);
exports.MainController = MainController = __decorate([
    (0, tsoa_1.Route)("main"),
    (0, tsoa_1.Tags)("Main")
], MainController);
//# sourceMappingURL=user.controller.js.map