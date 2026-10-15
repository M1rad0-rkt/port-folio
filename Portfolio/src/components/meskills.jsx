import { useEffect, useRef, useState } from 'react';
import { Code2, Globe2, Layers, LineChart, Database, BarChart4 } from 'lucide-react';

// La carte « featured » occupe plus de place dans la grille.
const skillCategories = [
  {
    icon: LineChart,
    title: 'Data science',
    level: 'Analyse de données / Machine Learning & Deep Learning',
    skills: ['Pandas', 'NumPy', 'Matplotlib', 'Scikit-learn', 'Pytorch', 'NLP', 'LLM'],
    featured: true,
  },
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

const reducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const pad = (n) => String(n).padStart(2, '0');

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

// Nuage de points décoratif : une droite de régression, clin d'œil à la data science.
const dots = Array.from({ length: 26 }, (_, i) => {
  const t = i / 25;
  const jitter = (((i * 7) % 9) - 4) / 45;
  return { x: 12 + t * 176, y: 104 - (0.78 * t + 0.12 + jitter) * 84 };
});

function RegressionSketch() {
  return (
    <svg
      viewBox="0 0 200 120"
      aria-hidden="true"
      className="pointer-events-none absolute bottom-6 right-6 hidden w-56 sm:block"
    >
      <path d="M8 8V108H192" fill="none" strokeWidth="1.5" className="stroke-gray-300 dark:stroke-gray-700" />
      <line x1="12" y1="93.9" x2="188" y2="28.4" strokeWidth="2" strokeLinecap="round" className="stroke-emerald-500" />
      {dots.map((d) => (
        <circle
          key={d.x}
          cx={d.x}
          cy={d.y}
          r="3"
          fillOpacity="0.75"
          className="fill-blue-600 dark:fill-blue-400"
        />
      ))}
    </svg>
  );
}

function SkillCard({ category, index }) {
  const [ref, shown] = useReveal();
  const Icon = category.icon;
  const { featured } = category;

  // Le halo suit la souris : on met à jour deux variables CSS, sans re-rendu React.
  const onPointerMove = (e) => {
    const box = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--x', `${e.clientX - box.left}px`);
    e.currentTarget.style.setProperty('--y', `${e.clientY - box.top}px`);
  };

  return (
    <li
      ref={ref}
      style={{ transitionDelay: shown ? `${Math.min(index, 5) * 70}ms` : '0ms' }}
      className={`flex transition duration-700 ease-out motion-reduce:transition-none ${
        featured ? 'sm:col-span-2 lg:row-span-2' : ''
      } ${shown ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
    >
      <div
        onPointerMove={onPointerMove}
        className={`group relative w-full overflow-hidden rounded-3xl border border-gray-200 bg-white/70 p-6 transition-colors hover:border-blue-600/50 dark:border-gray-800 dark:bg-gray-900/50 dark:hover:border-blue-400/50 sm:p-8 ${
          featured ? 'min-h-[20rem]' : ''
        }`}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              'radial-gradient(320px circle at var(--x, 50%) var(--y, 50%), rgba(37, 99, 235, 0.16), transparent 70%)',
          }}
        />

        {featured && <RegressionSketch />}

        <div className="relative">
          <div className="flex items-center justify-between">
            <span className="grid size-11 place-items-center rounded-xl border border-blue-600/30 bg-blue-600/10 text-blue-600 dark:border-blue-400/30 dark:text-blue-400">
              <Icon size={22} aria-hidden="true" />
            </span>
            <span className="font-mono text-sm tabular-nums text-gray-400 dark:text-gray-500">
              {pad(index + 1)}
            </span>
          </div>

          <h3
            className={`mt-6 font-extrabold tracking-tight ${
              featured ? 'text-3xl sm:text-4xl' : 'text-xl'
            }`}
          >
            {category.title}
          </h3>
          <p className="mt-1.5 max-w-md text-sm text-gray-500 dark:text-gray-400">{category.level}</p>

          <ul
            aria-label={`Compétences : ${category.title}`}
            className={`mt-6 flex flex-wrap gap-2 ${featured ? 'sm:max-w-md' : ''}`}
          >
            {category.skills.map((skill) => (
              <li
                key={skill}
                className="rounded-full border border-gray-300 px-3 py-1 text-sm font-medium text-gray-700 dark:border-gray-700 dark:text-gray-300"
              >
                {skill}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </li>
  );
}

export default function Skills() {
  return (
    <section id="meskills" className="relative py-24 text-gray-900 dark:text-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400">
          Compétences
        </p>
        <h2 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">De la donnée au modèle</h2>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-gray-600 dark:text-gray-400">
          Une base économétrique solide, appliquée au développement de pipelines data et de solutions IA de
          bout en bout.
        </p>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category, i) => (
            <SkillCard key={category.title} category={category} index={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}