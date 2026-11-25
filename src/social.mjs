// Génère les publications réseaux sociaux LumexIA :
//   social/publications.md (calendrier + textes) et social/visuels/*.png (visuels prêts à publier).
// Usage : node src/social.mjs            (textes + visuels, nécessite Google Chrome)
//         node src/social.mjs --textes   (textes seulement)
// Les visuels sont des gabarits HTML aux couleurs de brand/design.md, rendus en PNG par Chrome sans interface.
import { mkdirSync, writeFileSync, mkdtempSync, rmSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { execFileSync } from 'node:child_process';
import { POSTS, CALC } from './social-data.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'social');
const VIS = join(OUT, 'visuels');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const url = (p) => pathToFileURL(join(ROOT, p)).href;
const photo = (f) => url(`site/assets/img/${f}`);
const ICON = url('assets/logo/lumexia-icone.png');
const LOGO_INV = url('src/static/logo-inverse.png');

const size = (tpl) => (tpl === 'story' ? [1080, 1920] : [1080, 1350]);
const strip = (s) => s.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, '\u00a0');

// ---------- Gabarits ----------

const css = `
* { box-sizing: border-box; margin: 0; }
html, body { width: var(--w); height: var(--h); overflow: hidden; }
body { font-family: Inter, sans-serif; color: #FAF7F2; background: #10162B; position: relative; }
em { font-style: normal; color: #FFB547; }
h1 em.i { display: inline; }
.bg { position: absolute; inset: 0; background-size: cover; background-position: var(--pos, 50% 50%); }
.shade { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(16,22,43,.35) 0%, rgba(16,22,43,0) 28%, rgba(16,22,43,0) 42%, rgba(16,22,43,.88) 78%, #10162B 100%); }
.icon { position: absolute; top: 56px; left: 56px; width: 96px; height: 96px; border-radius: 22px; box-shadow: 0 8px 30px rgba(0,0,0,.25); }
.tag { position: absolute; top: 64px; right: 56px; padding: 14px 30px; border-radius: 999px; background: #FFB547; color: #10162B; font: 700 44px Sora, sans-serif; }
.page { position: absolute; top: 72px; right: 60px; font: 500 30px 'JetBrains Mono', monospace; color: rgba(250,247,242,.85); background: rgba(16,22,43,.55); padding: 8px 18px; border-radius: 999px; }
.content { position: absolute; left: 72px; right: 72px; bottom: 84px; }
.eyebrow { font: 500 30px 'JetBrains Mono', monospace; letter-spacing: .1em; text-transform: uppercase; color: #FFE2B8; margin-bottom: 26px; }
h1 { font: 700 92px/1.04 Sora, sans-serif; letter-spacing: -.015em; }
h1 em { display: block; }
.sub { font: 400 40px/1.4 Inter, sans-serif; color: #D9DCE8; margin-top: 30px; max-width: 30ch; }
.arc { width: 220px; height: 12px; border-radius: 99px; background: linear-gradient(90deg, #FFE2B8, #FFB547); margin-bottom: 44px; }
/* texte */
.t-texte { background: radial-gradient(ellipse 90% 60% at 50% 115%, rgba(255,181,71,.42), transparent 70%), #10162B; }
.t-texte .content { top: 50%; bottom: auto; transform: translateY(-50%); }
.t-texte h1 { font-size: 104px; }
.logo-bottom { position: absolute; left: 72px; bottom: 72px; height: 76px; }
/* produit */
.t-produit { background: #E7EAF3; color: #10162B; }
.t-produit .bg { bottom: 430px; background-size: cover; }
.t-produit .panel { position: absolute; left: 0; right: 0; bottom: 0; height: 430px; background: #FAF7F2; padding: 56px 72px; display: grid; grid-template-columns: 1fr auto; align-items: end; gap: 24px; }
.t-produit .eyebrow { color: #5A6178; margin-bottom: 18px; }
.t-produit h1 { font-size: 84px; color: #10162B; }
.t-produit .sub { color: #5A6178; margin-top: 12px; font-size: 36px; }
.price { text-align: right; }
.price s { display: block; font: 500 38px Inter, sans-serif; color: #5A6178; }
.price b { display: block; font: 700 96px/1 Sora, sans-serif; color: #10162B; }
.note { grid-column: 1 / -1; font: 500 24px 'JetBrains Mono', monospace; color: #5A6178; }
/* moment (carrousel arc) */
.t-moment .time { position: absolute; top: 56px; left: 56px; display: flex; gap: 18px; align-items: baseline; padding: 18px 30px; border-radius: 999px; background: rgba(16,22,43,.62); }
.t-moment .time b { font: 700 64px Sora, sans-serif; color: #FAF7F2; }
.t-moment .time span { font: 500 32px 'JetBrains Mono', monospace; color: var(--c); }
.t-moment .label { font: 500 30px 'JetBrains Mono', monospace; letter-spacing: .1em; text-transform: uppercase; color: var(--c); margin-bottom: 20px; }
.t-moment h1 { font-size: 84px; }
.t-moment .bar { height: 12px; border-radius: 99px; margin-top: 40px; background: linear-gradient(90deg, #FF9E5E, #F4F1FF 35%, #FFB547 68%, #2A2F4A); position: relative; }
.t-moment .bar i { position: absolute; top: -12px; width: 36px; height: 36px; border-radius: 50%; background: #FAF7F2; box-shadow: 0 0 24px 6px var(--c); left: var(--x); transform: translateX(-50%); }
/* story */
.t-story .shade { background: linear-gradient(180deg, rgba(16,22,43,.7) 0%, rgba(16,22,43,0) 22%, rgba(16,22,43,0) 40%, rgba(16,22,43,.9) 72%, #10162B 100%); }
.t-story .logo-top { position: absolute; top: 120px; left: 50%; transform: translateX(-50%); height: 84px; }
.t-story .content { bottom: 330px; text-align: center; left: 80px; right: 80px; }
.t-story h1 { font-size: 112px; }
.t-story .sub { margin: 34px auto 0; }
.t-story .sticker { position: absolute; left: 50%; bottom: 150px; transform: translateX(-50%); padding: 22px 40px; border: 3px dashed rgba(250,247,242,.45); border-radius: 26px; font: 500 28px 'JetBrains Mono', monospace; color: rgba(250,247,242,.7); white-space: nowrap; }
/* calcul */
.t-calc { background: #FAF7F2; color: #10162B; padding: 96px 72px; display: flex; flex-direction: column; justify-content: center; }
.t-calc .eyebrow { color: #5A6178; }
.t-calc .page { top: 72px; }
.t-calc h1 { font-size: 92px; color: #10162B; margin-bottom: 72px; }
.row { background: #E7EAF3; border-radius: 28px; padding: 44px 44px; margin-bottom: 28px; display: grid; grid-template-columns: 1fr auto; gap: 8px 24px; align-items: center; }
.row.new { background: #10162B; color: #FAF7F2; }
.row h2 { font: 600 46px Sora, sans-serif; }
.row .d { font: 500 30px 'JetBrains Mono', monospace; color: #5A6178; }
.row.new .d { color: #B9BFD3; }
.row b { grid-row: 1 / 3; grid-column: 2; font: 700 84px Sora, sans-serif; }
.row.new b { color: #FFB547; }
.method { font: 400 32px/1.5 Inter, sans-serif; color: #5A6178; margin-top: 44px; padding-right: 110px; }
.t-calc .icon { top: auto; bottom: 72px; left: auto; right: 72px; width: 84px; height: 84px; }
`;

const tpl = {
  photo: (v) => `<div class="bg" style="background-image:url('${photo(v.photo)}');--pos:${v.pos || '50% 50%'}"></div><div class="shade"></div>
    <img class="icon" src="${ICON}" alt="">${v.tag ? `<div class="tag">${v.tag}</div>` : ''}${v.page ? `<div class="page">${v.page}</div>` : ''}
    <div class="content"><div class="eyebrow">${v.eyebrow}</div><h1>${v.title}</h1>${v.sub ? `<p class="sub">${v.sub}</p>` : ''}</div>`,
  texte: (v) => `${v.page ? `<div class="page">${v.page}</div>` : ''}<div class="content"><div class="arc"></div><div class="eyebrow">${v.eyebrow}</div><h1>${v.title}</h1>${v.sub ? `<p class="sub">${v.sub}</p>` : ''}</div>
    <img class="logo-bottom" src="${LOGO_INV}" alt="">`,
  produit: (v) => `<div class="bg" style="background-image:url('${photo(v.photo)}')"></div>
    <img class="icon" src="${ICON}" alt="">${v.tag ? `<div class="tag">${v.tag}</div>` : ''}
    <div class="panel"><div><div class="eyebrow">${v.eyebrow}</div><h1>${v.title}</h1><p class="sub">${v.sub}</p></div>
    <div class="price"><s>${v.ref}</s><b>${v.price}</b></div><p class="note">${v.note}</p></div>`,
  moment: (v) => {
    const x = { '7 h': '6%', '11 h': '35%', '19 h': '68%', '23 h': '94%' }[v.time] || '50%';
    return `<div class="bg" style="background-image:url('${photo(v.photo)}')"></div><div class="shade"></div>
    <div class="time" style="--c:${v.color}"><b>${v.time}</b><span>${v.k}</span></div><div class="page">${v.page}</div>
    <div class="content" style="--c:${v.color}"><div class="label">${v.label}</div><h1>${v.title}</h1><div class="bar" style="--x:${x}"><i></i></div></div>`;
  },
  story: (v) => `<div class="bg" style="background-image:url('${photo(v.photo)}');--pos:${v.pos || '50% 50%'}"></div><div class="shade"></div>
    <img class="logo-top" src="${LOGO_INV}" alt="">
    <div class="content"><div class="eyebrow">${v.eyebrow}</div><h1>${v.title}</h1>${v.sub ? `<p class="sub">${v.sub}</p>` : ''}</div>
`,
  calc: (v) => `<div class="page" style="color:#5A6178;background:#E7EAF3">${v.page}</div>
    <div class="eyebrow">Le calcul, sans arrondi flatteur</div><h1>Une ampoule. Un an. <em style="color:#B86E00;display:inline">Le vrai coût.</em></h1>
    <div class="row"><h2>Halogène 42 W</h2><span class="d">4 h/jour · ${CALC.oldKwh} kWh/an</span><b>${CALC.oldCost} €</b></div>
    <div class="row new"><h2>Lumex Bulb 9 W</h2><span class="d">4 h/jour · ${CALC.newKwh} kWh/an</span><b>${CALC.newCost} €</b></div>
    <p class="method">Méthode : puissance × heures par jour × 365 ÷ 1000 × 0,30 € le kWh. C'est une estimation : ta consommation réelle dépend de tes usages. Fais ton calcul sur notre site (lien en bio).</p>
    <img class="icon" src="${ICON}" alt="">`,
};

const html = (v) => {
  const [w, h] = size(v.tpl);
  return `<!doctype html><html lang="fr"><head><meta charset="utf-8"><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=JetBrains+Mono:wght@500&family=Sora:wght@600;700&display=block"><style>:root{--w:${w}px;--h:${h}px}${css}</style></head>
<body class="t-${v.tpl}">${tpl[v.tpl](v)}</body></html>`;
};

// ---------- Rendu PNG ----------

const files = [];
for (const p of POSTS) p.visuals.forEach((v, i) => files.push({ p, v, name: `${p.id}${p.visuals.length > 1 ? `-${i + 1}` : ''}.png` }));

if (!process.argv.includes('--textes')) {
  if (!existsSync(CHROME)) { console.error('Google Chrome introuvable : lance « node src/social.mjs --textes » pour les textes seulement.'); process.exit(1); }
  mkdirSync(VIS, { recursive: true });
  const tmp = mkdtempSync(join(tmpdir(), 'lumexia-social-'));
  for (const { v, name } of files) {
    const [w, h] = size(v.tpl);
    const page = join(tmp, name.replace('.png', '.html'));
    writeFileSync(page, html(v));
    execFileSync(CHROME, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=1', '--allow-file-access-from-files',
      `--user-data-dir=${join(tmp, 'profil')}`, `--window-size=${w},${h}`, '--virtual-time-budget=8000',
      `--screenshot=${join(VIS, name)}`, pathToFileURL(page).href], { stdio: 'ignore' });
    console.log(`visuel → social/visuels/${name} (${w} × ${h})`);
  }
  rmSync(tmp, { recursive: true, force: true });
}

// ---------- Calendrier et textes ----------

const day = (d) => new Date(`${d}T12:00:00`).toLocaleDateString('fr-BE', { weekday: 'long', day: 'numeric', month: 'long' }).replace(/ 1 /, ' 1er ');
const md = [`# Publications réseaux sociaux LumexIA

> Semaine du Black Friday 2026 : 9 publications pour Instagram, TikTok et LinkedIn, avec leurs visuels prêts à publier.
> Généré par \`node src/social.mjs\` à partir de \`src/social-data.mjs\` (ne pas modifier ce fichier à la main).
> Règles : skill [lumexia-post-reseaux](../.claude/skills/lumexia-post-reseaux/SKILL.md), [tone-of-voice.md](../brand/tone-of-voice.md), [design.md](../brand/design.md). Prix : [produits.md](../brand/produits.md) et [campagne/black-friday.md](../campagne/black-friday.md).
> Projet d'examen : LumexIA est une marque fictive, ces publications n'ont pas été publiées.

## Calendrier

| Date | Heure | Canal | Format | Segment | Publication |
| --- | --- | --- | --- | --- | --- |
${POSTS.map((p) => `| ${day(p.date)} | ${p.time} | ${p.channel} | ${p.format} | ${p.segment} | [${p.title}](#${p.id}) |`).join('\n')}

**Le fil rouge :** chaque publication se rattache à un moment de la journée (aube, jour, soir, nuit) ; la semaine suit le Black Friday (veille, offre, dernier jour, bilan), puis revient aux moments de vie.

**Comment les visuels sont faits :** les photos viennent de Gemini (prompts dans [docs/prompts-gemini.md](../docs/prompts-gemini.md)). Les textes, le logo et les prix sont ajoutés par des gabarits HTML aux couleurs de la charte, puis rendus en PNG par Google Chrome. Le texte reste donc net et sans faute, ce que les générateurs d'images ne garantissent pas.
`];

for (const p of POSTS) {
  const imgs = files.filter((f) => f.p === p);
  md.push(`
---

<a id="${p.id}"></a>
## ${p.title}

| Canal | Format | Date | Segment | Objectif |
| --- | --- | --- | --- | --- |
| ${p.channel} | ${p.format} | ${day(p.date)}, ${p.time} | ${p.segment} | ${p.goal} |

${imgs.map((f) => `<img src="visuels/${f.name}" alt="${strip(f.v.title || f.v.eyebrow || 'Visuel')}" width="${f.v.tpl === 'story' ? 220 : 280}">`).join(' ')}

**Texte du visuel :** ${p.visuals.map((v) => v.tpl === 'calc' ? `calcul (halogène 42 W : ${CALC.oldCost} € par an ; Lumex Bulb 9 W : ${CALC.newCost} € par an ; méthode affichée)` : `« ${strip(v.title)} »${v.sub ? ` + « ${strip(v.sub)} »` : ''}`).join(' / ')}
${p.caption ? `
**Légende :**

${p.caption.split('\n').map((l) => `> ${l}`).join('\n')}
` : ''}${p.hashtags.length ? `
**Hashtags :** ${p.hashtags.join(' ')}
` : ''}
**Texte alternatif :** ${p.alt}
${p.extra ? `
**À ajouter dans l'app :** ${p.extra}
` : ''}${p.storyboard ? `
**Storyboard (15 s) :**

| Temps | Image | Texte à l'écran | Son |
| --- | --- | --- | --- |
${p.storyboard.map((r) => `| ${r.join(' | ')} |`).join('\n')}
` : ''}`);
}

md.push(`
---

## Vérification avant publication (skill lumexia-verif-marque)

- [x] Tutoiement, phrases courtes, un moment de vie avant le produit (sauf LinkedIn : « nous », ton professionnel).
- [x] Prix conformes à \`brand/produits.md\` ; prix Black Friday avec le prix le plus bas des 30 derniers jours.
- [x] Aucune fausse urgence : les dates de fin sont les vraies, aucun « stock limité ».
- [x] Économies : estimation avec la méthode de calcul, pas de pourcentage promis.
- [x] Aucun avis, chiffre de vente ou partenariat inventé ; aucune marque d'autrui.
- [x] 1 ou 2 emojis au maximum, de la famille lumière (☀️ 🌙 ✨ 💡).
- [x] Toujours \`#LumexIA\` et \`#TaLumièreTonRythme\` sur Instagram et TikTok.
- [x] Un texte alternatif pour chaque visuel.
`);

mkdirSync(OUT, { recursive: true });
writeFileSync(join(OUT, 'publications.md'), md.join('\n'));
console.log(`✓ social/publications.md : ${POSTS.length} publications, ${files.length} visuels`);
