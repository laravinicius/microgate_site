# Microgate Informática Website

Este é o repositório do website institucional da Microgate Informática, uma empresa especializada em soluções e serviços de TI. O site foi desenvolvido para apresentar a empresa, seus serviços, clientes e fornecer canais de contato.

## Visão Geral

O website da Microgate Informática é uma plataforma estática e responsiva, projetada para ser informativa e de fácil navegação. Ele destaca a experiência da empresa desde 2005 e seu compromisso em simplificar a tecnologia para seus clientes.

## Funcionalidades

-   **Página Inicial (`index.html`)**: Apresenta a Microgate Informática, sua missão e localização, com opções de contato e visualização de serviços.
-   **Sobre Nós (`sobre.html`)**: Detalha a história da empresa, sua missão, visão e valores, além de um convite para contato.
-   **Serviços (`servicos.html`)**: Lista os principais serviços oferecidos, como Gerenciamento & Consultoria, Serviços de Rede e Assistência Técnica, com links para páginas mais detalhadas.
-   **Páginas de Serviço Detalhadas**:
    -   **Assistência Técnica (`assistencia.html`)**: Informações sobre os serviços de reparo e manutenção de hardware e software.
    -   **Consultoria (`consultoria.html`)**: Detalhes sobre gerenciamento e consultoria em informática e TI.
    -   **Rede (`rede.html`)**: Informações sobre serviços de infraestrutura e gerenciamento de rede.
-   **Clientes (`clientes.html`)**: Exibe os logotipos de empresas parceiras e clientes da Microgate Informática.
-   **Teste de Conexão (`testeconexao.html`)**: Uma ferramenta integrada para que os usuários possam testar a velocidade de sua conexão à internet.
-   **Área Restrita (`restricted.html`)**: Links para sistemas internos e ferramentas de uso exclusivo da equipe Microgate (GLPI, Agenda de Técnicos, MK Auth, Webmail, etc.).
-   **Navegação Responsiva**: O site é otimizado para visualização em diferentes dispositivos (desktops, tablets e smartphones).
-   **Modo Escuro (Dark Mode)**: Suporte a tema escuro para uma melhor experiência visual.
-   **Componentes Reutilizáveis**: Cabeçalho e rodapé são carregados dinamicamente para consistência e facilidade de manutenção.
-   **Integração com WhatsApp**: Botões de contato direto via WhatsApp em várias páginas.

## Tecnologias Utilizadas

-   **HTML5**: Estrutura semântica das páginas.
-   **CSS**:
    -   **Tailwind CSS**: Framework CSS utilitário para estilização rápida e responsiva.
    -   **Custom CSS (`style.css`)**: Estilos adicionais e personalizações.
-   **JavaScript**:
    -   **`theme.js`**: Gerenciamento do tema (claro/escuro).
    -   **`components.js`**: Carregamento dinâmico de componentes como cabeçalho e rodapé.
    -   **`escala-abas.js`**: (Provavelmente para um painel administrativo interno) Gerenciamento de abas e exibição de escala de técnicos.
-   **Lucide Icons**: Biblioteca de ícones vetoriais leves e personalizáveis.
-   **Google Fonts**: Utilização da fonte 'Inter' para uma tipografia moderna e legível.

## Estrutura do Projeto

```
microgate_site/
├── css/
│   ├── output.css          # CSS gerado pelo Tailwind
│   └── style.css           # CSS customizado
├── img/                    # Imagens do site (logos, ícones, etc.)
├── js/
│   ├── components.js       # Script para carregar componentes (header, footer)
│   ├── escala-abas.js      # Script para gerenciamento de abas de escala (uso interno)
│   ├── theme.js            # Script para alternar temas (dark/light)
│   └── version.js          # Versão de cache gerada pelo postbuild (cache busting)
├── components/
│   ├── footer.html         # Componente HTML do rodapé
│   └── header.html         # Componente HTML do cabeçalho
├── assistencia.html        # Página de Assistência Técnica
├── clientes.html           # Página de Clientes
├── consultoria.html        # Página de Consultoria
├── index.html              # Página Inicial
├── rede.html               # Página de Serviços de Rede
├── restricted.html         # Página de Área Restrita (links internos)
├── servicos.html           # Página de Serviços
├── sobre.html              # Página Sobre Nós
└── testeconexao.html       # Página de Teste de Conexão
```

## Como Executar

Este é um site estático. Para visualizá-lo, basta abrir qualquer um dos arquivos `.html` diretamente em seu navegador web. Para um ambiente de desenvolvimento ou produção, os arquivos podem ser servidos por qualquer servidor web (Apache, Nginx, etc.).

> Sempre rodar `npm run build` antes de commitar qualquer mudança em `src/input.css`, `tailwind.config.js`, `components/*.html`, ou qualquer arquivo `.html`/`.js` referenciado no `<head>`. O `postbuild` atualiza os `?v=` (cache busting) automaticamente — commitar os arquivos alterados junto (`css/output.css`, `js/version.js` e os `.html` com novo `?v=`).

1.  Clone o repositório:
    ```bash
    git clone <URL_DO_REPOSITORIO>
    ```
2.  Navegue até o diretório do projeto:
    ```bash
    cd microgate_site
    ```
3.  Abra `index.html` em seu navegador.

## Contribuição

Para contribuir com o projeto, por favor, entre em contato com a equipe de desenvolvimento da Microgate Informática.

## Licença

Este projeto é proprietário da Microgate Informática.