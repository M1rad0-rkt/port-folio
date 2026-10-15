import { useEffect, useRef, useState } from 'react';
import { Github, Linkedin } from 'lucide-react';

const stack = ['Python', 'PyTorch', 'SQL', 'React', 'Django', 'FastAPI'];

const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600';

const reducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Les quatre repères d'angle du cadre.
const corners = [
  'left-4 top-4 rounded-tl-lg border-l-2 border-t-2',
  'right-4 top-4 rounded-tr-lg border-r-2 border-t-2',
  'bottom-4 left-4 rounded-bl-lg border-b-2 border-l-2',
  'bottom-4 right-4 rounded-br-lg border-b-2 border-r-2',
];

// Logo Python dans un cadre : il flotte doucement en oscillant, son ombre suit le
// mouvement, et il s'incline légèrement vers la souris quand elle survole le cadre.
function PythonFrame() {
  const floatRef = useRef(null);
  const shadowRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  // Flottement continu, coupé si le visiteur a demandé moins d'animations.
  useEffect(() => {
    if (reducedMotion()) return undefined;
    const timing = { duration: 3600, iterations: Infinity, direction: 'alternate', easing: 'ease-in-out' };
    const animations = [
      floatRef.current.animate(
        [
          { transform: 'translateY(-7px) rotate(-3deg)' },
          { transform: 'translateY(7px) rotate(3deg)' },
        ],
        timing
      ),
      // Plus le logo descend, plus l'ombre est large et sombre.
      shadowRef.current.animate(
        [
          { transform: 'scaleX(0.8)', opacity: 0.5 },
          { transform: 'scaleX(1.05)', opacity: 1 },
        ],
        timing
      ),
    ];
    return () => animations.forEach((animation) => animation.cancel());
  }, []);

  const onPointerMove = (e) => {
    if (e.pointerType === 'touch' || reducedMotion()) return;
    const box = e.currentTarget.getBoundingClientRect();
    setTilt({
      x: (e.clientX - box.left) / box.width - 0.5,
      y: (e.clientY - box.top) / box.height - 0.5,
    });
  };

  return (
    <div
      onPointerMove={onPointerMove}
      onPointerLeave={() => setTilt({ x: 0, y: 0 })}
      className="relative mx-auto aspect-square w-full max-w-sm rounded-3xl border border-gray-200 bg-white/70 shadow-sm dark:border-gray-800 dark:bg-gray-900/70"
    >
      {corners.map((position) => (
        <span
          key={position}
          aria-hidden="true"
          className={`absolute size-6 border-blue-600/70 dark:border-blue-400/70 ${position}`}
        />
      ))}

      <div className="absolute inset-0 grid place-items-center">
        <div
          className="flex flex-col items-center"
          style={{
            transform: `perspective(700px) rotateX(${-tilt.y * 12}deg) rotateY(${tilt.x * 12}deg) translate(${tilt.x * 10}px, ${tilt.y * 10}px)`,
            transition: 'transform 200ms ease-out',
          }}
        >
          <div ref={floatRef}>
            <svg
              viewBox="0 0 256 255"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="Logo Python"
              className="size-32 sm:size-40"
            >
              <path
                fill="#3776AB"
                d="M126.916.072c-64.832 0-60.784 28.115-60.784 28.115l.072 29.128h61.868v8.745H41.631S.145 61.355.145 126.77c0 65.415 36.21 63.097 36.21 63.097h21.61v-30.336s-1.165-36.21 35.632-36.21h61.401s34.401.522 34.401-33.323V33.61S199.378.072 126.916.072z"
              />
              <path
                fill="#FFD43B"
                d="M128.757 254.126c64.832 0 60.784-28.115 60.784-28.115l-.072-29.128H127.6v-8.745h86.441s41.486 4.705 41.486-60.71c0-65.416-36.21-63.097-36.21-63.097h-21.61v30.336s1.165 36.21-35.632 36.21h-61.401s-34.401-.523-34.401 33.322v56.572s-5.235 33.355 67.227 33.355z"
              />
              <circle cx="85.5" cy="42" r="12" fill="#fff" />
              <circle cx="170" cy="212" r="12" fill="#fff" />
            </svg>
          </div>
          <div
            ref={shadowRef}
            aria-hidden="true"
            className="mt-9 h-3 w-24 rounded-full bg-gray-900/15 blur-sm dark:bg-black/70"
          />
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  // Seule animation de la page : un fondu à l'arrivée, texte puis cadre.
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
            Formé à l’économétrie, je conçois des modèles de machine learning, des pipelines de
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
          <PythonFrame />
        </div>
      </div>
    </section>
  );
}