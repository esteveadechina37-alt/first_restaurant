import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const ClientDashboard = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    setUser(userData);
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      
      // Fetch orders
      const ordersRes = await fetch('/api/orders/my-orders', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (ordersRes.ok) {
        setOrders(await ordersRes.json());
      }

      // Fetch reservations
      const reservRes = await fetch('/api/reservations/upcoming', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (reservRes.ok) {
        setReservations(await reservRes.json());
      }
    } catch (error) {
      toast.error('Erreur lors du chargement des données');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Mon Tableau de Bord</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-700">Bienvenue, <strong>{user?.name}</strong></span>
            <img src={`https://ui-avatars.com/api/?name=${user?.name}`} alt="Avatar" className="w-10 h-10 rounded-full" />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Link to="/menu" className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
            <div className="text-4xl mb-3">🍽️</div>
            <h3 className="text-xl font-bold text-gray-900">Passer Commande</h3>
            <p className="text-gray-600 text-sm">Consultez notre menu</p>
          </Link>
          <Link to="/reservations" className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
            <div className="text-4xl mb-3">📅</div>
            <h3 className="text-xl font-bold text-gray-900">Réserver une Table</h3>
            <p className="text-gray-600 text-sm">Réservez dès maintenant</p>
          </Link>
          <Link to="/profile" className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
            <div className="text-4xl mb-3">👤</div>
            <h3 className="text-xl font-bold text-gray-900">Mon Profil</h3>
            <p className="text-gray-600 text-sm">Gérez vos informations</p>
          </Link>
        </div>

        {/* Orders Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Mes Commandes Récentes</h2>
          {orders.length > 0 ? (
            <div className="bg-white rounded-xl shadow overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">#ID</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Total</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Statut</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">#{order.id}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{new Date(order.created_at).toLocaleDateString()}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900">{order.total} XOF</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          order.status === 'completed' ? 'bg-green-100 text-green-800' :
                          order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <Link to={`/orders/${order.id}`} className="text-orange-600 hover:text-orange-700 font-semibold">
                          Détails
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="bg-white p-12 rounded-xl shadow text-center">
              <p className="text-gray-600 text-lg">Aucune commande pour le moment</p>
              <Link to="/menu" className="mt-4 inline-block px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700">
                Passer votre première commande
              </Link>
            </div>
          )}
        </section>

        {/* Reservations Section */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Mes Réservations</h2>
          {reservations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reservations.map((res) => (
                <div key={res.id} className="bg-white p-6 rounded-xl shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">Table {res.table_id}</h3>
                      <p className="text-gray-600 text-sm">Pour {res.number_of_people} personnes</p>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                      Confirmée
                    </span>
                  </div>
                  <p className="text-gray-700 mb-4">
                    📅 {new Date(res.reservation_date).toLocaleDateString()} à {res.reservation_time}
                  </p>
                  <button className="w-full px-4 py-2 border border-orange-600 text-orange-600 rounded-lg hover:bg-orange-50 transition">
                    Modifier
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white p-12 rounded-xl shadow text-center">
              <p className="text-gray-600 text-lg">Aucune réservation pour le moment</p>
              <Link to="/reservations" className="mt-4 inline-block px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700">
                Faire une réservation
              </Link>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default ClientDashboard;
