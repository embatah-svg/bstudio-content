# 📦 B.Studio — Content Repository

Repository dei contenuti e dei progetti di B.Studio, organizzato in **progetti indipendenti** sotto `projects/`, ognuno con la propria documentazione, i propri asset e i propri script.

## 🗂️ Progetti

| Progetto | Cosa contiene |
|---|---|
| [`projects/bstudio-social/`](projects/bstudio-social/README.md) | Campagna 30 giorni Instagram + TikTok (funnel "Commento → DM"), Svizzera tedesca. Brief giornalieri, caroselli, reel, script di auto-publish Meta. |
| [`projects/etsy-promo/`](projects/etsy-promo/) | Promo del prodotto Etsy "Website-Templates" (carosello + story) e script di pubblicazione dedicato. |
| [`projects/baupro-solutions/`](projects/baupro-solutions/README.md) | Sito vetrina statico per BauPro Solutions GmbH (Bau & Renovation, Bern). |

## ⚠️ Da sapere dopo la riorganizzazione (2026-09-13)

- **Cartelle spostate**: tutto ciò che prima stava alla radice del repo (`instagram/`, `tiktok/`, `_assets/`, `_reels/`, `_scripts/`, i vari `.md` di strategia, `baupro-solutions/`) ora vive dentro `projects/<nome-progetto>/`. Gli script sono stati aggiornati di conseguenza (percorsi relativi + prefisso negli URL pubblici `raw.githubusercontent.com`).
- **`baupro-solutions` era pubblicata online?** Se il sito è collegato a un deploy (Vercel/Netlify/altro) che punta alla root del repo o a `baupro-solutions/`, aggiorna la "Root Directory" del progetto di hosting su `projects/baupro-solutions` dopo questo spostamento, altrimenti il prossimo deploy automatico può rompersi.
- **Cron di pubblicazione disattivato**: `.github/workflows/daily-publish.yml` girava ogni giorno per pubblicare in automatico su Instagram, ma la campagna `bstudio-social` risulta ferma da metà giugno 2026 — i giorni `tag09`→`tag33` sono ancora in stato `"ready"` (mai pubblicati), verosimilmente perché l'`ACCESS_TOKEN` Meta (dura ~60 giorni) è scaduto. Il cron è stato commentato per non consumare minuti Actions a vuoto; resta lanciabile a mano da workflow_dispatch. Per riprendere la campagna: genera un nuovo `ACCESS_TOKEN` long-lived, aggiorna il secret, poi riattiva lo `schedule:` nel workflow.
- **File spazzatura rimossi**: alcuni file vuoti e senza senso alla radice (`p.status`, `x.tag`, `x.tag+'`, `x.type`) sono stati eliminati — probabilmente residui di un comando di terminale eseguito per errore.

Per i dettagli operativi di ciascun progetto, vedi il README dentro la sua cartella.
