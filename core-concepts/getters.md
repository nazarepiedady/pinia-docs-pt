# Recuperadores (`getters`)

Os recuperadores são exatamente o equivalente dos [valores computados](https://v3.vuejs.org/guide/reactivity-computed-watchers.html#computed-values) para o estado de uma Memória. Eles podem ser definidos com a propriedade `getters` dentro de `defineStore()`. Eles recebem o `state` como primeiro parâmetro **para encorajar** o uso de uma função em flecha:

```js
export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
  }),
  getters: {
    doubleCount: (state) => state.count * 2,
  },
})
```

Na maioria das vezes, os recuperadores apenas dependerão do estado, no entanto, eles podem precisar utilizar outros recuperadores. Por causa disto, nós podemos ter acesso a _instância da memória inteira_ através do `this` quando estivermos definindo uma função regular **porém é necessário definir o tipo do tipo de retorno (na TypeScript)**. Isto por causa de a uma limitação conhecida em TypeScript e que **não afeta os recuperadores definidos com uma função em flecha e nem recuperadores que não estão utilizando `this`**:

```ts
export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
  }),
  getters: {
    // infere automaticamente o tipo de retorno como um número
    doubleCount(state) {
      return state.count * 2
    },
    // o tipo de retorno **deve** ser definido explicitamente
    doublePlusOne(): number {
      // conclusão automática e tipagens para a memória inteira ✨
      return this.doubleCount + 1
    },
  },
})
```

A seguir podes acessar o recuperador diretamente na instância da memória:

```vue
<template>
  <p>Double count is {{ store.doubleCount }}</p>
</template>

<script>
export default {
  setup() {
    const store = useCounterStore()

    return { store }
  },
}
</script>
```

## Acessando outros recuperadores

Tal como com as propriedades computadas, tu podes combinar vários recuperadores. Acessar qualquer outro recuperador através do `this`. Mesmo que não estejas utilizando a TypeScript, podes sugerir os tipos à tua IDE com a [JSDoc](https://jsdoc.app/tags-returns.html):

```js
export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
  }),
  getters: {
    // o tipo é inferido automaticamente porque não estamos utilizando o `this`
    doubleCount: (state) => state.count * 2,
    // aqui precisamos adicionar o tipo nós mesmos (utilizando JSDoc em JavaScript).
    // Também podemos utilizar isto para documentar o recuperador
    /**
     * Returns the count value times two plus one.
     *
     * @returns {number}
     */
    doubleCountPlusOne() {
      // conclusão automática ✨
      return this.doubleCount + 1
    },
  },
})
```

## Passando argumentos para os recuperadores

Nos bastidores os _recuperadores_ são apenas propriedades _computadas_, então não é possível passar quaisquer parâmetros para eles. Contudo, tu podes retornar uma função do _recuperador_ para aceitar quaisquer argumentos:

```js
export const useStore = defineStore('main', {
  getters: {
    getUserById: (state) => {
      return (userId) => state.users.find((user) => user.id === userId)
    },
  },
})
```

e utilizar no componente:

```vue
<script>
export default {
  setup() {
    const store = useStore()

    return { getUserById: store.getUserById }
  },
}
</script>

<template>
  <p>User 2: {{ getUserById(2) }}</p>
</template>
```

Nota que quando estiveres fazendo isto, os **recuperadores não são mais cacheados**, eles são simplesmente funções que invocas. No entanto podes cachear alguns resultados dentro do próprio recuperador, o que é incomum mas prova-se ter mais desempenho:

```js
export const useStore = defineStore('main', {
  getters: {
    getActiveUserById(state) {
      const activeUsers = state.users.filter((user) => user.active)
      return (userId) => activeUsers.find((user) => user.id === userId)
    },
  },
})
```

## Acessando outros recuperadores de memórias

Para utilizar os outros recuperadores de memória, tu podes _utilizá-los_ diretamente dentro do _recuperador_:

```js
import { useOtherStore } from './other-store'

export const useStore = defineStore('main', {
  state: () => ({
    // ...
  }),
  getters: {
    otherGetter(state) {
      const otherStore = useOtherStore()
      return state.localData + otherStore.data
    },
  },
})
```

## Utilização com `setup()`

Tu podes acessar diretamente qualquer recuperador como uma propriedade da memória (exatamente como as propriedades de estado):

```js
export default {
  setup() {
    const store = useCounterStore()

    store.count = 3
    store.doubleCount // 6
  },
}
```

## Utilização com a API de Opções

Para os seguintes exemplos, podes assumir que a seguinte memória foi criada:

```js
// Caminho do Ficheiro de Exemplo:
// ./src/stores/counterStore.js

import { defineStore } from 'pinia',

const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0
  }),
  getters: {
    doubleCounter(state) {
      return state.count * 2
    }
  }
})
```

### Com `setup()`

Apesar de a API de Composição não ser para todos, o gatilho `setup()` pode tornar a Pinia mais fácil de se trabalhar dentro da API de Opções. Sem a necessidade de funções auxiliares de delinear adicionais!

```js
import { useCounterStore } from '../stores/counterStore'

export default {
  setup() {
    const counterStore = useCounterStore()

    return { counterStore }
  },
  computed: {
    quadrupleCounter() {
      return this.counterStore.doubleCounter * 2
    },
  },
}
```

### Sem `setup()`

Tu podes utilizar a mesma função `mapState()` utilizada na [secção anterior do estado](./state.md#utilização-com-a-api-de-opções) para delinear um caminho até os recuperadores:

```js
import { mapState } from 'pinia'
import { useCounterStore } from '../stores/counterStore'

export default {
  computed: {
    // dá acesso ao `this.doubleCounter` dentro do componente
    // o mesmo que ler a partir de `store.doubleCounter`
    ...mapState(useCounterStore, ['doubleCount'])
    // o mesmo que acima exceto de regista-o como `this.myOwnName`
    ...mapState(useCounterStore, {
      myOwnName: 'doubleCounter',
      // também podes escrever uma função que recebe acesso à memória
      double: store => store.doubleCount,
    }),
  },
}
```
