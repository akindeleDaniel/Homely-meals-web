import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';

const OrderSuccess = () => {
  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-green-600 mb-4">Order Successful!</h1>
        <p className="text-gray-600 mb-6">
          Thank you for choosing Homely Made Meals. Your order has been placed successfully.
        </p>
        <p className="text-sm text-gray-500 mb-6">
          You will receive a confirmation notification shortly.
        </p>
        <Link to="/menu">
          <Button>Order Again</Button>
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;