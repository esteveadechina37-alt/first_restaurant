import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalCustomers: 0,
    totalEmployees: 0
  });

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    setUser(userData);
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token');
      
      // Fetch statistics
      const statsRes = await fetch('/api/reports/summary', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (statsRes.ok) {
        const data = await statsRes.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const adminActions = [
    { icon: '👥', title: 'Gestion Employés', desc: 'Créer/modifier les comptes employés', link: '/admin/employees' },
    { icon: '🍽️', title: 'Gestion Menu', desc: 'Ajouter/modifier les plats', link: '/admin/dishes' },
    { icon: '📅', title: 'Gestion Tables', desc: 'Configurer les tables du restaurant', link: '/admin/tables' },
    { icon: '💳', title: 'Paiements', desc: 'Suivi des paiements et factures', link: '/admin/payments' },
    { icon: '📊', title: 'Rapports', desc: 'Statistiques et analyses', link: '/admin/reports' },
    { icon: '⚙️', title: 'Paramètres', desc: 'Configuration du restaurant', link: '/admin/settings' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Tableau de Bord Admin</h1>
          <div className="text-right">
            <p className="text-gray-700"><strong>{user?.name}</strong></p>
            <p className="text-sm text-gray-600">Administrateur</p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white p-6 rounded-xl shadow">
            <div className="text-4xl mb-3">📦</div>
            <p className="text-gray-600 text-sm mb-2">Commandes Totales</p>
            <p className="text-3xl font-bold text-gray-900">{stats.totalOrders}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <div className="text-4xl mb-3">💰</div>
            <p className="text-gray-600 text-sm mb-2">Chiffre d'Affaires</p>
            <p className="text-3xl font-bold text-orange-600">{stats.totalRevenue.toLocaleString()} XOF</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <div className="text-4xl mb-3">👥</div>
            <p className="text-gray-600 text-sm mb-2">Clients</p>
            <p className="text-3xl font-bold text-gray-900">{stats.totalCustomers}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <div className="text-4xl mb-3">👨‍💼</div>
            <p className="text-gray-600 text-sm mb-2">Employés</p>
            <p className="text-3xl font-bold text-gray-900">{stats.totalEmployees}</p>
          </div>
        </div>

        {/* Admin Actions */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Actions de Gestion</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {adminActions.map((action, index) => (
            <Link key={index} to={action.link} className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
              <div className="text-5xl mb-4">{action.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{action.title}</h3>
              <p className="text-gray-600 text-sm">{action.desc}</p>
            </Link>
          ))}
        </div>

        {/* Quick Info */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Recent Orders */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Commandes Récentes</h3>
            <div className="space-y-4">
              <p className="text-gray-600 text-center py-8">Chargement des commandes...</p>
            </div>
          </div>

          {/* Pending Tasks */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Tâches en Attente</h3>
            <div className="space-y-3">
              <div className="p-3 bg-yellow-50 border-l-4 border-yellow-500 rounded">
                <p className="font-semibold text-gray-900">Réservations à confirmer</p>
                <p className="text-sm text-gray-600">2 réservations en attente</p>
              </div>
              <div className="p-3 bg-blue-50 border-l-4 border-blue-500 rounded">
                <p className="font-semibold text-gray-900">Paiements à vérifier</p>
                <p className="text-sm text-gray-600">1 paiement en attente</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
