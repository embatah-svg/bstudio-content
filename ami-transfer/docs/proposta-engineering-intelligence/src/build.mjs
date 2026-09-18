// Concatenate parts → body.html, render, fill TOC page numbers from pass-1 PDF, render again.
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { resolve } from "node:path";

const dir = resolve(".");
const parts = readdirSync(resolve(dir, "parts")).filter((f) => f.endsWith(".html")).sort();
let html = parts.map((f) => readFileSync(resolve(dir, "parts", f), "utf8")).join("\n");
// Let sections flow; force a new page only at the start of each Part (and the bibliography).
html = html.replace(/<div class="page break">/g, '<div class="page">');
html = html.replace(
  /<div class="page">(\s*<div class="section-head">\s*<div class="over">[^<]*<\/div>\s*<h2><span class="n">(?:1|7)<\/span>)/g,
  '<div class="page break">$1'
);
writeFileSync("body.html", html);

execFileSync("node", ["render.mjs", "cover.html", "body.html", "pass1.pdf"], { stdio: "inherit" });

// Extract per-page text with pdfjs (skip cover page 1)
const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs");
const data = new Uint8Array(readFileSync("pass1.pdf"));
const doc = await pdfjs.getDocument({ data, useSystemFonts: true }).promise;
const pages = [];
for (let i = 2; i <= doc.numPages; i++) {
  const p = await doc.getPage(i);
  const tc = await p.getTextContent();
  pages.push(tc.items.map((it) => it.str).join(" ").replace(/\s+/g, " "));
}
// headings: <h2><span class="n">N</span>Title</h2>
const re = /<h2><span class="n">(\d+)<\/span>([^<]+)<\/h2>/g;
const norm = (s) => s.replace(/&amp;/g, "&").replace(/\s+/g, " ").trim();
let m;
const map = {};
while ((m = re.exec(html))) {
  const n = m[1];
  const title = norm(m[2]);
  const key = title.slice(0, 28);
  // skip the TOC page itself (body page 1)
  const esc = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  // headings are preceded by the letter-spaced part label ("P E R C H É 1 Executive…")
  const rx = new RegExp(`[A-ZÉ] [A-ZÉ]\\s+${n}\\s+${esc}`);
  let rel = pages.slice(1).findIndex((t) => rx.test(t));
  if (rel < 0) {
    const loose = new RegExp(`(?:^|\\s)${n}\\s+${key.slice(0, 14).replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`);
    rel = pages.slice(1).findIndex((t) => loose.test(t));
  }
  map[n] = rel >= 0 ? rel + 2 : "?"; // body numbering (footer)
}
console.log("TOC map", map);
html = html.replace(/<li data-toc="(\d+)">([\s\S]*?)<span class="p"><\/span>/g, (all, n, inner) => `<li data-toc="${n}">${inner}<span class="p">${map[n] ?? "?"}</span>`);
writeFileSync("body.html", html);
execFileSync("node", ["render.mjs", "cover.html", "body.html", "AMI-Engineering-Intelligence.pdf"], { stdio: "inherit" });
