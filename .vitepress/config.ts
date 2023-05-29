import { defineConfig, HeadConfig } from 'vitepress'

const META_URL = 'https://pinia.vuejs.org'
const META_TITLE = 'Pinia 🍍'
const META_DESCRIPTION = 'Memória intuitiva, flexível, leve, de tipo seguro para Vue'
const META_IMAGE = 'https://pinia.vuejs.org/social.png'

const isProduction = process.env.NETLIFY && process.env.NODE_ENV === 'production'

if (process.env.NETLIFY) {
  console.log('Netlify build', process.env.CONTEXT)
}

/**
 * @type {import('vitepress').UserConfig['head']}
 */
const productionHead: HeadConfig[] = [
  [
    'script',
    {
      src: 'https://unpkg.com/thesemetrics@latest',
      async: '',
      type: 'text/javascript',
    },
  ],
]

export default defineConfig({
  title: 'Pinia',
  description: META_DESCRIPTION,
  appearance: 'dark',

  markdown: {
    theme: {
      dark: 'dracula-soft',
      light: 'vitesse-light',
    },
    /*
    attrs: {
      leftDelimiter: '%{',
      rightDelimiter: '}%',
    }*/
  },

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    ['link', { rel: 'icon', type: 'image/png', href: '/logo.png' }],
    [
      'meta',
      { name: 'wwads-cn-verify', content: '5878a7ab84fb43402106c575658472fa' },
    ],

    [
      'meta',
      {
        property: 'og:type',
        content: 'website',
      },
    ],
    [
      'meta',
      {
        property: 'og:url',
        content: META_URL,
      },
    ],
    [
      'meta',
      {
        property: 'og:title',
        content: META_TITLE,
      },
    ],
    [
      'meta',
      {
        property: 'og:description',
        content: META_DESCRIPTION,
      },
    ],
    [
      'meta',
      {
        property: 'og:image',
        content: META_IMAGE,
      },
    ],
    [
      'meta',
      {
        property: 'twitter:card',
        content: 'summary_large_image',
      },
    ],
    [
      'meta',
      {
        property: 'twitter:url',
        content: META_URL,
      },
    ],
    [
      'meta',
      {
        property: 'twitter:title',
        content: META_TITLE,
      },
    ],
    [
      'meta',
      {
        property: 'twitter:description',
        content: META_DESCRIPTION,
      },
    ],
    [
      'meta',
      {
        property: 'twitter:image',
        content: META_IMAGE,
      },
    ],

    [
      'link',
      {
        rel: 'preload',
        href: '/dank-mono.css',
        as: 'style',
        onload: "this.onload=null;this.rel='stylesheet'",
      },
    ],

    // TODO: add this back when fixed
    /* [
      'script',
      {
        src: 'https://vueschool.io/banners/main.js',
        async: true,
        type: 'text/javascript',
      },
    ], */

    ...(isProduction ? productionHead : []),
  ],

  themeConfig: {
    logo: '/logo.svg',
    outline: [2, 3],

    socialLinks: [
      { icon: 'twitter', link: 'https://twitter.com/posva' },
      { icon: 'github', link: 'https://github.com/vuejs/pinia' },
      { icon: 'discord', link: 'https://chat.vuejs.org' }
    ],

    footer: {
      copyright: 'Direitos de autor © 2019-presente Eduardo San Martin Morote',
      message: 'Lançado sob a licença MIT.',
    },

    editLink: {
      pattern: 'https://github.com/nazarepiedady/pinia-docs-pt/edit/main/:path',
      text: 'Sugerir mudanças para esta página',
    },

    algolia: {
      appId: '69Y3N7LHI2',
      apiKey: '45441f4b65a2f80329fd45c7cb371fea',
      indexName: 'pinia',
    },

    carbonAds: {
      code: 'CEBICK3I',
      //custom: 'CEBICK3M',
      placement: 'routervuejsorg',
    },

    nav: [
      // { text: 'Config', link: '/config/' },
      // { text: 'Plugins', link: '/plugins/' },
      { text: 'Guia', link: '/core-concepts/', activeMatch: '^/core-concepts/' },
      { text: 'API', link: '/api/', activeMatch: '^/api/' },
      { text: 'Livro de Receitas', link: '/cookbook/', activeMatch: '^/cookbook/'},
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
        ],
      },
    ],

    sidebar: {
      '/api/': [
        {
          text: 'Pacotes',
          items: [
            { text: 'pinia', link: '/api/modules/pinia.html' },
            { text: '@pinia/nuxt', link: '/api/modules/pinia_nuxt.html' },
            { text: '@pinia/testing', link: '/api/modules/pinia_testing.html' },
          ],
        },
      ],
      // catch-all fallback
      '/': [
        {
          text: 'Introdução',
          items: [
            {
              text: 'O Que é Pinia?',
              link: '/introduction.html',
            },
            {
              text: 'Começar',
              link: '/getting-started.html',
            },
          ],
        },
        {
          text: 'Conceitos Principais',
          items: [
            { text: 'Definindo uma Memória (Store)', link: '/core-concepts/' },
            { text: 'Estado (State)', link: '/core-concepts/state.html' },
            { text: 'Recuperadores (Getters)', link: '/core-concepts/getters.html' },
            { text: 'Ações (Actions)', link: '/core-concepts/actions.html' },
            { text: 'Extensões (Plugins)', link: '/core-concepts/plugins.html' },
            {
              text: 'Memórias Fora dos Componentes',
              link: '/core-concepts/outside-component-usage.html',
            },
          ],
        },
        {
          text: 'Interpretação no Lado do Servidor (SSR)',
          items: [
            {
              text: 'Vue e Vite',
              link: '/ssr/',
            },
            {
              text: 'Nuxt',
              link: '/ssr/nuxt.html',
            },
          ],
        },
        {
          text: 'Livro de Receitas',
          collapsible: true,
          collapsed: false,
          items: [
            {
              text: 'Guia de Migração da Vuex',
              link: '/cookbook/migration-vuex.html',
            },
            {
              text: 'Substituição de Módulo Instantânea',
              link: '/cookbook/hot-module-replacement.html',
            },
            {
              text: 'Testes',
              link: '/cookbook/testing.html',
            },
            {
              text: 'Utilização Sem Setup',
              link: '/cookbook/options-api.html',
            },
            {
              text: 'Composição de Memórias',
              link: '/cookbook/composing-stores.html',
            },
            {
              text: 'Guia de Migração da Versão 2',
              link: '/cookbook/migration-v1-v2.html',
            },
            {
              text: 'Lidando com Funções de Composição',
              link: '/cookbook/composables.html',
            },
          ],
        },
      ],
    },
  },

  locales: {
    root: { label: 'Português', lang: 'pt-PT' },
    en: { label: 'English', lang: 'en-US', link: 'https://pinia.vuejs.org/' },
    zh: { label: '简体中文', lang: 'zh-CN', link: 'https://pinia.vuejs.org/zh/' }
  }
})
