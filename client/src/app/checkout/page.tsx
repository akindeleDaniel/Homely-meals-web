'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { checkoutOrder, placePaidOrder, type CheckoutPayload } from '@/lib/api';

const DELIVERY_FEES = {
  gk: 500,
  'outside-gk': 1500,
};

const PENDING_CHECKOUT_KEY = 'pendingCheckout';

export default function CheckoutPage() {
  const { cart, isCartEmpty, refreshCart } = useCart();
  const { user, token, isAuthenticated, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const handledReturn = useRef(false);
  const [formData, setFormData] = useState({
    email: '',
    phoneNumber: '',
    deliveryType: 'delivery' as 'pickup' | 'delivery',
    deliveryAddress: '',
    deliveryArea: 'gk' as 'gk' | 'outside-gk',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        email: prev.email || user.email,
        phoneNumber: prev.phoneNumber || user.phoneNumber || '',
      }));
    }
  }, [user]);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login?redirect=/checkout');
    }
  }, [isAuthenticated, authLoading, router]);

  useEffect(() => {
    const confirmReturnedPayment = async () => {
      if (!token || handledReturn.current) return;

      const params = new URLSearchParams(window.location.search);
      const reference = params.get('reference') || params.get('trxref');
      const pendingRaw = localStorage.getItem(PENDING_CHECKOUT_KEY);

      if (!reference || !pendingRaw) return;

      handledReturn.current = true;
      setIsSubmitting(true);
      setMessage('Confirming payment...');

      try {
        const pending = JSON.parse(pendingRaw) as CheckoutPayload & { orderRef: string };
        await placePaidOrder(token, { ...pending, orderRef: reference || pending.orderRef });
        localStorage.removeItem(PENDING_CHECKOUT_KEY);
        await refreshCart();
        setMessage('Payment confirmed. Your order has been placed.');
        router.replace('/checkout');
      } catch (error) {
        setMessage(error instanceof Error ? error.message : 'Could not confirm payment');
      } finally {
        setIsSubmitting(false);
      }
    };

    void confirmReturnedPayment();
  }, [refreshCart, router, token]);

  const deliveryFee = useMemo(() => {
    if (formData.deliveryType === 'pickup') return 0;
    return DELIVERY_FEES[formData.deliveryArea];
  }, [formData.deliveryArea, formData.deliveryType]);

  const total = cart.subtotal + deliveryFee;

  if (authLoading) {
    return <div className="p-10 text-center">Loading authentication...</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  if (isCartEmpty && !message.includes('confirmed')) {
    return (
      <section className="mx-auto max-w-4xl px-6 py-10 sm:py-16">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-8">
          <h1 className="text-2xl font-bold text-red-700">No items to checkout</h1>
          <Link href="/menu" className="mt-4 inline-block text-orange-600 hover:text-orange-700">
            Back to menu
          </Link>
        </div>
      </section>
    );
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const buildCheckoutPayload = (): CheckoutPayload => {
    if (formData.deliveryType === 'pickup') {
      return {
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        deliveryType: 'pickup',
        callbackUrl: `${window.location.origin}/checkout`,
      };
    }

    return {
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      deliveryType: 'delivery',
      deliveryArea: formData.deliveryArea,
      deliveryAddress: formData.deliveryAddress,
      callbackUrl: `${window.location.origin}/checkout`,
    };
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!token) return;

    setIsSubmitting(true);
    setMessage('');

    try {
      const payload = buildCheckoutPayload();
      const response = await checkoutOrder(token, payload);
      localStorage.setItem(
        PENDING_CHECKOUT_KEY,
        JSON.stringify({ ...payload, orderRef: response.orderRef })
      );
      window.location.href = response.paymentUrl;
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Checkout failed. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <section className="mx-auto max-w-4xl px-6 py-10 sm:py-16">
      <div className="grid gap-8 lg:grid-cols-3">
        <form onSubmit={handleSubmit} className="space-y-6 lg:col-span-2">
          <div className="rounded-2xl border border-orange-200 bg-white p-8 shadow-md shadow-orange-900/5">
            <h2 className="text-2xl font-bold text-amber-900">Checkout</h2>

            {message && (
              <div
                className={`mt-4 rounded-lg p-4 ${message.includes('confirmed') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}
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
                      <option value="gk">GK</option>
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
              {isSubmitting ? 'Processing...' : 'Continue to Paystack'}
            </button>
          </div>
        </form>

        <div className="h-fit rounded-2xl border border-orange-200 bg-white p-8 shadow-md shadow-orange-900/5">
          <h2 className="text-xl font-bold text-amber-900">Order summary</h2>
          <div className="mt-6 space-y-3 border-b border-orange-200 pb-6 text-sm text-amber-800">
            {cart.items.plates > 0 && (
              <div className="flex justify-between gap-4">
                <span>Stir-Fried Spaghetti x {cart.items.plates}</span>
              </div>
            )}
            {cart.items.proteins.map((item) => (
              <div key={item.name} className="flex justify-between gap-4">
                <span>
                  {item.name} x {item.quantity}
                </span>
              </div>
            ))}
            {cart.items.combos.map((item) => (
              <div key={item.name} className="flex justify-between gap-4">
                <span>
                  {item.name} x {item.quantity}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-3 border-t border-orange-200 pt-6">
            <div className="flex justify-between text-amber-800">
              <span>Subtotal</span>
              <span>
                {cart.currency}
                {cart.subtotal.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between text-amber-800">
              <span>Delivery fee</span>
              <span>
                {cart.currency}
                {deliveryFee.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between border-t border-orange-200 pt-3 text-lg font-bold text-amber-900">
              <span>Total</span>
              <span>
                {cart.currency}
                {total.toLocaleString()}
              </span>
            </div>
          </div>

          <Link
            href="/cart"
            className="mt-6 block text-center text-sm text-orange-600 hover:text-orange-700"
          >
            Back to cart
          </Link>
        </div>
      </div>
    </section>
  );
}
