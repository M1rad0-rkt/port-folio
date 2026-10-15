import { useState } from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Send, Facebook } from 'lucide-react';

export default function Contact({ darkMode }) {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

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

  const inputClass = `w-full px-4 py-2.5 rounded-xl border text-sm outline-none ${
    darkMode
      ? 'bg-black/40 border-gray-800 text-white placeholder:text-gray-600 focus:border-blue-500'
      : 'bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-blue-500'
  }`;

  return (
    <section id="contact" className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className={`inline-block text-sm font-semibold mb-3 px-3 py-1 rounded-full ${
            darkMode ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-50 text-blue-600'
          }`}>
            Contact
          </span>
          <h2 className={`text-3xl sm:text-4xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Me Contacter
          </h2>
          <p className={`text-base ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Ouvert aux stages, collaborations et projets en Data &amp; IA
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-3">
              {contactInfo.map((info, i) => (
                <div key={i} className={`flex gap-3 p-4 rounded-2xl border ${
                  darkMode ? 'bg-black/40 border-gray-800' : 'bg-white border-gray-200'
                }`}>
                  <div className="p-2.5 bg-blue-600 text-white rounded-xl shrink-0">
                    <info.icon size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">{info.title}</p>
                    {info.link ? (
                      <a href={info.link} className={`text-sm font-medium ${
                        darkMode ? 'text-blue-400' : 'text-blue-600'
                      }`}>
                        {info.value}
                      </a>
                    ) : (
                      <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{info.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              {socials.map((s, i) => (
                <a key={i} href={s.link} target="_blank" rel="noopener noreferrer"
                  className={`flex-1 flex flex-col items-center gap-1.5 py-3 rounded-2xl border ${
                    darkMode ? 'bg-black/40 border-gray-800 text-blue-400' : 'bg-white border-gray-200 text-blue-600'
                  }`}>
                  <s.icon size={20} />
                  <span className={`text-xs font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{s.name}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className={`p-6 rounded-2xl border ${
              darkMode ? 'bg-black/40 border-gray-800' : 'bg-white border-gray-200'
            }`}>
              <h3 className={`text-lg font-bold mb-5 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Envoyez un message
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-3">
                  <input type="text" name="name" value={formData.name} onChange={handleChange}
                    required placeholder="Nom" className={inputClass} />
                  <input type="email" name="email" value={formData.email} onChange={handleChange}
                    required placeholder="Email" className={inputClass} />
                </div>
                <input type="text" name="subject" value={formData.subject} onChange={handleChange}
                  required placeholder="Sujet" className={inputClass} />
                <textarea name="message" value={formData.message} onChange={handleChange}
                  required rows={4} placeholder="Message..." className={`${inputClass} resize-none`} />
                <button type="submit"
                  className="w-full flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors">
                  <Send size={16} /> Envoyer
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
