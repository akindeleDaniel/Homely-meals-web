import { RegisterForm } from '@/components/RegisterForm';

export default function RegisterPage() {
  return (
    <section className="mx-auto max-w-2xl px-6 py-10 sm:py-16">
      <div className="rounded-3xl border border-orange-200 bg-white/95 p-8 shadow-md shadow-orange-900/5">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-600">Auth</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-amber-900">Create account</h1>
        <p className="mt-4 text-amber-800">Join Homely Meals for easy ordering and delivery</p>
        <div className="mt-8">
          <RegisterForm />
        </div>
      </div>
    </section>
  );
}
