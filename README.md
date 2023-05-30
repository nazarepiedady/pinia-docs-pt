<p align="center">
  <a href="https://pinia.vuejs.org" target="_blank" rel="noopener noreferrer">
    <img width="180" src="https://pinia.vuejs.org/logo.svg" alt="Logótipo da Pinia">
  </a>
</p>
<br/>
<p align="center">
  <a href="https://npmjs.com/package/pinia">
    <img src="https://badgen.net/npm/v/pinia" alt="pacote da npm">
  </a>
  <a href="https://github.com/vuejs/pinia/actions/workflows/test.yml?query=branch%3Av2">
    <img src="https://github.com/vuejs/pinia/workflows/test/badge.svg?branch=v2" alt="estado da construção">
  </a>
  <a href="https://codecov.io/github/vuejs/pinia">
    <img src="https://badgen.net/codecov/c/github/vuejs/pinia/v2" alt="cobertura de código">
  </a>
</p>
<br/>

# Pinia

> Intuitiva, memória flexível e segurança de tipo para Vue.js

- 💡 Intuitiva
- 🔑 Segurança de Tipo
- ⚙️ Suporte de Ferramenta de Programação
- 🔌 Extensível
- 🏗 Modular de Propósito
- 📦 Extremamente Leve

A Pinia funciona com ambas Vue 2 e Vue 3.

Pinia é a pronúncia em Inglês mais parecida com a palavra _pineapple_ em Espanhol: _pinã_ que significa ananás em Português. Um ananás é na realidade um grupo de flores individuais que se juntam para criar uma fruta diversificada. Semelhante as memórias, cada uma é nascida individualmente, mas são todas conectadas no final. É também uma deliciosa fruta tropical nativa da América do Sul.

## 👉 [Demonstração com a Vue 3 na StackBlitz](https://stackblitz.com/github/piniajs/example-vue-3-vite)

## 👉 [ Demonstração com a Nuxt 3 na StackBlitz](https://stackblitz.com/github/piniajs/example-nuxt-3)

## Ajuda-me a continuar a trabalhar neste projeto 💚

- [Torna-te um Patrocinador na GitHub](https://github.com/sponsors/posva)
- [Doação de uma vez através da PayPal](https://paypal.me/posva)

<!--sponsors start-->

<h4 align="center">Patrocinadores de Ouro</h4>
<p align="center">
    <a href="https://vuejobs.com/?utm_source=vuerouter&utm_campaign=sponsor" target="_blank" rel="noopener noreferrer">
    <picture>
      <source srcset="https://posva-sponsors.pages.dev/logos/vuejobs.svg" media="(prefers-color-scheme: dark)" height="72px" alt="VueJobs" />
      <img src="https://posva-sponsors.pages.dev/logos/vuejobs.svg" height="72px" alt="VueJobs" />
    </picture>
  </a>
</p>

<h4 align="center">Patrocinadores de Prata</h4>
<p align="center">
    <a href="https://www.vuemastery.com/" target="_blank" rel="noopener noreferrer">
    <picture>
      <source srcset="https://posva-sponsors.pages.dev/logos/vuemastery-dark.png" media="(prefers-color-scheme: dark)" height="42px" alt="VueMastery" />
      <img src="https://posva-sponsors.pages.dev/logos/vuemastery-light.svg" height="42px" alt="VueMastery" />
    </picture>
  </a>
    <a href="https://www.prefect.io/" target="_blank" rel="noopener noreferrer">
    <picture>
      <source srcset="https://posva-sponsors.pages.dev/logos/prefectlogo-dark.svg" media="(prefers-color-scheme: dark)" height="42px" alt="Prefect" />
      <img src="https://posva-sponsors.pages.dev/logos/prefectlogo-light.svg" height="42px" alt="Prefect" />
    </picture>
  </a>
</p>

<h4 align="center">Patrocinadores de Bronze</h4>
<p align="center">
    <a href="https://stormier.ninja" target="_blank" rel="noopener noreferrer">
    <picture>
      <source srcset="https://avatars.githubusercontent.com/u/2486424?u=7b0c73ae5d090ce53bf59473094e9606fe082c59&v=4" media="(prefers-color-scheme: dark)" height="26px" alt="Stanislas OrmiÃ¨res" />
      <img src="https://avatars.githubusercontent.com/u/2486424?u=7b0c73ae5d090ce53bf59473094e9606fe082c59&v=4" height="26px" alt="Stanislas OrmiÃ¨res" />
    </picture>
  </a>
    <a href="www.vuejs.de" target="_blank" rel="noopener noreferrer">
    <picture>
      <source srcset="https://avatars.githubusercontent.com/u/4183726?u=6b50a8ea16de29d2982f43c5640b1db9299ebcd1&v=4" media="(prefers-color-scheme: dark)" height="26px" alt="Antony Konstantinidis" />
      <img src="https://avatars.githubusercontent.com/u/4183726?u=6b50a8ea16de29d2982f43c5640b1db9299ebcd1&v=4" height="26px" alt="Antony Konstantinidis" />
    </picture>
  </a>
    <a href="https://storyblok.com" target="_blank" rel="noopener noreferrer">
    <picture>
      <source srcset="https://posva-sponsors.pages.dev/logos/storyblok.png" media="(prefers-color-scheme: dark)" height="26px" alt="Storyblok" />
      <img src="https://posva-sponsors.pages.dev/logos/storyblok.png" height="26px" alt="Storyblok" />
    </picture>
  </a>
    <a href="https://nuxtjs.org" target="_blank" rel="noopener noreferrer">
    <picture>
      <source srcset="https://posva-sponsors.pages.dev/logos/nuxt-dark.svg" media="(prefers-color-scheme: dark)" height="26px" alt="NuxtJS" />
      <img src="https://posva-sponsors.pages.dev/logos/nuxt-light.svg" height="26px" alt="NuxtJS" />
    </picture>
  </a>
</p>

<!--sponsors end-->

---

## Questões Feitas com Frequências

Algumas notas sobre o projeto e possíveis questões:

- **Questão**: _A Pinia é a sucessora da Vuex?_

  - **Resposta**: [Sim](https://vuejs.org/guide/scaling-up/state-management.html#pinia)

- **Questão**: _E os módulos dinâmicos?_

  - **Resposta**: Os módulos dinâmicos não estão em segurança de tipo, assim no lugar destes [permitimos a criação de memórias diferentes](https://pinia.vuejs.org/cookbook/composing-stores.html) que podem ser importadas em qualquer parte.

## Instalação

```bash
# ou pnpm ou yarn
npm install pinia
```

Se estiveres a usar uma versão da Vue abaixo da 2.7, certifica-te de instalar o `@vue/composition-api` mas recente:

```bash
npm install pinia @vue/composition-api
```

## Uso

### Instalar a extensão

Crie uma pinia (a memória raiz) e passe-a para aplicação:

```js
// Vue 3
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.mount('#app')
```

```js
// Vue 2
import { createPinia, PiniaVuePlugin } from 'pinia'

Vue.use(PiniaVuePlugin)
const pinia = createPinia()

new Vue({
  el: '#app',
  // outras opções...
  // ...
  // nota que a mesma instância de `pinia` pode ser usada
  // através de várias aplicações de Vue na mesma página.
  pinia,
})
```

### Criar uma Memória (`store`)

Tu podes criar quantas memórias quiseres, e cada uma deve existir em ficheiros diferentes:

```ts
import { defineStore } from 'pinia'

// `main` é o nome da memória. É único através da tua aplicação
// e aparecerá nas ferramentas de programação
export const useMainStore = defineStore('main', {
  // uma função que retorna um estado novo
  state: () => ({
    counter: 0,
    name: 'Eduardo',
  }),
  // recuperadores opcionais
  getters: {
    // os recuperadores recebem o estado como primeiro argumento
    doubleCounter: (state) => state.counter * 2,
    // usar recuperadores dentro doutros recuperadores
    doubleCounterPlusOne(): number {
      return this.doubleCounter + 1
    },
  },
  // ações opcionais
  actions: {
    reset() {
      // `this` é a instância da memória
      this.counter = 0
    },
  },
})
```

`defineStore` retorna uma função que precisa de ser chamada para receber o acesso à memória:

```ts
import { useMainStore } from '@/stores/main'
import { storeToRefs } from 'pinia'

export default defineComponent({
  setup() {
    const main = useMainStore()

    // extrair propriedades específicas da memórias
    const { counter, doubleCounter } = storeToRefs(main)

    return {
      // dar acesso à memória inteira no modelo de marcação
      main,
      // dar acesso apenas ao estado ou recuperador específico
      counter,
      doubleCounter,
    }
  },
})
```

## Documentação

Para saberes mais sobre a Pinia, consulta a [sua documentação](https://pinia.vuejs.org).

## Licença

[MIT](http://opensource.org/licenses/MIT)
