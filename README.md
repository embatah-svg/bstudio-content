# 📦 B.Studio — Pacchetto Contenuti 30 Giorni (TikTok + Instagram)

Sistema completo per scalare i social e acquisire clienti via funnel **"Commento → DM"**.
Mercato: Svizzera tedesca · Lingua contenuti: **tedesco** · Periodo: **2026-06-08 → 2026-07-07**.

## 🧭 Da dove inizio (in ordine)
1. **`STRATEGIA-30-GIORNI.md`** — il cervello: pubblico, pilastri, calendario completo, KPI, "differenza siti web"
2. **`SPRINT-7-GIORNI.md`** — cosa fai ogni giorno nei primi 7 giorni per le prime conversazioni
3. **`FUNNEL-COMMENTO-DM.md`** — script copia-incolla (tedesco) per commenti e DM
4. **`ANALISI-TREND-E-HOOK.md`** — ricerca trend 2026, 25+ hook in tedesco, hashtag, orari (fonti live)
5. **`_TEMPLATE-BRIEF.md`** — struttura standard di ogni brief

## 📁 Struttura
```
instagram/  →  30 cartelle datate (YYYY-MM-DD_tagNN) · ogni cartella: BRIEF.md (+ HTML nei giorni hero)
tiktok/     →  30 cartelle datate · ogni cartella: BRIEF.md (+ cover HTML nei giorni hero)
```

## ⭐ Giorni HERO (grafiche/video già finiti) — Tag 01–07
| Tag | Tema | File pronti |
|-----|------|-------------|
| 01 | 3 Fehler, die dein Logo billig machen | IG `post-tag01-carousel.html` (7 slide) · TT `tk-tag01-cover.html` · Video **BrandDiagnose** |
| 02 | Der 5-Sekunden-Test | BRIEF completi IG+TT |
| 03 | Canva-Logo vs. echtes Brand | BRIEF completi IG+TT |
| 04 | Wo deine Website Kunden verliert | BRIEF completi IG+TT |
| 05 | Mini-Tipp: 1 Farbe, die teuer wirkt | BRIEF · Video **MiniTipp** |
| 06 | Günstige vs. teure Website | IG `post-tag06-carousel.html` (6 slide) · Video **WebsiteUnterschied** |
| 07 | Vorher/Nachher + Angebot | BRIEF completi IG+TT |

## 🎬 Video Remotion (cartella `../b-studio-design-video`)
4 composizioni registrate (1080×1920 @ 30fps). Render:
```bash
cd ../b-studio-design-video
npm run dev                                              # anteprima live in Remotion Studio
npx remotion render BrandDiagnose out/tag01.mp4          # 3 Fehler (Tag 01)
npx remotion render WebsiteUnterschied out/tag06.mp4     # Günstige vs. teure (Tag 06)
npx remotion render MiniTipp out/tag05.mp4               # Mini-Tipp template (Tag 05+)
npx remotion render BStudioDesign out/showcase.mp4       # showcase laptop 3D
```
> `MiniTipp` ha props riutilizzabili (`tippNumber`, `titel`, `regel`, `beispiel`) → riusalo per tutti i Mini-Tipp del mese cambiando i testi.

## 🖼️ Esportare i carousel HTML in immagini (automatico)
Un comando converte TUTTI gli HTML in PNG 1080×1920 (uno per slide) in una cartella `_export/` accanto a ogni file:
```bash
node bstudio-content-30days/_scripts/export-carousels.mjs
```
Usa puppeteer (già installato). Scala a tutti i 30 giorni: appena crei nuovi `post-*.html`, rilancialo e genera i PNG mancanti.

## 📲 Auto-publish su Instagram (Meta Graph API)
Guida completa + vincoli reali in **`PUBLISHING-META.md`**. In breve:
```bash
cp _scripts/publish-queue.example.json _scripts/publish-queue.json   # poi metti status:"ready"
# .env con IG_USER_ID, ACCESS_TOKEN, ASSET_BASE_URL (asset ospitati pubblicamente)
node _scripts/publish-instagram.mjs --tag tag01 --dry-run   # simulazione
node _scripts/publish-instagram.mjs --all                   # pubblica i "ready"
```
Pubblica carousel + reel e posta in automatico il **primo commento col trigger** (che poi fissi a mano). Il DM lo mandi TU. ⚠️ TikTok è separato (TikTok Content Posting API).

## 🎯 Trigger commento (variati per post)
`CHECK` (audit logo/brand) · `WEBCHECK` (analisi sito) · `TIPP` (mini-guida) · `VORHER` (before/after) · `PREISE` (listino) · `INFO` (generico) · `START` (slot/chiamata)

## ✅ Routine giornaliera minima
Posta 1 Reel + 1 TikTok del giorno → fissa il commento-trigger → rispondi a TUTTI i commenti entro 1h → manda TU il DM col valore → 3-5 outreach a freddo. (Dettagli in `SPRINT-7-GIORNI.md`.)
