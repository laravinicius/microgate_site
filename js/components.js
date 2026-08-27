async function loadComponents() {
    const components = [
        { id: 'header-placeholder', file: './components/header.html' },
        { id: 'footer-placeholder', file: './components/footer.html' }
    ];

    for (const comp of components) {
        try {
            const response = await fetch(
                `${comp.file}?v=${window.APP_VERSION || Date.now()}`,
                { cache: "no-cache" },
            );
            const html = await response.text();
            const el = document.getElementById(comp.id);
            if (el) {
                el.innerHTML = html;
            }
        } catch (err) {
            console.error(`Erro ao carregar ${comp.file}:`, err);
        }
    }

    // Gera breadcrumb estruturado (JSON-LD) baseado na URL atual
    injectBreadcrumbSchema();

    // Lógica do Menu Mobile
    const menuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuOverlay = document.getElementById('menu-overlay');
    const openIcon = document.getElementById('menu-icon-open');
    const closeIcon = document.getElementById('menu-icon-close');

    if (menuButton && mobileMenu) {
        const toggleMenu = () => {
            const isOpen = mobileMenu.classList.contains('translate-x-0');

            if (isOpen) {
                mobileMenu.classList.replace('translate-x-0', '-translate-x-full');
                menuOverlay.classList.add('hidden');
                openIcon.classList.remove('hidden');
                closeIcon.classList.add('hidden');
            } else {
                mobileMenu.classList.replace('-translate-x-full', 'translate-x-0');
                menuOverlay.classList.remove('hidden');
                openIcon.classList.add('hidden');
                closeIcon.classList.remove('hidden');
            }
        };

        menuButton.addEventListener('click', toggleMenu);
        menuOverlay.addEventListener('click', toggleMenu);
    }

    // Reinicializa ícones após carregar o HTML dinâmico
    createIconsOnceReady();
}

function createIconsOnceReady() {
    if (window.lucide) {
        window.lucide.createIcons();
        return;
    }
    // Se o lucide ainda não carregou, tenta novamente quando estiver disponível
    window.addEventListener('load', function onLoad() {
        if (window.lucide) {
            window.lucide.createIcons();
        }
    });
}

document.addEventListener('DOMContentLoaded', loadComponents);

function injectBreadcrumbSchema() {
    const path = window.location.pathname;
    const baseUrl = 'https://microgateinformatica.com.br';

    const pageMap = {
        '/index.html': { name: 'Início', url: baseUrl },
        '/sobre.html': { name: 'Sobre', url: baseUrl + '/sobre.html' },
        '/servicos.html': { name: 'Serviços', url: baseUrl + '/servicos.html' },
        '/consultoria.html': { name: 'Consultoria', url: baseUrl + '/consultoria.html' },
        '/rede.html': { name: 'Rede', url: baseUrl + '/rede.html' },
        '/assistencia.html': { name: 'Assistência', url: baseUrl + '/assistencia.html' },
        '/clientes.html': { name: 'Clientes', url: baseUrl + '/clientes.html' },
        '/dicas-ti.html': { name: 'Dicas de TI', url: baseUrl + '/dicas-ti.html' },
        '/testeconexao.html': { name: 'Teste de Conexão', url: baseUrl + '/testeconexao.html' },
        '/restricted.html': { name: 'Restrito', url: baseUrl + '/restricted.html' },
        '/': { name: 'Início', url: baseUrl }
    };

    const items = [{ '@type': 'ListItem', position: 1, name: 'Início', item: baseUrl }];

    if (path !== '/' && path !== '/index.html') {
        const page = pageMap[path];
        if (page) {
            items.push({ '@type': 'ListItem', position: 2, name: page.name, item: page.url });
        }
    }

    if (items.length > 1 || path === '/' || path === '/index.html') {
        const schema = {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: items
        };

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(schema);
        document.head.appendChild(script);
    }
}