import { useEffect, useRef, useState } from 'react';
import { Briefcase, GraduationCap, Download, Code2, Users, Calendar, Award } from 'lucide-react';

const experiences = [
  {
    title: 'Stagiaire projet',
    place: "Autorités de Régulation des Marchés Publics sous tutelle de la Ministère de l'économie et de la finance",
    period: 'en cours',
    description: "Mise en place d'un assistant de règlementation de l'ARMP & Chatbot de suivi sur l'utilisation des sites",
    icon: Code2,
  },
  {
    title: 'Ideathon — Orange Digital Center & Ingedata',
    place: 'Data Challenge Inter-universitaire',
    period: '2026',
    description: "Participation à un data challenge axé sur l'analyse de données et l'intelligence artificielle appliquée au marketing.",
    icon: Award,
  },
  {
    title: 'Formation DevOps',
    place: 'Orange Digital Center',
    period: '2026',
    description: 'Formation en DevOps et déploiement automatique des applications.',
    icon: Code2,
  },
  {
    title: "Stage de fin d'études",
    place: 'PixelVault',
    period: '2024-2025',
    description: "Mise en place d'un système de traitement des demandes clients avec analyse de satisfaction (React + Django + Tailwind + MySQL).",
    icon: Briefcase,
  },
  {
    title: 'Stage au sein du Ministère de la Jeunesse et du Sport',
    place: 'Ministère de la Jeunesse et du Sport',
    period: '2022-2023',
    description: "Stage d'immersion dans le monde professionnel.",
    icon: Users,
  },
  {
    title: "Stage d'observation",
    place: 'Hôtel de Ville Analakely',
    period: '2021-2022',
    description: 'Département Informatique DDNSI.',
    icon: Calendar,
  },
];

const education = [
  {
    title: 'Master en Informatique',
    place: "Ecole de Management et d'Innovation Technologique (EMIT) Fianarantsoa",
    period: '2025 - en cours',
    description: 'Parcours Data & Intelligence Artificielle (M1 en cours).',
    icon: GraduationCap,
  },
  {
    title: 'Licence en Informatique',
    place: 'Université FJKM Ravelojaona Ampandrana',
    period: '2022 - 2025',
    description: 'Obtention de la Licence en Informatique général.',
    icon: GraduationCap,
  },
  {
    title: 'Baccalauréat Série D',
    place: 'Lycée Saint François Xavier Antanimena',
    period: '2021 - 2022',
    description: '',
    icon: GraduationCap,
  },
];

const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600';

const reducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const pad = (n) => String(n).padStart(2, '0');
const isCurrent = (period) => period.includes('en cours');

// Frise verticale : le trait se remplit en bleu au fil du défilement et chaque
// étape s'allume quand le trait l'atteint.
function Timeline({ items, label }) {
  const listRef = useRef(null);
  const fillRef = useRef(null);
  const [passed, setPassed] = useState(-1);

  useEffect(() => {
    const list = listRef.current;
    const fill = fillRef.current;
    if (!list || !fill) return undefined;

    if (reducedMotion()) {
      fill.style.height = '100%';
      setPassed(items.length - 1);
      return undefined;
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = list.getBoundingClientRect();
      const mark = window.innerHeight * 0.6;
      const height = Math.max(0, Math.min(rect.height, mark - rect.top));
      fill.style.height = `${height}px`;
      let count = -1;
      for (let i = 0; i < list.children.length; i += 1) {
        if (list.children[i].offsetTop + 28 <= height) count = i;
      }
      setPassed(count);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [items.length]);

  return (
    <ol ref={listRef} aria-label={label} className="relative">
      <span aria-hidden="true" className="absolute bottom-0 left-5 top-0 w-px bg-gray-200 dark:bg-gray-800" />
      <span
        ref={fillRef}
        aria-hidden="true"
        className="absolute left-5 top-0 w-px bg-blue-600 dark:bg-blue-400"
        style={{ height: 0 }}
      />

      {items.map((item, i) => {
        const Icon = item.icon;
        const on = i <= passed;
        return (
          <li
            key={item.title}
            className={`relative pl-14 transition-opacity duration-500 motion-reduce:transition-none sm:pl-16 ${
              i === items.length - 1 ? '' : 'pb-10'
            } ${on ? 'opacity-100' : 'opacity-50'}`}
          >
            <span
              aria-hidden="true"
              className={`absolute left-0 top-0 grid size-10 place-items-center rounded-full border transition-colors duration-500 motion-reduce:transition-none ${
                on
                  ? 'border-blue-600 bg-blue-600 text-white dark:border-blue-400 dark:bg-blue-500'
                  : 'border-gray-300 bg-white text-gray-400 dark:border-gray-700 dark:bg-black dark:text-gray-500'
              }`}
            >
              <Icon size={18} />
            </span>

            <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400">
              {isCurrent(item.period) && (
                <span className="relative flex size-2" aria-hidden="true">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-60 motion-reduce:animate-none" />
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                </span>
              )}
              {item.period}
            </p>
            <h4 className="mt-2 text-lg font-bold leading-snug tracking-tight sm:text-xl">{item.title}</h4>
            <p className="mt-1 text-sm font-medium text-gray-600 dark:text-gray-300">{item.place}</p>
            {item.description && (
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                {item.description}
              </p>
            )}
          </li>
        );
      })}
    </ol>
  );
}

function ColumnTitle({ icon: Icon, children, count }) {
  return (
    <div className="mb-8 flex items-center justify-between border-b border-gray-200 pb-4 dark:border-gray-800">
      <h3 className="flex items-center gap-3 text-xl font-extrabold tracking-tight">
        <Icon size={20} className="text-blue-600 dark:text-blue-400" aria-hidden="true" />
        {children}
      </h3>
      <span className="font-mono text-sm tabular-nums text-gray-500 dark:text-gray-400">{pad(count)}</span>
    </div>
  );
}

export default function CV() {
  return (
    <section id="cv" className="relative py-24 text-gray-900 dark:text-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400">
          Mon parcours
        </p>
        <h2 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
          Expériences &amp; Formations
        </h2>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-gray-600 dark:text-gray-400">
          Du stage d’observation à des projets concrets en Data &amp; IA.
        </p>

        <div className="mt-16 grid gap-16 lg:grid-cols-12 lg:gap-12">
          <div className="min-w-0 lg:col-span-7">
            <ColumnTitle icon={Briefcase} count={experiences.length}>
              Expériences
            </ColumnTitle>
            <Timeline items={experiences} label="Expériences professionnelles" />
          </div>

          <div className="min-w-0 lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
            <ColumnTitle icon={GraduationCap} count={education.length}>
              Formation
            </ColumnTitle>
            <Timeline items={education} label="Formation" />
          </div>
        </div>
      </div>

      <a
        href="/Curriculum_Vitae_Mirado.jpg"
        download="Curriculum_Vitae_Mirado.jpg"
        aria-label="Télécharger mon CV"
        className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-3.5 py-3 text-sm font-semibold text-gray-900 shadow-lg transition-colors hover:border-blue-600 dark:border-gray-700 dark:bg-black dark:text-white dark:hover:border-blue-400 sm:px-4 ${focusRing}`}
      >
        <Download size={16} className="text-blue-600 dark:text-blue-400" aria-hidden="true" />
        <span className="hidden sm:inline">Télécharger mon CV</span>
      </a>
    </section>
  );
}