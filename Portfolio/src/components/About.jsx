import { Guitar, Dumbbell, Mic2, Code2, Trophy } from 'lucide-react';

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
    <section id="about" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-64 sm:w-72">
              <div className={`rounded-2xl overflow-hidden border ${
                darkMode ? 'border-gray-800' : 'border-gray-200'
              }`}>
                <div
                  className="w-full aspect-[4/5] bg-cover bg-center"
                  style={{ backgroundImage: "url('/mirado1.jpg')" }}
                />
              </div>
              <div className="mt-3">
                <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Mirado</p>
                <p className="text-sm text-gray-500">Étudiant M1 Data & IA · EMIT Fianarantsoa</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <span className={`inline-block text-sm font-semibold mb-3 px-3 py-1 rounded-full ${
              darkMode ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-50 text-blue-600'
            }`}>
              Qui suis-je
            </span>

            <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Data Scientist
            </h2>

            <p className={`text-base leading-relaxed mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Étudiant en M1 Data & Intelligence Artificielle à l&apos;EMIT, je m&apos;appuie sur
              une base solide en économétrie et en statistiques appliquées pour concevoir
              des solutions d&apos;IA qui ont du sens : modèles de machine learning et de deep
              learning, pipelines ETL et applications full-stack qui transforment des
              données brutes en décisions concrètes.
            </p>
            <p className={`text-base leading-relaxed mb-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Curieux et rigoureux, j&apos;aime comprendre les problèmes en profondeur avant de coder —
              de la préparation des données jusqu&apos;au déploiement de modèles, en passant par la
              conception de pipelines fiables et scalables.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className={`rounded-xl p-3 border text-center ${
                    darkMode ? 'bg-black/40 border-gray-800' : 'bg-white border-gray-200'
                  }`}
                >
                  <p className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.label}</p>
                </div>
              ))}
            </div>

            <div>
              <h3 className={`text-sm font-semibold uppercase tracking-wider mb-3 ${
                darkMode ? 'text-gray-500' : 'text-gray-400'
              }`}>
                Mes passions
              </h3>
              <div className="flex flex-wrap gap-2">
                {passions.map(({ label, icon: Icon }) => (
                  <div
                    key={label}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm ${
                      darkMode ? 'border-gray-800 text-gray-300' : 'border-gray-200 text-gray-700'
                    }`}
                  >
                    <Icon size={14} className="text-blue-500" />
                    {label}
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
