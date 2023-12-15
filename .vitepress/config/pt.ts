import type { DefaultTheme, LocaleSpecificConfig } from 'vitepress'

export const META_URL = 'https://pinia-docs-pt.netlify.app/'
export const META_TITLE = 'Pinia 🍍'
export const META_DESCRIPTION = 'Memória intuitiva, flexível, leve, de tipo seguro para Vue'

export const ptConfig: LocaleSpecificConfig<DefaultTheme.Config> = {
  description: META_DESCRIPTION,
  head: [
    ['meta', { property: 'og:url', content: META_URL }],
    ['meta', { property: 'og:description', content: META_DESCRIPTION }],
    ['meta', { property: 'twitter:url', content: META_URL }],
    ['meta', { property: 'twitter:title', content: META_TITLE }],
    ['meta', { property: 'twitter:description', content: META_DESCRIPTION }],
  ],

  themeConfig: {
    editLink: {
      pattern: 'https://github.com/nazarepiedady/pinia-docs-pt/edit/main/:path',
      text: 'Sugerir mudanças para esta página',
    },

    nav: [
      // { text: 'Config', link: '/config/' },
      // { text: 'Plugins', link: '/plugins/' },
      {
        text: 'Guia',
        link: '/core-concepts/',
        activeMatch: '^/core-concepts/',
      },
      { text: 'API', link: '/api/', activeMatch: '^/api/' },
      { text: 'Livro de Receita', link: '/cookbook/', activeMatch: '^/cookbook/' },
      {
        text: 'Ligações',
        items: [
          {
            text: 'Discussões',
            link: 'https://github.com/vuejs/pinia/discussions',
          },
          {
            text: 'Relatório de Mudança',
            link: 'https://github.com/vuejs/pinia/blob/v2/packages/pinia/CHANGELOG.md',
          },
          {
            text: 'Certificação de Vue.js',
            link: 'https://certification.vuejs.org/?friend=VUEROUTER',
          },
        ],
      },
    ],

    sidebar: {
      '/api/': [
        {
          text: 'pacotes',
          items: [
            { text: 'pinia', link: '/api/modules/pinia.html' },
            { text: '@pinia/nuxt', link: '/api/modules/pinia_nuxt.html' },
            {
              text: '@pinia/testing',
              link: '/api/modules/pinia_testing.html',
            },
          ],
        },
      ],
      // catch-all fallback
      '/': [
        {
          text: 'Introdução',
          items: [
            {
              text: 'Que é Pinia?',
              link: '/introduction',
            },
            {
              text: 'Começar',
              link: '/getting-started',
            },
          ],
        },
        {
          text: 'Conceitos Principais',
          items: [
            { text: 'Definindo a Memória', link: '/core-concepts/' },
            { text: 'Estado', link: '/core-concepts/state' },
            { text: 'Recuperadores', link: '/core-concepts/getters' },
            { text: 'Ações', link: '/core-concepts/actions' },
            { text: 'Extensões', link: '/core-concepts/plugins' },
            {
              text: 'Memória Fora do Componente',
              link: '/core-concepts/outside-component-usage',
            },
          ],
        },
        {
          text: 'Interpretação do Lado do Servidor',
          items: [
            {
              text: 'Vue e Vite',
              link: '/ssr/',
            },
            {
              text: 'Nuxt.js',
              link: '/ssr/nuxt',
            },
          ],
        },
        {
          text: 'Livro de Receitas',
          collapsed: false,
          items: [
            {
              text: 'Índice',
              link: '/cookbook/',
            },
            {
              text: 'Migração da Vuex ≤4',
              link: '/cookbook/migration-vuex',
            },
            {
              text: 'Substituição de Módulo Instantânea',
              link: '/cookbook/hot-module-replacement',
            },
            {
              text: 'Testes',
              link: '/cookbook/testing',
            },
            {
              text: 'Uso sem setup()',
              link: '/cookbook/options-api',
            },
            {
              text: 'Compondo Memórias',
              link: '/cookbook/composing-stores',
            },
            {
              text: 'Trechos de VSCode',
              link: '/cookbook/vscode-snippets',
            },
            {
              text: 'Migração da v0/v1 à v2',
              link: '/cookbook/migration-v1-v2',
            },
            {
              text: 'Lidando com as Composições',
              link: '/cookbook/composables',
            },
          ],
        },
      ],
    },
  },
}