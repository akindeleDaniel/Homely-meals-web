'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  type: 'protein' | 'combo' | 'base';
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
}

interface CartContextType {
  cart: Cart;
  addItem: (item: CartItem) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const DELIVERY_FEE = 500;

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart>({
    items: [],
    subtotal: 0,
    deliveryFee: 0,
    total: 0,
  });

  const calculateTotals = useCallback((items: CartItem[]) => {
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const deliveryFee = items.length > 0 ? DELIVERY_FEE : 0;
    const total = subtotal + deliveryFee;
    return { subtotal, deliveryFee, total };
  }, []);

  const addItem = useCallback(
    (newItem: CartItem) => {
      setCart((prev) => {
        const existingItem = prev.items.find((item) => item.id === newItem.id);
        let updatedItems: CartItem[];

        if (existingItem) {
          updatedItems = prev.items.map((item) =>
            item.id === newItem.id ? { ...item, quantity: item.quantity + newItem.quantity } : item
          );
        } else {
          updatedItems = [...prev.items, newItem];
        }

        const { subtotal, deliveryFee, total } = calculateTotals(updatedItems);
        return { items: updatedItems, subtotal, deliveryFee, total };
      });
    },
    [calculateTotals]
  );

  const removeItem = useCallback(
    (itemId: string) => {
      setCart((prev) => {
        const updatedItems = prev.items.filter((item) => item.id !== itemId);
        const { subtotal, deliveryFee, total } = calculateTotals(updatedItems);
        return { items: updatedItems, subtotal, deliveryFee, total };
      });
    },
    [calculateTotals]
  );

  const updateQuantity = useCallback(
    (itemId: string, quantity: number) => {
      if (quantity <= 0) {
        removeItem(itemId);
        return;
      }

      setCart((prev) => {
        const updatedItems = prev.items.map((item) =>
          item.id === itemId ? { ...item, quantity } : item
        );
        const { subtotal, deliveryFee, total } = calculateTotals(updatedItems);
        return { items: updatedItems, subtotal, deliveryFee, total };
      });
    },
    [calculateTotals, removeItem]
  );

  const clearCart = useCallback(() => {
    setCart({ items: [], subtotal: 0, deliveryFee: 0, total: 0 });
  }, []);

  const getTotalItems = useCallback(() => {
    return cart.items.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart.items]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getTotalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}
