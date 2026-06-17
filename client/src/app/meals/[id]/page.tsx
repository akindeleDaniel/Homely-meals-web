'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { fetchMenuHome, type MenuResponse } from '@/lib/api';

export default function MealDetailPage({ params }: { params: { id: string } }) {
  const [meal, setMeal] = useState<MenuResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMeal = async () => {
      try {
        setLoading(true);
        const data = await fetchMenuHome();
        setMeal(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load meal');
      } finally {
        setLoading(false);
      }
    };

    loadMeal();
  }, [params.id]);

  if (loading) {
    return (
      <section className="mx-auto max-w-4xl px-6 py-16">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-64 rounded-lg bg-orange-200" />
          <div className="h-40 w-full rounded-lg bg-orange-200" />
        </div>
      </section>
    );
  }

  if (error || !meal) {
    return (
      <section className="mx-auto max-w-4xl px-6 py-16">
        <div className="rounded-3xl border border-red-200 bg-red-50 p-8">
          <h1 className="text-2xl font-bold text-red-700">Error loading meal</h1>
          <p className="mt-2 text-red-600">{error || 'Meal not found'}</p>
          <Link
            href="/menu"
            className="mt-4 inline-block rounded-lg bg-orange-600 px-4 py-2 text-white transition hover:bg-orange-700"
          >
            Back to menu
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-4xl px-6 py-10 sm:py-16">
      <Link
        href="/menu"
        className="mb-6 inline-flex items-center text-orange-600 transition hover:text-orange-700"
      >
        ← Back to menu
      </Link>

      <div className="rounded-3xl border border-orange-200 bg-white/95 p-8 shadow-md shadow-orange-900/5">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-600">
          Meal detail
        </p>

        <h1 className="mt-4 text-4xl font-bold tracking-tight text-amber-900">{meal.headline}</h1>

        <p className="mt-6 text-lg leading-8 text-amber-800">{meal.subtext}</p>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl bg-orange-50 p-6">
            <h3 className="text-xl font-bold text-amber-900">Base meal</h3>
            <p className="mt-2 text-amber-800">{meal.baseMeal.name}</p>
            <p className="mt-4 text-2xl font-bold text-red-600">
              {meal.baseMeal.currency} {meal.baseMeal.price.toLocaleString()}
            </p>
          </div>

          <div className="rounded-2xl bg-orange-50 p-6">
            <h3 className="text-xl font-bold text-amber-900">Delivery window</h3>
            <p className="mt-2 text-amber-800">{meal.deliveryInfo.window}</p>
            <p className="mt-2 text-sm italic text-amber-700">{meal.deliveryInfo.note}</p>
          </div>
        </div>

        {meal.proteins.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-amber-900">Protein add-ons</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {meal.proteins.map((protein) => (
                <div
                  key={protein.name}
                  className="flex items-center justify-between rounded-lg border border-orange-200 bg-orange-50 p-4"
                >
                  <span className="font-medium text-amber-900">{protein.name}</span>
                  <span className="font-bold text-red-600">
                    + {meal.baseMeal.currency} {protein.price.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {meal.combos.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-amber-900">Ready-made combos</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {meal.combos.map((combo) => (
                <div
                  key={combo.name}
                  className="flex items-center justify-between rounded-lg border border-orange-200 bg-orange-50 p-4"
                >
                  <span className="font-medium text-amber-900">{combo.name}</span>
                  <span className="font-bold text-red-600">
                    {meal.baseMeal.currency} {combo.price.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 flex gap-4">
          <button
            className="flex-1 rounded-2xl bg-red-600 px-6 py-3 text-center text-sm font-bold transition hover:bg-red-700 shadow-md hover:shadow-lg"
            style={{ color: '#FFFFFF' }}
          >
            {meal.orderButtonText}
          </button>
          <Link
            href="/menu"
            className="flex-1 rounded-2xl border-2 border-orange-500 bg-white px-6 py-3 text-center text-sm font-bold text-orange-600 transition hover:bg-orange-50"
          >
            Back to menu
          </Link>
        </div>
      </div>
    </section>
  );
}
