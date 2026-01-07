import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function Navbar() {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    toast.success('Déconnexion réussie');
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center">
      <h2 className="text-xl font-semibold text-gray-800">Gestion du Restaurant</h2>
      <div className="relative">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-100"
        >
          👤 Mon Profil
        </button>
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg p-4">
            <a href="#" className="block px-4 py-2 hover:bg-gray-100 rounded">Profil</a>
            <a href="#" className="block px-4 py-2 hover:bg-gray-100 rounded">Paramètres</a>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 hover:bg-red-100 text-red-600 rounded"
            >
              Déconnexion
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}