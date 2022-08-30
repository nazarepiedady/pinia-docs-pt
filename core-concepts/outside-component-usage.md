# Utilizando uma memória fora de um componente

As memórias da Pinia dependem da instância de `pinia` para partilhar a mesma instância da memória através de todas chamadas. Na maioria das vezes, isto funciona fora da caixa pela simples chamada da sua função `useStore()`. Por exemplo, em `setup()`, não precisas fazer nada. Porém as coisas são um pouco diferentes fora de um componente.
Nos bastidores, `useStore()` _injeta_ a instância de `pinia` que entregaste a tua `app`.  Isto significa que se a instância de `pinia` não pode ser injetada automaticamente, precisas fornecê-la manualmente à função `useStore()`.
Tu podes resolver isto de maneiras diferentes dependendo do tipo de aplicação que estiveres escrevendo.

## Aplicações de Página Única

Se não estiveres fazendo nenhuma interpretação no lado do servidor (SSR, sigla em Inglês), qualquer chamada de `useStore()` depois da instalação da extensão pinia com `app.use(pinia)` funcionará: 

```js
import { useUserStore } from '@/stores/user'
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

A maneira mais fácil de garantir que isto sempre é aplicado é _adiar_ as chamadas de `useStore()` colocando-as dentro de funções que sempre serão executadas depois da `pinia` ser instalada.

Let's take a look at this example of using a store inside of a navigation guard with Vue Router:
Vamos ver um exemplo de utilização de uma memória dentro de uma sentinela de navegação com o Roteador da Vue (`Vue Router`):

```js
import { createRouter } from 'vue-router'
const router = createRouter({
  // ...
})

// ❌ Dependendo da ordem das importações isto falhará
const store = useStore()

router.beforeEach((to, from, next) => {
  // nós desejávamos utilizar a memória aqui
  if (store.isLoggedIn) next()
  else next('/login')
})

router.beforeEach((to) => {
  // ✅ Isto funcionará porque o roteador inicia sua navegação depois
  // do `router` ser instalado e a `pinia` também será instalada
  const store = useStore()

  if (to.meta.requiresAuth && !store.isLoggedIn) return '/login'
})
```

## Aplicações Interpretadas no Lado do Servidor

Quando estiveres lidando com a Interpretação no Lado do Servidor (SSR, sigla em Inglês), terás que passar a instância de `pinia` para `useStore()`. Isto impedi a `pinia` de partilhar o estado global entre diferentes instâncias da aplicação.

Há uma secção inteira dedicada a isto na [guia da Interpretação no Lado do Servidor (SSR, sigla em Inglês)](/ssr/index.md)
