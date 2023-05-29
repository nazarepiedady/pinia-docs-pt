# Interpretação no Lado do Servidor (SSR) {#server-side-rendering}

:::tip Dica
Se estiveres a usar a **Nuxt.js**, precisas ler [**estas instruções**](./nuxt.md).
:::

A criação de memórias com a Pinia deve funcionar fora da caixa para SSR enquanto chamas as tuas funções `useStore()` no inicio das funções `setup`, `getters` e `actions`:

```js
export default defineComponent({
  setup() {
    // isto funciona porque a `pinia` sabe qual aplicação está em execução dentro de
    // `setup()`
    const main = useMainStore()
    return { main }
  },
})
```

## Utilizando a memória fora de `setup()` {#using-the-store-outside-of-setup}

Se precisares utilizar a memória noutro lugar, precisas passar a instância de `pinia` [que foi passada para a aplicação](#instalar-a-extensão) para a chamada da função `useStore()`:

```js
const pinia = createPinia()
const app = createApp(App)

app.use(router)
app.use(pinia)

router.beforeEach((to) => {
  // ✅ Isto funcionará, certifique-se de que a memória correta é utilizada para
  // a aplicação atual em execução
  const main = useMainStore(pinia)

  if (to.meta.requiresAuth && !main.isLoggedIn) return '/login'
})
```

A Pinia adiciona-se a si mesma convenientemente como `$pinia` à tua aplicação assim podes utilizá-la dentro de funções como `serverPrefetch()`:

```js
export default {
  serverPrefetch() {
    const store = useStore(this.$pinia)
  },
}
```

## Hidratação do estado {#state-hydration}

Para hidratar o estado inicial, precisas certificar-te de que a `rootState` é incluída em algum lugar dentro da HTML para a Pinia pegá-la mais tarde. Dependo daquilo que estiveres utilizando para Interpretação no Lado do Servidor (SSR, sigla em Inglês), **tu deves escapar o estado por razões de segurança**. Nós recomendamos a utilização de [`@nuxt/devalue`](https://github.com/nuxt-contrib/devalue) que é aquela utilizada pela Nuxt.js:

```js
import devalue from '@nuxt/devalue'
import { createPinia } from 'pinia'
// recupera o `rootState` do lado do servidor
const pinia = createPinia()
const app = createApp(App)
app.use(router)
app.use(pinia)

// depois da interpretação da página, o estado de origem é construido e pode ser lido
// diretamente no `pinia.state.value`

// adapta, escapa (MUITO importante se o conteúdo do estado pode ser mudado pelo
// utilizador, o que é quase sempre o caso), e coloque-o em algum lugar na página,
// por exemplo, como uma variável global.
devalue(pinia.state.value)
```

Dependendo do que estiveres a utilizar para Interpretação no Lado do Servidor (SSR, sigla em Inglês), definirás uma variável de _estado inicial_ que será adaptada em HTML. Tu deves também proteger-te de ataques de XSS. Por exemplo, com a [`vite-ssr`](https://github.com/frandiox/vite-ssr) podes utilizar a [opção `transformState`](https://github.com/frandiox/vite-ssr#state-serialization) e `@nuxt/devalue`:

```js
import devalue from '@nuxt/devalue'

export default viteSSR(
  App,
  {
    routes,
    transformState(state) {
      return import.meta.env.SSR ? devalue(state) : state
    },
  },
  ({ initialState }) => {
    // ...
    if (import.meta.env.SSR) {
      // isto será transformado em sequência de caracteres e
      // definida para o `window.__INITIAL_STATE__`
      initialState.pinia = pinia.state.value
    } else {
      // no lado do cliente, nós restauramos o estado
      pinia.state.value = initialState.pinia
    }
  }
)
```

Tu podes utilizar [outras alternativas](https://github.com/nuxt-contrib/devalue#see-also) para `@nuxt/devalue` dependendo daquilo que precisares, por exemplo, se puderes adaptar e analisar o estado com `JSON.stringify()`/`JSON.parse()`, **tu poderias melhorar muito o desempenho**.

Adapte esta estratégia ao teu ambiente. Certifica-te de hidratar o estado da `pinia` antes da chamada de qualquer função `useStore()` no lado do cliente. Por exemplo, se nós adaptamos o estado para dentro de uma marcação de `<script>` para torná-la acessível globalmente no lado do cliente através de `window.__pinia`, nós podemos escrever isto:

```js
const pinia = createPinia()
const app = createApp(App)
app.use(pinia)

// deve ser definida pelo utilizador
if (isClient) {
  pinia.state.value = JSON.parse(window.__pinia)
}
```
