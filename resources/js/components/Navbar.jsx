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
      scrolled ? 'bg-white shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl font-bold">🍽️</span>
            </div>
            <span className="hidden md:inline font-bold text-xl text-gray-900">
              Saveur Bénin
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            <Link to="/" className="px-4 py-2 text-gray-700 hover:text-orange-600 transition">
              Accueil
            </Link>
            <Link to="/services" className="px-4 py-2 text-gray-700 hover:text-orange-600 transition">
              Services
            </Link>
            <Link to="/faq" className="px-4 py-2 text-gray-700 hover:text-orange-600 transition">
              FAQ
            </Link>
            <Link to="/contact" className="px-4 py-2 text-gray-700 hover:text-orange-600 transition">
              Contact
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700 font-medium">{user.name}</span>
                <Link
                  to="/dashboard"
                  className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                >
                  Déconnexion
                </button>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                >
                  Connexion
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition"
                >
                  Inscription
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-orange-600"
          >
            <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 py-4 space-y-2">
            <Link to="/" className="block px-4 py-2 text-gray-700 hover:bg-orange-50">
              Accueil
            </Link>
            <Link to="/services" className="block px-4 py-2 text-gray-700 hover:bg-orange-50">
              Services
            </Link>
            <Link to="/faq" className="block px-4 py-2 text-gray-700 hover:bg-orange-50">
              FAQ
            </Link>
            <Link to="/contact" className="block px-4 py-2 text-gray-700 hover:bg-orange-50">
              Contact
            </Link>
            {!user && (
              <>
                <Link to="/login" className="block px-4 py-2 text-gray-700 hover:bg-orange-50">
                  Connexion
                </Link>
                <Link to="/register" className="block px-4 py-2 text-orange-600 font-medium hover:bg-orange-50">
                  Inscription
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;