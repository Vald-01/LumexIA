---
name: "lumexia-landing-campagne"
description: "Crée une landing page de campagne LumexIA (Black Friday, Saint-Valentin, printemps, rentrée…) : brief dans campagne/, offre conforme à la directive Omnibus, page générée dans site/ par src/build.mjs, compte à rebours sur les vraies dates, vérifications. À utiliser dès qu'on demande une landing page, une page promo, une campagne saisonnière ou une offre limitée dans le temps pour LumexIA."
---

# Landing page de campagne LumexIA

Exemple complet : [campagne/black-friday.md](../../../campagne/black-friday.md) et la page `site/black-friday/`.

## 1. Lire avant d'écrire

1. `brand/projet.md` : lignes rouges (pas de faux avis, pas de promesse santé, pas de % d'économie sans méthode).
2. `brand/value_proposition.md` : le tableau « Campagne clé » donne le segment prioritaire (Black Friday → S2, printemps → S3, hiver → S4).
3. `brand/tone-of-voice.md` : **pas de fausse urgence**, Omnibus.
4. `brand/design.md` §8 : ambiance de la landing (Nuit pour Black Friday, Aube pour le printemps).
5. `brand/produits.md` : prix de référence.

## 2. Écrire le brief (`campagne/<nom>.md`)

| Rubrique | Contenu |
| --- | --- |
| L'idée | Un nom court qui relie l'événement à la lumière (Black Friday → « On rallume ») |
| Dates | Début et fin précises, heure de Bruxelles. **Vérifie les jours de la semaine avec un script** |
| Offre | Tableau produit / prix de référence (le plus bas des 30 derniers jours) / prix promo / économie / réduction réelle. **Calcule par script** : la réduction affichée doit être ≤ à la réduction réelle |
| Interdits | Ce que la marque refuse (faux compte à rebours, prix gonflés, stock limité inventé) et ce qu'elle fait à la place |
| Structure | Les sections de la page, dans l'ordre |
| Textes clés | Accroche, sous-titre, boutons, bandeau final |
| Déclinaisons | Réseaux, e-mail, bannière, avec le skill à utiliser |
| Mesure | Les indicateurs à suivre, sans inventer de résultat |

## 3. Générer la page

- Données de l'offre dans `src/data.mjs` (objet `CAMPAIGN` : dates ISO avec fuseau, prix de référence, prix promo).
- Page dans `src/build.mjs` (`path: '<nom>/index.html'`), réutilise `img()`, les cartes et les classes existantes.
- Prix barré **en petit au-dessus** du prix promo, précédé pour les lecteurs d'écran de « Prix le plus bas des 30 derniers jours : ».
- Compte à rebours : trois états selon la date réelle (avant, pendant, terminé). Jamais de minuteur qui recommence.
- Panier : identifiant `<sku>-<campagne>` pour ne pas mélanger avec le prix normal.
- Lien d'accès : bandeau sur l'accueil et lien dans le pied de page.

## 4. Vérifier

- `node src/build.mjs` : title < 60 caractères, meta de 120 à 155.
- Contraste ≥ 4,5:1 sur le fond de la campagne, focus visible, cibles ≥ 44 px.
- Pas de défilement horizontal à 375 px.
- Relecture avec le skill `lumexia-verif-marque`.
