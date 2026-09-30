import { useState, useRef, useEffect } from 'react';
import { ExternalLink, Github, ArrowUpRight, Circle } from 'lucide-react';

const CATEGORIES = ['Tous', 'Web', 'Data & IA', 'Mobile & Jeux', 'Logiciel'];

const projects = [
  {
    title: 'Clientelia',
    description: "Plateforme de gestion des demandes clients avec analyse de satisfaction intégrée, authentification sécurisée par JWT.",
    image: '/Acceuil_visiteur.jpg',
    tags: ['React', 'Django', 'MySQL', 'JWT', 'Vite.js'],
    category: 'Web',
    github: 'https://github.com/M1rad0-rkt/CLIENTELIA.git',
    demo: '#',
    featured: true,
  },
  {
    title: 'Assistant IA de Règlementation de l\'ARMP',
    description: "Système intelligent qui gère les textes qui entourent les Marchés Publics.",
    image: '/coming.jpg',
    tags: ['Python', 'RAG + LLM', 'NLP'],
    category: 'Data & IA',
    github: '#',
    demo: '#',
  },
  {
    title: 'Tera-project',
    description: "Projet de data sur l\'analyse de la qualité de l'air à Fianarantsoa",
    image: '/tera.jpg',
    tags: ['Python :', 'numpy', 'pandas', 'streamlint', 'matplotlib'],
    category: 'Data & IA',
    github: 'https://github.com/M1rad0-rkt/Tera-project.git',
    demo: '#',
  },
  {
    title: 'Chatbot IA',
    description: "Chatbot intelligent basé sur le traitement du langage naturel.",
    image: '/coming.jpg',
    tags: ['Python', 'TensorFlow', 'NLP'],
    category: 'Data & IA',
    github: '#',
    demo: '#',
  },
  {
    title: "Rice-disease-detection",
    description: "Application de détection  de maladie du riz par vision artificielle",
    image: '/rice_disease.jpg',
    tags: ['Python', 'Pytorch', 'kaggle', 'Gradio'],
    category: 'Data & IA',
    github: 'https://github.com/AndyFaneva/RNAProject.git',
    demo: '#',
  },
  {
    title: 'Rezerveo',
    description: "Plateforme de réservation de lieux pour tout type d'événement.",
    image: '/rezerveo.jpg',
    tags: ['PHP', 'MySQL', 'Bootstrap'],
    category: 'Web',
    github: 'https://github.com/M1rad0-rkt/REZERVEO.git',
    demo: '#',
  },
  {
    title: 'GymGest',
    description: "Application de gestion et de suivi d'un salle de sport'.",
    image: '/gym.jpg',
    tags: ['Python', 'Inno_setup'],
    category: 'Logiciel',
    github: 'https://github.com/M1rad0-rkt/Gym_gest.git',
    demo: '#',
  },
  {
    title: 'Aktifitifitra',
    description: 'Jeu 2D nostalgique développé entièrement en Python.',
    image: '/Aktifitifitra.jpg',
    tags: ['Python', 'SQLite'],
    category: 'Mobile & Jeux',
    github: 'https://github.com/M1rad0-rkt/AKTIFITIFITRA.git',
    demo: '#',
  },
  {
    title: 'Mon premier portfolio',
    description: 'Portfolio personnel et dynamique.',
    image: '/Portfolio.jpg',
    tags: ['React', 'Tailwind', 'Vite.js'],
    category: 'Web',
    github: 'https://github.com/M1rad0-rkt/PORTFOLIO.git',
    demo: '#',
  },
];

function statusOf(project) {
  if (project.inProgress) return { label: 'En cours', dot: 'bg-amber-400' };
  if (project.github === '#' && project.demo === '#') return { label: 'À venir', dot: 'bg-gray-400' };
  return { label: 'Terminé', dot: 'bg-green-500' };
}

function CategoryTabs({ active, setActive, darkMode }) {
  const containerRef = useRef(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const activeBtn = container.querySelector(`[data-cat="${active}"]`);
    if (activeBtn) {
      setIndicator({
        left: activeBtn.offsetLeft,
        width: activeBtn.offsetWidth,
      });
    }
  }, [active, darkMode]);

  return (
    <div className="flex justify-center mb-12">
      <div
        ref={containerRef}
        className={`relative inline-flex p-1 rounded-full border ${
          darkMode ? 'bg-gray-900 border-gray-800' : 'bg-gray-100 border-gray-200'
        }`}
      >
        <span
          className={`absolute top-1 bottom-1 rounded-full transition-all duration-300 ease-out ${
            darkMode ? 'bg-white' : 'bg-gray-900'
          }`}
          style={{ left: indicator.left, width: indicator.width }}
        />

        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            data-cat={cat}
            onClick={() => setActive(cat)}
            className={`relative z-10 px-5 py-2 text-sm font-medium rounded-full transition-colors duration-300 ${
              active === cat
                ? darkMode ? 'text-gray-900' : 'text-white'
                : darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}

function GithubLink({ href, darkMode, full = false }) {
  const hasLink = href && href !== '#';
  return (
      <a
      href={hasLink ? href : undefined}
      target={hasLink ? '_blank' : undefined}
      rel={hasLink ? 'noopener noreferrer' : undefined}
      onClick={(e) => !hasLink && e.preventDefault()}
      className={`flex items-center justify-center gap-2 font-medium rounded-xl transition-colors ${
        full ? 'flex-1 py-2.5 text-sm' : 'px-4 py-2 text-sm'
      } ${
        hasLink
          ? darkMode
            ? 'bg-white text-gray-900 hover:bg-gray-200'
            : 'bg-gray-900 text-white hover:bg-gray-800'
          : darkMode
          ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
      }`}
      >
      <Github size={16} />
      {hasLink ? 'Voir le code' : 'Code privé'}
    </a>
  );
}

// Bouton Demo — masqué si absent, sinon lien discret
function DemoLink({ href, darkMode, full = false }) {
  if (!href || href === '#') return null;
  return (
      <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center justify-center gap-2 text-sm font-medium rounded-xl border transition-colors ${
        full ? 'flex-1 py-2.5' : 'px-4 py-2'
      } ${
        darkMode
          ? 'border-gray-700 text-gray-300 hover:border-gray-500 hover:text-white'
          : 'border-gray-300 text-gray-600 hover:border-gray-400 hover:text-gray-900'
      }`}
    >
      <ArrowUpRight size={16} /> Demo
    </a>
  );
}

export default function Projects({ darkMode }) {
  const [active, setActive] = useState('Tous');

  const featured = projects.find((p) => p.featured);
  const rest = projects
    .filter((p) => !p.featured)
    .filter((p) => active === 'Tous' || p.category === active);

  return (
    <section
      id="projects"
      className={`relative overflow-hidden py-24 ${darkMode ? 'bg-gray-950' : 'bg-gray-50'}`}
    >
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

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span
            className={`inline-flex items-center gap-2 text-sm font-semibold mb-5 px-4 py-1.5 rounded-full ${
              darkMode ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-600/10 text-blue-600'
            }`}
          >
            Portfolio
          </span>
          <h2 className={`text-4xl sm:text-5xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Mes Projets
          </h2>
          <p className={`max-w-2xl mx-auto text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Du développement web aux projets data et IA
          </p>
        </div>

        <CategoryTabs active={active} setActive={setActive} darkMode={darkMode} />

        {/* Projet Phare */}
        {featured && active === 'Tous' && (
          <div className={`mb-12 rounded-3xl overflow-hidden border grid md:grid-cols-2 ${
            darkMode ? 'bg-gray-900/60 border-gray-800' : 'bg-white border-gray-100'
          }`}>
            <div className="relative h-64 md:h-full">
              <img src={featured.image} alt={featured.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:bg-gradient-to-r"></div>
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold bg-blue-600 text-white">
                Projet phare
              </span>
            </div>
            <div className="p-8 flex flex-col justify-center">
              <h3 className={`text-2xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {featured.title}
              </h3>
              <p className={`text-sm mb-6 leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {featured.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {featured.tags.map((tag) => (
                  <span key={tag} className={`px-3 py-1 text-xs rounded-full ${darkMode ? 'bg-gray-800 text-blue-400' : 'bg-blue-100 text-blue-700'}`}>
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-3">
                <GithubLink href={featured.github} darkMode={darkMode} />
                <DemoLink href={featured.demo} darkMode={darkMode} />
              </div>
            </div>
          </div>
        )}

        {/* Grille des projets */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((project) => {
            const status = statusOf(project);
            return (
              <div
                key={project.title}
                className={`group rounded-3xl overflow-hidden border transition-all hover:-translate-y-1 ${
                  darkMode
                    ? 'bg-gray-900/60 border-gray-800 hover:border-blue-500/50'
                    : 'bg-white border-gray-100 hover:shadow-xl'
                }`}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <span className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-black/60 text-white backdrop-blur-sm">
                    <Circle size={8} className={status.dot} fill="currentColor" />
                    {status.label}
                  </span>
                </div>

                <div className="p-6">
                  <h3 className={`font-bold mb-2 text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {project.title}
                  </h3>
                  <p className={`text-sm mb-5 line-clamp-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`px-3 py-1 text-xs rounded-full ${darkMode ? 'bg-gray-800 text-blue-400' : 'bg-blue-100 text-blue-700'}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <GithubLink href={project.github} darkMode={darkMode} full />
                    <DemoLink href={project.demo} darkMode={darkMode} full />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}