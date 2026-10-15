export default function Footer({ darkMode }) {
  return (
    <footer className={`py-8 border-t ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Créé par RAKOTONIAINA Mirado
        </p>
        <p className="mt-1 text-xs text-gray-500">
          © {new Date().getFullYear()} Tous droits réservés
        </p>
      </div>
    </footer>
  );
}
