import { ChevronDown } from 'lucide-react';

export default function Hero({ darkMode }) {
  const scrollToAbout = () => {
    const element = document.getElementById('about');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url('/mirado.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center 20%',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/70 to-black/80"></div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-sm">
          Disponible pour un stage
        </div> */}

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-none tracking-tighter mb-6">
          RAKOTONIAINA Mirado
        </h1>

        <p className="text-xl sm:text-2xl text-gray-200 font-light mb-10 max-w-2xl mx-auto">
          Étudiant en <span className="text-blue-400">Data Science</span> &amp;{' '}
          <span className="text-blue-400">Intelligence Artificielle</span>
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
            className="px-9 py-4 bg-white text-gray-900 rounded-2xl font-semibold text-lg flex items-center justify-center gap-3 hover:bg-blue-50 transition-all active:scale-95"
          >
            Voir mes projets
          </button>

          <button
            onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
            className="px-9 py-4 border border-white/60 text-white hover:bg-white/10 backdrop-blur-md rounded-2xl font-semibold text-lg transition-all active:scale-95"
          >
            Me contacter
          </button>
        </div>
      </div>

      <button
        onClick={scrollToAbout}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/80 hover:text-white transition-all animate-bounce"
      >
        <ChevronDown size={32} strokeWidth={1.8} />
      </button>
    </section>
  );
}