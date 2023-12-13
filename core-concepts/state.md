# Estado (`state`) %{#State}%

<VueSchoolLink
  href="https://vueschool.io/lessons/access-state-from-a-pinia-store"
  title="Aprenda tudo sobre o estado na Pinia"
/>

O estado é, na maioria das vezes, a parte central da nossa memória. As pessoas frequentemente começam definindo o estado que representa a sua aplicação. Na Pinia o estado é definido como uma função que retorna o estado inicial. Isto permite a Pinia funcionar tanto no lado do servidor quanto no lado do cliente:

```js
import { defineStore } from 'pinia'

export const useStore = defineStore('storeId', {
  // função de flecha recomendada para
  // completa inferência de tipo
  state: () => {
    return {
      // todas estas propriedades terão
      // seus tipos inferidos automaticamente
      count: 0,
      name: 'Eduardo',
      isAdmin: true,
      items: [],
      hasChanged: true,
    }
  },
})
```

:::tip DICA
Se estivermos usando a Vue 2, os dados que criamos na `state` seguem as mesmas regras aplicadas à `data` numa instância de Vue, isto é, o objeto de estado deve ser simples e precisamos chamar `Vue.set()` quando **adicionamos novas** propriedades à este. **Consultar também: [Vue#data](https://v2.vuejs.org/v2/api/#data)**.
:::

## TypeScript %{#TypeScript}%

Nós precisamos fazer muito no sentido de tornar o nosso estado compatível com a TypeScript: temos que nos certificar de que a [`strict`](https://www.typescriptlang.org/tsconfig#strict), ou no mínimo, a [`noImplicitThis`](https://www.typescriptlang.org/tsconfig#noImplicitThis), estão ativadas e a Pinia inferirá o tipo do nosso estado automaticamente! No entanto, existem alguns casos onde deveríamos dar-lhe uma mãozinha com alguma moldagem:

```ts
export const useUserStore = defineStore('storeId', {
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

Se preferirmos, podemos definir o estado com uma interface e tipificar o valor do retorno da `state()`:

```ts
interface State {
  userList: UserInfo[]
  user: UserInfo | null
}

export const useUserStore = defineStore('user', {
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

## Acessando o `state` %{#Accessing-the-state}%

Por padrão, podemos ler e escrever diretamente ao estado acessando-o através da instância de `store`:

```js
const store = useStore()

store.counter++
```

Nota que não podemos adicionar um nova propriedade de estado **se não a definimos na `state()`**, esta deve conter o estado inicial, por exemplo: não podemos fazer `store.secondCount = 2` se `secondCount` não estiver definida na `state()`.

## Redefinindo o Estado %{#Resetting-the-state}%

Nas [Memórias de Opções](/core-concepts/index#option-stores), podemos _reiniciar_ o estado ao seu valor inicial chamando o método `$reset()` na `store`:

```js
const store = useStore()

store.$reset()
```

Internamente, este chama a função `state()` para criar um novo objeto de estado e substitui o estado atual por ele.

Nas [Memórias de Composições](/core-concepts/index#setup-stores), precisamos criar o nosso próprio método `$reset()`:

```ts
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)

  function $reset() {
    count.value = 0
  }

  return { count, $reset }
})
```

### Uso com a API de Opções %{#Usage-with-the-Options-API}%

<VueSchoolLink
  href="https://vueschool.io/lessons/access-pinia-state-in-the-options-api"
  title="Acessar o Estado da Pinia através da API de Opções"
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
})
```

Se não estivermos usando a API de Composição, e estivermos usando `computed`, `methods`, ..., podemos usar a auxiliar `mapState()` para mapear as propriedades do estado como propriedades computadas de apenas leitura:

```js
import { mapState } from 'pinia'
import { useCounterStore } from '../stores/counter'

export default {
  computed: {
    // dá acesso ao `this.count` dentro do componente
    // mesmo que ler de `store.count`
    ...mapState(useCounterStore, ['count'])
    // mesmo que o de acima exceto que
    // a regista como `this.myOwnName`
    ...mapState(useCounterStore, {
      myOwnName: 'count',
      // também podemos escrever uma função
      // que recebe a acesso à memória
      double: store => store.count * 2,
      // pode ter acesso ao `this` mas
      // não será tipificada corretamente...
      magicValue(store) {
        return store.someGetter + this.count + this.double
      },
    }),
  },
}
```

#### Estado Modificável %{#Modifiable-state}%

Se quisermos ser capazes de escrever às estas propriedades de estado (por exemplo, se tivermos um formulário). podemos usar a `mapWritableState()`. Nota que não podemos passar uma função da mesma maneira que a `mapState()`:

```js
import { mapWritableState } from 'pinia'
import { useCounterStore } from '../stores/counter'

export default {
  computed: {
    // dá acesso ao `this.count` dentro do componente
    // e permite defini-lo `this.count+++`
    // o mesmo que ler de `store.count`
    ...mapWritableState(useCounterStore, ['count'])
    // o mesmo que o de cima exceto que
    // a regista como `this.myOwnName`
    ...mapWritableState(useCounterStore, {
      myOwnName: 'count',
    }),
  },
}
```

:::tip DICA
Nós não precisamos da `mapWritableState()` para coleções como vetores a menos que estejamos substituindo o vetor inteiro com `cartItems = []`, a `mapState()` ainda permite-nos chamar os métodos sobre as nossas coleções.
:::

## Alterando o Estado %{#Mutating-the-state}%

<!-- TODO: disable this with `strictMode` -->

Para além de alterarmos diretamente a memória com `store.count++`, também podemos chamar o método `$patch`. Este permite-nos aplicar várias mudanças ao mesmo tempo com um objeto `state` parcial: 

```js
store.$patch({
  count: store.count + 1,
  age: 120,
  name: 'DIO',
})
```

No entanto, algumas mutações são muito difíceis ou dispendiosas de aplicar-se com esta sintaxe: qualquer modificação da coleção (por exemplo, empurrar, remover, juntar um elemento dum vetor) exige que criemos uma nova coleção. Por causa disto, o método `$patch` também aceita uma função para agrupar este tipo de mutações que são difíceis de aplicar com um objeto de remendo:

```js
store.$patch((state) => {
  state.items.push({ name: 'shoes', quantity: 1 })
  state.hasChanged = true
})
```

<!-- TODO: disable this with `strictMode`, `{ noDirectPatch: true }` -->

A principal diferença aqui é que `$patch()` permite-nos agrupar várias mudanças dentro duma única entrada na ferramenta de programação do navegador. Nota que **ambas, mudanças diretas ao `state` e `patch` aparecem na ferramenta de programação do navegador** e podem ser viajadas no tempo (ainda não na Vue 3).

## Substituindo o `state` %{#Replacing-the-state}%

Nós **não podemos substituir exatamente** o estado duma memória porque isto quebraria a reatividade. No entanto, podemos _remendá-lo_:

```js
// esta de fato não substitui o `$state`
store.$state = { count: 24 }
// esta chama internamente o `$patch()`:
store.$patch({ count: 24 })
```

Nós também podemos **definir o estado inicial** da nossa aplicação inteira mudando a `state` da instância de `pinia`. Isto é usado durante a [Interpretação do Lado do Servidor para hidratação](../ssr/#state-hydration):

```js
pinia.state.value = {}
```

## Subscrevendo o Estado %{#Subscribing-to-the-state}%

Nós podemos observar o estado e suas mudanças através do método `$subscribe()` duma memória, semelhante ao [método `subscribe`](https://vuex.vuejs.org/api/#subscribe) da Vuex. A vantagem de usar `$subscribe()` em vez da `watch()` normal é que as _subscrições_ acionarão apenas uma vez após os _remendos_ (por exemplo, quando usamos a versão de função acima):

```js
cartStore.$subscribe((mutation, state) => {
  // import { MutationType } from 'pinia'
  mutation.type // 'direct' | 'patch object' | 'patch function'
  // o mesmo que `cartStore.$id`
  mutation.storeId // 'cart'
  // disponível apenas com `mutation.type` === 'patch object'
  mutation.payload // objeto de remendo passado para `cartStore.$patch()`

  // persistir o estado inteiro no armazenamento local sempre que mudar
  localStorage.setItem('cart', JSON.stringify(state))
})
```

Por padrão, as _subscrições de estado_ estão vinculadas ao componente onde são adicionadas (se a memória estiver dentro duma `setup()` do componente). Querendo dizer que, serão removidas automaticamente quando o componente for desmontado. Se também quisermos preservá-las depois do componente ser desmontado, passamos `{ detached: true }` como segundo argumento para _separar_ a _subscrição de estado_ do componente atual:

```vue
<script setup>
const someStore = useSomeStore()

// esta subscrição será preservada
// mesmo depois do componente ser desmontado
someStore.$subscribe(callback, { detached: true })
</script>
```

:::tip DICA
Nós podemos _observar_ o estado inteiro sobre a instância de `pinia` com uma única `watch()`:

```js
watch(
  pinia.state,
  (state) => {
    // persistir todo o estado no armazenamento local
    // sempre que for alterado
    localStorage.setItem('piniaState', JSON.stringify(state))
  },
  { deep: true }
)
```

:::
