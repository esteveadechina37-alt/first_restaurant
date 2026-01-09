import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    
    const token = localStorage.getItem('token');
    if (token) {
      const userData = JSON.parse(localStorage.getItem('user') || '{}');
      setUser(userData);
    }
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    toast.success('Déconnexion réussie');
    navigate('/');
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white shadow-2xl' 
        : 'bg-gradient-to-b from-black/30 to-transparent'
    }`}>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 md:gap-3 flex-shrink-0 group">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-orange-500/50 group-hover:scale-110 transition-all duration-300">
              <i className="fas fa-utensils text-white text-lg"></i>
            </div>
            <span className="hidden sm:inline font-black text-lg md:text-xl bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
              Saveur Bénin
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {[
              { to: '/', label: 'Accueil', icon: 'fa-home' },
              { to: '/services', label: 'Services', icon: 'fa-concierge-bell' },
              { to: '/faq', label: 'FAQ', icon: 'fa-question-circle' },
              { to: '/contact', label: 'Contact', icon: 'fa-envelope' }
            ].map((link, idx) => (
              <Link
                key={idx}
                to={link.to}
                className="group px-3 lg:px-4 py-2 text-gray-700 hover:text-orange-600 transition font-medium flex items-center gap-2 rounded-lg hover:bg-orange-50"
              >
                <i className={`fas ${link.icon} group-hover:scale-110 transition-transform`}></i>
                <span>{link.label}</span>
              </Link>
            ))}
          </div>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-4 flex-shrink-0">
            {user ? (
              <div className="flex items-center space-x-2 lg:space-x-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-orange-50 rounded-lg">
                  <i className="fas fa-user-circle text-orange-600"></i>
                  <span className="text-gray-700 font-medium text-sm lg:text-base truncate">{user.name}</span>
                </div>
                <Link
                  to="/dashboard"
                  className="px-4 py-2 bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-lg hover:shadow-lg hover:shadow-orange-500/50 transition font-medium flex items-center gap-2 hover:scale-105"
                >
                  <i className="fas fa-chart-line"></i>
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-orange-600 border-2 border-orange-600 rounded-lg hover:bg-orange-600 hover:text-white transition font-medium flex items-center gap-2"
                >
                  <i className="fas fa-sign-out-alt"></i>
                  Sortir
                </button>
              </div>
            ) : (
              <div className="flex gap-2 lg:gap-4">
                <Link
                  to="/login"
                  className="px-4 py-2 text-orange-600 font-medium hover:text-orange-700 transition flex items-center gap-2"
                >
                  <i className="fas fa-sign-in-alt"></i>
                  <span>Connexion</span>
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-lg hover:shadow-lg hover:shadow-orange-500/50 transition font-medium flex items-center gap-2 hover:scale-105"
                >
                  <i className="fas fa-user-plus"></i>
                  <span>Inscription</span>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-orange-50 transition"
          >
            <i className={`fas fa-${isOpen ? 'times' : 'bars'} text-2xl text-gray-900`}></i>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2 border-t border-gray-200">
            {[
              { to: '/', label: 'Accueil', icon: 'fa-home' },
              { to: '/services', label: 'Services', icon: 'fa-concierge-bell' },
              { to: '/faq', label: 'FAQ', icon: 'fa-question-circle' },
              { to: '/contact', label: 'Contact', icon: 'fa-envelope' }
            ].map((link, idx) => (
              <Link
                key={idx}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition font-medium flex items-center gap-3"
              >
                <i className={`fas ${link.icon} text-orange-600`}></i>
                <span>{link.label}</span>
              </Link>
            ))}

            <div className="pt-4 space-y-2 border-t border-gray-200">
              {user ? (
                <>
                  <div className="px-4 py-2 text-gray-700 font-medium flex items-center gap-2">
                    <i className="fas fa-user-circle text-orange-600"></i>
                    {user.name}
                  </div>
                  <Link
                    to="/dashboard"
                    className="block px-4 py-3 bg-orange-600 text-white rounded-lg font-medium text-center flex items-center justify-center gap-2 hover:bg-orange-700 transition"
                  >
                    <i className="fas fa-chart-line"></i>
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-3 text-orange-600 border-2 border-orange-600 rounded-lg hover:bg-orange-600 hover:text-white transition font-medium flex items-center justify-center gap-2"
                  >
                    <i className="fas fa-sign-out-alt"></i>
                    Sortir
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-3 text-orange-600 font-medium hover:bg-orange-50 rounded-lg transition flex items-center justify-center gap-2"
                  >
                    <i className="fas fa-sign-in-alt"></i>
                    Connexion
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-3 bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-lg hover:shadow-lg transition font-medium flex items-center justify-center gap-2"
                  >
                    <i className="fas fa-user-plus"></i>
                    Inscription
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
