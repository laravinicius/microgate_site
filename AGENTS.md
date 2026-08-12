# AGENTS.md

Static, multi-page marketing site for Microgate Informática (pt-BR). Plain HTML + Tailwind + vanilla JS. No build framework, no tests, no lint.

## Commands
- `npm run dev` — Tailwind watch: `src/input.css` -> `css/output.css`
- `npm run build` — one-shot Tailwind build of `css/output.css`
- No test/lint scripts. `npm test` just errors. Don't add one unless asked.

Tailwind CLI runs despite `main: "index.js"` pointing at a file that doesn't exist — ignore that field. `css/output.css` is committed; rebuild it after editing Tailwind classes or `tailwind.config.js`.

## Gotchas
- `darkMode: 'class'` and `js/theme.js` force dark mode permanently (`document.documentElement.classList.add('dark')`). There is no working light/dark toggle.
- Header/footer are NOT inline. Each `.html` must include `<div id="header-placeholder">` / `<div id="footer-placeholder">`, load `./js/components.js` and the lucide CDN `<script src="https://unpkg.com/lucide@latest"></script>`. `components.js` fetches `./components/{header,footer}.html` then calls `lucide.createIcons()` — lucide must load first. New pages must replicate this wiring.
- Source files are not clean UTF-8; some accented chars render as mojibake (`á` -> `A?`) in browser/devtools. Keep edits ASCII-safe or normalize encoding consistently; don't "fix" unrelated occurrences.
- Content paths in `tailwind.config.js` are relative to repo root (`./*.{html,js}`, `./components/`, `./js/`).

## Architecture
- Pages: `index.html`, `sobre.html`, `servicos.html`, `consultoria.html`, `rede.html`, `assistencia.html`, `clientes.html`, `restricted.html`, `testeconexao.html`.
- `teste_teclado.html` (ABNT2 keyboard test tool) is self-contained: inline `<style>`/JS + jsPDF CDN, NO header/footer placeholders or `components.js`. Don't apply the standard page wiring to it.
- `js/escala.js` / `js/escala-abas.js` are internal-only (tech schedule); not used by public pages.
- Root artifacts to leave alone: `googlece07dce70d4eb9a2.html` (Google Search Console verification), `robots.txt` / `sitemap.xml` (reference production domain `microgateinformatica.com.br`).
- Custom (non-Tailwind) styling lives in `css/style.css` (`boxed-layout`, `content-wrapper` classes).

## Backend
`package.json` lists unused deps (`express`, `sqlite3`, `jsonwebtoken`, `bcryptjs`, `dotenv`, `cors`) but there is NO backend/server code. The site is static and deployed as-is. Don't treat these deps as active.