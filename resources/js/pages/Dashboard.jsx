import { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState('today');

  const chartData = {
    labels: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
    datasets: [
      {
        label: 'Ventes (€)',
        data: [1200, 1900, 1500, 1800, 2200, 2900, 2500],
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Ventes hebdomadaires',
      },
    },
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <select
          value={timeRange}
          onChange={e => setTimeRange(e.target.value)}
          className="px-4 py-2 border rounded hover:bg-gray-50"
        >
          <option value="today">Aujourd'hui</option>
          <option value="week">Cette semaine</option>
          <option value="month">Ce mois</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard label="Chiffre d'affaires" value="€12,450" change="+12.5%" positive />
        <StatCard label="Commandes" value="156" change="+8.2%" positive />
        <StatCard label="Clients" value="342" change="-2.1%" />
        <StatCard label="Panier moyen" value="€35.40" change="+5.3%" positive />
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <Bar data={chartData} options={chartOptions} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Plats les plus populaires</h2>
          <ul className="space-y-3">
            {['Pizza Margherita', 'Burger Classic', 'Pasta Carbonara', 'Salad Caesar'].map((dish, i) => (
              <li key={i} className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
                <span>{dish}</span>
                <span className="text-gray-600 font-semibold">{45 - i * 8} cmd.</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Performance</h2>
          <div className="space-y-4">
            <ProgressBar label="Satisfaction client" value={92} />
            <ProgressBar label="Taux livraison rapide" value={87} />
            <ProgressBar label="Fidélité clients" value={78} />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, change, positive }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <p className="text-gray-600 font-semibold mb-2">{label}</p>
      <p className="text-3xl font-bold mb-2">{value}</p>
      <p className={`text-sm ${positive ? 'text-green-600' : 'text-red-600'}`}>{change} vs semaine dernière</p>
    </div>
  );
}

function ProgressBar({ label, value }) {
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-sm font-semibold">{label}</span>
        <span className="text-sm font-bold text-blue-600">{value}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${value}%` }}></div>
      </div>
    </div>
  );
}