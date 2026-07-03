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

**Für ein vollständig eigenständiges Deployment** einfach lokal ausführen:

```bash
cd baupro-solutions
bash download-images.sh
```

Das Skript lädt die 5 Bilder nach `images/` und stellt `index.html` automatisch
auf lokale Pfade um. (In der Cloud-Sandbox ist das CDN gesperrt — daher lokal
ausführen.)

## Kontaktformular (Formspree)

Das Formular ist bereits für **Formspree** vorbereitet (asynchroner Versand mit
Lade-, Erfolgs- und Fehlerzustand, Spam-Honeypot). Zum Aktivieren:

1. Auf [formspree.io](https://formspree.io) kostenlos registrieren und ein neues
   Formular mit der Zieladresse `info@baupro-nuhiu.ch` anlegen.
2. Die Form-ID kopieren (z. B. `xayzqwer`).
3. In `index.html` im `<form>` das `action` anpassen:
   `action="https://formspree.io/f/DEINE_FORM_ID"` — dabei `YOUR_FORM_ID` ersetzen.

Fertig. Solange `YOUR_FORM_ID` nicht ersetzt ist, zeigt das Formular eine
Demo-Bestätigung (nichts wird versendet), damit die Oberfläche nie kaputt wirkt.
Die erste echte Einsendung muss bei Formspree einmalig per E-Mail bestätigt werden.

## Anpassen

- **Farben / Typo:** CSS-Variablen in `:root` (`styles.css`).
- **Inhalte / Texte:** direkt in `index.html`.
- **Google-Maps-Standort:** `iframe`-`src` im Abschnitt `#kontakt`.
- **Kontaktdaten:** Telefon `076 488 55 83`, E-Mail `info@baupro-nuhiu.ch`,
  Adresse `Worblentalstrasse 71, 3063 Ittigen`.
