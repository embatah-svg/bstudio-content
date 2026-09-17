# A.M.I. Transfer — contesto di progetto

Rifacimento completo del sito di A.M.I. S.r.l., Manerbio (BS). Progetto offerto gratuitamente
da Bstudio Design come porta d'ingresso a un rapporto di consulenza più ampio.
Referente in azienda: Riccardo. Permesso a procedere già ottenuto.

Il piano completo — analisi, posizionamento, sitemap, design system, SEO, roadmap — è in
`docs/piano-sito.md`. **Leggilo prima di lavorare su qualsiasi cosa.**

---

## Regole di lavoro non negoziabili

1. **Non inventare dati aziendali.** Niente certificazioni, clienti, numeri, anni, capacità
   produttive o referenze che non siano nella sezione "Dati verificati" qui sotto. Quando
   manca un'informazione si scrive `[DA CONFERMARE]` e si va avanti.
2. **Niente immagini generate da AI** su questo sito. È un costruttore di macchine di
   precisione: una macchina finta distrugge la credibilità con il pubblico tecnico.
3. **Il pubblico è tecnico.** Niente "leader", "eccellenza", "all'avanguardia". Ogni
   affermazione deve essere dimostrabile.
4. **L'obiettivo del sito è uno:** far arrivare all'ufficio tecnico il disegno di un pezzo.
   Ogni scelta si giudica su quello.

---

## Dati verificati (fonti pubbliche, settembre 2026)

| | |
|---|---|
| Ragione sociale | A.M.I. S.r.l. — Automazione Meccanica Industriale |
| Costituzione | 23 marzo 1978 |
| Sede | Strada per Porzano 4/C, 25025 Manerbio (BS) |
| P.IVA / C.F. | 00593180987 / 00971730171 — REA BS 222549 |
| ATECO | 28.4 |
| Fatturato 2023 | 7.464.217 € — utile 454.263 € |
| Organico | 11-50 (LinkedIn) · 20-49 (stime camerali) — `[DA CONFERMARE]` |
| Telefono | +39 030 9380654 / +39 030 9380655 |
| Email | info@amitransfer.com |
| Stabilimento | 7.000 m² + 600 m² uffici · oltre 20 linee dedicate/anno (fonte: loro sito) |
| Settori dichiarati | Automotive · Building · Home equipments · Others |
| Fiere | Tube Düsseldorf — espositore 2022 (Hall 5 J35), 2024 (Hall 5 F16), 2026 |
| LinkedIn | ~202 follower |
| YouTube | canale @AMITRANSFER (UCL87b8xIXd0bw-z1NVH619g), fermo dal ~2009, titoli tipo "130 ami@amitransfer.it" |
| Instagram | @ami.transfer — 59 follower, 3 post. Canale irrilevante |

Prodotto: **linee transfer lineari per la lavorazione del tubo metallico**, su commessa.
Differenziatore verificato: l'intera catena è interna — progettazione CAD 3D, programmazione
PLC, carpenteria pesante, lavorazioni meccaniche, controllo qualità, montaggio e collaudo.

**Clienti citati a memoria dal referente** (MOR, HAILO, altri): **non utilizzabili finché non
arriva un'autorizzazione scritta.** I contratti su macchine speciali contengono quasi sempre
clausole di riservatezza. Fino ad allora si usano casi anonimizzati ("produttore tedesco di
scale in alluminio").

---

## Problemi tecnici rilevati sull'esistente

- **Doppio dominio vivo.** `amitransfer.it` (legacy, pagine `.htm`) e `amitransfer.com`
  (WordPress) sono entrambi online e completi. Le directory di settore linkano il `.it`.
- **`amitransfer.it/admin/hipgprodotti.php` è indicizzato da Google.** Pannello di
  amministrazione del vecchio PHP raggiungibile pubblicamente. Da chiudere subito.
- `amitransfer.com/private/index.php` — ulteriore area legacy raggiungibile.
- WordPress con contenuti demo del tema ancora pubblici (post "by june", aprile 2022).
- Login WordPress esposto e indicizzato.
- Inglese del sito con errori ortografici visibili ("realazie", "specifity").

**Milestone 0** (redirect 301 `.it`→`.com`, chiusura aree legacy, rimozione contenuti demo,
protezione login) è indipendente da tutto il resto e va fatta per prima.

---

## Stack deciso

Next.js App Router · TypeScript · Tailwind con token custom · Framer Motion per le
micro-interazioni · three.js solo per l'hero · contenuti in MDX/JSON nel repo · **nessun CMS
alla v1** · deploy Vercel · i18n IT + EN (DE in fase 2, da valutare).

Budget di performance: LCP < 2,0 s su 4G, CLS < 0,05, JS iniziale < 150 kB.
Il bundle three.js va in dynamic import dopo il first paint, sostituito da immagine statica
sotto i 480 px e con `prefers-reduced-motion`.

Accessibilità: target WCAG 2.1 AA.

---

## Design system

```
--petrol    #0F1A1F   fondo hero, sezioni scure, footer
--petrol-2  #16262E   fascia dati
--blue      #24506B   primario, sezione service, bordi strutturali
--steel     #8D98A3   testi secondari su scuro
--paper     #E9EAE6   fondo pagina
--paper-2   #DCDED8   card, fondi alternati
--ink       #131A1E   testo
--yellow    #E8B400   CTA primaria e accenti — solo dove serve attenzione
```

Tipografia: **Archivo** 500/700/800 per titoli, numeri e navigazione · **IBM Plex Sans**
400/500 per il corpo. Scala 13/15/17/21/27/34/44/58/78 px con `clamp()`.
Titoli `letter-spacing: -0.02em`, `line-height: 1.02`. Corpo `line-height: 1.6`, max 70-75
caratteri per riga.

**Border radius 0 ovunque.** Nessuna ombra sulle card: la struttura nasce da bordi e griglie.
Allineamento a sinistra ovunque. Niente maiuscoletto tracciato sopra i titoli, niente
monospace decorativo, niente frecce dentro il testo dei bottoni.

Una sola animazione continua in tutto il sito: il ciclo della linea transfer nell'hero.
Tutto il resto è micro-interazione. Escluso: scroll hijacking, parallax, fade-up su ogni
sezione.

---

## Stato attuale

- `docs/piano-sito.md` — piano completo approvato come base di lavoro
- `docs/video-analisi.md` — analisi per fotogrammi dei 5 video YouTube (2009, 240p) e del
  video aziendale LinkedIn "materializing ideas" (2021, 720p): lavorazioni viste, sede,
  reparti, robot. Letture visive, da validare con Riccardo prima di usarle come claim.
- `prototipo/home.html` — prototipo statico originale, ormai superato dal sito.
- `sito/` — **il sito Next.js 16 (App Router, TypeScript, Tailwind v4)**. Avvio:
  `cd sito && npm run dev`. Struttura:
  - `src/lib/site.ts` — dati verificati, nav, CTA (unica fonte per recapiti e P.IVA)
  - `src/content/lavorazioni.ts`, `src/content/settori.ts` — contenuti delle pagine figlie
  - `src/components/three/` — hero 3D (dynamic import, no SSR)
  - `src/components/ui/Todo.tsx` — segnaposto visibile `DA CONFERMARE`, usato ovunque manchi un dato
  - `src/app/api/richiesta/route.ts` — form fattibilità: valida e inoltra a `RICHIESTA_ENDPOINT`
    (env). Senza endpoint risponde 503 con fallback email. Va configurato con l'azienda.
  - `public/brand/` — emblema ufficiale (da amitransfer.com) in versione blu e bianca;
    `public/images/` — fotogrammi reali del video aziendale (senza volti) come placeholder.
- Pagine fatte: home, azienda, linee-transfer, lavorazioni (+4 figlie), settori (+3 figlie),
  come-lavoriamo, service, contatti, lavora-con-noi, note-legali, privacy. Solo IT.
- Palette ricalibrata sul blu dell'emblema (`--blue #005a80`, `--petrol #0b2230`).
  Il giallo resta solo per le CTA.

## Prossimi passi

1. Milestone 0 — messa in sicurezza (serve accesso a hosting e DNS)
2. Raccolta materiali da Riccardo: vedi §17 del piano — in particolare logo vettoriale,
   elenco lavorazioni reali, range dimensionali, un caso autorizzato
3. Configurare la ricezione del form (`RICHIESTA_ENDPOINT`) con l'azienda
4. Sostituire i segnaposto `DA CONFERMARE` man mano che arrivano i dati
5. Versione EN (traduzione professionale), referenze, deploy Vercel

## Da chiedere a Riccardo

Accessi (Search Console, Analytics, DNS di entrambi i domini, WordPress) · elenco lavorazioni
reali sul tubo · range dimensionali (Ø, spessore, lunghezza) · tempi ciclo tipici · settori per
fatturato ultimi 5 anni · paesi export · autorizzazioni per citare clienti · certificazioni con
documento · foto alta risoluzione · girato originale dei video · logo vettoriale · un file STEP
di un'unità operativa per sostituire il 3D schematico con la macchina vera.
