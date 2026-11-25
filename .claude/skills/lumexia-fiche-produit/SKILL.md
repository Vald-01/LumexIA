---
name: "lumexia-fiche-produit"
description: "Écrit ou met à jour la fiche d'un produit LumexIA (Lumex Bulb, Strip, Halo, Aube, Orbe, Switch, Pack Départ ou nouveau produit) : nom, accroche, description, points clés, tableau de caractéristiques, contenu de la boîte, title et meta SEO, texte alternatif. À utiliser dès qu'on demande une fiche produit, une description produit ou une page produit LumexIA."
---

# Fiche produit LumexIA

Sources : `brand/produits.md` (prix et caractéristiques, qui font foi), `brand/tone-of-voice.md`, `brand/value_proposition.md`.

## 1. Avant d'écrire

- Reprends le prix et les caractéristiques **exactement** comme dans `brand/produits.md`. Un nouveau produit ou un nouveau prix : demande d'abord.
- Choisis le segment principal (S1 à S4) et reprends son message clé.

## 2. La structure (toujours dans cet ordre)

1. **Nom** : « Lumex + nom » (un mot, en anglais ou en français, court et concret).
2. **Prix** TTC.
3. **Accroche** : une phrase qui pose un moment de vie ou un bénéfice (« Réveille-toi avec le soleil. Même en janvier. »).
4. **Description** : 3 à 4 phrases. Le moment, puis ce que fait le produit, puis Lumex Sense ou l'app.
5. **Points clés** : 4 puces, chacune un bénéfice concret appuyé par une caractéristique.
6. **Caractéristiques** : un tableau (lumens, watts, kelvins, connexion, dimensions, contenu de la boîte). Chaque unité technique est traduite au moins une fois sur la page (« 806 lm ≈ 60 W classique »).
7. **SEO** : title < 60 caractères, mot-clé générique en premier, « | LumexIA » à la fin ; meta de 120 à 155 caractères avec le prix et une raison de cliquer. **Compte avec un script.**
8. **Texte alternatif** de la photo : 8 à 15 mots, ce qu'on voit (« Ampoule connectée allumée en blanc chaud, posée sur fond gris clair »).

## 3. Interdits

- Promesse de santé (« améliore ton sommeil ») ou d'économie chiffrée sans méthode.
- Avis, note, stock ou nombre de ventes inventé.
- Classe énergétique inventée : écrire « étiquette énergétique à venir ».
- Garantie de 3 ans (non décidée).

## 4. Livrer

Rends la fiche en Markdown, prête à intégrer, puis une ligne de vérification : prix conforme, longueurs SEO comptées, aucune promesse interdite. Si on te demande de l'intégrer au site, ajoute-la dans `site/` en respectant `brand/design.md` (photo 1:1 sur fond Brume, caractéristiques en JetBrains Mono, bouton Ambre à texte Nuit).
