# Introdução

A Pinia [começou](https://github.com/vuejs/pinia/commit/06aeef54e2cad66696063c62829dac74e15fd19e) como um experimento para redesenhar aquilo que uma Memória para Vue se pareceria com a [API de Composição](https://github.com/vuejs/composition-api) por volta de Novembro de 2019. Desde então, os princípios iniciais continuaram os mesmos, exceto que a Pinia funciona para ambas Vue 2 e Vue 3 **e não te obriga a utilizar a API de composição**. A API é a mesma para ambas exceto para a _instalação_ e _interpretação no lado do servidor (SSR, sigla em Inglês)_, e estas documentações são dirigidas para Vue 3 **com notas sobre a Vue 2** sempre que necessário assim isto pode ser lido por utilizadores da Vue 2 e Vue 3! 

## Porquê eu deveria utilizar a Pinia?

A Pinia é uma biblioteca de memória para Vue, ela permite-te partilhar um estado entre os componentes ou páginas. Se estás familiarizado com a API de Composição, tu poderias estar pensar em como que já consegues partilhar um estado global com uma simples `export const state = reactive({})`. Isto é verdade para aplicações de página única, porém **expõe a tua aplicação à [vulnerabilidades de segurança](https://vuejs.org/guide/scaling-up/ssr.html#cross-request-state-pollution)** se ela for interpretada no lado do servidor. Porém mesmo em pequenas aplicações de página única, tu ganhas muito utilizando a Pinia:

- Suporte a ferramenta do programador
  - Uma linha do tempo para rastrear as ações e mutações
  - Stores appear in components where they are used As memórias aparecem nos componentes onde elas são usadas
  - Viagem no tempo e depuração mais fáceis
- Substituição instantânea de módulo
  - Modificar suas memórias sem recarregar tua página
  - Preservar qualquer estado existente enquanto estiveres desenvolvendo
- Extensões: estenda as funcionalidades da Pinia com extensões
- Suporte apropriado ao TypeScript ou **conclusão automática (autocompletion, em Inglês)** para utilizadores de JavaScript
- Suporte a Interpretação no Lado do Servidor (SSR, em Inglês)

## Exemplo básico

Isto é como a utilização da pinia se parece em termos de API (certifique-se de consultar o [Começar](./getting-started.md) para instruções completas). Tu começas pela criação de uma memória:

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

E então podes _utilizá-la_ em um componente:

```js
import { useCounterStore } from '@/stores/counter'

export default {
  setup() {
    const counter = useCounterStore()

    counter.count++
    // com a conclusão automática ✨
    counter.$patch({ count: counter.count + 1 })
    // ou utilizando uma ação no lugar
    counter.increment()
  },
}
```

Tu podes até mesmo utilizar uma função (similar a um `setup()` de componente) para definir uma Memória para casos de uso mais avançados:

```js
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  function increment() {
    count.value++
  }

  return { count, increment }
})
```

Se ainda não estiveres entendendo a `setup()` e a API de Composição, não se preocupe, a Pinia também suporta um conjunto similar de [_mapas auxiliares_ tal como a Vuex](https://vuex.vuejs.org/guide/state.html#the-mapstate-helper). Tu defines as memórias da mesma maneira exceto que depois utilizas `mapStores()`, `mapState()`, ou `mapActions()`:

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

export default {
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
}
```

Tu encontrarás mais informações sobre cada _mapa auxiliar_ nos conceitos fundamentais.

## Porquê _Pinia_

Pinia (pronunciado `/piːnjʌ/`, semelhante a "peenya" em Inglês) é a palavra mais próxima a _pinã_ (_ananás_ em Espanhol) que é um nome de pacote válido. Um ananás é na realidade um grupo de flores individuais que unem-se juntas para criar um múltiplo de fruta. Similar as memórias, cada uma é nascida individualmente, mas no final elas estão todas conectadas. Também é um fruto tropical nativo da América do Sul.

## Um exemplo mais realista

Aqui está um exemplo mais completo da API que estarás utilizando com a Pinia **com tipos mesmo em JavaScript**. Para algumas pessoas, isto pode ser o suficiente para começar sem leitura adicional, porém nós ainda recomendamos a consulta do resto da documentação ou até mesmo pular este exemplo e voltar atrás uma vez que tens que ler tudo sobre os _Conceitos Fundamentais_

```js
import { defineStore } from 'pinia'

export const useTodos = defineStore('todos', {
  state: () => ({
    /** @type {{ text: string, id: number, isFinished: boolean }[]} */
    todos: [],
    /** @type {'all' | 'finished' | 'unfinished'} */
    filter: 'all',
    // o tipo será automaticamente inferido para número
    nextId: 0,
  }),
  getters: {
    finishedTodos(state) {
      // conclusão automática (autocompletion, em Inglês)! ✨
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
    // quaisquer quantidade de argumentos, retorna uma promessa ou não
    addTodo(text) {
      // tu podes alterar o estado diretamente
      this.todos.push({ text, id: this.nextId++, isFinished: false })
    },
  },
})
```

## Comparação com a Vuex

A Pinia começou como uma exploração de com o quê a próxima iteração da Vuex poderia se parecer, incorporando muitas ideias das discussões da equipa principal para Vuex 5. Eventualmente, nós nos apercebê-mos de que a Pinia já implementa a maioria daquilo que nós queríamos na Vuex 5, e decidimos torná-la a nova recomendação no lugar da Vuex. 

Comparada a Vuex, a Pinia fornece uma API mais simples com menos cerimónia, oferece APIs no estilo da API de Composição, e mais importante, tem suporte sólido a inferência de tipo quando utilizada com TypeScript.

### Pedido por Comentários (RFCs, em Inglês)

Inicialmente a Pinia não avançou através de qualquer pedido por comentário (RFC, em Inglês). Eu testei ideias baseadas na minha experiência programando aplicações, lendo código de outras pessoas, trabalhando para clientes que utilizam a Pinia, e respondendo questões na Discord.
Isto permitiu-me fornecer uma solução que funciona e que é adaptada a uma variedade de casos e tamanho de aplicações. Eu costumava a publicar com frequência e fiz a biblioteca evoluir enquanto preserva a sua API principal.


Agora que a Pinia tornou-se a solução padrão para gestão de estados, está sujeita ao mesmo processo de Pedido por Comentário (RFC, em Inglês) tal como as outras bibliotecas principais dentro do ecossistema da Vue e sua API entrou em um estado estável.

### Comparação com a Vuex 3.x/4.x

> A Vuex 3.x é a Vuex para a Vue 2 enquanto a Vuex 4.x é para a Vue 3

Nomeadamente, a API da Pinia é muito diferente a Vuex <=4:

- Já não existem mais _mutações (`mutations`)_. Elas eram com frequência consideradas como **extremamente verbosas**. Elas inicialmente trouxeram integração da ferramenta do programador mas isto não é mais um problema.

- Não precisa criar envolvedores complexos personalizados para suportar a TypeScript, tudo está tipado e a API é desenhada de uma maneira que influencie a inferência de tipo de TypeScript tanto quanto possível.

- Nada de sequências de caracteres magicas para injetar, importar as funções, chamá-las, desfrute da conclusão automática (autocompletion, em Inglês)! 

- Não precisa de adicionar a memórias dinamicamente, elas são todas dinâmicas por padrão e nem notarás. Nota que ainda podes utilizar manualmente uma memória para registá-la sempre que quiseres mas por isto ser automático não precisas preocupar-se com ela.

- Nada de estruturação encaixada de _módulos (`modules`)_. Tu ainda podes encaixar as memórias implicitamente pela importação e _utilizar_ uma memória dentro de uma outra mas a Pinia oferece uma estruturação plana por padrão enquanto continua habilitando maneiras de cruzamento de composição entre as memórias. **Tu podes até mesmo ter dependências de memórias circulares**.

- Nada de _módulos com nomes de espaço reservados (namespaced, termo em Inglês)_. Dada a arquitetura plana das memórias, "os nomes de espaço reservados" de memórias são herdados como eles são definidos e poderias dizer que todas as memórias são de nomes de espaço reservados.

Para instruções mais detalhadas de como converter um projeto existente em Vuex <= 4 para utilizar a Pinia, consulte o [Guia de Migração da Vuex](./cookbook/migration-vuex.md).
