# Secondo Livello — Sito web

One-page premium per **Secondo Livello**, lounge bar in Piazza Roma a Ghedi (BS).
Momenti del locale: colazioni · pranzi · aperitivi · feste ed eventi.

## File

```
secondo-livello/
├── index.html      # struttura e contenuti (italiano, it-IT)
├── styles.css      # design system (notte + ottone caldo, Fraunces/Manrope/JetBrains Mono)
├── script.js       # nav, menu mobile, scroll reveal, fallback immagini, validazione form
├── images/         # loghi SVG + (da aggiungere) le foto del locale
└── README.md
```

HTML/CSS/JS statico — **nessun build**. Si apre `index.html` in qualsiasi browser
oppure si carica su un hosting statico (Vercel, Netlify, GitHub Pages, hosting classico).

## ⚠️ Da confermare col cliente prima del lancio

I dati pubblici sono stati raccolti da Instagram, Facebook e directory locali:
**vanno verificati con il titolare** prima di andare online.

| Dato | Valore usato nel sito | Nota |
|---|---|---|
| Indirizzo | Piazza Roma 31, 25016 Ghedi (BS) | una directory riporta civico 23 → **confermare** |
| Telefono | 030 905 0262 | ricavato da directory → **confermare** |
| E-mail | secondo.livello89@gmail.com | da IG/directory |
| Orari | apertura 07:00, pranzo 12:00, aperitivo 18:00 | **manca il giorno di chiusura e l'orario di chiusura esatto** |
| Ragione sociale / P. IVA | non inserita | obbligatoria nelle *Note legali* |

Gli orari nel sito sono volutamente descrittivi (`#contatti` → blocco "Orari"):
appena si hanno gli orari certi, sostituire il paragrafo con la tabella giorno per giorno.

## Immagini

`index.html` usa **immagini locali** in `images/`:
`hero.jpg`, `colazioni.jpg`, `pranzi.jpg`, `aperitivi.jpg`, `feste.jpg`, `locale.jpg`.

Finché mancano, la pagina mostra un placeholder di marca elegante (mai un'immagine rotta).

| File | Soggetto consigliato |
|---|---|
| `hero.jpg` | il bancone durante l'aperitivo, luce calda (4:3) |
| `colazioni.jpg` | cappuccino e brioche al bancone |
| `pranzi.jpg` | tavolo apparecchiato per la pausa pranzo |
| `aperitivi.jpg` | cocktail e tagliere |
| `feste.jpg` | serata karaoke / festa privata |
| `locale.jpg` | sala e dehors in Piazza Roma |

Consigli: JPG ottimizzati (≤ 400 KB), lato lungo 1600–2000 px. Ottime le foto già
pubblicate su [@secondo.livello](https://www.instagram.com/secondo.livello/) — con
il consenso di chi le ha scattate.

## Logo

Logo vettoriale (SVG, scalabile) in `images/`:

- `logo.svg` — lockup per sfondi chiari
- `logo-inverse.svg` — lockup per sfondi scuri
- `logo-mark.svg` — solo il simbolo (icona app, social, timbro)

Il simbolo è una coppa con la linea del liquido evidenziata in ottone: **il secondo
livello**. Wordmark in Fraunces, riga di servizio in JetBrains Mono.

## Modulo contatti (Formspree)

Il form è già pronto per **Formspree** (invio asincrono con stati di caricamento,
successo ed errore, honeypot anti-spam). Per attivarlo:

1. Registrarsi gratis su [formspree.io](https://formspree.io) e creare un form con
   destinatario `secondo.livello89@gmail.com`.
2. Copiare l'ID del form (es. `xayzqwer`).
3. In `index.html`, nel tag `<form>`, sostituire l'`action`:
   `action="https://formspree.io/f/IL_TUO_FORM_ID"` al posto di `YOUR_FORM_ID`.

Finché `YOUR_FORM_ID` non viene sostituito, il form mostra una conferma dimostrativa
(non invia nulla) così l'interfaccia non sembra mai rotta. La prima richiesta reale
va confermata una tantum via e-mail su Formspree.

## Personalizzazione

- **Colori / tipografia:** variabili CSS in `:root` (`styles.css`). Le sezioni chiare
  ribaltano i token in `.section--cream, .section--about`.
- **Testi:** direttamente in `index.html`.
- **Mappa:** `src` dell'`iframe` nella sezione `#contatti`.
- **Contatti:** telefono `030 905 0262`, e-mail `secondo.livello89@gmail.com`,
  indirizzo `Piazza Roma 31, 25016 Ghedi (BS)`.
- **CTA mobile:** il pulsante fisso "Chiama" (`.fab`) compare sotto gli 860 px.

## SEO

Title/description, canonical, Open Graph, favicon SVG e dati strutturati
`schema.org/BarOrPub` (indirizzo, telefono, social) sono già in `index.html`.
Aggiornare `canonical` e `og:url` se il dominio finale è diverso da
`https://barsecondolivello.it/`.
