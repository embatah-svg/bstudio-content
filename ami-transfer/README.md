# Avvio in Claude Code

## 1. Apri la cartella

```bash
cd ami-transfer
git init && git add -A && git commit -m "Contesto di progetto e prototipo"
claude
```

Claude Code legge `CLAUDE.md` da solo all'avvio: il contesto è già dentro, non serve
rispiegare il progetto.

## 2. Guarda i video AMI (opzionale ma utile)

```bash
/plugin marketplace add bradautomates/claude-video
/plugin install watch@claude-video
/watch <url-video-AMI> --detail balanced --resolution 1024 --no-whisper \
  "che lavorazioni esegue questa linea e su che tipo di tubo?"
```

I video sono muti e del 2009: contano i fotogrammi, non l'audio.
Salva quello che emerge in `docs/video-analisi.md`.

## 3. Scaffold del sito

```bash
npx create-next-app@latest sito --typescript --tailwind --app --src-dir --eslint
```

Poi chiedi a Claude Code di portare i token del design system dentro
`tailwind.config.ts` e di convertire `prototipo/home.html` in componenti React,
isolando l'animazione three.js in `components/three/TransferLine.tsx`
(dynamic import, `ssr: false`).

## Struttura

```
CLAUDE.md              contesto, regole, dati verificati — letto in automatico
docs/piano-sito.md     piano completo: analisi, sitemap, SEO, roadmap
prototipo/home.html    homepage statica con animazione 3D della linea
```

## Prima di tutto il resto

La Milestone 0 (redirect `.it`→`.com`, chiusura del pannello admin legacy indicizzato,
rimozione dei contenuti demo WordPress) non dipende dal nuovo sito e va fatta appena
Riccardo passa gli accessi.
