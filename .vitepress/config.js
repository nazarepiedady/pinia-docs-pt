// @ts-check

const META_URL = 'https://pinia.vuejs.org'
const META_TITLE = 'Pinia 🍍'
const META_DESCRIPTION =
  'Intuitive, type safe, light and flexible Store for Vue'
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
  lang: 'en-US',
  description: 'The Vue Store that you will enjoy using',
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
    repo: 'vuejs/pinia',
    logo: '/logo.svg',
    docsDir: 'packages/docs',
    docsBranch: 'v2',
    editLinks: true,
    editLinkText: 'Suggest changes to this page',

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
      { text: 'Guide', link: '/introduction.html' },
      { text: 'API', link: '/api/' },
      // { text: 'Config', link: '/config/' },
      // { text: 'Plugins', link: '/plugins/' },
      {
        text: 'Links',
        items: [
          {
            text: 'Discussions',
            link: 'https://github.com/vuejs/pinia/discussions',
          },
          {
            text: 'Chat',
            link: 'https://chat.vuejs.org',
          },
          {
            text: 'Twitter',
            link: 'https://twitter.com/posva',
          },
          {
            text: 'Changelog',
            link: 'https://github.com/vuejs/pinia/blob/v2/packages/pinia/CHANGELOG.md',
          },
        ],
      },
    ],

    sidebar: {
      '/api/': [
        {
          text: 'packages',
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
          text: 'Introduction',
          children: [
            {
              text: 'What is Pinia?',
              link: '/introduction.html',
            },
            {
              text: 'Getting Started',
              link: '/getting-started.html',
            },
          ],
        },
        {
          text: 'Core Concepts',
          children: [
            { text: 'Defining a Store', link: '/core-concepts/' },
            { text: 'State', link: '/core-concepts/state.html' },
            { text: 'Getters', link: '/core-concepts/getters.html' },
            { text: 'Actions', link: '/core-concepts/actions.html' },
            { text: 'Plugins', link: '/core-concepts/plugins.html' },
            {
              text: 'Stores outside of components',
              link: '/core-concepts/outside-component-usage.html',
            },
          ],
        },
        {
          text: 'Server-Side Rendering (SSR)',
          children: [
            {
              text: 'Vue and Vite',
              link: '/ssr/',
            },
            {
              text: 'Nuxt.js',
              link: '/ssr/nuxt.html',
            },
            {
              text: 'Dealing with composables',
              link: '/cookbook/composables.html#ssr',
            },
          ],
        },
        {
          text: 'Cookbook',
          link: '/cookbook/',
          children: [
            {
              text: 'Migration from Vuex ≤4',
              link: '/cookbook/migration-vuex.html',
            },
            {
              text: 'Hot Module Replacement',
              link: '/cookbook/hot-module-replacement.html',
            },
            {
              text: 'Testing',
              link: '/cookbook/testing.html',
            },
            {
              text: 'Usage without setup()',
              link: '/cookbook/options-api.html',
            },
            {
              text: 'Composing Stores',
              link: '/cookbook/composing-stores.html',
            },
            {
              text: 'Migration from v0/v1 to v2',
              link: '/cookbook/migration-v1-v2.html',
            },
            {
              text: 'Dealing with composables',
              link: '/cookbook/composables.html',
            },
          ],
        },
      ],
    },
  },
}
