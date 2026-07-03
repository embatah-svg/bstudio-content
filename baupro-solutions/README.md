# BauPro Solutions GmbH — Website

Premium One-Page-Website für **BauPro Solutions GmbH** (Bau & Renovation, Bern & Umgebung).
Leistungen: Renovationen · Betonarbeiten · Abbruch · Kernbohrungen.

## Dateien

```
baupro-solutions/
├── index.html      # Struktur & Inhalte (Deutsch, de-CH)
├── styles.css      # Design-System (Beton-Grau + Signalrot, Archivo/Manrope)
├── script.js       # Navigation, Mobile-Menü, Scroll-Reveal, Formular-Validierung
├── images/         # (leer) — optional für lokale Bilder, siehe unten
└── README.md
```

Reines statisches HTML/CSS/JS — **kein Build nötig**. `index.html` in jedem
Browser öffnen oder auf beliebigem Webhost (Netlify, Vercel, GitHub Pages,
Hosting-Anbieter) hochladen.

## Bilder

Die Bilder wurden mit KI generiert und liegen aktuell auf einem CDN
(`https://d8j0ntlcm91z4.cloudfront.net/...`). Sie werden im Browser direkt
geladen.

**Für ein vollständig eigenständiges Deployment** empfohlen: die 5 Bilder
herunterladen, in `images/` ablegen (z. B. `hero.jpg`, `renovationen.jpg`,
`betonarbeiten.jpg`, `abbruch.jpg`, `kernbohrungen.jpg`) und die CDN-URLs in
`index.html` durch die lokalen Pfade ersetzen (Suchen/Ersetzen der
`https://d8j0ntlcm91z4...`-URLs).

## Kontaktformular

Das Formular validiert im Browser und zeigt eine Bestätigung. Es ist noch **nicht
an ein Backend angebunden**. Vor dem Livegang eine der Optionen wählen:

- **Formspree / Basin / Getform** — `action`-URL im `<form>` eintragen.
- **`mailto:`** — schneller Zwischenschritt (öffnet das Mailprogramm).
- Eigenes Endpoint / CMS.

Siehe Kommentar in `script.js` (`// Demo: no backend wired`).

## Anpassen

- **Farben / Typo:** CSS-Variablen in `:root` (`styles.css`).
- **Inhalte / Texte:** direkt in `index.html`.
- **Google-Maps-Standort:** `iframe`-`src` im Abschnitt `#kontakt`.
- **Kontaktdaten:** Telefon `076 488 55 83`, E-Mail `info@baupro-nuhiu.ch`,
  Adresse `Worblentalstrasse 71, 3063 Ittigen`.
