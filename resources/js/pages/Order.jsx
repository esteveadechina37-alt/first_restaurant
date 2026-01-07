import { useState } from 'react';
import toast from 'react-hot-toast';

export default function Order() {
  const [orders, setOrders] = useState([
    { id: 1, table: 5, status: 'pending', items: 3, total: 45.99, createdAt: '14:30' },
    { id: 2, table: 8, status: 'preparing', items: 2, total: 28.50, createdAt: '14:45' },
    { id: 3, table: 12, status: 'ready', items: 4, total: 62.30, createdAt: '15:00' },
  ]);

  const updateStatus = (id, newStatus) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
    toast.success('Statut mis à jour');
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'preparing': return 'bg-blue-100 text-blue-800';
      case 'ready': return 'bg-green-100 text-green-800';
      case 'delivered': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Gestion des Commandes</h1>

      <div className="grid grid-cols-4 gap-4">
        <OrderFilter label="En attente" count={1} />
        <OrderFilter label="Préparation" count={1} />
        <OrderFilter label="Prête" count={1} />
        <OrderFilter label="Livrée" count={0} />
      </div>

      <div className="space-y-4">
        {orders.map(order => (
          <div key={order.id} className="bg-white p-6 rounded-lg shadow">
            <div className="grid grid-cols-6 gap-4 items-center">
              <div>
                <p className="font-bold text-lg">Cmd #{order.id}</p>
                <p className="text-sm text-gray-600">Table {order.table}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Articles</p>
                <p className="font-semibold">{order.items}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total</p>
                <p className="font-bold text-lg">${order.total}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Heure</p>
                <p className="font-semibold">{order.createdAt}</p>
              </div>
              <div>
                <select
                  value={order.status}
                  onChange={e => updateStatus(order.id, e.target.value)}
                  className={`px-3 py-2 rounded font-semibold ${getStatusColor(order.status)}`}
                >
                  <option value="pending">En attente</option>
                  <option value="preparing">Préparation</option>
                  <option value="ready">Prête</option>
                  <option value="delivered">Livrée</option>
                </select>
              </div>
              <button className="text-red-600 hover:text-red-800 font-bold">❌</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function OrderFilter({ label, count }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow text-center hover:shadow-lg transition cursor-pointer">
      <p className="font-semibold text-gray-600">{label}</p>
      <p className="text-3xl font-bold text-blue-600">{count}</p>
    </div>
  );
}