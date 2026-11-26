# LumexIA

**Ta lumière. Ton rythme.**

LumexIA est une marque fictive d'éclairage connecté, créée avec l'IA pour l'examen du cours d'intelligence artificielle (Technifutur, année académique 2026-2027). Ses produits adaptent automatiquement la lumière au moment de la journée, pour plus de confort, de bien-être et d'économies d'énergie.

> Projet d'examen : marque fictive, aucune vente réelle.

## Le système de marque

| Fichier | Contenu |
| --- | --- |
| [brand/systeme-de-marque.md](brand/systeme-de-marque.md) | **Résumé en une page** |
| [brand/projet.md](brand/projet.md) | Sujet, cible, positionnement, valeurs, lignes rouges |
| [brand/value_proposition.md](brand/value_proposition.md) | Value Proposition Canvas des 4 segments |
| [brand/design.md](brand/design.md) | Charte graphique : logo, couleurs, typographies, composants, photos |
| [brand/tone-of-voice.md](brand/tone-of-voice.md) | Ton de voix et règles d'écriture |
| [brand/produits.md](brand/produits.md) | Gamme, prix et 7 fiches produits |
| [CLAUDE.md](CLAUDE.md) | Instructions pour l'IA (Claude Code) |

## Les skills (instructions réutilisables pour l'IA)

| Skill | Usage |
| --- | --- |
| [lumexia-fiche-produit](.claude/skills/lumexia-fiche-produit/SKILL.md) | Écrire une fiche produit (texte, caractéristiques, SEO) |
| [lumexia-prompt-visuel](.claude/skills/lumexia-prompt-visuel/SKILL.md) | Écrire les prompts d'images et vérifier les images reçues |
| [lumexia-post-reseaux](.claude/skills/lumexia-post-reseaux/SKILL.md) | Créer une publication Instagram, TikTok ou LinkedIn |
| [lumexia-landing-campagne](.claude/skills/lumexia-landing-campagne/SKILL.md) | Créer une landing page de campagne (brief, offre Omnibus, page, vérifications) |
| [lumexia-verif-marque](.claude/skills/lumexia-verif-marque/SKILL.md) | Relire un contenu avant publication |

## Le site web

15 pages statiques en français : accueil, catalogue, **7 fiches produits**, Lumex Sense, La marque, Aide (FAQ, livraison, contact), **landing page Black Friday**, mentions légales et page 404. En-tête avec menu et interrupteur **Jour / Nuit**, pied de page complet, panier de démonstration, arc de la journée interactif et calculateur d'économies (estimation avec méthode affichée).

```bash
node src/build.mjs                                # régénère site/ et vérifie titles et metas
python3 -m http.server 4321 --directory site      # aperçu sur http://localhost:4321
```

| Fichier | Ce qu'on y change |
| --- | --- |
| `src/data.mjs` | Produits, prix, caractéristiques, moments de la journée, FAQ |
| `src/build.mjs` | Structure et textes des pages |
| `src/static/style.css` | Styles (couleurs et typographies de `brand/design.md`) |
| `src/static/app.js` | Panier, ambiance Jour/Nuit, arc de la journée, calculateur |
| `site/assets/img/` | Les photos générées avec Gemini |

### Les images

Tous les prompts Gemini sont dans **[docs/prompts-gemini.md](docs/prompts-gemini.md)** (29 images : logos, photos produit, ambiances, hero, arc de la journée, cibles, marque, image de partage). Les originaux reçus de Gemini sont gardés dans `assets/gemini/`. Tant qu'une image manque, le site affiche un halo coloré avec le nom du fichier attendu.

```bash
bash scripts/importer-images.sh assets/gemini      # convertit les photos en JPG 1600 px dans site/assets/img/
python3 scripts/detourer-logo.py assets/gemini/lumexia-logo.jpg assets/logo/lumexia-logo.png   # retire le fond du logo
python3 scripts/detourer-icone.py assets/gemini/lumexia-icone.jpg assets/logo/lumexia-icone.png # retire le fond de l'icône
```

Le détourage demande Pillow et numpy (`pip install pillow numpy`). Les logos détourés servent dans l'en-tête et le pied de page (`src/static/logo.png` et `logo-inverse.png`, 720 px de large).

### En ligne avec Netlify

Le fichier `netlify.toml` dit à Netlify de lancer `node src/build.mjs` et de publier le dossier `site/`. Une fois le dépôt GitHub relié à Netlify, chaque `git push` met le site en ligne automatiquement.

## À venir

- [x] Photos, logos et icône générés avec Gemini (29 images)
- [x] Publications pour les réseaux sociaux : 9 publications et 14 visuels ([social/publications.md](social/publications.md)), générés par `node src/social.mjs`
- [x] Vidéo : moodboard, storyboard et prompts Veo 3 ([video/README.md](video/README.md))
- [x] Landing page de campagne : Black Friday « On rallume » ([brief](campagne/black-friday.md), page `site/black-friday/`)
- [x] Rapport PDF ([docs/rapport/LumexIA-rapport.pdf](docs/rapport/LumexIA-rapport.pdf)) : noms, lien Netlify et captures Zeoob et vidéo à compléter dans `docs/rapport/rapport.html`, puis `node src/rapport.mjs --pdf`
