// @ts-check

const META_URL = 'https://pinia.vuejs.org'
const META_TITLE = 'Pinia 🍍'
const META_DESCRIPTION =
  'Memória intuitiva, flexível, leve, de tipo seguro para Vue'
const META_IMAGE = 'https://pinia.vuejs.org/social.png'

const isProduction = process.env.NODE_ENV

/**
 * @type {import('vitepress').UserConfig['head']}
 */
const productionHead = [
  [
    'script',
    {
      src: 'https://unpkg.com/thesemetrics@latest',
      async: '',
      type: 'text/javascript',
    },
  ],
]

/**
 * @type {import('vitepress').UserConfig}
 */
module.exports = {
  markdown: {
    attrs: {
      leftDelimiter: '%{',
      rightDelimiter: '}%',
    },
  },
  title: 'Pinia',
  lang: 'pt-PT',
  description: 'A Memória de Vue que gostarás de utilizar',
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

    ...(isProduction ? productionHead : []),
  ],

  themeConfig: {
    repo: 'nazarepiedady/pinia-docs-pt',
    logo: '/logo.svg',
    docsDir: '',
    docsBranch: 'main',
    editLinks: true,
    editLinkText: 'Sugerir mudanças para esta página',

    algolia: {
      appId: '69Y3N7LHI2',
      apiKey: '45441f4b65a2f80329fd45c7cb371fea',
      indexName: 'pinia',
    },

    carbonAds: {
      carbon: 'CEBICK3I',
      custom: 'CEBICK3M',
      placement: 'routervuejsorg',
    },

    nav: [
      { text: 'Guia', link: '/introduction.html' },
      { text: 'API', link: '/api/' },
      // { text: 'Config', link: '/config/' },
      // { text: 'Plugins', link: '/plugins/' },
      {
        text: 'Ligações',
        items: [
          {
            text: 'Discussões',
            link: 'https://github.com/vuejs/pinia/discussions',
          },
          {
            text: 'Conversas',
            link: 'https://chat.vuejs.org',
          },
          {
            text: 'Twitter',
            link: 'https://twitter.com/posva',
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
          children: [
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
          children: [
            {
              text: 'O que é Pinia?',
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
          children: [
            { text: 'Definição de uma Memória', link: '/core-concepts/' },
            { text: 'Estado', link: '/core-concepts/state.html' },
            { text: 'Recuperadores', link: '/core-concepts/getters.html' },
            { text: 'Ações', link: '/core-concepts/actions.html' },
            { text: 'Extensões', link: '/core-concepts/plugins.html' },
            {
              text: 'Memórias fora dos componentes',
              link: '/core-concepts/outside-component-usage.html',
            },
          ],
        },
        {
          text: 'Interpretação no Lado do Servidor (SSR)',
          children: [
            {
              text: 'Vue e Vite',
              link: '/ssr/',
            },
            {
              text: 'Nuxt.js',
              link: '/ssr/nuxt.html',
            },
            {
              text: 'Lidando com constituíveis',
              link: '/cookbook/composables.html#ssr',
            },
          ],
        },
        {
          text: 'Livro de Receitas',
          link: '/cookbook/',
          children: [
            {
              text: 'Migrando da Vuex ≤4',
              link: '/cookbook/migration-vuex.html',
            },
            {
              text: 'Substituição de Módulo Instantânea',
              link: '/cookbook/hot-module-replacement.html',
            },
            {
              text: 'Testing Testagem',
              link: '/cookbook/testing.html',
            },
            {
              text: 'Utilização sem setup()',
              link: '/cookbook/options-api.html',
            },
            {
              text: 'Composição de Memórias',
              link: '/cookbook/composing-stores.html',
            },
            {
              text: 'Migrando de v0/v1 para v2',
              link: '/cookbook/migration-v1-v2.html',
            },
            {
              text: 'Lidando com constituíveis',
              link: '/cookbook/composables.html',
            },
          ],
        },
      ],
    },
  },
}
