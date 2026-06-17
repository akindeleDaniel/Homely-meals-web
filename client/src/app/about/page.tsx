export default function AboutPage() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-10 sm:py-16">
      <div className="rounded-3xl border border-orange-200 bg-white p-8 shadow-md shadow-orange-900/5">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-600">
          About us
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-amber-900">
          A kitchen built around real home cooking.
        </h1>
        <p className="mt-6 text-lg leading-8 text-amber-800">
          Homely Meals delivers carefully prepared dishes inspired by family recipes and local
          ingredients. We make it easy to enjoy fresh meals without the stress of cooking.
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <div className="rounded-3xl bg-orange-50 p-6">
            <h2 className="text-xl font-bold text-amber-900">Trusted quality</h2>
            <p className="mt-3 text-amber-800">
              Every meal is prepared with attention to taste, texture, and health.
            </p>
          </div>
          <div className="rounded-3xl bg-orange-50 p-6">
            <h2 className="text-xl font-bold text-amber-900">Simple ordering</h2>
            <p className="mt-3 text-amber-800">
              Order from our menu and get delivery straight to your door.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
