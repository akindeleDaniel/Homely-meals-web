import { Controller, Route, Tags, Post, Body, SuccessResponse } from "tsoa";
import bcrypt from "bcrypt";
import User from "../models/user.models";
import { proteinItems, comboItems, CartService } from "../services/cart.service";
import { Telegram } from "../utils/telegram";
import dotenv from "dotenv";
import { createOrder } from "../services/order.service";
import { initializePaystack } from "../services/paystack.service";
import { v4 as uuidv4 } from "uuid";
import type { OrderDTO } from "../interfaces/order.interface";

dotenv.config();
@Route("main")
@Tags("Main")
export class MainController extends Controller {
  @Post("register")
  async register(@Body() b: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) {
    b.password = await bcrypt.hash(b.password, 10);
    await User.create(b);
    return { message: "Registered" };
  }

  @Post("login")
  async login(@Body() body: {
    email: string;
    password: string;
  }) {
    if (!body.email || !body.password) {
      throw new Error("Email and password are required");
    }

    const user = await User.findOne({ email: body.email });
    if (!user || !user.password) {
      throw new Error("Invalid email or password");
    }

    const ok = await bcrypt.compare(body.password, user.password);
    if (!ok) {
      throw new Error("Invalid email or password");
    }

    return { message: "Logged in" };
  }

  @Post("cart/add")
  addCart(
    @Body() body: {
      proteins?: proteinItems[];
      combos?: comboItems[];
    }
  ) {
    return CartService.add(body);
  }

  @Post("checkout")
  @SuccessResponse("200", "Payment Initialized")
  public async checkout(
    @Body() body: OrderDTO
  ): Promise<{ paymentUrl: string; orderRef: string }> {
    if (!body.email) {
      this.setStatus(400);
      throw new Error("Email is required for payment");
    }

    if (!body.phoneNumber) {
      this.setStatus(400);
      throw new Error("Phone number is required");
    }

    const cart = CartService.get();
    if (!cart) {
      this.setStatus(400);
      throw new Error("Cart is empty");
    }

    let total = cart.subtotal;
    let deliveryFee = 0;

    if (body.deliveryType === "delivery") {
      deliveryFee = 500;
      total += deliveryFee;
    }

    const orderRef = `ORD_${uuidv4()}`;

    const paystackResponse = await initializePaystack({
      email: body.email,
      amount: total * 100,
      reference: orderRef,
      metadata: {
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
  public async placeOrder(
    @Body() body: OrderDTO
  ): Promise<{ message: string }> {
    if (!body.phoneNumber) {
      throw new Error("Phone number is required");
    }

    const order = await createOrder({
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
        ? `
 NEW ORDER
 Phone: ${order.phoneNumber}
 Items: ${itemsText || "No Items"}
 Delivery Fee: ${order.deliveryFee}
 Total: ${order.total}
 Address: ${order.deliveryAddress}
`
        : `
 NEW ORDER (PICKUP)
 Phone: ${order.phoneNumber}
 Items: ${itemsText || "No Items"}
 Total: ${order.total}
 Pickup: ${order.pickupLocation}
`;

    await Telegram(message);

    return { message: "Order placed successfully. Thank you for choosing Homely Made Meals" };
  }
}
