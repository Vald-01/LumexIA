---
name: "lumexia-post-reseaux"
description: "Crée une publication LumexIA pour Instagram (post, carrousel, story), TikTok/Reels ou LinkedIn : accroche, texte du visuel, légende, hashtags, texte alternatif, date et heure conseillées, prompt du visuel. À utiliser dès qu'on demande un post, un carrousel, une story, un reel, un calendrier de publications ou du contenu social pour LumexIA."
---

# Publication réseaux sociaux LumexIA

Sources : `brand/tone-of-voice.md` (§5 ton par canal), `brand/value_proposition.md` (segments), `brand/produits.md` (prix), `brand/design.md` (visuels).

## 1. Cadrer

- **Segment** (S1 à S4) et **objectif** : faire découvrir, faire acheter ou faire s'inscrire.
- **Moment de la journée** : chaque post se rattache à l'arc de lumière (aube, jour, soir, nuit). C'est le fil rouge du compte.
- **Format** : post 4:5, carrousel 4:5 (3 à 7 vignettes), story 9:16, reel ou TikTok 9:16 (7 à 20 s).

## 2. Écrire

| Élément | Règle |
| --- | --- |
| Accroche (visuel ou 3 premières secondes) | 8 mots maximum, un moment de vie ou une question (« Ta lumière fait ça, toi ? ») |
| Légende | 3 à 5 phrases courtes, tutoiement, le moment puis le produit, une action à la fin |
| Emojis | 1 ou 2 maximum : ☀️ 🌙 ✨ 💡 |
| Hashtags | 3 à 6 : toujours `#LumexIA` et `#TaLumièreTonRythme`, puis des thèmes (`#Télétravail`, `#DécoIntérieur`, `#MaisonConnectée`, `#ÉconomiesDÉnergie`) |
| Texte alternatif | Ce qu'on voit sur le visuel, en une phrase |
| Date et heure | Vérifie le jour de la semaine avec un script. Repères : matin 7 h 30 (aube), midi 12 h 30, soir 18 h–21 h |

## 3. Le visuel

Écris le prompt avec le skill `lumexia-prompt-visuel`. Pour un reel, ajoute un mini-storyboard : plan, durée, image, texte à l'écran, son.

## 4. Interdits

Faux avis, faux témoignage, concours sans règlement, promesse de santé, économie chiffrée sans méthode, marque d'autrui, musique sous droits citée par son titre. Un contenu d'utilisateur ne se repartage qu'avec son accord écrit.

## 5. Livrer

Un bloc par publication : format, date et heure, accroche, texte du visuel, légende, hashtags, texte alternatif, prompt du visuel. Termine par une vérification avec `lumexia-verif-marque`.
