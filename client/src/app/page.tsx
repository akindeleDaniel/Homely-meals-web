import Link from 'next/link';

const features = [
  {
    title: 'Home-cooked meals',
    description: 'Fresh dishes made from recipes you can trust, prepared daily.',
  },
  {
    title: 'Easy ordering',
    description: 'Browse meals, choose your favorites, and place orders in a few clicks.',
  },
  {
    title: 'Local delivery',
    description: 'Fast delivery to your door with care and reliable timing.',
  },
];

export default function Home() {
  return (
    <section className="mx-auto flex max-w-7xl flex-col gap-12 px-6 py-10 sm:py-16">
      <div className="rounded-3xl border border-orange-200 bg-white/95 p-8 shadow-md shadow-orange-900/10 sm:p-12">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-6">
            <p className="inline-flex rounded-full bg-orange-100 px-4 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-orange-700">
              Fresh meals made easy
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-amber-900 sm:text-5xl">
              Home-style food for every day.
            </h1>
            <p className="max-w-xl text-lg leading-8 text-amber-800">
              Build your weekly meal plan with wholesome dishes, local delivery, and a menu designed
              for comfort.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/menu"
                className="inline-flex items-center justify-center rounded-full bg-red-600 px-6 py-3 text-sm font-bold transition hover:bg-red-700 shadow-lg hover:shadow-xl"
                style={{ color: '#FFFFFF' }}
              >
                Browse menu
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border-2 border-orange-500 bg-orange-50 px-6 py-3 text-sm font-bold text-orange-600 transition hover:bg-orange-100"
              >
                Get in touch
              </Link>
            </div>
          </div>
          <div className="rounded-3xl bg-orange-600 p-8 text-white shadow-xl shadow-orange-600/30">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-100">
              Popular today
            </p>
            <h2 className="mt-4 text-3xl font-bold">Spicy stew with rice</h2>
            <p className="mt-4 text-orange-50">
              A warming, shareable dinner with rich sauce, fresh spices, and tender meat or
              plant-based options.
            </p>
            <div className="mt-8 space-y-4 text-sm leading-7 text-orange-100">
              <p>Delivery within 60 minutes</p>
              <p>Order for pickup or door delivery</p>
              <p>Trusted by families and busy professionals</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {features.map((feature) => (
          <article
            key={feature.title}
            className="rounded-3xl border border-orange-200 bg-white p-6 shadow-md shadow-orange-900/5"
          >
            <h3 className="text-xl font-bold text-amber-900">{feature.title}</h3>
            <p className="mt-3 text-amber-800">{feature.description}</p>
          </article>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-3xl border border-orange-200 bg-white/95 p-8 shadow-md shadow-orange-900/5">
          <h2 className="text-2xl font-bold text-amber-900">Why choose Homely Meals?</h2>
          <p className="mt-4 leading-8 text-amber-800">
            We deliver comforting, affordable meals prepared with care. Our menu is designed for
            busy days, family dinners, and anyone who wants fresh food without the hassle.
          </p>
          <ul className="mt-6 space-y-3 text-amber-900">
            <li className="flex items-start gap-3">
              <span className="mt-1 h-3 w-3 rounded-full bg-orange-600 flex-shrink-0" />
              Fresh ingredients, every order.
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 h-3 w-3 rounded-full bg-orange-600 flex-shrink-0" />
              Simple online ordering with same-day delivery.
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 h-3 w-3 rounded-full bg-orange-600 flex-shrink-0" />
              Local support from a team that cares.
            </li>
          </ul>
        </div>
        <div className="rounded-3xl border border-orange-200 bg-white/95 p-8 shadow-md shadow-orange-900/5">
          <h3 className="text-xl font-bold text-amber-900">Ready to order?</h3>
          <p className="mt-4 leading-7 text-amber-800">
            Start building your meal plan now and let us handle the cooking and delivery.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <Link
              href="/menu"
              className="rounded-2xl bg-red-600 px-4 py-3 text-center text-sm font-bold transition hover:bg-red-700 shadow-md hover:shadow-lg"
              style={{ color: '#FFFFFF' }}
            >
              View menu
            </Link>
            <Link
              href="/contact"
              className="rounded-2xl border-2 border-orange-500 bg-white px-4 py-3 text-center text-sm font-bold text-orange-600 transition hover:bg-orange-50"
            >
              Contact us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
