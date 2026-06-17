'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth, type RegisterData } from '@/context/AuthContext';

export function RegisterForm() {
  const [formData, setFormData] = useState<RegisterData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await register(formData);
      window.location.href = '/';
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="rounded-lg bg-red-50 p-4 text-red-700">{error}</div>}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-semibold text-amber-900">First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="mt-2 w-full rounded-lg border border-orange-200 px-4 py-2 focus:border-orange-600 focus:outline-none"
            placeholder="John"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-amber-900">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="mt-2 w-full rounded-lg border border-orange-200 px-4 py-2 focus:border-orange-600 focus:outline-none"
            placeholder="Doe"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-amber-900">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="mt-2 w-full rounded-lg border border-orange-200 px-4 py-2 focus:border-orange-600 focus:outline-none"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-amber-900">Phone Number</label>
        <input
          type="tel"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          className="mt-2 w-full rounded-lg border border-orange-200 px-4 py-2 focus:border-orange-600 focus:outline-none"
          placeholder="+234 800 123 4567"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-amber-900">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
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
        {isSubmitting ? 'Creating account...' : 'Register'}
      </button>

      <p className="text-center text-sm text-amber-800">
        Already have an account?{' '}
        <Link href="/login" className="font-bold text-orange-600 hover:text-orange-700">
          Login
        </Link>
      </p>
    </form>
  );
}
