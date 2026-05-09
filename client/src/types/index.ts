export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

export interface Protein {
  name: string;
  quantity: number;
}

export interface Combo {
  name: string;
  quantity: number;
}

export interface Cart {
  items: {
    proteins: Protein[];
    combos: Combo[];
  };
  subtotal: number;
  currency: string;
  itemsText: string;
}

export interface MenuData {
  headline: string;
  subtext: string;
  orderButtonText: string;
  baseMeal: {
    name: string;
    price: number;
    currency: string;
  };
  deliveryInfo: {
    window: string;
    note: string;
  };
  proteins: {
    name: string;
    price: number;
  }[];
  combos: {
    name: string;
    price: number;
  }[];
}

export interface Order {
  id: string;
  phoneNumber: string;
  items: {
    proteins: Protein[];
    combos: Combo[];
  };
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: string;
  deliveryType: 'pickup' | 'delivery';
  deliveryAddress?: string;
  pickupLocation?: string;
  deliveryWindow: string;
  createdAt: string;
}

export interface CheckoutData {
  email: string;
  phoneNumber: string;
  deliveryType: 'pickup' | 'delivery';
  deliveryAddress?: string;
  deliveryArea?: 'gk' | 'outside-gk';
}

export interface PaystackResponse {
  paymentUrl: string;
  orderRef: string;
}