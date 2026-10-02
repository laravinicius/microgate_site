(function () {
    const icons = {
        'arrow-right': '<path d="M5 12h14m-6-6 6 6-6 6"/>',
        'arrow-up-right': '<path d="M7 17 17 7M7 7h10v10"/>',
        'chevron-left': '<path d="m15 18-6-6 6-6"/>',
        'chevron-right': '<path d="m9 18 6-6-6-6"/>',
        'message-circle': '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>',
        'map-pin': '<path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
        phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .3 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.4 1.8.6 2.8.7a2 2 0 0 1 1.8 2.1Z"/>',
        eye: '<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>',
        target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
        wifi: '<path d="M2 8.8a16 16 0 0 1 20 0M5 12a11 11 0 0 1 14 0m-11 3.2a6 6 0 0 1 8 0M12 19h.01"/>',
        'monitor-cog': '<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8m-4-4v4M12 7v1m0 4v1m-3-3H8m8 0h-1m-5.1-2.1-.7-.7m5.6 5.6-.7-.7m-4.2 0-.7.7m5.6-5.6-.7.7"/><circle cx="12" cy="10" r="2"/>',
        'shopping-cart': '<circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/>',
        mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.9 5.6a2 2 0 0 1-2.2 0L2 7"/>',
        'audio-lines': '<path d="M2 10v4m4-7v10m4-14v18m4-13v10m4-11v14m4-10v6"/>',
        tags: '<path d="m15 5 7 7-8 8M2 2h7l10 10-7 7L2 9Z"/><circle cx="6" cy="6" r="1"/>',
        apple: '<path d="M12 20.5c-1.1 1.1-2.4 1-3.6.5-1.2-.5-2.3-.5-3.6 0-1.6.6-2.4.4-3.4-.5C-2 15.9.3 7.1 4.4 6.8c1.4.1 2.4.8 3.1.8.9 0 2.4-1 4-0.9 2.1.2 3.7 1 4.5 2.4-4.3 2.6-3.3 8.2.7 9.8-.8 1.8-1.8 3.5-3.5 5.3zM12 3.5c.7-1 1.9-1.8 3.2-1.9.2 1.4-.4 2.8-1.2 3.6-.8.9-2.2 1.6-3.5 1.5-.1-1.3.5-2.7 1.5-3.2z"/></svg>',
        'chevron-down': '<path d="m6 9 6 6 6-6"/></svg>',
        cpu: '<rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3"/></svg>',
        download: '<path d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14"/></svg>',
        gauge: '<path d="m12 14 4-4"/><path d="M3.3 17a9 9 0 1 1 17.4 0"/><path d="M5 21h14"/></svg>',
        home: '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/></svg>',
        info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>',
        'layout-grid': '<rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/></svg>',
        lock: '<rect width="16" height="12" x="4" y="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>',
        menu: '<path d="M4 6h16M4 12h16M4 18h16"/></svg>',
        microscope: '<path d="M6 18h8M3 22h18M14 22a6 6 0 0 0-6-6V5h4"/><path d="M9 5h6M12 5V2M17 12a5 5 0 0 1-5 5"/></svg>',
        monitor: '<rect width="20" height="14" x="2" y="3" rx="2"/><path d="M8 21h8M12 17v4"/></svg>',
        play: '<polygon points="6 3 20 12 6 21 6 3"/></svg>',
        terminal: '<path d="m4 17 6-5-6-5M12 19h8"/></svg>',
        'user-check': '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM17 11l2 2 4-4"/></svg>',
        users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
        video: '<path d="m16 13 5 3V8l-5 3z"/><rect width="14" height="12" x="2" y="6" rx="2"/></svg>',
        x: '<path d="M18 6 6 18M6 6l12 12"/></svg>'
    };

    function createIcons() {
        document.querySelectorAll('[data-lucide]').forEach((element) => {
            const name = element.getAttribute('data-lucide');
            const content = icons[name];
            if (!content) return;
            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
            svg.setAttribute('width', element.getAttribute('width') || '24');
            svg.setAttribute('height', element.getAttribute('height') || '24');
            svg.setAttribute('viewBox', '0 0 24 24');
            svg.setAttribute('fill', 'none');
            svg.setAttribute('stroke', 'currentColor');
            svg.setAttribute('stroke-width', '2');
            svg.setAttribute('stroke-linecap', 'round');
            svg.setAttribute('stroke-linejoin', 'round');
            svg.setAttribute('aria-hidden', 'true');
            svg.setAttribute('class', element.getAttribute('class') || '');
            if (element.id) svg.id = element.id;
            svg.innerHTML = content;
            element.replaceWith(svg);
        });
    }

    window.lucide = { createIcons };
})();
