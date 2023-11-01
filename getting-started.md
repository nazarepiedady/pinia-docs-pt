# Começar %{#getting-started}%

## Instalação %{#installation}%

<VueMasteryLogoLink for="pinia-cheat-sheet" />

Instalamos a `pinia` com o nosso gestor de pacote favorito:

```bash
yarn add pinia
# ou com npm
npm install pinia
```

:::tip DICA
Se a nossa aplicação estiver a usar a Vue <2.7, também precisamos instalar a api de composição: `@vue/composition-api`. Se estivermos a usar a Nuxt, devemos seguir [estas instruções](/ssr/nuxt).
:::

Se estivermos a usar a interface da linha de comando da Vue, podemos testar esta [**extensão não oficial**](https://github.com/wobsoriano/vue-cli-plugin-pinia).

Nós criamos uma instância de `pinia`(a memória de raiz) e a passamos à aplicação como uma extensão:

```js {2,5-6,8}
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.mount('#app')
```

Se estivermos a usar a Vue 2, também precisamos instalar uma extensão e injetar a `pinia` criada na raiz da aplicação:

```js {1,3-4,12}
import { createPinia, PiniaVuePlugin } from 'pinia'

Vue.use(PiniaVuePlugin)
const pinia = createPinia()

new Vue({
  el: '#app',
  // outras opções...
  // ...
  // nota que a mesma instância de `pinia` pode ser usada
  // por várias aplicações de Vue na mesma página
  pinia,
})
```

Isto também adicionará o suporte da ferramenta de programação. Na Vue 3, algumas funcionalidades como as viagens no tempo e edição ainda não são suportadas porque a `vue-devtools` ainda expõe as APIs necessárias mas a ferramenta de programação tem mais funcionalidades e a experiência de programação como um todo é muito superior.

## O que é uma Memória? %{#what-is-a-store}%

Uma memória (como a Pinia) é uma entidade segurando o estado e a lógica de negócio que não está vinculada à nossa árvore de componente. Em outras palavras, **hospeda o estado global**. É um pouco como um componente que está sempre lá e para qual todos podem ler ou escrever. Esta tem **três conceitos**, o [estado (ou `state`)](./core-concepts/state), os [recuperadores (ou `getters`)](./core-concepts/getters) e as [ações (ou `actions`)](./core-concepts/actions) e é seguro assumir que estes conceitos são os equivalentes de `data`, `computed` e `methods` nos componentes.

## Quando é que Eu deveria usar uma Memória? %{#when-should-i-use-a-store}%

Uma memória deve conter os dados que podem ser acessados por toda nossa aplicação. Isto inclui os dados que são usados em vários lugares, por exemplo, a informação do utilizador que é exibida na barra de navegação, como também os dados que precisam ser preservados através das páginas, por exemplo, um complicado formulário de várias etapas.

Por outro lado, devemos evitar incluir na memória dados locais que poderiam ser hospedados num componente, por exemplo, a visibilidade dum elemento local à uma página.

Nem todas aplicações precisam de acesso à um estado global, mas se as nossas precisarem dum, a Pinia facilitará muito a nossa vida.
