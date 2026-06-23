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
exports.AdminController = void 0;
const tsoa_1 = require("tsoa");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const admin_model_1 = __importDefault(require("../models/admin.model"));
const order_models_1 = __importDefault(require("../models/order.models"));
const telegram_1 = require("../utils/telegram");
const order_service_1 = require("../services/order.service");
const isOrderStatus = (value) => {
    return order_service_1.ORDER_STATUSES.includes(value);
};
let AdminController = class AdminController extends tsoa_1.Controller {
    auth(req) {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            this.setStatus(401);
            throw new Error("Unauthorized");
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (decoded.role !== "admin") {
            this.setStatus(401);
            throw new Error("Unauthorized");
        }
        return decoded;
    }
    async register(body) {
        const existing = await admin_model_1.default.findOne({ email: body.email });
        if (existing) {
            this.setStatus(409);
            throw new Error("Admin already exists");
        }
        const hashed = await bcrypt_1.default.hash(body.password, 10);
        await admin_model_1.default.create({ name: body.name, email: body.email, password: hashed });
        return { message: "Admin registered" };
    }
    async login(body) {
        const admin = await admin_model_1.default.findOne({ email: body.email });
        if (!admin || !admin.password) {
            this.setStatus(401);
            throw new Error("Invalid credentials");
        }
        const ok = await bcrypt_1.default.compare(body.password, admin.password);
        if (!ok) {
            this.setStatus(401);
            throw new Error("Invalid credentials");
        }
        const adminName = admin.name ?? admin.fullname ?? "Admin";
        return {
            token: jsonwebtoken_1.default.sign({ email: admin.email, role: "admin", name: adminName }, process.env.JWT_SECRET, { expiresIn: "1d" }),
            admin: {
                name: adminName,
                email: admin.email,
            },
            message: `Welcome ${adminName}`,
        };
    }
    async get(req) {
        this.auth(req);
        const orders = await order_models_1.default.find().sort({ createdAt: -1 }).lean();
        return orders.map((order) => ({
            id: order._id.toString(),
            userEmail: order.userEmail,
            paymentReference: order.paymentReference,
            phoneNumber: order.phoneNumber,
            items: order.items,
            subtotal: order.subtotal,
            currency: order.currency,
            deliveryFee: order.deliveryFee,
            total: order.total,
            status: order.status,
            deliveryType: order.deliveryType,
            deliveryAddress: order.deliveryAddress ?? undefined,
            pickupLocation: order.pickupLocation ?? undefined,
            deliveryWindow: order.deliveryWindow ?? undefined,
            createdAt: order.createdAt,
            updatedAt: order.updatedAt,
        }));
    }
    async update(id, body, req) {
        this.auth(req);
        if (!body.status || !isOrderStatus(body.status)) {
            this.setStatus(400);
            throw new Error(`Status must be one of: ${order_service_1.ORDER_STATUSES.join(", ")}`);
        }
        const order = await order_models_1.default.findByIdAndUpdate(id, { status: body.status }, { new: true });
        if (!order) {
            this.setStatus(404);
            throw new Error("Order not found");
        }
        await (0, telegram_1.Telegram)(`Order ${order.paymentReference ?? order._id.toString()} status: ${order.status}`);
        return {
            id: order._id.toString(),
            userEmail: order.userEmail,
            paymentReference: order.paymentReference,
            phoneNumber: order.phoneNumber,
            items: order.items,
            subtotal: order.subtotal,
            currency: order.currency,
            deliveryFee: order.deliveryFee,
            total: order.total,
            status: order.status,
            deliveryType: order.deliveryType,
            deliveryAddress: order.deliveryAddress,
            pickupLocation: order.pickupLocation,
            deliveryWindow: order.deliveryWindow,
            createdAt: order.createdAt,
            updatedAt: order.updatedAt,
        };
    }
};
exports.AdminController = AdminController;
__decorate([
    (0, tsoa_1.Post)("register"),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "register", null);
__decorate([
    (0, tsoa_1.Post)("login"),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "login", null);
__decorate([
    (0, tsoa_1.Get)("orders"),
    __param(0, (0, tsoa_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "get", null);
__decorate([
    (0, tsoa_1.Put)("orders/{id}"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Body)()),
    __param(2, (0, tsoa_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "update", null);
exports.AdminController = AdminController = __decorate([
    (0, tsoa_1.Route)("admin"),
    (0, tsoa_1.Tags)("Admin")
], AdminController);
//# sourceMappingURL=admin.controller.js.map