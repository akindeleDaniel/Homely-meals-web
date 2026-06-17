const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

export interface Protein {
  name: string;
  price: number;
}

export interface Combo {
  name: string;
  price: number;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  proteins?: Protein[];
  combos?: Combo[];
  image?: string;
  availability?: {
    window: string;
    note: string;
  };
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

export async function fetchMenuHome(): Promise<MenuResponse> {
  try {
    const url = `${API_BASE_URL}/menu/home`;
    console.log('Fetching menu from:', url);

    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('Response status:', res.status);

    if (!res.ok) {
      const errorText = await res.text();
      console.error('API Error response:', errorText);
      throw new Error(`Failed to fetch menu: ${res.status} ${res.statusText} - ${errorText}`);
    }
    const data = await res.json();
    console.log('Menu data received:', data);
    return data;
  } catch (error) {
    console.error('Error fetching menu:', error);
    // Fallback to mock data
    console.log('Using mock data as fallback');
    return getMockMenuData();
  }
}

function getMockMenuData(): MenuResponse {
  return {
    headline: 'Special Wednesday Stir-Fried Spaghetti 🍝',
    subtext: 'Choose your base spaghetti. Add your preferred proteins or pick a ready-made combo.',
    orderButtonText: '🟢 Order Your Spag Now',
    baseMeal: {
      name: 'Stir-Fried Spaghetti (No Protein)',
      price: 2000,
      currency: '₦',
    },
    deliveryInfo: {
      window: 'Wednesday 2:00 PM – 5:00 PM',
      note: 'Delivery and pickup available within this time frame only',
    },
    proteins: [
      { name: 'Egg', price: 500 },
      { name: 'Coleslaw', price: 500 },
      { name: 'Beef', price: 1000 },
      { name: 'Fish', price: 1000 },
      { name: 'Plantain + Fish', price: 1500 },
      { name: 'Chicken', price: 1500 },
      { name: 'Sardine', price: 1500 },
    ],
    combos: [
      { name: 'Stir-Fried Spag + Sardine & Fried Fish', price: 4500 },
      { name: 'Stir-Fried Spag + Egg & Fried Fish', price: 4000 },
      { name: 'Stir-Fried Spag + Egg', price: 2500 },
      { name: 'Stir-Fried Spag + Beef', price: 3000 },
      { name: 'Stir-Fried Spag + Fish & Plantain', price: 3500 },
      { name: 'Stir-Fried Spag + Dodo & Beef', price: 3500 },
    ],
  };
}

export async function fetchMealDetail(mealId: string): Promise<MenuItem> {
  try {
    const res = await fetch(`${API_BASE_URL}/menu/${mealId}`);
    if (!res.ok) {
      throw new Error('Failed to fetch meal details');
    }
    return res.json();
  } catch (error) {
    console.error('Error fetching meal detail:', error);
    throw error;
  }
}

export async function fetchAllMeals(): Promise<MenuItem[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/menu`);
    if (!res.ok) {
      throw new Error('Failed to fetch meals');
    }
    return res.json();
  } catch (error) {
    console.error('Error fetching meals:', error);
    throw error;
  }
}
