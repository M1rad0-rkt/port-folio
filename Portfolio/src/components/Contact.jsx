import { useState } from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Send, Facebook, Check, Copy } from 'lucide-react';

export default function Contact({ darkMode }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState('idle'); // idle | opened | error
  const [copied, setCopied] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /**
   * mailto: n'envoie PAS l'email depuis le site.
   * Il ouvre le client mail de l'utilisateur (Gmail app, Outlook, Mail…).
   * L'utilisateur doit encore cliquer sur "Envoyer" dans son application.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('idle');

    try {
      const subject = encodeURIComponent(formData.subject || 'Contact portfolio');
      const body = encodeURIComponent(
        `Nom: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      );
      const mailtoLink = `mailto:miradorakoto111@gmail.com?subject=${subject}&body=${body}`;

      // Ouvre le client mail
      window.location.href = mailtoLink;
      setStatus('opened');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('miradorakoto111@gmail.com');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback silencieux
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'miradorakoto111@gmail.com',
      link: 'mailto:miradorakoto111@gmail.com',
      copyable: true,
    },
    {
      icon: Phone,
      title: 'Téléphone',
      value: '+261 34 57 344 84',
      link: 'tel:+261345734484',
    },
    {
      icon: MapPin,
      title: 'Localisation',
      value: 'Antananarivo, Madagascar',
    },
  ];

  const socials = [
    { icon: Github, name: 'GitHub', link: 'https://github.com/M1rad0-rkt' },
    {
      icon: Linkedin,
      name: 'LinkedIn',
      link: 'https://www.linkedin.com/in/mirado-rakotoniaina-978523346',
    },
    {
      icon: Facebook,
      name: 'Facebook',
      link: 'https://facebook.com/mirado.rakotoniaina.2025',
    },
  ];

  const card = darkMode
    ? 'bg-black/40 border-gray-800'
    : 'bg-white border-gray-200';
  const inputClass = `w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-colors ${
    darkMode
      ? 'bg-black/40 border-gray-800 text-white placeholder:text-gray-600 focus:border-blue-500'
      : 'bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-blue-500'
  }`;

  return (
    <section id="contact" className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span
            className={`inline-block text-sm font-semibold mb-3 px-3 py-1 rounded-full ${
              darkMode ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-50 text-blue-600'
            }`}
          >
            Contact
          </span>
          <h2
            className={`text-3xl sm:text-4xl font-bold mb-2 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            Me Contacter
          </h2>
          <p className={`text-base ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Ouvert aux stages, collaborations et projets en Data &amp; IA
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Infos */}
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-3">
              {contactInfo.map((info) => (
                <div
                  key={info.title}
                  className={`flex gap-3 p-4 rounded-2xl border ${card}`}
                >
                  <div className="p-2.5 bg-blue-600 text-white rounded-xl shrink-0">
                    <info.icon size={18} aria-hidden="true" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-gray-500">{info.title}</p>
                    <div className="flex items-center gap-2 flex-wrap">
                      {info.link ? (
                        <a
                          href={info.link}
                          className={`text-sm font-medium break-all ${
                            darkMode ? 'text-blue-400' : 'text-blue-600'
                          }`}
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p
                          className={`text-sm ${
                            darkMode ? 'text-gray-300' : 'text-gray-700'
                          }`}
                        >
                          {info.value}
                        </p>
                      )}
                      {info.copyable && (
                        <button
                          type="button"
                          onClick={copyEmail}
                          className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-lg border transition-colors ${
                            darkMode
                              ? 'border-gray-700 text-gray-400 hover:text-white'
                              : 'border-gray-200 text-gray-500 hover:text-gray-900'
                          }`}
                          aria-label="Copier l'email"
                        >
                          {copied ? <Check size={12} /> : <Copy size={12} />}
                          {copied ? 'Copié' : 'Copier'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-2">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex flex-col items-center gap-1.5 py-3 rounded-2xl border transition-colors hover:border-blue-500/40 ${card} ${
                    darkMode ? 'text-blue-400' : 'text-blue-600'
                  }`}
                >
                  <s.icon size={20} aria-hidden="true" />
                  <span
                    className={`text-xs font-medium ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}
                  >
                    {s.name}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Formulaire */}
          <div className="lg:col-span-3">
            <div className={`p-6 rounded-2xl border ${card}`}>
              <h3
                className={`text-lg font-bold mb-1 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}
              >
                Envoyez un message
              </h3>
              <p className="text-xs text-gray-500 mb-5">
                Ouvre votre application mail avec le message prérempli. Vous validez l&apos;envoi
                depuis votre boîte mail.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="contact-name" className="sr-only">
                      Nom
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      autoComplete="name"
                      placeholder="Nom"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="sr-only">
                      Email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      autoComplete="email"
                      placeholder="Email"
                      className={inputClass}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="contact-subject" className="sr-only">
                    Sujet
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="Sujet"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="contact-message" className="sr-only">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Message..."
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  <Send size={16} aria-hidden="true" />
                  Ouvrir mon client mail
                </button>

                {status === 'opened' && (
                  <p
                    className={`text-sm text-center rounded-xl px-3 py-2 ${
                      darkMode
                        ? 'bg-emerald-500/10 text-emerald-400'
                        : 'bg-emerald-50 text-emerald-700'
                    }`}
                    role="status"
                  >
                    Client mail ouvert. Cliquez sur Envoyer dans votre application pour finaliser.
                  </p>
                )}
                {status === 'error' && (
                  <p className="text-sm text-center text-red-500" role="alert">
                    Impossible d&apos;ouvrir le client mail. Utilisez l&apos;adresse ci-contre ou le
                    bouton Copier.
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}