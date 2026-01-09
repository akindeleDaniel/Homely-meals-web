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
const twilio_1 = require("../utils/twilio");
let AdminController = class AdminController extends tsoa_1.Controller {
    auth(req) {
        const token = req.headers.authorization?.split(" ")[1];
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (decoded.role !== "admin")
            throw new Error("Unauthorized");
    }
    async login(b) {
        const a = await admin_model_1.default.findOne({ email: b.email });
        if (!a || !a.password) {
            return { message: "Invalid credentials" };
        }
        const ok = await bcrypt_1.default.compare(b.password, a.password);
        if (!ok) {
            return { message: "Invalid credentials" };
        }
        return {
            token: jsonwebtoken_1.default.sign({ email: a.email, role: "admin" }, process.env.JWT_SECRET, { expiresIn: "1d" }),
        };
    }
    async get(r) {
        this.auth(r);
        const orders = await order_models_1.default.find()
            .sort({ createdAt: -1 })
            .lean();
        return orders.map((o) => ({
            id: o._id.toString(),
            phoneNumber: o.phoneNumber,
            items: o.items,
            subtotal: o.subtotal,
            deliveryFee: o.deliveryFee,
            total: o.total,
            status: o.status,
            deliveryType: o.deliveryType,
            deliveryAddress: o.deliveryAddress ?? undefined,
            pickupLocation: o.pickupLocation ?? undefined,
            deliveryWindow: o.deliveryWindow ?? undefined,
            createdAt: o.createdAt,
        }));
    }
    async update(id, b, r) {
        this.auth(r);
        const o = await order_models_1.default.findByIdAndUpdate(id, b, { new: true });
        if (!o) {
            throw new Error("Order not found");
        }
        if (!o.phoneNumber) {
            throw new Error("Phone number missing");
        }
        await (0, twilio_1.sendWhatsApp)(o.phoneNumber, `Order status: ${o.status}`);
        return {
            id: o._id.toString(),
            phoneNumber: o.phoneNumber,
            items: o.items,
            subtotal: o.subtotal,
            deliveryFee: o.deliveryFee,
            total: o.total,
            status: o.status,
            deliveryType: o.deliveryType,
            deliveryAddress: o.deliveryAddress,
            pickupLocation: o.pickupLocation,
            deliveryWindow: o.deliveryWindow,
            createdAt: o.createdAt,
        };
    }
};
exports.AdminController = AdminController;
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