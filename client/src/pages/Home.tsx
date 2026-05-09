import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to Homely Made Meals
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Special Wednesday Stir-Fried Spaghetti
        </p>
        <p className="text-lg text-gray-500 mb-8">
          Choose your base spaghetti. Add your preferred proteins or pick a ready-made combo.
        </p>
        <div className="space-x-4">
          <Link to="/menu">
            <Button size="lg">🟢 Order Your Spag Now</Button>
          </Link>
          <Link to="/auth">
            <Button variant="outline" size="lg">Login/Register</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;