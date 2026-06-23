import { Controller, Get, Route, Tags } from "tsoa";
import { BASE_PRICE, COMBO_PRICES, CURRENCY, PROTEIN_PRICES } from "../constants/prices";
import { DELIVERY_WINDOW } from "../constants/delivery";

@Route("menu")
@Tags("Menu")
export class MenuController extends Controller {
  @Get("home")
  public async getHome() {
    return {
      headline: "Special Wednesday Stir-Fried Spaghetti",
      subtext: "Choose how many plates you want, add any proteins, and add any ready-made combos.",
      orderButtonText: "Order Your Spag Now",

      baseMeal: {
        name: "Stir-Fried Spaghetti",
        price: BASE_PRICE,
        currency: CURRENCY,
      },

      deliveryInfo: {
        window: DELIVERY_WINDOW,
        note: "Delivery and pickup are available within this time frame only",
      },

      proteins: Object.entries(PROTEIN_PRICES).map(([name, price]) => ({ name, price })),

      combos: Object.entries(COMBO_PRICES).map(([name, price]) => ({ name, price })),
    };
  }
}
