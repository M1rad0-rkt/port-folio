import { useEffect, useRef, useState } from 'react';
import { Github, Linkedin } from 'lucide-react';

const stack = ['Python', 'PyTorch', 'SQL', 'React', 'Django', 'FastAPI'];

const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600';

const reducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Lignes affichées dans le terminal (cycle en boucle)
const TERMINAL_LINES = [
  { type: 'prompt', text: 'mirado@portfolio:~$' },
  { type: 'cmd', text: ' whoami' },
  { type: 'out', text: 'Rakotoniaina Mirado' },
  { type: 'prompt', text: 'mirado@portfolio:~$' },
  { type: 'cmd', text: ' cat skills.txt' },
  { type: 'out', text: 'Python · PyTorch · SQL' },
  { type: 'out', text: 'React · Django · FastAPI' },
  { type: 'prompt', text: 'mirado@portfolio:~$' },
  { type: 'cmd', text: ' ./status.sh' },
  { type: 'out', text: 'M1 Data & IA — EMIT' },
  { type: 'out', text: 'Open to internships ✓' },
  { type: 'prompt', text: 'mirado@portfolio:~$' },
  { type: 'cmd', text: ' echo "Hello, world"' },
  { type: 'out', text: 'Hello, world' },
];

function TerminalFrame() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [cycle, setCycle] = useState(0);
  const bottomRef = useRef(null);
  const bodyRef = useRef(null);

  useEffect(() => {
    if (reducedMotion()) {
      setVisibleCount(TERMINAL_LINES.length);
      setCharIndex(999);
      return undefined;
    }

    // Reset au début de chaque cycle
    setVisibleCount(0);
    setCharIndex(0);
  }, [cycle]);

  useEffect(() => {
    if (reducedMotion()) return undefined;

    const line = TERMINAL_LINES[visibleCount];
    if (!line) {
      const t = setTimeout(() => setCycle((c) => c + 1), 2200);
      return () => clearTimeout(t);
    }

    const full = (line.type === 'cmd' ? line.text : line.type === 'prompt' ? line.text : line.text) || '';
    const isTyping = line.type === 'cmd';

    if (isTyping && charIndex < full.length) {
      const t = setTimeout(() => setCharIndex((c) => c + 1), 45 + Math.random() * 35);
      return () => clearTimeout(t);
    }

    // Ligne terminée → passer à la suivante
    const delay = line.type === 'out' ? 280 : line.type === 'prompt' ? 200 : 500;
    const t = setTimeout(() => {
      setVisibleCount((v) => v + 1);
      setCharIndex(0);
    }, delay);
    return () => clearTimeout(t);
  }, [visibleCount, charIndex, cycle]);

  // Scroll uniquement DANS le terminal (pas la page)
  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [visibleCount, charIndex]);

  const rendered = TERMINAL_LINES.slice(0, visibleCount + 1);

  return (
    <div
      className="relative mx-auto w-full max-w-sm overflow-hidden rounded-2xl border border-gray-800 bg-[#0c0c0c] shadow-2xl shadow-black/40"
      aria-label="Terminal de démonstration"
    >
      {/* Barre de titre */}
      <div className="flex items-center gap-2 border-b border-gray-800 bg-[#161616] px-3.5 py-2.5">
        <span className="size-2.5 rounded-full bg-[#ff5f56]" aria-hidden="true" />
        <span className="size-2.5 rounded-full bg-[#ffbd2e]" aria-hidden="true" />
        <span className="size-2.5 rounded-full bg-[#27c93f]" aria-hidden="true" />
        <span className="ml-2 flex-1 truncate text-center font-mono text-[10px] text-gray-500">
          mirado — zsh — 80×24
        </span>
      </div>

      {/* Corps — overflow interne seulement */}
      <div
        ref={bodyRef}
        className="h-64 overflow-y-auto overflow-x-hidden p-4 font-mono text-[12px] leading-relaxed sm:h-72 sm:text-[13px]"
      >
        {rendered.map((line, i) => {
          const isCurrent = i === visibleCount;
          const isCmd = line.type === 'cmd';
          const isPrompt = line.type === 'prompt';
          const isOut = line.type === 'out';

          let display = line.text;
          if (isCurrent && isCmd) {
            display = line.text.slice(0, charIndex);
          }
          if (isPrompt && isCurrent) {
            // prompt apparaît d'un coup
            display = line.text;
          }
          if (isOut && isCurrent) {
            display = line.text;
          }

          // Ne pas afficher les lignes futures
          if (i > visibleCount) return null;

          // Prompt + cmd sur la même ligne visuelle quand cmd suit
          if (isPrompt) {
            const next = TERMINAL_LINES[i + 1];
            const showCmdOnSameLine = next?.type === 'cmd' && (i + 1 < visibleCount || (i + 1 === visibleCount));
            if (showCmdOnSameLine && i + 1 === visibleCount) {
              const cmdText = next.text.slice(0, charIndex);
              return (
                <div key={`${cycle}-${i}`} className="flex flex-wrap">
                  <span className="text-emerald-400">{line.text}</span>
                  <span className="text-gray-100">
                    {cmdText}
                    <span className="ml-0.5 inline-block h-3.5 w-1.5 animate-pulse bg-emerald-400 align-middle" />
                  </span>
                </div>
              );
            }
            if (showCmdOnSameLine && i + 1 < visibleCount) {
              return (
                <div key={`${cycle}-${i}`}>
                  <span className="text-emerald-400">{line.text}</span>
                  <span className="text-gray-100">{next.text}</span>
                </div>
              );
            }
            return (
              <div key={`${cycle}-${i}`}>
                <span className="text-emerald-400">{line.text}</span>
                {isCurrent && (
                  <span className="ml-0.5 inline-block h-3.5 w-1.5 animate-pulse bg-emerald-400 align-middle" />
                )}
              </div>
            );
          }

          if (isCmd) {
            // déjà géré avec le prompt précédent
            return null;
          }

          return (
            <div key={`${cycle}-${i}`} className="text-gray-400">
              {display}
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}

export default function Hero() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const reveal = (delay) =>
    `transition duration-700 ease-out motion-reduce:transition-none ${delay} ${
      ready ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
    }`;

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pb-20 pt-28 text-gray-900 dark:text-white"
    >
      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8">
        <div className={`lg:col-span-7 ${reveal('delay-0')}`}>
          <p className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white/70 px-3.5 py-1.5 text-sm font-medium text-gray-700 dark:border-gray-700 dark:bg-gray-900/60 dark:text-gray-300">
            <span className="size-2 rounded-full bg-emerald-500" aria-hidden="true" />
            Ouvert aux stages et collaborations
          </p>

          <h1 className="mt-6 text-4xl font-extrabold leading-[0.95] tracking-tight min-[400px]:text-5xl sm:text-6xl lg:text-7xl">
            Mirado
            <br />
            Rakotoniaina
          </h1>

          <p className="mt-6 text-xl font-medium text-gray-800 sm:text-2xl dark:text-gray-200">
            Étudiant en M1 Data et Intelligence Artificielle
          </p>
          <p className="mt-1 text-gray-500 dark:text-gray-400">EMIT Fianarantsoa, Madagascar</p>

          <p className="mt-6 max-w-lg text-lg leading-relaxed text-gray-600 dark:text-gray-400">
            Formé à l&apos;économétrie, je conçois des modèles de machine learning, des pipelines de
            données et des applications web.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className={`rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-colors hover:bg-blue-700 ${focusRing}`}
            >
              Voir mes projets
            </a>
            <a
              href="#contact"
              className={`rounded-xl border border-gray-300 px-6 py-3 text-sm font-semibold transition-colors hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-900 ${focusRing}`}
            >
              Me contacter
            </a>
            <a
              href="https://github.com/M1rad0-rkt"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className={`grid size-11 place-items-center rounded-xl text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white ${focusRing}`}
            >
              <Github size={20} aria-hidden="true" />
            </a>
            <a
              href="https://www.linkedin.com/in/mirado-rakotoniaina-978523346"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className={`grid size-11 place-items-center rounded-xl text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white ${focusRing}`}
            >
              <Linkedin size={20} aria-hidden="true" />
            </a>
          </div>

          <ul
            aria-label="Technologies principales"
            className="mt-10 flex flex-wrap gap-x-6 gap-y-2 border-t border-gray-200 pt-6 text-sm font-medium text-gray-500 dark:border-gray-800 dark:text-gray-400"
          >
            {stack.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
        </div>

        <div className={`mx-auto w-full max-w-md lg:col-span-5 lg:mx-0 ${reveal('delay-200')}`}>
          <TerminalFrame />
        </div>
      </div>
    </section>
  );
}