import React, { useState } from 'react';
import toast from 'react-hot-toast';
import PublicLayout from '../../layouts/PublicLayout';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Message envoyé avec succès! Nous vous recontacterons bientôt.');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      toast.error('Erreur lors de l\'envoi du message. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: 'fa-map-marker-alt',
      title: 'Adresse',
      content: 'Cotonou, Bénin',
      subtext: 'Présents à Cotonou, Parakou et Abomey',
      color: 'from-red-500 to-red-600'
    },
    {
      icon: 'fa-phone',
      title: 'Téléphone',
      content: '+229 95 00 00 00',
      subtext: 'Disponible 24h/24 - Ouvert tous les jours',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: 'fa-envelope',
      title: 'Email',
      content: 'info@saveurbenin.com',
      subtext: 'Réponse garantie en moins de 2h',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: 'fa-clock',
      title: 'Horaires',
      content: '24h/24 - 7j/7',
      subtext: 'Service continu sans interruption',
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const subjects = [
    'Général',
    'Réclamation',
    'Suggestion',
    'Partnership',
    'Emploi',
    'Autre'
  ];

  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="relative min-h-[350px] bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white flex items-center overflow-hidden pt-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-red-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-black mb-6">
              Contactez-Nous
            </h1>
            <p className="text-xl text-gray-300">
              Nous sommes toujours heureux de vous aider. Envoyez-nous un message et nous vous répondrons rapidement.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 md:py-24 bg-white">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, idx) => (
              <div
                key={idx}
                className="group relative"
              >
                {/* Background blur */}
                <div className={`absolute inset-0 bg-gradient-to-br ${info.color} rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 blur-xl`}></div>

                {/* Card */}
                <div className="relative bg-white rounded-2xl p-8 border-2 border-gray-100 hover:border-transparent transition-all duration-300 group-hover:shadow-2xl text-center">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${info.color} flex items-center justify-center mb-4 mx-auto transform group-hover:scale-110 transition-transform`}>
                    <i className={`fas ${info.icon} text-white text-2xl`}></i>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {info.title}
                  </h3>
                  
                  <p className="text-2xl font-black text-gray-900 mb-2 group-hover:text-white transition-colors">
                    {info.content}
                  </p>
                  
                  <p className="text-sm text-gray-600 group-hover:text-gray-100 transition-colors">
                    {info.subtext}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl p-8 md:p-10 border-2 border-gray-200 shadow-lg">
              <h2 className="text-3xl font-black text-gray-900 mb-2 flex items-center gap-3">
                <i className="fas fa-paper-plane text-red-600"></i>
                Envoyez-Nous un Message
              </h2>
              <p className="text-gray-600 mb-8">
                Remplissez le formulaire ci-dessous et nous vous répondrons dans les meilleurs délais.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    <i className="fas fa-user mr-2 text-red-600"></i>
                    Votre Nom
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-red-500 transition-colors"
                    placeholder="John Doe"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    <i className="fas fa-envelope mr-2 text-red-600"></i>
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-red-500 transition-colors"
                    placeholder="votre@email.com"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    <i className="fas fa-phone mr-2 text-red-600"></i>
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-red-500 transition-colors"
                    placeholder="+229 XXXXXXXX"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    <i className="fas fa-tag mr-2 text-red-600"></i>
                    Sujet
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-red-500 transition-colors"
                  >
                    <option value="">-- Choisissez un sujet --</option>
                    {subjects.map((subj, idx) => (
                      <option key={idx} value={subj}>
                        {subj}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    <i className="fas fa-comment mr-2 text-red-600"></i>
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-red-500 transition-colors resize-none"
                    placeholder="Votre message..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-6 py-4 bg-gradient-to-r from-red-600 to-red-500 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <i className="fas fa-send"></i>
                  {loading ? 'Envoi en cours...' : 'Envoyer le Message'}
                </button>
              </form>
            </div>

            {/* Info Section */}
            <div className="space-y-8">
              {/* Quick Response */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 border-2 border-blue-200">
                <h3 className="text-2xl font-bold text-blue-900 mb-4 flex items-center gap-3">
                  <i className="fas fa-zap text-blue-600 text-2xl"></i>
                  Réponse Rapide
                </h3>
                <p className="text-blue-800">
                  Notre équipe s'engage à vous répondre en moins de 2 heures pendant les heures de bureaux.
                </p>
              </div>

              {/* Support Hours */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 border-2 border-green-200">
                <h3 className="text-2xl font-bold text-green-900 mb-4 flex items-center gap-3">
                  <i className="fas fa-clock text-green-600 text-2xl"></i>
                  Heures de Support
                </h3>
                <ul className="text-green-800 space-y-2">
                  <li className="flex items-center gap-2">
                    <i className="fas fa-check-circle text-green-600"></i>
                    <strong>Lundi - Dimanche:</strong> 24h/24
                  </li>
                  <li className="flex items-center gap-2">
                    <i className="fas fa-check-circle text-green-600"></i>
                    Jours fériés: Ouvert normalement
                  </li>
                  <li className="flex items-center gap-2">
                    <i className="fas fa-check-circle text-green-600"></i>
                    Support par Chat, Email, Téléphone
                  </li>
                </ul>
              </div>

              {/* Locations */}
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 border-2 border-purple-200">
                <h3 className="text-2xl font-bold text-purple-900 mb-4 flex items-center gap-3">
                  <i className="fas fa-map-pin text-purple-600 text-2xl"></i>
                  Nos Restaurants
                </h3>
                <div className="space-y-3 text-purple-800">
                  <div className="font-bold">🍲 Cotonou (Siège)</div>
                  <div className="font-bold">🍲 Parakou</div>
                  <div className="font-bold">🍲 Abomey</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="py-16 bg-gradient-to-r from-gray-900 to-black text-white">
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-black mb-8">
            <i className="fas fa-share-alt mr-3"></i>
            Suivez-Nous
          </h2>
          
          <div className="flex flex-wrap gap-4 justify-center">
            {[
              { icon: 'fa-facebook', label: 'Facebook', color: 'hover:text-blue-500' },
              { icon: 'fa-instagram', label: 'Instagram', color: 'hover:text-pink-500' },
              { icon: 'fa-twitter', label: 'Twitter', color: 'hover:text-blue-400' },
              { icon: 'fa-whatsapp', label: 'WhatsApp', color: 'hover:text-green-500' },
              { icon: 'fa-youtube', label: 'YouTube', color: 'hover:text-red-500' }
            ].map((social, idx) => (
              <a
                key={idx}
                href="#"
                className={`w-16 h-16 rounded-full border-2 border-white flex items-center justify-center text-2xl transition-all duration-300 hover:scale-110 hover:bg-white hover:text-gray-900 ${social.color}`}
                title={social.label}
              >
                <i className={`fas ${social.icon}`}></i>
              </a>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default ContactPage;
