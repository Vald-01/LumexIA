# Détoure l'icône LumexIA (carré Nuit sur fond clair) et l'enregistre en PNG transparent.
# Usage : python3 scripts/detourer-icone.py assets/gemini/lumexia-icone.jpg assets/logo/lumexia-icone.png
# Nécessite Pillow et numpy. Contrairement au logo, on ne rend transparent que le fond extérieur
# (remplissage depuis les coins) : l'arc et la ligne à l'intérieur du carré restent opaques.
import sys, numpy as np
from PIL import Image, ImageDraw, ImageFilter
src, out = sys.argv[1], sys.argv[2]
im = Image.open(src).convert('RGB')
a = np.asarray(im).astype(np.float32)
h, w, _ = a.shape
bg = np.median(np.concatenate([a[:30, :30].reshape(-1, 3), a[-30:, -30:].reshape(-1, 3)]), axis=0)
dist = np.max(np.abs(a - bg), axis=2)
# zone extérieure : pixels proches du fond reliés aux coins
near = Image.fromarray(((dist < 60) * 255).astype(np.uint8)).copy()  # copie : image modifiable
for xy in [(0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1)]:
    ImageDraw.floodfill(near, xy, 128)
outside = np.asarray(near) == 128
edge = np.asarray(Image.fromarray((outside * 255).astype(np.uint8)).filter(ImageFilter.MaxFilter(7))) > 0
# alpha : 0 dehors, dégradé sur le bord (anticrénelage), 1 dedans
ramp = np.clip((dist - 8) / 200, 0, 1)
alpha = np.where(outside, 0, np.where(edge, ramp, 1))
alpha = np.where(outside & (ramp > 0.5), ramp, alpha)
safe = np.maximum(alpha, 1e-3)[..., None]
fg = np.clip(bg + (a - bg) / safe, 0, 255)
fg = np.where(alpha[..., None] > 0.999, a, fg)
ys, xs = np.where(alpha > 0.05)
pad = 8
box = (max(0, xs.min() - pad), max(0, ys.min() - pad), min(w, xs.max() + pad), min(h, ys.max() + pad))
rgba = Image.fromarray(np.dstack([fg, alpha * 255]).astype(np.uint8), 'RGBA').crop(box)
rgba.save(out, optimize=True)
print(out, rgba.size)
