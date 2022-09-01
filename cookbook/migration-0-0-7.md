# Migrando da versão 0.0.7

As versões depois de `0.0.7`: `0.1.0`, e `0.2.0`, vêm com algumas grandes mudanças de quebra de compatibilidade. Este guia te ajuda a migrar quer estejas a utilizar a Vue 2 ou Vue 3. O relatório de mudança inteiro pode ser achado no repositório:

- [Para Pinia <= 1 para Vue 2](https://github.com/vuejs/pinia/blob/v1/CHANGELOG.md)
- [Para Pinia >= 2 para Vue 3](https://github.com/vuejs/pinia/blob/v2/packages/pinia/CHANGELOG.md)

Se tiveres questões ou problemas relativamente a migração, sinta-se livre para [abrir uma discussão](https://github.com/vuejs/pinia/discussions/categories/q-a) para pedir por ajuda.

## Não há mais `store.state`

Já não acessas o estado da memória através de uma propriedade `state`, podes acessar diretamente qualquer propriedade de estado.

Dada uma memória definida com:

```js
const useStore({
  id: 'main',
  state: () => ({ counter: 0 })
})
```

Faça

```diff
 const store = useStore()

-store.state.counter++
+store.counter.++
```

Tu ainda podes acessar o estado da memória inteira com `$state` quando necessário:

```diff
-store.state = newState
+store.$state = newState
```

## Renomeação de propriedades da memória

Todas propriedades da memória (`id`, `patch`, `reset`, etc) agora são prefixadas com `$` para permitir as propriedades definidas na memória com os mesmos nomes. Dica: tu podes refazer a tua base de código inteira com F2 (ou clique-direita + refazer (rafactor, termo em Inglês)) em cada propriedade da memória  

```diff
 const store = useStore()
-store.patch({ counter: 0 })
+store.$patch({ counter: 0 })

-store.reset()
+store.$reset()

-store.id
+store.$id
```

## A instância de Pinia

Agora é necessário criar uma instância de pinia e instalá-la:

Se estiveres utilizando a Vue 2 (Pinia <= 1):

```js
import Vue from 'vue'
import { createPinia, PiniaVuePlugin } from 'pinia'

const pinia = createPinia()
Vue.use(PiniaVuePlugin)
new Vue({
  el: '#app',
  pinia,
  // ...
})
```

Se estiveres utilizando a Vue 3 (Pinia >= 2):

```js
import { createApp } from 'vue'
import { createPinia, PiniaVuePlugin } from 'pinia'
import App from './App.vue'

const pinia = createPinia()
createApp(App).use(pinia).mount('#app')
```

A instância de `pinia` é o que segura o estado e deve **ser única por aplicação**. Consulte a seção de SSR da documentação para mais detalhes.

## Mudanças na SSR

A extensão de ssr `PiniaSsr` já não é necessária e tem que ser removida. Com a introdução das instâncias de `pinia`, a `getRootState()` já não é necessária e deve ser substituída com `pinia.state.value`:

Se estiveres utilizando a Vue 2 (Pinia <= 1):

```diff
// entry-server.js
-import { getRootState, PiniaSsr } from 'pinia',
+import { createPinia, PiniaVuePlugin } from 'pinia',


-// instala a extensão para automaticamente utilizar o contexto correto em `setup` e `onServerPrefetch`
-Vue.use(PiniaSsr);
+Vue.use(PiniaVuePlugin)

 export default context => {
+  const pinia = createPinia()
   const app = new Vue({
     // other options
     // outras opções
+    pinia
   })

   context.rendered = () => {
     // pass state to context
     // passa o estado para o contexto
-    context.piniaState = getRootState(context.req)
+    context.piniaState = pinia.state.value
   };

-   return { app }
+   return { app, pinia }
 }
```

A `setActiveReq()` e a `getActiveReq()` foram substituídas respetivamente com a `setActivePinia()` e `getActivePinia()`. A `setActivePinia()` apenas pode ser passa para uma instância de `pinia` criada com `createPinia()`. **Nota que na maioria das vezes tu não utilizarás estas funções diretamente**.
