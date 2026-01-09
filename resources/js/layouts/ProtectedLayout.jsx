import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar';

const ProtectedLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.success('Déconnexion réussie');
    navigate('/login');
  };

  const menuItems = user.role === 'admin' ? [
    { label: 'Tableau de Bord', icon: '📊', path: '/dashboard' },
    { label: 'Employés', icon: '👥', path: '/admin/employees' },
    { label: 'Menu', icon: '🍽️', path: '/admin/dishes' },
    { label: 'Tables', icon: '📍', path: '/admin/tables' },
    { label: 'Paiements', icon: '💳', path: '/admin/payments' },
    { label: 'Rapports', icon: '📈', path: '/admin/reports' }
  ] : user.role === 'employee' ? [
    { label: 'Mon Espace', icon: '👤', path: '/dashboard' },
    { label: 'Commandes', icon: '📦', path: '/employee/orders' },
    { label: 'Mon Planning', icon: '📅', path: '/employee/schedule' }
  ] : [
    { label: 'Mon Tableau de Bord', icon: '🏠', path: '/dashboard' },
    { label: 'Passer Commande', icon: '🍽️', path: '/menu' },
    { label: 'Réserver', icon: '📅', path: '/reservations' },
    { label: 'Mes Commandes', icon: '📦', path: '/my-orders' }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gray-900 text-white transition-all duration-300 overflow-hidden`}>
        {/* Logo */}
        <div className="h-20 flex items-center justify-center border-b border-gray-800">
          {sidebarOpen ? (
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">🍽️</span>
              </div>
              <span className="font-bold text-lg">Saveur Bénin</span>
            </Link>
          ) : (
            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">🍽️</span>
            </div>
          )}
        </div>

        {/* Menu */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition text-gray-300 hover:text-white"
            >
              <span className="text-xl min-w-6">{item.icon}</span>
              {sidebarOpen && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-600 transition text-gray-300 hover:text-white bg-gray-800"
          >
            <span className="text-xl">🚪</span>
            {sidebarOpen && <span>Déconnexion</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white shadow-sm h-20 flex items-center justify-between px-6">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            {sidebarOpen ? '◀️' : '▶️'}
          </button>
          <div className="flex items-center gap-4">
            <span className="text-gray-700 font-medium">{user.name}</span>
            <img 
              src={`https://ui-avatars.com/api/?name=${user.name}`} 
              alt="Avatar" 
              className="w-10 h-10 rounded-full"
            />
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default ProtectedLayout;
