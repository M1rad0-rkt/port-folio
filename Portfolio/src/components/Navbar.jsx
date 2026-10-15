import { useState, useEffect, useRef } from 'react';
import { Menu, X, Moon, Sun } from 'lucide-react';

const navItems = [
  { name: 'Accueil', id: 'home' },
  { name: 'À propos', id: 'about' },
  { name: 'Compétences', id: 'meskills' },
  { name: 'Projets', id: 'projects' },
  { name: 'Parcours', id: 'cv' },
  { name: 'Contact', id: 'contact' },
];

export default function Navbar({ darkMode, toggleDarkMode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState('home');
  // Tant qu'un défilement déclenché par un clic est en cours, le scroll-spy est suspendu.
  const lockRef = useRef(null);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 40);
      if (lockRef.current) return;

      // Section active = la dernière dont le haut a dépassé une ligne placée à 35 % de l'écran.
      const line = window.innerHeight * 0.35;
      let current = navItems[0].id;
      navItems.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      });
      // En bas de page, la dernière section est toujours active (même si elle est courte).
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (atBottom) current = navItems[navItems.length - 1].id;
      setActiveId(current);
    };

    const onScroll = () => {
      // Pendant un défilement guidé, chaque événement repousse la fin du verrou.
      if (lockRef.current) {
        clearTimeout(lockRef.current);
        lockRef.current = setTimeout(() => {
          lockRef.current = null;
          update();
        }, 150);
      }
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
      clearTimeout(lockRef.current);
    };
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      clearTimeout(lockRef.current);
      lockRef.current = setTimeout(() => {
        lockRef.current = null;
      }, 150);
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveId(id);
      setIsOpen(false);
    }
  };

  const linkClass = (id) => {
    const active = activeId === id;
    if (active) {
      return darkMode
        ? 'text-white bg-white/10 shadow-[0_0_20px_rgba(59,130,246,0.35)]'
        : 'text-blue-700 bg-blue-50 shadow-[0_0_16px_rgba(59,130,246,0.25)]';
    }
    return darkMode
      ? 'text-gray-400 hover:text-white hover:bg-white/5'
      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100';
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? darkMode
            ? 'bg-black/90 backdrop-blur-md border-b border-gray-800'
            : 'bg-white/90 backdrop-blur-md border-b border-gray-200'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button
            type="button"
            onClick={() => scrollToSection('home')}
            className={`text-xl font-bold tracking-tight ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            RAKOTONIAINA
          </button>

          <div className="hidden md:flex items-center gap-1.5">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                className={`relative px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 ${linkClass(item.id)}`}
              >
                {item.name}
                {activeId === item.id && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]"
                  />
                )}
              </button>
            ))}
            <button
              type="button"
              onClick={toggleDarkMode}
              className={`ml-2 p-2 rounded-lg ${darkMode ? 'text-yellow-400' : 'text-gray-600'}`}
              aria-label={darkMode ? 'Mode clair' : 'Mode sombre'}
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <button
              type="button"
              onClick={toggleDarkMode}
              className={darkMode ? 'text-yellow-400' : 'text-gray-600'}
              aria-label={darkMode ? 'Mode clair' : 'Mode sombre'}
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className={darkMode ? 'text-white' : 'text-gray-900'}
              aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className={`md:hidden border-t ${
            darkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-200'
          }`}
        >
          <div className="px-4 py-4 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                className={`block w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all ${linkClass(item.id)}`}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}