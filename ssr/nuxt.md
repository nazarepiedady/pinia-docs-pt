# Nuxt.js

Utilização de Pinia com a [Nuxt.js](https://nuxtjs.org/) é muito fácil visto que a Nuxt encarrega-se de várias coisas quando ela vem para _interpretação no lado do servidor (SSR, sigla em Inglês)_. Por exemplo, **não precisas de te importares com a adaptação(serialization, termo em Inglês) nem com os ataques de XSS**. A Pinia suporta a Nuxt Bridge e a Nuxt 3, para suporte básico a Nuxt 2, [consulte abaixo](#nuxt-2-sem-bridge).

## Instalação

```bash
yarn add @pinia/nuxt
# ou com o npm
npm install @pinia/nuxt
```

Nós fornecemos um _módulo_ para manipular tudo por ti, tu apenas precisas adicioná-lo ao `modules` no teu ficheiro `nuxt.config.js`:

```js
// nuxt.config.js
export default defineNuxtConfig({
  // ... outras opções
  buildModules: [
    // ...
    '@pinia/nuxt',
  ],
})
```

E já está, utilize a tua memória como o habitual!

## Utilizando a memória fora do `setup()`

Se quiseres utilizar uma memória fora de `setup()`, lembre-se de passar o objeto `pinia` para `useStore()`. Nós adicionamos ela [ao contexto](https://nuxtjs.org/docs/2.x/internals-glossary/context) assim tens acesso a ela em `asyncData()` e `fetch()`:

```js
import { useStore } from '~/stores/myStore'

export default {
  asyncData({ $pinia }) {
    const store = useStore($pinia)
  },
}
```

## Importações automáticas

Por padrão `@pinia/nuxt` expõe uma única importação automática: `usePinia()`, a qual é semelhante ao `getActivePinia()` mas funciona melhor com a Nuxt. Tu podes adicionar importações automáticas para facilitar a tua vida:

```js
// nuxt.config.js
export default {
  // ... outras opções
  buildModules: [
    // ...
    [
      '@pinia/nuxt',
      {
        autoImports: [
          // importa `defineStore()` automaticamente
          'defineStore', // `import { defineStore } from 'pinia'`
          // importa `defineStore()` automaticamente como `definePiniaStore()`
          ['defineStore', 'definePiniaStore'], // `import { defineStore as definePiniaStore } from 'pinia'`
        ],
      },
    ],
  ],
}
```

## Nuxt 2 sem bridge

A Pinia suporta a Nuxt 2 até a versão 0.2.1 da `@pinia/nuxt`. Certifique-se também de instalar [`@nuxtjs/composition-api`](https://composition-api.nuxtjs.org/) ao lado da `pinia`:

```bash
yarn add pinia @pinia/nuxt@0.2.1 @nuxtjs/composition-api
# ou com o npm
npm install pinia @pinia/nuxt@0.2.1 @nuxtjs/composition-api
```

Nós fornecemos um _módulo_ para manipular tudo por ti, tu apenas precisas adicioná-lo ao `buildModules` no teu ficheiro `nuxt.config.js`:

```js
// nuxt.config.js
export default {
  // ... outras opções
  buildModules: [
    // Apenas Nuxt 2:
    // https://composition-api.nuxtjs.org/getting-started/setup#quick-start
    '@nuxtjs/composition-api/module',
    '@pinia/nuxt',
  ],
}
```

## TypeScript

Se estiveres utilizando a TypeScript ou tiveres um `jsconfig.json`, deves também adicionar os tipos para a `context.pinia`:

```json
{
  "types": [
    // ...
    "@pinia/nuxt"
  ]
}
```

Isto também garantirá que tenhas a conclusão automática 😉.

### Utilizando a Pinia ao lado da Vuex

É recomendado **evitar a utilização de Pinia e Vuex juntas** mas se precisares utilizar ambas, precisas dizer a `pinia` para não a desativa-lá (a `vuex`).

```js
// nuxt.config.js
export default {
  buildModules: [
    '@nuxtjs/composition-api/module',
    ['@pinia/nuxt', { disableVuex: false }],
  ],
  // ... outras opções
}
```
