# LumexIA : contexte du projet pour Claude Code

> **Lis d'abord [brand/projet.md](brand/projet.md)**, puis [brand/systeme-de-marque.md](brand/systeme-de-marque.md). En cas de conflit, `projet.md` l'emporte, puis `produits.md` pour les prix.

LumexIA est une marque fictive d'**éclairage connecté** (Belgique, projet d'examen du cours d'IA chez Technifutur, 2026-2027). Elle vend des ampoules, un ruban LED, une lampe de bureau, un réveil lumineux, une lampe sans fil et un interrupteur sans pile, tous pilotés par l'app gratuite **Lumex** et son mode **Lumex Sense** (la lumière suit la journée).

## Ordre de lecture avant une tâche

1. [brand/projet.md](brand/projet.md) : le projet, la cible, le positionnement, les lignes rouges.
2. [brand/value_proposition.md](brand/value_proposition.md) : choisis le segment (S1 à S4) avant d'écrire.
3. [brand/tone-of-voice.md](brand/tone-of-voice.md) : pour tout texte.
4. [brand/design.md](brand/design.md) : pour tout visuel, page ou composant.
5. [brand/produits.md](brand/produits.md) : pour tout prix ou caractéristique.

## Où trouver quoi

| Dossier ou fichier | Contenu |
| --- | --- |
| `brand/` | Le système de marque (5 fichiers + le résumé `systeme-de-marque.md`) |
| `.claude/skills/` | Skills LumexIA : fiche produit, prompt visuel, post réseaux, vérification de marque |
| `site/` | Le site web (à créer : accueil, menu, en-tête, pied de page, 5 fiches produits minimum) |
| `campagne/` | La landing page de campagne (à créer) |
| `social/` | Les publications pour les réseaux sociaux (à créer) |
| `video/` | Moodboard, storyboard et prompts vidéo (à créer) |
| `assets/` | Logo, photos (WebP < 150 Ko), icônes |
| `docs/` | Démarche, prompts utilisés et workflow IA pour le rapport d'examen |

## Règles de marque (résumé)

- **Nom :** toujours **LumexIA**. Produits : **Lumex + nom**.
- **Signature :** « Ta lumière. Ton rythme. »
- **Ton :** tutoiement, phrases courtes, lumineux, apaisant, malin. Le moment de vie avant le produit.
- **Couleurs :** Nuit `#10162B`, Ivoire `#FAF7F2`, Ambre `#FFB547` (bouton : texte Nuit, jamais blanc), Aube `#FFE2B8`, Bleu circadien `#3D5AFE`, Brume `#E7EAF3`, Ardoise `#5A6178`.
- **Typographies :** Sora (titres), Inter (textes), JetBrains Mono (données techniques).
- **Accessibilité :** contraste ≥ 4,5:1, focus visible, cibles ≥ 44 px, `prefers-reduced-motion`, aucun clignotement.

## Règles commerciales

- Prix TTC de [brand/produits.md](brand/produits.md) uniquement. Livraison 4,90 €, offerte dès 49 €. Retour 30 jours. Garantie légale 2 ans (la garantie de 3 ans n'est pas décidée : ne pas l'afficher).
- Toute réduction affiche le prix le plus bas des 30 derniers jours (directive Omnibus).
- Le site affiche partout « Projet d'examen : marque fictive, aucune commande réelle ».

## Ce que tu ne fais jamais

- Inventer un avis client, une note, un nombre de clients, un chiffre de vente, un partenariat ou un identifiant de société.
- Promettre un effet sur la santé ou un pourcentage d'économie sans méthode de calcul.
- Utiliser une marque, un logo ou un produit d'autrui.
- Publier, envoyer un e-mail, acheter un domaine ou créer un compte sans demander.

## Conventions de travail

- Écris en français, sans faute. Relis-toi.
- Compte les longueurs SEO avec un script : title < 60 caractères, meta description de 120 à 155.
- Vérifie les contrastes et les jours de la semaine des dates avec un script.
- Note les prompts importants dans `docs/` : ils servent au rapport d'examen.
- Commits signés avec l'adresse `265260255+Vald-01@users.noreply.github.com`.
