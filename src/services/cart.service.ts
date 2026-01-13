import { BASE_PRICE, PROTEIN_PRICES, COMBO_PRICES, Protein, Combo } from "../constants/prices";



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
  private static cart: Cart | null = null;

  static add(input: {
    proteins?: proteinItems[];
    combos?: comboItems[];
  }): Cart {

    if (!input.combos && !input.proteins) {
      throw new Error("No items in cart");
    }

    if (!input.combos && input.proteins) {
      throw new Error("Cannot mix proteins and combos");
    }

    let subtotal = 0
    let itemsText = "";

    if (input.proteins){
      subtotal = BASE_PRICE;

      itemsText = input.proteins
        .map(p => {
          if (p.quantity <= 0){
            throw new Error(`Invalid quantity for protein ${p.name}`);
          }
        subtotal += PROTEIN_PRICES[p.name] * p.quantity;
        return `${p.quantity} x ${p.name}`;
      }).join(", ");
    }

    if (input.combos) {
      itemsText = input.combos
        .map(c => {
          if (c.quantity <= 0){
            throw new Error(`Invalid quantity for combo ${c.name}`);
          }
        subtotal += COMBO_PRICES[c.name] * c.quantity;
        return `${c.quantity} x ${c.name}`;
      }).join(", ");
    }
    this.cart = {
      items: input,
      subtotal,
      currency: "₦",
      itemsText,
    };
    return this.cart;
  }
  static get(): Cart {
    if(!this.cart){
      throw new Error("Cart is empty");
    }
    return this.cart;
  }
  static clear(){
    this.cart = null
  }
}

