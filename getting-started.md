## Instalação

Instale a `pinia` com o teu gestor de pacotes favorito:

```bash
yarn add pinia
# ou com npm
npm install pinia
```

:::tip Dica
Se a tua aplicação estiver utilizando a Vue 2, tu também precisas instalar a api de composição: `@vue/composition-api`. Se estiveres utilizando a Nuxt, deves seguir [estas instruções](/ssr/nuxt.md).
:::

Se estiveres a utilizar a interface de linha de comando da Vue, podes testar esta [**extensão não oficial**](https://github.com/wobsoriano/vue-cli-plugin-pinia).

Crie uma instância de pinia (a memória de raiz) e passe-a para aplicação como uma extensão:

```js {2,5-6,8}
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.mount('#app')
```

Se estiveres a utilizar a Vue 2, também precisas instalar uma extensão e injetar a `pinia` criada na raiz da aplicação:

```js {1,3-4,12}
import { createPinia, PiniaVuePlugin } from 'pinia'

Vue.use(PiniaVuePlugin)
const pinia = createPinia()

new Vue({
  el: '#app',
  // outras opções...
  // ...
  // nota que a mesma instância de `pinia` pode ser usando ao longo de várias aplicações de Vue na mesma página
  pinia,
})
```

Isto também adicionará o suporte a ferramenta do programador. Na Vue 3, algumas funcionalidades tais como viagem no tempo e edição ainda não são suportadas porque a `vue-devtools` ainda não expôs as APIs necessárias porém a ferramenta do programador tem mais funcionalidades e a experiência de programação como um todo está muito superior. Na Vue 2, a Pinia utiliza a interface existente para Vuex (e portanto não pode ser utilizada junto dela).

## O que é uma Memória?

Uma Memória (Store) (como a Pinia) é uma entidade segurando o estado e a lógica de negócio que não está atada a sua árvore de Componente. Em outras palavras, **ela recebe o estado global**. É um pouco parecido com um componente que está sempre lá e em que todos podem ler e escrever. Tem **três conceitos**, o [estado (`state`)](./core-concepts/state.md), os [recuperadores (`getters`)](./core-concepts/getters.md) e as [ações (`actions`)](./core-concepts/actions.md) e é seguro assumir que estes conceitos são os equivalentes de `data` (dados), `computed` (computados) e `methods` (métodos) em componentes.

## Quando é que eu deveria utilizar uma Memória?

Uma memória deve conter dados que podem ser acessados em toda sua aplicação. Isto inclui os dados que são utilizados em várias lugares, por exemplo, informação do Utilizador que é exibida na barra de navegação, como também os dados que precisam ser preservados em todas as páginas, por exemplo, um muito complicado formulário de várias etapas.

Por outro lado, deves evitar de preferência incluir na memória de dados local aquilo que poderia ser hospedado em um componente, por exemplo a visibilidade de um elemento local para uma página.

Nem todas aplicações precisam de acessar a um estado global, mas se as tuas precisarem de uma, a Pinia tornará a sua vida muito mais fácil.
