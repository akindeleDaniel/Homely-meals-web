import Link from 'next/link';

export default function MealDetailPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-10 sm:py-16">
      <div className="rounded-2xl border border-orange-200 bg-white p-8 shadow-md shadow-orange-900/5">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-600">Menu</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-amber-900">
          Build your meal from the menu page
        </h1>
        <p className="mt-4 leading-8 text-amber-800">
          Plates, proteins, and combos are now selected together from one ordering screen.
        </p>
        <Link
          href="/menu"
          className="mt-8 inline-block rounded-lg bg-red-600 px-6 py-3 font-bold transition hover:bg-red-700"
          style={{ color: '#FFFFFF' }}
        >
          Open menu
        </Link>
      </div>
    </section>
  );
}
