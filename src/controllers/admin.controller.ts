import { Controller, Post, Get, Route, Body, Tags, Request, Put, Path } from "tsoa";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Admin from "../models/admin.model";
import Order from "../models/order.models";
import { sendWhatsApp } from "../utils/twilio";

interface AdminLoginRequest {
  email: string;
  password: string;
}

interface updateOrderStatusRequest {
  status: "pending" | "confirmed" | "delivered";
}

@Route("admin")
@Tags("Admin")
export class AdminController extends Controller {

  private verifyAdmin(req: any) {
    const auth = req.headers.authorization;
    if (!auth) throw new Error("No token");

    const token = auth.split(" ")[1];
    return jwt.verify(token, process.env.JWT_SECRET!) as { email: string };
  }

  @Post("login")
  public async login(@Body() body: AdminLoginRequest) {
    const admin = await Admin.findOne({ email: body.email });
    if (!admin) return { message: "Invalid credentials" };

    const ok = await bcrypt.compare(body.password, admin.password);
    if (!ok) return { message: "Invalid credentials" };

    const token = jwt.sign(
      { email: admin.email, role: "admin" },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" }
    );

    return { message: "Admin logged in", token };
  }

  @Put("orders/{orderId}")
  public async updateOrderStatus(
    @Path() orderId: string,
    @Request() req: any,
    @Body() body: updateOrderStatusRequest
  ) {
    this.verifyAdmin(req);

    const order = await Order.findByIdAndUpdate(
      orderId, 
      { status: body.status }, 
      { new: true }
    );
    if (!order) return { message: "Order not found" };

    await sendWhatsApp(
      "+2349073211767",
      `Hello ${order.userEmail} is ${order.status}. Thank you for choosing Homely Meals!`
    );
    await order.save();

    return { message: `Order ${order._id} status updated to ${body.status} successfully`, order };
  }

  @Get("orders")
  public async getAllOrders(@Request() req: any) {
    this.verifyAdmin(req);

    const orders = await Order.find().sort({ createdAt: -1 });

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
}
