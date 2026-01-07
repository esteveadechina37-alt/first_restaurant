import React from 'react';
import PublicLayout from '../layouts/PublicLayout';

const ServicesPage = () => {
  const services = [
    {
      icon: '🚚',
      title: 'Livraison à Domicile',
      description: 'Profitez de notre service de livraison rapide et fiable à Cotonou et alentours',
      features: ['Livraison 24h/24', 'Plats toujours chauds', 'Suivi en temps réel', 'Livraison gratuite >20.000 XOF']
    },
    {
      icon: '🏪',
      title: 'Retrait en Magasin',
      description: 'Venez récupérer votre commande directement dans nos restaurants',
      features: ['Commande en ligne', 'Retrait rapide', 'Prêt en 20 minutes', 'Parking disponible']
    },
    {
      icon: '🪑',
      title: 'Service sur Place',
      description: 'Dégustez nos plats dans une ambiance conviviale et chaleureuse',
      features: ['Ambiance authentique', 'Service professionnel', 'Groupes bienvenus', 'Privatisation possible']
    },
    {
      icon: '🎉',
      title: 'Événements & Buffets',
      description: 'Organisez vos événements avec nos services de catering personnalisés',
      features: ['Menus personnalisés', 'Service complet', 'Décoration incluse', 'Devis gratuit']
    },
    {
      icon: '👨‍🍳',
      title: 'Cours de Cuisine',
      description: 'Apprenez à préparer nos plats traditionnels béninois avec nos chefs',
      features: ['Petits groupes', 'Matériel fourni', 'Recettes écrites', 'Dégustation finale']
    },
    {
      icon: '🍴',
      title: 'Catering Corporatif',
      description: 'Solutions de restauration pour vos réunions et événements professionnels',
      features: ['Menu adapté', 'Facturation flexible', 'Service discret', 'Tarifs de groupe']
    }
  ];

  const benefits = [
    { title: 'Produits Frais', description: 'Ingrédients sélectionnés chaque jour aux marchés locaux' },
    { title: 'Recettes Authentiques', description: 'Transmises par nos chefs béninois expérimentés' },
    { title: 'Hygiène Garantie', description: 'Normes sanitaires internationales respectées' },
    { title: 'Tarifs Compétitifs', description: 'Meilleur rapport qualité-prix de Cotonou' }
  ];

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Nos Services</h1>
          <p className="text-xl text-gray-300">Plusieurs façons de découvrir nos délicieuses saveurs béninoise</p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="p-8 bg-gray-50 rounded-xl border-t-4 border-orange-500 hover:shadow-lg transition"
              >
                <div className="text-5xl mb-4">{service.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-gray-700">
                      <span className="text-orange-500 mr-3">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">Pourquoi Nous Choisir?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-md text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Info */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">Tarifs</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Livraison', price: 'Gratuite >20k', details: ['Plats chauds', 'Suivi GPS', '30 min max'] },
              { title: 'Retrait', price: 'Gratuit', details: ['Prêt en 20 min', 'Parking', 'Réchauffage inclus'] },
              { title: 'Sur Place', price: 'Prix plat', details: ['Boissons incluses', 'Service complet', 'Ambiance'] }
            ].map((pricing, index) => (
              <div key={index} className="p-8 bg-gray-50 rounded-xl text-center border-b-4 border-orange-500">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{pricing.title}</h3>
                <p className="text-3xl font-bold text-orange-600 mb-6">{pricing.price}</p>
                <ul className="space-y-2 text-gray-700">
                  {pricing.details.map((detail, i) => (
                    <li key={i}>✓ {detail}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-orange-600 to-amber-500 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-6">Prêt à Commander?</h2>
          <button className="px-8 py-4 bg-white text-orange-600 font-semibold rounded-lg hover:shadow-lg transition">
            Commander Maintenant
          </button>
        </div>
      </section>
    </PublicLayout>
  );
};

export default ServicesPage;
