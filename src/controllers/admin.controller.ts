import { Body, Controller, Get, Path, Post, Put, Request, Route, Tags } from "tsoa";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Admin from "../models/admin.model";
import Order from "../models/order.models";
import { Telegram } from "../utils/telegram";
import { ORDER_STATUSES, OrderStatus } from "../services/order.service";

const isOrderStatus = (value: string): value is OrderStatus => {
  return (ORDER_STATUSES as readonly string[]).includes(value);
};

@Route("admin")
@Tags("Admin")
export class AdminController extends Controller {
  private auth(req: any) {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      this.setStatus(401);
      throw new Error("Unauthorized");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    if (decoded.role !== "admin") {
      this.setStatus(401);
      throw new Error("Unauthorized");
    }

    return decoded;
  }

  @Post("register")
  async register(@Body() body: { name: string; email: string; password: string }) {
    const existing = await Admin.findOne({ email: body.email });
    if (existing) {
      this.setStatus(409);
      throw new Error("Admin already exists");
    }

    const hashed = await bcrypt.hash(body.password, 10);
    await Admin.create({ name: body.name, email: body.email, password: hashed });
    return { message: "Admin registered" };
  }

  @Post("login")
  async login(@Body() body: { email: string; password: string }) {
    const admin = await Admin.findOne({ email: body.email });
    if (!admin || !admin.password) {
      this.setStatus(401);
      throw new Error("Invalid credentials");
    }

    const ok = await bcrypt.compare(body.password, admin.password);
    if (!ok) {
      this.setStatus(401);
      throw new Error("Invalid credentials");
    }

    const adminName = admin.name ?? admin.fullname ?? "Admin";
    return {
      token: jwt.sign(
        { email: admin.email, role: "admin", name: adminName },
        process.env.JWT_SECRET!,
        { expiresIn: "1d" }
      ),
      admin: {
        name: adminName,
        email: admin.email,
      },
      message: `Welcome ${adminName}`,
    };
  }

  @Get("orders")
  async get(@Request() req: any) {
    this.auth(req);
    const orders = await Order.find().sort({ createdAt: -1 }).lean();

    return orders.map((order: any) => ({
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

  @Put("orders/{id}")
  async update(@Path() id: string, @Body() body: { status: string }, @Request() req: any) {
    this.auth(req);

    if (!body.status || !isOrderStatus(body.status)) {
      this.setStatus(400);
      throw new Error(`Status must be one of: ${ORDER_STATUSES.join(", ")}`);
    }

    const order = await Order.findByIdAndUpdate(id, { status: body.status }, { new: true });
    if (!order) {
      this.setStatus(404);
      throw new Error("Order not found");
    }

    await Telegram(`Order ${order.paymentReference ?? order._id.toString()} status: ${order.status}`);

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
}
