#!/usr/bin/env bash
# Convertit les images téléchargées depuis Gemini et les copie dans le site.
# Usage : bash scripts/importer-images.sh <dossier-des-images>
# Les fichiers doivent déjà porter le nom prévu dans docs/prompts-gemini.md (l'extension peut être .png, .jpg, .jpeg ou .webp).
# Les logos et l'icône sont ignorés ici : détoure-les avec scripts/detourer-logo.py et scripts/detourer-icone.py (PNG transparents dans assets/logo/).
set -euo pipefail

SRC="${1:?Indique le dossier qui contient les images, par exemple ~/Downloads/lumexia}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$ROOT/site/assets/img"
LOGO="$ROOT/assets/logo"
mkdir -p "$OUT" "$LOGO"

shopt -s nullglob nocaseglob
count=0
for f in "$SRC"/*.{png,jpg,jpeg,webp}; do
  name="$(basename "${f%.*}")"
  case "$name" in
    lumexia-icone)
      echo "icône  → ignorée : python3 scripts/detourer-icone.py \"$f\" assets/logo/$name.png"; continue ;;
    lumexia-logo*)
      echo "logo   → ignoré : python3 scripts/detourer-logo.py \"$f\" assets/logo/$name.png"; continue ;;
    og-lumexia)
      # Image de partage : 1200 × 630, recadrée au centre
      sips -s format jpeg -s formatOptions 82 --resampleWidth 1200 "$f" --out "$OUT/$name.jpg" >/dev/null
      sips -c 630 1200 "$OUT/$name.jpg" >/dev/null
      echo "partage → site/assets/img/$name.jpg (1200 × 630)" ;;
    *)
      # Largeur maximale 1600 px, JPEG qualité 80
      sips -s format jpeg -s formatOptions 80 -Z 1600 "$f" --out "$OUT/$name.jpg" >/dev/null
      echo "image  → site/assets/img/$name.jpg ($(du -k "$OUT/$name.jpg" | cut -f1) Ko)" ;;
  esac
  count=$((count + 1))
done
echo "$count fichier(s) traité(s). Lance maintenant : node src/build.mjs"
