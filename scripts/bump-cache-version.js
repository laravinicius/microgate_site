const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const VERSION = Date.now().toString(36);

const ASSETS = [
  "./css/output.css",
  "./css/style.css",
  "./js/theme.js",
  "./js/components.js",
  "./js/lucide.min.js",
  "./js/dicas-ti.js",
  "./data/dicas-ti-videos.js",
  "./js/version.js",
];

fs.writeFileSync(
  path.join(ROOT, "js", "version.js"),
  `window.APP_VERSION = "${VERSION}";\n`,
  "latin1",
);

const patterns = ASSETS.map((asset) => ({
  asset,
  re: new RegExp(
    `(href|src)="${asset.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?:\\?v=[^"]*)?"`,
    "g",
  ),
}));

const htmlFiles = fs
  .readdirSync(ROOT)
  .filter((f) => f.endsWith(".html"))
  .map((f) => path.join(ROOT, f));

const changed = [];

for (const file of htmlFiles) {
  let content = fs.readFileSync(file, "latin1");
  const original = content;

  for (const { asset, re } of patterns) {
    content = content.replace(re, `$1="${asset}?v=${VERSION}"`);
  }

  if (content !== original) {
    fs.writeFileSync(file, content, "latin1");
    changed.push(path.basename(file));
  }
}

console.log(`Cache version: ${VERSION}`);
console.log("Written: js/version.js");
if (changed.length) {
  console.log(`Updated: ${changed.join(", ")}`);
} else {
  console.log("No HTML files needed updating");
}