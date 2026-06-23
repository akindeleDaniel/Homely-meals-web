'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginAdmin } from '@/lib/api';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const response = await loginAdmin(email, password);
      localStorage.setItem('adminToken', response.token);
      localStorage.setItem('adminUser', JSON.stringify(response.admin));
      router.push('/admin/orders');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Admin login failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="mx-auto max-w-md px-6 py-10 sm:py-16">
      <div className="rounded-2xl border border-orange-200 bg-white p-8 shadow-md shadow-orange-900/5">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-600">Admin</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-amber-900">Order dashboard</h1>
        <p className="mt-4 text-amber-800">Log in to view and update customer orders.</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          {error && <div className="rounded-lg bg-red-50 p-4 text-red-700">{error}</div>}

          <div>
            <label className="block text-sm font-semibold text-amber-900">Email</label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              className="mt-2 w-full rounded-lg border border-orange-200 px-4 py-2 focus:border-orange-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-amber-900">Password</label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              className="mt-2 w-full rounded-lg border border-orange-200 px-4 py-2 focus:border-orange-600 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-red-600 px-4 py-3 font-bold transition hover:bg-red-700 disabled:opacity-50"
            style={{ color: '#FFFFFF' }}
          >
            {isSubmitting ? 'Logging in...' : 'Login as admin'}
          </button>
        </form>
      </div>
    </section>
  );
}
