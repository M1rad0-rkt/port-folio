import { useState, useEffect, lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/meskills';
import Projects from './components/Projects';
import CV from './components/CV';
import Contact from './components/Contact';
import Footer from './components/Footer';
// Chargé à la demande : le SDK Gemini n'alourdit plus le premier affichage
const Chatbot = lazy(() => import('./components/Chatbot'));

function App() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) {
      setDarkMode(saved === 'true');
    }
  }, []);

  const toggleDarkMode = () => {
    const next = !darkMode;
    setDarkMode(next);
    localStorage.setItem('darkMode', String(next));
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div
        className={`min-h-screen ${
          darkMode ? 'bg-diagonal-dark text-gray-100' : 'bg-diagonal-light text-gray-900'
        }`}
      >
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <Hero darkMode={darkMode} />
        <About darkMode={darkMode} />
        <Skills darkMode={darkMode} />
        <Projects darkMode={darkMode} />
        <CV darkMode={darkMode} />
        <Contact darkMode={darkMode} />
        <Footer darkMode={darkMode} />
        <Suspense fallback={null}>
          <Chatbot darkMode={darkMode} />
        </Suspense>
      </div>
    </div>
  );
}

export default App;