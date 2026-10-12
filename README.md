<p align="center">
  <img src="public/logo-mark.png" alt="ZHÉTICAL" width="96">
</p>

<h1 align="center">ZHÉTICAL — Query Intel</h1>

<p align="center">
  Cyber intelligence · Investigations OSINT · Protection des communautés en ligne<br>
  Sensibilisation des familles à la sécurité numérique
</p>

<p align="center">
  <strong><a href="https://www.query-intel.com/">www.query-intel.com</a></strong>
</p>

---

## Le projet en une phrase

Un site vitrine **statique d'un seul fichier**, sans dépendance externe à l'exécution :
tout le HTML, le CSS, le JavaScript et les icônes (SVG) vivent dans `index.html`.

## Stack

| Élément | Choix | Pourquoi |
|---|---|---|
| Structure | **HTML statique** (`index.html`) | Un seul fichier à éditer, rien à compiler pour modifier le contenu |
| Styles | CSS intégré (variables + `clamp()`) | Aucune feuille externe, aucun CDN |
| Icônes | **SVG inline** | Zéro requête réseau, net à toutes les tailles |
| JS | Vanilla (IntersectionObserver, compteurs animés) | Pas de framework côté client |
| Build | **Vite 5** | Minifie et copie `public/` vers `dist/` |
| Hébergement | **Vercel** | Déploiement automatique à chaque push sur `main` |

Aucune police, image ou script n'est chargé depuis un domaine tiers : le site
fonctionne même hors ligne, et il n'y a pas de requête à bloquer côté vie privée.

## Structure

```
.
├── index.html          <- LE site (source de vérité, tout est dedans)
├── public/             <- copié tel quel à la racine du site par Vite
│   ├── logo-mark.png       monogramme ZHÉTICAL « ZZ » (transparent)
│   ├── favicon.png         64x64
│   ├── apple-touch-icon.png 180x180
│   ├── og-image.jpg        aperçu de partage social (1200x630)
│   ├── badges/             vignettes des certifications
│   ├── sitemap.xml
│   └── Zhetical_FINAL.jpg  bannière d'origine (source du logo)
├── vite.config.ts      <- publicDir: 'public'  (indispensable)
└── src/                <- LEGACY : ancienne SPA React/Bolt, NON utilisée
```

### Avertissement sur `src/`

`src/` (`App.tsx`, `main.tsx`, `index.css`) est l'**ancienne version React** issue du
template Bolt. Elle **n'est plus référencée** par `index.html` et **n'est pas servie**.
Elle est conservée uniquement comme archive (elle contient notamment les identifiants
des vidéos YouTube d'origine). Ne pas s'y fier pour modifier le site.

## Développement local

```bash
npm install
npm run dev        # serveur de développement Vite
npm run build      # genere dist/ (ce qui part en production)
npm run preview    # previsualise dist/ localement
```

> Sous Windows, si `npm install` echoue sur un `EBUSY` pendant le postinstall
> d'esbuild, relancer avec un Node systeme plutot que le Node managé.

Pour modifier le site, on edite **`index.html`** — pas besoin de toucher au build
pour un changement de texte. Un `npm run build` sert seulement a verifier le
resultat final.

## Deploiement

Vercel est branche sur ce depot et **redeploie automatiquement a chaque push sur
`main`**. Consequence : **pousser = deployer**.

```bash
git add index.html
git commit -m "..."
git push origin main
```

Le deploiement prend environ **10 a 15 minutes** a se propager. Pendant ce temps,
le site continue de servir la version precedente : ne pas conclure a un echec trop
vite. Verification rapide :

```bash
curl -s -L "https://www.query-intel.com/?v=$RANDOM" | grep -c '<une chaine recente>'
```

Le site est servi **depuis la racine** du domaine. Ne **pas** definir de `base`
dans `vite.config.ts` : cela casserait le chargement des assets en production.

## Contenu du site

| Ancre | Section |
|---|---|
| `#top` | Hero + chiffres cles (30+ certifications, 13 badges CanCred, 50+ enquetes, 450+ outils) |
| `#outils` | Les 4 outils (Ghosint Tools, Ghosint-Tracker, OSINT Gods Eye, Investigator Browser) |
| `#tracker` | Ghostint Tracker : 2 modes (Cloud / Local Ollama) + fonctionnalites |
| `#tutoriels` | 4 tutoriels — **3 liens encore a completer** (voir ci-dessous) |
| `#protection` | Protection & education : 4 piliers, atelier parent-enfant |
| `#methode` | La methode en 4 etapes |
| `#parcours` | Parcours, passeport OSINT (bande MRZ), badges |
| `#certifications` | Tableau des certifications + vignettes de preuve |
| `#services` | 2 prestations |
| `#contact` | 3 adresses e-mail |

## Identite visuelle — deux marques distinctes

1. **Monogramme ZHÉTICAL « ZZ »** — la marque du site. Affiche dans l'en-tete et le
   pied de page (`public/logo-mark.png`). Source : `public/Zhetical_FINAL.jpg`.
2. **L'atome neon** — le logo commun aux **autres projets** de la suite (OSINT
   Master-Toolkit, OSINT Investigator, Ghostint Tracker). Sur ce site il n'apparait
   que comme **reference** : filigrane en miroir dans le coin du hero (`#atom-line`)
   et pastille dans le pied de page (`#atom-neon`), definis une seule fois en
   `<symbol>` et reutilises via `<use>`.

## A faire

- [ ] Remplacer les **3 liens tutoriels** encore en commentaire dans `index.html` :
      `LIEN_TUTORIEL_GHOSINT_TOOLS`, `LIEN_TUTORIEL_GODS_EYE`,
      `LIEN_TUTORIEL_INVESTIGATOR_BROWSER`.
- [ ] Regenerer `public/og-image.jpg` : l'apercu de partage social contient encore
      l'ancien domaine « PROHACKING77.ME ».
- [ ] Unifier les liens des outils sur `query-intel.com` (ils pointent encore sur
      `*.prohacking77.me`).
- [ ] Nettoyer `public/` : doublons « copy » et images personnelles publiees par erreur.

## Contact

- j.coelho@query-intel.com
- investigation@query-intel.com
- support@query-intel.com

---

© 2026 ZHÉTICAL · Query Intel — Belgique
