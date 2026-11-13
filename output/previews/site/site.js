(function () {
  const prefix = '/output/previews/site/';
  const routes = {
    '': 'index.html', index: 'index.html', sobre: 'sobre.html',
    consultoria: 'consultoria.html', rede: 'rede.html', assistencia: 'assistencia.html',
    clientes: 'clientes.html', portifolio: 'portifolio.html', 'dicas-ti': 'dicas-ti.html',
    downloads: 'downloads.html', testeconexao: 'testeconexao.html', restricted: 'restricted.html',
    links: 'links.html', teste_teclado: 'teste_teclado.html'
  };

  function localize(link) {
    const href = link.getAttribute('href');
    if (!href || /^(mailto:|tel:|javascript:)/i.test(href)) return;
    if (href.startsWith('#')) {
      link.setAttribute('href', window.location.pathname + href);
      return;
    }
    let url;
    try { url = new URL(href, document.baseURI); } catch { return; }
    if (url.origin !== window.location.origin && !/^(www\.)?microgateit\.com\.br$/i.test(url.hostname)) return;
    if (url.pathname.startsWith(prefix)) return;
    if (url.pathname === '/output/previews/proposta-2.html') {
      link.setAttribute('href', prefix + 'index.html' + url.search + url.hash);
      return;
    }
    const slug = url.pathname.replace(/^\/+|\/+$/g, '').replace(/\.html$/i, '').toLowerCase();
    if (slug === 'servicos') {
      link.setAttribute('href', prefix + 'sobre.html#servicos');
    } else if (Object.prototype.hasOwnProperty.call(routes, slug)) {
      link.setAttribute('href', prefix + routes[slug] + url.search + url.hash);
    }
  }

  function localizeTree(root) {
    if (root.nodeType !== 1 && root.nodeType !== 9) return;
    if (root.matches && root.matches('a[href]')) localize(root);
    root.querySelectorAll('a[href]').forEach(localize);
  }
  localizeTree(document);
  new MutationObserver(mutations => mutations.forEach(mutation => mutation.addedNodes.forEach(localizeTree)))
    .observe(document.body, { childList: true, subtree: true });

  const videoGrid = document.querySelector('[data-all-videos]');
  if (videoGrid && Array.isArray(window.DICAS_TI_VIDEOS)) {
    videoGrid.replaceChildren();
    window.DICAS_TI_VIDEOS.forEach(video => {
      const article = document.createElement('article');
      article.className = 'tip-card';
      article.dataset.reveal = '';
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'tip-visual';
      button.setAttribute('aria-label', 'Reproduzir vídeo: ' + video.titulo);
      const img = document.createElement('img');
      img.src = 'https://img.youtube.com/vi/' + encodeURIComponent(video.id) + '/mqdefault.jpg';
      img.alt = '';
      img.loading = 'lazy';
      img.width = 320;
      img.height = 180;
      const play = document.createElement('span');
      play.className = 'tip-play';
      play.setAttribute('aria-hidden', 'true');
      play.textContent = '▶';
      button.append(img, play);
      button.addEventListener('click', () => {
        const frame = document.createElement('iframe');
        frame.src = 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(video.id) + '?rel=0&hl=pt&autoplay=1';
        frame.title = video.titulo;
        frame.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
        frame.allowFullscreen = true;
        const holder = document.createElement('div');
        holder.className = 'tip-visual';
        holder.append(frame);
        button.replaceWith(holder);
      });
      const category = document.createElement('p');
      category.className = 'tip-type';
      category.textContent = video.categoria;
      const title = document.createElement('h3');
      title.textContent = video.titulo;
      const description = document.createElement('p');
      description.textContent = video.descricao;
      article.append(button, category, title, description);
      videoGrid.append(article);
    });
  }

  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!motion.matches && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.remove('site-pending');
      observer.unobserve(entry.target);
    }), { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    document.querySelectorAll('[data-reveal]').forEach(element => {
      const bounds = element.getBoundingClientRect();
      if (bounds.bottom < 0 || bounds.top > window.innerHeight) {
        element.classList.add('site-reveal', 'site-pending');
        observer.observe(element);
      }
    });
    document.addEventListener('focusin', event => {
      const pending = event.target.closest('.site-pending');
      if (pending) { pending.classList.remove('site-pending'); observer.unobserve(pending); }
    });
    motion.addEventListener('change', event => {
      if (!event.matches) return;
      document.querySelectorAll('.site-pending').forEach(el => el.classList.remove('site-pending'));
      observer.disconnect();
    });
  }
})();
