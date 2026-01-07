import { Controller, Get, Route, Tags } from "tsoa";

@Route("menu")
@Tags("Menu")
export class MenuController extends Controller {
@Get("home")
public async getHome() {
  return {
    headline: "Special Wednesday Stir-Fried Spaghetti 🍝",
    subtext: "Choose your base spaghetti. Add your preferred proteins or pick a ready-made combo.",

    orderButtonText: "🟢 Order Your Spag Now",

    baseMeal: {
      name: "Stir-Fried Spaghetti (No Protein)",
      price: 2000,
      currency: "₦",
    },

    deliveryInfo: {
  window: "Wednesday 2:00 PM – 5:00 PM",
  note: "Delivery and pickup available within this time frame only",
},


    proteins: [
      { name: "Egg", price: 500 },
      { name: "coleslaw", price: 500 },
      { name: "Beef", price: 1000 },
      { name: "Fish", price: 1000 },
      { name: "Plantain + Fish", price: 1500 },
      { name: "Chicken", price: 1500 },
      { name: "Sardine", price: 1500 },
    ],

    combos: [
      { name: "Stir-Fried Spag + Sardine & Fried Fish", price: 4500 },
      { name: "Stir-Fried Spag + Egg & Fried Fish", price: 4000 },
      { name: "Stir-Fried Spag + Egg", price: 2500 },
      { name: "Stir-Fried Spag + Beef", price: 3000 },
      { name: "Stir-Fried Spag + Fish & Plantain", price: 3500 },
      { name: "Stir-Fried Spag + Dodo & Beef", price: 3500 },
    ],
  };
}}
