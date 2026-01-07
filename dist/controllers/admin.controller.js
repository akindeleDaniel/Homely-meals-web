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
    verifyAdmin(req) {
        const auth = req.headers.authorization;
        if (!auth)
            throw new Error("No token");
        const token = auth.split(" ")[1];
        return jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
    }
    async login(body) {
        const admin = await admin_model_1.default.findOne({ email: body.email });
        if (!admin)
            return { message: "Invalid credentials" };
        const ok = await bcrypt_1.default.compare(body.password, admin.password);
        if (!ok)
            return { message: "Invalid credentials" };
        const token = jsonwebtoken_1.default.sign({ email: admin.email, role: "admin" }, process.env.JWT_SECRET, { expiresIn: "1d" });
        return { message: "Admin logged in", token };
    }
    async updateOrderStatus(orderId, req, body) {
        this.verifyAdmin(req);
        const order = await order_models_1.default.findByIdAndUpdate(orderId, { status: body.status }, { new: true });
        if (!order)
            return { message: "Order not found" };
        await (0, twilio_1.sendWhatsApp)("+2349073211767", `Hello ${order.userEmail} is ${order.status}. Thank you for choosing Homely Meals!`);
        await order.save();
        return { message: `Order ${order._id} status updated to ${body.status} successfully`, order };
    }
    async getAllOrders(req) {
        this.verifyAdmin(req);
        const orders = await order_models_1.default.find().sort({ createdAt: -1 });
        return orders.map(order => ({
            id: order._id.toString(),
            phoneNumber: order.phoneNumber,
            items: order.items,
            subtotal: order.subtotal,
            deliveryFee: order.deliveryFee,
            total: order.total,
            status: order.status,
            deliveryType: order.deliveryType,
            deliveryAddress: order.deliveryAddress ?? undefined,
            pickupLocation: order.pickupLocation ?? undefined,
            deliveryWindow: order.deliveryWindow,
            createdAt: order.createdAt,
        }));
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
    (0, tsoa_1.Put)("orders/{orderId}"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Request)()),
    __param(2, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateOrderStatus", null);
__decorate([
    (0, tsoa_1.Get)("orders"),
    __param(0, (0, tsoa_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getAllOrders", null);
exports.AdminController = AdminController = __decorate([
    (0, tsoa_1.Route)("admin"),
    (0, tsoa_1.Tags)("Admin")
], AdminController);
//# sourceMappingURL=admin.controller.js.map