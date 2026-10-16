import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight, ExternalLink, Github, X } from 'lucide-react';

const CATEGORIES = ['Tous', 'Web', 'Data & IA', 'Mobile & Jeux', 'Logiciel'];

const projects = [
  {
    title: 'Clientelia',
    description:
      'Plateforme de gestion des demandes clients avec analyse de satisfaction intégrée, authentification sécurisée par JWT.',
    details:
      "Clientelia centralise les demandes clients, suit leur traitement et mesure la satisfaction. L'authentification JWT sécurise l'accès, tandis que le couple React + Django assure une interface fluide et une API robuste. Idéal pour illustrer un parcours full-stack orienté métier.",
    image: '/Acceuil_visiteur.jpg',
    tags: ['React', 'Django', 'MySQL', 'JWT', 'Vite.js'],
    category: 'Web',
    github: 'https://github.com/M1rad0-rkt/CLIENTELIA.git',
    demo: '#',
    featured: true,
    role: 'Full-stack',
    year: '2024–2025',
  },
  {
    title: 'Site e-commerce',
    description: 'Un comptoir de vente qui peut accueillir plusieurs types de marché.',
    details:
      "Boutique en ligne polyvalente conçue pour s'adapter à différents types de marchés. Stack moderne (React, FastAPI, PostgreSQL) avec authentification JWT, catalogue produits et parcours d'achat. Accent sur la scalabilité et une API claire.",
    image: '/e-commerce.jpg',
    tags: ['React', 'Tailwind', 'Vite.js', 'JWT', 'PostgreSQL', 'FastAPI'],
    category: 'Web',
    github: 'https://github.com/M1rad0-rkt/e-commerce.git',
    demo: '#',
    role: 'Full-stack',
    year: '2025',
  },
  {
    title: "Assistant IA de Règlementation de l'ARMP",
    description: 'Système intelligent qui gère les textes qui entourent les Marchés Publics.',
    details:
      "Assistant basé sur RAG et LLM pour interroger et exploiter les textes réglementaires des marchés publics. Objectif : rendre la réglementation accessible via des réponses contextualisées, avec une couche NLP pour le traitement des documents.",
    image: '/coming.jpg',
    tags: ['Python', 'RAG + LLM', 'NLP'],
    category: 'Data & IA',
    github: '#',
    demo: '#',
    role: 'Data / IA',
    year: 'En cours',
  },
  {
    title: 'Tera-project',
    description: "Projet d'analyse de données sur la qualité de l'air à Fianarantsoa.",
    details:
      "Analyse exploratoire et visualisation de la qualité de l'air à Fianarantsoa. Pipeline Python (Pandas, NumPy, Matplotlib) et interface Streamlit pour présenter les indicateurs de façon interactive aux décideurs ou au public.",
    image: '/tera.jpg',
    tags: ['Python', 'NumPy', 'Pandas', 'Streamlit', 'Matplotlib'],
    category: 'Data & IA',
    github: 'https://github.com/M1rad0-rkt/Tera-project.git',
    demo: '#',
    role: 'Data science',
    year: '2024',
  },
  {
    title: 'Chatbot IA',
    description:
      "Chatbot intelligent qui aide à l'utilisation et les démarches d'inscription des sites de l'ARMP.",
    details:
      "Chatbot conversationnel pour guider les usagers dans l'utilisation des plateformes ARMP et les démarches d'inscription. S'appuie sur TensorFlow et des techniques NLP pour comprendre les intentions et fournir des réponses utiles.",
    image: '/coming.jpg',
    tags: ['Python', 'TensorFlow', 'NLP'],
    category: 'Data & IA',
    github: '#',
    demo: '#',
    role: 'NLP / IA',
    year: 'En cours',
  },
  {
    title: 'Rice-disease-detection',
    description: 'Application de détection de maladie du riz par vision artificielle.',
    details:
      "Modèle de vision (PyTorch) entraîné pour détecter des maladies du riz à partir d'images. Interface Gradio pour tester le modèle facilement. Projet orienté impact agricole et application concrète du deep learning.",
    image: '/rice_disease.jpg',
    tags: ['Python', 'PyTorch', 'Kaggle', 'Gradio'],
    category: 'Data & IA',
    github: 'https://github.com/AndyFaneva/RNAProject.git',
    demo: '#',
    role: 'Computer vision',
    year: '2024',
  },
  {
    title: 'Rezerveo',
    description: "Plateforme de réservation de lieux pour tout type d'événement.",
    details:
      "Application web de réservation de salles et lieux d'événements. Gestion des disponibilités, des réservations et de l'affichage des espaces. Stack classique PHP / MySQL / Bootstrap, orientée simplicité et efficacité.",
    image: '/rezerveo.jpg',
    tags: ['PHP', 'MySQL', 'Bootstrap'],
    category: 'Web',
    github: 'https://github.com/M1rad0-rkt/REZERVEO.git',
    demo: '#',
    role: 'Backend web',
    year: '2023',
  },
  {
    title: 'GymGest',
    description: "Application de gestion et de suivi d'une salle de sport.",
    details:
      "Logiciel desktop pour le suivi d'une salle de sport : adhérents, activités et organisation quotidienne. Développé en Python avec packaging via Inno Setup pour une installation simple sous Windows.",
    image: '/gym.jpg',
    tags: ['Python', 'Inno Setup'],
    category: 'Logiciel',
    github: 'https://github.com/M1rad0-rkt/Gym_gest.git',
    demo: '#',
    role: 'Logiciel',
    year: '2023',
  },
  {
    title: 'Aktifitifitra',
    description: 'Jeu 2D nostalgique développé entièrement en Python.',
    details:
      "Jeu 2D rétro écrit en Python, avec persistance des scores ou de la progression via SQLite. Projet ludique qui montre la maîtrise des bases du développement de jeux et de la logique applicative.",
    image: '/Aktifitifitra.jpg',
    tags: ['Python', 'SQLite'],
    category: 'Mobile & Jeux',
    github: 'https://github.com/M1rad0-rkt/AKTIFITIFITRA.git',
    demo: '#',
    role: 'Game dev',
    year: '2023',
  },
  {
    title: 'Mon premier portfolio',
    description: 'Mon tout premier Portfolio personnel et dynamique.',
    details:
      "Première version du portfolio personnel, construite avec React, Tailwind et Vite. Base de l'identité en ligne et point de départ des itérations de design et d'expérience utilisateur.",
    image: '/Portfolio.jpg',
    tags: ['React', 'Tailwind', 'Vite.js'],
    category: 'Web',
    github: 'https://github.com/M1rad0-rkt/PORTFOLIO.git',
    demo: '#',
    role: 'Frontend',
    year: '2024',
  },
];

const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600';

const reducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const pad = (n) => String(n).padStart(2, '0');
const hideBroken = (e) => {
  e.currentTarget.style.display = 'none';
};

function statusOf(project) {
  if (project.github === '#' && project.demo === '#') {
    return { label: 'À venir', dot: 'bg-amber-400' };
  }
  return { label: 'Terminé', dot: 'bg-emerald-500' };
}

// Apparition en fondu quand l'élément entre dans l'écran (une seule fois).
function useReveal() {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion() || typeof IntersectionObserver === 'undefined') {
      setShown(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return [ref, shown];
}

function StatusPill({ project, className = '' }) {
  const status = statusOf(project);
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm ${className}`}
    >
      <span className={`size-1.5 rounded-full ${status.dot}`} aria-hidden="true" />
      {status.label}
    </span>
  );
}

function ProjectModal({ project, index, total, onClose, onPrev, onNext }) {
  const closeRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose, onPrev, onNext]);

  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      <button
        type="button"
        className="absolute inset-0 cursor-default bg-black/80 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Fermer"
        tabIndex={-1}
      />

      <div
        key={project.title}
        className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-gray-200 bg-white text-gray-900 shadow-2xl dark:border-gray-800 dark:bg-gray-950 dark:text-white"
      >
        <div className="relative h-52 overflow-hidden bg-gray-100 sm:h-72 dark:bg-gray-900">
          <img src={project.image} alt={`Capture du projet ${project.title}`} onError={hideBroken} className="size-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/30 to-transparent" />

          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Fermer"
            className={`absolute right-4 top-4 grid size-10 place-items-center rounded-full bg-black/60 text-white backdrop-blur-sm transition-colors hover:bg-black/80 ${focusRing}`}
          >
            <X size={18} aria-hidden="true" />
          </button>

          <div className="absolute inset-x-5 bottom-5 sm:inset-x-8">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <StatusPill project={project} />
              {project.featured && (
                <span className="rounded-full bg-blue-600 px-2.5 py-1 text-xs font-semibold text-white">
                  Projet phare
                </span>
              )}
              <span className="rounded-full bg-white/15 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
                {project.category}
              </span>
            </div>
            <h3
              id="project-modal-title"
              className="text-2xl font-extrabold tracking-tight text-white sm:text-4xl"
            >
              {project.title}
            </h3>
          </div>
        </div>

        <div className="space-y-6 p-5 sm:p-8">
          <dl className="flex flex-wrap gap-x-10 gap-y-3 text-sm">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                Rôle
              </dt>
              <dd className="mt-1 font-medium">{project.role}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                Période
              </dt>
              <dd className="mt-1 font-medium">{project.year}</dd>
            </div>
          </dl>

          <p className="leading-relaxed text-gray-600 dark:text-gray-300">
            {project.details || project.description}
          </p>

          <ul aria-label="Technologies" className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-gray-300 px-3 py-1 text-xs font-medium text-gray-700 dark:border-gray-700 dark:text-gray-300"
              >
                {tag}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap items-center gap-3">
            {project.github !== '#' ? (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-colors hover:bg-blue-700 ${focusRing}`}
              >
                <Github size={16} aria-hidden="true" /> Voir le code
              </a>
            ) : (
              <span className="inline-flex items-center rounded-xl border border-dashed border-gray-300 px-5 py-3 text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400">
                Code privé
              </span>
            )}
            {project.demo !== '#' && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 rounded-xl border border-gray-300 px-5 py-3 text-sm font-semibold transition-colors hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-900 ${focusRing}`}
              >
                <ExternalLink size={16} aria-hidden="true" /> Démo
              </a>
            )}
          </div>

          {total > 1 && (
            <div className="flex items-center justify-between border-t border-gray-200 pt-5 dark:border-gray-800">
              <button
                type="button"
                onClick={onPrev}
                className={`inline-flex items-center gap-1.5 rounded-lg py-2 pr-3 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white ${focusRing}`}
              >
                <ChevronLeft size={18} aria-hidden="true" /> Précédent
              </button>
              <span className="font-mono text-sm tabular-nums text-gray-500 dark:text-gray-400">
                {pad(index + 1)} / {pad(total)}
              </span>
              <button
                type="button"
                onClick={onNext}
                className={`inline-flex items-center gap-1.5 rounded-lg py-2 pl-3 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white ${focusRing}`}
              >
                Suivant <ChevronRight size={18} aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Une ligne de l'index : grand titre, mise en avant quand elle est survolée.
function ProjectRow({ project, index, active, onActivate, onOpen }) {
  const [ref, shown] = useReveal();

  return (
    <li
      ref={ref}
      style={{ transitionDelay: shown ? `${Math.min(index, 5) * 60}ms` : '0ms' }}
      className={`border-t border-gray-200 transition duration-700 ease-out motion-reduce:transition-none dark:border-gray-800 ${
        shown ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`}
    >
      <button
        type="button"
        onClick={() => onOpen(project)}
        onMouseEnter={() => onActivate(project)}
        onFocus={() => onActivate(project)}
        className={`group block w-full py-6 text-left sm:py-7 ${focusRing}`}
      >
        <div
          className={`transition-opacity duration-300 motion-reduce:transition-none ${
            active ? 'lg:opacity-100' : 'lg:opacity-40'
          }`}
        >
          {/* Vignette visible seulement quand l'aperçu latéral n'existe pas */}
          <div className="relative mb-5 aspect-[16/10] overflow-hidden rounded-2xl border border-gray-200 bg-gray-100 lg:hidden dark:border-gray-800 dark:bg-gray-900">
            <img
              src={project.image}
              alt={`Aperçu du projet ${project.title}`}
              loading="lazy"
              onError={hideBroken}
              className="size-full object-cover"
            />
            <StatusPill project={project} className="absolute left-3 top-3" />
          </div>

          <div className="flex items-start gap-4 sm:gap-6">
            <span
              className={`pt-2 font-mono text-sm tabular-nums transition-colors ${
                active ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400 dark:text-gray-500'
              }`}
            >
              {pad(index + 1)}
            </span>

            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                {project.category} · {project.year}
                {project.featured && (
                  <span className="ml-3 rounded-full bg-blue-600 px-2 py-0.5 text-[10px] tracking-wider text-white">
                    Phare
                  </span>
                )}
              </p>
              <h3 className="mt-2 text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl lg:text-4xl">
                {project.title}
              </h3>
              <p className="mt-3 text-gray-600 lg:hidden dark:text-gray-400">{project.description}</p>
              <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">{project.tags.join(' · ')}</p>
            </div>

            <span
              aria-hidden="true"
              className={`mt-1 grid size-11 shrink-0 place-items-center rounded-full border transition-all duration-300 motion-reduce:transition-none ${
                active
                  ? 'border-blue-600 bg-blue-600 text-white'
                  : 'border-gray-300 text-gray-500 dark:border-gray-700 dark:text-gray-400'
              } group-hover:rotate-45`}
            >
              <ArrowUpRight size={20} />
            </span>
          </div>
        </div>
      </button>
    </li>
  );
}

// Aperçu fixe à droite : les images se fondent l'une dans l'autre selon la ligne survolée.
function Preview({ list, current, onOpen }) {
  const status = statusOf(current);

  return (
    <aside className="hidden lg:col-span-5 lg:block">
      <div className="sticky top-28">
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-gray-900">
          {list.map((p) => (
            <img
              key={p.title}
              src={p.image}
              alt=""
              aria-hidden="true"
              loading="lazy"
              onError={hideBroken}
              className={`absolute inset-0 size-full object-cover transition duration-700 ease-out motion-reduce:transition-none ${
                p === current ? 'scale-100 opacity-100' : 'scale-105 opacity-0'
              }`}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <StatusPill project={current} className="absolute left-4 top-4" />
          <p className="absolute bottom-4 left-5 right-5 text-sm font-medium text-white/90">
            {current.role} · {status.label}
          </p>
        </div>

        <div className="mt-6" aria-live="polite">
          <p className="min-h-[4.5rem] leading-relaxed text-gray-600 dark:text-gray-400">
            {current.description}
          </p>
          <button
            type="button"
            onClick={() => onOpen(current)}
            className={`mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-colors hover:bg-blue-700 ${focusRing}`}
          >
            Voir les détails <ArrowUpRight size={16} aria-hidden="true" />
          </button>
        </div>
      </div>
    </aside>
  );
}

export default function Projects() {
  const [category, setCategory] = useState('Tous');
  const [hovered, setHovered] = useState(null);
  const [selected, setSelected] = useState(null);

  const filtered = category === 'Tous' ? projects : projects.filter((p) => p.category === category);
  const current = filtered.find((p) => p.title === hovered) ?? filtered[0];
  const selectedIndex = selected ? filtered.findIndex((p) => p.title === selected) : -1;

  const close = useCallback(() => setSelected(null), []);
  const go = useCallback(
    (step) => {
      const i = filtered.findIndex((p) => p.title === selected);
      if (i < 0) return;
      setSelected(filtered[(i + step + filtered.length) % filtered.length].title);
    },
    [filtered, selected]
  );
  const prev = useCallback(() => go(-1), [go]);
  const next = useCallback(() => go(1), [go]);

  return (
    <section id="projects" className="relative py-24 text-gray-900 dark:text-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400">
              Projets
            </p>
            <h2 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
              Ce que j’ai construit
            </h2>
            <p className="mt-4 max-w-md text-gray-600 dark:text-gray-400">
              Clique sur un projet pour voir les détails.
            </p>
          </div>
          <p className="font-mono text-sm tabular-nums text-gray-500 dark:text-gray-400">
            {pad(filtered.length)} / {pad(projects.length)}
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-2" role="group" aria-label="Filtrer par catégorie">
          {CATEGORIES.map((cat) => {
            const count = cat === 'Tous' ? projects.length : projects.filter((p) => p.category === cat).length;
            const on = category === cat;
            return (
              <button
                key={cat}
                type="button"
                aria-pressed={on}
                onClick={() => setCategory(cat)}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${focusRing} ${
                  on
                    ? 'border-blue-600 bg-blue-600 text-white'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-900'
                }`}
              >
                {cat}
                <span className={`text-xs tabular-nums ${on ? 'text-white/80' : 'text-gray-400 dark:text-gray-500'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-10">
          <ul className="min-w-0 border-b border-gray-200 lg:col-span-7 dark:border-gray-800">
            {filtered.map((project, i) => (
              <ProjectRow
                key={`${category}-${project.title}`}
                project={project}
                index={i}
                active={project === current}
                onActivate={(p) => setHovered(p.title)}
                onOpen={(p) => setSelected(p.title)}
              />
            ))}
          </ul>

          <Preview list={filtered} current={current} onOpen={(p) => setSelected(p.title)} />
        </div>
      </div>

      {selectedIndex >= 0 && (
        <ProjectModal
          project={filtered[selectedIndex]}
          index={selectedIndex}
          total={filtered.length}
          onClose={close}
          onPrev={prev}
          onNext={next}
        />
      )}
    </section>
  );
}