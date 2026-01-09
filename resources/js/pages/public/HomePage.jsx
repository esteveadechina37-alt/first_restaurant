import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PublicLayout from '../../layouts/PublicLayout';

const HomePage = () => {
  const [email, setEmail] = useState('');
  const [hoveredCard, setHoveredCard] = useState(null);

  const features = [
    {
      icon: 'fa-utensils',
      title: 'Cuisine Authentique',
      description: 'Recettes traditionnelles béninoise préparées avec passion',
      color: 'from-orange-400 to-orange-600'
    },
    {
      icon: 'fa-bolt',
      title: 'Service Rapide',
      description: 'Commandes prêtes en moins de 30 minutes',
      color: 'from-yellow-400 to-yellow-600'
    },
    {
      icon: 'fa-star',
      title: 'Qualité Garantie',
      description: 'Ingrédients frais et hygiène irréprochable',
      color: 'from-red-400 to-red-600'
    },
    {
      icon: 'fa-mobile',
      title: 'Facile à Commander',
      description: 'Plateforme intuitive et rapide',
      color: 'from-blue-400 to-blue-600'
    }
  ];

  const testimonials = [
    {
      name: 'Amara Soumah',
      role: 'Client régulier',
      comment: 'Les saveurs authentiques qui me ramènent à la maison!',
      avatar: '👨‍🍳',
      rating: 5
    },
    {
      name: 'Michel Dossou',
      role: 'Homme d\'affaires',
      comment: 'Parfait pour les repas d\'affaires. Qualité garantie!',
      avatar: '👔',
      rating: 5
    },
    {
      name: 'Ève Koudou',
      role: 'Étudiante',
      comment: 'Délicieux, abordable et livré super vite!',
      avatar: '👩‍🎓',
      rating: 5
    }
  ];

  const stats = [
    { icon: 'fa-users', value: '500+', label: 'Clients Heureux' },
    { icon: 'fa-utensils', value: '50+', label: 'Plats Savoureux' },
    { icon: 'fa-star', value: '4.9★', label: 'Note Moyenne' },
    { icon: 'fa-clock', value: '30min', label: 'Livraison Moyenne' }
  ];

  return (
    <PublicLayout>
      {/* Hero Section Ultra-Moderne */}
      <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white overflow-hidden flex items-center pt-10 md:pt-0">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-amber-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-red-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" style={{animationDelay: '4s'}}></div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left - Text Content */}
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 bg-orange-500/20 border border-orange-500/50 rounded-full">
                  <i className="fas fa-crown text-orange-400"></i>
                  <span className="text-orange-300 font-semibold text-sm">Meilleur Restaurant Béninois</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
                  Découvrez les
                  <span className="block bg-gradient-to-r from-orange-400 via-orange-300 to-amber-300 bg-clip-text text-transparent mt-3">
                    Saveurs Authentiques
                  </span>
                </h1>

                <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-lg">
                  Immergez-vous dans une expérience culinaire exceptionnelle. Plats traditionnels béninois préparés avec passion par nos chefs experts.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Link
                  to="/register"
                  className="group relative inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-bold text-base sm:text-lg overflow-hidden shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></span>
                  <span className="relative flex items-center gap-2">
                    <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
                    Commencer Maintenant
                  </span>
                </Link>
                <Link
                  to="/services"
                  className="group relative inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 border-2 border-white text-white rounded-xl font-bold text-base sm:text-lg hover:bg-white hover:text-orange-600 transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden"
                >
                  <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></span>
                  <span className="relative flex items-center gap-2">
                    <i className="fas fa-play"></i>
                    Voir les Plats
                  </span>
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 pt-8 border-t border-gray-700">
                {stats.slice(0, 2).map((stat, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <i className={`fas ${stat.icon} text-orange-400 text-xl`}></i>
                      <span className="text-3xl font-bold">{stat.value}</span>
                    </div>
                    <p className="text-gray-400 text-sm">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Visual Element */}
            <div className="flex justify-center items-center relative">
              <div className="relative w-full max-w-sm md:max-w-md">
                {/* Animated dish image with better responsive */}
                <div className="relative z-10 animate-bounce">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl transform rotate-6 blur-lg opacity-50"></div>
                  <div className="relative bg-gradient-to-br from-orange-400 to-orange-600 rounded-3xl p-8 md:p-12 shadow-2xl">
                    <div className="text-center">
                      <img 
                        src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=400&fit=crop" 
                        alt="Plat béninois savoureux" 
                        className="w-full h-48 md:h-56 object-cover rounded-2xl mb-4 shadow-lg"
                      />
                      <h3 className="text-white font-bold text-xl md:text-2xl">Mets Béninois</h3>
                      <p className="text-orange-100 mt-2 text-sm md:text-base">Saveurs Authentiques</p>
                    </div>
                  </div>
                </div>

                {/* Decorative circles */}
                <div className="absolute -top-10 -right-10 w-32 md:w-40 h-32 md:h-40 bg-orange-300 rounded-full opacity-20 blur-2xl animate-pulse"></div>
                <div className="absolute -bottom-10 -left-10 w-32 md:w-40 h-32 md:h-40 bg-amber-300 rounded-full opacity-20 blur-2xl animate-pulse" style={{animationDelay: '1s'}}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              Pourquoi Nous Choisir?
            </h2>
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-1 bg-orange-500 rounded-full"></div>
              <p className="text-orange-600 font-bold">Nos Avantages</p>
              <div className="w-12 h-1 bg-orange-500 rounded-full"></div>
            </div>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Découvrez ce qui rend notre restaurant unique et spécial
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                onMouseEnter={() => setHoveredCard(idx)}
                onMouseLeave={() => setHoveredCard(null)}
                className="group relative h-full"
              >
                {/* Background Card */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 blur-xl`}></div>

                {/* Main Card */}
                <div className="relative bg-white rounded-2xl p-6 md:p-8 border-2 border-gray-100 hover:border-transparent transition-all duration-300 group-hover:shadow-2xl h-full flex flex-col cursor-pointer">
                  {/* Icon */}
                  <div className={`w-14 md:w-16 h-14 md:h-16 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 md:mb-6 transform group-hover:scale-110 transition-transform duration-300 group-hover:rotate-12 shadow-lg`}>
                    <i className={`fas ${feature.icon} text-white text-xl md:text-2xl`}></i>
                  </div>

                  {/* Content */}
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 group-hover:text-white transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 group-hover:text-gray-100 transition-colors flex-grow mb-4">
                    {feature.description}
                  </p>

                  {/* Arrow */}
                  <div className="flex items-center gap-2 text-orange-600 font-semibold group-hover:text-white transition-colors text-sm md:text-base">
                    <span>En Savoir Plus</span>
                    <i className="fas fa-arrow-right group-hover:translate-x-2 transition-transform"></i>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 md:py-16 lg:py-24 bg-gradient-to-r from-orange-600 to-orange-500 text-white">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center space-y-2 md:space-y-3 group cursor-pointer p-2 md:p-4 rounded-lg transition-all duration-300 hover:bg-white/10">
                <i className={`fas ${stat.icon} text-3xl md:text-4xl lg:text-5xl opacity-80 group-hover:opacity-100 transition-opacity`}></i>
                <div className="text-3xl md:text-4xl lg:text-5xl font-black group-hover:scale-110 transition-transform">{stat.value}</div>
                <p className="text-xs md:text-sm lg:text-base text-orange-100 font-semibold">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 md:py-32 bg-gray-50">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              Ce Que Disent Nos Clients
            </h2>
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-1 bg-orange-500 rounded-full"></div>
              <p className="text-orange-600 font-bold">Avis Vérifiés</p>
              <div className="w-12 h-1 bg-orange-500 rounded-full"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-l-4 border-orange-500 group hover:-translate-y-2 cursor-pointer"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <i key={i} className="fas fa-star text-yellow-400"></i>
                  ))}
                </div>

                {/* Comment */}
                <p className="text-sm md:text-base text-gray-700 mb-4 md:mb-6 italic leading-relaxed">
                  "{testimonial.comment}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 md:gap-4 pt-4 md:pt-6 border-t border-gray-200">
                  <div className="text-3xl md:text-4xl">{testimonial.avatar}</div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm md:text-base">{testimonial.name}</p>
                    <p className="text-gray-600 text-xs md:text-sm">{testimonial.role}</p>
                  </div>
                </div>

                {/* Verified Badge */}
                <div className="mt-3 md:mt-4 flex items-center gap-2 text-green-600 text-xs md:text-sm font-semibold">
                  <i className="fas fa-check-circle"></i>
                  Avis Vérifié
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section Final */}
      <section className="py-20 md:py-32 bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>

        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 md:mb-6">
            Prêt à Découvrir Nos Saveurs?
          </h2>
          <p className="text-gray-300 text-base md:text-lg lg:text-xl mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed">
            Rejoignez des centaines de clients satisfaits et recevez une réduction de 10% sur votre première commande!
          </p>

          <form className="flex flex-col sm:flex-row gap-2 md:gap-3 max-w-md mx-auto mb-6 md:mb-8">
            <input
              type="email"
              placeholder="Votre adresse email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 md:px-6 py-3 md:py-4 rounded-xl text-gray-900 font-medium placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm md:text-base transition-all duration-300 hover:shadow-lg"
            />
            <button
              type="submit"
              className="group px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-orange-500/50 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 text-sm md:text-base overflow-hidden relative"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative flex items-center gap-2">
                <i className="fas fa-paper-plane group-hover:rotate-12 transition-transform"></i>
                <span>S'Inscrire</span>
              </span>
            </button>
          </form>

          <Link
            to="/register"
            className="inline-flex items-center justify-center text-orange-400 hover:text-orange-300 transition-colors font-bold text-base md:text-lg gap-2 group"
          >
            <span>Créer un compte complet</span>
            <i className="fas fa-arrow-right group-hover:translate-x-2 transition-transform"></i>
          </Link>
        </div>
      </section>
    </PublicLayout>
  );
};

export default HomePage;
