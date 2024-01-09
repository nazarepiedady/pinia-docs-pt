# Nuxt.js %{#Nuxt-js}%

Usar a Pinia com a [Nuxt](https://nuxt.com/) é mais fácil uma vez que a Nuxt cuida dum monte de coisas quando esta chega à _interpretação do lado do servidor_. Por exemplo, **não precisamos preocupar-nos com a serialização nem com os ataques de XSS**. A Pinia suporta a Nuxt Bridge e a Nuxt 3. Para suporte simples da Nuxt 2, [consular abaixo](#nuxt-2-without-bridge).

## Instalação %{#Installation}%

```bash
yarn add @pinia/nuxt
# ou com a npm
npm install @pinia/nuxt
```

:::tip DICA
Se usarmos a npm, podemos deparar-nos com um erro _ERESOLVE unable to resolve dependency tree_. Neste caso, adicionamos o seguinte ao nosso `package.json`:

```js
"overrides": {
	"vue": "latest"
}
```
:::

Nós fornecemos um _módulo_ para manipular tudo por nós, apenas precisamos adicioná-lo à `modules` no nosso ficheiro `nuxt.config.js`:

```js
// nuxt.config.js
export default defineNuxtConfig({
  // ... outras opções
  modules: [
    // ...
    '@pinia/nuxt',
  ],
})
```

E é isto, usamos a nossa memória conforme o habitual!

## Esperando pelas Ações nas Páginas %{#Awaiting-for-actions-in-pages}%

Tal como acontece com a `onServerPrefetch()`, podemos chamar uma ação da memória dentro da `asyncData()`. Dada como `useAsyncData()` funciona, **devemos certificar-nos de retornar um valor**. Isto permitirá a Nuxt saltar consecutivamente a ação no lado do cliente e reutilizar o valor a partir do servidor:

```vue{3-5}
<script setup>
const store = useStore()
// nós também poderíamos extrair os dados,
// mas já estão presentes na memória
await useAsyncData('user', () => store.fetchUser())
</script>
```

Se a nossa ação não resolver o valor, podemos adicionar qualquer valor que não for nulo:

```vue{3}
<script setup>
const store = useStore()
await useAsyncData('user', () => store.fetchUser().then(() => true))
</script>
```

:::tip DICA
Se quisermos usar uma memória fora da `setup()`, lembremos de passar o objeto da `pinia` à `useStore()`. Nós o adicionamos ao [contexto](https://nuxtjs.org/docs/2.x/internals-glossary/context), assim temos acesso à este na `asyncData` e na `fetch()`:

```js
import { useStore } from '~/stores/myStore'

export default {
  asyncData({ $pinia }) {
    const store = useStore($pinia)
  },
}
```

:::

## Importações Automáticas %{#Auto-imports}%

Por padrão, a `@pinia/nuxt` expõe algumas importações automáticas:

- A `usePinia()`, que é semelhante à `getActivePinia()` mas funciona melhor com a Nuxt. Nós podemos adicionar importações automáticas para facilitar a nossa vida
- A `defineStore()`, para definir as memórias
- A `storeToRefs()` quando precisamos extrair referências individuais a partir duma memória
- A `acceptHMRUpdate()` para a [substituição de módulo instantânea](../cookbook/hot-module-replacement)

Esta também importa automaticamente **todas as memórias** definidas dentro da nossa pasta `stores`. Embora esta não procure pelas memórias encaixadas. Nós podemos personalizar este comportamento definindo a opção `storesDir`:

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  // ... outras opções
  modules: ['@pinia/nuxt'],
  pinia: {
    storesDir: ['./stores/**', './custom-folder/stores/**'],
  },
})
```

Nota que as pastas são relativas à raiz do nosso projeto. Se mudarmos a opção `srcDir`, precisamos adaptar os caminhos em conformidade.

## Nuxt 2 sem a Bridge %{#Nuxt-2-without-bridge}%

A Pinia suporta a Nuxt 2 até a versão 0.2.1 da `@pinia/nuxt`. Também devemos certificar-nos de instalar a [`@nuxtjs/composition-api`](https://composition-api.nuxtjs.org/) ao lado da `pinia`:

```bash
yarn add pinia @pinia/nuxt@0.2.1 @nuxtjs/composition-api
# ou com o npm
npm install pinia @pinia/nuxt@0.2.1 @nuxtjs/composition-api
```

Nós fornecemos um _módulo_ para manipular tudo por nós, apenas precisamos adicioná-lo à `buildModules` no nosso ficheiro `nuxt.config.js`:

```js
// nuxt.config.js
export default {
  // ... outras opções
  buildModules: [
    // Somente na Nuxt 2:
    // https://composition-api.nuxtjs.org/getting-started/setup#quick-start
    '@nuxtjs/composition-api/module',
    '@pinia/nuxt',
  ],
}
```

### TypeScript %{#TypeScript}%

Se usarmos a Nuxt 2 (`@pinia/nuxt` < 0.3.0) com a TypeScript, ou tivermos um `jsconfig.json`, também devemos adicionar os tipos a `context.pinia`:

```json
{
  "types": [
    // ...
    "@pinia/nuxt"
  ]
}
```

Isto também garantirá que tenhamos a conclusão de código automática 😉 .

### Usando a Pinia ao Lado da Vuex %{#Using-Pinia-alongside-Vuex}%

É recomendado **evitar usar ambas Pinia e Vuex** mas se precisarmos usar ambas, precisamos dizer a `pinia` para a não desativar:

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
