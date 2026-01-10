import { Controller, Route, Tags, Post, Put, Get, Body, Request, Path } from "tsoa";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Admin from "../models/admin.model";
import Order from "../models/order.models";
import { Telegram } from "../utils/telegram";

@Route("admin")
@Tags("Admin")
export class AdminController extends Controller {

  private auth(req: any) {
    const token = req.headers.authorization?.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    if (decoded.role !== "admin") throw new Error("Unauthorized");
  }

  @Post("login")
  async login(@Body() b: any) {
    const a = await Admin.findOne({ email: b.email });
    if (!a || !a.password){
      return {message: "Invalid credentials"};
    }

    const ok = await bcrypt.compare(b.password, a.password);
    if (!ok) {
      return { message: "Invalid credentials" };
    }

    return {
      token: jwt.sign(
        { email: a.email, role: "admin" },
        process.env.JWT_SECRET!,
        { expiresIn: "1d" }
      ),
    };
  }

  @Get("orders")
  async get(@Request() r: any) {
    this.auth(r);
    const orders = await Order.find()
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

  @Put("orders/{id}")
  async update(@Path() id: string, @Body() b: any, @Request() r: any) {
    this.auth(r);

    const o = await Order.findByIdAndUpdate(id, b, { new: true });
    if (!o) {
      throw new Error("Order not found");
    }

    if (!o.phoneNumber) {
      throw new Error("Phone number missing");
    }
    await Telegram(`Order status: ${o.status}`);
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
    }
  }
}