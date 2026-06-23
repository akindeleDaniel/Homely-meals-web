import {
  BASE_PRICE,
  COMBO_PRICES,
  CURRENCY,
  Combo,
  PROTEIN_PRICES,
  Protein,
  isCombo,
  isProtein,
} from "../constants/prices";
import CartModel from "../models/cart.model";

export type proteinItems = {
  name: Protein;
  quantity: number;
};

export type comboItems = {
  name: Combo;
  quantity: number;
};

export interface CartItemsInput {
  plates?: number;
  proteins?: proteinItems[];
  combos?: comboItems[];
}

export interface Cart {
  items: {
    plates: number;
    proteins: proteinItems[];
    combos: comboItems[];
  };
  subtotal: number;
  currency: string;
  itemsText: string;
}

const assertWholeNumber = (label: string, value: number, allowZero = false) => {
  if (!Number.isInteger(value) || value < 0 || (!allowZero && value === 0)) {
    throw new Error(`${label} must be ${allowZero ? "zero or a positive" : "a positive"} whole number`);
  }
};

const mergeByName = <T extends { name: string; quantity: number }>(current: T[], incoming: T[]) => {
  const map = new Map<string, T>();

  for (const item of current) {
    map.set(item.name, { ...item });
  }

  for (const item of incoming) {
    const existing = map.get(item.name);
    if (existing) {
      map.set(item.name, { ...existing, quantity: existing.quantity + item.quantity });
    } else {
      map.set(item.name, { ...item });
    }
  }

  return [...map.values()];
};

const normalizeItems = (input: CartItemsInput): Cart["items"] => {
  const plates = input.plates ?? 0;
  assertWholeNumber("Plates", plates, true);

  const proteins = (input.proteins ?? []).map((item) => {
    if (!isProtein(item.name)) {
      throw new Error(`Invalid protein: ${item.name}`);
    }
    assertWholeNumber(`Quantity for ${item.name}`, item.quantity);
    return { name: item.name, quantity: item.quantity };
  });

  const combos = (input.combos ?? []).map((item) => {
    if (!isCombo(item.name)) {
      throw new Error(`Invalid combo: ${item.name}`);
    }
    assertWholeNumber(`Quantity for ${item.name}`, item.quantity);
    return { name: item.name, quantity: item.quantity };
  });

  return {
    plates,
    proteins: mergeByName([], proteins),
    combos: mergeByName([], combos),
  };
};

const getSubtotal = (items: Cart["items"]) => {
  const plateTotal = items.plates * BASE_PRICE;
  const proteinTotal = items.proteins.reduce(
    (sum, item) => sum + PROTEIN_PRICES[item.name] * item.quantity,
    0
  );
  const comboTotal = items.combos.reduce(
    (sum, item) => sum + COMBO_PRICES[item.name] * item.quantity,
    0
  );

  return plateTotal + proteinTotal + comboTotal;
};

const getItemsText = (items: Cart["items"]) => {
  const parts = [
    items.plates > 0 ? `${items.plates} x Stir-Fried Spaghetti` : "",
    ...items.proteins.map((item) => `${item.quantity} x ${item.name}`),
    ...items.combos.map((item) => `${item.quantity} x ${item.name}`),
  ].filter(Boolean);

  return parts.join(", ");
};

const isEmptyItems = (items: Cart["items"]) => {
  return items.plates === 0 && items.proteins.length === 0 && items.combos.length === 0;
};

const formatCart = (cart: any): Cart => {
  const items = normalizeItems({
    plates: cart.items?.plates ?? 0,
    proteins: cart.items?.proteins ?? [],
    combos: cart.items?.combos ?? [],
  });

  return {
    items,
    subtotal: cart.subtotal ?? getSubtotal(items),
    currency: cart.currency || CURRENCY,
    itemsText: cart.itemsText || getItemsText(items),
  };
};

export class CartService {
  static async getCart(userId: string): Promise<Cart> {
    let cart = await CartModel.findOne({ userId });
    if (!cart) {
      cart = await CartModel.create({
        userId,
        items: { plates: 0, proteins: [], combos: [] },
        subtotal: 0,
        currency: CURRENCY,
        itemsText: "",
      });
    }

    return formatCart(cart);
  }

  static async add(userId: string, input: CartItemsInput): Promise<Cart> {
    const incoming = normalizeItems(input);
    if (isEmptyItems(incoming)) {
      throw new Error("No items in cart");
    }

    const current = await this.getCart(userId);
    const merged = {
      plates: current.items.plates + incoming.plates,
      proteins: mergeByName(current.items.proteins, incoming.proteins),
      combos: mergeByName(current.items.combos, incoming.combos),
    };

    return this.replace(userId, merged);
  }

  static async replace(userId: string, input: CartItemsInput): Promise<Cart> {
    const items = normalizeItems(input);
    if (isEmptyItems(items)) {
      throw new Error("No items in cart");
    }

    const subtotal = getSubtotal(items);
    const itemsText = getItemsText(items);

    const cart = await CartModel.findOneAndUpdate(
      { userId },
      {
        userId,
        items,
        subtotal,
        currency: CURRENCY,
        itemsText,
      },
      { upsert: true, new: true }
    );

    return formatCart(cart);
  }

  static async get(userId: string): Promise<Cart> {
    return this.getCart(userId);
  }

  static async clear(userId: string) {
    await CartModel.findOneAndDelete({ userId });
  }

  static isEmpty(cart: Cart) {
    return isEmptyItems(cart.items);
  }
}
