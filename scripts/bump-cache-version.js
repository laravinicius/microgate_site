const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const VERSION = Date.now().toString(36);

const componentFallbacks = {
  "header-placeholder": fs.readFileSync(path.join(ROOT, "components", "header.html"), "utf8"),
  "footer-placeholder": fs.readFileSync(path.join(ROOT, "components", "footer.html"), "utf8"),
};
const componentsScriptPath = path.join(ROOT, "js", "components.js");
const componentsScript = fs.readFileSync(componentsScriptPath, "utf8");
const fallbackStart = "// COMPONENT_FALLBACKS_START";
const fallbackEnd = "// COMPONENT_FALLBACKS_END";
const fallbackStartIndex = componentsScript.indexOf(fallbackStart);
const fallbackEndIndex = componentsScript.indexOf(fallbackEnd);

if (fallbackStartIndex === -1 || fallbackEndIndex === -1 || fallbackEndIndex < fallbackStartIndex) {
  throw new Error("Marcadores do fallback de componentes ausentes em js/components.js");
}

const fallbackBlock = `${fallbackStart}\nconst FALLBACK_COMPONENTS = ${JSON.stringify(componentFallbacks, null, 2)};\n${fallbackEnd}`;
const updatedComponentsScript =
  componentsScript.slice(0, fallbackStartIndex) +
  fallbackBlock +
  componentsScript.slice(fallbackEndIndex + fallbackEnd.length);
fs.writeFileSync(componentsScriptPath, updatedComponentsScript, "utf8");

const ASSETS = [
  "./css/output.css",
  "./css/style.css",
  "./js/theme.js",
  "./js/components.js",
  "./js/lucide.min.js",
  "./js/icons.js",
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
