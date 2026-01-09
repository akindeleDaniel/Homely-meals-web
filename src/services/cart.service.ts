import { BASE_PRICE, PROTEIN_PRICES, COMBO_PRICES } from "../constants/prices";

const carts: Record<string, any> = {};

export const CartService = {
  add(email: string, body: any) {
    let subtotal = body.combo
      ? COMBO_PRICES[body.combo]
      : BASE_PRICE +
        (body.proteins || []).reduce(
          (s: number, p: string) => s + (PROTEIN_PRICES[p] || 0),
          0
        );

    carts[email] = { ...body, subtotal };
    return carts[email];
  },
  get(email: string) {
    return carts[email];
  },
  clear(email: string) {
    delete carts[email];
  },
};
