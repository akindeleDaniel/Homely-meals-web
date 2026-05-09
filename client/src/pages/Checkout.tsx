import { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import type { CheckoutData, PaystackResponse } from '../types';
import api from '../utils/api';

const Checkout = () => {
  const [formData, setFormData] = useState<CheckoutData>({
    email: '',
    phoneNumber: '',
    deliveryType: 'pickup',
    deliveryAddress: '',
    deliveryArea: undefined,
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post<PaystackResponse>('/main/checkout', formData);
      const { paymentUrl } = response.data;

      // Redirect to Paystack
      window.location.href = paymentUrl;
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Checkout failed');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Checkout</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Input
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />

          <div>
            <label className="block text-sm font-medium mb-2">Delivery Type</label>
            <select
              name="deliveryType"
              value={formData.deliveryType}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="pickup">Pickup</option>
              <option value="delivery">Delivery</option>
            </select>
          </div>

          {formData.deliveryType === 'delivery' && (
            <>
              <Input
                name="deliveryAddress"
                placeholder="Delivery Address"
                value={formData.deliveryAddress}
                onChange={handleChange}
                required
              />
              <div>
                <label className="block text-sm font-medium mb-2">Delivery Area</label>
                <select
                  name="deliveryArea"
                  value={formData.deliveryArea || ''}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                >
                  <option value="">Select Area</option>
                  <option value="gk">GK</option>
                  <option value="outside-gk">Outside GK</option>
                </select>
              </div>
            </>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Processing...' : 'Proceed to Payment'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;