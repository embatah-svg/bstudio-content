// make-logo.mjs — dal logo nero-su-bianco genera logo BIANCO trasparente (per sfondi scuri)
// e logo NERO trasparente (per sfondi chiari). Output in public/ e _assets/.
import sharp from "sharp";
import path from "node:path";
const ROOT = "C:/Users/embat/Desktop/ruvnet-RuView-cbcb389";
const SRC = "C:/Users/embat/Desktop/logo.jpeg";

// Maschera alpha: il logo (nero) diventa opaco, lo sfondo (bianco) trasparente.
const { data: mask, info } = await sharp(SRC)
  .greyscale()
  .negate()           // nero->bianco(opaco), bianco->nero(trasparente)
  .linear(1.5, -40)   // schiaccia il rumore JPEG dello sfondo verso 0
  .raw()
  .toBuffer({ resolveWithObject: true });
const { width, height } = info;

async function make(hex, files) {
  const base = await sharp({ create: { width, height, channels: 3, background: hex } }).raw().toBuffer();
  const rgba = await sharp(base, { raw: { width, height, channels: 3 } })
    .joinChannel(mask, { raw: { width, height, channels: 1 } })
    .png()
    .toBuffer();
  const trimmed = await sharp(rgba).trim({ threshold: 12 }).png().toBuffer(); // rifila il bordo trasparente
  for (const f of files) { await sharp(trimmed).toFile(path.join(ROOT, f)); console.log("✓", f); }
}

await make("#FFFFFF", ["b-studio-design-video/public/logo.png", "bstudio-content-30days/_assets/logo.png"]);
await make("#0A0908", ["b-studio-design-video/public/logo-dark.png", "bstudio-content-30days/_assets/logo-dark.png"]);
console.log("✅ Loghi generati (bianco trasparente + nero trasparente).");
