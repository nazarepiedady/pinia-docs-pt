# Estado (`state`)

O estado é, na maioria das vezes, a parte fundamental da sua memória. As pessoas normalmente começam por definir o estado que representa suas aplicações. Na Pinia o estado é definido como uma função que retorna o estado inicial. Isto permite a Pinia funcionar em ambos lados de Servidor e Cliente.

```js
import { defineStore } from 'pinia'

const useStore = defineStore('storeId', {
  // função flecha recomendada para inferência de tipo completa
  state: () => {
    return {
      // todas estas propriedades terão seus tipos inferidos automaticamente
      count: 0,
      name: 'Eduardo',
      isAdmin: true,
    }
  },
})
```

:::tip
Se estiveres a utilizar a Vue 2, os dados que criares em `state` seguem as mesmas regras que daqueles criados no `data` de uma instância de Vue, por exemplo o objeto de estado deve ser plano e precisas chamar a `Vue.set()` quando estiveres **adicionando novas** propriedades a ela. **Consulte também: [Vue#data](https://v2.vuejs.org/v2/api/#data)**.
:::

## TypeScript

Tu não precisas fazer muito para tornar o teu estado compatível com a TypeScript. A pinia inferirá o tipo do teu estado automaticamente mas existem alguns casos onde deves dar uma mãozinha com alguns moldes.

```ts
const useStore = defineStore('storeId', {
  state: () => {
    return {
      // para listas inicialmente vazias
      userList: [] as UserInfo[],
      // para dados que ainda não foram carregados
      user: null as UserInfo | null,
    }
  },
})

interface UserInfo {
  name: string
  age: number
}
```

Se preferires, podes definir o estado com uma interface e definir um tipo para o valor de retorno de `state()`:

```ts
interface State {
  userList: UserInfo[]
  user: UserInfo | null
}

const useStore = defineStore('storeId', {
  state: (): State => {
    return {
      userList: [],
      user: null,
    }
  },
})

interface UserInfo {
  name: string
  age: number
}
```

## Acessando o `estado`

Por padrão, podes ler e escrever diretamente no estado ao acessá-lo através da instância de `store`:

```js
const store = useStore()

store.counter++
```

## Reiniciando o estado

Tu podes _reiniciar_ o estado para o seu valor inicial ao chamar o método `$reset()` na `store`:

```js
const store = useStore()

store.$reset()
```

### Utilização com a API de Opções

Para os exemplos seguintes, podes assumir que a seguinte memória foi criada:

```js
// Caminho do Ficheiro de Exemplo:
// ./src/stores/counterStore.js

import { defineStore } from 'pinia'

const useCounterStore = defineStore('counterStore', {
  state: () => ({
    counter: 0,
  }),
})
```

Se não estiveres utilizando a API de Composição, e estás utilizando `computed`, `methods`, ..., tu podes utilizar a auxiliar `mapState()` para delinear as propriedades do estado como propriedades computadas de apenas leitura:

```js
import { mapState } from 'pinia'
import { useCounterStore } from '../stores/counterStore'

export default {
  computed: {
    // dá acesso ao `this.counter` dentro do componente
    // mesmo que ler de `store.counter`
    ...mapState(useCounterStore, ['counter'])
    // mesmo que o de acima exceto a regista como `this.myOwnName`
    ...mapState(useCounterStore, {
      myOwnName: 'counter',
      // também podes escrever uma função que recebe a acesso à memória
      double: store => store.counter * 2,
      // ela pode ter acesso ao `this` mas não seria tipada corretamente...
      magicValue(store) {
        return store.someGetter + this.counter + this.double
      },
    }),
  },
}
```

#### Estado Modificável

Se quiseres ser capaz de escrever nestas propriedades de estado (por exemplo, se tiveres um formulário), podes usar a `mapWritableState()`. Nota que não podes passar uma função como a `mapState()`:

```js
import { mapWritableState } from 'pinia'
import { useCounterStore } from '../stores/counterStore'

export default {
  computed: {
    // dá acesso ao `this.counter` dentro do componente e permite defini-lo 
    // `this.counter+++`
    // o mesmo que ler a partir de `store.counter`
    ...mapWritableState(useCounterStore, ['counter'])
    // o mesmo que o de acima exceto que a regista como `this.myOwnName`
    ...mapWritableState(useCounterStore, {
      myOwnName: 'counter',
    }),
  },
}
```

:::tip
Tu não precisas de `mapWritableState()` para coleções tipo arranjos (arrays, em Inglês) a menos que estejas substituindo o arranjo inteiro com `cartItems = []`, `mapState()` continua a permitir-te chamar os métodos nas suas coleções.
:::

## Alterando o estado

<!-- TODO: disable this with `strictMode` -->

Para além de alterar diretamente a memória com `store.counter++`, também podes chamar o método `$path`. Isto permite-te aplicar várias mudanças ao mesmo tempo com um objeto parcial `state`:

```js
store.$patch({
  counter: store.counter + 1,
  age: 120,
  name: 'DIO',
})
```

No entanto, algumas mutações são muito difíceis ou dispendiosas de aplicar com esta sintaxe: qualquer modificação da coleção (por exemplo, empurrar, remover, unir um elemento de um arranjo) requer que cries uma nova coleção. Por causa disto, o método `$patch` também aceita uma função para agrupar este tipo de mutações que são difíceis de aplicar com um objeto de remendo (patch, em Inglês):

```js
cartStore.$patch((state) => {
  state.items.push({ name: 'shoes', quantity: 1 })
  state.hasChanged = true
})
```

<!-- TODO: disable this with `strictMode`, `{ noDirectPatch: true }` -->

The main difference here is that `$patch()` allows you to group multiple changes into one single entry in the devtools. Note **both, direct changes to `state` and `$patch()` appear in the devtools** and can be time traveled (not yet in Vue 3).
A principal diferença aqui é que `$path()` permite-te agrupar várias mudanças dentro de uma única entrada na ferramenta do programador. Nota que **ambas, mudanças diretas no `state` e `$path()` aparecem na ferramenta do programador** e podem ser viajadas no no tempo (ainda não na Vue 3).

## Substituindo o `estado`

Tu **não podes substituir exatamente** o estado de uma memória visto que isto quebraria a reatividade. Tu podes no entanto _remendá-lo_:

```js
// isto na verdade não substitui o `$state`
store.$state = { counter: 24 }
// ele chama o `$patch()` internamente:
store.$patch({ counter: 24 })
```

Tu também podes **definir o estado inicial** da tua aplicação inteira ao mudar o `state` da instância de `pinia`. Isto é utilizado durante [Interpretação no Lado do Servidor (SSR, sigla em Inglês) para hidratação](../ssr/#state-hydration).

```js
pinia.state.value = {}
```

## Subscrevendo ao estado

Tu podes observar o estado e suas mudanças através do método `$subscribe()` de uma memória, similar ao [método `subscribe`](https://vuex.vuejs.org/api/#subscribe) da Vuex. A vantagem da utilização de `$subscribe()` sobre uma `watch()` regular é que as _subscrições_ acionarão apenas uma vez depois dos _remendos_ (por exemplo, quando estiver utilizando a versão da função de cima).

```js
cartStore.$subscribe((mutation, state) => {
  // import { MutationType } from 'pinia'
  mutation.type // 'direct' | 'patch object' | 'patch function'
  // o mesmo que `cartStore.$id`
  mutation.storeId // 'cart'
  // disponível apenas com `mutation.type` === 'patch object'
  mutation.payload // objeto de remendo passado para `cartStore.$patch()`

  // persiste o estado inteiro no armazenamento local sempre ele mudar
  localStorage.setItem('cart', JSON.stringify(state))
})
```

Por padrão, _subscrições de estado_ estão presas ao componente onde elas são adicionadas (se a memória estiver dentro de uma `setup()` de componente). Querendo dizer que, elas serão removidas automaticamente quando o componente for desmontado. Se quiseres preservá-las depois do componente ser desmontado, passe `{ detached: true }` como segundo argumento para _separar_ a _subscrição de estado_ do componente atual:

```js
export default {
  setup() {
    const someStore = useSomeStore()

    // esta subscrição será preservada depois do componente ser desmontado
    someStore.$subscribe(callback, { detached: true })

    // ...
  },
}
```

:::tip
Tu podes observar o estado inteiro na instância de `pinia`:

```js
watch(
  pinia.state,
  (state) => {
    // persiste o estado inteiro no armazenamento local sempre ele mudar
    localStorage.setItem('piniaState', JSON.stringify(state))
  },
  { deep: true }
)
```

:::
