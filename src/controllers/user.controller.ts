import { Controller, Route, Tags, Post, Body } from "tsoa";
import bcrypt from "bcrypt";
import User from "../models/user.models";
import { proteinItems, comboItems, CartService } from "../services/cart.service";
import {Telegram} from "../utils/telegram";
import dotenv from "dotenv";
import { DeliveryArea } from "../constants/delivery";
import { createOrder } from "../services/order.service";

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
  async login(@Body() body: {email: string; password: string;}) {
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

    return {message: "Logged in",}};

  @Post("cart/add")
  addCart(
    @Body() body: {
    proteins?: proteinItems[];
    combo?: comboItems[];
    }
  ){
    return CartService.add(body)
  }

  @Post("order")
  public async placeOrder(
    @Body()
    body: {
    phoneNumber: string;
    deliveryType: "pickup" | "delivery";
    deliveryArea?: DeliveryArea;
    deliveryAddress?: string;
  }
) {
  if (!body.phoneNumber) {
    throw new Error("Phone number is required");
  }

    const order = await createOrder(body);
    const itemsText = [
  ...(order.items!.proteins ?? []).map(
    p => `${p.quantity} x ${p.name}`
  ),
  ...(order.items!.combos ?? []).map(
    c => `${c.quantity} x ${c.name}`
  ),
].join(", ");


    
     const message =
    order.deliveryType === "delivery"
      ? `
🍔 NEW ORDER
📞 Phone: ${order.phoneNumber}
🍽 Items: ${itemsText}
🚚 Delivery Fee: ₦${order.deliveryFee}
💰 Total: ₦${order.total}
📍 Address: ${order.deliveryAddress}
`
      : `
🍔 NEW ORDER (PICKUP)
📞 Phone: ${order.phoneNumber}
🍽 Items: ${itemsText}
💰 Total: ₦${order.total}
📍 Pickup: ${order.pickupLocation}
`;

     await Telegram(message);

    return { message: "Order placed successfully. Thank you for choosing Homely Made Meals" };
  }
}