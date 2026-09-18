// Render cover (full-bleed, no header/footer) + body (A4, header/footer, page numbers) and merge.
// Usage: node render.mjs <cover.html> <body.html> <output.pdf>
import puppeteer from "puppeteer-core";
import { PDFDocument } from "pdf-lib";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";
import { existsSync, writeFileSync } from "node:fs";

const [coverIn, bodyIn, output] = process.argv.slice(2);
if (!coverIn || !bodyIn || !output) {
  console.error("usage: node render.mjs <cover.html> <body.html> <output.pdf>");
  process.exit(1);
}

const candidates = [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
];
const executablePath = candidates.find((p) => existsSync(p));
if (!executablePath) throw new Error("No Chrome/Edge found");

const browser = await puppeteer.launch({
  executablePath,
  headless: true,
  args: ["--no-sandbox", "--font-render-hinting=none"],
});

async function load(file) {
  const page = await browser.newPage();
  await page.goto(pathToFileURL(resolve(file)).href, { waitUntil: "networkidle0", timeout: 120000 });
  await page.evaluateHandle("document.fonts.ready");
  return page;
}

const fontCss =
  "font-family:'Segoe UI',Arial,sans-serif;font-size:7.5px;color:#8D98A3;width:100%;padding:0 18mm;";

const coverPage = await load(coverIn);
const coverPdf = await coverPage.pdf({
  format: "A4",
  printBackground: true,
  margin: { top: 0, bottom: 0, left: 0, right: 0 },
});

const bodyPage = await load(bodyIn);
const bodyPdf = await bodyPage.pdf({
  format: "A4",
  printBackground: true,
  displayHeaderFooter: true,
  margin: { top: "20mm", bottom: "18mm", left: "0", right: "0" },
  headerTemplate: `<div style="${fontCss}display:flex;justify-content:space-between;align-items:center;">
      <span style="letter-spacing:.14em;text-transform:uppercase;">AMI Engineering Intelligence</span>
      <span>Proposta preliminare · Riservato A.M.I. S.r.l.</span>
    </div>`,
  footerTemplate: `<div style="${fontCss}display:flex;justify-content:space-between;align-items:center;">
      <span>B.Studio Design · Settembre 2026</span>
      <span>Pagina <span class="pageNumber"></span> di <span class="totalPages"></span></span>
    </div>`,
});
await browser.close();

const out = await PDFDocument.create();
for (const buf of [coverPdf, bodyPdf]) {
  const src = await PDFDocument.load(buf);
  const pages = await out.copyPages(src, src.getPageIndices());
  pages.forEach((p) => out.addPage(p));
}
out.setTitle("AMI Engineering Intelligence — Engineering Knowledge & Reuse Platform");
out.setAuthor("B.Studio Design");
out.setSubject("Proposta preliminare per A.M.I. S.r.l.");
out.setLanguage("it-IT");
writeFileSync(resolve(output), await out.save());
console.log("written", output, "pages:", out.getPageCount());
