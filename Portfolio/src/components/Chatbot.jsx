import { useState, useRef, useEffect } from 'react';
import { X, Send, Bot } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Ordre de secours : si le 1er est saturé (503), on essaie le suivant
const MODELS = [
  'gemini-3.8-flash',
  'gemini-3.5-flash-lite',
  'gemini-2.5-flash-lite',
  'gemini-2.5-flash',
];

const SYSTEM_PROMPT = `Tu es l'assistant personnel de RAKOTONIAINA Mirado, sur son portfolio.

=== COMPORTEMENT ===
- Si on te salue (bonjour, salut, hello, hi, etc.), réponds poliment et propose d'aider sur le parcours de Mirado.
- Tu peux faire de petites phrases de politesse (merci, à bientôt, avec plaisir).
- Tu parles en français, de façon claire, concise et professionnelle.
- Tu réponds surtout aux questions sur son parcours, compétences, projets, expériences et formation.
- Si la question est hors sujet, refuse poliment et recentre sur Mirado.

=== FORMAT DE RÉPONSE (IMPORTANT) ===
- N'utilise PAS de Markdown : pas de **gras**, pas de *italique*, pas de listes Markdown avec des astérisques.
- Écris en texte simple, avec des retours à la ligne.
- Pour les listes, utilise des tirets simples "-" ou des puces "•" en début de ligne.
- Réponses structurées et lisibles, 3 à 8 phrases ou une courte liste max.

=== PROFIL ===
- Nom : RAKOTONIAINA Mirado
- Statut : Étudiant en M1 Data & Intelligence Artificielle
- École : EMIT (École de Management et d'Innovation Technologique), Fianarantsoa
- Localisation : Antananarivo, Madagascar
- Email : miradorakoto111@gmail.com
- Téléphone : +261 34 57 344 84
- GitHub : https://github.com/M1rad0-rkt
- LinkedIn : https://www.linkedin.com/in/mirado-rakotoniaina-978523346
- Disponible pour stages et collaborations en Data & IA

=== FORMATION ===
- Master en Informatique — Parcours Data & IA (M1 en cours) — EMIT Fianarantsoa (2025 – en cours)
- Licence en Informatique — Université FJKM Ravelojaona Ampandrana (2022 – 2025)
- Baccalauréat Série D — Lycée Saint François Xavier Antanimena (2021 – 2022)

=== EXPÉRIENCES ===
1. Stagiaire projet — Autorités de Régulation des Marchés Publics (ARMP, Ministère de l'économie et de la finance) — en cours
   → Assistant de règlementation de l'ARMP & Chatbot de suivi sur l'utilisation des sites
2. Ideathon — Orange Digital Center & Ingedata — Data Challenge Inter-universitaire (2026)
   → Analyse de données et IA appliquée au marketing
3. Formation DevOps — Orange Digital Center (2026)
4. Stage de fin d'études — PixelVault (2024-2025)
   → Système de traitement des demandes clients avec analyse de satisfaction (React + Django + Tailwind + MySQL) → projet Clientelia
5. Stage — Ministère de la Jeunesse et du Sport (2022-2023)
6. Stage d'observation — Hôtel de Ville Analakely, DDNSI (2021-2022)

=== COMPÉTENCES ===
- Langages : Python, PHP, C, JavaScript
- Web : HTML5, CSS3, React/Vite, Django, Tailwind CSS
- Data science : Pandas, NumPy, Matplotlib, Scikit-learn, PyTorch, NLP, LLM
- Bases de données : PostgreSQL, MySQL, SQL
- BI : ETL/ELT, Power BI
- Outils : Git/GitHub, Trello, Docker

=== PROJETS ===
- Clientelia (projet phare) : plateforme gestion demandes clients + analyse satisfaction, JWT (React, Django, MySQL, Vite)
- Comptoir E-commerce : Boutique en ligne polyvalente conçue pour s'adapter à différents types de marchés. Stack moderne avec authentification JWT, catalogue produits et parcours d'achat. Accent sur la scalabilité et une API claire.(React, FastAPI, PostgreSQL)
- Assistant IA de Règlementation ARMP : RAG + LLM + NLP sur les textes des marchés publics (en cours / à venir)
- Chatbot IA ARMP : aide à l'inscription et à l'utilisation des sites ARMP (Python, TensorFlow, NLP)
- Tera-project : analyse qualité de l'air à Fianarantsoa (Python, Pandas, Streamlit, Matplotlib)
- Rice-disease-detection : détection de maladies du riz par vision (Python, PyTorch, Gradio)
- Rezerveo : réservation de lieux pour événements (PHP, MySQL, Bootstrap)
- GymGest : gestion de salle de sport (Python)
- Aktifitifitra : jeu 2D en Python + SQLite

=== PASSIONS ===
Machine Learning, Intelligence Artificielle, Guitare, Basket-ball, Chanter, Musculation

Réponds toujours en tant qu'assistant de Mirado, jamais comme Mirado lui-même ("Mirado a fait...", "Il maîtrise...").`;

const suggestions = [
  'Quel est son parcours ?',
  'Quels sont ses projets en IA ?',
  'Quelles compétences maîtrise-t-il ?',
  'Est-il disponible pour un stage ?',
];

const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600';

function friendlyError(err) {
  const msg = String(err?.message || err || '');
  if (msg.includes('API_KEY') || msg.includes('API key') || msg.includes('401') || msg.includes('403')) {
    return 'Clé API invalide ou refusée. Vérifie VITE_GEMINI_API_KEY dans .env et relance npm run dev.';
  }
  if (msg.includes('429') || msg.includes('quota') || msg.includes('RESOURCE_EXHAUSTED')) {
    return 'Quota API atteint. Réessaie plus tard ou crée une nouvelle clé sur aistudio.google.com/apikey.';
  }
  if (msg.includes('503') || msg.includes('UNAVAILABLE') || msg.includes('high demand')) {
    return 'Le modèle est saturé (forte demande). Réessaie dans quelques secondes.';
  }
  if (msg.includes('404') || msg.includes('not found') || msg.includes('no longer available')) {
    return 'Modèle indisponible. Le code va tenter un autre modèle au prochain essai.';
  }
  // Message court de l'API si présent
  const short = msg.replace(/\[GoogleGenerativeAI.*?\]\s*/gi, '').slice(0, 180);
  return short || "Désolé, une erreur s'est produite. Réessaie dans un instant.";
}

async function generateWithFallback(apiKey, question, historyMessages) {
  const genAI = new GoogleGenerativeAI(apiKey);
  let lastError;

  for (const modelName of MODELS) {
    try {
      const model = genAI.getGenerativeModel({
        model: modelName,
        systemInstruction: SYSTEM_PROMPT,
      });

      const history = historyMessages
        .slice(1)
        .slice(-6)
        .map((m) => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.text }],
        }));
      while (history.length && history[0].role === 'model') history.shift();

      // Sans historique : appel simple (plus fiable)
      if (history.length === 0) {
        const result = await model.generateContent(question);
        return result.response.text();
      }

      const chat = model.startChat({ history });
      const result = await chat.sendMessage(question);
      return result.response.text();
    } catch (err) {
      console.warn(`[Chatbot] Échec modèle ${modelName}:`, err?.message || err);
      lastError = err;
      // Continue vers le modèle suivant si 404/503/surcharge
      const m = String(err?.message || '');
      if (
        m.includes('404') ||
        m.includes('503') ||
        m.includes('UNAVAILABLE') ||
        m.includes('high demand') ||
        m.includes('no longer available') ||
        m.includes('not found')
      ) {
        continue;
      }
      // Autres erreurs (clé, quota…) : on arrête
      throw err;
    }
  }
  throw lastError;
}


/** Affiche le texte avec retours à la ligne et gras **...** basique */
function MessageContent({ text }) {
  const lines = String(text || '').split('\n');
  return (
    <div className="space-y-1.5">
      {lines.map((line, i) => {
        const trimmed = line.trim();
        const isBullet =
          trimmed.startsWith('•') ||
          trimmed.startsWith('- ') ||
          trimmed.startsWith('* ');
        const content = isBullet
          ? trimmed.replace(/^[•\-*]\s*/, '')
          : line;

        // Segments **gras**
        const parts = [];
        const re = /\*\*(.+?)\*\*/g;
        let last = 0;
        let m;
        let key = 0;
        while ((m = re.exec(content)) !== null) {
          if (m.index > last) parts.push(<span key={key++}>{content.slice(last, m.index)}</span>);
          parts.push(
            <strong key={key++} className="font-semibold">
              {m[1]}
            </strong>
          );
          last = m.index + m[0].length;
        }
        if (last < content.length) parts.push(<span key={key++}>{content.slice(last)}</span>);
        if (parts.length === 0 && content) parts.push(<span key={0}>{content}</span>);

        if (!trimmed) return <div key={i} className="h-1.5" />;

        if (isBullet) {
          return (
            <div key={i} className="flex gap-2">
              <span className="shrink-0 opacity-70">•</span>
              <span>{parts}</span>
            </div>
          );
        }
        return <p key={i}>{parts}</p>;
      })}
    </div>
  );
}

export default function Chatbot({ darkMode }) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: 'Salut ! Pose-moi une question sur le parcours, les projets ou les compétences de Mirado.',
    },
  ]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const messagesRef = useRef(messages);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const send = async (raw) => {
    const question = raw.trim();
    if (!question || loading) return;

    const prevMessages = messagesRef.current;
    setMessages((prev) => [...prev, { role: 'user', text: question }]);
    setInput('');

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: 'Clé API manquante. Ajoute VITE_GEMINI_API_KEY dans ton fichier .env puis relance npm run dev.',
        },
      ]);
      return;
    }

    setLoading(true);
    try {
      const text = await generateWithFallback(apiKey, question, prevMessages);
      setMessages((prev) => [...prev, { role: 'assistant', text }]);
    } catch (err) {
      console.error('[Chatbot]', err);
      setMessages((prev) => [...prev, { role: 'assistant', text: friendlyError(err) }]);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    send(input);
  };

  const isDark = darkMode !== false;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Fermer le chat' : 'Ouvrir le chat'}
        aria-expanded={open}
        className={`fixed bottom-24 right-6 z-50 grid size-14 place-items-center rounded-2xl transition-colors motion-reduce:transition-none ${focusRing} ${
          open
            ? isDark
              ? 'border border-gray-800 bg-black text-white hover:bg-gray-900'
              : 'border border-gray-300 bg-white text-gray-900 hover:bg-gray-100'
            : 'bg-blue-600 text-white shadow-lg shadow-blue-600/25 hover:bg-blue-700'
        }`}
      >
        {open ? <X size={22} aria-hidden="true" /> : <Bot size={24} aria-hidden="true" />}
      </button>

      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Ouvrir le chat : une question ? Demande-moi !"
          className={`fixed bottom-[9.75rem] right-5 z-50 block h-24 w-40 transition-transform hover:scale-105 motion-reduce:transition-none ${focusRing}`}
        >
          <svg viewBox="0 0 160 96" className="size-full overflow-visible" aria-hidden="true">
            <path
              d="M34 62 A15 15 0 0 1 28 36 A17 17 0 0 1 52 16 A21 21 0 0 1 88 10 A18 18 0 0 1 120 20 A17 17 0 0 1 134 46 A16 16 0 0 1 118 66 A22 22 0 0 1 84 70 A22 22 0 0 1 56 68 A16 16 0 0 1 34 62 Z"
              strokeWidth="2.5"
              strokeLinejoin="round"
              className={isDark ? 'fill-black stroke-gray-700' : 'fill-white stroke-gray-900'}
            />
            <ellipse
              cx="122"
              cy="82"
              rx="6"
              ry="4.5"
              strokeWidth="2.5"
              className={isDark ? 'fill-black stroke-gray-700' : 'fill-white stroke-gray-900'}
            />
            <ellipse
              cx="128"
              cy="92"
              rx="3.5"
              ry="2.8"
              strokeWidth="2.5"
              className={isDark ? 'fill-black stroke-gray-700' : 'fill-white stroke-gray-900'}
            />
          </svg>
          <span
            className={`absolute inset-x-0 top-0 grid h-20 place-items-center px-6 text-center text-xs font-medium leading-tight ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
          >
            Une question ?<br />
            Demande-moi&nbsp;!
          </span>
        </button>
      )}

      {open && (
        <div
          role="dialog"
          aria-label="Assistant de Mirado"
          className={`fixed bottom-40 right-6 z-50 flex h-[70vh] max-h-[520px] w-[calc(100vw-3rem)] max-w-[380px] flex-col overflow-hidden rounded-3xl border shadow-2xl ${
            isDark
              ? 'border-gray-800 bg-black text-white shadow-black/40'
              : 'border-gray-200 bg-white text-gray-900 shadow-black/15'
          }`}
        >
          <div
            className={`flex items-center gap-3 border-b px-5 py-4 ${
              isDark ? 'border-gray-800 bg-black' : 'border-gray-200 bg-white'
            }`}
          >
            <div className="grid size-10 place-items-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/25">
              <Bot size={20} aria-hidden="true" />
            </div>
            <div className="min-w-0 flex-1">
              <p className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Le beau bot de Mirado
              </p>
              <p className="mt-0.5 flex items-center gap-2 text-xs text-gray-500">
                <span className="size-2 rounded-full bg-emerald-500" aria-hidden="true" />
                Pose une question sur mon parcours
              </p>
            </div>
          </div>

          <div
            className={`flex-1 space-y-3 overflow-y-auto px-5 py-4 ${isDark ? 'bg-black' : 'bg-white'}`}
            aria-live="polite"
          >
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'rounded-br-md bg-blue-600 text-white'
                      : isDark
                      ? 'rounded-bl-md border border-gray-800 bg-gray-950 text-gray-200'
                      : 'rounded-bl-md border border-gray-200 bg-gray-50 text-gray-800'
                  }`}
                >
                  <MessageContent text={msg.text} />
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start" role="status" aria-label="Réponse en cours">
                <div
                  className={`flex gap-1.5 rounded-2xl rounded-bl-md border px-4 py-3.5 ${
                    isDark ? 'border-gray-800 bg-gray-950' : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  {['delay-0', 'delay-150', 'delay-300'].map((delay) => (
                    <span
                      key={delay}
                      className={`size-1.5 animate-pulse rounded-full motion-reduce:animate-none ${
                        isDark ? 'bg-gray-500' : 'bg-gray-400'
                      } ${delay}`}
                    />
                  ))}
                </div>
              </div>
            )}

            {messages.length === 1 && !loading && (
              <div className="flex flex-wrap gap-2 pt-1">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => send(s)}
                    className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${focusRing} ${
                      isDark
                        ? 'border-gray-800 text-gray-300 hover:border-blue-500 hover:text-blue-400'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          <form
            onSubmit={onSubmit}
            className={`flex items-center gap-2 border-t px-4 py-3 ${
              isDark ? 'border-gray-800 bg-black' : 'border-gray-200 bg-white'
            }`}
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ta question…"
              aria-label="Ta question"
              disabled={loading}
              className={`min-w-0 flex-1 rounded-xl border px-3.5 py-2.5 text-sm outline-none transition-colors ${
                isDark
                  ? 'border-gray-800 bg-gray-950 text-white placeholder:text-gray-500 focus:border-blue-500'
                  : 'border-gray-300 bg-transparent text-gray-900 placeholder:text-gray-400 focus:border-blue-600'
              }`}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label="Envoyer"
              className={`grid size-10 shrink-0 place-items-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/25 transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40 ${focusRing}`}
            >
              <Send size={16} aria-hidden="true" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}