'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchMenuHome, type CartInput, type MenuResponse } from '@/lib/api';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

type Quantities = Record<string, number>;

const setQuantity = (name: string, value: number, setter: (value: Quantities) => void, source: Quantities) => {
  setter({
    ...source,
    [name]: Math.max(0, value),
  });
};

const toLines = (source: Quantities) => {
  return Object.entries(source)
    .filter(([, quantity]) => quantity > 0)
    .map(([name, quantity]) => ({ name, quantity }));
};

export default function MenuPage() {
  const [menu, setMenu] = useState<MenuResponse | null>(null);
  const [plates, setPlates] = useState(1);
  const [proteinQuantities, setProteinQuantities] = useState<Quantities>({});
  const [comboQuantities, setComboQuantities] = useState<Quantities>({});
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const { saveCart } = useCart();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const loadMenu = async () => {
      try {
        setLoading(true);
        const data = await fetchMenuHome();
        setMenu(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load menu');
      } finally {
        setLoading(false);
      }
    };

    void loadMenu();
  }, []);

  const selectedCart = useMemo<CartInput>(
    () => ({
      plates,
      proteins: toLines(proteinQuantities),
      combos: toLines(comboQuantities),
    }),
    [comboQuantities, plates, proteinQuantities]
  );

  const selectedTotal = useMemo(() => {
    if (!menu) return 0;

    const proteinTotal = menu.proteins.reduce(
      (sum, item) => sum + (proteinQuantities[item.name] ?? 0) * item.price,
      0
    );
    const comboTotal = menu.combos.reduce(
      (sum, item) => sum + (comboQuantities[item.name] ?? 0) * item.price,
      0
    );

    return plates * menu.baseMeal.price + proteinTotal + comboTotal;
  }, [comboQuantities, menu, plates, proteinQuantities]);

  const handleSaveCart = async () => {
    if (!isAuthenticated && !authLoading) {
      router.push('/login?redirect=/menu');
      return;
    }

    setSaving(true);
    setMessage('');
    setError('');
    try {
      await saveCart(selectedCart);
      setMessage('Cart saved. You can review it or go straight to checkout.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not save cart');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <section className="mx-auto max-w-7xl px-6 py-10 sm:py-16">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-64 rounded-lg bg-orange-200" />
          <div className="h-80 w-full rounded-lg bg-orange-200" />
        </div>
      </section>
    );
  }

  if (!menu) {
    return (
      <section className="mx-auto max-w-7xl px-6 py-10 sm:py-16">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-8">
          <h1 className="text-2xl font-bold text-red-700">Error loading menu</h1>
          <p className="mt-2 text-red-600">{error || 'Failed to load menu items'}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-10 sm:py-16">
      <div className="grid gap-8 lg:grid-cols-[1fr_22rem]">
        <div className="space-y-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-600">
              Wednesday special
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-amber-900">
              {menu.headline}
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-amber-800">{menu.subtext}</p>
          </div>

          {message && <div className="rounded-lg bg-green-50 p-4 text-green-700">{message}</div>}
          {error && <div className="rounded-lg bg-red-50 p-4 text-red-700">{error}</div>}

          <div className="rounded-2xl border border-orange-200 bg-white p-6 shadow-md shadow-orange-900/5">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-amber-900">{menu.baseMeal.name}</h2>
                <p className="mt-2 text-amber-800">
                  {menu.baseMeal.currency}
                  {menu.baseMeal.price.toLocaleString()} per plate
                </p>
              </div>
              <div className="flex items-center gap-3 rounded-lg border border-orange-200 bg-orange-50 p-2">
                <button
                  type="button"
                  onClick={() => setPlates((value) => Math.max(0, value - 1))}
                  className="h-9 w-9 rounded-md text-lg font-bold text-amber-900 hover:bg-orange-100"
                >
                  -
                </button>
                <span className="w-16 text-center text-lg font-bold text-amber-900">{plates}</span>
                <button
                  type="button"
                  onClick={() => setPlates((value) => value + 1)}
                  className="h-9 w-9 rounded-md text-lg font-bold text-amber-900 hover:bg-orange-100"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-amber-900">Proteins</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {menu.proteins.map((protein) => (
                <div
                  key={protein.name}
                  className="flex items-center justify-between gap-4 rounded-2xl border border-orange-200 bg-white p-4 shadow-sm"
                >
                  <div>
                    <h3 className="font-bold text-amber-900">{protein.name}</h3>
                    <p className="text-sm text-amber-700">
                      +{menu.baseMeal.currency}
                      {protein.price.toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg border border-orange-200">
                    <button
                      type="button"
                      onClick={() =>
                        setQuantity(
                          protein.name,
                          (proteinQuantities[protein.name] ?? 0) - 1,
                          setProteinQuantities,
                          proteinQuantities
                        )
                      }
                      className="h-8 w-8 text-amber-900 hover:bg-orange-50"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-semibold text-amber-900">
                      {proteinQuantities[protein.name] ?? 0}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setQuantity(
                          protein.name,
                          (proteinQuantities[protein.name] ?? 0) + 1,
                          setProteinQuantities,
                          proteinQuantities
                        )
                      }
                      className="h-8 w-8 text-amber-900 hover:bg-orange-50"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-amber-900">Combos</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {menu.combos.map((combo) => (
                <div
                  key={combo.name}
                  className="flex items-center justify-between gap-4 rounded-2xl border border-orange-200 bg-white p-4 shadow-sm"
                >
                  <div>
                    <h3 className="font-bold text-amber-900">{combo.name}</h3>
                    <p className="text-sm text-amber-700">
                      {menu.baseMeal.currency}
                      {combo.price.toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg border border-orange-200">
                    <button
                      type="button"
                      onClick={() =>
                        setQuantity(
                          combo.name,
                          (comboQuantities[combo.name] ?? 0) - 1,
                          setComboQuantities,
                          comboQuantities
                        )
                      }
                      className="h-8 w-8 text-amber-900 hover:bg-orange-50"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-semibold text-amber-900">
                      {comboQuantities[combo.name] ?? 0}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setQuantity(
                          combo.name,
                          (comboQuantities[combo.name] ?? 0) + 1,
                          setComboQuantities,
                          comboQuantities
                        )
                      }
                      className="h-8 w-8 text-amber-900 hover:bg-orange-50"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="h-fit rounded-2xl border border-orange-200 bg-white p-6 shadow-md shadow-orange-900/5 lg:sticky lg:top-6">
          <h2 className="text-xl font-bold text-amber-900">Order preview</h2>
          <div className="mt-5 space-y-3 text-sm text-amber-800">
            <div className="flex justify-between gap-4">
              <span>Spaghetti plates</span>
              <span className="font-bold text-amber-900">{plates}</span>
            </div>
            {toLines(proteinQuantities).map((item) => (
              <div key={item.name} className="flex justify-between gap-4">
                <span>{item.name}</span>
                <span className="font-bold text-amber-900">{item.quantity}</span>
              </div>
            ))}
            {toLines(comboQuantities).map((item) => (
              <div key={item.name} className="flex justify-between gap-4">
                <span>{item.name}</span>
                <span className="font-bold text-amber-900">{item.quantity}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t border-orange-200 pt-5">
            <div className="flex justify-between text-lg font-bold text-amber-900">
              <span>Subtotal</span>
              <span>
                {menu.baseMeal.currency}
                {selectedTotal.toLocaleString()}
              </span>
            </div>
            <p className="mt-3 text-sm text-amber-700">
              Delivery window: {menu.deliveryInfo.window}
            </p>
          </div>

          <button
            type="button"
            onClick={handleSaveCart}
            disabled={saving || authLoading || selectedTotal === 0}
            className="mt-6 w-full rounded-lg bg-red-600 px-4 py-3 font-bold transition hover:bg-red-700 disabled:opacity-50"
            style={{ color: '#FFFFFF' }}
          >
            {saving ? 'Saving...' : 'Save to cart'}
          </button>
          <Link
            href="/cart"
            className="mt-3 block rounded-lg border-2 border-orange-500 bg-white px-4 py-3 text-center font-bold text-orange-600 transition hover:bg-orange-50"
          >
            Review cart
          </Link>
        </aside>
      </div>
    </section>
  );
}
