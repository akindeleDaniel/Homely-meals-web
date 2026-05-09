import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { useCartStore } from '../stores/cartStore';
import type { MenuData, Protein, Combo } from '../types';
import api from '../utils/api';

const Menu = () => {
  const [menuData, setMenuData] = useState<MenuData | null>(null);
  const [selectedProteins, setSelectedProteins] = useState<Protein[]>([]);
  const [selectedCombos, setSelectedCombos] = useState<Combo[]>([]);
  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await api.get('/menu/home');
        setMenuData(response.data);
      } catch (error) {
        console.error('Failed to fetch menu:', error);
      }
    };
    fetchMenu();
  }, []);

  const handleProteinChange = (protein: string, quantity: number) => {
    setSelectedProteins(prev => {
      const existing = prev.find(p => p.name === protein);
      if (quantity === 0) {
        return prev.filter(p => p.name !== protein);
      }
      if (existing) {
        return prev.map(p => p.name === protein ? { ...p, quantity } : p);
      }
      return [...prev, { name: protein, quantity }];
    });
  };

  const handleComboChange = (combo: string, quantity: number) => {
    setSelectedCombos(prev => {
      const existing = prev.find(c => c.name === combo);
      if (quantity === 0) {
        return prev.filter(c => c.name !== combo);
      }
      if (existing) {
        return prev.map(c => c.name === combo ? { ...c, quantity } : c);
      }
      return [...prev, { name: combo, quantity }];
    });
  };

  const handleAddToCart = async () => {
    await addToCart(selectedProteins, selectedCombos);
    setSelectedProteins([]);
    setSelectedCombos([]);
    alert('Added to cart!');
  };

  if (!menuData) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{menuData.headline}</h1>
        <p className="text-lg text-gray-600 mt-2">{menuData.subtext}</p>
        <p className="text-sm text-gray-500 mt-2">{menuData.deliveryInfo.note}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Base Meal</h2>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold">{menuData.baseMeal.name}</h3>
            <p className="text-gray-600">₦{menuData.baseMeal.price}</p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Proteins</h2>
          <div className="space-y-2">
            {menuData.proteins.map((protein) => (
              <div key={protein.name} className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{protein.name}</h3>
                  <p className="text-gray-600">₦{protein.price}</p>
                </div>
                <input
                  type="number"
                  min="0"
                  className="w-16 p-2 border rounded"
                  value={selectedProteins.find(p => p.name === protein.name)?.quantity || 0}
                  onChange={(e) => handleProteinChange(protein.name, parseInt(e.target.value) || 0)}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="md:col-span-2">
          <h2 className="text-2xl font-bold mb-4">Combos</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {menuData.combos.map((combo) => (
              <div key={combo.name} className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{combo.name}</h3>
                  <p className="text-gray-600">₦{combo.price}</p>
                </div>
                <input
                  type="number"
                  min="0"
                  className="w-16 p-2 border rounded"
                  value={selectedCombos.find(c => c.name === combo.name)?.quantity || 0}
                  onChange={(e) => handleComboChange(combo.name, parseInt(e.target.value) || 0)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="text-center mt-8">
        <Button onClick={handleAddToCart} size="lg">
          Add to Cart
        </Button>
        <Link to="/cart" className="ml-4">
          <Button variant="outline" size="lg">View Cart</Button>
        </Link>
      </div>
    </div>
  );
};

export default Menu;