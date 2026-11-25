---
name: "lumexia-prompt-visuel"
description: "Écrit les prompts d'IA d'image (Gemini, Midjourney, DALL·E, Firefly…) pour les visuels LumexIA : photos produit sur fond Brume, scènes d'ambiance à une heure précise de la journée, visuels réseaux, logo. Vérifie ensuite les images reçues. À utiliser dès qu'on parle de photo, image, visuel, moodboard ou prompt d'image pour LumexIA."
---

# Visuels LumexIA : prompts et vérification

Source : `brand/design.md` (§1 l'arc de la journée, §3 couleurs, §7 photos).

## 1. Choisir la famille

| Famille | Format | Règles |
| --- | --- | --- |
| **Produit** | 1:1 | Produit seul, centré, fond uni Brume `#E7EAF3`, lumière douce de studio, ombre légère, produit allumé |
| **Ambiance** | 4:5 (posts), 9:16 (stories, vidéo), 16:9 (bannière du site) | Vrai intérieur d'adulte, **la lumière du produit est la source principale**, heure de la journée lisible |

## 2. Écrire le prompt (en anglais, prêt à copier)

Ordre : sujet → produit et sa lumière (kelvins ou couleur hex) → décor → heure de la journée → cadrage → style → format → exclusions.

- **Heure de la journée** (l'arc de lumière) : `dawn, soft warm amber glow (~2200K)` · `daytime, neutral white light (~4000K)` · `evening, warm amber light (~2700K)` · `night, deep navy blue darkness with a single warm pool of light`.
- **Palette** : rappelle les couleurs de marque quand elles sont visibles (murs ivoire `#FAF7F2`, textiles bleu nuit `#10162B`, accents ambre `#FFB547`).
- **Suffixe ambiance obligatoire** : `natural interior photography, lived-in apartment, soft real-world light falloff, subtle film grain, slightly imperfect framing, not a 3D render, not glossy, not oversaturated`.
- **Toujours exclure** : `text, letters, logo, brand name, watermark, children, neon gamer RGB lighting, distorted hands, extra objects on the product`.
- Pour le même produit dans plusieurs images, joins la photo produit validée comme référence et commence par « Use the attached product image as the exact reference ».

Donne pour chaque prompt : un titre en français, l'usage prévu (fiche, accueil, post…), le format et l'outil conseillé.

## 3. Vérifier une image reçue

Refuse ou signale l'image si : un texte, un logo ou une marque est lisible ; un enfant apparaît ; le produit est déformé ou ne ressemble pas à la référence ; la lumière ne correspond pas à l'heure demandée ; l'image fait « rendu 3D » ou trop lisse ; un visage d'inconnu est net en gros plan. Liste aussi les petits défauts acceptables pour que la personne décide.

## 4. Enregistrer

Exporte en WebP de moins de 150 Ko, en 600 et 1200 px de large, dans `assets/images/`, nommé en français avec des tirets (`lumex-halo-bureau-soir-1200.webp`). Écris un texte alternatif de 8 à 15 mots. Note le prompt final et l'outil dans `docs/prompts.md` pour le rapport d'examen.
