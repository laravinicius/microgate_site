const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const IMG_DIR = path.join(__dirname, "..", "img");
const SRC_DIR = path.join(IMG_DIR, "old");
const QUALITY = 80;

const TARGETS = [
  { src: "background.jpg", maxWidth: 1920 },
  { src: "microgate2.png", maxWidth: 1200 },
  { src: "brilhant_s.png", maxWidth: 512 },
  { src: "datacenter.png", maxWidth: 980 },
  { src: "rede.png", maxWidth: 980 },
  { src: "assist.png", maxWidth: 980 },
  { src: "pmqb.png", maxWidth: 800 },
  { src: "whatsapp.png", maxWidth: 112 },
  { src: "alv.png", maxWidth: 512 },
  { src: "innon.png", maxWidth: 512 },
  { src: "phd.png", maxWidth: 360 },
  { src: "brilhant_m.png", maxWidth: 434 },
  { src: "max.png", maxWidth: 400 },
  { src: "totaltelas.png", maxWidth: 420 },
  { src: "graciosa.png", maxWidth: 320 },
  { src: "wap.png", maxWidth: 320 },
];

function fmt(bytes) {
  return `${Math.round(bytes / 1024)}KB`;
}

(async () => {
  let totalBefore = 0;
  let totalAfter = 0;
  let totalSaved = 0;

  for (const { src, maxWidth } of TARGETS) {
    const srcPath = path.join(SRC_DIR, src);
    const outName = `${path.parse(src).name}.webp`;
    const outPath = path.join(IMG_DIR, outName);

    if (!fs.existsSync(srcPath)) {
      console.log(`${outName.padEnd(20)} source missing: ${src}`);
      continue;
    }

    const input = fs.readFileSync(srcPath);
    const meta = await sharp(input).metadata();
    const width = Math.min(maxWidth, meta.width || maxWidth);

    const out = await sharp(input)
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toBuffer();

    totalBefore += input.length;
    totalAfter += out.length;

    if (out.length < input.length) {
      fs.writeFileSync(outPath, out);
      totalSaved += input.length - out.length;
      console.log(`${outName.padEnd(20)} orig:${fmt(input.length)} webp:${fmt(out.length)} (-${Math.round((1 - out.length / input.length) * 100)}%)`);
    } else {
      console.log(`${outName.padEnd(20)} orig:${fmt(input.length)} webp:${fmt(out.length)} (kept PNG)`);
    }
  }

  console.log(`\nTotal: ${fmt(totalBefore)} -> ${fmt(totalAfter)} (saved ${fmt(totalSaved)})`);
})().catch((err) => {
  console.error(err);
  process.exit(1);
});