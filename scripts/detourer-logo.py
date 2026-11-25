# Détoure un logo généré par Gemini (fond uni) et l'enregistre en PNG transparent.
# Usage : python3 scripts/detourer-logo.py assets/gemini/lumexia-logo.jpg assets/logo/lumexia-logo.png
# Nécessite Pillow et numpy (pip install pillow numpy).
# Méthode « color to alpha » : la couleur du fond est lue dans les coins, puis retirée de chaque pixel.
# Si Gemini a ajouté une copie floue du logo, seul le bloc de dessin le plus massif est gardé.
import sys, numpy as np
from PIL import Image
src, out = sys.argv[1], sys.argv[2]
a = np.asarray(Image.open(src).convert('RGB')).astype(np.float32)
h, w, _ = a.shape
corners = np.concatenate([a[:40,:40].reshape(-1,3), a[:40,-40:].reshape(-1,3), a[-40:,:40].reshape(-1,3), a[-40:,-40:].reshape(-1,3)])
bg = np.median(corners, axis=0)
d = a - bg
maxd = np.maximum(np.where(d > 0, 255 - bg, bg), 80)
alpha = np.max(np.abs(d) / np.maximum(maxd, 1), axis=2)
# bruit JPEG et fond légèrement non uniforme : seuil puis ré-étalement
lo, hi = 0.10, 0.85
alpha = np.clip((alpha - lo) / (hi - lo), 0, 1)
safe = np.maximum(alpha, 1e-3)[..., None]
fg = np.clip(bg + d / np.maximum(np.max(np.abs(d) / np.maximum(maxd, 1), axis=2), 1e-3)[..., None], 0, 255)
rows = (alpha > 0.5).sum(axis=1)
# segments de lignes contenant du dessin
segs, inside = [], False
for y, r in enumerate(rows):
    if r > 3 and not inside: start, inside = y, True
    if r <= 3 and inside: segs.append((start, y)); inside = False
if inside: segs.append((start, h))
print('fond', bg.round())
# on garde le segment le plus « massif » (le vrai logo), pas la copie floue
best = max(segs, key=lambda s: rows[s[0]:s[1]].sum())
y0, y1 = best
mask = np.zeros_like(alpha); mask[max(0,y0-40):min(h,y1+40)] = 1
alpha *= mask
ys, xs = np.where(alpha > 0.02)
pad = 60
y0, y1 = max(0, ys.min()-pad), min(h, ys.max()+pad)
x0, x1 = max(0, xs.min()-pad), min(w, xs.max()+pad)
rgba = np.dstack([fg, alpha*255]).astype(np.uint8)[y0:y1, x0:x1]
Image.fromarray(rgba, 'RGBA').save(out, optimize=True)
print(out, rgba.shape)
