const fs = require('fs');
const path = require('path');

// Os arquivos gerados são independentes das páginas públicas existentes.
const dir = __dirname;
const versions = [
  { id: 2, name: 'Institucional', short: 'Institucional', css: 'claro', kicker: 'Microgate IT Solutions', title: 'Uma TI mais simples começa com as pessoas certas.', lead: 'Consultoria, suporte e infraestrutura para sua equipe trabalhar com tranquilidade todos os dias.', image: 'img/datacenter.webp', alt: 'Rack e equipamentos de infraestrutura de TI', detail: 'Perto da sua empresa. Presente no que importa.' }
];

const escape = (s) => s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const arrow = '<span aria-hidden="true">↗</span>';
const whatsapp = 'https://wa.me/554199550984';
const map = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3605.199437000244!2d-49.10452292395148!3d-25.364631577603483!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94dcec12acb0da0f%3A0xc1dd5e202bbc3579!2sMicrogate%20IT%20Solutions!5e0!3m2!1spt-BR!2sbr!4v1770663696185!5m2!1spt-BR!2sbr';

function layout(title, bodyClass, content, current) {
  const switches = versions.map(v => `<a href="output/previews/proposta-${v.id}.html" aria-label="Proposta ${v.id}: ${escape(v.name)}"${current === v.id ? ' aria-current="page"' : ''}><span>${v.id}</span><span class="switch-name">${escape(v.short)}</span></a>`).join('');
  const pagePath = current ? `output/previews/proposta-${current}.html` : 'output/previews/index.html';
  // A base aponta para a raiz, então as âncoras precisam incluir a página atual.
  const localContent = content.replace(/href="#([^"]+)"/g, `href="${pagePath}#$1"`);
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex, nofollow">
  <base href="../../">
  <title>${escape(title)} | Microgate</title>
  <link rel="icon" href="img/ico.ico">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700;800;900&family=Barlow+Condensed:wght@500;600;700&family=DM+Sans:wght@400;500;600;700&family=IBM+Plex+Sans:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&family=Outfit:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/output.css">
  <link rel="stylesheet" href="output/previews/preview.css">
  <script src="js/icons.js"></script>
  <script src="https://unpkg.com/lucide@latest"></script>
  <script src="js/version.js"></script>
  <script src="data/dicas-ti-videos.js"></script>
  <script src="js/components.js" defer></script>
  <script src="output/previews/preview.js" defer></script>
  <script src="output/previews/site/site.js" defer></script>
</head>
<body class="preview ${bodyClass}">
  <a class="skip-link" href="${pagePath}#conteudo">Ir para o conteúdo</a>
  <div class="preview-switcher" aria-label="Navegação das propostas">
    <a class="switcher-home" href="output/previews/index.html"><span aria-hidden="true">←</span> <span>Apresentação</span></a>
    <span class="switcher-label">Prévia</span>
    <nav aria-label="Proposta selecionada">${switches}</nav>
  </div>
  <div id="header-placeholder"></div>
  <main id="conteudo">${localContent}</main>
  <footer id="footer-placeholder"></footer>
</body>
</html>\n`;
}

function diagram() {
  return `<div class="connection-art" aria-label="Áreas conectadas: consultoria, redes e suporte">
    <svg class="connection-lines" viewBox="0 0 500 420" preserveAspectRatio="none" aria-hidden="true"><path d="M0 100H140L206 166H500M0 318H112L206 224H500M0 210H500"/><circle cx="206" cy="210" r="47"/><circle cx="140" cy="100" r="5"/><circle cx="112" cy="318" r="5"/></svg>
    <span class="connection-chip connection-chip--one">Consultoria</span><span class="connection-chip connection-chip--two">Redes</span><span class="connection-chip connection-chip--three">Suporte</span>
    <span class="connection-center" aria-hidden="true">M</span>
  </div>`;
}

function hero(v) {
  const visual = v.id === 3 ? diagram() : v.id === 5 ? `<div class="geometric-art" aria-hidden="true"><span></span><span></span><span></span><span></span></div>` : `<div class="hero-photo"><img src="${v.image}" alt="${escape(v.alt)}" fetchpriority="high"><div class="photo-caption"><span>Microgate / ${v.id === 4 ? 'Projeto WAP' : 'Infraestrutura'}</span><strong>${escape(v.detail)}</strong></div></div>`;
  return `<section class="hero" aria-labelledby="hero-title">
    <div class="hero-inner wrap">
      <div class="hero-copy">
        <p class="eyebrow"><span class="eyebrow-mark" aria-hidden="true"></span>${escape(v.kicker)}</p>
        <h1 id="hero-title">${escape(v.title)}</h1>
        <p class="hero-lead">${escape(v.lead)}</p>
        <div class="hero-actions"><a class="button button-primary" href="${whatsapp}" target="_blank" rel="noopener noreferrer">Fale com a Microgate ${arrow}</a><a class="text-link" href="#servicos">Conheça nossos serviços <span aria-hidden="true">↓</span></a></div>
      </div>
      ${visual}
    </div>
    <div class="hero-bottom wrap"><span>Campina Grande do Sul, PR</span><span>TI para empresas desde 2001</span></div>
  </section>`;
}

function services() {
  return `<section class="services section-pad" id="servicos">
    <div class="wrap services-layout">
      <div class="section-intro"><p class="eyebrow">O que fazemos</p><h2>Tecnologia que acompanha a sua rotina.</h2><p>Da estratégia ao atendimento, a Microgate reúne soluções para as necessidades de TI da sua empresa.</p><a class="text-link" href="/sobre#servicos">Ver todos os serviços ${arrow}</a></div>
      <div class="service-list">
        <a class="service-item" href="/consultoria"><span class="service-symbol" aria-hidden="true"><i data-lucide="monitor-cog"></i></span><span class="service-text"><strong>Consultoria e gestão</strong><small>Servidores, backups, segurança e suporte para o dia a dia.</small></span><span class="service-arrow" aria-hidden="true">↗</span></a>
        <a class="service-item" href="/rede"><span class="service-symbol" aria-hidden="true"><i data-lucide="wifi"></i></span><span class="service-text"><strong>Redes e infraestrutura</strong><small>Projetos, cabeamento, Wi-Fi, racks e equipamentos de rede.</small></span><span class="service-arrow" aria-hidden="true">↗</span></a>
        <a class="service-item" href="/assistencia"><span class="service-symbol" aria-hidden="true"><i data-lucide="cpu"></i></span><span class="service-text"><strong>Assistência técnica</strong><small>Manutenção, reparos e melhorias para seus equipamentos.</small></span><span class="service-arrow" aria-hidden="true">↗</span></a>
      </div>
    </div>
  </section>`;
}

function project() {
  return `<section class="project-section section-pad" aria-labelledby="project-title"><div class="wrap project-layout">
    <div class="project-photo"><img src="img/projeto_wap/4.webp" alt="Racks do datacenter da WAP após a reestruturação" loading="lazy" decoding="async"><span>Infraestrutura / Projeto WAP</span></div>
    <div class="project-copy"><p class="eyebrow">Trabalho em campo</p><h2 id="project-title">Organização que se vê. Infraestrutura que se sente.</h2><p>Na WAP, a Microgate trabalhou na reestruturação dos racks, no cabeamento e no mapeamento dos pontos de rede do datacenter.</p><a class="button button-outline" href="/portifolio">Conheça o projeto ${arrow}</a></div>
  </div></section>`;
}

function tips() {
  return `<section class="tips-section section-pad" id="dicas-ti"><div class="wrap"><div class="section-top"><div><p class="eyebrow">Conhecimento para o dia a dia</p><h2>Dicas de TI</h2></div><a class="text-link" href="/dicas-ti">Ver todas as dicas ${arrow}</a></div><p class="tips-intro">Vídeos do projeto Cidadão na Rede, do NIC.br, sobre segurança digital e uso responsável da internet.</p><div class="tip-grid" data-tip-grid><p>Confira os vídeos na página <a href="/dicas-ti">Dicas de TI</a>.</p></div><p class="tips-credit">Cidadão na Rede / NIC.br · vídeos sob licença <a href="https://creativecommons.org/licenses/by-nd/4.0/deed.pt-br" target="_blank" rel="noopener noreferrer">CC BY-ND 4.0</a></p></div></section>`;
}

function contact() {
  return `<section class="contact-section section-pad" id="contato"><div class="wrap contact-layout"><div class="contact-copy"><p class="eyebrow">Estamos por perto</p><h2>Vamos conversar sobre a sua TI?</h2><p>Estamos em Campina Grande do Sul, prontos para ajudar a sua empresa.</p><div class="contact-details"><div><span>Endereço</span><p>Rua Leonardo Francischelli, 265 · Sala 04<br>Campina Grande do Sul – PR</p></div><div><span>Telefone</span><p><a href="tel:+554136797168">(41) 3679-7168</a></p></div><div><span>WhatsApp</span><p><a href="${whatsapp}" target="_blank" rel="noopener noreferrer">(41) 9955-0984</a></p></div></div><a class="button button-primary" href="${whatsapp}" target="_blank" rel="noopener noreferrer">Iniciar atendimento ${arrow}</a></div><div class="map-panel"><iframe title="Localização da Microgate no Google Maps" src="${map}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe><a href="https://www.google.com/maps/search/?api=1&query=Microgate+IT+Solutions+Campina+Grande+do+Sul" target="_blank" rel="noopener noreferrer">Abrir no Google Maps ${arrow}</a></div></div></section>`;
}

for (const v of versions) {
  const content = hero(v) + (v.id === 4 ? project() + services() : services() + project()) + tips() + contact();
  fs.writeFileSync(path.join(dir, `proposta-${v.id}.html`), layout(`Proposta ${v.id} — ${v.name}`, `theme-${v.css}`, content, v.id), 'utf8');
}

const galleryCards = versions.map(v => `<a class="gallery-card gallery-card--${v.css}" href="output/previews/proposta-${v.id}.html"><div class="gallery-art"><img src="output/previews/imagens/proposta-${v.id}.webp" alt="" width="840" height="525" loading="lazy"><span class="gallery-number">0${v.id}</span></div><div class="gallery-card-body"><div><p>PROPOSTA 0${v.id}</p><h2>${escape(v.name)}</h2></div><span aria-hidden="true">↗</span></div></a>`).join('');
const gallery = `<section class="gallery-hero"><div class="wrap"><p class="eyebrow">Microgate IT Solutions / Estudo visual</p><h1>Uma nova direção<br><span>para a Microgate.</span></h1><p>Conheça a proposta selecionada para a página inicial da Microgate.</p><a href="#propostas" class="gallery-down">Ver proposta <span aria-hidden="true">↓</span></a></div></section><section id="propostas" class="gallery-section"><div class="wrap"><div class="gallery-heading"><div><p class="eyebrow">Prévia selecionada</p><h2>Uma proposta.<br>Uma só Microgate.</h2></div><p>Abra a prévia para navegar pela página no computador ou no celular.</p></div><div class="gallery-grid">${galleryCards}</div></div></section>`;
fs.writeFileSync(path.join(dir, 'index.html'), layout('Proposta selecionada', 'theme-gallery', gallery, 0), 'utf8');
console.log('Criada a proposta selecionada e sua página de apresentação.');
