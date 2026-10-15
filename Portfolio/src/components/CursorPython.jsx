import { useEffect, useRef } from 'react';

// Petit logo Python qui suit le curseur avec un léger retard, s'incline selon la
// vitesse et grossit au-dessus des liens et des boutons.
// Désactivé sur écran tactile et quand le visiteur réduit les animations.
export default function CursorPython() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!finePointer || calm) return undefined;

    const target = { x: 0, y: 0 };
    const pos = { x: 0, y: 0 };
    let seen = false;
    let big = false;
    let frame = 0;

    // L'animation ne tourne que tant que le logo n'a pas rattrapé le curseur.
    const draw = () => {
      const dx = target.x - pos.x;
      const dy = target.y - pos.y;
      pos.x += dx * 0.16;
      pos.y += dy * 0.16;
      const tilt = Math.max(-30, Math.min(30, dx * 0.8));
      el.style.transform = `translate3d(${pos.x + 14}px, ${pos.y + 14}px, 0) rotate(${tilt}deg) scale(${
        big ? 1.4 : 1
      })`;
      frame = Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1 ? 0 : requestAnimationFrame(draw);
    };
    const kick = () => {
      if (!frame) frame = requestAnimationFrame(draw);
    };

    const onMove = (e) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (!seen) {
        seen = true;
        pos.x = e.clientX;
        pos.y = e.clientY;
        el.style.opacity = '1';
      }
      kick();
    };
    const onOver = (e) => {
      big = Boolean(e.target.closest?.('a, button, input, [role="button"]'));
      kick();
    };
    const onLeave = () => {
      el.style.opacity = '0';
    };
    const onEnter = () => {
      if (seen) el.style.opacity = '1';
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerover', onOver, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);
    document.documentElement.addEventListener('mouseenter', onEnter);
    return () => {
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerover', onOver);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      document.documentElement.removeEventListener('mouseenter', onEnter);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[90] opacity-0 transition-opacity duration-200"
      style={{ willChange: 'transform' }}
    >
      <svg viewBox="0 0 256 255" xmlns="http://www.w3.org/2000/svg" className="size-7 drop-shadow-md">
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
  );
}