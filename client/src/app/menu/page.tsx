'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { fetchMenuHome, type MenuResponse } from '@/lib/api';

export default function MenuPage() {
  const [menu, setMenu] = useState<MenuResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

    loadMenu();
  }, []);

  if (loading) {
    return (
      <section className="mx-auto max-w-7xl px-6 py-10 sm:py-16">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-64 rounded-lg bg-orange-200" />
          <div className="h-40 w-full rounded-lg bg-orange-200" />
        </div>
      </section>
    );
  }

  if (error || !menu) {
    return (
      <section className="mx-auto max-w-7xl px-6 py-10 sm:py-16">
        <div className="rounded-3xl border border-red-200 bg-red-50 p-8">
          <h1 className="text-2xl font-bold text-red-700">Error loading menu</h1>
          <p className="mt-2 text-red-600">{error || 'Failed to load menu items'}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-10 sm:py-16">
      <div className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-600">
          Today's special
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-amber-900">{menu.headline}</h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-amber-800">{menu.subtext}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <article className="rounded-3xl border border-orange-200 bg-white/95 p-6 shadow-md shadow-orange-900/5">
          <h2 className="text-2xl font-bold text-amber-900">{menu.baseMeal.name}</h2>
          <p className="mt-3 text-amber-800">
            Fresh base meal • Customizable with proteins & combos
          </p>
          <div className="mt-6 flex items-center justify-between text-sm font-bold text-amber-900">
            <span className="text-2xl font-bold text-red-600">
              {menu.baseMeal.currency} {menu.baseMeal.price.toLocaleString()}
            </span>
            <Link
              href="/meals/home"
              className="rounded-full bg-red-600 px-4 py-2 transition hover:bg-red-700 shadow-md hover:shadow-lg"
              style={{ color: '#FFFFFF' }}
            >
              Order now
            </Link>
          </div>
        </article>

        {menu.combos.slice(0, 2).map((combo) => (
          <article
            key={combo.name}
            className="rounded-3xl border border-orange-200 bg-white/95 p-6 shadow-md shadow-orange-900/5"
          >
            <h2 className="text-2xl font-bold text-amber-900">{combo.name}</h2>
            <p className="mt-3 text-amber-800">Ready-made combo • No customization needed</p>
            <div className="mt-6 flex items-center justify-between text-sm font-bold text-amber-900">
              <span className="text-2xl font-bold text-red-600">
                {menu.baseMeal.currency} {combo.price.toLocaleString()}
              </span>
              <Link
                href="/meals/home"
                className="rounded-full bg-red-600 px-4 py-2 transition hover:bg-red-700 shadow-md hover:shadow-lg"
                style={{ color: '#FFFFFF' }}
              >
                Order now
              </Link>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-8 rounded-3xl bg-orange-100 p-6">
        <p className="text-sm font-semibold text-orange-700">
          Delivery window: {menu.deliveryInfo.window}
        </p>
        <p className="mt-2 text-amber-800">{menu.deliveryInfo.note}</p>
      </div>
    </section>
  );
}
