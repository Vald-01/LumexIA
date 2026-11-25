# LumexIA : prompts d'images pour Gemini

> Tous les visuels du site, prêts à copier dans Gemini (génération d'images « Nano Banana »).
> Version du 25 novembre 2026. Règles visuelles : [brand/design.md](../brand/design.md).
> **29 images** : 3 logos + 7 photos produit + 7 photos d'ambiance + 1 hero + 4 « arc de la journée » + 4 cibles + 2 marque + 1 image de partage.

---

## 0. Mode d'emploi

### Dans quel ordre générer

L'ordre compte : on crée d'abord les **références** (logo, produits), puis on les **joint** aux prompts suivants pour que le même objet apparaisse partout.

1. **Logos (A1 à A3).**
2. **Photos produit (B1 à B7).** Ce sont les références de chaque objet. Garde la meilleure version de chacune.
3. **Photos d'ambiance (C1 à C7).** Pour chacune, **joins la photo produit correspondante** dans Gemini (bouton ➕ / « Ajouter une image ») avant d'envoyer le prompt.
4. **Hero (D1).**
5. **Arc de la journée (E1 à E4).** Génère E1, puis **demande à Gemini de modifier E1** pour obtenir E2, E3 et E4 (même pièce, seule la lumière change).
6. **Cibles (F1 à F4), marque (G1 et G2), image de partage (H1).**

### Conseils pour Gemini

- **Un prompt par conversation** pour les références (B), pour éviter que Gemini mélange les objets. Pour la série E, reste dans **la même conversation**.
- **Le format** est écrit au début de chaque prompt (« square 1:1 », « vertical 4:5 »…). Si l'image sort dans un autre format, réponds : `Same image, but in a vertical 4:5 aspect ratio.`
- **Si un texte, un logo ou une marque apparaît** dans une photo : `Remove all text, letters and logos from the image. Change nothing else.`
- **Si le produit ne ressemble pas à la référence** : `Make the [product] look exactly like the attached reference image: same shape, colors and proportions.`
- **Pour corriger un détail**, demande une seule modification à la fois (« Make the light warmer and more amber », « Remove the plant on the left »). Gemini modifie l'image au lieu de tout recommencer.
- Les prompts sont **en anglais** : Gemini suit mieux les détails photographiques dans cette langue.

### Où enregistrer les images

| Images | Dossier | Nom |
| --- | --- | --- |
| Logos (A) | `assets/logo/` | Le nom indiqué, en **PNG** |
| Toutes les autres | `site/assets/img/` | Le nom indiqué, en **JPG** |

Pour convertir et redimensionner d'un coup les PNG téléchargés depuis Gemini : renomme-les avec le nom indiqué (sans changer l'extension), mets-les dans un dossier, puis lance :

```bash
bash scripts/importer-images.sh ~/Downloads/lumexia
```

Le script les convertit en JPG de 1600 px de large au maximum et les copie dans `site/assets/img/`. Relance ensuite `node src/build.mjs` : il indique les images qui manquent encore.

### Vérifier chaque image avant de la garder

- [ ] Aucun texte, aucune lettre, aucun logo ni aucune marque lisible (sauf sur les logos A1 à A3).
- [ ] Aucun enfant.
- [ ] Le produit ressemble à sa référence (forme, couleur ivoire, détail ambre).
- [ ] La lumière correspond au moment demandé (aube, jour, soir, nuit).
- [ ] Pas d'effet « rendu 3D » trop lisse, pas de main ni d'objet déformé.
- [ ] Pas de visage d'inconnu net en gros plan.

### Les produits, décrits une fois pour toutes

Ces descriptions sont reprises dans les prompts. Elles garantissent que chaque produit a la même apparence partout.

| Produit | Apparence |
| --- | --- |
| **Lumex Bulb** | Ampoule A60 classique, verre opale laiteux, base en polycarbonate ivoire mat, fine bague ambre entre la base et le verre, culot E27 argenté |
| **Lumex Strip** | Ruban LED plat et souple de 10 mm, support blanc, enroulé, petit boîtier de commande ivoire à un bouton |
| **Lumex Halo** | Lampe de bureau minimaliste : tête en anneau lumineux de 18 cm, bras articulé fin en aluminium ivoire mat, socle rond lesté avec un point ambre |
| **Lumex Aube** | Réveil lumineux en forme de disque de 18 cm, face avant en dôme dépoli, dos ivoire mat, petit socle, aucun écran visible |
| **Lumex Orbe** | Sphère de 15 cm en verre opale dépoli, posée sur un socle de recharge rond et bas, ivoire mat, cerclé d'une fine bague ambre |
| **Lumex Switch** | Interrupteur mural carré de 86 mm, plaque ivoire mate, quatre touches rectangulaires en 2 × 2, minuscule point ambre, aucun symbole |

---

## A. Logos

> Gemini sait écrire du texte court dans une image. Vérifie l'orthographe : **lumex** en minuscules, **IA** en capitales, rien d'autre. Une version vectorielle provisoire du logo existe déjà dans le site (`src/build.mjs`, fonction `logo()`).

### A1 · Logo principal (fond ivoire)

**Fichier :** `assets/logo/lumexia-logo.png` · **Format :** 16:9 · **Usage :** documents, rapport, emballage

```text
Create a clean, professional flat vector logo on a plain warm ivory background (#FAF7F2), wide 16:9 format, logo centered with generous empty space around it.

The logo is the lowercase wordmark "lumex" followed immediately by a smaller uppercase "IA", forming the brand name "lumexIA". Spelling must be exact: l-u-m-e-x then I-A. No other text.

Typography: a modern geometric sans-serif typeface, semi-bold, with round "u", "m" and "e", similar in spirit to the Sora typeface. The letters "lume" are solid deep navy blue (#10162B).

The key idea: the letter "x" is drawn as two crossing beams of light. Its two strokes are deep navy (#10162B) with rounded ends, and exactly at the point where they cross there is a small glowing warm amber dot (#FFB547) with a soft, subtle halo, like a tiny light being switched on.

The "IA" is smaller (about 55% of the height of "lume"), bold, in warm amber (#FFB547), sitting on the same baseline right after the "x".

Style: flat vector, perfectly crisp edges, no gradients except the very soft halo around the amber dot, no 3D, no shadow, no outline, no mockup, no tagline, no icon next to the wordmark. Minimal, calm, premium, tech brand.
```

### A2 · Logo inversé (fond nuit)

**Fichier :** `assets/logo/lumexia-logo-inverse.png` · **Format :** 16:9 · **Usage :** pied de page, vidéo, visuels « Nuit »

Dans la même conversation que A1, après avoir validé A1 :

```text
Now create the inverted version of exactly the same logo: same letters, same proportions, same composition, 16:9.
Background: solid deep navy blue (#10162B).
The letters "lume" and the two strokes of the "x" become warm ivory (#FAF7F2).
The glowing dot at the crossing of the "x" and the "IA" stay warm amber (#FFB547); the halo around the dot can be slightly more visible on the dark background.
Flat vector, crisp, no other change, no extra text.
```

### A3 · Icône de l'app et des réseaux

**Fichier :** `assets/logo/lumexia-icone.png` · **Format :** carré 1:1 · **Usage :** avatar Instagram et TikTok, icône de l'app

```text
Create a minimal flat vector app icon, square 1:1 format.

A rounded square (corner radius about 22% of the width) filled with solid deep navy blue (#10162B), on a plain white background.

Inside, centered slightly below the middle: a perfect half circle (a rising sun or a lampshade seen from the side), flat side down, filled with a smooth horizontal gradient from soft peach (#FFE2B8) on the left to warm amber (#FFB547) on the right. Directly under the half circle, a thin horizontal ivory line (#FAF7F2) with rounded ends, slightly wider than the half circle, like a horizon.

Nothing else: no letters, no text, no rays, no shadow, no 3D effect, no gloss. Very simple, readable at small sizes, calm and premium.
```

---

## B. Photos produit (fiches produits et cartes du site)

> Toutes en **carré 1:1**, produit seul, centré, sur fond uni gris-bleu clair (Brume `#E7EAF3`). Ce sont les **références** des produits : garde les meilleures.

### B1 · Lumex Bulb

**Fichier :** `produit-lumex-bulb.jpg`

```text
Professional e-commerce product photograph, square 1:1 format.

A single smart LED light bulb standing upright, centered, seen from a slightly low three-quarter angle. Classic A60 bulb shape. The glass is milky opal white and the bulb is switched on, glowing a soft warm white (about 2700K), the glow is gentle and does not blow out the image. The base housing is matte ivory polycarbonate (#FAF7F2) with a thin warm amber ring (#FFB547) where the base meets the glass. A standard silver E27 screw cap at the bottom.

Background: seamless, perfectly plain light blue-grey (#E7EAF3), no texture, no props. Soft diffused studio lighting from the upper left, a soft natural contact shadow under the product, a very subtle warm glow on the background around the bulb.

Photorealistic, sharp focus on the product, high-end minimal tech brand catalog style, accurate colors.
No text, no letters, no logo, no brand name, no watermark, no reflections of a studio, no hands, no other objects.
```

### B2 · Lumex Strip

**Fichier :** `produit-lumex-strip.jpg`

```text
Professional e-commerce product photograph, square 1:1 format.

A flexible flat LED light strip, 10 mm wide with a white backing, loosely coiled into a neat spiral in the center of the frame. The last 30 cm of the strip is uncoiled in a gentle S-curve towards the viewer and switched on, glowing warm amber (#FFB547), the individual small LEDs are visible but soft. Connected to the end of the strip by a short white cable: a small rounded rectangular controller box in matte ivory (#FAF7F2) with a single round button and a tiny amber indicator dot.

Background: seamless, perfectly plain light blue-grey (#E7EAF3). Soft diffused studio lighting from above, soft contact shadows, a warm amber glow softly reflected on the surface around the lit part.

Photorealistic, sharp, high-end minimal tech brand catalog style, accurate colors.
No text, no letters, no logo, no brand name, no watermark, no packaging, no hands, no other objects.
```

### B3 · Lumex Halo

**Fichier :** `produit-lumex-halo.jpg`

```text
Professional e-commerce product photograph, square 1:1 format.

A minimalist smart desk lamp, three-quarter view, centered. The lamp head is a flat circular ring (a halo), about 18 cm in diameter, open in the middle, with a continuous soft LED ring on its underside glowing a clean neutral white (about 4000K). The head sits at the end of a slender two-segment articulated arm in matte ivory aluminium (#FAF7F2) with small matte joints. The arm rises from a round, low, weighted base in the same matte ivory, with one tiny warm amber dot (#FFB547) on the top of the base as a touch indicator and a small USB-C port on its side.

Background: seamless, perfectly plain light blue-grey (#E7EAF3). Soft diffused studio lighting, soft contact shadow, the halo casts a gentle pool of white light on the surface under it.

Photorealistic, sharp, Scandinavian minimal design, high-end tech brand catalog style, accurate colors.
No text, no letters, no logo, no brand name, no watermark, no cables visible, no books, no hands, no other objects.
```

### B4 · Lumex Aube

**Fichier :** `produit-lumex-aube.jpg`

```text
Professional e-commerce product photograph, square 1:1 format.

A round sunrise wake-up light, three-quarter front view, centered. It is a disc about 18 cm in diameter and 6 cm deep, standing upright on a small integrated foot. The front is a softly domed frosted diffuser, switched on and glowing a gradient of warm sunrise colors: deep orange at the bottom edge fading to soft golden peach at the top (like the sun just above the horizon). The back and rim are matte ivory (#FAF7F2), with a thin warm amber ring (#FFB547) around the edge of the diffuser. There is no screen and no digits visible.

Background: seamless, perfectly plain light blue-grey (#E7EAF3). Soft diffused studio light, soft contact shadow, a gentle orange glow reflected on the surface in front of it.

Photorealistic, sharp, calm and premium, high-end tech brand catalog style.
No text, no numbers, no clock digits, no letters, no logo, no brand name, no watermark, no hands, no other objects.
```

### B5 · Lumex Orbe

**Fichier :** `produit-lumex-orbe.jpg`

```text
Professional e-commerce product photograph, square 1:1 format.

A cordless ambient lamp: a 15 cm sphere of frosted opal glass, switched on and glowing a warm amber light (about 2200K, color close to #FFB547), evenly diffused with no visible LEDs. The sphere rests on a low round charging base, slightly wider than the bottom of the sphere, in matte ivory (#FAF7F2) with a thin warm amber ring (#FFB547) around its top edge.

Background: seamless, perfectly plain light blue-grey (#E7EAF3). Soft diffused studio lighting, soft contact shadow, the sphere casts a warm glow onto the surface and slightly onto the background.

Photorealistic, sharp, minimal and cozy, high-end tech brand catalog style.
No text, no letters, no logo, no brand name, no watermark, no cable, no hands, no other objects.
```

### B6 · Lumex Switch

**Fichier :** `produit-lumex-switch.jpg`

```text
Professional e-commerce product photograph, square 1:1 format.

A wireless battery-free smart wall switch, seen from the front with a very slight angle so its thickness is visible. A square plate of 86 × 86 mm in matte ivory (#FAF7F2) with softly rounded corners, about 12 mm thick. On it, four rectangular push buttons arranged in a 2 × 2 grid, separated by thin even gaps, same matte ivory. A single tiny warm amber dot (#FFB547) in the top right corner as an indicator. Absolutely no symbols or icons on the buttons.

Background: seamless, perfectly plain light blue-grey (#E7EAF3). Soft diffused studio lighting from the upper left, soft contact shadow, crisp edges.

Photorealistic, sharp, minimal Scandinavian design, high-end tech brand catalog style.
No text, no letters, no symbols, no icons, no logo, no brand name, no watermark, no screws visible, no hands, no other objects.
```

### B7 · Pack Départ

**Fichier :** `produit-pack-depart.jpg` · **Joins :** les images B1 et B6

```text
Use the two attached images as exact references for the light bulb and the wall switch.

Professional e-commerce product photograph, square 1:1 format.

Three identical smart light bulbs (exactly like the attached bulb: milky opal glass, matte ivory base, thin amber ring, silver E27 cap) standing upright in a row, and the wireless wall switch (exactly like the attached switch) leaning slightly at the right end of the row. Behind them, an open rectangular gift-quality box: matte ivory exterior (#FAF7F2), deep navy blue interior (#10162B) with simple cardboard inserts. One bulb is switched on with a soft warm white glow.

Background: seamless, perfectly plain light blue-grey (#E7EAF3). Soft diffused studio lighting, soft contact shadows.

Photorealistic, sharp, tidy composition, high-end tech brand catalog style.
No text, no letters, no logo, no brand name, no printing on the box, no watermark, no hands, no other objects.
```

---

## C. Photos d'ambiance des produits

> Toutes en **vertical 4:5**. **Joins à chaque fois la photo produit (B) correspondante.** La lumière du produit est la source principale de la scène.

### C1 · Lumex Bulb, le salon le soir

**Fichier :** `ambiance-lumex-bulb.jpg` · **Joins :** B1

```text
Use the attached light bulb as the exact product reference.

Lifestyle interior photograph, vertical 4:5 format.

A cozy, lived-in living room in a modern European apartment in the evening, around 8 pm, after dark outside. A simple pendant light with an open fabric shade hangs above a low wooden coffee table; inside it, the smart bulb glows a warm amber light (about 2700K) and is the main light source of the room. A linen sofa in warm beige, a soft navy blue throw blanket (#10162B), a ceramic mug and an open book on the table, a large window showing a deep blue night sky. Warm pools of light and soft shadows, ivory walls (#FAF7F2).

No people. Calm, warm, inviting atmosphere.

natural interior photography, lived-in apartment, soft real-world light falloff, subtle film grain, slightly imperfect framing, not a 3D render, not glossy, not oversaturated.
No text, no letters, no logo, no brand name, no watermark, no screens showing content, no children, no neon colors.
```

### C2 · Lumex Strip, le meuble TV

**Fichier :** `ambiance-lumex-strip.jpg` · **Joins :** B2

```text
Use the attached LED strip as the exact product reference.

Lifestyle interior photograph, vertical 4:5 format.

A modern living room in the evening. A low, light oak TV cabinet against an ivory wall (#FAF7F2); the LED strip is hidden under the cabinet and behind it, creating a soft, even warm amber glow (#FFB547) on the wall and on the floor. The TV screen is switched off and black. On the cabinet: a small plant, a stack of two books, a speaker in fabric. A wooden floor, part of a beige rug, a navy blue armchair (#10162B) at the edge of the frame. The rest of the room is dim, the strip is the main light source.

No people. Calm, cinematic, cozy evening mood.

natural interior photography, lived-in apartment, soft real-world light falloff, subtle film grain, slightly imperfect framing, not a 3D render, not glossy, not oversaturated.
No text, no letters, no logo, no brand name, no watermark, no image on the TV, no children, no purple or rainbow neon gamer lighting.
```

### C3 · Lumex Halo, le bureau en fin de journée

**Fichier :** `ambiance-lumex-halo.jpg` · **Joins :** B3

```text
Use the attached desk lamp as the exact product reference.

Lifestyle interior photograph, vertical 4:5 format.

A home office corner in a bright apartment at the end of the day, around 6 pm in winter: outside the window the sky is turning deep blue. On a light wooden desk, the desk lamp casts a clean, slightly warm white light (about 3500K) on a closed laptop, a paper notebook with a pen, a ceramic cup of tea and a small plant. A simple chair with a knitted cardigan on the backrest. Ivory walls (#FAF7F2), a navy blue notebook (#10162B) as a color accent. The lamp is the main light source.

No people visible. The feeling of finishing work and slowing down.

natural interior photography, lived-in apartment, soft real-world light falloff, subtle film grain, slightly imperfect framing, not a 3D render, not glossy, not oversaturated.
No text, no letters, no logo, no brand name, no watermark, nothing readable on the notebook or screen, no children.
```

### C4 · Lumex Aube, la chambre au réveil

**Fichier :** `ambiance-lumex-aube.jpg` · **Joins :** B4

```text
Use the attached sunrise wake-up light as the exact product reference.

Lifestyle interior photograph, vertical 4:5 format.

A calm adult bedroom in early morning darkness, before sunrise, around 6:45 am in winter. On a wooden bedside table, the wake-up light glows a soft orange-golden sunrise gradient and gently lights up the room. Next to it: a small glass of water and a folded pair of glasses. In the background, a bed with rumpled ivory and sand-colored linen sheets and a navy blue blanket (#10162B), the shape of a person still asleep under the duvet, face not visible. Curtains closed, the room is otherwise dark blue and quiet.

Peaceful, warm, intimate but not sensual.

natural interior photography, lived-in apartment, soft real-world light falloff, subtle film grain, slightly imperfect framing, not a 3D render, not glossy, not oversaturated.
No text, no numbers, no clock digits, no letters, no logo, no brand name, no watermark, no visible face, no children.
```

### C5 · Lumex Orbe, la terrasse au crépuscule

**Fichier :** `ambiance-lumex-orbe.jpg` · **Joins :** B5

```text
Use the attached cordless lamp as the exact product reference.

Lifestyle outdoor photograph, vertical 4:5 format.

A small apartment balcony or city terrace at dusk, the sky a gradient of deep blue to soft peach on the horizon. On a round wooden bistro table, the glowing amber sphere lamp is the main light source, next to two glasses of sparkling water with lemon, a small bowl of olives and a folded linen napkin. Two folding chairs and a few potted herbs. No string lights: the sphere lamp is the only artificial light. The warm glow reflects on the table and the glasses.

No people, or only two pairs of hands at the edge of the frame holding glasses, no faces.

natural photography, real city balcony, soft real-world light falloff, subtle film grain, slightly imperfect framing, not a 3D render, not glossy, not oversaturated.
No text, no letters, no logo, no brand name, no watermark, no alcohol bottles, no children.
```

### C6 · Lumex Switch, l'entrée au départ

**Fichier :** `ambiance-lumex-switch.jpg` · **Joins :** B6

```text
Use the attached wall switch as the exact product reference.

Lifestyle interior photograph, vertical 4:5 format.

The entrance hall of an apartment in the evening. The wireless switch is mounted on an ivory wall (#FAF7F2) next to the front door, at shoulder height. An adult hand, seen from the side, is pressing one of its buttons as the person is leaving: a navy blue coat sleeve (#10162B), keys in the other hand slightly out of focus. A coat rack with a scarf, a small wooden bench, a pair of sneakers. The light in the hall is a warm white and the living room in the background is softly turning dark.

Only the hand and sleeve are visible, no face.

natural interior photography, lived-in apartment, soft real-world light falloff, subtle film grain, slightly imperfect framing, not a 3D render, not glossy, not oversaturated.
No text, no letters, no symbols on the switch, no logo, no brand name, no watermark, no children, no distorted fingers.
```

### C7 · Pack Départ, la cuisine ouverte

**Fichier :** `ambiance-pack-depart.jpg` · **Joins :** B1 · **Format :** horizontal 4:3 (bandeau de l'accueil)

```text
Use the attached light bulb as the exact product reference.

Lifestyle interior photograph, horizontal 4:3 format.

An open-plan kitchen and dining area in a renovated European house in the evening. Above a long wooden dining table, three simple pendant lights with clear glass shades in a row, each with the smart bulb inside glowing the same warm white (about 2700K). On the table: a linen runner, a bowl of fruit, two plates, a carafe of water. Ivory walls (#FAF7F2), matte navy blue kitchen cabinets (#10162B) in the background, a few plants. The three pendants are the main light source and create warm, even light on the table.

No people. Welcoming, modern, freshly renovated feeling.

natural interior photography, lived-in house, soft real-world light falloff, subtle film grain, slightly imperfect framing, not a 3D render, not glossy, not oversaturated.
No text, no letters, no logo, no brand name, no watermark, no children.
```

---

## D. Hero de l'accueil

### D1 · Le salon le soir (grande image d'ouverture)

**Fichier :** `hero-salon-soir.jpg` · **Format :** horizontal 16:9 · **Joins :** B1 et B5

> Le texte du site s'affiche **à gauche** de l'image : la partie gauche doit être sombre et calme.

```text
Use the attached bulb and sphere lamp as exact product references.

Wide cinematic interior photograph, horizontal 16:9 format.

A modern, warm living room at night, around 9 pm. The composition is asymmetric: the left 45% of the image is dark, calm and nearly empty (a deep navy blue wall, #10162B, in soft shadow) to leave space for text. The right side shows the cozy living area: a linen sofa with a navy throw, a low wooden coffee table with the glowing amber sphere lamp on it, a floor lamp with a fabric shade containing the smart bulb glowing warm amber, a bookshelf, a plant, a large window with a deep blue night sky and distant city lights out of focus.

The two lamps are the only light sources: warm amber pools of light (around 2200–2700K) on the right, gradually fading into deep blue darkness on the left. Peaceful, premium, inviting.

natural interior photography, lived-in apartment, soft real-world light falloff, subtle film grain, slightly imperfect framing, not a 3D render, not glossy, not oversaturated.
No text, no letters, no logo, no brand name, no watermark, no people, no children, no TV, no neon colors.
```

---

## E. L'arc de la journée (accueil et page Lumex Sense)

> Le même salon à quatre moments. **Génère E1, puis reste dans la même conversation** et utilise les prompts de modification E2 à E4 : la pièce ne doit pas changer, seule la lumière change. Format **vertical 4:5**.

### E1 · Aube (7 h)

**Fichier :** `arc-aube.jpg` · **Joins :** B1

```text
Use the attached light bulb as the exact product reference.

Interior photograph, vertical 4:5 format.

A small, modern, lived-in living room with an open kitchen corner, seen from the same fixed viewpoint as a still camera on a tripod. Elements that must stay identical in later versions: a linen sofa in warm beige on the left with a navy blue cushion (#10162B), a round light oak coffee table in the center with a ceramic mug, a floor lamp with a white fabric shade on the right containing the smart bulb, a large window in the back, ivory walls (#FAF7F2), a big plant near the window, a wooden floor with a sand-colored rug.

Moment: dawn, 7 am in winter. Outside the window, the sky is still dark blue with a thin orange line on the horizon. The floor lamp glows a soft, low, warm orange light (about 2200K), like a sunrise inside the room, gently lighting the sofa and the mug. The rest of the room is in soft blue shadow.

No people. Quiet, gentle awakening.

natural interior photography, lived-in apartment, soft real-world light falloff, subtle film grain, not a 3D render, not glossy, not oversaturated.
No text, no letters, no logo, no brand name, no watermark, no children.
```

### E2 · Jour (11 h)

**Fichier :** `arc-jour.jpg` · Dans la même conversation que E1 :

```text
Edit this exact image. Keep the room, the furniture, the objects, the viewpoint and the framing strictly identical.
Change only the time of day and the light: it is now 11 am on a bright day. Clear daylight comes through the window, the sky is light blue. The floor lamp is on at low intensity with a clean neutral white light (about 4500K). The whole room is bright, crisp and fresh, with soft natural shadows.
No text, no logo, no people.
```

### E3 · Soir (19 h)

**Fichier :** `arc-soir.jpg` · Dans la même conversation :

```text
Edit the original image again. Keep the room, the furniture, the objects, the viewpoint and the framing strictly identical.
Change only the time and the light: it is now 7 pm in winter. Outside, the sky is deep blue after sunset. The floor lamp glows a warm golden amber light (about 2700K, color close to #FFB547) at medium intensity and is the main light source, creating a cozy pool of light around the sofa and the coffee table. The corners of the room fall into soft shadow.
No text, no logo, no people.
```

### E4 · Nuit (23 h)

**Fichier :** `arc-nuit.jpg` · Dans la même conversation :

```text
Edit the original image again. Keep the room, the furniture, the objects, the viewpoint and the framing strictly identical.
Change only the time and the light: it is now 11 pm, full night. The window shows a dark navy night sky. The floor lamp is dimmed to a very low, deep amber glow (about 2000K), like candlelight, lighting only the immediate area around it. The rest of the room is in deep, calm navy blue darkness (#10162B), still slightly readable.
No text, no logo, no people.
```

---

## F. Les cibles (section « Pour qui » de l'accueil)

> **Vertical 4:5.** Des adultes, de dos, de profil ou de trois quarts, jamais de visage net en gros plan. Joins la photo produit indiquée.

### F1 · Jeunes actifs : le télétravail

**Fichier :** `cible-jeunes-actifs.jpg` · **Joins :** B3

```text
Use the attached desk lamp as the exact product reference.

Lifestyle photograph, vertical 4:5 format.

A young adult in their late twenties working from home in a small, stylish city apartment, seen from behind and slightly to the side (three-quarter back view, face not visible). They sit at a light wooden desk by a window, wearing a soft oversized sweater, typing on a laptop. The desk lamp lights the desk with a clean neutral white light. It is late afternoon, the light outside is fading to blue. A mug, a notebook, headphones and a plant on the desk; a small bookshelf and a framed abstract print (no readable content) on the ivory wall (#FAF7F2).

Focused, calm, modern work-from-home atmosphere.

candid lifestyle photography, real apartment, soft real-world light falloff, subtle film grain, slightly imperfect framing, not a 3D render, not glossy, not oversaturated.
No text, no letters, no logo, no brand name, no watermark, nothing readable on the screen, no children.
```

### F2 · Amateurs de technologie : la maison connectée

**Fichier :** `cible-tech.jpg` · **Joins :** B2

```text
Use the attached LED strip as the exact product reference.

Lifestyle photograph, vertical 4:5 format.

An adult in their early thirties sitting cross-legged on a sofa in a modern living room in the evening, seen in profile, face turned away and softly out of focus, holding a smartphone whose screen glows with abstract soft color blocks (no readable interface, no text). Behind the TV cabinet and under a floating shelf, the LED strip glows a deep cool blue (#3D5AFE) that is transitioning to warm amber (#FFB547), the two colors blending softly on the ivory wall. A minimal room: a small speaker, a plant, a few design objects on the shelf.

Smart, modern, playful tech feeling, but calm and tasteful, not gaming.

candid lifestyle photography, real apartment, soft real-world light falloff, subtle film grain, slightly imperfect framing, not a 3D render, not glossy, not oversaturated.
No text, no letters, no logo, no brand name, no watermark, no readable app interface, no children, no RGB gamer setup.
```

### F3 · Rénovation : la nouvelle cuisine

**Fichier :** `cible-renovation.jpg` · **Joins :** B1

```text
Use the attached light bulb as the exact product reference.

Lifestyle photograph, vertical 4:5 format.

Two adults in their mid-thirties in a kitchen that is being renovated in an older European house: freshly painted ivory walls (#FAF7F2), new navy blue cabinets (#10162B), a few painter's drop cloths and a step ladder in the background. One person stands on a low step stool, screwing the smart bulb into a simple pendant light above the kitchen island; the other holds the empty bulb box (plain ivory, no printing) and looks up, both seen from the side and from below, faces turned upward and partially hidden, not in sharp close-up. The bulb has just lit up with a warm white glow. Late afternoon daylight from a window.

A happy, proud "we did it ourselves" moment, natural and not posed.

candid lifestyle photography, real house, soft real-world light falloff, subtle film grain, slightly imperfect framing, not a 3D render, not glossy, not oversaturated.
No text, no letters, no logo, no brand name, no printing on the box, no watermark, no children, no distorted hands.
```

### F4 · Économies d'énergie : tout éteindre en partant

**Fichier :** `cible-economies.jpg` · **Joins :** B6

```text
Use the attached wall switch as the exact product reference.

Lifestyle photograph, vertical 4:5 format.

An adult in their late forties, seen from behind, in a warm living room at night, wearing a cardigan, pressing the wireless wall switch mounted next to the doorway. As they press it, the lamps of the living room in the background are dimming down to a last soft amber glow. Their silhouette is lit by the warm light of the hallway. The room is tidy and comfortable: a sofa, a bookshelf, a floor lamp, a plant, ivory walls (#FAF7F2), a navy blue armchair (#10162B).

Satisfying, responsible, peaceful end-of-day moment.

candid lifestyle photography, real home, soft real-world light falloff, subtle film grain, slightly imperfect framing, not a 3D render, not glossy, not oversaturated.
No text, no letters, no symbols on the switch, no logo, no brand name, no watermark, no visible face, no children.
```

---

## G. Page « La marque »

### G1 · La table de conception

**Fichier :** `marque-atelier.jpg` · **Format :** vertical 4:5 · **Joins :** B3 et B5

```text
Use the attached desk lamp and sphere lamp as exact product references.

Editorial photograph, vertical 4:5 format, seen from above at a 45-degree angle.

A large light wooden design table in a bright studio in Belgium. On it: hand-drawn pencil sketches of lamp shapes on cream paper (simple lines, no words, no numbers), a few white 3D-printed prototype parts, a set of fabric and metal finish samples in ivory, navy blue (#10162B) and amber (#FFB547), a pencil, a ruler, and the two finished products: the halo desk lamp switched on with a neutral white light, and the amber sphere lamp glowing softly. One adult hand holds a pencil at the edge of the frame. Soft daylight from a large window.

Creative, careful, human design process.

editorial photography, real workspace, soft natural light, subtle film grain, slightly imperfect framing, not a 3D render, not glossy, not oversaturated.
No text, no letters, no numbers, no handwriting, no logo, no brand name, no watermark, no faces, no children.
```

### G2 · L'emballage

**Fichier :** `marque-emballage.jpg` · **Format :** vertical 4:5 · **Joins :** B1 (et A3 si tu veux voir l'icône sur la boîte)

```text
Use the attached light bulb as the exact product reference.

Product packaging photograph, vertical 4:5 format.

An elegant, minimal cardboard box for the smart light bulb, with its lid open and resting next to it, on a light oak table. The box exterior is matte ivory (#FAF7F2) with a thin amber-to-peach gradient line (#FFE2B8 to #FFB547) printed along one edge; the inside is deep navy blue (#10162B) with a simple molded cardboard insert holding the bulb upright. The bulb is out of the box, standing in front of it, glowing warm white. A small folded leaflet with no readable text. Soft window daylight, gentle shadows.

Sustainable, simple, premium unboxing feeling: cardboard only, no plastic.

natural product photography, soft real-world light, subtle film grain, not a 3D render, not glossy, not oversaturated.
No text, no letters, no logo, no brand name, no barcode, no watermark, no hands, no plastic wrapping.
```

---

## H. Image de partage

### H1 · Image de partage (réseaux, messageries)

**Fichier :** `og-lumexia.jpg` · **Format :** horizontal 16:9 (recadré ensuite en 1200 × 630) · **Joins :** A2 et B1

```text
Use the attached inverted logo and light bulb as exact references.

Brand banner image, horizontal 16:9 format, with important content kept inside the central area (it will be cropped slightly at the top and bottom).

Background: solid deep navy blue (#10162B) with a very large, soft half-circle glow rising from the bottom center, a smooth gradient from soft peach (#FFE2B8) to warm amber (#FFB547), like a sunrise behind the horizon, softly blurred.
On the left half: the attached logo "lumexIA" in ivory and amber, exactly as in the reference, large and perfectly readable.
On the right half: the smart light bulb, exactly as in the reference, glowing warm white, floating slightly with a soft reflection under it.

Clean, premium, calm. The only text in the image is the logo itself, copied exactly.
No other text, no slogan, no watermark, no extra objects.
```

---

## Récapitulatif des fichiers

| # | Fichier | Format | Où dans le site |
| --- | --- | --- | --- |
| A1 | `assets/logo/lumexia-logo.png` | 16:9 | Rapport, documents |
| A2 | `assets/logo/lumexia-logo-inverse.png` | 16:9 | Rapport, vidéo |
| A3 | `assets/logo/lumexia-icone.png` | 1:1 | Réseaux sociaux, app |
| B1–B7 | `produit-<produit>.jpg` | 1:1 | Cartes produits, fiches produits |
| C1–C7 | `ambiance-<produit>.jpg` | 4:5 (C7 en 4:3) | Fiches produits, bandeau Pack Départ |
| D1 | `hero-salon-soir.jpg` | 16:9 | Accueil, en haut |
| E1–E4 | `arc-aube.jpg`, `arc-jour.jpg`, `arc-soir.jpg`, `arc-nuit.jpg` | 4:5 | Accueil et Lumex Sense (arc de la journée) |
| F1–F4 | `cible-jeunes-actifs.jpg`, `cible-tech.jpg`, `cible-renovation.jpg`, `cible-economies.jpg` | 4:5 | Accueil, « Pour qui » |
| G1–G2 | `marque-atelier.jpg`, `marque-emballage.jpg` | 4:5 | La marque |
| H1 | `og-lumexia.jpg` | 1200 × 630 | Image de partage |

Les `<produit>` sont : `lumex-bulb`, `lumex-strip`, `lumex-halo`, `lumex-aube`, `lumex-orbe`, `lumex-switch`, `pack-depart`.

> **Pour le rapport d'examen :** garde une capture de chaque conversation Gemini (prompt + résultat), surtout les corrections demandées. C'est ce que les consignes appellent « les prompts ou instructions fournis à l'IA et les étapes suivies ».
