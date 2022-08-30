# Definindo uma Memória (`store`)

Antes de mergulhar dentro dos conceitos fundamentais, nós precisamos saber que uma memória é definida com a utilização de `defineStore()` e que ela requer um nome **único**, passado como primeiro argumento:

```js
import { defineStore } from 'pinia'
// Tu podes nomear o valor de retorno de `defineStore()` para que quiseres, mas é melhor utilizar o nome da memória e envolvê-la com `use` e `Store` (por exemplo, `useUserStore`, `useCartStore`, `useProductStore`)
// `useStore`, poderia ser qualquer coisa tipo, `userUser`, `useCart` (remover)
// o primeiro argumento é um identificador (id) único da memória em toda a tua aplicação
export const useStore = defineStore('main', {
  // outras opções...
})
```

Este _nome_, também referenciado como _id_, é necessário e é usado pela Pinia para conectar a memória à ferramenta do programador (devtools, em Inglês). A nomenclatura que a função retornada _utiliza..._ é uma convenção entre os constituíveis (composables, termo em Inglês) para tornar a sua utilização idiomática.

A `defineStore()` aceita dois valores distintos para o seu segundo argumento: uma função de Configuração ou um objeto de Opções.

## Memórias baseadas em Opções

Semelhante a API de Opções da Vue, nós também podemos passar um Objeto de Opções com as propriedades `state`, `actions` e `getters`.

```js {2-10}
export const useCounterStore = defineStore('counter', {
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
```

Tu podes pensar de `state` (estado) como o `data` (dados) da memória, e `getters` (recuperadores) como as propriedades `computed` (computadas) da memória, e `actions` (ações) como os `methods` (métodos).

As memórias baseadas em opções devem ser intuitivas e simples de serem iniciadas.

## Memórias baseadas em Composições

Há também uma outra sintaxe possível para definir as memórias. Semelhante a [função `setup`](https://vuejs.org/api/composition-api-setup.html) da API de Composição da Vue, nós podemos passar uma função que define propriedades reativas e métodos, e que retorna uma objeto com as propriedades e métodos que nós queremos expor.

```js
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const name = ref('Eduardo')
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }
  return { count, name, doubleCount, increment }
})
```

Nas _Memórias baseadas em Composições_:

- As `ref()` tornam-se propriedades `state`
- As `computed()` tornam-se `getters`
- As `function()` tornam-se `actions`

As memórias baseadas composições trazem muito mais flexibilidade do que [Memórias baseadas em Opções](#memórias-baseadas-em-opções) visto que podes criar observadores dentro de uma memória e utilizar livremente qualquer [constituível (composable, termo em Inglês)](https://vuejs.org/guide/reusability/composables.html#composables). No entanto, lembra-te de que a utilização de constituíveis tornará [Interpretação no Lado do Servidor (SSR, sigla em Inglês)](../cookbook/composables.md) complexa.

## Qual sintaxe eu deveria escolher?

As with [Vue's Composition API and Option API](https://vuejs.org/guide/introduction.html#which-to-choose), pick the one that you feel the most comfortable with. If you're not sure, try the [Option Stores](#option-stores) first.
De acordo com o artigo que fala sobre a escolha entre a [API de Composição e API de Opções da Vue](https://vuejs.org/guide/introduction.html#which-to-choose), escolha aquela com a qual estás mais confortável. Se não estiveres certo de qual, experimente primeiro a [Memórias baseadas em Opções](#memórias-baseadas-em-opções).

## Utilizando a memória

Nós estamos _definindo_ uma memória porque a memória não será criada até que a `useStore()` seja chamada dentro de `setup()`:

```js
import { useCounterStore } from '@/stores/counter'

export default {
  setup() {
    const store = useCounterStore()

    return {
      // tu podes retornar uma instância da memória inteira para utilizá-la no modelo de marcação (template, em Inglês).
      store,
    }
  },
}
```

:::tip
Se ainda não estiveres a utilizar os componentes `setup`, [podes continuar a utilizar a Pinia com os _mapas auxiliares_](../cookbook/options-api.md).
:::

You can define as many stores as you want and **you should define each store in a different file** to get the most out of pinia (like automatically allow your bundle to code split and TypeScript inference).
Tu podes definir quantas memórias que quiseres e **deves definir cada memória em um ficheiro diferente** para obter o melhor da pinia (tal como permitir a separação de código e fazer inferência de TypeScript do teu pacote automaticamente).

Uma vez que a memória é instanciada, podes acessar diretamente qualquer propriedade `state`, `getters`, e `actions` definida na memória. Nós veremos estes em detalhe nas próximas páginas mas a conclusão automática ajudar-te-á.

Nota que a `store` é um objeto envolvido com a `reactive`, querendo dizer que não é preciso escrever `.value` depois dos recuperadores (getters, em Inglês) mas, tal como as `props` em `setup`, **nós não podemos desestruturá-las**:

```js
export default defineComponent({
  setup() {
    const store = useStore()
    // ❌ Isto não funcionará porque quebra a reatividade
    // é o mesmo que desestruturar a partir de `props`
    const { name, doubleCount } = store

    name // "eduardo"
    doubleCount // 2

    return {
      // sempre será "eduardo"
      name,
      // sempre será 2
      doubleCount,
      // ✅ este aqui será reativo
      doubleValue: computed(() => store.doubleCount),
    }
  },
})
```

No sentido de extrair propriedades da memória enquanto preserva-se sua reatividade, precisas utilizar a `storeToRefs()`. Ela criará referências para todas as propriedades reativas. Isto é útil para quando estiveres apenas utilizando o estado da memória mas não chamando nenhuma ação. Nota que podes desestruturar as ações diretamente da memória visto que elas também estão presas a própria memória:

```js
import { storeToRefs } from 'pinia'

export default defineComponent({
  setup() {
    const store = useCounterStore()
    // `name` e `doubleCount` são referências reativas
    // Isto também criará referências para as propriedades adicionas pelas extensões
    // mas ignorará qualquer ação ou propriedade não reativa e ou referenciada
    const { name, doubleCount } = storeToRefs(store)
    // a ação de incrementar `increment` já pode ser extraída
    const { increment } = store

    return {
      name,
      doubleCount,
      increment,
    }
  },
})
```
