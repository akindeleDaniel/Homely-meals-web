'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ORDER_STATUSES,
  fetchAdminOrders,
  updateAdminOrderStatus,
  type AdminOrder,
} from '@/lib/api';

const formatItems = (order: AdminOrder) => {
  const items = [
    order.items?.plates > 0 ? `${order.items.plates} x Stir-Fried Spaghetti` : '',
    ...(order.items?.proteins ?? []).map((item) => `${item.quantity} x ${item.name}`),
    ...(order.items?.combos ?? []).map((item) => `${item.quantity} x ${item.name}`),
  ].filter(Boolean);

  return items.join(', ') || 'No items';
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [savingId, setSavingId] = useState('');
  const router = useRouter();

  const loadOrders = async () => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const data = await fetchAdminOrders(token);
      setOrders(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not load orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadOrders();
  }, []);

  const handleStatusChange = async (order: AdminOrder, status: string) => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
      return;
    }

    setSavingId(order.id);
    setError('');
    try {
      const updated = await updateAdminOrderStatus(token, order.id, status);
      setOrders((current) => current.map((item) => (item.id === order.id ? updated : item)));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not update order');
    } finally {
      setSavingId('');
    }
  };

  if (loading) {
    return <div className="p-10 text-center">Loading orders...</div>;
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-10 sm:py-16">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-600">
            Admin
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-amber-900">Orders</h1>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => void loadOrders()}
            className="rounded-lg border-2 border-orange-500 bg-white px-4 py-2 font-bold text-orange-600 transition hover:bg-orange-50"
          >
            Refresh
          </button>
          <Link
            href="/"
            className="rounded-lg bg-red-600 px-4 py-2 font-bold transition hover:bg-red-700"
            style={{ color: '#FFFFFF' }}
          >
            Storefront
          </Link>
        </div>
      </div>

      {error && <div className="mt-6 rounded-lg bg-red-50 p-4 text-red-700">{error}</div>}

      <div className="mt-8 space-y-4">
        {orders.length === 0 ? (
          <div className="rounded-2xl border border-orange-200 bg-white p-8 text-center text-amber-800">
            No orders yet.
          </div>
        ) : (
          orders.map((order) => (
            <article
              key={order.id}
              className="rounded-2xl border border-orange-200 bg-white p-6 shadow-md shadow-orange-900/5"
            >
              <div className="grid gap-6 lg:grid-cols-[1fr_12rem]">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-xl font-bold text-amber-900">
                      {order.userEmail || order.phoneNumber}
                    </h2>
                    <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold uppercase text-orange-700">
                      {order.deliveryType}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-amber-800">{formatItems(order)}</p>
                  <div className="mt-4 grid gap-2 text-sm text-amber-700 sm:grid-cols-2">
                    <p>Phone: {order.phoneNumber}</p>
                    <p>Reference: {order.paymentReference || order.id}</p>
                    <p>
                      Total: {order.currency || '₦'}
                      {order.total.toLocaleString()}
                    </p>
                    <p>{new Date(order.createdAt).toLocaleString()}</p>
                    {order.deliveryAddress && <p>Address: {order.deliveryAddress}</p>}
                    {order.pickupLocation && <p>Pickup: {order.pickupLocation}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-amber-900">Status</label>
                  <select
                    value={order.status}
                    onChange={(event) => void handleStatusChange(order, event.target.value)}
                    disabled={savingId === order.id}
                    className="mt-2 w-full rounded-lg border border-orange-200 px-3 py-2 text-amber-900 focus:border-orange-600 focus:outline-none disabled:opacity-50"
                  >
                    {ORDER_STATUSES.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
