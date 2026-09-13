# 🛍️ Etsy Promo — Website-Templates

Promo one-off su Instagram per lo shop Etsy **bstudiodesignch** (template HTML pronti: Barbershop, Hair Salon, Restaurant). 1 carosello prodotto + 1 story, con codice sconto `WELCOME20`.

## Struttura
```
assets/
  E/                     →  5 slide del carosello (hook, barbershop, salon, restaurant, included)
  G01/                   →  varianti/asset del secondo set promo
  etsy-g01-story.mp4     →  story video
scripts/
  publish-etsy.mjs       →  pubblicazione one-off via Meta Graph API (stesso account IG di bstudio-social)
```

## Uso
```bash
cp .env.example .env   # IG_USER_ID, ACCESS_TOKEN, ASSET_BASE_URL (radice del repo)
node scripts/publish-etsy.mjs --dry-run
node scripts/publish-etsy.mjs
```
`ASSET_BASE_URL` va impostato alla radice del repo: lo script aggiunge da solo il prefisso `projects/etsy-promo/` per costruire gli URL pubblici delle immagini/video.
