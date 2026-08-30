# Motore di acquisizione — B.Studio

Trasforma un sito qualunque in un **motivo concreto per rispondere**: audit reale → report
brandizzato → testi 1:1 in tedesco già scritti sui problemi trovati su *quel* sito.

Il contenuto social (le altre cartelle del repo) porta persone verso di te nel giro di settimane.
Questo motore va nella direzione opposta: tu vai verso di loro, oggi.

## Uso in 3 comandi

```bash
npm install                              # una volta sola (installa Playwright)
npx playwright install chromium          # una volta sola

cp _acquisizione/prospects.example.csv _acquisizione/prospects.csv
#   ↑ mettici 20-30 siti (local.ch, Google Maps, hashtag locali) — 20 minuti di lavoro

node _acquisizione/run.mjs --base https://embatah-svg.github.io/bstudio-content/_acquisizione/out
```

Risultato in `_acquisizione/out/<dominio>/`:

| File | Cos'è |
|------|-------|
| `report.html` | Il report da mandare al prospect (screenshot, misure, 3 problemi + fix) |
| `outreach.md` | E-mail, DM, script telefonico e 2 follow-up — già personalizzati |
| `email.txt` | Solo l'e-mail, pronta da copiare |
| `audit.json` | Dati grezzi (punteggio, tutti i problemi) |
| `*.png` | Screenshot mobile + desktop |

E in più: `out/index.html` (cruscotto ordinato per urgenza) e `_acquisizione/pipeline.csv`
(CRM minimo: stato, ultimo contatto, prossima azione — si apre in Excel/Numbers).

## Cosa misura davvero

Nessuna API, nessun costo. Playwright carica il sito in formato iPhone reale e misura:

- **Performance** — tempo di caricamento vero, peso pagina, richieste, immagini oltre 300 KB
- **Mobile** — viewport, scroll orizzontale, tap target sotto 32 px
- **Conversion** — CTA nel primo schermo, telefono cliccabile, form, WhatsApp
- **Sichtbarkeit** — title, meta description, H1, og:image, quantità di contenuto
- **Vertrauen** — HTTPS, Impressum, Datenschutz, favicon, alt-text

Punteggio 0–100 (5 categorie × 20). **Più basso = prospect migliore**: più margine da mostrare.

## Personalizzazione

Tutto in `_acquisizione/config.json`: nome, e-mail, sito, pacchetti e prezzi.
Report e testi outreach li leggono da lì — modifichi una volta, cambia ovunque.

## Regole legali (Svizzera) — leggere prima di inviare

- **UWG Art. 3 cpv. 1 lett. o** vieta la pubblicità di massa elettronica senza consenso.
  Vietata è la *massa*: invio individuale, mittente identificabile, riferimento concreto e
  verificabile al destinatario, opt-out in calce. I testi generati contengono già mittente e opt-out.
- **Volume**: massimo ~15-20 e-mail al giorno, ognuna letta prima di partire. Non è una limitazione
  tecnica, è quello che tiene l'invio dalla parte giusta della norma — e la risposta sopra il 5%.
- **Instagram**: i DM automatizzati violano i Termini Meta e fanno chiudere l'account.
  I DM li mandi tu, a mano. Il testo è già pronto in `outreach.md`.
- **Chi dice no** va segnato `stato=no` in `pipeline.csv` e non ricontattato mai più.

## Aggiornare la pipeline

`pipeline.csv` non viene sovrascritto: le righe già presenti restano com'erano (con il tuo
stato e le tue note), vengono aggiunte solo le nuove. Puoi rilanciare `run.mjs` quando vuoi.

## Nota: questo repo è pubblico

- `prospects.csv` e `pipeline.csv` sono in `.gitignore`: contengono contatti di terzi e restano
  solo sul tuo computer.
- I `report.html` invece **devono** essere pubblici (il link va nella mail), ma escono con
  `noindex,nofollow`: sono raggiungibili da chi ha il link e non finiscono su Google.
  Un audit poco lusinghiero indicizzato col nome dell'azienda sarebbe un problema, non un biglietto da visita.
