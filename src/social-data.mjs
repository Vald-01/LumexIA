// Publications réseaux sociaux LumexIA (semaine du Black Friday 2026).
// Source unique : src/social.mjs génère social/publications.md et les visuels PNG de social/visuels/.
// Règles : .claude/skills/lumexia-post-reseaux/SKILL.md et brand/tone-of-voice.md.
import { MOMENTS } from './data.mjs';

// Exemple du post économies : mêmes hypothèses que le calculateur du site (halogène 42 W, 4 h par jour, 0,30 € le kWh)
const kwhPrice = 0.3, hours = 4;
const yearKwh = (w) => (w * hours * 365) / 1000;
const fmt = (n, d = 1) => n.toLocaleString('fr-BE', { minimumFractionDigits: d, maximumFractionDigits: d });
export const CALC = {
  oldKwh: fmt(yearKwh(42)), newKwh: fmt(yearKwh(9)),
  oldCost: fmt(yearKwh(42) * kwhPrice, 2), newCost: fmt(yearKwh(9) * kwhPrice, 2),
  diff: fmt((yearKwh(42) - yearKwh(9)) * kwhPrice, 2),
};

const H = {
  base: ['#LumexIA', '#TaLumièreTonRythme'],
};

export const POSTS = [
  {
    id: 'p1-story-teaser',
    date: '2026-11-26', time: '19 h 00', channel: 'Instagram', format: 'Story 9:16', segment: 'S2 amateurs de technologies',
    goal: 'Prévenir du Black Friday', title: 'Demain, on rallume',
    visuals: [{ tpl: 'story', photo: 'hero-salon-soir.jpg', pos: '62% 50%', eyebrow: 'Black Friday · dès demain 0&nbsp;h', title: 'Demain, <em>on rallume.</em>', sub: '−20&nbsp;% sur toute la gamme, du vendredi 27 au lundi 30&nbsp;novembre.', sticker: 'Sticker compte à rebours' }],
    caption: null,
    extra: "Sticker « compte à rebours » d'Instagram, nommé « Black Friday LumexIA », qui se termine le vendredi 27 novembre à 0 h. Sticker lien vers la page Black Friday.",
    hashtags: [],
    alt: 'Salon plongé dans la pénombre, une lampe ronde allumée sur une table basse. Texte : « Demain, on rallume. »',
  },
  {
    id: 'p2-post-pack-bf',
    date: '2026-11-27', time: '7 h 30', channel: 'Instagram', format: 'Post 4:5', segment: 'S3 rénovation et S2',
    goal: 'Faire acheter le Pack Départ', title: 'Pack Départ à 54,90 €',
    visuals: [{ tpl: 'produit', photo: 'produit-pack-depart.jpg', tag: '−20 %', eyebrow: 'Black Friday', title: 'Pack Départ', sub: '3 Lumex Bulb + 1 Lumex Switch', price: '54,90 €', ref: '69,00 €', note: 'Prix le plus bas des 30 derniers jours : 69,00 €' }],
    caption: `Le plus simple pour commencer coûte encore moins. ✨

Trois ampoules pour le salon, la cuisine et la chambre, et un interrupteur sans pile pour tout commander depuis l'entrée. Vissé, allumé, réglé.

Black Friday : 54,90 € au lieu de 69,00 € (prix le plus bas des 30 derniers jours), jusqu'au lundi 30 novembre à 23 h 59. Lien en bio.`,
    hashtags: [...H.base, '#BlackFriday', '#MaisonConnectée', '#Éclairage'],
    alt: 'Coffret ivoire et bleu nuit ouvert, trois ampoules et un interrupteur carré posés devant, sur fond gris-bleu. Texte : Pack Départ, 54,90 €, au lieu de 69,00 €.',
  },
  {
    id: 'p3-carrousel-arc',
    date: '2026-11-28', time: '18 h 30', channel: 'Instagram', format: 'Carrousel 4:5, 5 vignettes', segment: 'S1 jeunes actifs',
    goal: 'Faire découvrir Lumex Sense', title: 'Le même salon, quatre lumières',
    visuals: [
      { tpl: 'texte', eyebrow: 'Lumex Sense', title: 'Le même salon. <em>Quatre lumières.</em>', sub: 'Glisse pour suivre la journée →', page: '1/5' },
      ...MOMENTS.map((m, i) => ({ tpl: 'moment', photo: `arc-${m.id}.jpg`, time: m.time, k: m.k, label: m.label, title: m.title, color: m.color, page: `${i + 2}/5` })),
    ],
    caption: `Ta journée ne ressemble pas à un plafonnier. ☀️🌙

À 7 h, une lumière orangée pour te réveiller en douceur. À 11 h, un blanc net pour avancer. À 19 h, elle se réchauffe : la journée de travail est finie. À 23 h, juste une lueur pour aller te coucher.

C'est Lumex Sense, le mode gratuit de l'app Lumex. Ta lumière suit ta journée. Toute seule.

Et toi, ta lumière préférée, c'est à quelle heure ?`,
    hashtags: [...H.base, '#LumexSense', '#DécoIntérieur', '#Télétravail'],
    alt: "Le même salon photographié à quatre moments : à l'aube en lumière orangée, en journée en lumière blanche, le soir en lumière chaude, la nuit avec une seule lampe.",
  },
  {
    id: 'p4-post-strip',
    date: '2026-11-29', time: '11 h 00', channel: 'Instagram', format: 'Post 4:5', segment: 'S2 amateurs de technologies',
    goal: 'Faire acheter Lumex Strip', title: 'Compatible avec ta maison',
    visuals: [{ tpl: 'photo', photo: 'ambiance-lumex-strip.jpg', pos: '50% 60%', tag: '−20 %', eyebrow: 'Lumex Strip · compatible Matter', title: 'Compatible avec ta maison. <em>Pas l\'inverse.</em>' }],
    caption: `Ton salon a déjà ses habitudes. Lumex Strip s'y fait. 💡

Un ruban LED de 2 mètres à coller derrière la télé ou sous une étagère. Compatible Matter : il fonctionne avec l'app Lumex et avec les assistants vocaux que tu utilises déjà.

Black Friday : 39,90 € au lieu de 49,90 € (prix le plus bas des 30 derniers jours), jusqu'à lundi 23 h 59.`,
    hashtags: [...H.base, '#MaisonConnectée', '#Matter', '#BlackFriday'],
    alt: 'Meuble télé bas dans un salon le soir, souligné par un ruban de lumière ambrée. Texte : « Compatible avec ta maison. Pas l\'inverse. »',
  },
  {
    id: 'p5-story-dernier-jour',
    date: '2026-11-30', time: '18 h 00', channel: 'Instagram', format: 'Story 9:16', segment: 'Tous',
    goal: 'Rappeler la fin réelle de l\'offre', title: 'Ce soir, on éteint l\'offre',
    visuals: [{ tpl: 'story', photo: 'arc-nuit.jpg', pos: '50% 50%', eyebrow: 'Black Friday · dernier jour', title: 'Ce soir, <em>on éteint l\'offre.</em>', sub: '−20&nbsp;% sur toute la gamme jusqu\'à 23&nbsp;h&nbsp;59.', sticker: 'Sticker lien' }],
    caption: null,
    extra: "Sticker lien « Voir les offres » vers la page Black Friday. Pas de compte à rebours qui recommence : l'offre se termine vraiment à 23 h 59.",
    hashtags: [],
    alt: 'Salon la nuit, éclairé par une seule lampe à la lumière ambrée. Texte : « Ce soir, on éteint l\'offre. »',
  },
  {
    id: 'p6-linkedin-prix',
    date: '2026-12-01', time: '8 h 30', channel: 'LinkedIn', format: 'Post image 4:5', segment: 'Réseau professionnel, presse, partenaires',
    goal: 'Montrer les valeurs de la marque', title: 'Nos prix barrés sont nos vrais prix',
    visuals: [{ tpl: 'texte', eyebrow: 'Black Friday LumexIA', title: 'Nos prix barrés sont <em class="i">nos vrais prix.</em>', sub: 'Pas de faux compte à rebours. Pas de prix gonflés. Pas de stock limité inventé.' }],
    caption: `Pour notre premier Black Friday, nous avons pris trois décisions simples.

1. Le prix barré est le prix le plus bas des 30 derniers jours, comme le demande la directive européenne Omnibus. Nous ne l'avons pas gonflé la semaine d'avant.
2. Notre compte à rebours suit la vraie date de fin. Il ne recommence pas quand on revient sur la page.
3. Nous n'avons écrit nulle part « stock limité » ou « dernières pièces », parce que ce n'était pas vrai.

Pourquoi ? LumexIA vend une lumière qui s'adapte à la journée de chacun et chacune. Une marque qui parle de confort et de sobriété énergétique ne peut pas pousser à acheter dans la précipitation.

L'offre s'est terminée hier soir. Les prix sont revenus à la normale.

LumexIA, éclairage connecté conçu en Belgique.`,
    hashtags: ['#Marketing', '#Omnibus', '#ÉclairageConnecté', '#LumexIA'],
    alt: 'Fond bleu nuit avec un arc de lumière ambrée. Texte : « Nos prix barrés sont nos vrais prix. »',
  },
  {
    id: 'p7-post-halo',
    date: '2026-12-02', time: '18 h 00', channel: 'Instagram', format: 'Post 4:5', segment: 'S1 jeunes actifs',
    goal: 'Faire acheter Lumex Halo', title: '18 h, ta lampe a compris',
    visuals: [{ tpl: 'photo', photo: 'ambiance-lumex-halo.jpg', pos: '50% 50%', eyebrow: 'Lumex Halo · 99 €', title: '18&nbsp;h. <em>Ta lampe a compris avant toi.</em>' }],
    caption: `POV : il est 18 h et ta lampe a compris avant toi qu'il était temps de lever le pied. 🌙

Lumex Halo éclaire ton bureau d'un blanc net pendant la journée, puis passe à une lumière plus chaude et plus douce en fin d'après-midi. Le signal que tu peux fermer l'ordi.

99 €, sans abonnement. Lien en bio.`,
    hashtags: [...H.base, '#Télétravail', '#BureauÀLaMaison', '#LumexHalo'],
    alt: 'Bureau à domicile en fin de journée, éclairé par une lampe articulée ivoire à tête ronde. Texte : « 18 h. Ta lampe a compris avant toi. »',
  },
  {
    id: 'p8-carrousel-economies',
    date: '2026-12-03', time: '12 h 30', channel: 'Instagram', format: 'Carrousel 4:5, 2 vignettes', segment: 'S4 économies d\'énergie',
    goal: 'Faire acheter le lot de 3 Lumex Bulb', title: 'Tu vois ce que tu consommes',
    visuals: [
      { tpl: 'photo', photo: 'cible-economies.jpg', pos: '50% 35%', eyebrow: 'Économies d\'énergie', title: 'Tu vois ce que tu consommes. <em>Tu décides ce que tu éteins.</em>', page: '1/2' },
      { tpl: 'calc', page: '2/2' },
    ],
    caption: `L'hiver, la lumière reste allumée plus longtemps. Autant savoir ce qu'elle coûte. 💡

Une halogène de 42 W allumée 4 h par jour consomme environ ${CALC.oldKwh} kWh par an. Une Lumex Bulb de 9 W, environ ${CALC.newKwh} kWh. Avec un kWh à 0,30 €, ça fait environ ${CALC.diff} € de différence par an et par ampoule.

C'est une estimation, pas une promesse : fais ton propre calcul sur notre site, la méthode est affichée. Et dans l'app Lumex, tu vois ta consommation pièce par pièce.

Lumex Bulb : 17,90 € l'ampoule, 44,90 € le lot de 3.`,
    hashtags: [...H.base, '#ÉconomiesDÉnergie', '#Hiver', '#LED'],
    alt: `Une personne appuie sur un interrupteur dans un salon éclairé le soir. Deuxième vignette : le calcul, ${CALC.oldCost} € par an pour une halogène de 42 W contre ${CALC.newCost} € pour une Lumex Bulb de 9 W.`,
  },
  {
    id: 'p9-reel-bulb',
    date: '2026-12-04', time: '19 h 00', channel: 'Instagram Reels et TikTok', format: 'Vidéo 9:16, 15 s', segment: 'S2 et S3',
    goal: 'Faire découvrir Lumex Bulb', title: 'Vissé, allumé, réglé',
    visuals: [{ tpl: 'story', photo: 'ambiance-lumex-bulb.jpg', pos: '45% 50%', eyebrow: 'Lumex Bulb · 17,90 €', title: 'Vissé. Allumé. <em>Réglé.</em>', sub: 'Ta lumière fait ça, toi ?', sticker: null }],
    caption: `Ta lumière fait ça, toi ? ✨

Tu visses Lumex Bulb, tu ouvres l'app, et Lumex Sense s'occupe du reste : blanche le jour, ambrée le soir, presque rien la nuit.

17,90 € l'ampoule, 44,90 € le lot de 3. Sans abonnement.`,
    hashtags: [...H.base, '#MaisonConnectée', '#DécoIntérieur', '#Astuce'],
    alt: 'Couverture de la vidéo : salon le soir éclairé par une suspension ambrée. Texte : « Vissé. Allumé. Réglé. »',
    storyboard: [
      ['0–3 s', 'Plan serré : une main visse une ampoule dans une suspension, pièce dans la pénombre.', '« Ta lumière fait ça, toi ? »', 'Petit clic'],
      ['3–6 s', "L'ampoule s'allume, la pièce se remplit d'une lumière ambrée.", '« Vissé. »', 'Début de la musique'],
      ['6–9 s', "Le téléphone : on active Lumex Sense dans l'app Lumex (écran générique, sans marque d'autrui).", '« Allumé. »', '—'],
      ['9–13 s', 'Accéléré : la même pièce passe de la lumière du jour à la lumière du soir, puis à la veilleuse de nuit.', '« Réglé. Toute seule. »', 'Montée de la musique'],
      ['13–15 s', 'Plan final : Lumex Bulb allumée sur fond Nuit, logo LumexIA.', '« Lumex Bulb · 17,90 € · Lien en bio »', 'Fin'],
    ],
    extra: "Musique : piste calme libre de droits de la bibliothèque audio de la plateforme (aucun titre sous droits). Sous-titres incrustés pour un visionnage sans le son.",
  },
];
