# Interpretação do Lado do Servidor (SSR) %{#Server-Side-Rendering-SSR-}%

:::tip DICA
Se estivermos usando a **Nuxt.js**, precisamos ler [**estas instruções**](./nuxt.md).
:::

Criar memórias com a Pinia deve funcionar fora da caixa para Interpretação do Lado do Servidor desde que chamemos as nossas funções `useStore()` início das funções `setup`, `getters` e `actions`:

```vue
<script setup>
// isto funciona porque a pinia sabe que
// aplicação está executando dentro de `setup`
const main = useMainStore()
</script>
```

## Usando a Memória fora da `setup()` %{#Using-the-store-outside-of-setup-}%

Se precisarmos usar a memória em outro lugar, precisamos passar a instância de `pinia` [que foi passada à aplicação](../getting-started#installation) à chamada da função `useStore()`:

```js
const pinia = createPinia()
const app = createApp(App)

app.use(router)
app.use(pinia)

router.beforeEach((to) => {
  // ✅ Isto funcionará, temos que certificar-nos de
  // que a memória correta é usada para aplicação
  // em execução atualmente
  const main = useMainStore(pinia)

  if (to.meta.requiresAuth && !main.isLoggedIn) return '/login'
})
```

A Pinia convenientemente adiciona-se a si mesma como `$pinia` à nossa aplicação, assim podemos usá-la em funções como `serverPrefetch()`:

```js
export default {
  serverPrefetch() {
    const store = useStore(this.$pinia)
  },
}
```

Nota que não precisamos fazer nada de especial quando usamos `onServerPrefetch()`:

```vue
<script setup>
const store = useStore()
onServerPrefetch(async () => {
  // ✅ isto funcionará
  await store.fetchData()
})
</script>
```

## Hidratação do Estado %{#State-hydration}%

Para hidratar o estado inicial, precisamos certificar-nos de que o estado de raiz está incluída em algum lugar no HTML para Pinia pegá-lo mais tarde. Dependendo daquilo que estivermos usando para Interpretação do Lado do Servidor, **devemos escapar o estado por razões de segurança**. Nós recomendamos usar a [`@nuxt/devalue]`(https://github.com/nuxt-contrib/devalue) que é aquela usada pela Nuxt.js:

```js
import devalue from '@nuxt/devalue'
import { createPinia } from 'pinia'
// recuperar o estado de origem do lado do servidor
const pinia = createPinia()
const app = createApp(App)
app.use(router)
app.use(pinia)

// depois da interpretar a página,
// o estado de origem é construido e
// pode ser lido diretamente no `pinia.state.value`

// serializar, escapar (MUITO importante se o
// conteúdo do estado pode ser mudado pelo
// utilizador, o que é quase sempre o caso),
// e colocá-lo em algum lugar na página,
// por exemplo, como uma variável global.
devalue(pinia.state.value)
```

Dependendo do que estivermos usando para Interpretação do Lado do Servidor, definiremos uma variável _estado inicial_ que será serializada no HTML. Também devemos proteger-nos de ataques de XSS. Nós podemos usar [outras alternativas](https://github.com/nuxt-contrib/devalue#see-also) à `@nuxt/devalue` dependendo daquilo que precisamos, por exemplo, se podemos serializar e analisar sintaticamente no nosso estado com `JSON.stringify()`/`JSON.parse()`, **poderíamos melhorar muito o nosso desempenho**.

Se não estivermos usando a Nuxt precisaremos lidar com a serialização e hidratação do estado nós mesmos. Eis alguns exemplos:

- [modelo da Vitesse](https://github.com/antfu/vitesse/blob/main/src/modules/pinia.ts)
- [`vite-plugin-ssr`](https://vite-plugin-ssr.com/pinia)

Adaptamos esta estratégia ao nosso ambiente. Temos que **certificar-nos** de hidratar o estado da pinia antes de chamar qualquer função `useStore()` no lado do cliente. Por exemplo, se serializarmos o estado a um marcador `<script>` para torná-lo acessível globalmente no lado do cliente através de `window.__pinia`, podemos escrever isto:

```ts
const pinia = createPinia()
const app = createApp(App)
app.use(pinia)

// `isClient` depende do ambiente, por exemplo,
// na Nuxt é `process.client`
if (isClient) {
  pinia.state.value = JSON.parse(window.__pinia)
}
```
