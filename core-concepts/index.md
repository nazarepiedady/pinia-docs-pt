# Definindo uma Memória %{#defining-a-store}%

<VueSchoolLink
  href="https://vueschool.io/lessons/define-your-first-pinia-store"
  title="Aprenda a como definir e usar memórias na Pinia"
/>

Antes de mergulharmos para dentro dos conceitos principais, precisamos saber que uma memória é definida usando a função `defineStore()` e esta exige um nome **único**, passado como primeiro argumento:

```js
import { defineStore } from 'pinia'

// Podemos nomear o valor de retorno da `defineStore()` como quisermos,
// mas é melhor usar o nome da memória e envolvê-lo com `use`
// e `Store` (exemplo, `useUserStore`, `useCartStore`, `useProductStore`)
// o primeiro argumento é um identificador único da memória
// por toda a nossa aplicação
export const useAlertsStore = defineStore('alerts', {
  // outras opções...
})
```

Este _nome_, também referenciado como identificador único _id_, é necessário e é usado pela Pinia para conectar a memória às ferramentas de programação. Nomear a função retornada como _`use...`_ é uma convenção através das funções de composição para tornar o seu uso idiomático.

A função `defineStore()` aceita dois valores distintos para o seu segundo argumento: uma função de Composição ou um objeto de Opções.

## Memórias de Opções %{#option-stores}%

Semelhante à API de Opções da Vue, também podemos passar um Objeto de Opções com as propriedades `state`, `actions` e `getters`:

```js {2-10}
export const useCounterStore = defineStore('counter', {
  state: () => ({ count: 0, name: 'Eduardo' }),
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++
    },
  },
})
```

Nós podemos considerar a `state` como a `data` da memória, e `getters` como as propriedades `computed` da memória, e as `actions` como as `methods`.

As memórias de Opção devem ser intuitivas e simples de começar a usar-se.

## Memórias de Composições %{#setup-stores}%

Também existe uma outra possível sintaxe para definir memórias. Semelhante à [função `setup`](https://pt.vuejs.org/api/composition-api-setup) da API de Composição da Vue, podemos passar uma função que define propriedades reativas e métodos e retorna um objeto com as propriedades e métodos que queremos expor:

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

Nas _Memórias de Composições_:

- As `ref()` tornam-se propriedades de `state`
- As `computed()` tornam-se `getters`
- As `function()` tornam-se `actions`

Nota que **devemos** retornar **todas as propriedades de estado** nas memórias de composição para pinia as recolher como estado. Em outras palavras, não podemos ter propriedades _privadas_ nas memórias.

As memórias de composições trazem muito mais flexibilidade do que as [Memórias de Opções](#option-stores) já que podemos criar observadores dentro duma memória e usar livremente qualquer [função de composição](https://pt.vuejs.org/guide/reusability/composables#composables). No entanto, temos que lembrar-nos de que o uso de funções de composição tornar-se-á mais complexo quando usamos a [interpretação do lado do servidor](../cookbook/composables).

As memórias de composições também são capazes de depender de propriedades _fornecidas_ globalmente como o `Router` (roteador) ou `Route` (rota). Qualquer propriedade [fornecida no nível da aplicação](https://pt.vuejs.org/api/application#app-provide) pode ser acessada a partir da memória usando `inject()`, tal como nos componentes:

```ts
import { inject } from 'vue'
import { useRoute } from 'vue-router'

export const useSearchFilters = defineStore('search-filters', () => {
  const route = useRoute()
  // isto assume que `app.provide('appProvided', 'value')`
  // foi chamada
  const appProvided = inject('appProvided')

  // ...

  return {
    // ...
  }
})
```

:::warning AVISO
Não retorne propriedades como `route` ou `appProvided` (do exemplo acima) já que não pertencem à própria memória e podemos acessá-los diretamente dentro dos componentes com `useRoute()` e `inject('appProvided')`.
:::

## Qual Sintaxe Escolher? %{#what-syntax-should-i-pick}%

De acordo com o artigo [API de Composição e API de Opções da Vue](https://pt.vuejs.org/guide/introduction#which-to-choose), devemos escolher aquela com a qual estamos mais confortáveis. Se estivermos inseguros, deveríamos experimentar as [Memórias de Opções](#option-stores) primeiro.

## Usando a Memória %{#using-the-store}%

Nós estamos a _definir_ uma memória porque a mesma não será criada até `use..Store()` for chamada dentro do componente `<script setup>` (ou dentro da `setup()` **tal como todas as funções de composição**):

```vue
<script setup>
import { useCounterStore } from '@/stores/counter'

// acessar a variável `store` em qualquer parte no componente ✨
const store = useCounterStore()
</script>
```

:::tip DICA
Se ainda não estivermos a usar os componentes `setup`, [podemos continuar a usar a Pinia com os _auxiliares de mapeamento_](../cookbook/options-api).
:::

Nós podemos definir quantas memórias que quisermos e **devemos definir cada memória num ficheiro diferente** para aproveitarmos ao máxima a pinia (tal como permitir que o nosso empacotador separe o código e forneça inferência de TypeScript automaticamente).

Assim que a memória estiver instanciada, podemos acessar diretamente qualquer propriedade definida na `state`, `getters`, e `actions` na memória. Nós veremos estas com detalhes nas próximas páginas mas conclusão automática de palavras ajudar-nos-á.

Nota que a `store` é um objeto embrulhado com a `reactive`, o que significa que não é preciso escrever `.value` depois dos recuperadores mas, tais como as `props` (propriedades) na `setup`, **não podemos desestruturá-la**:

```vue
<script setup>
const store = useCounterStore()
// ❌ isto não funcionará porque quebra a reatividade
// é o mesmo que desestruturar a partir de `props`
const { name, doubleCount } = store // [!code warning]
name // sempre será "Eduardo" // [!code warning]
doubleCount // sempre será 0 // [!code warning]

setTimeout(() => {
  store.increment()
}, 1000)

// ✅ este será reativo
// 💡 mas também poderíamos só usar `store.doubleCount`
// diretamente
const doubleValue = computed(() => store.doubleCount)
</script>
```

## Desestruturando uma Memória %{#destructuring-from-a-store}%

No sentido de extrair propriedades da memória enquanto preservamos a sua reatividade, precisamos usar a `storeToRefs()`. Esta criará referências para todas as propriedades reativas. Isto é útil quando estamos apenas a usar o estado da memória mas não estamos a chamar nenhuma ação. Nota que podemos desestruturar as ações diretamente da memória já que também estão vinculadas à própria memória:

```vue
<script setup>
import { storeToRefs } from 'pinia'

const store = useCounterStore()
// `name` e `doubleCount` são referências reativas
// isto também extrairá as referências para
// as propriedades adicionadas por extensões
// mas ignorará qualquer ação ou propriedade
// ou referência que não é reativa.
const { name, doubleCount } = storeToRefs(store)
// a ação `increment` pode ser desestruturada
const { increment } = store
</script>
```
