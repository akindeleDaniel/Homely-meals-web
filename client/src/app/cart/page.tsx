'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { CartInput, CartLine } from '@/lib/api';

const updateLineQuantity = (lines: CartLine[], name: string, quantity: number) => {
  if (quantity <= 0) {
    return lines.filter((line) => line.name !== name);
  }

  return lines.map((line) => (line.name === name ? { ...line, quantity } : line));
};

export default function CartPage() {
  const { cart, clearCart, isCartEmpty, isCartLoading, saveCart } = useCart();
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login?redirect=/cart');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  const commitCart = async (input: CartInput) => {
    setMessage('');
    setError('');

    const empty =
      (input.plates ?? 0) === 0 &&
      (input.proteins ?? []).length === 0 &&
      (input.combos ?? []).length === 0;

    try {
      if (empty) {
        await clearCart();
      } else {
        await saveCart(input);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not update cart');
    }
  };

  const updatePlates = (quantity: number) => {
    void commitCart({
      plates: Math.max(0, quantity),
      proteins: cart.items.proteins,
      combos: cart.items.combos,
    });
  };

  const updateProtein = (name: string, quantity: number) => {
    void commitCart({
      plates: cart.items.plates,
      proteins: updateLineQuantity(cart.items.proteins, name, quantity),
      combos: cart.items.combos,
    });
  };

  const updateCombo = (name: string, quantity: number) => {
    void commitCart({
      plates: cart.items.plates,
      proteins: cart.items.proteins,
      combos: updateLineQuantity(cart.items.combos, name, quantity),
    });
  };

  if (isCartEmpty) {
    return (
      <section className="mx-auto max-w-4xl px-6 py-10 sm:py-16">
        <div className="rounded-2xl border border-orange-200 bg-white p-8 text-center shadow-md shadow-orange-900/5">
          <h1 className="text-3xl font-bold text-amber-900">Your cart is empty</h1>
          <p className="mt-4 text-amber-800">Add some delicious meals to get started.</p>
          <Link
            href="/menu"
            className="mt-8 inline-block rounded-lg bg-red-600 px-6 py-3 font-bold transition hover:bg-red-700"
            style={{ color: '#FFFFFF' }}
          >
            Browse menu
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-4xl px-6 py-10 sm:py-16">
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-2xl border border-orange-200 bg-white p-8 shadow-md shadow-orange-900/5">
            <h1 className="text-2xl font-bold text-amber-900">Shopping cart</h1>
            {message && <div className="mt-4 rounded-lg bg-green-50 p-4 text-green-700">{message}</div>}
            {error && <div className="mt-4 rounded-lg bg-red-50 p-4 text-red-700">{error}</div>}

            <div className="mt-6 space-y-4">
              {cart.items.plates > 0 && (
                <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-orange-200 bg-orange-50 p-4">
                  <div>
                    <h3 className="font-bold text-amber-900">Stir-Fried Spaghetti</h3>
                    <p className="text-sm text-amber-700">Base plates</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 rounded-lg border border-orange-200">
                      <button
                        onClick={() => updatePlates(cart.items.plates - 1)}
                        className="px-3 py-1 text-amber-900 hover:bg-orange-100"
                      >
                        -
                      </button>
                      <span className="px-3 font-semibold text-amber-900">{cart.items.plates}</span>
                      <button
                        onClick={() => updatePlates(cart.items.plates + 1)}
                        className="px-3 py-1 text-amber-900 hover:bg-orange-100"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {cart.items.proteins.map((item) => (
                <div
                  key={item.name}
                  className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-orange-200 bg-orange-50 p-4"
                >
                  <div>
                    <h3 className="font-bold text-amber-900">{item.name}</h3>
                    <p className="text-sm text-amber-700">Protein add-on</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 rounded-lg border border-orange-200">
                      <button
                        onClick={() => updateProtein(item.name, item.quantity - 1)}
                        className="px-3 py-1 text-amber-900 hover:bg-orange-100"
                      >
                        -
                      </button>
                      <span className="px-3 font-semibold text-amber-900">{item.quantity}</span>
                      <button
                        onClick={() => updateProtein(item.name, item.quantity + 1)}
                        className="px-3 py-1 text-amber-900 hover:bg-orange-100"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {cart.items.combos.map((item) => (
                <div
                  key={item.name}
                  className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-orange-200 bg-orange-50 p-4"
                >
                  <div>
                    <h3 className="font-bold text-amber-900">{item.name}</h3>
                    <p className="text-sm text-amber-700">Ready-made combo</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 rounded-lg border border-orange-200">
                      <button
                        onClick={() => updateCombo(item.name, item.quantity - 1)}
                        className="px-3 py-1 text-amber-900 hover:bg-orange-100"
                      >
                        -
                      </button>
                      <span className="px-3 font-semibold text-amber-900">{item.quantity}</span>
                      <button
                        onClick={() => updateCombo(item.name, item.quantity + 1)}
                        className="px-3 py-1 text-amber-900 hover:bg-orange-100"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="h-fit rounded-2xl border border-orange-200 bg-white p-8 shadow-md shadow-orange-900/5">
          <h2 className="text-xl font-bold text-amber-900">Order summary</h2>
          <div className="mt-6 space-y-3 border-t border-orange-200 pt-6">
            <div className="flex justify-between text-amber-800">
              <span>Subtotal</span>
              <span>
                {cart.currency}
                {cart.subtotal.toLocaleString()}
              </span>
            </div>
            <p className="text-sm text-amber-700">Delivery fee is calculated at checkout.</p>
          </div>
          <div className="mt-6 space-y-3">
            <Link
              href="/checkout"
              className="block rounded-lg bg-red-600 px-4 py-3 text-center font-bold transition hover:bg-red-700"
              style={{ color: '#FFFFFF' }}
            >
              Proceed to checkout
            </Link>
            <button
              onClick={async () => {
                await clearCart();
                setMessage('Cart cleared');
              }}
              disabled={isCartLoading}
              className="w-full rounded-lg border-2 border-orange-500 bg-white px-4 py-2 font-bold text-orange-600 transition hover:bg-orange-50 disabled:opacity-50"
            >
              Clear cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
