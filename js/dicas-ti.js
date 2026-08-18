// js/dicas-ti.js
// Renderiza o carrossel (home) e o grid (dicas-ti.html) a partir de data/dicas-ti-videos.js.
// Padrão facade: o iframe do YouTube (youtube-nocookie) só é criado após o clique no play.

(function () {
    function getVideos() {
        return Array.isArray(window.DICAS_TI_VIDEOS) ? window.DICAS_TI_VIDEOS.slice() : [];
    }

    function makeFacade(video) {
        const wrap = document.createElement('div');
        wrap.className = 'relative aspect-video bg-black cursor-pointer';
        wrap.setAttribute('role', 'button');
        wrap.setAttribute('aria-label', 'Reproduzir vídeo: ' + video.titulo);

        const img = document.createElement('img');
        img.src = 'https://img.youtube.com/vi/' + video.id + '/mqdefault.jpg';
        img.alt = video.titulo;
        img.loading = 'lazy';
        img.className = 'w-full h-full object-cover';
        wrap.appendChild(img);

        const overlay = document.createElement('div');
        overlay.className = 'absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/50 transition';
        const play = document.createElement('span');
        play.className = 'w-12 h-12 flex items-center justify-center rounded-full bg-white/90 text-black shadow-lg transition hover:scale-110';
        const icon = document.createElement('i');
        icon.setAttribute('data-lucide', 'play');
        icon.className = 'w-6 h-6 fill-current ml-0.5';
        play.appendChild(icon);
        overlay.appendChild(play);
        wrap.appendChild(overlay);

        wrap.addEventListener('click', function () {
            const iframe = document.createElement('iframe');
            iframe.src = 'https://www.youtube-nocookie.com/embed/' + video.id + '?rel=0&hl=pt&autoplay=1';
            iframe.title = video.titulo;
            iframe.loading = 'lazy';
            iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
            iframe.allowFullscreen = true;
            iframe.className = 'absolute inset-0 w-full h-full border-0';
            wrap.replaceChildren(iframe);
        });

        return wrap;
    }

    function makeCard(video, isCarousel) {
        const article = document.createElement('article');
        article.className = isCarousel
            ? 'snap-start shrink-0 w-72 md:w-80 bg-white/5 border border-white/10 rounded-2xl overflow-hidden flex flex-col'
            : 'bg-white/5 border border-white/10 rounded-2xl overflow-hidden flex flex-col';

        const body = document.createElement('div');
        body.className = 'p-5 flex flex-col gap-2 flex-1';

        const badge = document.createElement('span');
        badge.className = 'self-start bg-metallic-chrome text-black px-2 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide';
        badge.textContent = video.categoria;

        const h3 = document.createElement('h3');
        h3.className = 'text-white font-bold text-base leading-snug';
        h3.textContent = video.titulo;

        const p = document.createElement('p');
        p.className = 'text-sm text-gray-400 leading-relaxed';
        p.textContent = video.descricao;

        body.appendChild(badge);
        body.appendChild(h3);
        body.appendChild(p);

        article.appendChild(makeFacade(video));
        article.appendChild(body);
        return article;
    }

    function renderCarousel() {
        const track = document.getElementById('dicas-ti-carousel');
        if (!track) return null;

        getVideos().slice(0, 6).forEach(function (video) {
            track.appendChild(makeCard(video, true));
        });

        const prev = document.getElementById('dicas-ti-prev');
        const next = document.getElementById('dicas-ti-next');
        if (prev && next) {
            const step = function () {
                const card = track.querySelector('article');
                return card ? card.offsetWidth + 24 : 320;
            };
            prev.addEventListener('click', function () {
                track.scrollBy({ left: -step(), behavior: 'smooth' });
            });
            next.addEventListener('click', function () {
                track.scrollBy({ left: step(), behavior: 'smooth' });
            });
        }
        return track;
    }

    function renderGrid() {
        const grid = document.getElementById('dicas-ti-grid');
        if (!grid) return null;

        getVideos().forEach(function (video) {
            grid.appendChild(makeCard(video, false));
        });
        return grid;
    }

    document.addEventListener('DOMContentLoaded', function () {
        const carousel = renderCarousel();
        const grid = renderGrid();
        if ((carousel || grid) && window.lucide) {
            window.lucide.createIcons();
        }
    });
})();