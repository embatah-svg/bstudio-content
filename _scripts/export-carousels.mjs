// export-carousels.mjs — converte gli HTML (carousel/cover/single) in PNG 1080×1920 pronti per Meta.
// Uso:  node _scripts/export-carousels.mjs
// Output: ogni HTML genera una cartella _export/ accanto al file, con un PNG per slide.
import { readdir, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import puppeteer from "puppeteer";

const SELF = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(SELF, ".."); // bstudio-content-30days
const CHROME_FALLBACK = path.resolve(
  ROOT, "..", "b-studio-design-video", "node_modules", ".remotion",
  "chrome-headless-shell", "win64", "chrome-headless-shell-win64", "chrome-headless-shell.exe"
);

// Trova ricorsivamente gli HTML di contenuto (no node_modules, no _export, no dot-dir).
async function findHtml(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    if (e.name === "node_modules" || e.name === "_export" || e.name.startsWith(".")) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await findHtml(p)));
    else if (/^(post|tk)-.*\.html$/i.test(e.name) || /(carousel|cover|single)\.html$/i.test(e.name)) out.push(p);
  }
  return out;
}

const launchOpts = { headless: true, args: ["--no-sandbox", "--force-color-profile=srgb"] };
let browser;
try {
  browser = await puppeteer.launch(launchOpts);
} catch {
  console.log("→ chrome di puppeteer non trovata, uso la chrome di Remotion");
  browser = await puppeteer.launch({ ...launchOpts, executablePath: CHROME_FALLBACK });
}

const files = await findHtml(ROOT);
if (files.length === 0) { console.log("Nessun HTML trovato."); await browser.close(); process.exit(0); }

let total = 0;
for (const file of files) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 1920, deviceScaleFactor: 1 });
  await page.goto(pathToFileURL(file).href, { waitUntil: "networkidle0", timeout: 60000 });
  await page.evaluate(() => document.fonts && document.fonts.ready);
  await new Promise((r) => setTimeout(r, 450)); // fonts/grain settle
  const handles = await page.$$(".slide, .frame, .canvas");
  const outDir = path.join(path.dirname(file), "_export");
  if (!existsSync(outDir)) await mkdir(outDir, { recursive: true });
  const base = path.basename(file, ".html");
  let i = 0;
  for (const h of handles) {
    i++;
    const name = handles.length > 1 ? `${base}-slide${String(i).padStart(2, "0")}.png` : `${base}.png`;
    await h.screenshot({ path: path.join(outDir, name) });
    total++;
  }
  await page.close();
  console.log(`✓ ${path.relative(ROOT, file)} → ${handles.length} PNG`);
}
await browser.close();
console.log(`\n✅ FERTIG — ${total} PNG aus ${files.length} HTML-Dateien (1080×1920).`);
