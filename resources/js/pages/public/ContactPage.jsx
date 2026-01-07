import React, { useState } from 'react';
import toast from 'react-hot-toast';
import PublicLayout from '../layouts/PublicLayout';

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
      // Simulated API call - replace with real endpoint
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
      icon: '📍',
      title: 'Adresse',
      content: 'Cotonou, Bénin\n\nNous sommes présents à Cotonou, Parakou et Abomey'
    },
    {
      icon: '📞',
      title: 'Téléphone',
      content: '+229 95 00 00 00\n\nDisponible 24h/24 - Ouvert tous les jours'
    },
    {
      icon: '✉️',
      title: 'Email',
      content: 'info@saveurbenin.com\n\nRéponse garantie en moins de 2h'
    },
    {
      icon: '⏰',
      title: 'Horaires',
      content: 'Lun-Ven: 11h30 - 23h\nSam: 12h - 24h\nDim: 12h - 23h'
    }
  ];

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Nous Contacter</h1>
          <p className="text-xl text-gray-300">Nous sommes disponibles pour répondre à vos questions</p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <div key={index} className="p-8 bg-gray-50 rounded-xl text-center hover:shadow-lg transition">
                <div className="text-5xl mb-4">{info.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{info.title}</h3>
                <p className="text-gray-700 whitespace-pre-line text-sm">{info.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Envoyez-nous un Message</h2>

          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Name */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Nom Complet*</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Votre nom"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Email*</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="votre@email.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Phone */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Téléphone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+229 XXXX XXXX"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                />
              </div>

              {/* Subject */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Sujet*</label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                >
                  <option value="">Sélectionner un sujet</option>
                  <option value="reservation">Réservation</option>
                  <option value="catering">Catering & Événement</option>
                  <option value="complaint">Réclamation</option>
                  <option value="partnership">Partenariat</option>
                  <option value="other">Autre</option>
                </select>
              </div>
            </div>

            {/* Message */}
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">Message*</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Votre message..."
                rows="6"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 resize-none"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full px-8 py-4 bg-gradient-to-r from-orange-600 to-amber-500 text-white font-semibold rounded-lg hover:shadow-lg transition disabled:opacity-50"
            >
              {loading ? 'Envoi en cours...' : 'Envoyer le Message'}
            </button>
          </form>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Nos Restaurants</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { city: 'Cotonou', address: 'Boulevard de l\'Indépendance', hours: '24h/24' },
              { city: 'Parakou', address: 'Centre-Ville', hours: '10h - 22h' },
              { city: 'Abomey', address: 'Marché Central', hours: '11h - 21h' }
            ].map((location, index) => (
              <div key={index} className="p-8 bg-gray-50 rounded-xl text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{location.city}</h3>
                <p className="text-gray-700 mb-2">{location.address}</p>
                <p className="text-orange-600 font-semibold">{location.hours}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Media */}
      <section className="py-16 bg-gray-50 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Suivez-Nous</h2>
          <div className="flex justify-center gap-6">
            <a href="#" className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition text-xl">
              f
            </a>
            <a href="#" className="w-12 h-12 bg-pink-500 text-white rounded-full flex items-center justify-center hover:bg-pink-600 transition text-xl">
              📷
            </a>
            <a href="#" className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600 transition text-xl">
              W
            </a>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default ContactPage;
