# A.M.I. Transfer — Piano di rifacimento del sito

Documento di analisi, strategia e architettura. Nessuna riga di codice di produzione viene scritta prima dell'approvazione.

Preparato per: Bstudio Design → A.M.I. S.r.l., Manerbio (BS)

---

## Nota metodologica sulle fonti

`amitransfer.com`, `amitransfer.it` e LinkedIn bloccano tutti l'accesso automatico (robots.txt). L'analisi si basa quindi su: pagine e URL indicizzati dai motori, descrizione aziendale pubblica su LinkedIn, **bilanci depositati e registri camerali**, **registri espositori delle fiere di settore**, directory industriali, e conoscenza diretta dell'azienda da parte del referente del progetto.

Restano non verificabili senza accesso diretto: contenuto attuale delle pagine, performance reali, posizionamento organico effettivo, traffico, provenienza dei contatti.

Un audit tecnico completo richiede Google Search Console, Analytics e backend WordPress. **Va richiesto prima della Milestone 1.**

### Dati societari verificati

| | |
|---|---|
| Ragione sociale | A.M.I. S.r.l. — Automazione Meccanica Industriale |
| Costituzione | 23 marzo 1978 |
| Sede | Strada per Porzano 4/C, 25025 Manerbio (BS) |
| P.IVA / C.F. | 00593180987 / 00971730171 — REA BS 222549 |
| ATECO | 28.4 — Fabbricazione di macchine per la formatura dei metalli e di altre macchine utensili |
| **Fatturato 2023** | **7.464.217 €** |
| **Utile 2023** | **454.263 €** |
| Organico | 11-50 (LinkedIn), 20-49 (stime camerali) — `[DA CONFERMARE il dato esatto]` |
| Fiere | Tube Düsseldorf, espositore 2022 (Hall 5, J35), 2024 (Hall 5, F16), 2026 |

Ogni dato non verificato è marcato `[DA CONFERMARE]`.

---

## 1. Executive summary

A.M.I. costruisce linee transfer lineari su commessa per la lavorazione del tubo metallico. È un'azienda tecnica solida con una capacità rara — l'intera catena progettuale e produttiva è interna — e una presenza digitale che non la rappresenta: due domini paralleli, un WordPress con contenuti demo ancora online, nessun contenuto commerciale strutturato, nessuna pagina di service.

Il problema non è estetico. È che oggi il sito non fa nessuno dei tre lavori che dovrebbe fare:

1. **Non qualifica.** Un buyer che cerca una soluzione per un proprio componente non trova né lavorazioni, né settori, né casi concreti.
2. **Non converte.** Non esiste un percorso dalla visita alla richiesta tecnica. Solo un indirizzo email.
3. **Non intercetta.** Le keyword su cui i concorrenti posizionano pagine dedicate (`transfer lines tube processing`, `linee transfer lavorazione tubo`) non hanno una pagina AMI corrispondente.

Il nuovo sito è costruito intorno a un'unica azione: **far arrivare all'ufficio tecnico il disegno di un pezzo.** Tutto il resto — design, contenuti, SEO — serve quella.

Secondo obiettivo, oggi completamente assente: **generare ricavo da service e ricambi** sulla base installata di quasi cinquant'anni.

---

## 2. Analisi del sito attuale

### 2.1 Infrastruttura

| Elemento | Stato | Impatto |
|---|---|---|
| Doppio dominio `.it` e `.com` | **Entrambi i siti sono vivi e completi.** Il `.it` serve ancora pagine `.htm` (company, design, factory, products) ed è il dominio linkato da tutte le directory di settore | Autorità SEO divisa, contenuti duplicati, due versioni dell'azienda online. **Problema più grave rilevato.** |
| Pannello amministrativo legacy indicizzato | `amitransfer.it/admin/hipgprodotti.php` risulta nei risultati di ricerca | **Rischio di sicurezza concreto.** Da chiudere subito, prima di qualsiasi altra cosa |
| WordPress (`.com`) | Tema con contenuti demo ancora pubblici (post "by june", aprile 2022, categoria "Nessuna categoria") | Danno diretto di credibilità |
| Area `/private/index.php` | Ulteriore area legacy raggiungibile | Superficie di attacco |
| Login WordPress | Esposto e indicizzato | Rischio sicurezza |
| Performance | `[DA CONFERMARE]` — serve misura reale | — |
| Mobile | `[DA CONFERMARE]` — verifica su dispositivo | — |

### 2.2 Struttura e contenuti

Pagine rilevate: Company, Design, Factory, Process, Worldwide references, Contacts, una pagina Heat exchangers, una tassonomia "Tools services" popolata di contenuti vuoti.

Problemi di contenuto:
- Testi in inglese tradotti in modo letterale, con errori ortografici visibili anche nella descrizione aziendale pubblica ("realazie", "specifity"). Su un sito che deve comunicare precisione, è il dettaglio che costa di più.
- Impostazione descrittiva-aziendale ("chi siamo e cosa abbiamo") invece che orientata al problema del cliente ("cosa produce la vostra linea").
- "Worldwide references" senza referenze concrete: un'affermazione senza prova.
- Nessuna pagina per settore, nessuna pagina per lavorazione, nessun case study.
- Nessuna sezione service/ricambi.

### 2.3 Branding e UX

Nessun sistema visivo riconoscibile: tipografia di default del tema, nessuna palette costruita, immagini `[DA CONFERMARE la qualità e i diritti]`. La navigazione riflette l'organigramma interno, non il percorso decisionale di chi compra.

Una sola CTA implicita: l'indirizzo email nel footer.

### 2.4 Presenza esterna

- **LinkedIn**: profilo attivo, 202 follower, settore Machinery Manufacturing, 11-50 dipendenti, fondazione 1978. Descrizione aziendale ricca di contenuto tecnico riutilizzabile, ma con errori ortografici in inglese. Attività di pubblicazione `[DA CONFERMARE]`.
- **Fiere — il dato più importante emerso**: A.M.I. è espositore stabile a **Tube Düsseldorf**, la fiera mondiale di riferimento per la lavorazione del tubo — edizioni 2022, 2024 e 2026, sempre nella Hall 5. Uno stand a Tube costa decine di migliaia di euro tra spazio, allestimento, trasferta e personale. Ogni visitatore interessato, tornato a casa, cerca l'azienda online: e trova due siti diversi, uno con contenuti demo del 2022 e un pannello di amministrazione indicizzato. **Il sito sta vanificando l'investimento commerciale più costoso che l'azienda fa.** È l'argomento con cui si vende internamente il progetto.
- **YouTube**: canale AMITRANSFER con video di linee in funzione. È l'asset visivo più prezioso che l'azienda possiede e non è usato sul sito.
- **Instagram**: 59 follower, 3 post. Canale non rilevante per questo mercato, da mettere in pausa o ignorare.
- **Directory**: presenza su portali di settore, quasi sempre con il dominio `.it` e recapiti non aggiornati.

### 2.5 Competitor

Il confronto rilevante non è con chi costruisce transfer generiche, ma con chi presidia online la nicchia "lavorazione tubo":

- **Star Group** — pagine dedicate e ottimizzate in inglese su transfer per tubo, partecipazione a Lamiera con contributi regionali, sito moderno e strutturato. È il benchmark digitale.
- **TRZ Transfer**, **C.M.A. S.r.l.** — costruttori di transfer lineari e a tavola, presenza prevalentemente da directory.
- **Costruttori esteri** (FFG, Mikron, Starrag) — visibili su DirectIndustry, giocano su un altro segmento di prezzo.

Lettura: la concorrenza digitale diretta nella nicchia è **debole ma non assente**. C'è una finestra, e Star Group la sta già occupando.

---

## 3. Posizionamento

### 3.1 Chi è A.M.I. realmente

Un costruttore di **macchine speciali su commessa** — non un produttore di macchine a catalogo. Il prodotto non è una macchina: è un processo produttivo consegnato chiavi in mano, progettato intorno a un componente specifico del cliente.

Il fattore distintivo verificato: **l'intera catena è interna** — progettazione, programmazione PLC, carpenteria pesante, lavorazioni meccaniche, controllo qualità, montaggio e collaudo. In un settore dove la maggior parte dei costruttori assembla e subappalta, questo significa tempi controllati, un solo responsabile e macchine modificabili a distanza di anni.

### 3.2 Chi compra

| Segmento | Chi decide | Cosa cerca |
|---|---|---|
| Produttori di componenti tubolari su volumi di serie | Direttore di produzione + ufficio tecnico | Tempo ciclo, affidabilità, costo pezzo |
| Tier automotive | Engineering + acquisti tecnici | Capability, qualifica fornitore, puntualità |
| Costruttori di scambiatori e gruppi termici | Responsabile industrializzazione | Flessibilità su pezzi nuovi |
| Base installata esistente | Manutenzione, service | Ricambi, retrofit, continuità |

Il quarto segmento è il più trascurato e il più redditizio.

### 3.3 Value proposition

> **Una linea costruita intorno al vostro pezzo.**
> Progettiamo, programmiamo e collaudiamo a Manerbio linee transfer per la lavorazione del tubo. Dal disegno del componente al pezzo finito in ciclo continuo.

### 3.4 Supporting messages

1. **Tutta la catena è nostra.** Progettazione, PLC, carpenteria, lavorazioni, montaggio e collaudo sotto lo stesso tetto: un solo interlocutore e nessuna dipendenza da terzi sui tempi.
2. **Partiamo dal pezzo, non dal catalogo.** Ogni linea nasce dal disegno del componente e dalla produttività richiesta.
3. **Il software resta modificabile.** Le logiche PLC sono scritte in casa: quando cambia il pezzo, la linea si adatta invece di essere sostituita.
4. **Dal 1978, e le linee di allora lavorano ancora.** Archivio completo di ogni commessa: ricambi identificati in giornata, retrofit possibili su macchine ancora meccanicamente sane.
5. **Collaudata prima di partire.** Ogni linea viene montata e messa a punto in stabilimento: il cliente la vede lavorare il proprio pezzo prima della spedizione. `[DA CONFERMARE che il collaudo con pezzo cliente sia prassi]`

---

## 4. Sitemap

Lingue: **IT + EN** al lancio. DE in fase 2 se l'export verso area tedesca lo giustifica `[DA CONFERMARE i mercati principali]`.

```
/  Home
/azienda                      Storia, stabilimento, numeri, persone
/linee-transfer               Il prodotto: la linea lineare, architettura, unità operative
   /linee-transfer/unita-operative
/lavorazioni                  Hub SEO
   /lavorazioni/foratura
   /lavorazioni/tranciatura
   /lavorazioni/filettatura
   /lavorazioni/calibratura
   /lavorazioni/[...]         una pagina per lavorazione confermata
/settori
   /settori/automotive
   /settori/building
   /settori/scambiatori-termici
/come-lavoriamo               Dalla richiesta al collaudo: il processo AMI
/referenze                    Case study per settore
/service                      Ricambi, retrofit, assistenza
/lavora-con-noi
/contatti                     Include il form di richiesta fattibilità
/note-legali  /privacy  /cookie
```

Scartate volutamente: "Qualità" e "Tecnologia" come pagine autonome. Sono affermazioni che nessuno legge; i loro contenuti vivono meglio dentro *Come lavoriamo* e *Linee transfer*, dove sono dimostrazione invece che dichiarazione.

### 4.1 Specifica per pagina

| Pagina | Obiettivo | Contenuti | CTA primaria | CTA secondaria | Serve dal cliente | Visual | Valore SEO |
|---|---|---|---|---|---|---|---|
| **Home** | Far capire in 5 secondi cosa fa AMI e portare alla richiesta tecnica | Vedi §5 | Invia il disegno del pezzo | Guarda le linee in funzione | — | 3D/video linea | Brand + generiche |
| **Azienda** | Credibilità e dimensione | 1978, stabilimento 7.000 m², reparti, organizzazione | Contatta l'ufficio tecnico | Lavora con noi | Foto stabilimento, dati organico | Fotografia ambientale | Medio |
| **Linee transfer** | Spiegare il prodotto a un tecnico | Architettura linea, indexaggio, unità operative, range dimensionali | Invia il disegno | Scarica la brochure | Range Ø tubo, lunghezze, tempi ciclo tipici | Schema 3D + foto | **Alto** |
| **Lavorazioni** (hub + figlie) | Intercettare ricerche specifiche | Una pagina per lavorazione: cosa fa, su che tubo, in che settori | Verifica la fattibilità | Vedi il settore | Elenco lavorazioni reali | Close-up dell'operazione | **Altissimo** |
| **Settori** | Far riconoscere il proprio caso | Componenti tipici, esigenze, esempi | Invia il disegno | Case study del settore | Componenti prodotti per settore | Foto componenti | Alto |
| **Come lavoriamo** | Ridurre il rischio percepito | Analisi fattibilità → offerta → progettazione → costruzione → collaudo → installazione → service | Avvia l'analisi | Contatti | Tempi medi per fase | Schema di processo | Medio |
| **Referenze** | Prova | Case study: pezzo, problema, soluzione, risultato | Un caso simile al vostro? | Settori | **Autorizzazioni cliente o casi anonimizzati** | Foto linea + pezzo | Alto |
| **Service** | Generare ricavo ricorrente | Ricambi, retrofit, assistenza, identificazione linea | Richiedi un ricambio | Telefono diretto | Processo ricambi attuale | Magazzino, interventi | Medio-alto |
| **Lavora con noi** | Recruiting tecnico | Perché AMI, posizioni aperte, candidatura spontanea | Invia candidatura | Azienda | Posizioni aperte | Persone al lavoro | Locale |
| **Contatti** | Convertire | Form fattibilità, recapiti, mappa, orari | Invia la richiesta | Chiama | — | — | Local SEO |

---

## 5. Homepage — wireframe testuale

**1 · Hero**
Obiettivo: comunicare il prodotto in 5 secondi e dare subito l'azione.
Headline: *Il tubo entra grezzo, esce finito.*
Subheadline: *Linee transfer lineari per la lavorazione del tubo metallico. Progettate, programmate e collaudate a Manerbio.*
CTA: **Invia il disegno del pezzo** / secondaria: *Guarda la linea al lavoro*
Visual: animazione 3D del ciclo di indexaggio (già prototipata), o video reale della linea se il girato è di qualità.
Animazione: il ciclo della linea è l'unica animazione continua del sito, e comunica esattamente il prodotto.
Mobile: camera arretrata, animazione mantenuta ma a framerate ridotto; se `prefers-reduced-motion`, frame statico.

**2 · Fatti**
Obiettivo: dimensione e solidità senza retorica.
1978 · 7.000 m² · 20+ linee l'anno · un solo interlocutore.
Nessuna CTA. Fondo scuro, blocco basso e largo.
Mobile: griglia 2×2.

**3 · Cosa fa una linea AMI**
Headline: *Una sola linea, più stazioni, un pezzo finito a ogni passo.*
Contenuto: il principio dell'indexaggio spiegato in tre frasi, poi le stazioni tipo in sequenza numerata (qui la numerazione è legittima: è un processo reale).
CTA: *Vedi tutte le lavorazioni sul tubo.*
Visual: schema tecnico, non fotografia.
Mobile: griglia a una colonna.

**4 · Tutto in casa**
Headline: *Dalla progettazione al collaudo, sotto lo stesso tetto.*
Sei reparti, una riga ciascuno. È il differenziatore principale: sta alto e ha spazio.
CTA: *Come lavoriamo.*
Visual: fotografia di reparto, una per blocco, in bianco e nero freddo.

**5 · Settori**
Headline: *Chi ci porta un pezzo, non un capitolato.*
Tre blocchi: automotive, building, scambiatori termici.
CTA per blocco: *Vedi i componenti che produciamo.*
Visual: close-up del componente finito, non della macchina.

**6 · Un caso reale**
Un solo case study in evidenza: pezzo, problema, tempo ciclo ottenuto, anno.
CTA: *Tutte le referenze.*
`[DA CONFERMARE: serve almeno un caso autorizzato. Senza, la sezione non va online.]`

**7 · Service**
Headline: *La linea che avete comprato vent'anni fa la conosciamo ancora.*
Ricambi, retrofit, assistenza. Fondo blu, forte stacco cromatico: è una sezione commerciale autonoma.
CTA: **Identifica la tua linea** → form dedicato.

**8 · Richiesta tecnica**
Headline: *Mandateci il disegno del pezzo.*
Sub: *Vi diciamo se una linea transfer è la strada giusta, con quale tempo ciclo e quale configurazione.*
Form breve + telefono diretto + riferimento alla riservatezza.

**9 · Footer**
Recapiti completi, P.IVA, sitemap, lingua, LinkedIn, YouTube.

---

## 6. Design system

**Principio**: l'audacia si spende in un punto solo — l'animazione della linea nell'hero. Tutto il resto è disciplinato, con molto bianco e tipografia che porta la personalità.

### Colore
| Ruolo | Hex | Uso |
|---|---|---|
| Petrolio | `#0F1A1F` | Fondo hero, sezioni scure, footer |
| Petrolio 2 | `#16262E` | Fascia dati |
| Blu smalto | `#24506B` | Colore primario, sezione service, bordi strutturali |
| Acciaio | `#8D98A3` | Testi secondari su scuro, dettagli |
| Carta | `#E9EAE6` | Fondo pagina |
| Carta 2 | `#DCDED8` | Card, fondi alternati |
| Inchiostro | `#131A1E` | Testo |
| Giallo sicurezza | `#E8B400` | CTA primaria, punti di lavorazione, accenti — **solo dove serve attenzione** |

La palette viene dal mondo reale della macchina: smalto, acciaio, segnaletica di sicurezza. Non è una palette "industriale generica".

### Tipografia
- **Archivo** 500/700/800 — titoli, numeri, navigazione. Grottesca tecnica, stretta, di carattere.
- **IBM Plex Sans** 400/500 — testo corrente. Nata per l'ingegneria, leggibile a lungo.
- Scala: 13 / 15 / 17 / 21 / 27 / 34 / 44 / 58 / 78 px, fluida con `clamp()`.
- Titoli: `letter-spacing: -0.02em`, `line-height: 1.02`.
- Corpo: `line-height: 1.6`, misura massima 70-75 caratteri.
- Niente maiuscoletto tracciato sopra ai titoli, niente monospace decorativo, niente parole singole colorate dentro un titolo.

### Spazio, forme, componenti
- Base 4 px. Scala: 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128.
- Sezioni: `clamp(64px, 9vw, 120px)` verticale.
- Griglia 12 colonne, max 1180 px, gutter 24 px. Allineamento a sinistra ovunque: il testo centrato indebolisce le pagine tecniche.
- **Border radius 0.** Le macchine non hanno angoli arrotondati; il sito nemmeno.
- **Bottoni**: pieno giallo per l'azione primaria, contorno 1px per la secondaria, testo Archivo 700 16px, padding 15/26, nessuna freccia nel testo, nessuna ombra.
- **Card**: niente ombre. Separazione con bordo superiore da 2px o griglia a 1px. La struttura nasce dalle linee, non dall'elevazione.
- **Nav**: trasparente sull'hero, fondo petrolio pieno allo scroll. Mobile: pannello a scomparsa a schermo intero.
- **Form**: campi con solo bordo inferiore, etichette sempre visibili, errori inline che dicono cosa fare.
- **Icone**: tratto 1.5px, nessuna icona decorativa. Solo dove sostituiscono una parola.
- **Focus visibile**: contorno giallo 3px su tutti gli elementi interattivi.

---

## 7. Art direction

Il rischio principale: fotografia industriale di repertorio. Si riconosce subito e annulla la credibilità.

| Sezione | Fotografia ideale |
|---|---|
| Hero | Linea intera in funzione, ripresa laterale bassa, luce di stabilimento |
| Reparti | Sei scatti coerenti: schermo CAD, quadro elettrico cablato, saldatura carpenteria, centro di lavoro in truciolo, strumento di misura, montaggio |
| Settori | Il componente finito, macro, su fondo neutro |
| Referenze | Coppia: linea installata + pezzo prodotto |
| Azienda | Persone al lavoro, volti riconoscibili, nessuna posa |
| Service | Magazzino ricambi, tecnico in campo |

**Trattamento**: colore desaturato con i blu mantenuti, nero pieno, nessun filtro caldo. Il giallo compare solo dove c'è davvero segnaletica o lavorazione.

**Se il materiale attuale non basta** — ed è probabile: mezza giornata di shooting industriale in stabilimento, un fotografo del bresciano, costo indicativo 800-1.500 €. È l'investimento con il ritorno più alto di tutto il progetto e non è sostituibile con nulla. In attesa: fermo immagine dai video YouTube per i placeholder, mai come versione definitiva. **Nessuna immagine generata da AI su questo sito.**

---

## 8. UX — percorsi per persona

**Persona 1 — Responsabile di produzione, deve aumentare la capacità su un componente tubolare**
Cerca: qualcuno che sappia lavorare *il suo* pezzo. Deve vedere: lavorazioni, range dimensionali, settori, un caso simile. Dubbi da superare: "capiranno il mio pezzo?", "quanto tempo ci mettono?", "e se poi cambia il componente?". CTA: invio disegno.
Percorso: Home → Lavorazioni o Settori → Referenze → Contatti.

**Persona 2 — Ufficio acquisti tecnici di un tier, cerca un fornitore da qualificare**
Cerca: solidità, capacità produttiva, struttura organizzativa, continuità. Deve vedere: anni di attività, stabilimento, reparti interni, dati societari, referenze. Dubbi: "reggono un audit fornitore?", "sono troppo piccoli?". CTA: contatto diretto + brochure scaricabile.
Percorso: Home → Azienda → Come lavoriamo → Referenze → Contatti.

**Persona 3 — Perito o ingegnere della zona in cerca di lavoro**
Cerca: che lavoro si fa davvero, con che tecnologie, con chi. Deve vedere: persone, reparti, tecnologie, posizioni aperte. Dubbi: "è un posto dove si impara?". CTA: candidatura.
Percorso: LinkedIn o Google → Lavora con noi → Azienda.

**Persona 4, non richiesta ma economicamente la più rilevante — Manutentore con una linea AMI ferma**
Cerca: un ricambio, oggi. Deve trovare in un clic: telefono diretto, form di identificazione linea, numero di matricola. CTA: telefono in evidenza, form ricambi.
Percorso: Google "ricambi AMI transfer" → Service. **Questa pagina oggi non esiste e va creata per prima.**

---

## 9. Conversione

**CTA primaria (unica in tutto il sito): Invia il disegno del pezzo.**
**CTA secondaria: Parla con l'ufficio tecnico** (telefono cliccabile).

Form di richiesta fattibilità, campi in quest'ordine:
1. Disegno o modello del pezzo — upload PDF, DWG, STEP, ZIP (max 25 MB)
2. Materiale e diametro del tubo
3. Produttività richiesta (pezzi/ora o pezzi/anno)
4. Lavorazioni necessarie — selezione multipla
5. Settore
6. Azienda, nome, email, telefono
7. Consenso privacy + spunta richiesta NDA

**Il punto critico è la riservatezza.** Nessun ufficio tecnico carica un disegno su un form senza sapere dove finisce. Accanto all'upload va una riga esplicita: dove sono conservati i file, chi vi accede, disponibilità a firmare NDA prima di ricevere qualsiasi documento. Questo singolo dettaglio vale più di qualunque ottimizzazione del bottone.

Da qualificare come lead caldo: chi allega un file, chi indica produttività, chi arriva da una pagina lavorazione.

Elementi aggiuntivi: telefono in header su mobile; brochure PDF in cambio dell'email (solo se la brochure è di qualità); niente WhatsApp e niente chatbot — su questo mercato abbassano la percezione di serietà; niente live chat senza qualcuno che risponda davvero.

---

## 10. SEO

**Primo intervento, prima di ogni altro: consolidare `.it` su `.com` con redirect 301 pagina per pagina**, aggiornare i recapiti sulle directory di settore, ripulire l'indice dal sito legacy `/private/`. Vale più dei primi sei mesi di contenuti.

**Keyword primarie IT**: linee transfer lavorazione tubo · macchine transfer per tubo · transfer lineari su misura · macchine speciali lavorazione tubo metallico
**Keyword primarie EN**: tube processing transfer lines · linear transfer machines for tubes · custom tube processing machinery
**Secondarie (una pagina ciascuna)**: foratura tubo automatica · tranciatura tubo · filettatura tubo in linea · calibratura tubo · linee per scambiatori di calore · transfer per componenti automotive in tubo
**Long tail service**: ricambi macchine transfer · retrofit PLC linea transfer · assistenza linee transfer

Impianto tecnico: un solo H1 per pagina che coincide con la headline visibile; H2 sulle sezioni reali; title entro 60 caratteri costruiti come *Lavorazione — Prodotto | A.M.I.*; meta description scritte a mano con un verbo d'azione; internal linking Lavorazioni ⇄ Settori ⇄ Referenze; breadcrumb su tutte le pagine profonde.

Schema markup: `Organization` + `LocalBusiness` (sede, P.IVA, telefono, apertura), `Product` sulle linee, `BreadcrumbList`, `FAQPage` dove le FAQ sono reali.

Internazionale: struttura `/it/` e `/en/` con `hreflang` reciproco e `x-default`. Traduzione **professionale tecnica**, mai automatica: l'inglese attuale è già oggi un problema di credibilità.

Local: scheda Google Business Profile `[DA CONFERMARE se esiste e chi la gestisce]`, NAP identico ovunque, allineamento delle directory.

Misura: Search Console e un'analitica rispettosa della privacy (Plausible o Umami) al posto di Universal Analytics `[DA CONFERMARE cosa è installato oggi]`.

---

## 11. Stack tecnologico

| Livello | Scelta | Perché |
|---|---|---|
| Framework | Next.js (App Router) | SSG per pagine statiche, i18n nativo, ottimo SEO |
| Linguaggio | TypeScript | Manutenibilità |
| Stile | Tailwind CSS con token custom | Il design system vive nella config |
| Animazione | Framer Motion + three.js per il solo hero | Micro-interazioni + un pezzo forte |
| Contenuti | MDX/JSON in repo alla v1 | Il sito cambia poche volte l'anno |
| CMS | **Nessuno alla v1.** Sanity in fase 2 solo se gestiranno referenze e offerte di lavoro da soli | Un CMS non usato è solo debito tecnico |
| Form | Route handler Next + storage privato + notifica email | Gli allegati tecnici non passano da servizi terzi |
| Hosting | Vercel | Deploy immediato, CDN, preview per ogni revisione |

**Perché non WordPress**: il sito attuale dimostra il costo reale di WordPress in un'azienda senza qualcuno che lo mantenga — plugin non aggiornati, contenuti demo online da quattro anni, login esposto. Su un sito che cambia tre volte l'anno, un sito statico elimina la manutenzione di sicurezza, è più veloce e costa meno di hosting. L'unico vantaggio di WordPress — autonomia redazionale — non serve a chi non pubblica.

---

## 12. Architettura

```
app/
  [locale]/
    layout.tsx
    page.tsx                 home
    azienda/  linee-transfer/  lavorazioni/[slug]/
    settori/[slug]/  come-lavoriamo/  referenze/[slug]/
    service/  lavora-con-noi/  contatti/
  api/richiesta/route.ts     form + upload
components/
  layout/   Header Footer Nav LanguageSwitch
  sections/ Hero Facts Cycle Departments Sectors CaseStudy Service Cta
  ui/       Button Field Card Breadcrumb
  three/    TransferLine.tsx   (dynamic import, no SSR)
content/    it/ en/  (mdx + json)
lib/        seo.ts i18n.ts schema.ts
public/     images/ (AVIF+WebP)  brochure/
```

**Immagini**: `next/image`, AVIF con fallback WebP, `sizes` esplicito, blur placeholder, lazy tranne l'hero.
**Performance**: budget LCP < 2,0 s su 4G, CLS < 0,05, JS iniziale < 150 kB. Il bundle three.js è caricato in dynamic import dopo il primo paint e sostituito da un'immagine statica sotto i 480 px e con `prefers-reduced-motion`.
**Accessibilità**: target WCAG 2.1 AA — contrasti verificati, navigazione da tastiera completa, focus visibile, alt text tecnici reali.
**Deploy**: `main` → produzione, preview automatica per ogni branch, dominio `.it` in redirect permanente.

---

## 13. Animazioni

Una sola animazione continua: **il ciclo della linea nell'hero** — avanzamento a passo, discesa delle teste, lavorazione, risalita. Comunica il prodotto meglio di qualsiasi testo ed è già prototipata.

Tutto il resto è micro-interazione: transizioni di stato sui bottoni (120 ms), apertura del menu mobile, validazione inline dei campi, transizione di pagina in dissolvenza (200 ms), conteggio dei numeri solo al primo ingresso in viewport.

Esclusi: scroll hijacking, parallax, entrata in fade-up su ogni sezione, contatori animati a ripetizione, cursori custom.
Tutto rispetta `prefers-reduced-motion`.

---

## 14. Contenuti

Principio: ogni affermazione deve essere dimostrabile. Niente "leader", "eccellenza", "all'avanguardia" — su un pubblico tecnico sono rumore.

Da scrivere ex novo: home, pagine lavorazione (una ciascuna, 400-600 parole), pagine settore, come lavoriamo, service, azienda, 3-5 case study.
Da eliminare: tutti i testi inglesi attuali, i contenuti demo del tema, la pagina "Tools services" vuota.

**Segnaposto aperti**: `[DA CONFERMARE]` su elenco lavorazioni reali · range dimensionali tubo · tempi ciclo tipici · numero linee installate · mercati export · certificazioni (nessuna certificazione va scritta senza il documento in mano) · nomi clienti · organico esatto · esistenza di brevetti.

---

## 15. Roadmap

| # | Milestone | Cosa si produce | Dipende da | Priorità | Giorni |
|---|---|---|---|---|---|
| 0 | **Messa in sicurezza** | Redirect `.it`→`.com`, rimozione contenuti demo, blocco `/private/`, protezione login | Accessi hosting/DNS | **Immediata** | 0,5 |
| 1 | Research & architettura | Audit reale con GSC, intervista tecnica in azienda, sitemap definitiva | Accessi + incontro | Alta | 2 |
| 2 | Design system | Token, tipografia, componenti, due schermate campione | M1 | Alta | 2 |
| 3 | Homepage | Home completa IT, hero 3D integrato | M2 + materiali | Alta | 3 |
| 4 | Pagine interne | Tutte le pagine, contenuti IT | M3 + contenuti | Alta | 5 |
| 5 | Animazioni e interazioni | Micro-interazioni, form con upload | M4 | Media | 2 |
| 6 | SEO e versione EN | Meta, schema, hreflang, traduzione professionale | M4 | Alta | 3 |
| 7 | Performance | Immagini, budget, Lighthouse | M5-M6 | Media | 1 |
| 8 | Testing | Browser, dispositivi, accessibilità, form end-to-end | M7 | Alta | 1 |
| 9 | Deploy | DNS, redirect, Search Console, monitoraggio | M8 | Alta | 1 |

La Milestone 0 si può fare **questa settimana**, indipendentemente dal resto. È l'intervento con il miglior rapporto tra sforzo e risultato dell'intero progetto.

Percorso critico reale: **i materiali fotografici e i contenuti tecnici**, non lo sviluppo.

---

## 16. Priorità

1. Milestone 0 — sicurezza e consolidamento domini
2. Pagina service (è ricavo immediato su base installata)
3. Home + pagine lavorazione (intercettazione e qualifica)
4. Versione EN professionale
5. Referenze — appena arrivano le autorizzazioni
6. Careers
7. CMS — solo se e quando servirà davvero

---

## 17. Cosa chiedere a Riccardo

**Accessi**
Google Search Console e Analytics · pannello hosting e DNS di entrambi i domini · amministrazione WordPress · chi ha registrato `amitransfer.it` e se è rinnovato

**Prodotto**
Elenco completo delle lavorazioni realmente eseguite sul tubo · range di diametro, spessore e lunghezza gestibili · tempi ciclo tipici · un esempio numerico completo (pezzo, lavorazioni, produttività ottenuta)

**Mercato**
Settori per fatturato degli ultimi cinque anni · paesi di export principali · chi considerano i loro tre concorrenti reali · fiere a cui partecipano

**Prove**
Almeno un cliente disponibile a essere citato, o tre casi anonimizzabili · certificazioni effettivamente possedute, con documento · brevetti · numero di linee installate e ancora attive

**Materiali**
Foto in alta risoluzione di stabilimento, reparti e componenti · girato originale dei video, non le versioni YouTube · logo vettoriale · brochure attuale · un file STEP di un'unità operativa per il 3D

**Organizzazione**
Chi risponde alle richieste dal sito e in quanto tempo · come funziona oggi la richiesta di un ricambio · posizioni aperte · chi aggiornerà il sito in futuro (decide se serve un CMS)

---

## 18. In attesa di approvazione

Il prototipo di homepage già realizzato mostra la direzione di design e l'animazione dell'hero. Alla conferma di questo piano si procede dalla Milestone 0, che è indipendente da tutto il resto e può partire subito.
