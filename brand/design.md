# LumexIA : charte graphique

> Référence visuelle de la marque, pour les humains comme pour les IA (images, maquettes, code).
> Version du 25 novembre 2026. En cas de doute sur le ton ou les limites, [projet.md](projet.md) fait foi.

---

## 1. L'idée visuelle : l'arc de la journée

Toute l'identité suit **la lumière d'une journée** : l'aube ambrée, le jour clair, le soir chaud, la nuit profonde. C'est la promesse de Lumex Sense rendue visible.

- Le site, les visuels et les emballages jouent sur **deux ambiances** : **Jour** (fond ivoire, texte nuit) et **Nuit** (fond nuit, texte ivoire, accent ambre).
- Un seul élément graphique récurrent : **l'arc de lumière**, un demi-cercle en dégradé qui va de l'Aube à l'Ambre. Il sert de motif, jamais de décoration gratuite (une fois par page ou par visuel au maximum).

---

## 2. Le logo

**Le concept :** le mot **lumex** en minuscules, dans une typographie géométrique (Sora, graisse 600). Le **« x » devient la lumière** : Ses deux branches sont deux faisceaux qui se croisent, et leur point de croisement brille d'un petit halo ambre. Le suffixe **IA** suit en capitales, plus petit, en Ambre sur fond Nuit ou en Nuit sur fond Ivoire.

**L'icône** (favicon, app, réseaux) : l'**arc de lumière** posé sur une ligne d'horizon, dans un carré aux coins arrondis Nuit. C'est un lever de soleil, un abat-jour et un bouton marche à la fois.

| Version | Usage |
| --- | --- |
| **Principale** : lumex en Nuit, IA et halo en Ambre, sur Ivoire | Site (en-tête), documents, emballages |
| **Inversée** : lumex en Ivoire, IA et halo en Ambre, sur Nuit | Pied de page, visuels « Nuit », vidéo |
| **Icône** : arc Aube → Ambre sur carré Nuit | Favicon, avatar des réseaux, icône de l'app |

**Règles :**
- Zone de protection : un espace libre égal à la hauteur du « x » tout autour du logo.
- Taille minimale : 100 px de large à l'écran, 25 mm à l'impression. En plus petit, utiliser l'icône seule.
- **Interdit :** déformer le logo, changer sa police, l'écrire tout en capitales, ajouter une ombre ou un contour, le poser sur une photo chargée, écrire « Lumexia » ou « Lumex IA ».

Fichiers prévus : `assets/logo/lumexia-logo.svg`, `assets/logo/lumexia-logo-inverse.svg`, `assets/logo/lumexia-icone.svg`.

---

## 3. Les couleurs

| Nom | Hex | Rôle | Variable CSS |
| --- | --- | --- | --- |
| **Nuit** | `#10162B` | Texte principal, fonds « Nuit », pied de page, logo | `--ink` |
| **Ivoire** | `#FAF7F2` | Fond des pages « Jour » | `--bg` |
| **Ambre** | `#FFB547` | Accent : bouton principal, halo du logo, badges | `--accent` |
| **Aube** | `#FFE2B8` | Fonds doux, surlignage, début de l'arc | `--soft` |
| **Bleu circadien** | `#3D5AFE` | Liens, données de l'app, lumière froide « Focus » | `--cool` |
| **Brume** | `#E7EAF3` | Cartes, champs de formulaire, séparateurs | `--card` |
| **Ardoise** | `#5A6178` | Texte secondaire, légendes | `--muted` |
| **Blanc** | `#FFFFFF` | Fenêtres, panier, texte sur Bleu circadien | `--paper` |

**Dégradé « arc de lumière » :** `linear-gradient(90deg, #FFE2B8 0%, #FFB547 100%)`. Sur fond Nuit uniquement pour les grands aplats.

**Contrastes vérifiés (WCAG AA, 4,5:1 minimum pour le texte), calculés par script le 25/11/2026 :**

| Texte sur fond | Ratio | Verdict |
| --- | --- | --- |
| Nuit sur Ivoire | 16,8:1 | ✅ texte courant |
| Ivoire sur Nuit | 16,8:1 | ✅ texte courant |
| Nuit sur Ambre | 10,2:1 | ✅ **bouton principal** |
| Ambre sur Nuit | 10,2:1 | ✅ accents en mode Nuit |
| Nuit sur Aube | 14,4:1 | ✅ |
| Nuit sur Brume | 14,9:1 | ✅ |
| Blanc sur Bleu circadien | 5,1:1 | ✅ bouton secondaire |
| Bleu circadien sur Ivoire | 4,8:1 | ✅ liens |
| Ardoise sur Ivoire | 5,8:1 | ✅ texte secondaire |
| **Ambre sur Ivoire** | 1,6:1 | ❌ **jamais pour du texte** |

**Règle d'or :** le bouton principal est **Ambre avec texte Nuit**, jamais Ambre avec texte blanc.

---

## 4. La typographie

| Usage | Police | Réglages |
| --- | --- | --- |
| Titres, logo, prix | **Sora** | 600 à 700, interlettrage −1 % sur les grands titres |
| Textes, boutons, formulaires | **Inter** | 400 et 600, taille de base 17 px, interligne 1,6 |
| Données (watts, lumens, kelvins, kWh) | **JetBrains Mono** | 500, petite taille, chiffres alignés |

- Les trois polices sont gratuites (Google Fonts) ; à héberger sur le site en WOFF2.
- Titres courts, en minuscules avec une majuscule initiale. Jamais de texte tout en capitales, sauf « IA » dans le nom.
- 70 caractères maximum par ligne de texte.

---

## 5. Formes et composants

- **Arrondis :** 20 px pour les cartes et les photos, 12 px pour les champs, pilule (999 px) pour les boutons et les badges.
- **Bouton principal :** fond Ambre, texte Nuit, hauteur 52 px, léger halo ambre au survol (`box-shadow: 0 0 0 6px rgba(255,181,71,.25)`).
- **Bouton secondaire :** contour Nuit de 1,5 px, fond transparent (Ivoire sur fond Nuit).
- **Fiche produit :** photo carrée sur fond Brume, nom en Sora, prix en Sora 700, caractéristiques en JetBrains Mono (« 806 lm · 2200–6500 K · 9 W »).
- **Sélecteur Jour / Nuit :** un interrupteur en haut du site fait passer toute la page d'une ambiance à l'autre (et respecte `prefers-color-scheme`).
- **Accessibilité :** contraste ≥ 4,5:1, cibles tactiles ≥ 44 px, focus clavier visible (contour Bleu circadien de 3 px), `prefers-reduced-motion` respecté.
- **Animations :** la lumière « s'allume » : fondu de 400 à 600 ms, jamais de clignotement ni d'effet stroboscopique.

---

## 6. Iconographie et illustration

- Icônes au trait de 1,75 px, coins arrondis, une seule couleur (Nuit ou Ivoire), sur une grille de 24 px.
- Pas de personnages 3D, pas d'ampoules « cartoon » avec un visage, pas d'éclairs ni d'icônes « idée ».
- Les schémas (installation, fonctionnement de Lumex Sense) utilisent l'arc de lumière comme fil conducteur : **Aube → Jour → Soir → Nuit**.

---

## 7. Photos

**Deux familles d'images :**

| Famille | Usage | Style |
| --- | --- | --- |
| **Produit** | Fiches produits, panier, Google Shopping | Produit seul, centré, fond Brume uni, lumière douce de studio, ombre légère, format 1:1, produit allumé si possible |
| **Ambiance** | Accueil, réseaux sociaux, campagnes | Vrais intérieurs d'adultes (appartement, bureau à domicile, chambre, salon), **la lumière du produit est la source principale**, heure du jour lisible (aube, jour, soir, nuit), format 4:5 (9:16 pour les stories) |

**Pour éviter l'effet « image IA »**, ajouter à la fin de chaque prompt d'ambiance :

> `natural interior photography, lived-in apartment, soft real-world light falloff, subtle film grain, slightly imperfect framing, not a 3D render, not glossy, not oversaturated`

**Interdits :** aucun texte, logo ou marque lisible dans l'image ; aucun enfant ; aucune lumière violette ou néon « gamer » (sauf pour une scène de ruban LED explicitement choisie) ; pas de visages nets d'inconnus en gros plan.

**Formats web :** WebP de moins de 150 Ko, en 600 et 1200 px de large, avec un texte alternatif descriptif.

---

## 8. Application rapide

| Support | Fond | Logo | Accent |
| --- | --- | --- | --- |
| Site, mode Jour | Ivoire | Principal | Ambre (boutons), Bleu circadien (liens) |
| Site, mode Nuit | Nuit | Inversé | Ambre |
| Pied de page | Nuit | Inversé | Ambre |
| Post réseaux « produit » | Brume ou Nuit | Icône en coin | Ambre |
| Post réseaux « ambiance » | Photo | Aucun ou icône discrète | — |
| E-mail | Ivoire, en-tête Nuit | Inversé dans l'en-tête | Bouton Ambre |
| Emballage | Ivoire mat, intérieur Nuit | Principal | Arc de lumière sur la tranche |
| Landing page de campagne | Nuit (Black Friday) ou Aube (printemps) | Inversé ou principal | Ambre |
