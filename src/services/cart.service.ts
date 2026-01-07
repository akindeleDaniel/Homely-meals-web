import { CartItem } from "../interfaces/cart.interface";
import { BASE_PRICE, PROTEIN_PRICES, COMBO_PRICES } from "../constants/prices";

export interface AddToCartRequest {
  proteins?: (keyof typeof PROTEIN_PRICES)[];
  combo?: keyof typeof COMBO_PRICES;
}

export class CartService {
  private static carts: Record<string, CartItem> = {};

  static add(email: string, body: AddToCartRequest): CartItem {
    let subtotal = 0;

    if (body.combo) {
      subtotal = COMBO_PRICES[body.combo] || 0;
      this.carts[email] = { combo: body.combo, subtotal };
    } else {
      subtotal = BASE_PRICE;

      if (body.proteins && body.proteins.length > 0) {
        subtotal += body.proteins.reduce(
          (sum, protein) => sum + (PROTEIN_PRICES[protein] ?? 0),
          0
        );
      }

      this.carts[email] = {
        baseMeal: "Stir-Fried Spaghetti",
        proteins: body.proteins || [],
        subtotal,
      };
    }

    return this.carts[email];
  }

  static get(email: string): CartItem | null {
    return this.carts[email] || null;
  }

  static clear(email: string): void {
    delete this.carts[email];
  }
}
