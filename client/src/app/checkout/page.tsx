'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const { cart } = useCart();
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || '',
    deliveryType: 'delivery' as 'pickup' | 'delivery',
    deliveryAddress: '',
    deliveryArea: 'gk' as 'gk' | 'outside-gk',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login?redirect=/checkout');
    }
  }, [isAuthenticated, authLoading, router]);

  if (authLoading) {
    return <div className="p-10 text-center">Loading authentication...</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  if (cart.items.length === 0) {
    return (
      <section className="mx-auto max-w-4xl px-6 py-10 sm:py-16">
        <div className="rounded-3xl border border-red-200 bg-red-50 p-8">
          <h1 className="text-2xl font-bold text-red-700">No items to checkout</h1>
          <Link href="/menu" className="mt-4 inline-block text-orange-600 hover:text-orange-700">
            ← Back to menu
          </Link>
        </div>
      </section>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      const res = await fetch('/api/main/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          items: cart.items,
          total: cart.total,
          userId: user?.id,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || 'Checkout failed');
      }

      setMessage('Order placed successfully!');
      // Clear cart after successful order
      setTimeout(() => {
        window.location.href = '/';
      }, 1500);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Checkout failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="mx-auto max-w-4xl px-6 py-10 sm:py-16">
      <div className="grid gap-8 lg:grid-cols-3">
        <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
          <div className="rounded-3xl border border-orange-200 bg-white/95 p-8 shadow-md shadow-orange-900/5">
            <h2 className="text-2xl font-bold text-amber-900">Delivery details</h2>

            {message && (
              <div
                className={`mt-4 rounded-lg p-4 ${message.includes('success') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}
              >
                {message}
              </div>
            )}

            <div className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-amber-900">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full rounded-lg border border-orange-200 px-4 py-2 focus:border-orange-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-amber-900">Phone number</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full rounded-lg border border-orange-200 px-4 py-2 focus:border-orange-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-amber-900">Delivery type</label>
                <select
                  name="deliveryType"
                  value={formData.deliveryType}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-lg border border-orange-200 px-4 py-2 focus:border-orange-600 focus:outline-none"
                >
                  <option value="delivery">Delivery</option>
                  <option value="pickup">Pickup</option>
                </select>
              </div>

              {formData.deliveryType === 'delivery' && (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-amber-900">
                      Delivery area
                    </label>
                    <select
                      name="deliveryArea"
                      value={formData.deliveryArea}
                      onChange={handleChange}
                      className="mt-2 w-full rounded-lg border border-orange-200 px-4 py-2 focus:border-orange-600 focus:outline-none"
                    >
                      <option value="gk">Ikeja / GK</option>
                      <option value="outside-gk">Outside GK</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-amber-900">
                      Delivery address
                    </label>
                    <input
                      type="text"
                      name="deliveryAddress"
                      value={formData.deliveryAddress}
                      onChange={handleChange}
                      required
                      className="mt-2 w-full rounded-lg border border-orange-200 px-4 py-2 focus:border-orange-600 focus:outline-none"
                      placeholder="Your delivery address"
                    />
                  </div>
                </>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-8 w-full rounded-lg bg-red-600 px-4 py-3 font-bold transition hover:bg-red-700 disabled:opacity-50"
              style={{ color: '#FFFFFF' }}
            >
              {isSubmitting ? 'Processing...' : 'Place order'}
            </button>
          </div>
        </form>

        <div className="rounded-3xl border border-orange-200 bg-white/95 p-8 shadow-md shadow-orange-900/5 h-fit">
          <h2 className="text-xl font-bold text-amber-900">Order summary</h2>
          <div className="mt-6 space-y-3 border-b border-orange-200 pb-6">
            {cart.items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm text-amber-800">
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>₦ {(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
          </div>

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

          <Link
            href="/cart"
            className="mt-6 block text-center text-sm text-orange-600 hover:text-orange-700"
          >
            ← Back to cart
          </Link>
        </div>
      </div>
    </section>
  );
}
