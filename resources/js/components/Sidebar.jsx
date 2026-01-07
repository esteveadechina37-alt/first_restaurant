import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

export default function Sidebar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);

  const links = [
    { path: '/', label: '🏠 Accueil' },
    { path: '/menu', label: '🍽️ Menu' },
    { path: '/order', label: '📦 Commandes' },
    { path: '/dashboard', label: '📊 Dashboard' },
  ];

  return (
    <aside className={`bg-slate-900 text-white transition-all ${isOpen ? 'w-64' : 'w-20'}`}>
      <div className="p-4 flex items-center justify-between">
        {isOpen && <h1 className="text-xl font-bold">RestauApp</h1>}
        <button onClick={() => setIsOpen(!isOpen)} className="p-2 hover:bg-slate-800 rounded">
          {isOpen ? '◀' : '▶'}
        </button>
      </div>
      <nav className="mt-8">
        {links.map(link => (
          <Link
            key={link.path}
            to={link.path}
            className={`block px-4 py-3 hover:bg-slate-800 transition ${
              location.pathname === link.path ? 'bg-blue-600' : ''
            }`}
          >
            <span className={isOpen ? '' : 'text-xl'}>{isOpen ? link.label : link.label.split(' ')[0]}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}