import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export default function Menu() {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    // Fetch dishes from API
    const mockDishes = [
      { id: 1, name: 'Pizza Margherita', category: 'pizzas', price: 12.99, image: '🍕', available: true },
      { id: 2, name: 'Burger Classic', category: 'burgers', price: 9.99, image: '🍔', available: true },
      { id: 3, name: 'Caesar Salad', category: 'salads', price: 8.99, image: '🥗', available: true },
      { id: 4, name: 'Pasta Carbonara', category: 'pastas', price: 13.99, image: '🍝', available: true },
      { id: 5, name: 'Fish & Chips', category: 'main', price: 14.99, image: '🍟', available: true },
    ];
    setDishes(mockDishes);
    setLoading(false);
  }, []);

  const categories = ['all', 'pizzas', 'burgers', 'salads', 'pastas', 'main'];
  const filteredDishes = selectedCategory === 'all' ? dishes : dishes.filter(d => d.category === selectedCategory);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Notre Menu</h1>

      {/* Filtres */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded whitespace-nowrap transition ${
              selectedCategory === cat
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Grille de plats */}
      {loading ? (
        <div className="text-center py-12">Chargement...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDishes.map(dish => (
            <DishCard key={dish.id} dish={dish} onAddToCart={() => toast.success(`${dish.name} ajouté!`)} />
          ))}
        </div>
      )}
    </div>
  );
}

function DishCard({ dish, onAddToCart }) {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden">
      <div className="text-6xl p-4 text-center bg-gray-100">{dish.image}</div>
      <div className="p-4">
        <h3 className="font-bold text-lg">{dish.name}</h3>
        <p className="text-gray-600 text-sm mb-2 capitalize">{dish.category}</p>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-blue-600">${dish.price}</span>
          <button
            onClick={onAddToCart}
            disabled={!dish.available}
            className={`px-3 py-2 rounded transition ${
              dish.available
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-600 cursor-not-allowed'
            }`}
          >
            {dish.available ? 'Ajouter' : 'Indisponible'}
          </button>
        </div>
      </div>
    </div>
  );
}