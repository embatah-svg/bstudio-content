#!/usr/bin/env bash
# ------------------------------------------------------------------
# BauPro Solutions — Bilder lokalisieren
# Lädt die KI-generierten Bilder vom CDN in ./images/ herunter und
# ersetzt die CDN-URLs in index.html durch lokale Pfade.
#
# Lokal ausführen (nicht in der Sandbox — dort ist das CDN gesperrt):
#   cd baupro-solutions
#   bash download-images.sh
# ------------------------------------------------------------------
set -euo pipefail

BASE="https://d8j0ntlcm91z4.cloudfront.net/user_3EJSHXzyKhTxalg0QHrH8147AA6"
HTML="index.html"
mkdir -p images

# Ziel-Dateiname  ->  CDN-Dateiname
declare -A MAP=(
  ["hero.png"]="hf_20260703_043349_81aca0c4-0e5d-4da1-ae27-72ea118170e1.png"
  ["renovationen.png"]="hf_20260703_043359_6885ecb1-851e-4f27-a8e5-e914a0fa03c7.png"
  ["betonarbeiten.png"]="hf_20260703_043402_32c36d08-aba3-4335-8f24-4c64e89d0ffd.png"
  ["abbruch.png"]="hf_20260703_043902_cd375e27-c6f5-49ef-8eb8-b6b8c9bc4653.png"
  ["kernbohrungen.png"]="hf_20260703_043903_e816e380-d0fa-4ff8-a5fd-2c855676be87.png"
)

for local_name in "${!MAP[@]}"; do
  remote="${MAP[$local_name]}"
  echo "→ Lade $local_name"
  curl -fsSL "$BASE/$remote" -o "images/$local_name"
  # CDN-URL in der HTML durch lokalen Pfad ersetzen
  sed -i.bak "s#$BASE/$remote#images/$local_name#g" "$HTML"
done

rm -f "$HTML.bak"
echo "✓ Fertig. Bilder liegen in ./images/ und index.html verweist lokal darauf."
