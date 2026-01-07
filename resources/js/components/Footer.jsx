import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-lg">🍽️</span>
              </div>
              <span className="font-bold text-white text-lg">Saveur Bénin</span>
            </div>
            <p className="text-sm">
              Découvrez les saveurs authentiques de la gastronomie béninoise dans une ambiance chaleureuse et accueillante.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Liens Rapides</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-orange-500 transition">Accueil</Link></li>
              <li><Link to="/services" className="hover:text-orange-500 transition">Services</Link></li>
              <li><Link to="/faq" className="hover:text-orange-500 transition">FAQ</Link></li>
              <li><Link to="/contact" className="hover:text-orange-500 transition">Contact</Link></li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-white font-semibold mb-4">Horaires</h3>
            <ul className="space-y-2 text-sm">
              <li>Lundi - Vendredi: 11h30 - 23h</li>
              <li>Samedi: 12h - 24h</li>
              <li>Dimanche: 12h - 23h</li>
              <li className="text-orange-500">Livraison 24h/24</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>📍 Cotonou, Bénin</li>
              <li>📞 +229 95 00 00 00</li>
              <li>✉️ info@saveurbenin.com</li>
              <li className="flex space-x-3 mt-4">
                <a href="#" className="text-orange-500 hover:text-orange-400">Facebook</a>
                <a href="#" className="text-orange-500 hover:text-orange-400">Instagram</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-8"></div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm">
          <p>&copy; {currentYear} Saveur Bénin. Tous droits réservés.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-orange-500 transition">Politique de confidentialité</a>
            <a href="#" className="hover:text-orange-500 transition">Conditions d'utilisation</a>
            <a href="#" className="hover:text-orange-500 transition">Mentions légales</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
