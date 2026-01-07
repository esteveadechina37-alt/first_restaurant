import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PublicLayout from '../layouts/PublicLayout';

const HomePage = () => {
  const [email, setEmail] = useState('');

  const features = [
    {
      icon: '🍲',
      title: 'Cuisine Authentique',
      description: 'Recettes traditionnelles béninoise préparées avec les meilleurs ingrédients'
    },
    {
      icon: '⚡',
      title: 'Service Rapide',
      description: 'Commandes prêtes en moins de 30 minutes, livrées chauds directement chez vous'
    },
    {
      icon: '🌟',
      title: 'Qualité Garantie',
      description: 'Ingrédients frais, hygiène irréprochable, satisfaction client assurée'
    },
    {
      icon: '📱',
      title: 'Facile à Commander',
      description: 'Plateforme intuitive pour commander en ligne en quelques clics'
    }
  ];

  const testimonials = [
    {
      name: 'Amara Soumah',
      role: 'Client régulier',
      comment: 'Les saveurs authentiques qui me ramènent à la maison! Excellent service.',
      rating: 5
    },
    {
      name: 'Michel Dossou',
      role: 'Homme d\'affaires',
      comment: 'Parfait pour les repas d\'affaires. Qualité et professionnalisme au rendez-vous.',
      rating: 5
    },
    {
      name: 'Ève Koudou',
      role: 'Étudiante',
      comment: 'Délicieux, abordable et livré vite. Je recommande vivement!',
      rating: 5
    }
  ];

  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="relative h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute w-96 h-96 bg-orange-600 rounded-full -top-20 -left-20"></div>
          <div className="absolute w-96 h-96 bg-amber-500 rounded-full bottom-10 right-10"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full">
            {/* Left - Text */}
            <div className="z-10">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Découvrez les
                <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent"> Saveurs Bénin</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Plongez dans une expérience culinaire authentique avec nos recettes traditionnelles béninoise, préparées avec passion et expertise.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/register"
                  className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-lg font-semibold hover:shadow-lg transition transform hover:scale-105"
                >
                  Commencer Maintenant
                </Link>
                <Link
                  to="/services"
                  className="px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-orange-600 transition"
                >
                  Découvrir Plus
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mt-12">
                <div>
                  <div className="text-3xl font-bold text-orange-400">500+</div>
                  <div className="text-sm text-gray-400">Clients Satisfaits</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-400">50+</div>
                  <div className="text-sm text-gray-400">Plats Disponibles</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-400">4.9⭐</div>
                  <div className="text-sm text-gray-400">Note Moyenne</div>
                </div>
              </div>
            </div>

            {/* Right - Image/Illustration */}
            <div className="z-10 flex justify-center">
              <div className="relative w-96 h-96">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl transform rotate-6"></div>
                <div className="absolute inset-0 bg-white rounded-2xl flex items-center justify-center text-9xl shadow-2xl">
                  🍽️
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Pourquoi Nous Choisir?</h2>
            <p className="text-xl text-gray-600">Nous nous engageons à vous offrir la meilleure expérience culinaire</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-8 bg-gray-50 rounded-xl hover:shadow-lg transition transform hover:-translate-y-2"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Ce Que Disent Nos Clients</h2>
            <p className="text-xl text-gray-600">Rejoignez notre communauté de clients satisfaits</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400">⭐</span>
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.comment}"</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-amber-500 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Prêt à Tester Nos Saveurs?</h2>
          <p className="text-xl mb-8 opacity-90">
            Inscrivez-vous maintenant et recevez une réduction de 10% sur votre première commande
          </p>
          <form className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <input
              type="email"
              placeholder="Votre adresse email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-6 py-3 rounded-lg text-gray-900 flex-grow sm:flex-grow-0 w-full sm:w-64"
            />
            <button
              type="submit"
              className="px-8 py-3 bg-white text-orange-600 font-semibold rounded-lg hover:shadow-lg transition"
            >
              S'Inscrire
            </button>
          </form>
          <Link
            to="/register"
            className="inline-block text-white underline hover:opacity-90 transition"
          >
            Créer un compte complet →
          </Link>
        </div>
      </section>
    </PublicLayout>
  );
};

export default HomePage;
