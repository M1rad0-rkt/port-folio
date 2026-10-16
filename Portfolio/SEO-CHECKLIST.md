# Checklist visibilité & reconnaissance par les IA

À refaire à chaque mise à jour importante du portfolio.

## À chaque modification du site
1. Mettre à jour le contenu statique de `index.html` (bloc `#seo-fallback`) et `public/llms.txt` : nouveaux projets, stage, compétences.
2. Garder le même nom partout : « Mirado Rakotoniaina » (site, GitHub, LinkedIn, CV).
3. Ajouter un `alt` descriptif à chaque nouvelle image.
4. Builder avec l'URL : `npm run build (l'URL par défaut est dans seo.plugin.js ; la changer si le domaine change)` (génère canonical, JSON-LD, sitemap).
5. Vérifier : page sans JavaScript (le texte doit s'afficher), `/robots.txt`, `/sitemap.xml`, `/llms.txt`.

## Après chaque déploiement
1. Google Search Console : valider la propriété, soumettre `sitemap.xml`, « Inspecter l'URL » puis « Demander une indexation ».
2. Bing Webmaster Tools : importer depuis Search Console (alimente aussi Copilot et d'autres moteurs IA).
3. Tester l'aperçu de partage (LinkedIn Post Inspector).

## Présence hors du site (ce qui fait vraiment citer un nom par les IA)
1. GitHub : README de profil (dépôt `M1rad0-rkt/M1rad0-rkt`) avec la même présentation, URL du site dans le champ « Website », topics sur chaque dépôt, README clair par projet.
2. LinkedIn : même titre et même résumé, URL du site dans « Coordonnées », section Projets.
3. Publier : un article (dev.to, Medium, LinkedIn) par projet marquant, avec lien vers le portfolio.
4. Mêmes mots-clés partout : « Mirado Rakotoniaina », « Data Science », « IA », « EMIT Fianarantsoa ».
5. CV en PDF texte (pas en image JPG) hébergé sur le site.
