#!/usr/bin/env bash
# ------------------------------------------------------------------
# BauPro Solutions — Bilder in ./images/ laden
#
# index.html verweist bereits auf lokale Pfade (images/hero.jpg usw.).
# Dieses Skript versucht, die KI-Bilder vom CDN herunterzuladen.
# Hinweis: Das CDN kann Hotlink-/Referer-Schutz haben — schlägt der
# Download mit 403 fehl, die 5 Bilder stattdessen direkt in der
# Higgsfield-App herunterladen und mit den unten genannten Namen
# in ./images/ ablegen.
#
# Lokal ausführen:
#   cd baupro-solutions && bash download-images.sh
# ------------------------------------------------------------------
set -uo pipefail

BASE="https://d8j0ntlcm91z4.cloudfront.net/user_3EJSHXzyKhTxalg0QHrH8147AA6"
mkdir -p images

declare -A MAP=(
  ["hero.jpg"]="hf_20260703_043349_81aca0c4-0e5d-4da1-ae27-72ea118170e1.png"
  ["renovationen.jpg"]="hf_20260703_043359_6885ecb1-851e-4f27-a8e5-e914a0fa03c7.png"
  ["betonarbeiten.jpg"]="hf_20260703_043402_32c36d08-aba3-4335-8f24-4c64e89d0ffd.png"
  ["abbruch.jpg"]="hf_20260703_043902_cd375e27-c6f5-49ef-8eb8-b6b8c9bc4653.png"
  ["kernbohrungen.jpg"]="hf_20260703_043903_e816e380-d0fa-4ff8-a5fd-2c855676be87.png"
)

fail=0
for local_name in "${!MAP[@]}"; do
  echo "→ $local_name"
  if ! curl -fsSL "$BASE/${MAP[$local_name]}" -o "images/$local_name"; then
    echo "  ✗ Fehlgeschlagen (evtl. Hotlink-Schutz). Bitte manuell aus der Higgsfield-App laden."
    fail=1
  fi
done

if [ "$fail" -eq 0 ]; then
  echo "✓ Alle Bilder in ./images/ — jetzt committen und pushen."
else
  echo "⚠ Einige Downloads fehlgeschlagen. Bilder manuell in ./images/ ablegen (siehe README)."
fi
