# LumexIA : résumé du système de marque

> La marque en une page. Pour le détail, suivre les liens.
> Version du 25 novembre 2026.

## Les fichiers et leur rôle

| Fichier | Il répond à | Priorité en cas de conflit |
| --- | --- | --- |
| [projet.md](projet.md) | Quoi, pour qui, pourquoi, positionnement, valeurs, lignes rouges | **1** |
| [produits.md](produits.md) | Gamme, prix, caractéristiques, 7 fiches produits, règles commerciales | **2** (prix et caractéristiques) |
| [value_proposition.md](value_proposition.md) | 4 segments : jobs, pains, gains et messages | 3 |
| [design.md](design.md) | Logo, couleurs, typographies, composants, photos | 3 |
| [tone-of-voice.md](tone-of-voice.md) | Personnalité, règles d'écriture, vocabulaire, ton par canal | 3 |
| [../CLAUDE.md](../CLAUDE.md) | Mode d'emploi pour l'IA : ordre de lecture, règles, skills | — |
| [../.claude/skills/](../.claude/skills/) | Instructions réutilisables pour produire les contenus | — |

## La marque en 10 lignes

| | |
| --- | --- |
| **Nom** | LumexIA (Lumex = lumière + expérience ; IA = lumière intelligente) |
| **Signature** | Ta lumière. Ton rythme. |
| **Activité** | Éclairage connecté qui suit le rythme de la journée |
| **Cible** | S1 jeunes actifs · S2 amateurs de technologie · S3 rénovation · S4 économies d'énergie |
| **Positionnement** | Premium accessible et bien-être, sans abonnement, compatible Matter |
| **Différenciation** | Lumex Sense (lumière automatique selon l'heure), consommation estimée visible, fonctionnement local |
| **Personnalité** | Lumineux, apaisant, malin |
| **Couleurs** | Nuit `#10162B` · Ivoire `#FAF7F2` · Ambre `#FFB547` · Aube `#FFE2B8` · Bleu circadien `#3D5AFE` |
| **Typographies** | Sora (titres) · Inter (textes) · JetBrains Mono (données) |
| **Motif** | L'arc de lumière : Aube → Jour → Soir → Nuit |

## La gamme

Lumex Bulb 17,90 € (lot de 3 : 44,90 €) · Lumex Strip 49,90 € · Lumex Halo 99 € · Lumex Aube 79 € · Lumex Orbe 69 € · Lumex Switch 29,90 € · Pack Départ 69 €. Livraison 4,90 €, offerte dès 49 €.

## Comment le système produit les contenus

```
projet.md ─┬─> value_proposition.md ──> choisir le segment (S1 à S4)
           ├─> tone-of-voice.md ──────> écrire
           ├─> design.md ─────────────> mettre en forme, générer les images
           └─> produits.md ───────────> vérifier prix et caractéristiques
                                │
                                ▼
       skills : fiche produit · prompt visuel · post réseaux · vérification
                                │
                                ▼
       site · fiches produits · réseaux sociaux · photos · vidéo · landing page
```

## La règle de toute production

1. **Un segment** choisi (S1 à S4).
2. **Le moment de vie** d'abord, puis la preuve (Lumex Sense, Matter, consommation), puis le produit et le prix.
3. **Une action** claire : acheter ou s'inscrire.
4. **Rien d'inventé** : ni avis, ni chiffre, ni promesse de santé ou d'économie sans méthode.
5. **Une vérification** avec le skill `lumexia-verif-marque` avant publication.
