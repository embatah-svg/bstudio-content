# 📲 Auto-Publish su Instagram via Meta Graph API — Guida onesta + script

Questa guida ti porta dagli asset (PNG + MP4 già generati) alla pubblicazione automatica su Instagram. Niente fuffa: ci sono **prerequisiti reali** di Meta che vanno fatti una volta sola.

---

## ⚠️ Prima di tutto: i vincoli veri di Meta (così non perdi tempo)

1. **Serve un account Instagram Business o Creator** collegato a una **Pagina Facebook**. Un profilo personale NON può usare l'API di pubblicazione.
2. **L'API non carica i byte dell'immagine/video**: pubblica passando un **URL pubblico HTTPS**. Quindi i PNG/MP4 vanno prima **ospitati online** (vedi sotto).
3. **App Meta + token**: serve un'app su developers.facebook.com con permessi `instagram_basic`, `instagram_content_publish`, `pages_read_engagement`, e un **access token long-lived**.
4. **Limite: 25 post pubblicati via API ogni 24h** (più che sufficiente: noi facciamo 1-2/giorno).
5. **Reels via API**: `media_type=REELS`, bisogna fare polling dello stato finché è `FINISHED`, poi pubblicare.
6. **TikTok è separato** — usa la *TikTok Content Posting API*, non Meta. Questa guida copre solo Instagram (come hai chiesto). I brief TikTok restano per pubblicazione manuale o futura integrazione TikTok.
7. **Formato feed**: i carousel sono 1080×1920 (9:16). Instagram nel **feed** li ritaglia a 4:5 — ho centrato i contenuti apposta, quindi il crop tiene. Se vuoi carousel feed perfetti, posso generare anche versioni 1080×1350 (dimmelo). I 9:16 sono perfetti così come sono per **Reels e Storie**.

> **Onestà:** "collegare Claude Code a Meta per pubblicare in automatico" = eseguire lo script qui sotto con le TUE credenziali. Lo script è pronto; i token e l'hosting li metti tu (una volta). Io non pubblico a tuo nome senza le tue chiavi.

---

## 🗂️ Step 0 — Hosting degli asset (la scelta più semplice e gratuita)

L'API ha bisogno di URL pubblici. Opzione zero-costo: **committa la cartella `_export` (PNG) e `b-studio-design-video/out` (MP4) in un repo GitHub pubblico** e usa gli URL `raw.githubusercontent.com`.

```
https://raw.githubusercontent.com/<utente>/<repo>/<branch>/bstudio-content-30days/instagram/2026-06-08_tag01/_export/post-tag01-carousel-slide01.png
```
Alternative: Cloudinary (free tier), Cloudflare R2, un bucket S3, o qualsiasi hosting statico. Lo script prende una `BASE_URL` e costruisce gli URL dai path relativi.

---

## 🔑 Step 1 — Credenziali (una volta sola)

1. Crea un'app su https://developers.facebook.com → tipo "Business".
2. Aggiungi il prodotto **Instagram Graph API**.
3. Collega IG Business + Pagina FB; ottieni:
   - `IG_USER_ID` (l'ID dell'account IG business)
   - `ACCESS_TOKEN` (long-lived, ~60 giorni; rinnovabile)
4. Mettili in un file `.env` (NON committarlo):
```
IG_USER_ID=178414...
ACCESS_TOKEN=EAAG...
ASSET_BASE_URL=https://raw.githubusercontent.com/<utente>/<repo>/<branch>/bstudio-content-30days
```

---

## ▶️ Step 2 — Pubblica

Lo script `_scripts/publish-instagram.mjs` legge `_scripts/publish-queue.json` (un post per voce) e pubblica.

```bash
# carousel/reel del giorno indicato nella coda
node bstudio-content-30days/_scripts/publish-instagram.mjs --tag tag01
# oppure tutti i post con "status":"ready"
node bstudio-content-30days/_scripts/publish-instagram.mjs --all
# prova a vuoto (mostra cosa farebbe, senza pubblicare)
node bstudio-content-30days/_scripts/publish-instagram.mjs --tag tag01 --dry-run
```

Cosa fa per ogni post:
1. **Carousel** → crea un container-figlio per ogni PNG (`is_carousel_item=true`) → crea il container carousel → pubblica.
2. **Reel** → crea container `REELS` con `video_url` → fa polling finché `FINISHED` → pubblica.
3. **Funnel commento→DM** → opzionale: pubblica automaticamente il **primo commento col trigger** (es. "Kommentier CHECK …") che poi fissi a mano. (Il DM lo mandi TU, come da tua scelta — vedi `FUNNEL-COMMENTO-DM.md`.)

---

## 📋 La coda di pubblicazione (`publish-queue.json`)

Ho generato una coda di esempio per i 7 giorni hero in `_scripts/publish-queue.example.json`. Copiala in `publish-queue.json`, riempi gli URL (o lascia che `ASSET_BASE_URL` li costruisca) e metti `"status":"ready"`. Struttura di una voce:
```json
{
  "tag": "tag01", "type": "carousel", "platform": "instagram",
  "assets": ["instagram/2026-06-08_tag01/_export/post-tag01-carousel-slide01.png", "..."],
  "caption": "Dein Logo ist das Erste… Kommentier CHECK …",
  "firstComment": "Kommentier CHECK und ich schicke dir die ehrliche Logo-Analyse 🪙",
  "status": "ready"
}
```

---

## ✅ Checklist finale
- [ ] IG Business + Pagina FB collegati
- [ ] App Meta con `instagram_content_publish`
- [ ] Token long-lived in `.env`
- [ ] Asset (`_export` + `out`) ospitati pubblicamente, `ASSET_BASE_URL` impostato
- [ ] `publish-queue.json` compilato con `status:ready`
- [ ] `--dry-run` ok → poi pubblicazione reale
- [ ] (TikTok) integrazione separata via TikTok Content Posting API — quando vuoi
