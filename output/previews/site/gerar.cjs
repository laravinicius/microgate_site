const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '../../..');
const out = __dirname;
const read = name => fs.readFileSync(path.join(root, name), 'utf8');
const write = (name, content) => fs.writeFileSync(path.join(out, name), content, 'utf8');
const escape = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const text = value => value.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
const source = read('output/previews/proposta-2.html');
const arrow = '<span aria-hidden="true">↗</span>';
const whatsapp = 'https://wa.me/554199550984';

function head(title) {
  let result = source.slice(0, source.indexOf('</head>'))
    .replace('<base href="../../">', '<base href="../../../">')
    .replace(/<title>.*?<\/title>/, `<title>${escape(title)} | Microgate — Prévia</title>`)
    .replace('<link rel="stylesheet" href="output/previews/preview.css">', '<link rel="stylesheet" href="output/previews/preview.css">\n  <link rel="stylesheet" href="output/previews/site/site.css">');
  if (!result.includes('<script src="output/previews/site/site.js"')) {
    result = result.replace('<script src="output/previews/preview.js" defer></script>', '<script src="output/previews/preview.js" defer></script>\n  <script src="output/previews/site/site.js" defer></script>');
  }
  return result + '</head>';
}

function layout(title, content, extra = '') {
  return `${head(title)}
<body class="preview theme-claro site-preview">
  <a class="skip-link" href="#conteudo">Ir para o conteúdo</a>
  <div class="preview-switcher site-preview-bar"><span>Prévia do site</span><span aria-hidden="true">·</span><span>Microgate IT Solutions</span></div>
  <div id="header-placeholder"></div>
  <main id="conteudo">${content}</main>
  <footer id="footer-placeholder"></footer>
  ${extra}
</body>
</html>\n`;
}

function hero(label, title, summary, image = '', alt = '') {
  const visual = image ? `<div class="inner-hero__image"><img src="${image}" alt="${escape(alt)}" fetchpriority="high"></div>` : '';
  return `<header class="inner-hero${image ? ' inner-hero--image' : ''}"><div class="wrap"><nav class="inner-breadcrumb" aria-label="Trilha de navegação"><a href="/">Início</a><span aria-hidden="true">/</span><span aria-current="page">${escape(label)}</span></nav><div class="inner-hero__layout"><div class="inner-hero__copy"><p class="eyebrow"><span aria-hidden="true"></span>${escape(label)}</p><h1>${title}</h1><p>${summary}</p></div>${visual}</div></div></header>`;
}

function cta(title, description = 'Fale com a Microgate sobre as necessidades da sua empresa.') {
  return `<section class="inner-cta"><div class="wrap inner-cta__layout" data-reveal><div><p class="eyebrow">Conte com a Microgate</p><h2>${title}</h2><p>${description}</p></div><a class="button button-primary" href="${whatsapp}" target="_blank" rel="noopener noreferrer">Fale com a Microgate ${arrow}</a></div></section>`;
}

function detailItems(name) {
  const match = read(name).match(/<main\b[\s\S]*?<\/main>/i);
  if (!match) throw new Error(`Conteúdo principal não encontrado: ${name}`);
  return [...match[0].matchAll(/<p>\s*-\s*([\s\S]*?)<\/p>/gi)].map(item => text(item[1]).replace(/;\s*$/, ''));
}

// A página inicial é a proposta aprovada, com navegação apontando para esta cópia.
let home = source.replace('<base href="../../">', '<base href="../../../">')
  .replace('<title>Proposta 2 — Institucional | Microgate</title>', '<title>Início | Microgate — Prévia</title>')
  .replace('<body class="preview theme-claro">', '<body class="preview theme-claro site-preview">')
  .replace('<link rel="stylesheet" href="output/previews/preview.css">', '<link rel="stylesheet" href="output/previews/preview.css">\n  <link rel="stylesheet" href="output/previews/site/site.css">')
  .replace(/<div class="preview-switcher"[\s\S]*?<\/div>/, '<div class="preview-switcher site-preview-bar"><span>Prévia do site</span><span aria-hidden="true">·</span><span>Microgate IT Solutions</span></div>');
if (!home.includes('<script src="output/previews/site/site.js"')) {
  home = home.replace('<script src="output/previews/preview.js" defer></script>', '<script src="output/previews/preview.js" defer></script>\n  <script src="output/previews/site/site.js" defer></script>');
}
write('index.html', home);

const about = hero('Sobre a Microgate', 'Desde 2001, simplificando a tecnologia.', 'A Microgate IT Solutions ajuda empresas de diferentes portes a usar a tecnologia com mais tranquilidade.', 'img/datacenter.webp', 'Rack de infraestrutura de TI') + `
<section class="inner-light"><div class="wrap about-story"><div data-reveal><p class="eyebrow">Nossa empresa</p><h2>Atendimento próximo, tecnologia bem cuidada.</h2></div><div class="about-story__text" data-reveal><p>Nossa equipe oferece atendimento personalizado e soluções alinhadas às necessidades de cada cliente.</p><p>Com o apoio de colaboradores e parceiros, trabalhamos para manter a tecnologia funcionando e apoiar o crescimento dos negócios com agilidade, profissionalismo e preços competitivos.</p></div></div></section>
<section class="inner-dark" id="servicos"><div class="wrap services-layout"><div class="section-intro" data-reveal><p class="eyebrow">O que fazemos</p><h2>Soluções para a sua empresa.</h2><p>Serviços para manter sua empresa conectada, produtiva e segura.</p></div><div class="service-list"><a class="service-item" href="/assistencia" data-reveal><span class="service-symbol"><i data-lucide="monitor"></i></span><span class="service-text"><strong>Assistência técnica</strong><small>Manutenção, reparos, formatação, backup e upgrade de hardware.</small></span><span class="service-arrow">↗</span></a><a class="service-item" href="/consultoria" data-reveal><span class="service-symbol"><i data-lucide="monitor-cog"></i></span><span class="service-text"><strong>Consultoria e gerenciamento</strong><small>Gestão de TI, helpdesk, servidores, backups e segurança.</small></span><span class="service-arrow">↗</span></a><a class="service-item" href="/rede" data-reveal><span class="service-symbol"><i data-lucide="wifi"></i></span><span class="service-text"><strong>Redes e infraestrutura</strong><small>Redes cabeadas e Wi-Fi, racks, firewall, roteadores e switches.</small></span><span class="service-arrow">↗</span></a></div></div></section>
<section class="inner-light"><div class="wrap value-grid"><article data-reveal><p class="eyebrow">O que nos move</p><h2>Missão</h2><p>Oferecer soluções tecnológicas adequadas a cada necessidade, buscando agilidade e satisfação constante de nossos clientes.</p></article><article data-reveal><p class="eyebrow">Para onde olhamos</p><h2>Visão</h2><p>Ser referência em atendimento personalizado e suporte técnico descomplicado em toda a região.</p></article></div></section>` + cta('Vamos trabalhar juntos?');
write('sobre.html', layout('Sobre', about));

const services = [
  {file:'consultoria.html', label:'Consultoria e gerenciamento', title:'Tecnologia organizada para a sua equipe.', intro:'Gerenciamento e consultoria em informática e TI para apoiar o trabalho contínuo e colaborativo da sua empresa.', image:'img/datacenter.webp', alt:'Rack de infraestrutura de TI', cta:'Solicite um orçamento personalizado.'},
  {file:'rede.html', label:'Redes e infraestrutura', title:'Uma rede preparada para conectar seu negócio.', intro:'Projeto, instalação, manutenção e gerenciamento da infraestrutura de rede da sua empresa.', image:'img/rede.webp', alt:'Equipamentos de rede e infraestrutura', cta:'Converse sobre a sua infraestrutura.'},
  {file:'assistencia.html', label:'Assistência técnica', title:'Cuidado especializado para seus equipamentos.', intro:'Recuperação, reparo e manutenção de equipamentos para você e sua empresa.', image:'img/assist.webp', alt:'Equipamentos para assistência técnica', cta:'Solicite assistência técnica.'}
];
for (const service of services) {
  const items = detailItems(service.file);
  if (items.length < 10) throw new Error(`Lista incompleta em ${service.file}: ${items.length}`);
  const list = items.map(item => `<li data-reveal><span aria-hidden="true">↗</span>${escape(item)}</li>`).join('');
  write(service.file, layout(service.label, hero(service.label, service.title, service.intro, service.image, service.alt) + `<section class="inner-light"><div class="wrap detail-layout"><div class="detail-heading" data-reveal><p class="eyebrow">Como podemos ajudar</p><h2>Serviços para a sua rotina.</h2><p>Conheça os serviços oferecidos pela Microgate.</p></div><ul class="detail-list">${list}</ul></div></section>` + cta(service.cta)));
}

const logos = [...read('clientes.html').matchAll(/<a\s+href="([^"]+)"[^>]*>\s*<img\s+([^>]+)>\s*<\/a>/gi)].map(match => {
  const src = match[2].match(/src="([^"]+)"/)?.[1];
  const alt = match[2].match(/alt="([^"]+)"/)?.[1];
  if (!src || !alt) return '';
  return `<a class="client-logo" href="${escape(match[1])}" target="_blank" rel="noopener noreferrer" data-reveal><img src="${escape(src)}" alt="${escape(alt)}" loading="lazy" decoding="async"></a>`;
}).filter(Boolean);
if (logos.length !== 14) throw new Error(`Quantidade inesperada de clientes: ${logos.length}`);
write('clientes.html', layout('Clientes', hero('Clientes', 'Parcerias que fazem parte da nossa história.', 'Conheça empresas e organizações que contam com as soluções da Microgate.') + `<section class="inner-light"><div class="wrap"><div class="inner-section-heading" data-reveal><p class="eyebrow">Nossos clientes</p><h2>Histórias de clientes como você.</h2><p>Clique nas marcas para visitar seus sites.</p></div><div class="client-grid">${logos.join('')}</div></div></section>` + cta('Sua empresa pode contar com a gente.')));

const portfolio = hero('Portfólio', 'Projetos que conectam pessoas e tecnologia.', 'Conheça o trabalho da Microgate na reestruturação do datacenter da WAP.', 'img/projeto_wap/4.webp', 'Racks do datacenter da WAP após a reestruturação') + `
<section class="inner-light"><div class="wrap portfolio-story"><div class="portfolio-story__heading" data-reveal><p class="eyebrow">Projeto WAP</p><h2>Reestruturação do datacenter.</h2><p>Organização de infraestrutura e mapeamento dos pontos de rede.</p></div><ul class="detail-list portfolio-list"><li data-reveal><span>↗</span>Reestruturação e organização completa dos racks do datacenter</li><li data-reveal><span>↗</span>Remontagem completa dos patch panels</li><li data-reveal><span>↗</span>Organização do cabeamento estruturado nos racks</li><li data-reveal><span>↗</span>Mapeamento de todos os pontos de rede nas mesas de trabalho</li><li data-reveal><span>↗</span>Certificação funcional de todos os pontos de rede</li></ul></div><div class="wrap portfolio-photos"><img src="img/projeto_wap/4.webp" alt="Racks do datacenter da WAP" loading="lazy" data-reveal><img src="img/projeto_wap/5.webp" alt="Cabeamento dos racks do datacenter da WAP" loading="lazy" data-reveal></div></section>
<section class="inner-dark"><div class="wrap topology-layout"><div data-reveal><p class="eyebrow">Projeto WAP</p><h2>Sistema Topologia.</h2><p>Sistema para visualização completa do mapeamento dos pontos de rede da empresa.</p><ul><li>Frontend: React + Vite</li><li>Backend: Node.js + Express</li><li>Banco de dados: MariaDB remoto</li><li>Autenticação: JWT + bcrypt</li></ul><a class="button button-primary" href="https://topologia.microgateit.com.br" target="_blank" rel="noopener noreferrer">Acessar sistema ${arrow}</a></div><img src="img/projeto_wap/topologia.webp" alt="Sistema Topologia mostrando o mapa e os pontos de rede" loading="lazy" data-reveal></div></section>` + cta('Vamos conversar sobre seu projeto?');
write('portifolio.html', layout('Portfólio', portfolio));

write('dicas-ti.html', layout('Dicas de TI', hero('Dicas de TI', 'Conhecimento para navegar com mais segurança.', 'Vídeos do projeto Cidadão na Rede, do NIC.br, sobre segurança digital, proteção de dados e uso responsável da internet.') + `<section class="inner-light"><div class="wrap"><div class="inner-section-heading" data-reveal><p class="eyebrow">Cidadão na Rede / NIC.br</p><h2>Dicas para o dia a dia.</h2></div><div class="tip-grid all-tips" data-all-videos><p>Confira os vídeos do <a href="https://cidadaonarede.nic.br" target="_blank" rel="noopener noreferrer">Cidadão na Rede</a>.</p></div><p class="inner-credit">Vídeos: <a href="https://cidadaonarede.nic.br" target="_blank" rel="noopener noreferrer">NIC.br — Cidadão na Rede</a>, licenciados sob <a href="https://creativecommons.org/licenses/by-nd/4.0/" target="_blank" rel="noopener noreferrer">CC BY-ND 4.0</a>.</p></div></section>`));

const downloads = [
  {href:'Downloads/Microgate.exe', type:'Aplicativo Microgate', title:'Microgate', desc:'Ferramenta principal para o atendimento remoto.', icon:'microscope'},
  {href:'Downloads/SuporteTi.exe', type:'Windows', title:'Windows', desc:'Versão para computadores e notebooks Windows.', icon:'monitor'},
  {href:'Downloads/SuporteTi-x86_64%20.dmg', type:'Mac Intel', title:'Mac x86_64', desc:'Para Macs com processador Intel.', icon:'apple'},
  {href:'Downloads/SuporteTi-aarch64.dmg', type:'Mac Apple Silicon', title:'Mac ARM64', desc:'Para Macs com chip Apple Silicon.', icon:'apple'}
];
const downloadCards = downloads.map(d => `<a class="utility-card" href="${d.href}" download data-reveal><span class="utility-icon"><i data-lucide="${d.icon}"></i></span><span class="utility-type">${d.type}</span><strong>${d.title}</strong><span class="utility-desc">${d.desc}</span><span class="utility-action">Baixar agora ↓</span></a>`).join('');
write('downloads.html', layout('Suporte remoto', hero('Suporte remoto', 'Conecte seu computador ao nosso time técnico.', 'Escolha a versão do seu sistema operacional, baixe o aplicativo e abra o arquivo para iniciar o atendimento com a Microgate.') + `<section class="inner-light"><div class="wrap"><div class="inner-section-heading" data-reveal><p class="eyebrow">Escolha sua versão</p><h2>Aplicativos para suporte.</h2></div><div class="utility-grid">${downloadCards}</div><p class="utility-note">Versão para Linux: <strong>em breve.</strong></p></div></section>`));

write('testeconexao.html', layout('Teste de conexão', hero('Teste de conexão', 'Como está a sua conexão?', 'Realize o teste de velocidade da sua conexão com a internet.') + `<section class="inner-light"><div class="wrap"><div class="inner-section-heading" data-reveal><p class="eyebrow">Ferramenta</p><h2>Teste de conexão.</h2><p>O teste abaixo é fornecido pelo Fast.com.</p></div><div class="speed-frame" data-reveal><iframe src="https://fast.com" title="Teste de velocidade Fast.com" loading="lazy"></iframe></div><p class="inner-credit">Se o teste não carregar, <a href="https://fast.com" target="_blank" rel="noopener noreferrer">abra o Fast.com em outra aba</a>.</p></div></section>`));

const restricted = [...read('restricted.html').matchAll(/<a\s+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi)].map(match => {
  const heading = match[2].match(/<h3[^>]*>([\s\S]*?)<\/h3>/i);
  if (!heading) return '';
  const desc = match[2].match(/<p[^>]*>([\s\S]*?)<\/p>/i);
  const icon = match[2].match(/data-lucide="([^"]+)"/)?.[1] || 'layout-grid';
  return `<a class="utility-card" href="${escape(match[1])}" target="_blank" rel="noopener noreferrer" data-reveal><span class="utility-icon"><i data-lucide="${escape(icon)}"></i></span><strong>${escape(text(heading[1]))}</strong>${desc && text(desc[1]) ? `<span class="utility-desc">${escape(text(desc[1]))}</span>` : ''}<span class="utility-action">Acessar ${arrow}</span></a>`;
}).filter(Boolean);
if (restricted.length !== 7) throw new Error(`Quantidade inesperada de links restritos: ${restricted.length}`);
write('restricted.html', layout('Área restrita', hero('Área restrita', 'Sistemas internos.', 'Acesse as ferramentas e os sistemas internos da Microgate.') + `<section class="inner-light"><div class="wrap"><div class="inner-section-heading" data-reveal><p class="eyebrow">Acesso rápido</p><h2>Ferramentas da equipe.</h2></div><div class="utility-grid">${restricted.join('')}</div></div></section>`));

const linksSource = read('links.html');
const shareDialog = linksSource.match(/<dialog class="share-dialog"[\s\S]*?<\/dialog>/i)?.[0];
const linksNav = linksSource.match(/<nav class="links"[\s\S]*?<\/nav>/i)?.[0];
const linksScript = [...linksSource.matchAll(/<script>([\s\S]*?)<\/script>/gi)].at(-1)?.[1];
if (!shareDialog || !linksNav || !linksScript) throw new Error('Não foi possível preservar o compartilhamento da página de links.');
const linksPage = hero('Links', '@microgateitsolutions', 'Soluções tecnológicas para sua empresa.') + `<section class="inner-light"><div class="wrap links-layout"><div data-reveal><p class="eyebrow">Microgate IT Solutions</p><h2>Encontre a Microgate.</h2><p>Contato, portfólio, site e redes sociais em um só lugar.</p><button class="button button-outline share-trigger" id="share-button" type="button">Compartilhar ${arrow}</button></div><div data-reveal>${linksNav}</div></div>${shareDialog}</section>`;
write('links.html', layout('Links', linksPage, `<script>${linksScript}</script>`));

// O teste de teclado permanece autônomo e conserva seu JavaScript e jsPDF.
let keyboard = read('teste_teclado.html')
  .replace('<head>', '<head>\n<base href="../../../">\n<meta name="robots" content="noindex, nofollow">')
  .replace(/\s*<link rel="canonical"[^>]*>/i, '')
  .replace('href="https://microgateit.com.br" rel="noopener noreferrer"', 'href="output/previews/site/index.html"')
  .replace('</head>', `<style>
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600;700&display=swap');
:root{--site-font:'DM Sans',sans-serif;--site-ink:#0b2030;--site-panel:#102c3b;--site-text:#f3f8f8;--site-muted:#bfd1d5;--site-line:rgba(189,213,220,.18);--site-accent:#a5dce0;--site-accent-strong:#a5dce0;--site-action:#a5dce0;--site-on-action:#0b2030;--bg3:#183c4b;--bg4:#234a58}
header{background:#0b2030}.btn{border-radius:999px}.btn-primary:hover{background:#d2f2ef}
</style>\n</head>`);
write('teste_teclado.html', keyboard);

console.log('Prévia gerada: página inicial, 11 páginas internas e teste de teclado autônomo.');
