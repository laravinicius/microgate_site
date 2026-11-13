(function () {
  const grid = document.querySelector('[data-tip-grid]');
  if (grid && Array.isArray(window.DICAS_TI_VIDEOS)) {
    grid.replaceChildren();
    window.DICAS_TI_VIDEOS.slice(0, 3).forEach(function (video) {
      const article = document.createElement('article');
      article.className = 'tip-card';

      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'tip-visual';
      button.setAttribute('aria-label', 'Reproduzir vídeo: ' + video.titulo);
      const image = document.createElement('img');
      image.src = 'https://img.youtube.com/vi/' + encodeURIComponent(video.id) + '/mqdefault.jpg';
      image.alt = '';
      image.width = 320;
      image.height = 180;
      image.loading = 'lazy';
      image.decoding = 'async';
      const play = document.createElement('span');
      play.className = 'tip-play';
      play.setAttribute('aria-hidden', 'true');
      play.textContent = '▶';
      button.append(image, play);
      button.addEventListener('click', function () {
        const frame = document.createElement('iframe');
        frame.src = 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(video.id) + '?rel=0&hl=pt&autoplay=1';
        frame.title = video.titulo;
        frame.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
        frame.allowFullscreen = true;
        const container = document.createElement('div');
        container.className = 'tip-visual';
        container.appendChild(frame);
        button.replaceWith(container);
      });

      const category = document.createElement('p');
      category.className = 'tip-type';
      category.textContent = video.categoria;
      const title = document.createElement('h3');
      title.textContent = video.titulo;
      const description = document.createElement('p');
      description.textContent = video.descricao;
      article.append(button, category, title, description);
      grid.appendChild(article);
    });
  }

  // Revela os elementos fora da tela na proposta selecionada.
  const selectedPreview = document.body.matches('.theme-claro');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let revealObserver = null;

  function reveal(element) {
    element.classList.remove('reveal-pending');
    if (revealObserver) revealObserver.unobserve(element);
  }

  function registerReveal(elements) {
    if (!revealObserver || reducedMotion.matches) return;
    elements.forEach(function (element) {
      const bounds = element.getBoundingClientRect();
      if (bounds.bottom < 0 || bounds.top > window.innerHeight) {
        element.classList.add('scroll-reveal', 'reveal-pending');
        revealObserver.observe(element);
      }
    });
  }

  if (selectedPreview && !reducedMotion.matches && 'IntersectionObserver' in window) {
    revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) reveal(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    registerReveal(document.querySelectorAll([
      '.section-intro', '.service-item', '.project-photo', '.project-copy',
      '.section-top', '.tips-intro', '.tip-card', '.tips-credit',
      '.contact-copy > .eyebrow', '.contact-copy > h2',
      '.contact-copy > p:not(.eyebrow)', '.contact-details > div',
      '.contact-copy > .button', '.map-panel'
    ].join(', ')));

    document.addEventListener('focusin', function (event) {
      const pending = event.target.closest('.reveal-pending');
      if (pending) reveal(pending);
    });
    reducedMotion.addEventListener('change', function (event) {
      if (!event.matches) return;
      document.querySelectorAll('.reveal-pending').forEach(reveal);
      revealObserver.disconnect();
    });
  }

  // Complementa o menu comum sem alterar os componentes do site.
  const header = document.getElementById('header-placeholder');
  function optimizeLogos(container) {
    container.querySelectorAll('img[src$="logo_horizontal_white.webp"]').forEach(function (img) {
      img.src = 'output/previews/imagens/logo.webp';
    });
  }
  const observer = new MutationObserver(function () {
    const button = document.getElementById('mobile-menu-button');
    const menu = document.getElementById('mobile-menu');
    if (!button || !menu) return;
    optimizeLogos(header);
    button.setAttribute('aria-controls', 'mobile-menu');
    button.setAttribute('aria-expanded', 'false');
    const close = document.createElement('button');
    close.type = 'button';
    close.className = 'preview-menu-close';
    close.textContent = 'Fechar menu ×';
    close.addEventListener('click', function () { button.click(); button.focus(); });
    menu.prepend(close);
    observer.disconnect();
  });
  if (header) observer.observe(header, { childList: true, subtree: true });
  const footer = document.getElementById('footer-placeholder');
  if (footer) {
    const footerObserver = new MutationObserver(function () {
      if (!footer.querySelector('img')) return;
      optimizeLogos(footer);
      registerReveal(footer.querySelectorAll(':scope > div'));
      footerObserver.disconnect();
    });
    footerObserver.observe(footer, { childList: true, subtree: true });
  }
  document.addEventListener('click', function (event) {
    const button = document.getElementById('mobile-menu-button');
    const menu = document.getElementById('mobile-menu');
    if (!button || !menu) return;
    if (event.target.closest('#mobile-menu-button') || event.target.closest('#menu-overlay')) {
      const open = menu.classList.contains('translate-x-0');
      button.setAttribute('aria-expanded', String(open));
      button.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    }
  });
  document.addEventListener('keydown', function (event) {
    const menu = document.getElementById('mobile-menu');
    const button = document.getElementById('mobile-menu-button');
    if (event.key === 'Escape' && menu && button && menu.classList.contains('translate-x-0')) {
      button.click();
      button.focus();
    }
  });
})();
