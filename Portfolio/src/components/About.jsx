import { Guitar, Dumbbell, Mic2, Code2, Trophy, Sparkles, ArrowUpRight } from 'lucide-react';

const passions = [
  { label: 'Machine Learning', icon: Code2 },
  { label: 'Guitare', icon: Guitar },
  { label: 'Basket-ball', icon: Trophy },
  { label: 'Chanter', icon: Mic2 },
  { label: 'Musculation', icon: Dumbbell },
];

const stats = [
  { value: '3+', label: 'Projets data & ML' },
  { value: '2+', label: 'Chatbot & RAG' },
  { value: '5+', label: 'Outils & frameworks IA' },
  { value: '1', label: 'Ideathon (Orange Digital Center)' },
];

export default function About({ darkMode }) {
  return (
    <section
      id="about"
      className={`relative overflow-hidden py-24 ${
        darkMode ? 'bg-gray-950' : 'bg-gray-50'
      }`}
    >
      {/* Fond décoratif */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          color: darkMode ? '#ffffff' : '#000000',
        }}
      ></div>
      <div className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px]"></div>
      <div className="pointer-events-none absolute bottom-0 right-0 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px]"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-16 items-center">

          {/* Colonne photo */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-72 sm:w-80">
              {/* Cadre pointillé décalé */}
              <div className="absolute -inset-4 border-2 border-dashed border-blue-500/40 rounded-[2rem] rotate-3"></div>

              {/* Photo */}
              <div className="relative rounded-[1.75rem] overflow-hidden shadow-2xl -rotate-2 hover:rotate-0 transition-transform duration-500">
                <div
                  className="w-full aspect-[4/5] bg-cover bg-center"
                  style={{ backgroundImage: "url('/mirado1.jpg')" }}
                ></div>
                <div
                  className={`absolute inset-0 ${
                    darkMode
                      ? 'bg-gradient-to-t from-gray-950/70 via-transparent to-transparent'
                      : 'bg-gradient-to-t from-gray-900/20 via-transparent to-transparent'
                  }`}
                ></div>
              </div>

              {/* Badge nom flottant */}
              <div
                className={`absolute -bottom-6 -right-6 flex items-center gap-3 px-5 py-3 rounded-2xl shadow-xl backdrop-blur-sm ${
                  darkMode ? 'bg-gray-900/90 border border-gray-800' : 'bg-white/90 border border-gray-100'
                }`}
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                </span>
                <div>
                  <p className={`text-sm font-bold leading-tight ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Mirado
                  </p>
                  <p className="text-xs text-gray-500 leading-tight">Data Scientist</p>
                </div>
              </div>

              {/* Étiquette flottante */}
              <div
                className="absolute -top-5 -left-5 flex items-center gap-2 px-4 py-2 rounded-full shadow-lg text-xs font-semibold bg-blue-600 text-white"
              >
                <Sparkles size={14} />
                Mirado
              </div>
            </div>
          </div>

          {/* Colonne texte */}
          <div className="lg:col-span-7">
            <span
              className={`inline-flex items-center gap-2 text-sm font-semibold mb-5 px-4 py-1.5 rounded-full ${
                darkMode ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-600/10 text-blue-600'
              }`}
            >
              Qui suis-je
            </span>

            <h2
              className={`text-4xl sm:text-5xl font-bold leading-tight mb-6 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}
            >
              De l'économétrie{' '}
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                à la data science
              </span>
            </h2>

            <p
              className={`text-lg mb-5 leading-relaxed ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              Étudiant en M1 Data & Intelligence Artificielle, je m'appuie sur une
              base solide en économétrie pour construire des solutions data qui ont
              du sens : pipelines ETL, modèles de machine learning et analyses qui
              transforment des données brutes en décisions concrètes.
            </p>
            <p
              className={`text-lg mb-10 leading-relaxed ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              Curieux et rigoureux, j'aime comprendre les problèmes en profondeur
              avant de coder — de la préparation des données jusqu'au déploiement
              de modèles, en passant par la conception de pipelines fiables et
              scalables.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-10">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className={`rounded-2xl p-4 border ${
                    darkMode ? 'bg-gray-900/60 border-gray-800' : 'bg-white border-gray-100'
                  }`}
                >
                  <p className={`text-2xl font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {stat.value}
                  </p>
                  <p className="text-xs text-gray-500">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Passions */}
            <div>
              <h3
                className={`text-sm font-semibold uppercase tracking-wider mb-4 ${
                  darkMode ? 'text-gray-500' : 'text-gray-400'
                }`}
              >
                Mes passions
              </h3>
              <div className="flex flex-wrap gap-3">
                {passions.map(({ label, icon: Icon }) => (
                  <div
                    key={label}
                    className={`group flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all cursor-default ${
                      darkMode
                        ? 'bg-gray-900/60 border-gray-800 hover:border-blue-500/50'
                        : 'bg-white border-gray-100 hover:border-blue-300'
                    }`}
                  >
                    <Icon
                      size={16}
                      className={darkMode ? 'text-blue-400' : 'text-blue-600'}
                    />
                    <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}