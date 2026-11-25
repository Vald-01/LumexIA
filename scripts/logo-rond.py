# Crée les avatars ronds LumexIA (réseaux sociaux, maquettes de posts) à partir des logos détourés.
# Usage : python3 scripts/logo-rond.py   (Pillow et numpy nécessaires)
# Sorties : assets/logo/lumexia-rond.png (mot « lumexIA ») et assets/logo/lumexia-rond-icone.png (arc de lumière)
import numpy as np
from PIL import Image, ImageDraw
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
LOGO = ROOT / 'assets/logo'
N, SS = 1080, 4              # taille finale, suréchantillonnage pour un bord net
NUIT = (16, 22, 43, 255)

def disque(size):
    m = Image.new('L', (size * SS, size * SS), 0)
    ImageDraw.Draw(m).ellipse((0, 0, size * SS - 1, size * SS - 1), fill=255)
    return m.resize((size, size), Image.LANCZOS)

# 1. Le mot « lumexIA » (version inversée) sur un disque Nuit
rond = Image.new('RGBA', (N, N), (0, 0, 0, 0))
fond = Image.new('RGBA', (N, N), NUIT)
rond.paste(fond, (0, 0), disque(N))
mot = Image.open(LOGO / 'lumexia-logo-inverse.png').convert('RGBA')
bbox = mot.getchannel('A').point(lambda a: 255 if a > 20 else 0).getbbox()
mot = mot.crop(bbox)
w = int(N * 0.70)
mot = mot.resize((w, round(mot.height * w / mot.width)), Image.LANCZOS)
rond.alpha_composite(mot, ((N - mot.width) // 2, (N - mot.height) // 2 + 6))
rond.save(LOGO / 'lumexia-rond.png', optimize=True)

# 2. L'icône : on garde seulement l'arc et l'horizon (pixels qui se distinguent du fond du carré),
#    puis on les pose au centre d'un disque de la même couleur, pour qu'aucun bord du carré ne se voie.
ico = Image.open(LOGO / 'lumexia-icone.png').convert('RGBA')
teinte = ico.getpixel((ico.width // 2, round(ico.height * 0.12)))
a = np.asarray(ico).astype(np.float32)
dist = np.max(np.abs(a[..., :3] - np.array(teinte[:3], dtype=np.float32)), axis=2)
alpha = np.clip((dist - 12) / 60, 0, 1) * (a[..., 3] / 255)
motif = Image.fromarray(np.dstack([a[..., :3], alpha * 255]).astype(np.uint8), 'RGBA')
motif = motif.crop(motif.getchannel('A').point(lambda v: 255 if v > 10 else 0).getbbox())
w = round(N * 0.56)
motif = motif.resize((w, round(motif.height * w / motif.width)), Image.LANCZOS)
rond2 = Image.new('RGBA', (N, N), (0, 0, 0, 0))
rond2.paste(Image.new('RGBA', (N, N), teinte[:3] + (255,)), (0, 0), disque(N))
rond2.alpha_composite(motif, ((N - motif.width) // 2, (N - motif.height) // 2))
rond2.save(LOGO / 'lumexia-rond-icone.png', optimize=True)
print('✓ assets/logo/lumexia-rond.png et assets/logo/lumexia-rond-icone.png (1080 × 1080)')
