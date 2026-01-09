import { Controller, Route, Tags, Post, Get, Body, Request } from "tsoa";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.models";
import {createOrder} from "../services/order.service";
import { Order as OrderDTO } from "../interfaces/order.interface";
import { CartService } from "../services/cart.service";
import {DeliveryArea } from "../constants/delivery";
import { sendWhatsApp } from "../utils/twilio";

@Route("main")
@Tags("Main")
export class MainController extends Controller {

  private auth(req: any) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new Error("No authorization header");
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      throw new Error("No token provided");
    }
    return jwt.verify(token, process.env.JWT_SECRET!) as {
      email: string;
      phoneNumber: string;
    };
  }

  @Post("register")
  async register(@Body() b: any) {
    b.password = await bcrypt.hash(b.password, 10);
    await User.create(b);
    return { message: "Registered" };
  }

  @Post("login")
  async login(@Body() b: any) {
    const u = await User.findOne({ email: b.email });
    if (!u || !u.password) {
      return { message: "Invalid credentials" };
    }

const ok = await bcrypt.compare(b.password, u.password);
if (!ok) {
  return { message: "Invalid credentials" };
}

    return {
      token: jwt.sign({ email: u.email }, process.env.JWT_SECRET!, {
        expiresIn: "1d",
      }),
    };
  }

  @Post("cart/add")
  addCart(@Body() b: any, @Request() r: any) {
    return CartService.add(this.auth(r).email, b);
  }

  @Post("order/place")
  async place(@Body() b: {
    deliveryType: "pickup" | "delivery";
    deliveryArea?: DeliveryArea;
    deliveryAddress?: string;
  },
   @Request() r: any
): Promise<OrderDTO> {
    const user = this.auth(r);
    const cart = CartService.get(user.email);

    if (!cart) {
      throw new Error("Cart is empty");
    }

    const order = await createOrder({
      userEmail: user.email,
      phoneNumber: user.phoneNumber,
      cart,
      deliveryType: b.deliveryType,
      deliveryAddress: b.deliveryAddress,
      deliveryArea: b.deliveryArea,
    });

    await sendWhatsApp(
      user.phoneNumber,
      `Order received. Status: pending`
    );

    CartService.clear(user.email);
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
}