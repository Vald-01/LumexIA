# Campagne Black Friday 2026 : « On rallume »

> Brief de la landing page de campagne. Page en ligne : `site/black-friday/index.html` (générée par `src/build.mjs`, données dans `src/data.mjs` → `CAMPAIGN`).
> Sources : [projet.md](../brand/projet.md) (lignes rouges), [value_proposition.md](../brand/value_proposition.md) (S2 : campagne clé Black Friday), [tone-of-voice.md](../brand/tone-of-voice.md) (pas de fausse urgence), [design.md](../brand/design.md) (landing Black Friday en Nuit), [produits.md](../brand/produits.md) (prix).

---

## 1. L'idée

Le Black Friday est le vendredi « noir ». LumexIA est une marque de lumière : **on rallume**. La campagne prend le contre-pied des Black Friday agressifs (faux comptes à rebours, prix gonflés, « dernières pièces ») et reste fidèle à la marque : **lumineuse, apaisante, maligne**, et honnête sur les prix.

| | |
| --- | --- |
| **Nom** | On rallume |
| **Accroche** | Le vendredi le plus noir de l'année. On rallume la lumière. |
| **Offre** | −20 % sur toute la gamme |
| **Dates** | Du vendredi 27 novembre 2026 (0 h) au lundi 30 novembre 2026 (23 h 59), heure de Bruxelles |
| **Ambiance** | Nuit : fond Nuit, texte Ivoire, accent Ambre, logo inversé |
| **Cible principale** | S2 amateurs de technologies (Sam, 27 ans) : ils attendent le Black Friday pour s'équiper |
| **Cibles secondaires** | S4 économies d'énergie (le lot de 3 ampoules), S3 rénovation (le Pack Départ) |
| **Objectif** | Faire acheter un premier produit : le Pack Départ en priorité |

## 2. L'offre

Réduction calculée sur le **prix le plus bas des 30 derniers jours** (directive Omnibus). Aucun produit n'a changé de prix pendant ces 30 jours : le prix de référence est donc le prix habituel de [produits.md](../brand/produits.md). Chaque réduction réelle est d'au moins 20 % (vérifié par script).

| Produit | Prix de référence (30 jours) | Prix Black Friday | Économie | Réduction réelle |
| --- | --- | --- | --- | --- |
| **Pack Départ** | 69,00 € | **54,90 €** | 14,10 € | 20,4 % |
| Lumex Bulb (lot de 3) | 44,90 € | **35,90 €** | 9,00 € | 20,0 % |
| Lumex Strip | 49,90 € | **39,90 €** | 10,00 € | 20,0 % |
| Lumex Halo | 99,00 € | **79,00 €** | 20,00 € | 20,2 % |
| Lumex Aube | 79,00 € | **62,90 €** | 16,10 € | 20,4 % |
| Lumex Orbe | 69,00 € | **54,90 €** | 14,10 € | 20,4 % |
| Lumex Switch | 29,90 € | **23,90 €** | 6,00 € | 20,1 % |

- Le prix barré du Pack Départ est **69,00 €** (son prix des 30 derniers jours), pas 83,60 € (le prix des produits achetés séparément). Les 83,60 € n'apparaissent qu'en information : « 28,70 € de moins que les 4 produits achetés séparément ».
- Livraison et retours inchangés : 4,90 €, offerte dès 49 € ; retour 30 jours ; garantie légale 2 ans.
- Pas de code promo : le prix est déjà réduit.

## 3. Ce qu'on s'interdit (et ce qu'on fait à la place)

| Pratique courante | Chez LumexIA |
| --- | --- |
| Faux compte à rebours qui recommence à chaque visite | Un compte à rebours qui suit les vraies dates. Avant le 27 : « commence dans… ». Après le 30 : « terminé » |
| Prix barré gonflé | Prix barré = prix le plus bas des 30 derniers jours, expliqué sur la page |
| « Stock limité », « dernières pièces » | Rien de tout ça : ce n'est pas vrai |
| « Achète tout, c'est le moment » | « Commence par une pièce » : un bloc aide à choisir **un** premier produit selon le besoin |
| Promesse d'économies en pourcentage | Renvoi vers le calculateur de l'accueil (estimation avec méthode) |

## 4. Structure de la page

1. **Hero Nuit** : accroche, offre, dates, compte à rebours réel, deux boutons (« Voir les offres », « Nos prix, expliqués »). Image : `hero-salon-soir.jpg`.
2. **Le Pack Départ en vedette** : prix Black Friday, prix de référence, économie par rapport à l'achat séparé. Image : `ambiance-pack-depart.jpg`.
3. **Toute la gamme à −20 %** : 6 cartes produits (prix barré en petit au-dessus du nouveau prix, badge −20 %, bouton Ajouter).
4. **Par quoi commencer ?** : 4 besoins → 4 produits (bosser, ambiance, réveil, factures).
5. **Un Black Friday sans entourloupe** : 3 engagements (prix de référence réel, vraie date de fin, 30 jours pour changer d'avis).
6. **Questions fréquentes** sur l'offre (5 questions).
7. **Bandeau final** : rappel de l'offre et de la date de fin.

Accès : bandeau en haut de l'accueil et lien « Black Friday » dans le pied de page de toutes les pages.

## 5. Textes clés

- **Hero :** « Le vendredi le plus noir de l'année. On rallume la lumière. » / « −20 % sur toute la gamme LumexIA, du vendredi 27 au lundi 30 novembre. Pas de faux compte à rebours, pas de prix gonflés. Juste une bonne raison de commencer. »
- **Pack :** « Le plus simple pour commencer coûte encore moins. »
- **Engagements :** « Nos prix barrés sont nos vrais prix. » / « Lundi 23 h 59, c'est fini. Vraiment. » / « 30 jours pour changer d'avis. »
- **Bandeau final :** « Ta lumière. Ton rythme. Et −20 % jusqu'à lundi soir. »

## 6. Déclinaisons (à produire)

| Canal | Contenu | Outil |
| --- | --- | --- |
| Instagram (post 4:5 + story 9:16) | « On rallume » : salon sombre qui s'allume, prix du Pack | Skill `lumexia-post-reseaux` + Gemini |
| E-mail (abonnés newsletter) | Jeudi 26/11 au soir : « Demain, on rallume » ; lundi 30/11 à 18 h : « Ce soir, on éteint l'offre » | Skill `lumexia-verif-marque` avant envoi |
| Bannière de l'accueil | Déjà sur le site | — |

## 7. Comment on mesurera (objectifs, pas des résultats)

Projet fictif : aucun chiffre réel. Les indicateurs à suivre seraient le taux de conversion de la landing, la part du Pack Départ dans les ventes, le panier moyen et le taux de retour à 30 jours (un Black Friday honnête ne doit pas faire grimper les retours).

## 8. Prompt utilisé (Claude Code)

> « Fais la landing page Black Friday maintenant »

Claude Code a relu les fichiers `brand/` (lignes rouges, segment S2, règle Omnibus, ambiance Nuit), vérifié les dates (vendredi 27 et lundi 30 novembre 2026) et calculé les réductions par script, puis écrit ce brief avant de générer la page. Le skill [lumexia-landing-campagne](../.claude/skills/lumexia-landing-campagne/SKILL.md) reprend cette méthode pour les prochaines campagnes (Saint-Valentin, printemps).
