import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const EmployeeDashboard = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [schedule, setSchedule] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    setUser(userData);
    fetchEmployeeData();
  }, []);

  const fetchEmployeeData = async () => {
    try {
      const token = localStorage.getItem('token');
      
      // Fetch today's orders
      const ordersRes = await fetch('/api/orders?date=today', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (ordersRes.ok) {
        setOrders(await ordersRes.json());
      }

      // Fetch schedule
      const scheduleRes = await fetch('/api/schedule/today', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (scheduleRes.ok) {
        setSchedule(await scheduleRes.json());
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const employeeActions = [
    { icon: '📦', title: 'Commandes', desc: 'Voir les commandes du jour', link: '/employee/orders' },
    { icon: '📋', title: 'Mon Planning', desc: 'Vérifier mon horaire', link: '/employee/schedule' },
    { icon: '👤', title: 'Mon Profil', desc: 'Gérer mon profil', link: '/employee/profile' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Mon Espace Employé</h1>
          <div className="text-right">
            <p className="text-gray-700"><strong>{user?.name}</strong></p>
            <p className="text-sm text-gray-600">Employé</p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {employeeActions.map((action, index) => (
            <Link key={index} to={action.link} className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
              <div className="text-5xl mb-4">{action.icon}</div>
              <h3 className="text-xl font-bold text-gray-900">{action.title}</h3>
              <p className="text-gray-600 text-sm">{action.desc}</p>
            </Link>
          ))}
        </div>

        {/* Today's Schedule */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Mon Planning d'Aujourd'hui</h2>
          {schedule ? (
            <div className="bg-white p-6 rounded-xl shadow">
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <p className="text-gray-600 text-sm">Heure d'arrivée</p>
                  <p className="text-2xl font-bold text-gray-900">{schedule.start_time}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Heure de départ</p>
                  <p className="text-2xl font-bold text-gray-900">{schedule.end_time}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Poste</p>
                  <p className="text-2xl font-bold text-gray-900">{schedule.position}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white p-12 rounded-xl shadow text-center">
              <p className="text-gray-600">Pas de planning pour aujourd'hui</p>
            </div>
          )}
        </section>

        {/* Today's Orders */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Commandes d'Aujourd'hui</h2>
          {orders.length > 0 ? (
            <div className="bg-white rounded-xl shadow overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">#Commande</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Client</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Total Plats</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Type</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Statut</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900">#{order.id}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{order.user_name}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{order.items_count} plats</td>
                      <td className="px-6 py-4 text-sm text-gray-600 capitalize">{order.type}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          order.status === 'completed' ? 'bg-green-100 text-green-800' :
                          order.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="bg-white p-12 rounded-xl shadow text-center">
              <p className="text-gray-600 text-lg">Pas de commandes pour aujourd'hui</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default EmployeeDashboard;
