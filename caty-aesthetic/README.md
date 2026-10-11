# Caty Aesthetic — Website

One-Page-Website für **Caty Aesthetic** (Ästhetik, Zürich) — Instagram: [@caty.aesthetic](https://www.instagram.com/caty.aesthetic/).
Behandlungen: Lippen mit Hyaluron · Nasenkorrektur ohne OP · Augenringe (Rejuran, Juvelook, Lumi Eyes).

## Dateien
```
caty-aesthetic/
├── index.html   # Inhalte (Deutsch, de-CH)
├── styles.css   # Design-System (Espresso/Mokka/Creme · Cormorant Garamond + Jost)
├── script.js    # Header, Mobile-Menü, Scroll-Reveal, Formular (Formspree)
└── images/      # Fotos aus dem Instagram-Profil (lokal gehostet)
```
Statisch, kein Build nötig.

## Deploy (Vercel, wie BauPro)
Neues Vercel-Projekt aus `embatah-svg/bstudio-content`, **Root Directory = `caty-aesthetic`**,
Framework „Other", kein Build-Command. Canonical/OG-URLs sind auf
`https://caty-aesthetic.vercel.app/` gesetzt — bei anderer Domain in `index.html` ersetzen.

## Logo
Vektor-Logo (SVG) in `images/`:
- `logo.svg` — Lockup für helle Hintergründe
- `logo-inverse.svg` — Lockup für dunkle Hintergründe
- `logo-mark.svg` — nur das Monogramm «C» (Profilbild, Social, Stempel)

## Bilder
Fotos liegen lokal in `images/` (Instagram-CDN blockiert Hotlinking und die Links laufen ab).
Fehlt ein Bild, zeigt die Seite automatisch einen Marken-Platzhalter statt eines kaputten Bildes.

## Vor dem Go-live ausfüllen
1. **Formular:** in `index.html` `YOUR_FORM_ID` durch die Formspree-ID ersetzen (bis dahin verweist das Formular auf Instagram-DM).
2. **Impressum:** Name, Adresse und E-Mail im Footer eintragen (Platzhalter `[...]`).
3. **Sprachen:** «DE · ES · EN» wurde aus den Flaggen im Instagram-Profil abgeleitet — bitte bestätigen.
4. Optional: Telefon/WhatsApp, Adresse des Studios, Preise, Online-Buchungslink ergänzen.
