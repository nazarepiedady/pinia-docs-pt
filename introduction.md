# Introdução %{#introduction}%

<VueSchoolLink
  href="https://vueschool.io/lessons/introduction-to-pinia"
  title="Começar com a Pinia"
/>

A Pinia [começou](https://github.com/vuejs/pinia/commit/06aeef54e2cad66696063c62829dac74e15fd19e) como um experimento para redesenhar o que uma memória para Vue se pareceria com a [API de Composição](https://github.com/vuejs/composition-api) por volta de Novembro de 2019. Desde então, os princípios iniciais continuaram os mesmos, exceto que a Pinia funciona para ambas Vue 2 e Vue 3 **e não obriga-nos a usar a API de composição**. A API é a mesma para ambas exceto para a _instalação_ e _interpretação do lado do servidor_, e estas documentações são dirigidas para Vue 3 **com notas sobre a Vue 2** sempre que necessário assim esta pode ser lido pelos utilizadores da Vue 2 e Vue 3!

## Porquê Eu Deveria Usar a Pinia? %{#why-should-i-use-pinia}%

A Pinia é uma biblioteca de memória para Vue, permite-nos partilhar um estado entre os componentes ou páginas. Se estivermos familiarizados com a API de Composição, podemos estar a pensar que já podemos partilhar um estado global com uma simples `export const state = reactive({})`. Isto pode ser verdade para aplicações de página única, mas **expõe as nossas aplicações às [vulnerabilidades de segurança](https://pt.vuejs.org/guide/scaling-up/ssr#cross-request-state-pollution)** se esta for interpretada do lado do servidor. Porém mesmo em aplicações de página única pequenas, ganhamos muito a partir do uso da Pinia:

- Suporte da ferramenta de programação
  - Uma linha do tempo para rastrear as ações e mutações
  - As memórias aparecem nos componentes onde são usadas
  - Viagem no tempo e depuração mais fáceis
- Substituição instantânea de módulo
  - Modificar suas memórias sem recarregar a nossa página
  - Preservar qualquer estado existente enquanto estivermos a desenvolver
- Extensões: estender as funcionalidades da Pinia com extensões
- Suporte apropriado à TypeScript ou **conclusão automática** para os utilizadores da JavaScript
- Suporte a Interpretação do Lado do Servidor

<VueMasteryLogoLink for="pinia-cheat-sheet" />

## Exemplo Básico %{#basic-example}%

Isto é como o uso da pinia se parece em termos de API (devemos certificar-nos de consultar o [Começar](./getting-started) por instruções completas).  Nós começamos criando uma memória:

```js
// stores/counter.js
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => {
    return { count: 0 }
  },
  // poderia também ser definida como
  // state: () => ({ count: 0 })
  actions: {
    increment() {
      this.count++
    },
  },
})
```

E então podemos _usá-la_ num componente:

```vue
<script setup>
import { useCounterStore } from '@/stores/counter'

const counter = useCounterStore()

counter.count++
// com a conclusão automática ✨
counter.$patch({ counter: counter.count + 1 })
// ou usando uma ação
counter.increment()
</script>

<template>
  <!-- Acessar o estado diretamente a partir da memória -->
  <div>Current count: {{ counter.count }}</div>
</template>
```

Nós podemos até mesmo usar uma função (semelhando à um componente `setup()`) para definir uma memória para os casos de uso mais avançados:

```js
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)

  function increment() {
    count.value++
  }

  return { count, increment }
})
```

Se ainda não estivermos a entender a `setup()` e a API de Composição, não precisamos preocupar-nos, a Pinia também suporta um conjunto semelhante de [_auxiliares de mapeamento_ tal como a Vuex](https://vuex.vuejs.org/guide/state.html#the-mapstate-helper). Nós definimos as memórias da mesma maneira exceto que depois usamos `mapStores()`, `mapState()` ou `mapActions()`:

```js {22,24,28}
const useCounterStore = defineStore('counter', {
  state: () => ({ count: 0 }),
  getters: {
    double: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++
    },
  },
})

const useUserStore = defineStore('user', {
  // ...
})

export default defineComponent({
  computed: {
    // outras propriedades computadas
    // ...
    // dá acesso ao `this.counterStore` e `this.userStore`
    ...mapStores(useCounterStore, useUserStore),
    // dá acesso de leitura ao `this.count` e `this.double`
    ...mapState(useCounterStore, ['count', 'double']),
  },
  methods: {
    // dá acesso ao `this.increment()`
    ...mapActions(useCounterStore, ['increment']),
  },
})
```

Nós encontraremos mais informações sobre cada _auxiliar de mapeamento_ nos conceitos principais.

## Porquê _Pinia_ %{#why-pinia}%

Pinia (pronunciado `/piːnjʌ/`, semelhante a "peenya" em Inglês) é a palavra mais próxima a _pinã_ (_ananás_ em Espanhol) que é um nome de pacote válido. Um ananás é na realidade um grupo de flores individuais que unem-se juntas para criar um múltiplo de fruta. Similar as memórias, cada uma é nascida individualmente, mas no final elas estão todas conectadas. Também é um fruto tropical nativo da América do Sul.

## Um Exemplo Mais Realista %{#a-more-realistic-example}%

Eis um exemplo mais completo da API que encontraremos usando com a Pinia **com tipos mesmo na JavaScript**. Para algumas pessoas, isto pode ser o suficiente para começar sem ler mais, porém ainda recomendamos consultar o resto da documentação ou mesmo ignorar este exemplo e voltar assim que lermos todos os _Conceitos Principais_:

```js
import { defineStore } from 'pinia'

export const useTodos = defineStore('todos', {
  state: () => ({
    /** @type {{ text: string, id: number, isFinished: boolean }[]} */
    todos: [],
    /** @type {'all' | 'finished' | 'unfinished'} */
    filter: 'all',
    // o tipo será automaticamente inferido ao número
    nextId: 0,
  }),
  getters: {
    finishedTodos(state) {
      // conclusão automática! ✨
      return state.todos.filter((todo) => todo.isFinished)
    },
    unfinishedTodos(state) {
      return state.todos.filter((todo) => !todo.isFinished)
    },
    /**
     * @returns {{ text: string, id: number, isFinished: boolean }[]}
     */
    filteredTodos(state) {
      if (this.filter === 'finished') {
        // chamar outros recuperadores com a conclusão automática ✨
        return this.finishedTodos
      } else if (this.filter === 'unfinished') {
        return this.unfinishedTodos
      }
      return this.todos
    },
  },
  actions: {
    // quaisquer quantidade de argumentos, retorna ou não uma promessa
    addTodo(text) {
      // podemos alterar o estado diretamente
      this.todos.push({ text, id: this.nextId++, isFinished: false })
    },
  },
})
```

## Comparando com a Vuex %{#comparison-with-vuex}%

A Pinia começou como uma exploração de como a próxima iteração da Vuex poderia se parecer, incorporando muitas ideias das discussões da equipa principal para Vuex 5. Eventualmente, nos apercebê-mos de que a Pinia já implementa a maioria daquilo que queríamos na Vuex 5, e decidimos torná-la a nova recomendação.

Comparada à Vuex, a Pinia fornece uma API mais simples com menos cerimónia, oferece APIs do estilo da API de Composição, e mais importante, tem suporte sólido a inferência de tipo quando usada com a TypeScript.

### Pedido por Comentários %{#rfcs}%

Inicialmente a Pinia não avançou através de qualquer pedido por comentário. Eu testei ideias baseadas na minha experiência programando aplicações, lendo código de outras pessoas, trabalhando para clientes que usam a Pinia, e respondendo questões na Discord. Isto permitiu-me fornecer uma solução que funciona e que está adaptada a uma variedade de casos e tamanho de aplicações. Eu costumava a publicar com frequência e fiz a biblioteca evoluir enquanto preservava a sua API principal.

Agora que a Pinia tornou-se a solução padrão para gestão de estados, está sujeita ao mesmo processo de Pedido por Comentário tal como as outras bibliotecas principais dentro do ecossistema da Vue e sua API entrou num estado estável.

### Comparação com a Vuex 3.x ou 4.x %{#comparison-with-vuex-3-x-4-x}%

> A Vuex 3.x é a Vuex para a Vue 2 enquanto a Vuex 4.x é para a Vue 3

Nomeadamente, a API da Pinia é muito diferente ad Vuex <=4:

- Já não existem mais _mutações (ou `mutations`)_. Elas eram frequentemente consideradas como **extremamente verbosas**. Elas inicialmente trouxeram integração da ferramenta de programação mas isto já não é um problema.

- Já não precisa criar embrulhadores complexos personalizados para suportar a TypeScript, tudo está tipificado e a API está desenhada duma maneira que influencia a inferência de tipo da TypeScript o máximo possível.

- Nada de sequências de caracteres magicas à injetar, importe as funções, chame-as, desfrute da conclusão automática!

- Já não precisa de adicionar as memórias dinamicamente, são todas dinâmicas por padrão e nem notaremos. Nota que ainda podemos usar manualmente uma memória para registá-la sempre que quisermos mas por isto ser automático não precisas de nos preocupar com isto.

- Nada de estruturação encaixada de _módulos (ou `modules`)_. Nós ainda podemos encaixar as memórias implicitamente pela importação e _usar_ uma memória dentro duma outra mas a Pinia oferece uma estruturação plana por padrão enquanto continua permite maneiras de cruzar a composição entre as memórias. **Nós podemos até mesmo ter dependências circulares de memórias**.

- Nada de _módulos de nome espaçado (ou `namespaced`)_. Dada a arquitetura plana das memórias, "espaçar o nome" das memórias é herdado à como são definidas e poderíamos dizer que todas as memórias são espaçadas por nome.

Para instruções mais detalhadas de como converter um projeto de Vuex <= 4 existente para usar a Pinia, consulte o [Guia de Migração da Vuex](./cookbook/migration-vuex).
