const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

export interface Protein {
  name: string;
  price: number;
}

export interface Combo {
  name: string;
  price: number;
}

export interface MenuResponse {
  headline: string;
  subtext: string;
  orderButtonText: string;
  baseMeal: {
    name: string;
    price: number;
    currency: string;
  };
  deliveryInfo: {
    window: string;
    note: string;
  };
  proteins: Protein[];
  combos: Combo[];
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

export interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
}

export interface CartLine {
  name: string;
  quantity: number;
}

export interface CartInput {
  plates?: number;
  proteins?: CartLine[];
  combos?: CartLine[];
}

export interface ServerCart {
  items: {
    plates: number;
    proteins: CartLine[];
    combos: CartLine[];
  };
  subtotal: number;
  currency: string;
  itemsText: string;
}

export interface CheckoutPayload {
  email: string;
  phoneNumber: string;
  deliveryType: 'pickup' | 'delivery';
  deliveryArea?: 'gk' | 'outside-gk';
  deliveryAddress?: string;
  callbackUrl?: string;
}

export interface CheckoutResponse {
  paymentUrl: string;
  orderRef: string;
}

export interface AdminOrder {
  id: string;
  userEmail?: string;
  paymentReference?: string;
  phoneNumber: string;
  items: ServerCart['items'];
  subtotal: number;
  currency?: string;
  deliveryFee: number;
  total: number;
  status: string;
  deliveryType: 'pickup' | 'delivery';
  deliveryAddress?: string;
  pickupLocation?: string;
  deliveryWindow?: string;
  createdAt: string;
  updatedAt?: string;
}

export const ORDER_STATUSES = ['pending', 'paid', 'preparing', 'ready', 'delivered'] as const;

async function apiRequest<T>(
  path: string,
  options: RequestInit = {},
  token?: string | null
): Promise<T> {
  const headers = new Headers(options.headers);
  headers.set('Content-Type', 'application/json');

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || errorData.error || `Request failed with ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export async function fetchMenuHome(): Promise<MenuResponse> {
  return apiRequest<MenuResponse>('/menu/home');
}

export async function loginCustomer(email: string, password: string) {
  return apiRequest<AuthResponse>('/main/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export async function registerCustomer(data: RegisterPayload) {
  return apiRequest<AuthResponse>('/main/register', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function fetchCart(token: string) {
  return apiRequest<ServerCart>('/main/cart', {}, token);
}

export async function addToServerCart(token: string, data: CartInput) {
  return apiRequest<ServerCart>(
    '/main/cart/add',
    {
      method: 'POST',
      body: JSON.stringify(data),
    },
    token
  );
}

export async function saveServerCart(token: string, data: CartInput) {
  return apiRequest<ServerCart>(
    '/main/cart',
    {
      method: 'PUT',
      body: JSON.stringify(data),
    },
    token
  );
}

export async function clearServerCart(token: string) {
  return apiRequest<{ message: string }>(
    '/main/cart',
    {
      method: 'DELETE',
    },
    token
  );
}

export async function checkoutOrder(token: string, data: CheckoutPayload) {
  return apiRequest<CheckoutResponse>(
    '/main/checkout',
    {
      method: 'POST',
      body: JSON.stringify(data),
    },
    token
  );
}

export async function placePaidOrder(token: string, data: CheckoutPayload & { orderRef: string }) {
  return apiRequest<{ message: string }>(
    '/main/order',
    {
      method: 'POST',
      body: JSON.stringify(data),
    },
    token
  );
}

export async function loginAdmin(email: string, password: string) {
  return apiRequest<{ token: string; admin: { name: string; email: string }; message: string }>(
    '/admin/login',
    {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }
  );
}

export async function fetchAdminOrders(token: string) {
  return apiRequest<AdminOrder[]>('/admin/orders', {}, token);
}

export async function updateAdminOrderStatus(token: string, id: string, status: string) {
  return apiRequest<AdminOrder>(
    `/admin/orders/${id}`,
    {
      method: 'PUT',
      body: JSON.stringify({ status }),
    },
    token
  );
}
