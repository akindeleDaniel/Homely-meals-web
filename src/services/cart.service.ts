import { BASE_PRICE, PROTEIN_PRICES, COMBO_PRICES, Protein, Combo } from "../constants/prices";
import CartModel from "../models/cart.model";


export type proteinItems = {
  name: Protein;
  quantity: number;
};

export type comboItems = {
  name: Combo;
  quantity: number;
};

export interface Cart {
  items:{
    proteins?: proteinItems[];
    combos?: comboItems[];
  }
  subtotal: number;
  currency: string;
  itemsText: string;
}

export class CartService {
  static async getCart(userId: string) {
    let cart = await CartModel.findOne({ userId });
    if (!cart) {
      cart = await CartModel.create({
        userId,
        items: { proteins: [], combos: [] },
        subtotal: 0,
        currency: "₦",
        itemsText: "",
      });
    }

    const formattedItems = {
      proteins: cart.items?.proteins?.map((p: any) => ({
        name: p.name as Protein,
        quantity: p.quantity as number,
      })),
      combos: cart.items?.combos?.map((c: any) => ({
        name: c.name as Combo,
        quantity: c.quantity as number,
      })),
    };

    return {
      items: formattedItems,
      subtotal: cart.subtotal,
      currency: cart.currency || "₦",
      itemsText: cart.itemsText || "",
    };
  }

  static async add(
    userId: string,
    input: {
      proteins?: proteinItems[];
      combos?: comboItems[];
    }
  ) {
    if (!input.combos && !input.proteins) {
      throw new Error("No items in cart");
    }

    if (input.combos && input.proteins) {
      throw new Error("Cannot mix proteins and combos");
    }

    let subtotal = 0;
    let itemsText = "";

    if (input.proteins) {
      subtotal = BASE_PRICE;
      itemsText = input.proteins
        .map((p) => {
          if (p.quantity <= 0) {
            throw new Error(`Invalid quantity for protein ${p.name}`);
          }
          subtotal += PROTEIN_PRICES[p.name] * p.quantity;
          return `${p.quantity} x ${p.name}`;
        })
        .join(", ");
    }

    if (input.combos) {
      subtotal = BASE_PRICE;
      itemsText = input.combos
        .map((c) => {
          if (c.quantity <= 0) {
            throw new Error(`Invalid quantity for combo ${c.name}`);
          }
          subtotal += COMBO_PRICES[c.name] * c.quantity;
          return `${c.quantity} x ${c.name}`;
        })
        .join(", ");
    }

    await CartModel.findOneAndUpdate(
      { userId },
      {
        userId,
        items: input,
        subtotal,
        currency: "₦",
        itemsText,
      },
      { upsert: true, new: true }
    );

    return {
      items: input,
      subtotal,
      currency: "₦",
      itemsText,
    };
  }

  static async get(userId: string) {
    const cart = await CartModel.findOne({ userId });
    if (!cart) {
      throw new Error("Cart is empty");
    }

    const formattedItems = {
      proteins: cart.items?.proteins?.map((p: any) => ({
        name: p.name as Protein,
        quantity: p.quantity as number,
      })),
      combos: cart.items?.combos?.map((c: any) => ({
        name: c.name as Combo,
        quantity: c.quantity as number,
      })),
    };

    return {
      items: formattedItems,
      subtotal: cart.subtotal,
      currency: cart.currency || "₦",
      itemsText: cart.itemsText || "",
    };
  }

  static async clear(userId: string) {
    await CartModel.findOneAndDelete({ userId });
  }
}

