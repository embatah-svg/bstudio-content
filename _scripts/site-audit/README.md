# Site Audit → PDF

Analizza un sito web con un browser reale e produce un **PDF pronto da consegnare al cliente**:
screenshot annotati, spiegazione di ogni problema in linguaggio non tecnico e piano di intervento
in ordine di priorità.

Nasce per la conversazione più difficile del mestiere: il cliente convinto che il suo sito vada
bene. Il report non esprime giudizi di gusto — solo misure verificabili da chiunque con gli stessi
strumenti gratuiti (Chrome DevTools, PageSpeed Insights, Search Console).

## Installazione

```bash
cd _scripts/site-audit
npm install
npx playwright install chromium   # solo la prima volta
```

## Uso

```bash
node audit.mjs https://esempio.ch --cliente "Nome Salone"
```

| Opzione | Effetto |
|---|---|
| `--out <cartella>` | dove scrivere il report (default `report-<dominio>`) |
| `--cliente "<nome>"` | nome stampato in copertina |
| `--ignore-https-errors` | ignora errori di certificato (solo per prove interne) |

Nella cartella di uscita:

```
analisi-<dominio>.pdf   il documento da consegnare
report.html             stesso contenuto, da aprire nel browser
dati.json               tutte le misure grezze
screenshots/            schermate e ritagli annotati
```

## Cosa verifica

44 controlli su otto aree:

- **Credibilità** — HTTPS, testo segnaposto rimasto, link rotti, anno del copyright, errori JavaScript
- **Esperienza da telefono** — viewport, contenuto che esce dallo schermo, tasti sotto i 44px, corpo del testo
- **Trovabilità su Google** — title, meta description, H1, gerarchia dei titoli, quantità di testo,
  dati strutturati LocalBusiness, robots.txt, sitemap, canonical, `noindex` lasciato attivo
- **Conversione** — telefono/indirizzo/orari in home, numero cliccabile, invito a prenotare,
  prezzi, mappa, profili social, anteprime Open Graph
- **Velocità** — peso della pagina, tempo di apertura, immagini sovradimensionate, formati, lazy loading
- **Obblighi di legge svizzeri** — Impressum (art. 3 cpv. 1 lett. s LCSl), informativa nLPD,
  consenso ai cookie quando ci sono strumenti di tracciamento
- **Accessibilità** — testi alternativi, contrasto WCAG 2.1 AA, etichette dei moduli, link senza testo
- **Qualità tecnica** — intestazioni di sicurezza, pagina 404, redirect HTTP→HTTPS, meta keywords

Il punteggio parte da 100 e scende in base alla gravità: critico −12, grave −8, medio −4, minore −2.

## Struttura

```
audit.mjs          CLI e orchestrazione
lib/collect.mjs    raccolta dati dal browser (rete, DOM, performance, screenshot)
lib/checks.mjs     le 44 regole di valutazione
lib/report.mjs     composizione HTML e stampa PDF
```

Le tre parti sono separate di proposito: `collect.mjs` non giudica, `checks.mjs` non sa nulla di
impaginazione. Per aggiungere un controllo basta scrivere una funzione in `checks.mjs` e
inserirla nell'elenco `CHECKS`.

## Report in tedesco

Tutti i testi rivolti al cliente stanno in `lib/checks.mjs` (più le intestazioni di sezione in
`lib/report.mjs`). Per la clientela della Svizzera tedesca si traduce quel file — la pipeline
non cambia.

## Note

- Il ritaglio annotato di un rilievo compare solo se quel problema ha elementi localizzabili
  nella pagina (immagini senza `alt`, contrasti, overflow, tasti piccoli, moduli).
- Il contesto mobile usa un viewport di 390×844 **senza** `isMobile`: quel flag attiva lo
  shrink-to-fit di Chromium, che falsa la misura di overflow, tasti e dimensioni del testo.
- La verifica dei link si ferma ai primi 40 indirizzi, per non caricare il server del cliente.
