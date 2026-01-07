import { Controller, Get, Post, Route, Body, Tags, Request } from "tsoa"
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import userModels from "../models/user.models";
import orderModels from "../models/order.models";
import { sendWhatsApp } from "../utils/twilio";
import { CartService } from "../services/cart.service";
import { Order } from "../interfaces/order.interface";
import { DELIVERY_FEES } from "../constants/delivery";
import { CartItem } from "../interfaces/cart.interface";

interface RegisterRequest {
  firstName: string;
  email: string
  password: string
  lastName: string
  phoneNumber: string
}

interface LoginRequest {
  email: string
  password: string
}

interface AddToCartRequest {
  proteins?: string[];
  combo?: string;
}

interface PlaceOrderRequest {
  deliveryType: "pickup" | "delivery";
  deliveryAddress?: string;
  deliveryArea?: "gk" | "outside-gk"
}

@Route("main")
@Tags("Main")
export class MainController extends Controller {

  private static carts: Record<string, CartItem> = {};

  private verifyToken(req: any): { email: string; firstName: string; phoneNumber: string } {
  const authHeader = req.headers.authorization;
  if (!authHeader) throw new Error("Authorization header missing");

  const token = authHeader.split(" ")[1];
  if (!token) throw new Error("Token missing");


    return jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as { email: string; firstName: string; phoneNumber: string };
  }


  private isOrderWindowOpen(): boolean {
  const now = new Date();
  const day = now.getDay(); 
  const hour = now.getHours();

  if (day === 1 && hour >= 7) return true;
  if (day === 2) return true;
  if (day === 3 && hour < 7) return true;

  return false;
}

  @Get("landing")
  public async getLanding() {
    return {
      message: "Welcome to Homely Meals Wednesday Specials",
      actions: [
        { type: "button", text: "Register", link: "/main/register" },
        { type: "button", text: "Login", link: "/main/login" },
      ],
      deliveryWindow: "Wednesday 2:00 PM – 5:00 PM",
      deliveryFees: {
        gk : 500,
        "outside-gk": 1500
      }
    };
  }

  
  @Post("register")
  public async register(@Body() body: RegisterRequest){
  const existingUser = await userModels.findOne({ email: body.email });
  if (existingUser) {
  return { message: "User already exists" };

    }
  
    const hashedPassword = await bcrypt.hash(body.password, 10);
    await userModels.create({
  firstName: body.firstName,
  lastName: body.lastName,
  email: body.email,
  phoneNumber: body.phoneNumber,
  password: hashedPassword,
});

    return {
      message: "User registered successfully",
      user: { email: body.email, 
        firstName: body.firstName, 
        lastName: body.lastName },
    };
  }

  
  @Post("login")
  public async login(@Body() body: LoginRequest): Promise<{ message: string; token?: string }> {
    const user = await userModels.findOne({ email: body.email });
    if (!user) return { message: "Invalid email or password" };

    const match = await bcrypt.compare(body.password, user.password);
    if (!match) return { message: "Invalid email or password" };

    const token = jwt.sign( 
      { email: user.email, firstName: user.firstName}, 
      process.env.JWT_SECRET!, 
      {expiresIn: "1d"}
    );

    return { message: `Welcome back, ${user.firstName}!`, token };
  }

  @Post("cart/add")
  public async addToCart(
    @Body() body: AddToCartRequest,
    @Request() req: any
  ){
    const user = this.verifyToken(req)
    return CartService.add(user.email,body)
  }

  @Get("cart")
  public async getCart(@Request() req: any): Promise<CartItem | { message: string }> {
    const user = this.verifyToken(req);
    return MainController.carts[user.email] || { message: "Cart is empty" };
  }

  @Post("cart/clear")
  public async clearCart(@Request() req: any): Promise<{ message: string }> {
    const user = this.verifyToken(req);
    delete MainController.carts[user.email];
    return { message: "Cart cleared" };
  }

  @Post("order/place")
  public async placeOrder(
    @Body() body: PlaceOrderRequest,
    @Request() req: any
  ): Promise<Order | { message: string }> {
    const user = this.verifyToken(req);

    if (!this.isOrderWindowOpen()) {
      return {
        message: "Ordering is open from Monday 7:00 AM to Wednesday 7:00 AM only.",
      };
    }

    const cart = MainController.carts[user.email];
    if (!cart) {
      return { message: "Cart is empty. Add items before placing an order." };
    }

    const dbUser = await userModels.findOne({ email: user.email });
    if (!dbUser) {
      return { message: "User not found." };
    }
    let deliveryFee = 0;

    if (body.deliveryType === "delivery" ){
      if (!body.deliveryAddress || !body.deliveryArea) {
      return { message: "Delivery address is required for home delivery." };
    }
      deliveryFee = DELIVERY_FEES[body.deliveryArea] || 0;
    }

    const total = cart.subtotal + deliveryFee;

  const order = await orderModels.create({
    userEmail: dbUser.email,
    phoneNumber: dbUser.phoneNumber,
    items: cart,
    subtotal:cart.subtotal,
    deliveryFee,
    total,
    deliveryType:body.deliveryType,
    deliveryAddress:body.deliveryAddress,
    pickupLocation:
    body.deliveryType === "pickup" ? "Perfect Touch (GK)" : undefined,
    deliveryWindow: "Wednesday 2:00 PM – 5:00 PM",
    status: "pending",
});

await sendWhatsApp(
  user.phoneNumber,
  `Hi ${user.firstName}, your order has been placed successfully!
   Status: ${order.status}.
   We will notify you once it's confirmed. Thank you for choosing Homely Meals!`
);

    delete MainController.carts[user.email];

    return {

      id: order._id.toString(),
      phoneNumber: order.phoneNumber,
      items: cart,
      subtotal: cart.subtotal,
      deliveryFee,
      total,
      status: order.status,
      deliveryType: body.deliveryType,
      deliveryAddress: order.deliveryAddress || undefined,
      pickupLocation: order.pickupLocation || undefined,
      deliveryWindow: order.deliveryWindow ?? undefined,
      createdAt: order.createdAt,
    };
  }
}

