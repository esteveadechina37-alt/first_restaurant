import React, { useState } from 'react';
import PublicLayout from '../../layouts/PublicLayout';

const ServicesPage = () => {
  const [hoveredService, setHoveredService] = useState(null);

  const services = [
    {
      icon: 'fa-truck',
      title: 'Livraison à Domicile',
      description: 'Service rapide et fiable',
      fullDescription: 'Profitez de notre service de livraison rapide et fiable à Cotonou et alentours',
      features: ['Livraison 24h/24', 'Plats toujours chauds', 'Suivi en temps réel', 'Livraison gratuite >20.000 XOF'],
      color: 'from-blue-500 to-blue-600',
      delay: '0s'
    },
    {
      icon: 'fa-store',
      title: 'Retrait en Magasin',
      description: 'Rapide et facile',
      fullDescription: 'Venez récupérer votre commande directement dans nos restaurants',
      features: ['Commande en ligne', 'Retrait rapide', 'Prêt en 20 minutes', 'Parking disponible'],
      color: 'from-green-500 to-green-600',
      delay: '0.1s'
    },
    {
      icon: 'fa-chair',
      title: 'Service sur Place',
      description: 'Ambiance conviviale',
      fullDescription: 'Dégustez nos plats dans une ambiance conviviale et chaleureuse',
      features: ['Ambiance authentique', 'Service professionnel', 'Groupes bienvenus', 'Privatisation possible'],
      color: 'from-orange-500 to-orange-600',
      delay: '0.2s'
    },
    {
      icon: 'fa-champagne-glasses',
      title: 'Événements & Buffets',
      description: 'Catering personnalisé',
      fullDescription: 'Organisez vos événements avec nos services de catering personnalisés',
      features: ['Menus personnalisés', 'Service complet', 'Décoration incluse', 'Devis gratuit'],
      color: 'from-purple-500 to-purple-600',
      delay: '0.3s'
    },
    {
      icon: 'fa-chalkboard',
      title: 'Cours de Cuisine',
      description: 'Apprenez les secrets',
      fullDescription: 'Apprenez à préparer nos plats traditionnels béninois avec nos chefs',
      features: ['Petits groupes', 'Matériel fourni', 'Recettes écrites', 'Dégustation finale'],
      color: 'from-red-500 to-red-600',
      delay: '0.4s'
    },
    {
      icon: 'fa-briefcase',
      title: 'Catering Corporatif',
      description: 'Solutions professionnelles',
      fullDescription: 'Solutions de restauration pour vos réunions et événements professionnels',
      features: ['Menu adapté', 'Facturation flexible', 'Service discret', 'Tarifs de groupe'],
      color: 'from-indigo-500 to-indigo-600',
      delay: '0.5s'
    }
  ];

  const benefits = [
    {
      icon: 'fa-leaf',
      title: 'Produits Frais',
      description: 'Ingrédients sélectionnés chaque jour aux marchés locaux'
    },
    {
      icon: 'fa-book',
      title: 'Recettes Authentiques',
      description: 'Transmises par nos chefs béninois expérimentés'
    },
    {
      icon: 'fa-shield',
      title: 'Hygiène Garantie',
      description: 'Normes sanitaires internationales respectées'
    },
    {
      icon: 'fa-tag',
      title: 'Tarifs Compétitifs',
      description: 'Meilleur rapport qualité-prix de Cotonou'
    }
  ];

  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="relative min-h-[350px] md:min-h-[400px] bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white flex items-center overflow-hidden pt-16 md:pt-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-60 md:w-80 h-60 md:h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-60 md:w-80 h-60 md:h-80 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="text-center">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black mb-4 md:mb-6">
              Nos Services
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto">
              Découvrez tous les moyens de profiter de nos délicieuses spécialités béninoise
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 md:py-20 lg:py-32 bg-white">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-gray-900 text-center mb-3 md:mb-4">
              Services Disponibles
            </h2>
            <div className="flex items-center justify-center gap-3">
              <div className="w-8 md:w-12 h-1 bg-blue-500 rounded-full"></div>
              <p className="text-blue-600 font-bold text-sm md:text-base">Pour Tous les Besoins</p>
              <div className="w-8 md:w-12 h-1 bg-blue-500 rounded-full"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {services.map((service, idx) => (
              <div
                key={idx}
                onMouseEnter={() => setHoveredService(idx)}
                onMouseLeave={() => setHoveredService(null)}
                className="group relative h-full"
                style={{ animation: `fadeInUp 0.6s ease-out ${service.delay}` }}
              >
                {/* Background blur */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 blur-xl`}></div>

                {/* Card */}
                <div className="relative bg-white rounded-2xl p-6 md:p-8 border-2 border-gray-100 hover:border-transparent transition-all duration-300 group-hover:shadow-2xl h-full flex flex-col cursor-pointer">
                  {/* Icon */}
                  <div className={`w-16 md:w-20 h-16 md:h-20 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 md:mb-6 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg`}>
                    <i className={`fas ${service.icon} text-white text-2xl md:text-3xl`}></i>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900 mb-2 group-hover:text-white transition-colors">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm md:text-base text-gray-600 group-hover:text-gray-100 transition-colors mb-4 flex-grow leading-relaxed">
                    {service.fullDescription}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 mb-4 md:mb-6">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs md:text-sm text-gray-700 group-hover:text-gray-100 transition-colors">
                        <i className="fas fa-check-circle text-green-500 group-hover:text-green-300 flex-shrink-0"></i>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Learn More */}
                  <div className="flex items-center gap-2 text-blue-600 font-semibold group-hover:text-white transition-colors text-sm md:text-base">
                    <span>En Savoir Plus</span>
                    <i className="fas fa-arrow-right group-hover:translate-x-2 transition-transform"></i>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 md:py-20 lg:py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-gray-900 mb-3 md:mb-4">
              Pourquoi Nous Faire Confiance?
            </h2>
            <p className="text-gray-600 text-sm md:text-base lg:text-lg max-w-2xl mx-auto">
              Qualité, authenticité et excellence dans chaque service
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {benefits.map((benefit, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-6 md:p-8 border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 text-center group hover:-translate-y-2 cursor-pointer"
              >
                <div className="inline-flex items-center justify-center w-14 md:w-16 h-14 md:h-16 rounded-full bg-blue-100 mb-3 md:mb-4 group-hover:bg-blue-500 transition-colors shadow-md">
                  <i className={`fas ${benefit.icon} text-xl md:text-2xl text-blue-600 group-hover:text-white transition-colors`}></i>
                </div>
                <h3 className="text-base md:text-lg lg:text-xl font-bold text-gray-900 mb-2 md:mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 text-xs md:text-sm lg:text-base leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 lg:py-24 bg-gradient-to-r from-blue-600 to-blue-500 text-white">
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black mb-4 md:mb-6">
            Prêt à Commander?
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-blue-100 mb-6 md:mb-8">
            Choisissez le service qui vous convient le mieux
          </p>
          <button className="group px-6 md:px-8 py-3 md:py-4 bg-white text-blue-600 font-bold rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 mx-auto text-sm md:text-base overflow-hidden relative">
            <span className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-xl"></span>
            <span className="relative flex items-center gap-2">
              <i className="fas fa-shopping-cart group-hover:rotate-12 transition-transform"></i>
              <span>Commencer Maintenant</span>
            </span>
          </button>
        </div>
      </section>
    </PublicLayout>
  );
};

export default ServicesPage;
