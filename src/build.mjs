// Génère le site statique LumexIA dans site/ :  node src/build.mjs
import { mkdirSync, writeFileSync, copyFileSync, rmSync, existsSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SITE, NAV, PRODUCTS, MOMENTS, FAQ, CAMPAIGN } from './data.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'site');
const IMG = 'assets/img/';

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const euro = (n) => n.toLocaleString('fr-BE', { style: 'currency', currency: 'EUR' });
const pages = [];

// ---------- Éléments communs ----------

// Logos générés avec Gemini puis détourés (scripts/detourer-logo.py). Version Jour ou Nuit selon l'ambiance.
const logo = (b, label = 'LumexIA, accueil') => `<img class="logo-img logo-jour" src="${b}assets/logo.png" alt="${label}" width="720" height="201"><img class="logo-img logo-nuit" src="${b}assets/logo-inverse.png" alt="${label}" width="720" height="201">`;

const icon = {
  cart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.5L21 8H6"/><circle cx="10" cy="20" r="1.2"/><circle cx="17" cy="20" r="1.2"/></svg>',
  menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
  close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" aria-hidden="true"><path d="M3 17h18"/><path d="M7 17a5 5 0 0 1 10 0"/><path d="M12 6v2M5.6 9.6l1.4 1.4M18.4 9.6 17 11"/></svg>',
  link: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" aria-hidden="true"><rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><path d="M14 17.5h7M17.5 14v7"/></svg>',
  chart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" aria-hidden="true"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></svg>',
  truck: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 6h11v10H3zM14 10h4l3 3v3h-7"/><circle cx="7" cy="18" r="1.6"/><circle cx="17" cy="18" r="1.6"/></svg>',
  back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 14 4 9l5-5"/><path d="M4 9h10a6 6 0 0 1 0 12h-3"/></svg>',
  shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3 4 6v6c0 4.5 3.4 8 8 9 4.6-1 8-4.5 8-9V6z"/><path d="m9 12 2 2 4-4"/></svg>',
};

// Emplacement d'image : affiche un halo et le nom du fichier tant que la photo n'est pas déposée dans site/assets/img/.
const img = (b, file, alt, { ratio = '1', glow = '#FFB547', cls = '', eager = false } = {}) => `
<figure class="ph ${cls}" style="--ratio:${ratio};--glow:${glow}">
  <img src="${b}${IMG}${file}" alt="${esc(alt)}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async" onerror="this.remove()">
  <span class="ph-label" aria-hidden="true">${file}</span>
</figure>`;

const header = (b, current) => `
<a class="skip" href="#contenu">Aller au contenu</a>
<div class="demo-bar">${SITE.disclaimer}</div>
<header class="site-header">
  <div class="wrap header-in">
    <a class="logo" href="${b}index.html">${logo(b)}</a>
    <nav class="main-nav" id="menu" aria-label="Menu principal">
      <ul>${NAV.map((n) => `<li><a href="${b}${n.href}index.html"${current === n.href ? ' aria-current="page"' : ''}>${n.label}</a></li>`).join('')}</ul>
    </nav>
    <div class="header-actions">
      <button class="theme-switch" type="button" aria-pressed="false" aria-label="Passer en ambiance Nuit" title="Jour / Nuit"><span class="knob"></span></button>
      <button class="icon-btn cart-open" type="button" aria-label="Ouvrir le panier">${icon.cart}<span class="cart-count">0</span></button>
      <button class="icon-btn menu-btn" type="button" aria-expanded="false" aria-controls="menu" aria-label="Menu">${icon.menu}</button>
    </div>
  </div>
</header>`;

const footer = (b) => `
<footer class="site-footer">
  <div class="wrap">
    <div class="footer-grid">
      <div class="footer-brand">
        <a class="logo" href="${b}index.html">${logo(b, 'LumexIA')}</a>
        <div class="footer-arc" aria-hidden="true"></div>
        <p>${SITE.tagline}<br>Éclairage connecté qui suit ta journée. Conçu en Belgique.</p>
      </div>
      <div>
        <h4>Produits</h4>
        <ul>${PRODUCTS.map((p) => `<li><a href="${b}produits/${p.slug}/index.html">${p.name}</a></li>`).join('')}</ul>
      </div>
      <div>
        <h4>Découvrir</h4>
        <ul>
          <li><a href="${b}lumex-sense/index.html">Lumex Sense</a></li>
          <li><a href="${b}la-marque/index.html">La marque</a></li>
          <li><a href="${b}produits/index.html">Tous les produits</a></li>
          <li><a href="${b}black-friday/index.html">Black Friday</a></li>
        </ul>
      </div>
      <div>
        <h4>Aide</h4>
        <ul>
          <li><a href="${b}aide/index.html#faq">Questions fréquentes</a></li>
          <li><a href="${b}aide/index.html#livraison">Livraison et retours</a></li>
          <li><a href="${b}aide/index.html#contact">Contact</a></li>
          <li><a href="${b}mentions-legales/index.html">Mentions légales</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© 2026 LumexIA · Projet du séminaire IA (HEPL, BAC3 e-Business 2026) · Marque fictive</span>
      <span>Livraison ${euro(SITE.shipping)}, offerte dès ${SITE.freeShippingFrom} € · Retour ${SITE.returnDays} jours · Garantie légale 2 ans</span>
    </div>
  </div>
</footer>
<div class="cart-backdrop"></div>
<aside class="cart-drawer" aria-label="Panier" aria-hidden="true">
  <div class="cart-head"><h2>Ton panier</h2><button class="icon-btn cart-close" type="button" aria-label="Fermer le panier">${icon.close}</button></div>
  <ul class="cart-items"></ul>
  <div class="cart-foot">
    <div class="cart-row"><span>Sous-total</span><span data-sub>0,00 €</span></div>
    <div class="cart-row"><span>Livraison</span><span data-ship>—</span></div>
    <div class="cart-row cart-total"><span>Total TTC</span><span data-total>0,00 €</span></div>
    <p class="muted" data-free style="margin:0;font-size:.9rem"></p>
    <button class="btn btn-primary checkout" type="button">Commander</button>
    <p class="muted" style="margin:0;font-size:.8rem">Démo : aucune commande ni paiement n'est possible.</p>
  </div>
</aside>`;

const page = ({ path, title, meta, body, current = '', jsonld = null, ogImage = 'og-lumexia.jpg' }) => {
  const depth = path.split('/').length - 1;
  const b = '../'.repeat(depth);
  const html = `<!doctype html>
<html lang="fr-BE">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(meta)}">
<meta name="robots" content="noindex">
<meta name="theme-color" content="#10162B">
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(meta)}">
<meta property="og:image" content="${b}${IMG}${ogImage}">
<link rel="icon" href="${b}assets/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="${b}assets/style.css">
<script>try{var t=JSON.parse(localStorage.getItem('lumexia-theme'));if(t)document.documentElement.dataset.theme=t}catch(e){}</script>
${jsonld ? `<script type="application/ld+json">${JSON.stringify(jsonld)}</script>` : ''}
</head>
<body>
${header(b, current)}
<main id="contenu">
${body(b)}
</main>
${footer(b)}
<script src="${b}assets/app.js" defer></script>
</body>
</html>
`;
  pages.push({ path, title, meta });
  const file = join(OUT, path);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
};

// ---------- Blocs réutilisables ----------

const productCard = (b, p) => `
<article class="card reveal" style="--glow:${p.glow}">
  ${img(b, `produit-${p.slug}.jpg`, p.altProduct, { glow: p.glow })}
  <div class="card-body">
    ${p.compareAt ? '<span class="badge">Idéal pour débuter</span>' : ''}
    <h3><a href="${b}produits/${p.slug}/index.html">${p.name}</a></h3>
    <p class="type">${p.type}</p>
    <div class="card-foot">
      <span class="price">${p.compareAt ? `<s><span class="sr-only">Au lieu de </span>${euro(p.compareAt)}</s>` : ''}${euro(p.price)}</span>
      <button class="btn btn-primary btn-small add" type="button" data-add data-id="${p.sku}" data-name="${esc(p.name)}" data-price="${p.price}" aria-label="Ajouter ${esc(p.name)} au panier">Ajouter</button>
    </div>
  </div>
</article>`;

const arcSection = (b, { heading = 'Une lumière pour chaque moment.', intro = "Ta journée ne ressemble pas à un plafonnier. Lumex Sense fait varier la couleur et l'intensité de ta lumière, du réveil au coucher. Toute seule." } = {}) => `
<section class="arc" data-arc aria-labelledby="arc-title">
  <div class="wrap arc-grid">
    <div class="arc-stage">
      ${MOMENTS.map((m, i) => img(b, `arc-${m.id}.jpg`, `Le même salon à l'heure « ${m.label} », éclairé par des lampes Lumex`, { ratio: '4 / 5', glow: m.color, cls: i === 0 ? 'on' : '' })).join('')}
      <div class="arc-glow" aria-hidden="true"></div>
    </div>
    <div>
      <span class="eyebrow">L'arc de la journée</span>
      <h2 id="arc-title">${heading}</h2>
      <p class="muted">${intro}</p>
      <div class="arc-tabs" role="tablist" aria-label="Moments de la journée">
        ${MOMENTS.map((m, i) => `<button type="button" role="tab" id="tab-${m.id}" aria-controls="panel-${m.id}" aria-selected="${i === 0}" data-color="${m.color}">${m.label}</button>`).join('')}
      </div>
      <label class="eyebrow" for="arc-range" style="margin:0">Fais glisser le temps</label>
      <div class="arc-line" aria-hidden="true"></div>
      <input class="arc-range" id="arc-range" type="range" min="0" max="3" step="1" value="0" aria-valuetext="Moment de la journée">
      ${MOMENTS.map((m, i) => `
      <div class="arc-panel" role="tabpanel" id="panel-${m.id}" aria-labelledby="tab-${m.id}"${i ? ' hidden' : ''}>
        <div class="arc-meta"><span>${m.time}</span><span>${m.k}</span></div>
        <h3>${m.title}</h3>
        <p>${m.text}</p>
      </div>`).join('')}
    </div>
  </div>
</section>`;

const calcSection = () => `
<section id="calculateur" aria-labelledby="calc-title">
  <div class="wrap">
    <div class="calc" data-calc>
      <div>
        <span class="eyebrow" style="color:var(--aube)">Économies d'énergie</span>
        <h2 id="calc-title">Tu vois ce que tu consommes. Tu décides ce que tu éteins.</h2>
        <p>Indique tes propres chiffres : on calcule une estimation sur un an, en remplaçant tes ampoules par des Lumex Bulb de 9 W.</p>
        <label for="c-lamps">Nombre d'ampoules</label>
        <input id="c-lamps" name="lamps" type="number" min="1" max="50" value="6" inputmode="numeric">
        <label for="c-oldw">Puissance de tes ampoules actuelles (W)</label>
        <input id="c-oldw" name="oldw" type="number" min="1" max="150" value="42" inputmode="numeric">
        <label for="c-hours">Heures d'allumage par jour</label>
        <input id="c-hours" name="hours" type="number" min="0" max="24" step="0.5" value="4" inputmode="decimal">
        <label for="c-auto">Temps d'allumage évité par les minuteries et l'absence (%)</label>
        <input id="c-auto" name="auto" type="number" min="0" max="50" value="10" inputmode="numeric">
        <label for="c-price">Prix de ton kWh (€)</label>
        <input id="c-price" name="price" type="number" min="0.05" max="1" step="0.01" value="0.30" inputmode="decimal">
      </div>
      <div class="calc-result" aria-live="polite">
        <p style="margin:0">Économie estimée par an</p>
        <output for="c-lamps c-oldw c-hours c-auto c-price">—</output>
        <div class="calc-bars">
          <div class="calc-bar">Tes ampoules actuelles : <b data-old>—</b><span data-old-bar style="width:100%"></span></div>
          <div class="calc-bar lumex">Avec Lumex Bulb : <b data-new>—</b><span data-new-bar style="width:20%"></span></div>
        </div>
        <p class="note">Méthode : nombre d'ampoules × puissance × heures par jour × 365 jours ÷ 1000 × prix du kWh. Exemple de départ : une halogène de 42 W. C'est une estimation, pas une promesse : ta consommation réelle dépend de tes usages. Le prix des ampoules n'est pas déduit.</p>
      </div>
    </div>
  </div>
</section>`;

const newsletter = () => `
<section class="newsletter" aria-labelledby="nl-title">
  <div class="wrap">
    <span class="eyebrow">La lettre LumexIA</span>
    <h2 id="nl-title">Une idée lumineuse par mois.</h2>
    <p class="muted">Des conseils pour mieux éclairer ta maison et consommer moins. Pas plus d'un e-mail par mois, désinscription en un clic.</p>
    <form data-demo="Démo : rien n'a été enregistré. Merci quand même ✨">
      <label class="sr-only" for="nl-email" style="position:absolute;left:-999px">Ton adresse e-mail</label>
      <input id="nl-email" type="email" required placeholder="ton@adresse.be" autocomplete="email">
      <button class="btn btn-primary" type="submit">Je m'inscris</button>
    </form>
    <p class="form-msg" role="status"></p>
  </div>
</section>`;

// ---------- Accueil ----------

const ORG = { '@context': 'https://schema.org', '@type': 'Organization', name: 'LumexIA', slogan: SITE.tagline, description: "Marque fictive d'éclairage connecté (projet d'examen)." };

page({
  path: 'index.html',
  title: 'Éclairage connecté qui suit ta journée | LumexIA',
  meta: "Ampoules, lampes et réveil connectés qui adaptent leur lumière à ta journée : plus de confort, moins de consommation. Sans abonnement, compatible Matter.",
  jsonld: ORG,
  body: (b) => `
<a class="bf-strip" href="${b}black-friday/index.html"><span>Black Friday</span> −20 % sur toute la gamme, du 27 au 30 novembre <b aria-hidden="true">→</b></a>
<section class="hero" aria-labelledby="hero-title">
  ${img(b, 'hero-salon-soir.jpg', 'Salon chaleureux le soir, éclairé par des lampes connectées à la lumière ambrée', { ratio: 'auto', cls: 'night', eager: true })}
  <div class="wrap hero-in">
    <span class="eyebrow">Éclairage connecté · ${SITE.tagline}</span>
    <h1 id="hero-title">7 h, une lumière d'aube. 22 h, une lumière de bougie. <em>Entre les deux, ta journée.</em></h1>
    <p>Les lampes LumexIA adaptent leur lumière au moment de la journée. Pour mieux te réveiller, mieux travailler, mieux décrocher. Et consommer moins.</p>
    <div class="btn-row">
      <a class="btn btn-primary" href="${b}produits/index.html">Voir les produits</a>
      <a class="btn btn-secondary" href="${b}lumex-sense/index.html">Voir comment ça marche</a>
    </div>
    <ul class="hero-facts">
      <li>Sans abonnement</li><li>Compatible Matter</li><li>Consommation visible</li><li>Livraison offerte dès ${SITE.freeShippingFrom} €</li>
    </ul>
  </div>
</section>

${arcSection(b)}

<section class="film" aria-labelledby="film-title">
  <div class="wrap">
    <div class="section-head">
      <div><span class="eyebrow">Le film</span><h2 id="film-title">Une journée de lumière. En 10 secondes.</h2></div>
      <p class="muted">Le même salon, de l'aube à la nuit. Seule la lumière change.</p>
    </div>
    <figure class="film-frame">
      <video controls preload="metadata" playsinline poster="${b}assets/video/poster.jpg" aria-describedby="film-desc">
        <source src="${b}assets/video/lumexia-video.mp4" type="video/mp4">
      </video>
      <figcaption id="film-desc">Voix off : « Ta lumière suit ta journée. Toute seule. » Vidéo générée avec Veo 3.</figcaption>
    </figure>
  </div>
</section>

<section aria-labelledby="prod-title" style="padding-top:0">
  <div class="wrap">
    <div class="section-head">
      <div><span class="eyebrow">La gamme</span><h2 id="prod-title" style="margin:0">Vissé, allumé, réglé.</h2></div>
      <p class="muted">Sept produits, une seule app, zéro abonnement.</p>
    </div>
    <div class="products">${PRODUCTS.map((p) => productCard(b, p)).join('')}</div>
  </div>
</section>

<section aria-labelledby="why-title" style="padding-top:0">
  <div class="wrap">
    <span class="eyebrow">Pourquoi LumexIA</span>
    <h2 id="why-title">Malin, mais pas compliqué.</h2>
    <div class="promises">
      <div class="promise reveal">${icon.sun}<h3>Ta lumière suit ta journée</h3><p>Lumex Sense passe d'une lumière d'aube à un blanc de travail, puis à une lueur de bougie. Sans que tu y penses.</p></div>
      <div class="promise reveal">${icon.link}<h3>Compatible avec ta maison</h3><p>Standard Matter : tes lampes Lumex fonctionnent avec les assistants et les maisons connectées que tu as déjà. Pas de pont à acheter.</p></div>
      <div class="promise reveal">${icon.chart}<h3>Ta consommation, enfin visible</h3><p>L'app estime ce que consomme chaque lampe et t'aide à éteindre ce qui ne sert à rien. Sans abonnement, sans compte obligatoire.</p></div>
    </div>
  </div>
</section>

<section aria-labelledby="who-title" style="padding-top:0">
  <div class="wrap">
    <div class="section-head">
      <div><span class="eyebrow">Pour qui</span><h2 id="who-title" style="margin:0">Une lumière pour chaque façon de vivre.</h2></div>
    </div>
    <div class="moments">
      <article class="moment reveal">${img(b, 'cible-jeunes-actifs.jpg', 'Jeune adulte en télétravail à son bureau, éclairé par une lampe de bureau ivoire', { ratio: '4 / 5', glow: '#F4F1FF' })}<h3>Tu télétravailles</h3><p>Une lumière pour bosser, une autre pour souffler. Sans changer d'appart.</p><a href="${b}produits/lumex-halo/index.html">Découvrir Lumex Halo</a></article>
      <article class="moment reveal">${img(b, 'cible-tech.jpg', 'Salon moderne avec un ruban lumineux sous le meuble TV et un téléphone posé sur la table', { ratio: '4 / 5', glow: '#3D5AFE' })}<h3>Tu aimes la tech</h3><p>Compatible avec ta maison. Pas l'inverse. Scènes, automatisations, couleurs fidèles.</p><a href="${b}produits/lumex-strip/index.html">Découvrir Lumex Strip</a></article>
      <article class="moment reveal">${img(b, 'cible-renovation.jpg', 'Couple qui installe une ampoule dans une suspension de cuisine en rénovation', { ratio: '4 / 5', glow: '#FFC46B' })}<h3>Tu rénoves</h3><p>Une maison plus moderne. Sans tirer un seul câble.</p><a href="${b}produits/pack-depart/index.html">Découvrir le Pack Départ</a></article>
      <article class="moment reveal">${img(b, 'cible-economies.jpg', "Personne qui appuie sur un interrupteur sans fil en quittant son salon le soir", { ratio: '4 / 5', glow: '#FFB547' })}<h3>Tu surveilles ta facture</h3><p>Tu vois ce que tu consommes. Tu décides ce que tu éteins.</p><a href="${b}produits/lumex-switch/index.html">Découvrir Lumex Switch</a></article>
    </div>
  </div>
</section>

${calcSection()}

<section aria-labelledby="pack-title" style="padding-top:0">
  <div class="wrap">
    <div class="pack-band">
      ${img(b, 'ambiance-pack-depart.jpg', PRODUCTS[6].altAmbiance, { ratio: 'auto', glow: '#FFC46B' })}
      <div class="pack-band-text">
        <span class="eyebrow">Pack Départ</span>
        <h2 id="pack-title">Tout ce qu'il faut pour commencer. Rien de plus.</h2>
        <p>3 Lumex Bulb et 1 Lumex Switch : le salon, la cuisine et la chambre, commandés depuis l'entrée. Sans outil ni travaux.</p>
        <p class="price price-stack"><s><span class="sr-only">Au lieu de </span>${euro(83.6)}</s>${euro(69)}</p>
        <div class="btn-row" style="margin-top:12px">
          <button class="btn btn-primary" type="button" data-add data-id="LMX-PACK" data-name="Pack Départ" data-price="69">Ajouter au panier</button>
          <a class="btn btn-secondary" href="${b}produits/pack-depart/index.html">Voir le détail</a>
        </div>
      </div>
    </div>
  </div>
</section>

${newsletter()}`,
});

// ---------- Catalogue ----------

page({
  path: 'produits/index.html',
  current: 'produits/',
  title: 'Ampoules, lampes et réveil connectés | LumexIA',
  meta: "Toute la gamme LumexIA : ampoule E27, ruban LED, lampe de bureau, réveil lumineux, lampe sans fil et interrupteur sans pile. Dès 17,90 €.",
  body: (b) => `
<div class="wrap crumbs"><nav aria-label="Fil d'Ariane"><ol><li><a href="${b}index.html">Accueil</a></li><li aria-current="page">Produits</li></ol></nav></div>
<section class="page-hero">
  <div class="wrap">
    <span class="eyebrow">La gamme</span>
    <h1>Sept produits. Une seule lumière qui te suit.</h1>
    <p>Tous fonctionnent avec l'app Lumex, gratuite et sans abonnement, et avec les maisons connectées compatibles Matter.</p>
  </div>
</section>
<section style="padding-top:0">
  <div class="wrap">
    <div class="products">${PRODUCTS.map((p) => productCard(b, p)).join('')}</div>
  </div>
</section>
<section style="padding-top:0" aria-labelledby="choose-title">
  <div class="wrap">
    <h2 id="choose-title">Par où commencer ?</h2>
    <div class="values">
      <div class="value"><h3>Ton salon <span>· ambiance</span></h3><p>Lumex Bulb dans tes lampes, Lumex Strip sous le meuble TV. Le soir, tout passe en lumière ambrée.</p></div>
      <div class="value"><h3>Ton bureau <span>· concentration</span></h3><p>Lumex Halo : une lumière nette pour travailler, plus chaude quand la journée se termine.</p></div>
      <div class="value"><h3>Ta chambre <span>· réveil et coucher</span></h3><p>Lumex Aube : une aube progressive le matin, un coucher de soleil le soir.</p></div>
      <div class="value"><h3>Toute la maison <span>· sans travaux</span></h3><p>Le Pack Départ : trois ampoules et un interrupteur sans fil pour commencer en dix minutes.</p></div>
    </div>
  </div>
</section>`,
});

// ---------- Fiches produits ----------

for (const p of PRODUCTS) {
  const others = PRODUCTS.filter((o) => o.slug !== p.slug).slice(0, 3);
  page({
    path: `produits/${p.slug}/index.html`,
    current: 'produits/',
    title: p.title,
    meta: p.meta,
    ogImage: `produit-${p.slug}.jpg`,
    jsonld: {
      '@context': 'https://schema.org', '@type': 'Product', name: p.name, sku: p.sku, description: p.description,
      brand: { '@type': 'Brand', name: 'LumexIA' }, image: `../../${IMG}produit-${p.slug}.jpg`,
      offers: { '@type': 'Offer', price: p.price.toFixed(2), priceCurrency: 'EUR', availability: 'https://schema.org/PreOrder' },
    },
    body: (b) => `
<div class="wrap crumbs"><nav aria-label="Fil d'Ariane"><ol><li><a href="${b}index.html">Accueil</a></li><li><a href="${b}produits/index.html">Produits</a></li><li aria-current="page">${p.name}</li></ol></nav></div>
<section class="pdp" style="padding-bottom:0">
  <div class="wrap pdp-grid">
    <div class="gallery">
      ${img(b, `produit-${p.slug}.jpg`, p.altProduct, { glow: p.glow, eager: true })}
      ${img(b, `ambiance-${p.slug}.jpg`, p.altAmbiance, { ratio: '4 / 5', glow: p.glow, cls: 'night' })}
    </div>
    <div class="pdp-info">
      <span class="eyebrow">${p.type}</span>
      <h1>${p.name}</h1>
      <p class="hook">${p.hook}</p>
      <p class="data muted">${p.specLine}</p>
      <form>
        ${p.variants ? `
        <fieldset class="variant-group">
          <legend>Format</legend>
          ${p.variants.map((v, i) => `<label><input type="radio" name="variant" value="${v.id}" data-name="${esc(`${p.name} · ${v.label}`)}" data-price="${v.price}"${i === 0 ? ' checked' : ''}> ${v.label} · ${euro(v.price)}</label>`).join('')}
        </fieldset>` : ''}
        <p class="pdp-price">${euro(p.price)}</p>
        ${p.compareAt ? `<p class="muted" style="margin:0 0 8px">Au lieu de ${euro(p.compareAt)} si achetés à l'unité.</p>` : ''}
        <p class="muted" style="font-size:.9rem">Prix TTC. ${p.price >= SITE.freeShippingFrom ? 'Livraison offerte.' : `Livraison ${euro(SITE.shipping)}, offerte dès ${SITE.freeShippingFrom} €.`}</p>
        <div class="btn-row" style="margin-top:16px">
          <button class="btn btn-primary" type="button" data-add data-id="${p.sku}" data-name="${esc(p.name)}" data-price="${p.price}">Ajouter au panier</button>
          <a class="btn btn-secondary" href="${b}lumex-sense/index.html">Voir comment ça marche</a>
        </div>
      </form>
      <ul class="reassure">
        <li>${icon.truck} Livraison en Belgique, offerte dès ${SITE.freeShippingFrom} €</li>
        <li>${icon.back} Retour gratuit pendant ${SITE.returnDays} jours</li>
        <li>${icon.shield} Garantie légale de 2 ans · App gratuite, sans abonnement</li>
      </ul>
      <h2 style="font-size:1.4rem">En deux mots</h2>
      <p>${p.description}</p>
      <ul class="points">${p.points.map((x) => `<li>${x}</li>`).join('')}</ul>
    </div>
  </div>
</section>
<section class="pdp-section" aria-labelledby="specs-title">
  <div class="wrap two-col" style="align-items:start">
    <div>
      <h2 id="specs-title" style="font-size:1.6rem">Caractéristiques</h2>
      <table class="specs"><tbody>${p.specs.map(([k, v]) => `<tr><th scope="row">${k}</th><td>${v}</td></tr>`).join('')}<tr><th scope="row">Dans la boîte</th><td>${p.box}</td></tr></tbody></table>
    </div>
    <div class="callout">
      <h3>Les mots techniques, en clair</h3>
      <p><strong>Lumens (lm) :</strong> la quantité de lumière. 806 lm, c'est à peu près une ampoule classique de 60 W.</p>
      <p><strong>Kelvins (K) :</strong> la couleur du blanc. 2200 K, c'est la lumière d'une bougie ; 6500 K, une lumière froide et tonique.</p>
      <p><strong>Matter :</strong> un standard commun. Ton produit fonctionne avec les autres appareils Matter, quelle que soit leur marque.</p>
    </div>
  </div>
  <div class="wrap">
    <div class="sense-strip">
      <div class="arc-line" aria-hidden="true"></div>
      <p style="margin:0"><strong>Avec Lumex Sense,</strong> ${p.name} suit ta journée : lumière douce au réveil, nette en journée, ambrée le soir. Les réglages se font sur l'appareil, et tes habitudes restent chez toi. <a href="${b}lumex-sense/index.html">En savoir plus</a></p>
    </div>
  </div>
</section>
<section aria-labelledby="more-title">
  <div class="wrap">
    <h2 id="more-title" style="font-size:1.6rem">Ça va bien avec</h2>
    <div class="products">${others.map((o) => productCard(b, o)).join('')}</div>
  </div>
</section>`,
  });
}

// ---------- Lumex Sense ----------

page({
  path: 'lumex-sense/index.html',
  current: 'lumex-sense/',
  title: 'Lumex Sense : la lumière qui suit ta journée | LumexIA',
  meta: "Comment fonctionne Lumex Sense : une lumière qui change selon l'heure, des habitudes apprises sur l'appareil et une consommation estimée dans l'app.",
  body: (b) => `
<div class="wrap crumbs"><nav aria-label="Fil d'Ariane"><ol><li><a href="${b}index.html">Accueil</a></li><li aria-current="page">Lumex Sense</li></ol></nav></div>
<section class="page-hero">
  <div class="wrap two-col">
    <div>
      <span class="eyebrow">Lumex Sense · inclus avec chaque produit</span>
      <h1>Ta lumière suit ta journée. Toute seule.</h1>
      <p>Lumex Sense, c'est le « IA » de LumexIA : un mode qui règle la couleur et l'intensité de tes lampes selon l'heure, la lumière du jour et tes habitudes. Tu n'as rien à programmer.</p>
      <div class="btn-row"><a class="btn btn-primary" href="${b}produits/index.html">Voir les produits</a></div>
    </div>
    <div class="phone" role="img" aria-label="Aperçu de l'app Lumex : moment Soir, trois lampes et la consommation de la semaine">
      <div class="app-top"><span>19:12</span><span>Lumex</span></div>
      <div class="app-title">Bonsoir ✨</div>
      <div class="app-card"><span>Lumex Sense<br><b>Soir · 2700 K</b></span><span class="dot"></span></div>
      <div class="app-arc"></div>
      <div class="app-card"><span><b>Salon</b><br>3 lampes · 60 %</span><span class="dot"></span></div>
      <div class="app-card"><span><b>Bureau</b><br>Lumex Halo</span><span class="dot off"></span></div>
      <div class="app-card"><span><b>Chambre</b><br>Aube à 7 h 00</span><span class="dot"></span></div>
      <div style="font:500 .7rem var(--font-data);color:#A9AFC4">Consommation estimée · 7 jours</div>
      <div class="app-energy"><span style="height:50%"></span><span style="height:62%"></span><span style="height:40%"></span><span style="height:55%"></span><span style="height:35%"></span><span style="height:70%" class="hi"></span><span style="height:45%"></span></div>
    </div>
  </div>
</section>

<section style="padding-top:24px" aria-labelledby="day-title">
  <div class="wrap">
    <h2 id="day-title">Une journée avec Lumex Sense</h2>
    <div class="timeline">
      ${MOMENTS.map((m) => `<div class="step reveal" style="--c:${m.color}"><span class="k">${m.time} · ${m.k}</span><h3>${m.label}</h3><p style="margin:0">${m.text}</p></div>`).join('')}
    </div>
  </div>
</section>

${arcSection(b, { heading: "Vois la différence d'un moment à l'autre.", intro: 'Le même salon, à quatre heures de la journée. Seule la lumière change.' })}

<section style="padding-top:0" aria-labelledby="how-title">
  <div class="wrap">
    <h2 id="how-title">Comment ça marche</h2>
    <div class="values">
      <div class="value"><h3>1. L'heure et la saison</h3><p>Lumex Sense connaît l'heure du lever et du coucher du soleil chez toi. En hiver, la lumière « du soir » arrive plus tôt.</p></div>
      <div class="value"><h3>2. La lumière de la pièce</h3><p>Lumex Halo mesure la lumière ambiante et baisse son intensité quand le soleil entre dans la pièce.</p></div>
      <div class="value"><h3>3. Tes habitudes</h3><p>Tu baisses toujours le salon vers 21 h ? Après quelques jours, Lumex Sense te le propose tout seul. Tu gardes toujours la main.</p></div>
      <div class="value"><h3>4. Calculé chez toi</h3><p>L'apprentissage se fait sur l'appareil. Aucune donnée n'est revendue, et le compte en ligne est facultatif.</p></div>
    </div>
  </div>
</section>

${calcSection()}

<section style="padding-top:0" aria-labelledby="honest-title">
  <div class="wrap">
    <div class="callout">
      <h2 id="honest-title" style="font-size:1.4rem">Ce qu'on promet, et ce qu'on ne promet pas</h2>
      <p>Lumex Sense t'aide à préparer ton sommeil et à garder une lumière agréable toute la journée. Ce n'est pas un dispositif médical : il ne soigne rien. Et nos économies d'énergie sont toujours des estimations, avec la méthode de calcul affichée.</p>
    </div>
  </div>
</section>`,
});

// ---------- La marque ----------

page({
  path: 'la-marque/index.html',
  current: 'la-marque/',
  title: 'La marque : pourquoi LumexIA existe | LumexIA',
  meta: "LumexIA rend la lumière de ta maison aussi vivante que celle du jour. Découvre notre histoire, nos valeurs et nos engagements, sans promesses en l'air.",
  body: (b) => `
<div class="wrap crumbs"><nav aria-label="Fil d'Ariane"><ol><li><a href="${b}index.html">Accueil</a></li><li aria-current="page">La marque</li></ol></nav></div>
<section class="page-hero">
  <div class="wrap two-col">
    <div>
      <span class="eyebrow">Pourquoi LumexIA existe</span>
      <h1>On vit à l'intérieur. Sous une lumière qui ne change jamais.</h1>
      <p>Dehors, la lumière évolue toute la journée : orangée le matin, blanche à midi, dorée le soir. Chez nous, le plafonnier reste le même du café du matin au film du soir. LumexIA existe pour que la lumière de ta maison suive ton rythme, comme celle du jour.</p>
    </div>
    ${img(b, 'marque-atelier.jpg', "Table de conception avec des croquis de lampes, des prototypes et une lampe allumée", { ratio: '4 / 5', glow: '#FFB547' })}
  </div>
</section>

<section style="padding-top:24px" aria-labelledby="name-title">
  <div class="wrap two-col">
    <div>
      <h2 id="name-title">Le nom</h2>
      <p><strong>Lumex</strong> vient de <em>lumen</em>, « lumière » en latin, et de l'idée d'expérience : la lumière qu'on ressent, pas seulement celle qu'on allume.</p>
      <p><strong>IA</strong>, c'est Lumex Sense : une lumière intelligente qui apprend tes habitudes. Discrètement, et chez toi.</p>
    </div>
    <div class="callout">
      <p class="eyebrow">Notre signature</p>
      <p style="font:600 clamp(1.6rem,3vw,2.2rem)/1.2 var(--font-title);margin:0">${SITE.tagline}</p>
    </div>
  </div>
</section>

<section style="padding-top:0" aria-labelledby="values-title">
  <div class="wrap">
    <h2 id="values-title">Ce qui nous guide</h2>
    <div class="values">
      <div class="value reveal"><h3>Le bien-être d'abord <span>01</span></h3><p>Une lumière qui respecte ton rythme. Jamais agressive, jamais clignotante.</p></div>
      <div class="value reveal"><h3>La sobriété <span>02</span></h3><p>Consommer moins, et te le montrer avec des estimations honnêtes et leur méthode de calcul.</p></div>
      <div class="value reveal"><h3>La liberté <span>03</span></h3><p>Un standard ouvert (Matter), pas d'abonnement, et tes données qui restent chez toi.</p></div>
      <div class="value reveal"><h3>La simplicité <span>04</span></h3><p>Si une fonction de base a besoin d'une notice, c'est que le produit est mal conçu.</p></div>
    </div>
  </div>
</section>

<section style="padding-top:0" aria-labelledby="eng-title">
  <div class="wrap two-col">
    ${img(b, 'marque-emballage.jpg', 'Boîte ivoire LumexIA ouverte, une ampoule posée dans un calage en carton', { ratio: '4 / 5', glow: '#FFE2B8' })}
    <div>
      <h2 id="eng-title">Nos engagements</h2>
      <ul class="points">
        <li><strong>Pas d'abonnement.</strong> Toutes les fonctions sont incluses à l'achat.</li>
        <li><strong>Pas de compte obligatoire.</strong> L'app fonctionne en local.</li>
        <li><strong>Pas de promesse santé.</strong> On t'aide à préparer ton sommeil ; on ne soigne rien.</li>
        <li><strong>Pas de chiffres magiques.</strong> Nos économies sont des estimations, calculées devant toi.</li>
        <li><strong>Des emballages simples.</strong> Carton, sans plastique inutile.</li>
      </ul>
    </div>
  </div>
</section>

<section style="padding-top:0">
  <div class="wrap">
    <div class="callout">
      <h2 style="font-size:1.4rem">Un projet d'examen</h2>
      <p>LumexIA est une marque fictive, créée avec l'intelligence artificielle dans le cadre de l'examen du cours d'IA (HEPL, année académique 2026-2027). Les produits, les prix et les caractéristiques sont imaginés pour l'exercice. Aucune vente réelle n'est possible.</p>
    </div>
  </div>
</section>`,
});

// ---------- Aide ----------

page({
  path: 'aide/index.html',
  current: 'aide/',
  title: 'Aide, livraison, retours et contact | LumexIA',
  meta: "Installation, compatibilité Matter, app Lumex, livraison en Belgique, retours sous 30 jours : toutes les réponses, et un formulaire pour nous écrire.",
  jsonld: { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.flatMap(([, qs]) => qs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } }))) },
  body: (b) => `
<div class="wrap crumbs"><nav aria-label="Fil d'Ariane"><ol><li><a href="${b}index.html">Accueil</a></li><li aria-current="page">Aide</li></ol></nav></div>
<section class="page-hero">
  <div class="wrap">
    <span class="eyebrow">Aide</span>
    <h1>Une question ? On éclaire ça.</h1>
    <p>Les réponses aux questions les plus fréquentes. Et si tu ne trouves pas, écris-nous.</p>
  </div>
</section>
<section style="padding-top:0" id="faq" aria-labelledby="faq-title">
  <div class="wrap">
    <h2 id="faq-title" style="position:absolute;left:-999px">Questions fréquentes</h2>
    <div class="faq">
      ${FAQ.map(([group, qs]) => `<div class="faq-group"><h3>${group}</h3>${qs.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join('')}</div>`).join('')}
    </div>
  </div>
</section>
<section style="padding-top:0" id="livraison" aria-labelledby="ship-title">
  <div class="wrap">
    <h2 id="ship-title">Livraison et retours</h2>
    <table class="specs"><tbody>
      <tr><th scope="row">Livraison en Belgique</th><td>${euro(SITE.shipping)}, offerte dès ${SITE.freeShippingFrom} €</td></tr>
      <tr><th scope="row">Retour</th><td>${SITE.returnDays} jours, produit dans son emballage d'origine</td></tr>
      <tr><th scope="row">Garantie</th><td>Garantie légale de 2 ans</td></tr>
      <tr><th scope="row">Prix</th><td>TTC, TVA belge de 21 % incluse</td></tr>
    </tbody></table>
  </div>
</section>
<section style="padding-top:0" id="contact" aria-labelledby="contact-title">
  <div class="wrap two-col" style="align-items:start">
    <div>
      <h2 id="contact-title">Nous écrire</h2>
      <p class="muted">On répond en un jour ouvrable, en français. (Enfin, on répondrait : c'est une démo.)</p>
    </div>
    <form class="form" data-demo="Démo : ton message n'a pas été envoyé, mais il était sûrement très bien.">
      <label>Ton prénom<input name="prenom" autocomplete="given-name" required></label>
      <label>Ton e-mail<input name="email" type="email" autocomplete="email" required></label>
      <label>Sujet<select name="sujet"><option>Une question avant d'acheter</option><option>L'installation</option><option>L'app Lumex</option><option>Ma commande</option><option>Autre chose</option></select></label>
      <label>Ton message<textarea name="message" required></textarea></label>
      <label class="check"><input type="checkbox" required> J'accepte que LumexIA utilise mon adresse pour me répondre, et rien d'autre.</label>
      <button class="btn btn-primary" type="submit">Envoyer</button>
      <p class="form-msg" role="status"></p>
    </form>
  </div>
</section>`,
});

// ---------- Landing page de campagne : Black Friday ----------

const bfProduct = (o) => ({ ...PRODUCTS.find((p) => p.slug === o.slug), ...o });
const bfPrice = (o, cls = '') => `<span class="price price-stack ${cls}"><s><span class="sr-only">Prix le plus bas des 30 derniers jours : </span>${euro(o.ref)}</s><span><span class="sr-only">Prix Black Friday : </span>${euro(o.bf)}</span></span>`;
const bfAdd = (o, label = 'Ajouter', cls = 'btn-small') => `<button class="btn btn-primary ${cls} add" type="button" data-add data-id="${o.id}" data-name="${esc(o.name)} (Black Friday)" data-price="${o.bf}" aria-label="Ajouter ${esc(o.name)} au panier au prix Black Friday">${label}</button>`;

const bfCard = (b, o) => {
  const p = bfProduct(o);
  return `
<article class="card reveal" id="offre-${p.slug}" style="--glow:${p.glow}">
  ${img(b, `produit-${p.slug}.jpg`, p.altProduct, { glow: p.glow })}
  <span class="bf-tag" aria-hidden="true">−${CAMPAIGN.discount} %</span>
  <div class="card-body">
    <h3><a href="${b}produits/${p.slug}/index.html">${p.name}</a></h3>
    <p class="type">${p.type}</p>
    <div class="card-foot">${bfPrice(p)}${bfAdd(p)}</div>
  </div>
</article>`;
};

const pack = bfProduct(CAMPAIGN.offers[0]);
page({
  path: `${CAMPAIGN.slug}/index.html`,
  title: 'Black Friday : −20 % sur toute la gamme | LumexIA',
  meta: "Black Friday LumexIA : −20 % sur toutes nos lampes connectées du 27 au 30 novembre 2026. Prix barrés honnêtes, sans faux compte à rebours ni code promo.",
  body: (b) => `
<div class="bf" data-bf data-start="${CAMPAIGN.start}" data-end="${CAMPAIGN.end}">

<section class="hero bf-hero" aria-labelledby="bf-title">
  ${img(b, 'hero-salon-soir.jpg', 'Salon plongé dans la nuit, rallumé par une lampe ronde à la lumière ambrée', { ratio: 'auto', cls: 'night', eager: true })}
  <div class="wrap hero-in">
    <span class="eyebrow">Black Friday · ${CAMPAIGN.datesLabel}</span>
    <h1 id="bf-title">Le vendredi le plus noir de l'année. <em>On rallume la lumière.</em></h1>
    <p><strong class="bf-big">−${CAMPAIGN.discount} % sur toute la gamme.</strong> Pas de faux compte à rebours, pas de prix gonflés, pas de code promo. Juste une bonne raison de commencer.</p>
    <div class="bf-count" role="timer" aria-live="off">
      <p class="bf-count-label" data-bf-label>L'offre commence vendredi 27 novembre à 0 h.</p>
      <div class="bf-count-grid" data-bf-grid aria-hidden="true">
        <span><b data-u="j">0</b><i data-u="jl">jours</i></span><span><b data-u="h">00</b>heures</span><span><b data-u="m">00</b>min</span><span><b data-u="s">00</b>s</span>
      </div>
    </div>
    <div class="btn-row">
      <a class="btn btn-primary" href="#offres">Voir les offres</a>
      <a class="btn btn-secondary" href="#prix-honnetes">Nos prix, expliqués</a>
    </div>
  </div>
</section>

<section id="offres" class="bf-offres" aria-labelledby="offres-title">
  <div class="wrap">
    <div class="pack-band bf-pack reveal" id="offre-pack-depart">
      ${img(b, 'ambiance-pack-depart.jpg', pack.altAmbiance, { ratio: 'auto', glow: '#FFC46B' })}
      <div class="pack-band-text">
        <span class="badge bf-badge">Idéal pour débuter</span>
        <h2 id="offres-title">Le plus simple pour commencer coûte encore moins.</h2>
        <p>3 Lumex Bulb et 1 Lumex Switch : le salon, la cuisine et la chambre, commandés depuis l'entrée. Sans outil ni travaux.</p>
        ${bfPrice(pack, 'bf-price-xl')}
        <p class="muted bf-note">Soit ${euro(83.6 - pack.bf)} de moins que les 4 produits achetés séparément (${euro(83.6)}).</p>
        <div class="btn-row" style="margin-top:16px">
          ${bfAdd(pack, 'Ajouter au panier', '')}
          <a class="btn btn-secondary" href="${b}produits/pack-depart/index.html">Voir le détail</a>
        </div>
      </div>
    </div>

    <div class="section-head" style="margin-top:clamp(56px,8vw,96px)">
      <div><span class="eyebrow">Toute la gamme</span><h2>−${CAMPAIGN.discount} %. Vraiment toute.</h2></div>
      <p class="muted">Le prix barré est notre prix le plus bas des 30 derniers jours.</p>
    </div>
    <div class="products">${CAMPAIGN.offers.slice(1).map((o) => bfCard(b, o)).join('')}</div>
  </div>
</section>

<section class="bf-needs" aria-labelledby="needs-title">
  <div class="wrap">
    <span class="eyebrow">Par quoi commencer ?</span>
    <h2 id="needs-title">Pas besoin de tout changer. Commence par une pièce.</h2>
    <div class="bf-needs-grid">
      ${CAMPAIGN.needs.map((n) => { const o = bfProduct(CAMPAIGN.offers.find((x) => x.slug === n.slug)); return `
      <a class="bf-need reveal" href="#offre-${o.slug}" style="--glow:${o.glow}">
        <h3>${n.title}</h3>
        <p>${n.text}</p>
        <span class="bf-need-foot"><span>${o.name}</span><b>${euro(o.bf)}</b></span>
      </a>`; }).join('')}
    </div>
  </div>
</section>

<section id="prix-honnetes" class="bf-honest" aria-labelledby="honest-title">
  <div class="wrap">
    <span class="eyebrow">Un Black Friday sans entourloupe</span>
    <h2 id="honest-title">On baisse les prix. Pas la garde.</h2>
    <div class="promises">
      <div class="promise reveal">${icon.chart}<h3>Nos prix barrés sont nos vrais prix.</h3><p>Le prix barré est le plus bas des 30 derniers jours (directive Omnibus). On ne l'a pas gonflé la semaine d'avant.</p></div>
      <div class="promise reveal">${icon.sun}<h3>Lundi 23 h 59, c'est fini. Vraiment.</h3><p>Notre compte à rebours suit la vraie date de fin. Il ne recommence pas quand tu reviens.</p></div>
      <div class="promise reveal">${icon.back}<h3>30 jours pour changer d'avis.</h3><p>Retour gratuit pendant 30 jours après la réception, et garantie légale de 2 ans, comme toute l'année.</p></div>
    </div>
    <p class="bf-calc-link">Tu veux savoir ce qu'une ampoule LED change sur ta facture ? <a href="${b}index.html#calculateur">Fais l'estimation avec notre calculateur</a>, méthode de calcul comprise.</p>
  </div>
</section>

<section class="bf-faq" aria-labelledby="bf-faq-title">
  <div class="wrap faq">
    <h2 id="bf-faq-title">L'offre en questions</h2>
    ${CAMPAIGN.faq.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join('')}
  </div>
</section>

<section class="bf-final" aria-labelledby="bf-final-title">
  <div class="wrap">
    <div class="footer-arc" aria-hidden="true"></div>
    <h2 id="bf-final-title">${SITE.tagline} <em>Et −${CAMPAIGN.discount} % jusqu'à lundi soir.</em></h2>
    <div class="btn-row" style="justify-content:center"><a class="btn btn-primary" href="#offres">Voir les offres</a></div>
  </div>
</section>

</div>`,
});

// ---------- Mentions légales ----------

page({
  path: 'mentions-legales/index.html',
  title: 'Mentions légales et vie privée | LumexIA',
  meta: "Mentions légales du site de démonstration LumexIA, marque fictive créée pour un examen : éditeur, données personnelles, cookies et hébergement.",
  body: (b) => `
<div class="wrap crumbs"><nav aria-label="Fil d'Ariane"><ol><li><a href="${b}index.html">Accueil</a></li><li aria-current="page">Mentions légales</li></ol></nav></div>
<section class="page-hero"><div class="wrap">
  <h1>Mentions légales</h1>
  <p>LumexIA est une marque fictive, créée pour l'examen du cours d'IA (HEPL, année académique 2026-2027). Aucune société n'existe derrière ce site.</p>
  <h2 style="font-size:1.4rem">Données personnelles</h2>
  <p>Ce site ne collecte aucune donnée. Les formulaires n'envoient rien. Le panier et ton choix d'ambiance (Jour ou Nuit) sont gardés uniquement dans ton navigateur.</p>
  <h2 style="font-size:1.4rem">Cookies</h2>
  <p>Aucun cookie de mesure ni de publicité. Les polices sont chargées depuis Google Fonts.</p>
  <h2 style="font-size:1.4rem">Images</h2>
  <p>Les photos du site ont été générées avec l'intelligence artificielle (Gemini). Elles ne montrent pas de vrais produits.</p>
</div></section>`,
});

page({
  path: '404.html',
  title: 'Page introuvable | LumexIA',
  meta: "Cette page n'existe pas, ou plus. Retourne à l'accueil de LumexIA pour découvrir l'éclairage connecté qui suit ta journée, sans abonnement.",
  body: (b) => `
<section class="page-hero"><div class="wrap">
  <span class="eyebrow">Erreur 404</span>
  <h1>Il fait un peu sombre par ici.</h1>
  <p>Cette page n'existe pas. On rallume la lumière ?</p>
  <div class="btn-row"><a class="btn btn-primary" href="${b}index.html">Retour à l'accueil</a></div>
</div></section>`,
});

// ---------- Fichiers statiques et vérifications ----------

mkdirSync(join(OUT, 'assets', 'img'), { recursive: true });
for (const f of ['style.css', 'app.js', 'favicon.svg', 'logo.png', 'logo-inverse.png']) copyFileSync(join(ROOT, 'src/static', f), join(OUT, 'assets', f));
// Vidéo de marque (Veo 3) et son image d'aperçu
mkdirSync(join(OUT, 'assets', 'video'), { recursive: true });
copyFileSync(join(ROOT, 'video/lumexia-video.mp4'), join(OUT, 'assets/video/lumexia-video.mp4'));
copyFileSync(join(ROOT, 'video/images/video-2.jpg'), join(OUT, 'assets/video/poster.jpg'));
if (!existsSync(join(OUT, '.nojekyll'))) writeFileSync(join(OUT, '.nojekyll'), '');

let errors = 0;
for (const p of pages) {
  if (p.title.length >= 60) { console.error(`✗ title trop long (${p.title.length}) : ${p.path}`); errors++; }
  if (p.meta.length < 120 || p.meta.length > 155) { console.error(`✗ meta hors limites (${p.meta.length}) : ${p.path}`); errors++; }
}
const present = new Set(readdirSync(join(OUT, 'assets', 'img')));
const expected = [...new Set(pages.length ? [
  'hero-salon-soir.jpg', 'og-lumexia.jpg', 'marque-atelier.jpg', 'marque-emballage.jpg',
  ...MOMENTS.map((m) => `arc-${m.id}.jpg`),
  'cible-jeunes-actifs.jpg', 'cible-tech.jpg', 'cible-renovation.jpg', 'cible-economies.jpg',
  ...PRODUCTS.flatMap((p) => [`produit-${p.slug}.jpg`, `ambiance-${p.slug}.jpg`]),
] : [])];
const missing = expected.filter((f) => !present.has(f));
console.log(`✓ ${pages.length} pages générées dans site/`);
console.log(missing.length ? `… ${missing.length}/${expected.length} images encore à déposer dans site/assets/img/ (voir docs/prompts-gemini.md)` : `✓ les ${expected.length} images sont en place`);
if (errors) process.exit(1);
