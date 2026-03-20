import {
  Controller,
  Route,
  Tags,
  Post,
  Body,
  SuccessResponse,
  Request,
  Get,
} from "tsoa";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.models";
import { proteinItems, comboItems, CartService } from "../services/cart.service";
import { Telegram } from "../utils/telegram";
import dotenv from "dotenv";
import { createOrder } from "../services/order.service";
import { initializePaystack, verifyPaystack } from "../services/paystack.service";
import { DELIVERY_FEES } from "../constants/delivery";
import { v4 as uuidv4 } from "uuid";
import type { OrderDTO } from "../interfaces/order.interface";

dotenv.config();

interface LoginRequest {
  email: string;
  password: string;
}

@Route("main")
@Tags("Main")
export class MainController extends Controller {
  private authenticate(req: any) {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      throw new Error("Authorization token missing");
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      throw new Error("Authorization token missing");
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET || "") as any;
    if (!payload?.id) {
      throw new Error("Invalid token");
    }

    return payload as { id: string; email: string };
  }

  @Post("register")
  async register(@Body() body: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;    
    phoneNumber: string;
  }) {
    const existing = await User.findOne({ email: body.email });
    if (existing) {
      this.setStatus(409);
      throw new Error("User already exists");
    }

    const hashed = await bcrypt.hash(body.password, 10);
    const user = await User.create({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      phoneNumber: body.phoneNumber,
      password: hashed,
      orders: [],
      declinedOrders: [],
    });

    await CartService.getCart(user._id.toString());

    return { message: "Registered" };
  }

  @Post("login")
  async login(@Body() body: LoginRequest) {
    if (!body.email || !body.password) {
      throw new Error("Email and password are required");
    }

    const user = await User.findOne({ email: body.email });
    if (!user || !user.password) {
      this.setStatus(401);
      throw new Error("Invalid email or password");
    }

    const ok = await bcrypt.compare(body.password, user.password);
    if (!ok) {
      this.setStatus(401);
      throw new Error("Invalid email or password");
    }

    const token = jwt.sign(
      { id: user._id.toString(), email: user.email },
      process.env.JWT_SECRET || "",
      { expiresIn: "1d" }
    );

    return {
      message: "Logged in",
      token,
      user: {
        id: user._id.toString(),
        fullName: `${user.firstName} ${user.lastName}`,
      },
    };
  }

  @Get("welcome")
  async welcome() {
    return {
      message: "WELCOME TO HOMELY MADE MEALS",
    };
  }

  @Post("cart/add")
  async addCart(@Request() req: any, @Body() body: { proteins?: proteinItems[]; combos?: comboItems[]; }) {
    const payload = this.authenticate(req);
    return await CartService.add(payload.id, body);
  }

  @Get("cart")
  async getCart(@Request() req: any) {
    const payload = this.authenticate(req);
    return await CartService.get(payload.id);
  }

  @Post("checkout")
  @SuccessResponse("200", "Payment Initialized")
  public async checkout(@Request() req: any, @Body() body: OrderDTO): Promise<{ paymentUrl: string; orderRef: string }> {
    const payload = this.authenticate(req);

    if (!body.email || !body.phoneNumber) {
      this.setStatus(400);
      throw new Error("Email and phone number are required");
    }

    const cart = await CartService.get(payload.id);
    if (!cart || !cart.items) {
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

      if (!DELIVERY_FEES[body.deliveryArea]) {
        this.setStatus(400);
        throw new Error("Invalid delivery area. Choose either 'gk' or 'outside-gk'");
      }

      deliveryFee = DELIVERY_FEES[body.deliveryArea];
      total += deliveryFee;
    } else if (body.deliveryType === "pickup") {
      if (body.deliveryArea || body.deliveryAddress) {
        this.setStatus(400);
        throw new Error("Pickup should not include delivery area or address");
      }
    } else {
      this.setStatus(400);
      throw new Error("Invalid delivery type. Choose 'pickup' or 'delivery'");
    }

    const orderRef = `ORD_${uuidv4()}`;

    const paystackResponse = await initializePaystack({
      email: body.email,
      amount: total * 100,
      reference: orderRef,
      metadata: {
        userId: payload.id,
        phoneNumber: body.phoneNumber,
        deliveryType: body.deliveryType,
        deliveryAddress: body.deliveryAddress,
        deliveryArea: body.deliveryArea,
        items: cart.items,
        subtotal: cart.subtotal,
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

  @Post("order")
  public async placeOrder(@Request() req: any, @Body() body: OrderDTO & { orderRef: string }): Promise<{ message: string }> {
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

    const verifyResult = await verifyPaystack(body.orderRef);
    if (!verifyResult.status || !verifyResult.data || verifyResult.data.status !== "success") {
      this.setStatus(400);
      throw new Error("Payment not confirmed or failed");
    }

    const cart = await CartService.get(payload.id);
    const order = await createOrder({
      userId: payload.id,
      cart,
      email: body.email,
      phoneNumber: body.phoneNumber,
      deliveryType: body.deliveryType,
      deliveryArea: body.deliveryArea,
      deliveryAddress: body.deliveryAddress,
    });

    const itemsText = [
      ...(order.items.proteins ?? []).map((p) => `${p.quantity} x ${p.name}`),
      ...(order.items.combos ?? []).map((c) => `${c.quantity} x ${c.name}`),
    ]
      .join(", ")
      .trim();

    const message =
      order.deliveryType === "delivery"
        ? `\n🍔 NEW ORDER\n📞 Phone: ${order.phoneNumber}\n🍽 Items: ${itemsText || "No Items"}\n🚚 Delivery Fee: ₦${order.deliveryFee}\n💰 Total: ₦${order.total}\n📍 Address: ${order.deliveryAddress}\n`
        : `\n🍔 NEW ORDER (PICKUP)\n📞 Phone: ${order.phoneNumber}\n🍽 Items: ${itemsText || "No Items"}\n💰 Total: ₦${order.total}\n📍 Pickup: ${order.pickupLocation}\n`;

    await Telegram(message);

    return { message: "Order placed successfully. Thank you for choosing Homely Made Meals" };
  }
}

