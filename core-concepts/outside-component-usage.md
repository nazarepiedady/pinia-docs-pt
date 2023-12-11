# Usando uma Memória fora dum Componente %{#using-a-store-outside-of-a-component}%

As memórias da Pinia dependem da instância `pinia` para partilharem a mesma instância de memória em todas as chamadas. Na maioria das vezes, isto funciona fora da caixa basta chamar a função `useStore()`. Por exemplo, na `setup()`, não precisamos fazer mais nada. Porém as coisas são um pouco diferente fora dum componente. Nos bastidores, `useStore()` _injeta_ a instância `pinia` que passamos à nossa `app`. Isto significa que se a instância `pinia` não puder ser automaticamente injetada, temos que fornecê-la manualmente à função `useStore`. Nós podemos solucionar isto de maneira diferente dependendo do tipo de aplicação que estamos a escrever.

## Aplicações de Página Única %{#single-page-application}%

Se não estivermos fazendo nenhuma interpretação do lado do servidor (SSR), qualquer chamada de `useStore` depois de instalarmos a extensão de `pinia` com `app.use(pinia)` funcionará:

```js
import { useUserStore } from '@/stores/user'
import { createPinia } from 'pinia';
import { createApp } from 'vue'
import App from './App.vue'

// ❌ falha porque é chamada antes da pinia ser criada
const userStore = useUserStore()

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)

// ✅ funciona porque a instância de pinia já está ativa
const userStore = useUserStore()
```

A maneira mais fácil de garantir que isto seja sempre aplicado é _adiar_ as chamadas de `useStore()` colocando-as dentro de funções que sempre serão executadas depois da instalação da `pinia`.

Vejamos um exemplo de uso duma memória dentro duma guarda de navegação com a Vue Router:

```js
import { createRouter } from 'vue-router'
const router = createRouter({
  // ...
})

// ❌ Dependendo da ordem das importações isto falhará
const store = useStore()

router.beforeEach((to, from, next) => {
  // nós desejávamos usar a memória aqui
  if (store.isLoggedIn) next()
  else next('/login')
})

router.beforeEach((to) => {
  // ✅ Isto funcionará porque o roteador começa sua navegação depois
  // da instalação do `router` e a `pinia` também será instalada
  const store = useStore()

  if (to.meta.requiresAuth && !store.isLoggedIn) return '/login'
})
```

## Aplicações da Interpretação do Lado do Servidor %{#ssr-apps}%

Quando lidarmos com a interpretação do lado do servidor, teremos que passar a instância de `pinia` à `useStore()`. Isto impede a `pinia` de partilhar o estado global entre diferentes instâncias de aplicação.

Existe uma seção inteira dedicada à isto no [guia da Interpretação do Lado do Servidor](/ssr/index), isto é apenas uma curta explicação.
