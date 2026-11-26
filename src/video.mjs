// Génère le moodboard et le storyboard de la vidéo LumexIA : video/moodboard.png et video/storyboard.png.
// Usage : node src/video.mjs   (nécessite Google Chrome). Textes et prompts : video/README.md.
import { writeFileSync, mkdtempSync, rmSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { execFileSync } from 'node:child_process';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const url = (p) => pathToFileURL(join(ROOT, p)).href;
const photo = (f) => url(`site/assets/img/${f}`);
const LOGO_INV = url('src/static/logo-inverse.png');
const FONTS = '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=JetBrains+Mono:wght@500&family=Sora:wght@600;700&display=block">';

const base = `* { box-sizing: border-box; margin: 0; } body { width: 1920px; height: 1200px; overflow: hidden; background: #10162B; color: #FAF7F2; font-family: Inter, sans-serif; padding: 64px 72px; }
h1 { font: 700 56px Sora, sans-serif; letter-spacing: -.01em; } h1 em { font-style: normal; color: #FFB547; }
.eyebrow { font: 500 20px 'JetBrains Mono', monospace; letter-spacing: .12em; text-transform: uppercase; color: #FFE2B8; margin-bottom: 12px; }
.head { display: flex; justify-content: space-between; align-items: end; margin-bottom: 36px; } .head img { height: 52px; }`;

const moodboard = `<!doctype html><html lang="fr"><head><meta charset="utf-8">${FONTS}<style>${base}
.grid { display: grid; grid-template-columns: 1.3fr 1fr 1fr 1fr; grid-template-rows: 380px 380px; gap: 18px; height: 778px; }
.grid div { border-radius: 20px; background-size: cover; background-position: center; position: relative; overflow: hidden; }
.grid div span { position: absolute; left: 14px; bottom: 14px; font: 500 18px 'JetBrains Mono', monospace; background: rgba(16,22,43,.72); padding: 6px 12px; border-radius: 999px; }
.big { grid-row: 1 / 3; }
.side { display: flex; flex-direction: column; gap: 18px; }
.palette { display: flex; gap: 12px; } .sw { flex: 1; height: 92px; border-radius: 16px; padding: 12px; display: flex; flex-direction: column; justify-content: end; font: 500 15px 'JetBrains Mono', monospace; }
.words { display: flex; flex-wrap: wrap; gap: 10px; } .words span { padding: 8px 16px; border: 1.5px solid rgba(250,247,242,.3); border-radius: 999px; font: 600 18px Inter, sans-serif; }
.foot { display: grid; grid-template-columns: 1.3fr 1fr; gap: 36px; margin-top: 26px; }
</style></head><body>
<div class="head"><div><div class="eyebrow">Vidéo LumexIA · moodboard</div><h1>Une journée de lumière. <em>Le même salon, du lever au coucher.</em></h1></div><img src="${LOGO_INV}" alt=""></div>
<div class="grid">
  <div class="big" style="background-image:url('${photo('hero-salon-soir.jpg')}')"><span>Ambiance générale · soir</span></div>
  <div style="background-image:url('${photo('arc-aube.jpg')}')"><span>7 h · 2200 K</span></div>
  <div style="background-image:url('${photo('arc-jour.jpg')}')"><span>11 h · 4500 K</span></div>
  <div style="background-image:url('${photo('ambiance-lumex-halo.jpg')}')"><span>Bureau, fin de journée</span></div>
  <div style="background-image:url('${photo('arc-soir.jpg')}')"><span>19 h · 2700 K</span></div>
  <div style="background-image:url('${photo('arc-nuit.jpg')}')"><span>23 h · 2200 K</span></div>
  <div style="background-image:url('${photo('ambiance-lumex-orbe.jpg')}')"><span>Lueur ambrée</span></div>
</div>
<div class="foot">
  <div class="palette">
    <div class="sw" style="background:#10162B;border:1.5px solid rgba(250,247,242,.3)">Nuit<br>#10162B</div>
    <div class="sw" style="background:#FAF7F2;color:#10162B">Ivoire<br>#FAF7F2</div>
    <div class="sw" style="background:#FFB547;color:#10162B">Ambre<br>#FFB547</div>
    <div class="sw" style="background:#FFE2B8;color:#10162B">Aube<br>#FFE2B8</div>
    <div class="sw" style="background:linear-gradient(90deg,#FF9E5E,#F4F1FF 35%,#FFB547 68%,#2A2F4A);color:#10162B">Arc de la journée</div>
  </div>
  <div class="words"><span>Lumière naturelle</span><span>Appartement habité</span><span>Caméra presque fixe</span><span>Grain léger</span><span>Calme</span><span>Piano doux</span><span>Pas de néon</span><span>Pas de 3D</span></div>
</div>
</body></html>`;

const frames = [
  { img: 'arc-aube.jpg', n: 1, t: '0–8 s', title: 'Aube · 7 h', text: 'Le lampadaire s\'allume doucement en orangé. Une personne entre avec une tasse.', vo: '« 7 h. Ta lumière se lève avec toi. »', son: 'Oiseaux au loin, bouilloire, premières notes de piano' },
  { img: 'arc-jour.jpg', n: 2, t: '8–16 s', title: 'Jour · 11 h', text: 'Lumière blanche et nette. La personne travaille sur son ordinateur.', vo: '« 11 h. Elle t\'aide à avancer. »', son: 'Clavier, ville lointaine, piano' },
  { img: 'arc-soir.jpg', n: 3, t: '16–24 s', title: 'Soir · 19 h', text: 'La lumière se réchauffe. Ordinateur fermé, plaid, canapé.', vo: '« 19 h. Elle te dit de souffler. »', son: 'Ordinateur qui se ferme, soupir, piano plus doux' },
  { img: 'arc-nuit.jpg', n: 4, t: '24–32 s', title: 'Nuit · 23 h', text: 'Une seule lueur ambrée. La personne quitte la pièce.', vo: '« 23 h. Juste ce qu\'il faut. »', son: 'Silence feutré, pas qui s\'éloignent' },
  { img: null, n: 5, t: '32–36 s', title: 'Plan final', text: 'Fond Nuit, logo, signature et arc de lumière (au montage).', vo: '« LumexIA. Ta lumière. Ton rythme. »', son: 'Dernière note de piano' },
];

const storyboard = `<!doctype html><html lang="fr"><head><meta charset="utf-8">${FONTS}<style>${base}
.row { display: grid; grid-template-columns: repeat(5, 1fr); gap: 20px; }
.f { background: #161C35; border: 1px solid rgba(250,247,242,.14); border-radius: 20px; overflow: hidden; display: flex; flex-direction: column; height: 820px; }
.pic { aspect-ratio: 9 / 10; background-size: cover; background-position: center; position: relative; }
.pic b { position: absolute; top: 14px; left: 14px; width: 48px; height: 48px; border-radius: 50%; background: #FFB547; color: #10162B; font: 700 24px Sora, sans-serif; display: grid; place-items: center; }
.end { background: radial-gradient(ellipse at 50% 110%, rgba(255,181,71,.4), transparent 65%), #10162B; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 18px; }
.end img { width: 70%; } .end p { font: 600 22px Sora, sans-serif; } .end i { width: 50%; height: 8px; border-radius: 9px; background: linear-gradient(90deg,#FFE2B8,#FFB547); }
.txt { padding: 22px 22px 26px; display: flex; flex-direction: column; gap: 10px; flex: 1; }
.t { font: 500 18px 'JetBrains Mono', monospace; color: #FFE2B8; }
h2 { font: 600 30px Sora, sans-serif; }
.d { font-size: 19px; line-height: 1.45; color: #D9DCE8; }
.son { font-size: 17px; line-height: 1.4; color: #B9BFD3; margin-top: 8px; }
.son::before { content: 'Son'; display: block; font: 500 14px 'JetBrains Mono', monospace; letter-spacing: .1em; text-transform: uppercase; color: #B9BFD3; margin-bottom: 4px; }
.vo { margin-top: auto; font: 600 19px/1.4 Inter, sans-serif; color: #FFB547; }
.vo::before { content: 'Voix off'; display: block; font: 500 14px 'JetBrains Mono', monospace; letter-spacing: .1em; text-transform: uppercase; color: #B9BFD3; margin-bottom: 4px; }
.bar { height: 10px; border-radius: 9px; margin: 26px 0 0; background: linear-gradient(90deg,#FF9E5E,#F4F1FF 30%,#FFB547 60%,#2A2F4A 88%,#10162B); }
</style></head><body>
<div class="head"><div><div class="eyebrow">Vidéo LumexIA · storyboard · 36 s · Veo 3</div><h1>Une journée de lumière.</h1></div><img src="${LOGO_INV}" alt=""></div>
<div class="row">${frames.map((f) => `<div class="f">
  ${f.img ? `<div class="pic" style="background-image:url('${photo(f.img)}')"><b>${f.n}</b></div>` : `<div class="pic end"><img src="${LOGO_INV}" alt=""><p>Ta lumière. Ton rythme.</p><i></i></div>`}
  <div class="txt"><span class="t">${f.t}</span><h2>${f.title}</h2><p class="d">${f.text}</p><p class="son">${f.son}</p><p class="vo">${f.vo}</p></div></div>`).join('')}
</div>
<div class="bar"></div>
</body></html>`;

if (!existsSync(CHROME)) { console.error('Google Chrome introuvable.'); process.exit(1); }
const tmp = mkdtempSync(join(tmpdir(), 'lumexia-video-'));
for (const [name, html] of [['moodboard', moodboard], ['storyboard', storyboard]]) {
  const page = join(tmp, `${name}.html`);
  writeFileSync(page, html);
  execFileSync(CHROME, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=1', '--allow-file-access-from-files',
    `--user-data-dir=${join(tmp, 'profil')}`, '--window-size=1920,1200', '--virtual-time-budget=8000',
    `--screenshot=${join(ROOT, 'video', `${name}.png`)}`, pathToFileURL(page).href], { stdio: 'ignore' });
  console.log(`✓ video/${name}.png (1920 × 1200)`);
}
rmSync(tmp, { recursive: true, force: true });
