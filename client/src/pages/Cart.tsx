import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { useCartStore } from '../stores/cartStore';

const Cart = () => {
  const { cart, loading, getCart } = useCartStore();

  useEffect(() => {
    getCart();
  }, [getCart]);

  if (loading) return <div>Loading...</div>;

  if (!cart || !cart.items) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
        <p className="text-gray-600 mb-4">Your cart is empty.</p>
        <Link to="/menu">
          <Button>Go to Menu</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="space-y-4">
          {cart.items.proteins?.map((protein, index) => (
            <div key={index} className="flex justify-between">
              <span>{protein.quantity} x {protein.name}</span>
              <span>₦{(protein.quantity * 500).toFixed(2)}</span> {/* Assuming price */}
            </div>
          ))}
          {cart.items.combos?.map((combo, index) => (
            <div key={index} className="flex justify-between">
              <span>{combo.quantity} x {combo.name}</span>
              <span>₦{(combo.quantity * 3000).toFixed(2)}</span> {/* Assuming price */}
            </div>
          ))}
        </div>

        <div className="border-t mt-4 pt-4">
          <div className="flex justify-between text-lg font-semibold">
            <span>Subtotal:</span>
            <span>₦{cart.subtotal.toFixed(2)}</span>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link to="/checkout">
            <Button size="lg">Proceed to Checkout</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;