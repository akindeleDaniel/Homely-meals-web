'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await login(email, password);
      window.location.href = '/';
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="rounded-lg bg-red-50 p-4 text-red-700">{error}</div>}

      <div>
        <label className="block text-sm font-semibold text-amber-900">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-2 w-full rounded-lg border border-orange-200 px-4 py-2 focus:border-orange-600 focus:outline-none"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-amber-900">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mt-2 w-full rounded-lg border border-orange-200 px-4 py-2 focus:border-orange-600 focus:outline-none"
          placeholder="••••••••"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg bg-red-600 px-4 py-2 font-bold transition hover:bg-red-700 disabled:opacity-50"
        style={{ color: '#FFFFFF' }}
      >
        {isSubmitting ? 'Logging in...' : 'Login'}
      </button>

      <p className="text-center text-sm text-amber-800">
        Don't have an account?{' '}
        <Link href="/register" className="font-bold text-orange-600 hover:text-orange-700">
          Register
        </Link>
      </p>
    </form>
  );
}
