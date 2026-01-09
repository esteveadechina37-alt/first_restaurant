import React, { useState } from 'react';
import PublicLayout from '../../layouts/PublicLayout';

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const categories = [
    {
      icon: 'fa-shopping-cart',
      name: 'Commandes et Livraison',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: 'fa-utensils',
      name: 'Menu et Plats',
      color: 'from-orange-500 to-orange-600'
    },
    {
      icon: 'fa-credit-card',
      name: 'Paiement et Facturation',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: 'fa-user',
      name: 'Compte et Profil',
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const faqs = {
    'Commandes et Livraison': [
      {
        q: 'Quel est le délai de livraison?',
        a: 'Généralement 30 minutes pour Cotonou centre. Les délais peuvent varier selon votre localisation. Vous recevrez une estimation exacte lors de votre commande.',
        icon: 'fa-clock'
      },
      {
        q: 'Quels sont les frais de livraison?',
        a: 'La livraison est gratuite pour les commandes de plus de 20.000 XOF. Pour les commandes inférieures, les frais sont de 1.000 XOF.',
        icon: 'fa-truck'
      },
      {
        q: 'Livrez-vous les dimanches et jours fériés?',
        a: 'Oui, nous livrons 24h/24 y compris les dimanches et jours fériés, sauf mention spéciale.',
        icon: 'fa-calendar'
      },
      {
        q: 'Puis-je modifier ma commande après l\'avoir passée?',
        a: 'Oui, tant qu\'elle n\'a pas été acceptée par notre équipe. Contactez-nous au +229 95 00 00 00 rapidement.',
        icon: 'fa-edit'
      }
    ],
    'Menu et Plats': [
      {
        q: 'Proposez-vous des options végétariennes?',
        a: 'Oui! Nous avons plusieurs plats 100% végétariens et des alternatives pour la plupart de nos plats.',
        icon: 'fa-leaf'
      },
      {
        q: 'Quels sont les allergènes dans vos plats?',
        a: 'Tous nos plats mentionnent les allergènes potentiels. Contactez-nous si vous avez des allergies spécifiques.',
        icon: 'fa-exclamation-triangle'
      },
      {
        q: 'Puis-je personnaliser mon plat?',
        a: 'Absolument! Vous pouvez ajouter des notes spéciales lors de la commande (plus/moins de sel, épices, etc.)',
        icon: 'fa-palette'
      },
      {
        q: 'Proposez-vous des menus enfants?',
        a: 'Oui, nous avons un menu enfants avec portions adaptées et prix réduits.',
        icon: 'fa-child'
      }
    ],
    'Paiement et Facturation': [
      {
        q: 'Quels moyens de paiement acceptez-vous?',
        a: 'Nous acceptons les cartes bancaires, Mobile Money, virement bancaire et espèces à la livraison.',
        icon: 'fa-wallet'
      },
      {
        q: 'Est-ce que les paiements sont sécurisés?',
        a: 'Oui, tous nos paiements sont sécurisés avec le protocole SSL et la conformité PCI-DSS.',
        icon: 'fa-lock'
      },
      {
        q: 'Puis-je obtenir une facture pour ma commande?',
        a: 'Oui, une facture est automatiquement générée et envoyée à votre email après confirmation du paiement.',
        icon: 'fa-file-invoice'
      },
      {
        q: 'Y a-t-il une politique de remboursement?',
        a: 'Oui, remboursement intégral si la livraison n\'a pas lieu dans les 45 minutes prévues.',
        icon: 'fa-undo'
      }
    ],
    'Compte et Profil': [
      {
        q: 'Comment créer un compte?',
        a: 'Cliquez sur "S\'inscrire", remplissez vos informations et confirmez votre email. C\'est gratuit!',
        icon: 'fa-user-plus'
      },
      {
        q: 'Comment réinitialiser mon mot de passe?',
        a: 'Cliquez sur "Mot de passe oublié" sur la page de connexion et suivez les instructions.',
        icon: 'fa-key'
      },
      {
        q: 'Puis-je avoir plusieurs adresses de livraison?',
        a: 'Oui! Vous pouvez ajouter et gérer plusieurs adresses depuis votre profil.',
        icon: 'fa-map-marker'
      },
      {
        q: 'Comment contacter le support?',
        a: 'Vous pouvez nous contacter par email, téléphone ou via le chat en direct disponible 24h/24.',
        icon: 'fa-headset'
      }
    ]
  };

  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="relative min-h-[300px] bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white flex items-center overflow-hidden pt-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-black mb-6">
              Questions Fréquentes
            </h1>
            <p className="text-xl text-gray-300">
              Trouvez les réponses à vos questions
            </p>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {categories.map((cat, idx) => (
              <div
                key={idx}
                className="group p-6 rounded-xl border-2 border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-2 text-center"
              >
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${cat.color} flex items-center justify-center mb-4 mx-auto transform group-hover:scale-110 transition-transform`}>
                  <i className={`fas ${cat.icon} text-white text-2xl`}></i>
                </div>
                <h3 className="font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                  {cat.name}
                </h3>
              </div>
            ))}
          </div>

          {/* FAQs by Category */}
          <div className="max-w-3xl mx-auto">
            {Object.entries(faqs).map((entry, catIdx) => {
              const [categoryName, questions] = entry;
              return (
                <div key={catIdx} className="mb-12">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="flex-1 h-0.5 bg-gray-300"></div>
                    <h2 className="text-2xl font-black text-gray-900 whitespace-nowrap">
                      <i className={`fas ${categories[catIdx]?.icon} text-purple-600 mr-3`}></i>
                      {categoryName}
                    </h2>
                    <div className="flex-1 h-0.5 bg-gray-300"></div>
                  </div>

                  <div className="space-y-4">
                    {questions.map((faq, qIdx) => {
                      const isOpen = openIndex === `${catIdx}-${qIdx}`;
                      return (
                        <div
                          key={qIdx}
                          className="border-2 border-gray-200 rounded-xl overflow-hidden hover:border-purple-300 transition-all duration-300"
                        >
                          <button
                            onClick={() => setOpenIndex(isOpen ? null : `${catIdx}-${qIdx}`)}
                            className="w-full px-6 py-4 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex items-center gap-4 text-left flex-1">
                              <i className={`fas ${faq.icon} text-purple-600 text-xl flex-shrink-0`}></i>
                              <span className="font-bold text-gray-900">{faq.q}</span>
                            </div>
                            <i className={`fas fa-chevron-down text-purple-600 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}></i>
                          </button>

                          {isOpen && (
                            <div className="px-6 py-4 bg-gradient-to-br from-purple-50 to-gray-50 border-t-2 border-gray-200">
                              <p className="text-gray-700 leading-relaxed">
                                {faq.a}
                              </p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-black text-gray-900 mb-6">
            Vous N'avez Pas Trouvé la Réponse?
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            Notre équipe support est disponible 24h/24, 7j/7 pour vous aider
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-purple-600 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2">
              <i className="fas fa-envelope"></i>
              <span>Nous Contacter</span>
            </button>
            <button className="px-8 py-4 border-2 border-purple-600 text-purple-600 font-bold rounded-xl hover:bg-purple-600 hover:text-white transition-all duration-300 flex items-center justify-center gap-2">
              <i className="fas fa-headset"></i>
              <span>Chat en Direct</span>
            </button>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default FAQPage;
