// Génère le rapport d'examen en PDF : docs/rapport/LumexIA-rapport.pdf
// Usage : node src/rapport.mjs            (captures du site + images + PDF)
//         node src/rapport.mjs --pdf      (PDF seulement, si les images existent déjà)
// Le texte du rapport est dans docs/rapport/rapport.html (à modifier là, puis relancer).
import { mkdirSync, mkdtempSync, rmSync, existsSync, copyFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { execFileSync } from 'node:child_process';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIR = join(ROOT, 'docs/rapport');
const IMG = join(DIR, 'img');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
if (!existsSync(CHROME)) { console.error('Google Chrome introuvable.'); process.exit(1); }
mkdirSync(IMG, { recursive: true });
const tmp = mkdtempSync(join(tmpdir(), 'lumexia-rapport-'));
const chrome = (args) => execFileSync(CHROME, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=1',
  '--allow-file-access-from-files', `--user-data-dir=${join(tmp, 'profil')}`, ...args], { stdio: 'ignore' });
const jpg = (src, out, width) => execFileSync('sips', ['-s', 'format', 'jpeg', '-s', 'formatOptions', '78', '--resampleWidth', String(width), src, '--out', out], { stdio: 'ignore' });

if (!process.argv.includes('--pdf')) {
  // 1. Captures du site (fichiers locaux de site/)
  const captures = [
    ['site-accueil', 'index.html', 1440, 2300],
    ['site-catalogue', 'produits/index.html', 1440, 1500],
    ['site-fiche', 'produits/lumex-halo/index.html', 1440, 1700],
    ['site-black-friday', 'black-friday/index.html', 1440, 2600],
    ['site-lumex-sense', 'lumex-sense/index.html', 1440, 1100],
    ['site-mobile', 'index.html', 390, 844],
    ['site-mobile-bf', 'black-friday/index.html', 390, 844],
  ];
  for (const [name, page, w, h] of captures) {
    const png = join(tmp, `${name}.png`);
    chrome([`--window-size=${w},${h}`, '--virtual-time-budget=10000', `--screenshot=${png}`, pathToFileURL(join(ROOT, 'site', page)).href]);
    jpg(png, join(IMG, `${name}.jpg`), Math.min(w, 1200));
    console.log(`capture → docs/rapport/img/${name}.jpg`);
  }
  // 2. Miniatures des images de marque, des posts et de la vidéo
  const thumbs = [
    ...['produit-lumex-bulb', 'produit-lumex-halo', 'produit-lumex-orbe', 'ambiance-lumex-strip', 'ambiance-lumex-aube', 'hero-salon-soir', 'marque-atelier', 'cible-jeunes-actifs'].map((n) => [`site/assets/img/${n}.jpg`, n, 600]),
    ...['p1-story-teaser', 'p2-post-pack-bf', 'p3-carrousel-arc-1', 'p3-carrousel-arc-2', 'p6-linkedin-prix', 'p8-carrousel-economies-2', 'p7-post-halo', 'p9-reel-bulb'].map((n) => [`social/visuels/${n}.png`, n, 540]),
    ['video/moodboard.png', 'moodboard', 1400], ['video/storyboard.png', 'storyboard', 1400],
    ['assets/gemini/lumexia-logo.jpg', 'logo-gemini-brut', 700],
  ];
  for (const [src, name, w] of thumbs) jpg(join(ROOT, src), join(IMG, `${name}.jpg`), w);
  for (const f of ['lumexia-logo.png', 'lumexia-logo-inverse.png', 'lumexia-icone.png', 'lumexia-rond.png']) copyFileSync(join(ROOT, 'assets/logo', f), join(IMG, f));
  console.log(`✓ ${thumbs.length + 4} images copiées dans docs/rapport/img/`);
}

// 3. Le PDF
const out = join(DIR, 'LumexIA-rapport.pdf');
chrome(['--no-pdf-header-footer', '--virtual-time-budget=12000', `--print-to-pdf=${out}`, pathToFileURL(join(DIR, 'rapport.html')).href]);
rmSync(tmp, { recursive: true, force: true });
console.log('✓ docs/rapport/LumexIA-rapport.pdf');
