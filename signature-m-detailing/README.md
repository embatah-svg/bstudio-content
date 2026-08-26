# Signature M Detailing — Demo Premium (One-Page Website)

Sito one-page premium per **Signature M Detailing** (aufbereitung / detailing auto).
Copy in **tedesco (de-CH)**, mercato Svizzera tedesca — coerente con il resto del
pacchetto B.Studio. HTML/CSS/JS statico, **nessun build**: apri `index.html` nel
browser o carica la cartella su qualsiasi hosting.

> ⚠️ **I dati sono segnaposto.** Instagram non era raggiungibile dalla sessione in cui
> è stata costruita la demo (proxy di rete), quindi telefono, indirizzo, prezzi e
> recensioni sono placeholder marcati. Vedi *Dati da sostituire* qui sotto — con
> `node apply-data.mjs` li sostituisci tutti in un colpo solo.

## File

```
signature-m-detailing/
├── index.html        # struttura + contenuti (tedesco de-CH)
├── styles.css        # design system (nero + oro champagne, Sora/Manrope/JetBrains Mono)
├── script.js         # nav, menu mobile, scroll-reveal, slider Vorher/Nachher, form
├── apply-data.mjs    # sostituisce tutti i placeholder con i dati veri (node)
├── images/           # logo SVG + qui vanno le foto (vedi sotto)
└── README.md
```

## Cosa contiene la pagina

| Sezione | Contenuto |
|---|---|
| Hero | claim "Nicht gewaschen. Signiert.", 2 CTA, 3 proof-point (48 h / 9H / 100 % Handarbeit) |
| Marquee | fascia scorrevole con le prestazioni |
| Leistungen | 6 servizi: Aussen, Innen, Lackkorrektur, Keramik, Leder & Geruch, Verkaufsaufbereitung |
| **Vorher / Nachher** | slider trascinabile (mouse, touch e tastiera) con 3 casi selezionabili |
| Pakete | 3 pacchetti — Frische / **Signature** (evidenziato) / Signature Keramik |
| Ablauf | 4 step: foto → offerta → lavorazione → riconsegna |
| Galerie | griglia 5 immagini + link al profilo Instagram |
| Stimmen | 3 recensioni — **testi d'esempio**, da sostituire o rimuovere |
| FAQ | 5 domande (durata keramik, graffi, tempi, ritiro, prezzi) |
| Kontakt | form (Formspree) + telefono/WhatsApp/e-mail/orari + mappa |
| Footer | link, Impressum e Datenschutz in accordion |
| Extra | pulsante WhatsApp fisso, dati strutturati schema.org `AutoDetailing`, favicon, Open Graph |

## Dati da sostituire

Apri `apply-data.mjs`, compila l'oggetto `DATEN` e lancia:

```bash
node apply-data.mjs --dry-run   # mostra cosa cambierebbe
node apply-data.mjs             # scrive in index.html
```

Sostituisce automaticamente in tutte le occorrenze (~39 punti):

| Placeholder | Dove appare |
|---|---|
| `+41 XX XXX XX XX` | nav, contatti, footer, form di conferma, Impressum |
| `+41000000000` | link `tel:` e schema.org |
| `wa.me/41000000000` | pulsante WhatsApp fisso |
| `info@signature-m-detailing.ch` | contatti, footer, Impressum, Datenschutz |
| `Musterstrasse 00` · `0000 Ort` | contatti, footer, Impressum, schema.org, mappa Google |
| `Region Ort` | occhiello dell'hero |
| `YOUR_FORM_ID` | endpoint Formspree del form |

**Da controllare a mano** (non li tocca lo script):

- **Prezzi** dei 3 pacchetti (CHF 190 / 490 / 1'190) e le durate — sono stime di mercato.
- **Orari di apertura** (Mo–Fr 08:00–18:00, Sa 09:00–16:00) in `#kontakt` e nello schema.org.
- **Stimmen**: le 3 recensioni sono `Beispieltext` (badge visibile). Sostituirle con
  recensioni vere o eliminare l'intera sezione `<section id="stimmen">`.
- **Impressum**: titolare, forma giuridica e n. IVA/UID.

## Immagini

`index.html` punta a file locali in `images/`. Finché mancano, la pagina mostra un
placeholder di marca elegante (mai un'immagine rotta), quindi la demo si può già
presentare così com'è.

| File | Motivo |
|---|---|
| `hero.jpg` | auto finita, luce da officina (verticale/quadrata) |
| `aussen.jpg` · `innen.jpg` · `politur.jpg` · `keramik.jpg` · `leder.jpg` · `felgen.jpg` | i 6 servizi |
| `case1-vorher.jpg` / `case1-nachher.jpg` | slider — correzione vernice |
| `case2-vorher.jpg` / `case2-nachher.jpg` | slider — interni |
| `case3-vorher.jpg` / `case3-nachher.jpg` | slider — cerchi |
| `gal-1.jpg` … `gal-5.jpg` | galleria |

Per lo slider servono **due scatti dallo stesso punto e con la stessa inquadratura**,
altrimenti il confronto non funziona. Le foto Instagram del cliente vanno benissimo:
esportale a 1600 px sul lato lungo, JPG qualità ~80.

## Logo

Logo vettoriale in `images/`:

- `logo.svg` — lockup per fondi chiari
- `logo-inverse.svg` — lockup per fondi scuri
- `logo-mark.svg` — solo il simbolo (avatar social, app icon, timbro)

Simbolo = "M" stilizzata dentro un sigillo (la *signature*); lettering in Sora,
sottotitolo `DETAILING` in JetBrains Mono, oro champagne `#c9a24a`.

## Form di contatto (Formspree)

Il form è già pronto per **Formspree** (invio asincrono con stato di caricamento,
successo ed errore, honeypot antispam):

1. Registrati su [formspree.io](https://formspree.io) e crea un form verso l'e-mail del cliente.
2. Copia la Form-ID (es. `xabcdefg`) in `apply-data.mjs` → `formspreeId`, oppure sostituisci
   a mano `YOUR_FORM_ID` in `index.html`.

Finché la ID non è stata inserita, il form mostra una **conferma demo** (non invia
nulla): così durante la presentazione l'interfaccia non sembra mai rotta.

## Pubblicare

Cartella statica, funziona ovunque:

```bash
# anteprima locale
python3 -m http.server 8080 --directory signature-m-detailing
# → http://localhost:8080
```

Per Vercel/Netlify basta puntare la root del progetto a questa cartella, oppure
trascinarla nella dashboard di Netlify Drop per un link condivisibile al cliente.

## Personalizzare

- **Colori / tipografia:** variabili CSS in `:root` (`styles.css`) — l'oro è `--gold`.
- **Testi:** direttamente in `index.html`.
- **Ordine delle sezioni:** i blocchi `<section>` sono indipendenti, si spostano o
  si eliminano senza rompere il layout.
