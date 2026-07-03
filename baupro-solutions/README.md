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

## Bilder — WICHTIG

`index.html` verweist auf **lokale Bilder** in `images/`:
`hero.jpg`, `renovationen.jpg`, `betonarbeiten.jpg`, `abbruch.jpg`,
`kernbohrungen.jpg`. Solange diese fehlen, zeigt die Seite einen sauberen
Marken-Platzhalter (kein „kaputtes" Bild).

**Warum lokal statt CDN?** Die KI-Bilder liegen auf dem Higgsfield-CDN, das
Hotlinking (Einbetten auf einer fremden Domain) blockiert — auf `*.vercel.app`
wurden sie deshalb nicht angezeigt. Im Repo/über Vercel ausgeliefert
funktionieren sie zuverlässig.

**So die echten Fotos einsetzen (einmalig):**

1. Die 5 Bilder in der **Higgsfield-App** öffnen und herunterladen.
2. Mit exakt diesen Namen in `images/` ablegen:

   | Datei | Motiv |
   |---|---|
   | `hero.jpg` | Handwerker bei hochwertiger Renovation |
   | `renovationen.jpg` | Fertig renovierte, helle Wohnung |
   | `betonarbeiten.jpg` | Betonwand mit Schalung / Armierung |
   | `abbruch.jpg` | Kontrollierter Innen-Rückbau |
   | `kernbohrungen.jpg` | Diamant-Kernbohrung in Beton |

3. Committen und auf `main` pushen → Vercel deployt automatisch neu.

Alternativ `bash download-images.sh` versuchen (lädt vom CDN; kann bei
Hotlink-Schutz mit 403 fehlschlagen — dann Schritt 1–2 manuell).

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
