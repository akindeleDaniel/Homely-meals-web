'use client';

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
  clearServerCart,
  fetchCart,
  saveServerCart,
  type CartInput,
  type ServerCart,
} from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

interface CartContextType {
  cart: ServerCart;
  isCartLoading: boolean;
  cartError: string;
  saveCart: (input: CartInput) => Promise<ServerCart>;
  clearCart: () => Promise<void>;
  refreshCart: () => Promise<void>;
  getTotalItems: () => number;
  isCartEmpty: boolean;
}

const emptyCart: ServerCart = {
  items: {
    plates: 0,
    proteins: [],
    combos: [],
  },
  subtotal: 0,
  currency: '₦',
  itemsText: '',
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const hasCartItems = (cart: ServerCart) => {
  return cart.items.plates > 0 || cart.items.proteins.length > 0 || cart.items.combos.length > 0;
};

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { token, isAuthenticated } = useAuth();
  const [cart, setCart] = useState<ServerCart>(emptyCart);
  const [isCartLoading, setIsCartLoading] = useState(false);
  const [cartError, setCartError] = useState('');

  const refreshCart = useCallback(async () => {
    if (!token) {
      setCart(emptyCart);
      return;
    }

    setIsCartLoading(true);
    setCartError('');
    try {
      const nextCart = await fetchCart(token);
      setCart(nextCart);
    } catch (error) {
      setCartError(error instanceof Error ? error.message : 'Could not load cart');
    } finally {
      setIsCartLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (isAuthenticated) {
      void refreshCart();
    } else {
      setCart(emptyCart);
    }
  }, [isAuthenticated, refreshCart]);

  const saveCart = useCallback(
    async (input: CartInput) => {
      if (!token) {
        throw new Error('Please log in before adding items to your cart');
      }

      setIsCartLoading(true);
      setCartError('');
      try {
        const saved = await saveServerCart(token, input);
        setCart(saved);
        return saved;
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Could not save cart';
        setCartError(message);
        throw new Error(message);
      } finally {
        setIsCartLoading(false);
      }
    },
    [token]
  );

  const clearCart = useCallback(async () => {
    if (!token) {
      setCart(emptyCart);
      return;
    }

    setIsCartLoading(true);
    setCartError('');
    try {
      await clearServerCart(token);
      setCart(emptyCart);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Could not clear cart';
      setCartError(message);
      throw new Error(message);
    } finally {
      setIsCartLoading(false);
    }
  }, [token]);

  const getTotalItems = useCallback(() => {
    return (
      cart.items.plates +
      cart.items.proteins.reduce((sum, item) => sum + item.quantity, 0) +
      cart.items.combos.reduce((sum, item) => sum + item.quantity, 0)
    );
  }, [cart]);

  const value = useMemo(
    () => ({
      cart,
      isCartLoading,
      cartError,
      saveCart,
      clearCart,
      refreshCart,
      getTotalItems,
      isCartEmpty: !hasCartItems(cart),
    }),
    [cart, cartError, clearCart, getTotalItems, isCartLoading, refreshCart, saveCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}
