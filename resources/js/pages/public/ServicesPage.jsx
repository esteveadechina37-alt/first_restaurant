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
      <section className="relative min-h-[400px] bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white flex items-center overflow-hidden pt-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-black mb-6">
              Nos Services
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Découvrez tous les moyens de profiter de nos délicieuses spécialités béninoise
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 md:py-32 bg-white">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-4xl font-black text-gray-900 text-center mb-4">
              Services Disponibles
            </h2>
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-1 bg-blue-500 rounded-full"></div>
              <p className="text-blue-600 font-bold">Pour Tous les Besoins</p>
              <div className="w-12 h-1 bg-blue-500 rounded-full"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                <div className="relative bg-white rounded-2xl p-8 border-2 border-gray-100 hover:border-transparent transition-all duration-300 group-hover:shadow-2xl h-full flex flex-col">
                  {/* Icon */}
                  <div className={`w-20 h-20 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`}>
                    <i className={`fas ${service.icon} text-white text-3xl`}></i>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-white transition-colors">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 group-hover:text-gray-100 transition-colors mb-4 flex-grow">
                    {service.fullDescription}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-700 group-hover:text-gray-100 transition-colors">
                        <i className="fas fa-check-circle text-green-500 group-hover:text-green-300"></i>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Learn More */}
                  <div className="flex items-center gap-2 text-blue-600 font-semibold group-hover:text-white transition-colors">
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
      <section className="py-20 md:py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">
              Pourquoi Nous Faire Confiance?
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Qualité, authenticité et excellence dans chaque service
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-8 border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 text-center group hover:-translate-y-2"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4 group-hover:bg-blue-500 transition-colors">
                  <i className={`fas ${benefit.icon} text-2xl text-blue-600 group-hover:text-white transition-colors`}></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-500 text-white">
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-black mb-6">
            Prêt à Commander?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Choisissez le service qui vous convient le mieux
          </p>
          <button className="px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 mx-auto">
            <i className="fas fa-shopping-cart"></i>
            <span>Commencer Maintenant</span>
          </button>
        </div>
      </section>
    </PublicLayout>
  );
};

export default ServicesPage;
