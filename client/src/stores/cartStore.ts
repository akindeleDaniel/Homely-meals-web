import { create } from 'zustand';
import type { Cart, Protein, Combo } from '../types';

interface CartState {
  cart: Cart | null;
  loading: boolean;
  addToCart: (proteins?: Protein[], combos?: Combo[]) => Promise<void>;
  getCart: () => Promise<void>;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set, get) => ({
  cart: null,
  loading: false,
  addToCart: async (proteins, combos) => {
    set({ loading: true });
    try {
      const token = localStorage.getItem('auth-token');
      const response = await fetch('/main/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ proteins, combos }),
      });
      if (!response.ok) throw new Error('Failed to add to cart');
      await get().getCart(); // Refresh cart
    } catch (error) {
      console.error('Add to cart error:', error);
    } finally {
      set({ loading: false });
    }
  },
  getCart: async () => {
    set({ loading: true });
    try {
      const token = localStorage.getItem('auth-token');
      const response = await fetch('/main/cart', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const cart = await response.json();
        set({ cart });
      }
    } catch (error) {
      console.error('Get cart error:', error);
    } finally {
      set({ loading: false });
    }
  },
  clearCart: () => set({ cart: null }),
}));