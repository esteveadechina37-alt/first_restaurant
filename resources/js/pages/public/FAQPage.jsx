import React, { useState } from 'react';
import PublicLayout from '../layouts/PublicLayout';

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      category: 'Commandes et Livraison',
      questions: [
        {
          q: 'Quel est le délai de livraison?',
          a: 'Généralement 30 minutes pour Cotonou centre. Les délais peuvent varier selon votre localisation. Vous recevrez une estimation exacte lors de votre commande.'
        },
        {
          q: 'Quels sont les frais de livraison?',
          a: 'La livraison est gratuite pour les commandes de plus de 20.000 XOF. Pour les commandes inférieures, les frais sont de 1.000 XOF.'
        },
        {
          q: 'Livrez-vous les dimanches et jours fériés?',
          a: 'Oui, nous livrons 24h/24 y compris les dimanches et jours fériés, sauf mention spéciale.'
        },
        {
          q: 'Puis-je modifier ma commande après l\'avoir passée?',
          a: 'Oui, tant qu\'elle n\'a pas été acceptée par notre équipe. Contactez-nous au +229 95 00 00 00 rapidement.'
        }
      ]
    },
    {
      category: 'Menu et Plats',
      questions: [
        {
          q: 'Proposez-vous des options végétariennes?',
          a: 'Oui! Nous avons plusieurs plats 100% végétariens et des alternatives pour la plupart de nos plats.'
        },
        {
          q: 'Quels sont les allergènes dans vos plats?',
          a: 'Tous nos plats mentionnent les allergènes potentiels. Contactez-nous si vous avez des allergies spécifiques.'
        },
        {
          q: 'Puis-je personnaliser mon plat?',
          a: 'Absolument! Vous pouvez ajouter des notes spéciales lors de la commande (plus/moins de sel, épices, etc.)'
        },
        {
          q: 'Proposez-vous des menus enfants?',
          a: 'Oui, nous avons un menu enfants avec portions adaptées et prix réduits.'
        }
      ]
    },
    {
      category: 'Paiement et Facturation',
      questions: [
        {
          q: 'Quels modes de paiement acceptez-vous?',
          a: 'Nous acceptons: Moov Money, MTN Money, Carte bancaire, Paiement à la livraison (Cotonou seulement).'
        },
        {
          q: 'Est-ce sécurisé de payer en ligne?',
          a: 'Oui, tous nos paiements sont cryptés avec les protocoles SSL 256-bit. Vos données bancaires ne nous sont jamais transmises.'
        },
        {
          q: 'Puis-je obtenir une facture?',
          a: 'Bien sûr! Vous recevrez une facture par email après chaque commande. Contactez-nous pour les factures personnalisées.'
        }
      ]
    },
    {
      category: 'Compte et Profil',
      questions: [
        {
          q: 'Comment créer un compte?',
          a: 'Cliquez sur \"Inscription\" dans le menu, remplissez vos informations et validez. C\'est gratuit et rapide!'
        },
        {
          q: 'Comment changer mon mot de passe?',
          a: 'Allez dans vos paramètres de compte > Sécurité > Changer le mot de passe.'
        },
        {
          q: 'Puis-je avoir plusieurs adresses de livraison?',
          a: 'Oui, vous pouvez ajouter jusqu\'à 5 adresses dans votre profil et les gérer facilement.'
        }
      ]
    },
    {
      category: 'Réclamations et Remboursement',
      questions: [
        {
          q: 'Que faire si mon plat n\'est pas satisfaisant?',
          a: 'Contactez-nous immédiatement. Nous proposons un remboursement ou un remplacement du plat garanti.'
        },
        {
          q: 'Quel est le délai de remboursement?',
          a: 'Les remboursements sont traités dans 24-48 heures vers votre compte d\'origine.'
        },
        {
          q: 'Puis-je annuler ma commande?',
          a: 'Oui, tant qu\'elle n\'a pas commencé à être préparée. Vous recevrez un remboursement complet.'
        }
      ]
    }
  ];

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Foire aux Questions</h1>
          <p className="text-xl text-gray-300">Trouvez les réponses à vos questions les plus courantes</p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          {faqs.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 pb-4 border-b-2 border-orange-500">
                {category.category}
              </h2>

              <div className="space-y-4">
                {category.questions.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition"
                  >
                    <button
                      onClick={() =>
                        setOpenIndex(
                          openIndex === `${categoryIndex}-${itemIndex}` ? null : `${categoryIndex}-${itemIndex}`
                        )
                      }
                      className="w-full p-6 bg-gray-50 hover:bg-gray-100 transition flex items-center justify-between font-semibold text-gray-900"
                    >
                      <span>{item.q}</span>
                      <span
                        className={`transform transition-transform ${
                          openIndex === `${categoryIndex}-${itemIndex}` ? 'rotate-180' : ''
                        }`}
                      >
                        ▼
                      </span>
                    </button>

                    {openIndex === `${categoryIndex}-${itemIndex}` && (
                      <div className="p-6 bg-white border-t border-gray-200">
                        <p className="text-gray-700 leading-relaxed">{item.a}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-gradient-to-r from-orange-600 to-amber-500 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Vous n\'avez pas trouvé votre réponse?</h2>
          <p className="text-lg mb-8">Notre équipe est disponible 24/7 pour vous aider</p>
          <button className="px-8 py-3 bg-white text-orange-600 font-semibold rounded-lg hover:shadow-lg transition mr-4 mb-4">
            Nous Contacter
          </button>
          <a
            href="tel:+22995000000"
            className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-orange-600 transition inline-block"
          >
            Appeler +229 95 00 00 00
          </a>
        </div>
      </section>
    </PublicLayout>
  );
};

export default FAQPage;
