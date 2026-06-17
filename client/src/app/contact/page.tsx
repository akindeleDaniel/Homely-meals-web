export default function ContactPage() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-10 sm:py-16">
      <div className="rounded-3xl border border-orange-200 bg-white p-8 shadow-md shadow-orange-900/5">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-600">Contact</p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-amber-900">
          Get in touch with our team
        </h1>
        <p className="mt-4 text-lg leading-8 text-amber-800">
          Have a question about our menu, delivery, or custom meal plans? Send us a message and
          we’ll respond quickly.
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <div className="rounded-3xl bg-orange-50 p-6">
            <p className="font-bold text-amber-900">Email</p>
            <p className="mt-2 text-amber-800">hello@homelymeals.example</p>
          </div>
          <div className="rounded-3xl bg-orange-50 p-6">
            <p className="font-bold text-amber-900">Phone</p>
            <p className="mt-2 text-amber-800">+234 800 123 4567</p>
          </div>
        </div>
      </div>
    </section>
  );
}
