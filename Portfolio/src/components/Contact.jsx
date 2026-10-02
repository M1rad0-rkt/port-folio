import { useState } from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Send, Sparkles, Facebook } from 'lucide-react';

export default function Contact({ darkMode }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const mailtoLink = `mailto:miradorakoto111@gmail.com?subject=${encodeURIComponent(
      formData.subject
    )}&body=${encodeURIComponent(
      `Nom: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;
    window.location.href = mailtoLink;
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    { icon: Mail, title: 'Email', value: 'miradorakoto111@gmail.com', link: 'mailto:miradorakoto111@gmail.com' },
    { icon: Phone, title: 'Téléphone', value: '+261 34 57 344 84', link: 'tel:+261345734484' },
    { icon: MapPin, title: 'Localisation', value: 'Antananarivo, Madagascar' },
  ];

  const socials = [
    { icon: Github, name: 'GitHub', link: 'https://github.com/M1rad0-rkt' },
    { icon: Linkedin, name: 'LinkedIn', link: 'https://www.linkedin.com/in/mirado-rakotoniaina-978523346' },
    { icon: Facebook, name: 'Facebook', link: 'https://facebook.com/mirado.rakotoniaina.2025' },
  ];

  return (
    <section
      id="contact"
      className={`py-16 ${darkMode ? 'bg-gray-950' : 'bg-gray-50'}`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className={`inline-flex items-center gap-2 text-sm font-semibold mb-4 px-4 py-1.5 rounded-full ${
            darkMode ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-600/10 text-blue-600'
          }`}>
            <Sparkles size={16} /> Contact
          </span>
          
          <h2 className={`text-4xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Me Contacter
          </h2>
          <p className={`text-lg max-w-md mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Ouvert aux stages, collaborations et projets en Data & IA
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Infos Contact */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h3 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Informations
              </h3>
              <div className="space-y-5">
                {contactInfo.map((info, i) => (
                  <div key={i} className={`flex gap-4 p-5 rounded-2xl ${
                    darkMode ? 'bg-gray-900' : 'bg-white shadow'
                  }`}>
                    <div className="p-3 bg-blue-600 text-white rounded-xl">
                      <info.icon size={24} />
                    </div>
                    <div>
                      <p className="font-medium text-sm text-gray-500">{info.title}</p>
                      {info.link ? (
                        <a href={info.link} className={`font-medium ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}>
                          {info.value}
                        </a>
                      ) : (
                        <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{info.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Réseaux */}
            <div>
              <h3 className={`text-xl font-bold mb-5 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Suivez-moi</h3>
              <div className="flex gap-4">
                {socials.map((s, i) => (
                  <a
                    key={i}
                    href={s.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-2xl transition-all hover:scale-105 ${
                      darkMode ? 'bg-gray-900 hover:bg-gray-800' : 'bg-white shadow hover:shadow-md'
                    }`}
                  >
                    <s.icon size={26} className={darkMode ? 'text-blue-400' : 'text-blue-600'} />
                    <span className="font-medium">{s.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Formulaire */}
          <div className="lg:col-span-3">
            <div className={`p-8 rounded-3xl ${darkMode ? 'bg-gray-900' : 'bg-white shadow-xl'}`}>
              <h3 className={`text-2xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Envoyez un message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={`px-5 py-3.5 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                      darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'
                    }`}
                    placeholder="Votre nom"
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={`px-5 py-3.5 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                      darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'
                    }`}
                    placeholder="Email"
                  />
                </div>

                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className={`w-full px-5 py-3.5 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                    darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'
                  }`}
                  placeholder="Sujet"
                />

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className={`w-full px-5 py-4 rounded-3xl border focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y transition-all ${
                    darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'
                  }`}
                  placeholder="Votre message..."
                />

                <button
                  type="submit"
                  className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-95"
                >
                  <Send size={20} />
                  Envoyer le message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}