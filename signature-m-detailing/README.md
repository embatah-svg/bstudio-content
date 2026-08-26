# Signature Mobile Detailing — Demo Premium (One-Page Website)

Sito one-page premium per **Signature Mobile Detailing** (@signature.m.detailing).
Copy in **tedesco (de-CH)**, posizionamento reale: *Premium Interior Detailing,
servizio **mobile** in tutta la Svizzera*. HTML/CSS/JS statico, **nessun build**:
apri `index.html` nel browser o carica la cartella su qualsiasi hosting.

## Dati presi dal profilo Instagram (reali)

| Dato | Valore |
|---|---|
| Nome | Signature Mobile Detailing |
| Handle | [@signature.m.detailing](https://www.instagram.com/signature.m.detailing) |
| Posizionamento | Premium Interior Detailing · mobiler Service schweizweit |
| Servizi | Tiefenreinigung Fahrzeuginnenräume · Lackveredelung Aussenbereich · Geruchsbehandlungen · Mobiler Service Schweizweit |
| Claim | „Premium Pflege. Überall in der Schweiz." · „Jetzt Termin buchen" |
| Contatto | WhatsApp `wa.me/qr/DLJWM4OPHJW2A1` + DM Instagram |
| Highlights | *the results* · *interior* |

Le descrizioni dei servizi nella sezione **Leistungen** riprendono i testi della
loro card promozionale (Tiefenreinigung / Fahrzeugverschönerung / Geruchsbehandlungen
/ Mobiler Service), riscritti per il web.

## Cosa resta da completare (placeholder)

| Cosa | Dove | Come |
|---|---|---|
| **E-mail** `info@signature-mobile-detailing.ch` | contatti, footer, Impressum, schema.org | `apply-data.mjs` |
| **Form-ID Formspree** `YOUR_FORM_ID` | form di contatto | `apply-data.mjs` |
| **Prezzi** CHF 190 / 390 / 590 e durate | sezione Pakete | a mano — sono proposte a livello di mercato CH |
| **Impressum** (titolare, forma giuridica, indirizzo, UID/IVA) | footer | a mano — obbligatorio in CH per siti commerciali |
| **Stimmen** (3 recensioni con badge `Beispieltext`) | sezione Stimmen | sostituire con recensioni vere o eliminare `<section id="stimmen">` |
| **Einsatzgebiet** (cantoni elencati) | sezione Kontakt | a mano, se il raggio d'azione è diverso |
| **Foto** | `images/` | vedi sotto |

Per i primi due:

```bash
node apply-data.mjs --dry-run   # mostra cosa cambierebbe
node apply-data.mjs             # scrive in index.html
```

Il link WhatsApp è già quello vero; se il cliente preferisce un numero diretto,
basta metterlo in `DATEN.whatsappUrl` come `https://wa.me/41XXXXXXXXX`.

## Cosa contiene la pagina

| Sezione | Contenuto |
|---|---|
| Hero | „Nicht gereinigt. **Signiert.**" + 3 proof-point (Schweizweit / Interior / Termin per WhatsApp) |
| Marquee | fascia scorrevole con le prestazioni |
| Leistungen | 6 servizi: Innenräume, Lackveredelung, Geruchsbehandlungen, Mobiler Service, Polster & Leder, Verkaufsaufbereitung |
| **Resultate** | slider Vorher/Nachher trascinabile (mouse, touch, tastiera) con 3 casi — richiama l'highlight *the results* |
| Pakete | Interior / **Signature** (evidenziato) / Signature Plus |
| Ablauf | 4 step: foto via WhatsApp → offerta → **veniamo noi da te** → riconsegna |
| Galerie | griglia 5 immagini + link al profilo |
| Stimmen | 3 recensioni segnaposto |
| FAQ | 5 domande tarate sul servizio mobile (cosa serve sul posto, raggio d'azione, durata, odori, prezzi) |
| Kontakt | form + WhatsApp/Instagram/e-mail + pannello Einsatzgebiet (niente indirizzo: non hanno officina) |
| Footer | link, Impressum e Datenschutz in accordion |
| Extra | WhatsApp fisso, schema.org `AutoDetailing` con `areaServed: Schweiz`, Open Graph, favicon |

## Immagini

`index.html` punta a file locali in `images/`. Finché mancano, la pagina mostra un
placeholder di marca elegante (mai un'immagine rotta): la demo si può già presentare
così com'è.

| File | Motivo | Suggerimento dal loro feed |
|---|---|---|
| `hero.jpg` | interno appena finito, luce naturale | uno scatto interior dall'highlight *interior* |
| `innen.jpg` | tiefenreinigung interni | — |
| `aussen.jpg` | lackveredelung / lucentezza | BMW Serie 5 verde |
| `geruch.jpg` | trattamento odori (abitacolo, bocchette) | — |
| `mobil.jpg` | il van/attrezzatura sul posto | il van del logo o una foto in loco |
| `leder.jpg` | sedili e pelle | — |
| `verkauf.jpg` | auto pronta per l'annuncio | BMW X1 bianca |
| `case1-vorher/nachher.jpg` | slider — interni | dall'highlight *the results* |
| `case2-vorher/nachher.jpg` | slider — sedili/tessuti | — |
| `case3-vorher/nachher.jpg` | slider — vernice | coupé nera |
| `gal-1.jpg` … `gal-5.jpg` | galleria | i 5 post del profilo |

Per lo slider servono **due scatti dallo stesso punto e con la stessa inquadratura**,
altrimenti il confronto non funziona. Esporta a 1600 px sul lato lungo, JPG qualità ~80.

## Logo

In `images/` c'è una versione vettoriale (stemma + silhouette dell'auto, oro
champagne) che richiama il loro logo:

- `logo.svg` — lockup per fondi chiari
- `logo-inverse.svg` — lockup per fondi scuri
- `logo-mark.svg` — solo lo stemma (avatar social, app icon)

⚠️ Il cliente **ha già un logo** (stemma con silhouette e corona, oro/cromo). Se ha
il file originale (PNG a fondo trasparente o vettoriale), è quello da usare: sostituisci
i tre SVG e il markup inline nel `<header>`/`<footer>` di `index.html`.

## Form di contatto (Formspree)

Il form è già pronto per **Formspree** (invio asincrono con stato di caricamento,
successo ed errore, honeypot antispam):

1. Registrati su [formspree.io](https://formspree.io) e crea un form verso l'e-mail del cliente.
2. Copia la Form-ID (es. `xabcdefg`) in `apply-data.mjs` → `formspreeId`.

Finché la ID non è inserita, il form mostra una **conferma demo** (non invia nulla):
durante la presentazione l'interfaccia non sembra mai rotta.

## Pubblicare

```bash
# anteprima locale
python3 -m http.server 8080 --directory signature-m-detailing
# → http://localhost:8080
```

Per Vercel/Netlify basta puntare la root del progetto a questa cartella, oppure
trascinarla in Netlify Drop per un link condivisibile al cliente.

## Personalizzare

- **Colori / tipografia:** variabili CSS in `:root` (`styles.css`) — l'oro è `--gold`.
- **Testi:** direttamente in `index.html`.
- **Ordine delle sezioni:** i blocchi `<section>` sono indipendenti, si spostano o si
  eliminano senza rompere il layout.
