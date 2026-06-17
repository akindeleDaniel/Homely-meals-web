'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const { cart, removeItem, updateQuantity, clearCart } = useCart();

  if (cart.items.length === 0) {
    return (
      <section className="mx-auto max-w-4xl px-6 py-10 sm:py-16">
        <div className="rounded-3xl border border-orange-200 bg-white/95 p-8 text-center shadow-md shadow-orange-900/5">
          <h1 className="text-3xl font-bold text-amber-900">Your cart is empty</h1>
          <p className="mt-4 text-amber-800">Add some delicious meals to get started</p>
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
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-3xl border border-orange-200 bg-white/95 p-8 shadow-md shadow-orange-900/5">
            <h1 className="text-2xl font-bold text-amber-900">Shopping cart</h1>
            <div className="mt-6 space-y-4">
              {cart.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-lg border border-orange-200 bg-orange-50 p-4"
                >
                  <div>
                    <h3 className="font-bold text-amber-900">{item.name}</h3>
                    <p className="text-sm text-amber-700">₦ {item.price.toLocaleString()}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 border border-orange-200 rounded-lg">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-1 text-amber-900 hover:bg-orange-100"
                      >
                        −
                      </button>
                      <span className="px-3 font-semibold text-amber-900">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-1 text-amber-900 hover:bg-orange-100"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-sm font-bold text-red-600 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-orange-200 bg-white/95 p-8 shadow-md shadow-orange-900/5 h-fit">
          <h2 className="text-xl font-bold text-amber-900">Order summary</h2>
          <div className="mt-6 space-y-3 border-t border-orange-200 pt-6">
            <div className="flex justify-between text-amber-800">
              <span>Subtotal</span>
              <span>₦ {cart.subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-amber-800">
              <span>Delivery fee</span>
              <span>₦ {cart.deliveryFee.toLocaleString()}</span>
            </div>
            <div className="border-t border-orange-200 pt-3 flex justify-between font-bold text-amber-900 text-lg">
              <span>Total</span>
              <span>₦ {cart.total.toLocaleString()}</span>
            </div>
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
              onClick={clearCart}
              className="w-full rounded-lg border-2 border-orange-500 bg-white px-4 py-2 font-bold text-orange-600 transition hover:bg-orange-50"
            >
              Clear cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
