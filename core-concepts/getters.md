# Recuperadores %{#Getters}%

<VueSchoolLink
  href="https://vueschool.io/lessons/getters-in-pinia"
  title="Aprenda tudo sobre os recuperadores na Pinia"
/>

Os recuperadores são exatamente os equivalentes dos [valores computados](https://pt.vuejs.org/guide/essentials/computed) para o estado duma memória. Estes podem ser definidos com a propriedade `getters` na `defineStore()`. Estes recebem o `state` como primeiro parâmetro **para encorajar** o uso da função de flecha:

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

Na maioria das vezes, os recuperadores apenas dependerão do estado, no entanto, podem precisar usar outros recuperadores. Por causa disto, podemos obter acesso à _instância da memória inteira_ através da `this` quando definimos uma função normal **mas é necessário definir o tipo do tipo do retorno (na TypeScript)**. Isto devido a uma limitação conhecida na TypeScript e **não afeta os recuperadores definidos com uma função de flecha nem os recuperadores que não usam `this`**:

```ts
export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
  }),
  getters: {
    // infere automaticamente o tipo do retorno como um número
    doubleCount(state) {
      return state.count * 2
    },
    // o tipo do retorno **deve** ser definido explicitamente
    doublePlusOne(): number {
      // conclusão automática e tipificações para a memória inteira ✨
      return this.doubleCount + 1
    },
  },
})
```

Depois podemos acessar o recuperador diretamente sobre a instância da memória:

```vue
<script setup>
import { useCounterStore } from './counterStore'

const store = useCounterStore()
</script>

<template>
  <p>Double count is {{ store.doubleCount }}</p>
</template>
```

## Acessando outros Recuperadores %{#Accessing-other-getters}%

Tal como acontece com as propriedades computadas, podemos combinar vários recuperadores. Acessar qualquer outro recuperador através da `this`. Mesmo se estivermos usando a TypeScript, podemos sugerir ao nosso ambiente de desenvolvimento integrado os tipos com a [JSDoc](https://jsdoc.app/tags-returns.html):

```js
export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
  }),
  getters: {
    // o tipo é inferido automaticamente porque
    // não estamos usando a `this`
    doubleCount: (state) => state.count * 2,
    // Neste precisamos adicionar o tipo nós mesmos
    // (usando a JSDoc na JavaScript).
    // Também podemos usar isto para documentar o recuperador
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

## Passando Argumentos aos Recuperadores %{#Passing-arguments-to-getters}%

Nos bastidores os _recuperadores_ são apenas propriedades _computadas_, então não possível passar quaisquer parâmetros às mesmas. No entanto, podemos retornar uma função do _recuperador_ para aceitar quaisquer argumentos:

```js
export const useStore = defineStore('main', {
  getters: {
    getUserById: (state) => {
      return (userId) => state.users.find((user) => user.id === userId)
    },
  },
})
```

e usar no componente:

```vue
<script setup>
import { storeToRefs } from 'pinia'
import { useUserListStore } from './store'

const userList = useUserListStore()
const { getUserById } = storeToRefs(userList)
// nota que precisaremos usar `getUserById.value`
// para acessar a função dentro do `<script setup>`
</script>

<template>
  <p>User 2: {{ getUserById(2) }}</p>
</template>
```

Nota que quando fazemos isto, os **recuperadores já não são armazenados para consulta imediata**, são simplesmente função invocamos. No entanto, podemos armazenar para consulta imediata alguns resultados dentro do próprio recuperador, que é incomum mas é mais otimizado:

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

## Acessando Recuperadores das Outras Memórias %{#Accessing-other-stores-getters}%

Para usarmos os recuperadores duma outra memória, podemos _usá-los_ diretamente dentro do _recuperador_:

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

## Uso com `setup()` %{#Usage-with-setup-}%

Nós podemos acessar diretamente qualquer recuperador como uma propriedade da memória (exatamente como as propriedades de estado):

```vue
<script setup>
const store = useCounterStore()

store.count = 3
store.doubleCount // 6
</script>
```

## Uso com a API de Opções %{#Usage-with-the-Options-API}%

<VueSchoolLink
  href="https://vueschool.io/lessons/access-pinia-getters-in-the-options-api"
  title="Acessar os Recuperadores da Pinia através da API de Opções"
/>

Para os seguintes exemplos, podemos assumir que a seguinte memória foi criada:

```js
// Caminho do Ficheiro de Exemplo:
// ./src/stores/counterStore.js

import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
  }),
  getters: {
    doubleCount(state) {
      return state.count * 2
    },
  },
})
```

### Usando com a `setup()` %{#With-setup-}%

Embora a API de Composição não seja para todos, a função gatilho `setup()` pode facilitar o uso da Pinia dentro da API de Opções. Sem a necessidade de funções auxiliares mapeamento adicionais!

```vue
<script>
import { useCounterStore } from '../stores/counter'

export default defineComponent({
  setup() {
    const counterStore = useCounterStore()

    // **retornar apenas a memória inteira**
    // ao invés de desestruturar
    return { counterStore }
  },
  computed: {
    quadrupleCounter() {
      return this.counterStore.doubleCount * 2
    },
  },
})
</script>
```

### Usando sem a `setup()` %{#Without-setup-}%

Nós podemos usar a mesma função `mapState` usada na [seção anterior do estado](./state#Usage-with-the-Options-API) para mapear os recuperadores:

```js
import { mapState } from 'pinia'
import { useCounterStore } from '../stores/counter'

export default {
  computed: {
    // dá acesso ao `this.doubleCounter` dentro do componente
    // o mesmo que ler a partir de `store.doubleCounter`
    ...mapState(useCounterStore, ['doubleCount']),
    // o mesmo que acima exceto que a regista como
    // `this.myOwnName`
    ...mapState(useCounterStore, {
      myOwnName: 'doubleCount',
      // também podemos escrever uma função que
      // recebe o acesso à memória
      double: (store) => store.doubleCount,
    }),
  },
}
```
