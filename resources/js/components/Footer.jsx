import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const links = {
    produits: [
      { label: 'Accueil', to: '/', icon: 'fa-home' },
      { label: 'Services', to: '/services', icon: 'fa-concierge-bell' },
      { label: 'Menu', to: '/services', icon: 'fa-utensils' },
      { label: 'Nous Contacter', to: '/contact', icon: 'fa-envelope' }
    ],
    entreprise: [
      { label: 'À Propos', to: '#', icon: 'fa-info-circle' },
      { label: 'Carrières', to: '#', icon: 'fa-briefcase' },
      { label: 'Blog', to: '#', icon: 'fa-newspaper' },
      { label: 'Presse', to: '#', icon: 'fa-microphone' }
    ],
    support: [
      { label: 'FAQ', to: '/faq', icon: 'fa-question-circle' },
      { label: 'Contact', to: '/contact', icon: 'fa-phone' },
      { label: 'Conditions', to: '#', icon: 'fa-file-contract' },
      { label: 'Confidentialité', to: '#', icon: 'fa-shield-alt' }
    ]
  };

  const social = [
    { icon: 'fa-facebook-f', link: '#', label: 'Facebook' },
    { icon: 'fa-instagram', link: '#', label: 'Instagram' },
    { icon: 'fa-twitter', link: '#', label: 'Twitter' },
    { icon: 'fa-whatsapp', link: '#', label: 'WhatsApp' },
    { icon: 'fa-youtube', link: '#', label: 'YouTube' }
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-gray-300 mt-12 md:mt-16">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-10 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-6 group">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <i className="fas fa-utensils text-white text-lg"></i>
              </div>
              <span className="font-black text-xl text-white group-hover:text-orange-400 transition-colors">
                Saveur Bénin
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-6 text-gray-400">
              Découvrez les saveurs authentiques de la gastronomie béninoise dans une ambiance chaleureuse et conviviale.
            </p>
            <div className="flex gap-3">
              {social.map((soc, idx) => (
                <a
                  key={idx}
                  href={soc.link}
                  className="w-10 h-10 rounded-full bg-orange-600 flex items-center justify-center text-white hover:bg-orange-500 hover:scale-110 transition-all duration-300"
                  title={soc.label}
                >
                  <i className={`fas ${soc.icon}`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Produits */}
          <div>
            <h3 className="text-white font-black mb-6 flex items-center gap-2">
              <i className="fas fa-utensils text-orange-500"></i>
              <span>Produits</span>
            </h3>
            <ul className="space-y-3">
              {links.produits.map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={link.to}
                    className="text-gray-400 hover:text-orange-400 transition flex items-center gap-2 group"
                  >
                    <i className={`fas ${link.icon} text-orange-500 group-hover:translate-x-1 transition-transform`}></i>
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Entreprise */}
          <div>
            <h3 className="text-white font-black mb-6 flex items-center gap-2">
              <i className="fas fa-building text-orange-500"></i>
              <span>Entreprise</span>
            </h3>
            <ul className="space-y-3">
              {links.entreprise.map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={link.to}
                    className="text-gray-400 hover:text-orange-400 transition flex items-center gap-2 group"
                  >
                    <i className={`fas ${link.icon} text-orange-500 group-hover:translate-x-1 transition-transform`}></i>
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-black mb-6 flex items-center gap-2">
              <i className="fas fa-headset text-orange-500"></i>
              <span>Support</span>
            </h3>
            <ul className="space-y-3">
              {links.support.map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={link.to}
                    className="text-gray-400 hover:text-orange-400 transition flex items-center gap-2 group"
                  >
                    <i className={`fas ${link.icon} text-orange-500 group-hover:translate-x-1 transition-transform`}></i>
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mb-8 pt-8">
          {/* Newsletter Section */}
          <div className="mb-8 pb-8 border-b border-gray-700">
            <div className="bg-gradient-to-r from-orange-600/20 to-orange-500/20 rounded-xl p-6 border border-orange-500/30">
              <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                <i className="fas fa-bell text-orange-400"></i>
                <span>Inscrivez-vous à Notre Newsletter</span>
              </h3>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Votre email..."
                  className="flex-1 px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-500 border border-gray-700 focus:outline-none focus:border-orange-500 transition"
                />
                <button className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-500 transition font-medium flex items-center gap-2">
                  <i className="fas fa-paper-plane"></i>
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <div className="text-gray-400 text-sm flex items-center gap-2">
              <i className="fas fa-copyright text-orange-500"></i>
              <span>{currentYear} Saveur Bénin. Tous droits réservés.</span>
            </div>

            {/* Contact Info */}
            <div className="flex flex-wrap gap-4 text-sm text-gray-400 justify-center md:justify-end">
              <div className="flex items-center gap-2 hover:text-orange-400 transition">
                <i className="fas fa-map-marker-alt text-orange-500"></i>
                <span>Cotonou, Bénin</span>
              </div>
              <div className="flex items-center gap-2 hover:text-orange-400 transition">
                <i className="fas fa-phone text-orange-500"></i>
                <a href="tel:+22995000000">+229 95 00 00 00</a>
              </div>
              <div className="flex items-center gap-2 hover:text-orange-400 transition">
                <i className="fas fa-envelope text-orange-500"></i>
                <a href="mailto:info@saveurbenin.com">info@saveurbenin.com</a>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="pt-8 text-center">
          <p className="text-gray-400 text-sm mb-4 flex items-center justify-center gap-2">
            <i className="fas fa-credit-card text-orange-500"></i>
            <span>Moyens de Paiement Acceptés</span>
          </p>
          <div className="flex flex-wrap gap-4 justify-center text-gray-400">
            <div className="flex items-center gap-1 px-3 py-2 rounded-lg bg-gray-800/50 border border-gray-700">
              <i className="fas fa-cc-visa text-blue-500"></i>
              <span className="text-xs">Visa</span>
            </div>
            <div className="flex items-center gap-1 px-3 py-2 rounded-lg bg-gray-800/50 border border-gray-700">
              <i className="fas fa-cc-mastercard text-red-500"></i>
              <span className="text-xs">Mastercard</span>
            </div>
            <div className="flex items-center gap-1 px-3 py-2 rounded-lg bg-gray-800/50 border border-gray-700">
              <i className="fas fa-mobile-alt text-green-500"></i>
              <span className="text-xs">Mobile Money</span>
            </div>
            <div className="flex items-center gap-1 px-3 py-2 rounded-lg bg-gray-800/50 border border-gray-700">
              <i className="fas fa-bank text-purple-500"></i>
              <span className="text-xs">Virement</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
