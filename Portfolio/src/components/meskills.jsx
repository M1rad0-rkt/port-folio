import { Code2, Globe2, Layers, LineChart, Database, BarChart4 } from 'lucide-react';

const skillCategories = [
  {
    icon: Code2,
    title: 'Langages',
    level: 'Fondamentaux',
    skills: ['Python', 'PHP', 'C', 'JavaScript'],
  },
  {
    icon: Globe2,
    title: 'Développement web',
    level: 'Frontend & backend',
    skills: ['HTML5', 'CSS3', 'React / Vite', 'Django', 'Tailwind CSS'],
  },
  {
    icon: LineChart,
    title: 'Data science',
    level: 'Analyse de données / Machine Learning & Deep Learning',
    skills: ['Pandas', 'NumPy', 'Matplotlib', 'Scikit-learn', 'Pytorch', 'NLP' ,'LLM'],
  },
  {
    icon: Database,
    title: 'Bases de données',
    level: 'Stockage & requêtes',
    skills: ['PostgreSQL', 'MySQL', 'SQL'],
  },
  {
    icon: BarChart4,
    title: 'Business Intelligence',
    level: 'Pipelines & reporting',
    skills: ['ETL / ELT', 'Power BI'],
  },
  {
    icon: Layers,
    title: 'Outils',
    level: 'Environnement de travail',
    skills: ['Git / GitHub', 'Trello', 'Docker'],
  },
];

export default function Skills({ darkMode }) {
  return (
    <section
      id="meskills"
      className={`relative overflow-hidden py-24 ${
        darkMode ? 'bg-gray-950' : 'bg-gray-50'
      }`}
    >
      {/* Fond décoratif */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          color: darkMode ? '#ffffff' : '#000000',
        }}
      ></div>
      <div className="pointer-events-none absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px]"></div>
      <div className="pointer-events-none absolute bottom-0 left-0 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px]"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span
            className={`inline-flex items-center gap-2 text-sm font-semibold mb-5 px-4 py-1.5 rounded-full ${
              darkMode ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-600/10 text-blue-600'
            }`}
          >
            Compétences
          </span>
          <h2
            className={`text-4xl sm:text-5xl font-bold mb-4 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            De la donnée{' '}
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              au modèle
            </span>
          </h2>
          <p className={`max-w-2xl mx-auto text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Une base économétrique solide, appliquée au développement de
            pipelines data et de solutions IA de bout en bout.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category) => {
            const Icon = category.icon;
            return (
              <div
                key={category.title}
                className={`group relative p-6 rounded-2xl border transition-all hover:-translate-y-1 ${
                  darkMode
                    ? 'bg-gray-900/60 border-gray-800 hover:border-blue-500/50'
                    : 'bg-white border-gray-100 hover:border-blue-300 hover:shadow-xl'
                }`}
              >
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 ${
                    darkMode ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-600/10 text-blue-600'
                  }`}
                >
                  <Icon size={22} />
                </div>

                <h3 className={`text-lg font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {category.title}
                </h3>
                <p className={`text-xs mb-4 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                  {category.level}
                </p>

                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className={`px-3 py-1 rounded-lg text-xs font-medium ${
                        darkMode
                          ? 'bg-gray-800 text-gray-300 group-hover:bg-blue-500/10 group-hover:text-blue-300'
                          : 'bg-gray-100 text-gray-700 group-hover:bg-blue-50 group-hover:text-blue-700'
                      } transition-colors`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}