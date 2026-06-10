# Auto-risposta ai commenti Instagram — B.Studio

## Come funziona

La strategia è semplice: publichi un post con una CTA del tipo *"Commenta CHECK per ricevere info"*.
Quando un follower scrive quella parola sotto il post, il bot risponde **pubblicamente** con una riga
che lo invita a guardare i DM — poi **sei tu a mandare il DM a mano** con l'offerta/valore vero.

```
Follower scrive "CHECK" → bot risponde "Schon unterwegs in deine DMs 👀"
                                           ↓
                            Tu mandi il DM a mano con il contenuto
```

Il bot non manda mai DM in automatico (richiede un permesso Meta più sensibile).
Il DM rimane sempre manuale e personale.

---

## Trigger supportati

| Parola | Uso tipico |
|--------|-----------|
| `CHECK` | Controllo generico, offerta gratuita |
| `WEBCHECK` | Check gratuito del sito web |
| `INFO` | Richiesta informazioni |
| `PREISE` | Richiesta prezzi |
| `VORHER` | Before/after, trasformazione |
| `TIPP` | Consiglio/tip gratuito |
| `START` | Pronto a iniziare |

Le parole sono **case-insensitive** (check = CHECK = Check).

---

## Come lanciarlo

### 1. Prima volta — test in dry-run (non posta nulla)

```bash
node _scripts/reply-bot.mjs --dry-run
```

Vedrai esattamente cosa il bot risponderebbe, senza inviare nessun commento.

### 2. Esecuzione reale (una volta sola)

```bash
node _scripts/reply-bot.mjs
```

Risponde solo ai commenti con trigger non ancora gestiti.
I commenti già risposti vengono memorizzati in `_scripts/.replied.json` (non committare questo file).

### 3. Tutti i commenti (anche senza trigger)

```bash
node _scripts/reply-bot.mjs --all
```

Risponde con un ringraziamento generico a ogni commento non ancora gestito.

### 4. Limitare il numero di post analizzati

```bash
node _scripts/reply-bot.mjs --limit 5
```

### 5. Loop continuo (processo sempre attivo)

```bash
node _scripts/reply-bot-loop.mjs
# oppure con intervallo personalizzato (es. ogni 5 minuti)
node _scripts/reply-bot-loop.mjs --interval 5
```

Premi `Ctrl+C` per fermare.

---

## Schedularlo su Windows (Task Scheduler) — ogni 10 minuti

Questa è la soluzione più semplice su Windows: lasci che il Task Scheduler lanci il bot
ogni 10 minuti, senza tenere un terminale aperto.

### Comando da usare nel Task Scheduler

```
Program/script:  node
Arguments:       C:\Users\embat\Desktop\ruvnet-RuView-cbcb389\bstudio-content-30days\_scripts\reply-bot.mjs
Start in:        C:\Users\embat\Desktop\ruvnet-RuView-cbcb389\bstudio-content-30days
```

> Assicurati che `node` sia nel PATH di sistema (verifica con `where node` in PowerShell).
> In alternativa usa il percorso completo di node.exe, ad esempio:
> `C:\Program Files\nodejs\node.exe`

### Passi nel Task Scheduler

1. Cerca "Utilità di pianificazione" (Task Scheduler) nel menu Start.
2. Clicca **Crea attività di base…**
3. Nome: `B.Studio Reply Bot`
4. Trigger: **Ogni giorno** → poi modifica il trigger esistente in tipo **Ripeti ogni** → seleziona "10 minuti" per una durata di "1 giorno" (oppure "Indefinitamente").
5. Azione: **Avvia programma** → inserisci i valori sopra.
6. Spunta: **Esegui che l'utente sia connesso o meno** + **Esegui con i privilegi più elevati**.
7. Salva e avvia manualmente per testare.

---

## Permessi Instagram richiesti

| Permesso | Necessario per | Stato |
|----------|---------------|-------|
| `instagram_business_manage_comments` | Rispondere ai commenti | **Richiesto** — senza questo il bot non posta risposte |
| `instagram_manage_messages` | Mandare DM | NON richiesto (i DM restano manuali) |

### Come aggiungere `instagram_business_manage_comments`

1. Vai su [developers.facebook.com](https://developers.facebook.com) → la tua App.
2. Menu sinistro: **App Review → Permissions and Features**.
3. Cerca `instagram_business_manage_comments` → clicca **Request**.
4. Compila il modulo di revisione (screenshot di come lo usi, video facoltativo).
5. Una volta approvato, rigenera o ri-autorizza l'Access Token.
6. Testa di nuovo con `--dry-run`, poi esegui in modalità reale.

> **Nota:** in fase di sviluppo (app in modalità Development) puoi usare il permesso solo
> con account aggiunto come Tester nell'app. Per l'account pubblico è necessaria la revisione Meta.

---

## File creati

| File | Descrizione |
|------|-------------|
| `_scripts/reply-bot.mjs` | Script principale (esecuzione singola) |
| `_scripts/reply-bot-loop.mjs` | Loop continuo con intervallo configurabile |
| `_scripts/.replied.json` | Dedup dei commenti già risposti (auto-generato, non committare) |

---

## Il DM resta manuale — perché

Mandare DM automatici richiederebbe `instagram_manage_messages`, un permesso molto più
sensibile che Meta approva solo per casi d'uso specifici. Soprattutto, un DM manuale
è molto più efficace: personalizza il messaggio, usa il nome della persona, adatta
l'offerta al suo profilo. Questa è la forza della strategia commento-trigger → DM umano.
