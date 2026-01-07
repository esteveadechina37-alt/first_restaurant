export default function Home() {
  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8 rounded-lg">
        <h1 className="text-4xl font-bold mb-2">Bienvenue à RestauApp</h1>
        <p className="text-lg opacity-90">Système de gestion de restaurant professionnel</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Commandes" value="24" icon="📦" />
        <StatCard title="Tables" value="12" icon="🪑" />
        <StatCard title="Revenus" value="€1,250" icon="💰" />
        <StatCard title="Clients" value="145" icon="👥" />
      </div>

      <div className="bg-white p-8 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Dernières commandes</h2>
        <div className="space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex justify-between items-center p-4 border rounded hover:bg-gray-50">
              <div>
                <p className="font-semibold">Commande #000{i}</p>
                <p className="text-sm text-gray-600">Table {i + 5}</p>
              </div>
              <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded">En cours</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
      <div className="text-4xl mb-2">{icon}</div>
      <h3 className="text-gray-600 font-semibold">{title}</h3>
      <p className="text-3xl font-bold text-gray-800">{value}</p>
    </div>
  );
}