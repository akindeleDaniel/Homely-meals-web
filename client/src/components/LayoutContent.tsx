'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

export default function LayoutContent({ children }: { children: React.ReactNode }) {
  const { getTotalItems } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  const totalItems = getTotalItems();

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-orange-200 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4">
          <Link href="/" className="text-2xl font-bold tracking-tight text-orange-600">
            Homely Meals
          </Link>
          <nav className="flex flex-wrap items-center gap-6 text-sm font-medium text-amber-900">
            <Link href="/" className="transition hover:text-orange-600">
              Home
            </Link>
            <Link href="/menu" className="transition hover:text-orange-600">
              Menu
            </Link>
            <Link href="/about" className="transition hover:text-orange-600">
              About
            </Link>
            <Link href="/contact" className="transition hover:text-orange-600">
              Contact
            </Link>
            
            {isAuthenticated ? (
              <>
                <span className="text-amber-700">Hi, {user?.firstName}</span>
                <button 
                  onClick={logout}
                  className="transition hover:text-orange-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link href="/login" className="transition hover:text-orange-600">
                Login
              </Link>
            )}

            <Link href="/cart" className="relative transition hover:text-orange-600">
              Cart
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-red-600 text-center text-xs font-bold text-white">
                  {totalItems}
                </span>
              )}
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t border-orange-200 bg-orange-50">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-sm text-amber-900 sm:flex-row sm:items-center sm:justify-between">
          <p>Homely Meals © {new Date().getFullYear()}. Built for delicious home-style food.</p>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/" className="transition hover:text-orange-600">
              Privacy
            </Link>
            <Link href="/" className="transition hover:text-orange-600">
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
