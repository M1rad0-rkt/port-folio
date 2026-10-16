// Plugin Vite : injecte canonical / Open Graph / JSON-LD et génère sitemap.xml
// uniquement si VITE_SITE_URL est défini (ex. https://mon-portfolio.vercel.app).
// Sans URL, rien n'est injecté : mieux vaut aucune balise qu'une URL fausse.
import { writeFileSync, existsSync, readFileSync, appendFileSync } from 'node:fs';
import { resolve } from 'node:path';

const GITHUB = 'https://github.com/M1rad0-rkt';
const LINKEDIN = 'https://www.linkedin.com/in/mirado-rakotoniaina-978523346';

export default function seoPlugin() {
  const raw = process.env.VITE_SITE_URL || 'https://rakotoniaina-mirado.vercel.app';
  const site = raw.replace(/\/+$/, '');

  return {
    name: 'portfolio-seo',

    transformIndexHtml() {
      if (!site) {
        console.warn('\n[seo] VITE_SITE_URL non défini : canonical, og:url, JSON-LD et sitemap ignorés.\n');
        return [];
      }

      const person = {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Person',
            '@id': `${site}/#person`,
            name: 'Mirado Rakotoniaina',
            alternateName: ['RAKOTONIAINA Mirado', 'Mirado', 'M1rad0-rkt'],
            url: `${site}/`,
            image: `${site}/og-image.jpg`,
            jobTitle: 'Étudiant en Master Data & Intelligence Artificielle',
            description:
              "Étudiant en M1 Data & Intelligence Artificielle à l'EMIT Fianarantsoa (Madagascar), formé à l'économétrie. Machine learning, deep learning, RAG/LLM, pipelines ETL et applications full-stack. À la recherche d'un stage ou d'un poste de data scientist.",
            nationality: { '@type': 'Country', name: 'Madagascar' },
            homeLocation: { '@type': 'Place', name: 'Madagascar' },
            alumniOf: [
              {
                '@type': 'CollegeOrUniversity',
                name: "EMIT — École de Management et d'Innovation Technologique",
                address: { '@type': 'PostalAddress', addressLocality: 'Fianarantsoa', addressCountry: 'MG' },
              },
              { '@type': 'CollegeOrUniversity', name: 'Université FJKM Ravelojaona Ampandrana' },
            ],
            knowsAbout: [
              'Data science',
              'Machine learning',
              'Deep learning',
              'Natural language processing',
              'RAG',
              'LLM',
              'Économétrie',
              'ETL',
              'Python',
              'PyTorch',
              'SQL',
              'React',
              'Django',
              'FastAPI',
            ],
            sameAs: [GITHUB, LINKEDIN],
          },
          {
            '@type': 'WebSite',
            '@id': `${site}/#website`,
            url: `${site}/`,
            name: 'Portfolio de Mirado Rakotoniaina',
            inLanguage: 'fr',
            about: { '@id': `${site}/#person` },
            author: { '@id': `${site}/#person` },
          },
          {
            '@type': 'ProfilePage',
            '@id': `${site}/#profile`,
            url: `${site}/`,
            mainEntity: { '@id': `${site}/#person` },
            inLanguage: 'fr',
          },
        ],
      };

      return [
        { tag: 'link', attrs: { rel: 'canonical', href: `${site}/` }, injectTo: 'head' },
        { tag: 'meta', attrs: { property: 'og:url', content: `${site}/` }, injectTo: 'head' },
        { tag: 'meta', attrs: { property: 'og:image', content: `${site}/og-image.jpg` }, injectTo: 'head' },
        { tag: 'meta', attrs: { name: 'twitter:image', content: `${site}/og-image.jpg` }, injectTo: 'head' },
        {
          tag: 'script',
          attrs: { type: 'application/ld+json' },
          children: JSON.stringify(person),
          injectTo: 'head',
        },
      ];
    },

    closeBundle() {
      if (!site) return;
      const dist = resolve(process.cwd(), 'dist');
      if (!existsSync(dist)) return;
      const today = new Date().toISOString().slice(0, 10);
      writeFileSync(
        resolve(dist, 'sitemap.xml'),
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>${site}/</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>1.0</priority>\n  </url>\n</urlset>\n`,
      );
      const robots = resolve(dist, 'robots.txt');
      if (existsSync(robots) && !readFileSync(robots, 'utf8').includes('Sitemap:')) {
        appendFileSync(robots, `\nSitemap: ${site}/sitemap.xml\n`);
      }
    },
  };
}
