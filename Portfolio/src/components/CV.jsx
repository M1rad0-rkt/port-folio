import { 
  Briefcase, 
  GraduationCap, 
  Award, 
  Download, 
  Sparkles, 
  Code2, 
  Users, 
  Calendar,
} from 'lucide-react';

const experiences = [
  {
    title: 'Stagiaire projet',
    company: 'Autorités de Régulation des Marchés Publics sous tutelle de la Ministère de l\'économie et de la finance',
    period: 'en cours',
    description: 'Mise en place d\'un assistant de règlementation de l\'ARMP & Chatbot de suivi sur l\'utilisation des sites',
    icon: Code2,
  },
  {
    title: 'Ideathon — Orange Digital Center & Ingedata',
    company: 'Data Challenge Inter-universitaire',
    period: '2026',
    description: 'Participation à un data challenge axé sur l\'analyse de données et l\'intelligence artificielle appliquée au marketing.',
    icon: Award,
  },
  {
    title: 'Formation DevOps',
    company: 'Orange Digital Center',
    period: '2026',
    description: 'Formation en DevOps et déploiement automatique des applications.',
    icon: Code2,
  },
  {
    title: 'Stage de fin d\'études',
    company: 'PixelVault',
    period: '2024-2025',
    description: 'Mise en place d\'un système de traitement des demandes clients avec analyse de satisfaction (React + Django + Tailwind + MySQL).',
    icon: Briefcase,
  },
  {
    title: 'Stage au sein du Ministère de la Jeunesse et du Sport',
    company: 'Ministère de la Jeunesse et du Sport',
    period: '2022-2023',
    description: 'Stage d\'immersion dans le monde professionnel.',
    icon: Users,
  },
  {
    title: 'Stage d\'observation',
    company: 'Hôtel de Ville Analakely',
    period: '2021-2022',
    description: 'Département Informatique DDNSI.',
    icon: Calendar,
  },
];

const education = [
  {
    degree: 'Master en Informatique',
    school: 'Ecole de Management et d\'Innovation Technologique (EMIT) Fianarantsoa',
    period: '2025 - en cours',
    description: 'Parcours Data & Intelligence Artificielle (M1 en cours).',
  },
  {
    degree: 'Licence en Informatique',
    school: 'Université FJKM Ravelojaona Ampandrana',
    period: '2022 - 2025',
    description: 'Obtention de la Licence en Informatique général.',
  },
  {
    degree: 'Baccalauréat Série D',
    school: 'Lycée Saint François Xavier Antanimena',
    period: '2021 - 2022',
    description: '',
  },
];

function StatCard({ value, label, darkMode }) {
  return (
    <div
      className={`flex-1 min-w-[140px] rounded-2xl border p-5 text-center ${
        darkMode ? 'bg-gray-900/60 border-gray-800' : 'bg-white border-gray-100 shadow-sm'
      }`}
    >
      <p className="text-3xl font-bold mb-1 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
        {value}
      </p>
      <p className={`text-xs font-medium uppercase tracking-wide ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
        {label}
      </p>
    </div>
  );
}

export default function CV({ darkMode }) {
  return (
    <section
      id="cv"
      className={`relative overflow-hidden py-24 ${darkMode ? 'bg-gray-950' : 'bg-gray-50'}`}
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
      <div className="pointer-events-none absolute -top-32 -right-32 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px]"></div>
      <div className="pointer-events-none absolute bottom-0 -left-32 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px]"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span
            className={`inline-flex items-center gap-2 text-sm font-semibold mb-5 px-4 py-1.5 rounded-full ${
              darkMode ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-600/10 text-blue-600'
            }`}
          >
            <Sparkles size={16} /> Mon Parcours
          </span>
          <h2
            className={`text-4xl sm:text-5xl font-bold leading-tight mb-4 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            Expériences &amp;{' '}
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Formations
            </span>
          </h2>
          <p className={`max-w-2xl mx-auto text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Du stage d'observation à des projets concrets en Data & IA
          </p>
        </div>

        {/* Barre de stats */}
        <div className="flex flex-wrap justify-center gap-4 mb-20 max-w-2xl mx-auto">
          <StatCard value={experiences.length} label="Expériences" darkMode={darkMode} />
          <StatCard value={education.length} label="Formations" darkMode={darkMode} />
          <StatCard value="2021" label="Premiers pas" darkMode={darkMode} />
        </div>

        {/* Expériences — pleine largeur, frise chronologique */}
        <div className="mb-24">
          <div className="flex items-center gap-3 mb-10">
            <div className="p-3 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl">
              <Briefcase className="text-white" size={26} />
            </div>
            <h3 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Expériences
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`group relative p-7 rounded-3xl border transition-all hover:-translate-y-1 ${
                  darkMode
                    ? 'bg-gray-900/60 border-gray-800 hover:border-blue-500/50'
                    : 'bg-white border-gray-100 hover:shadow-xl'
                } ${index === 0 ? 'md:col-span-2' : ''}`}
              >
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-600">
                    <exp.icon className="text-white" size={20} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap justify-between gap-3 mb-2">
                      <h4 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {exp.title}
                      </h4>
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full self-start ${
                        darkMode ? 'bg-gray-800 text-blue-400' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {exp.period}
                      </span>
                    </div>

                    <p className={`text-sm font-semibold mb-2 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                      {exp.company}
                    </p>

                    <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {exp.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Formation — pleine largeur */}
        <div>
          <div className="flex items-center gap-3 mb-10">
            <div className="p-3 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl">
              <GraduationCap className="text-white" size={26} />
            </div>
            <h3 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Formation
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {education.map((edu, index) => (
              <div
                key={index}
                className={`p-7 rounded-3xl border transition-all hover:-translate-y-1 ${
                  darkMode
                    ? 'bg-gray-900/60 border-gray-800 hover:border-purple-500/50'
                    : 'bg-white border-gray-100 hover:shadow-xl'
                }`}
              >
                <h4 className={`text-lg font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {edu.degree}
                </h4>
                <p className={`text-sm font-medium mb-1 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                  {edu.school}
                </p>
                <p className={`text-xs mb-3 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                  {edu.period}
                </p>
                {edu.description && (
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {edu.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bouton Téléchargement CV */}
        <a
        href="/Curriculum_Vitae_Mirado.jpg"
        download="Curriculum_Vitae_Mirado.jpg"
        className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-6 py-3.5 
                   bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 
                   hover:border-blue-500 text-gray-900 dark:text-white 
                   rounded-2xl font-medium shadow-lg hover:shadow-xl 
                   transition-all duration-300 hover:scale-105 active:scale-95`}
        title="Télécharger mon CV"
      >
        <Download size={20} className="text-blue-600" />
        <span>Télécharger mon CV</span>
      </a>
    </section>
  );
}