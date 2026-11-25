#!/usr/bin/env bash
# Convertit les images téléchargées depuis Gemini et les copie dans le site.
# Usage : bash scripts/importer-images.sh <dossier-des-images>
# Les fichiers doivent déjà porter le nom prévu dans docs/prompts-gemini.md (l'extension peut être .png, .jpg, .jpeg ou .webp).
# Les logos (lumexia-logo*.png, lumexia-icone.png) sont copiés tels quels dans assets/logo/.
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
    lumexia-logo*|lumexia-icone)
      cp "$f" "$LOGO/$name.png"; echo "logo   → assets/logo/$name.png" ;;
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
