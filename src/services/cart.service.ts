import { BASE_PRICE, PROTEIN_PRICES, COMBO_PRICES } from "../constants/prices";

export type Protein = keyof typeof PROTEIN_PRICES;
export type Combo = keyof typeof COMBO_PRICES;

export interface Cart {
  baseMeal: string;
  proteins?: Protein[];
  combo?: Combo;
  subtotal: number;
  currency: string;
}

export class CartService {
  private static carts = new Map<string, Cart>();

  static get(email: string): Cart | undefined {
    return this.carts.get(email);
  }

  static clear(email: string) {
    this.carts.delete(email);
  }

  static add(
    email: string,
    body: { proteins?: Protein[]; combo?: Combo }
  ): Cart {
    let subtotal = BASE_PRICE;

    if (body.combo) {
      subtotal = COMBO_PRICES[body.combo]!;
    }

    if (body.proteins?.length) {
      subtotal += body.proteins.reduce((sum, p) => {
        return sum + PROTEIN_PRICES[p]!;
      }, 0);
    }

    const cart: Cart = {
      baseMeal: "Stir-Fried Spaghetti",
      proteins: body.proteins,
      combo: body.combo,
      subtotal,
      currency: "₦",
    };

    this.carts.set(email, cart);
    return cart;
  }
}
