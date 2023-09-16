# Definindo uma Memória (`store`) {#defining-a-store}

<VueSchoolLink
  href="https://vueschool.io/lessons/define-your-first-pinia-store"
  title="Aprenda a como definir e usar memórias na Pinia"
/>

Antes de mergulhar dentro dos conceitos fundamentais, nós precisamos saber que uma memória é definida com a utilização de `defineStore()` e que ela requer um nome **único**, passado como primeiro argumento:

```js
import { defineStore } from 'pinia'

// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const useAlertsStore = defineStore('alerts', {
  // other options...
})
```

Este _nome_, também referenciado como _id_, é necessário e é usado pela Pinia para conectar a memória à ferramenta do programador (devtools, em Inglês). A nomenclatura que a função retornada _utiliza..._ é uma convenção entre os constituíveis para tornar a sua utilização idiomática.

A `defineStore()` aceita dois valores distintos para o seu segundo argumento: uma função de Configuração ou um objeto de Opções.

## Memórias baseadas em Opções {#option-stores}

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

## Memórias baseadas em Composições {#setup-stores}

Há também uma outra sintaxe possível para definir as memórias. Semelhante a [função `setup`](https://pt.vuejs.org/api/composition-api-setup) da API de Composição da Vue, nós podemos passar uma função que define propriedades reativas e métodos, e que retorna uma objeto com as propriedades e métodos que nós queremos expor.

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

As memórias baseadas composições trazem muito mais flexibilidade do que [Memórias baseadas em Opções](#option-stores) visto que podes criar observadores dentro de uma memória e utilizar livremente qualquer [constituível](https://pt.vuejs.org/guide/reusability/composables#composables). No entanto, lembra-te de que a utilização de constituíveis tornará [Interpretação no Lado do Servidor](../cookbook/composables) complexa.

As memórias criadas com a composição também são capazes de depender das propriedades _fornecidas_ globalmente como o roteador ou a rota. Qualquer propriedade [fornecida no nível da aplicação](https://pt.vuejs.org/api/application#app-provide) pode ser acessada a partir da memória usando `inject()`, tal como nos componentes:

```ts
import { inject } from 'vue'
import { useRoute } from 'vue-router'

export const useSearchFilters = defineStore('search-filters', () => {
  const route = useRoute()
  // this assumes `app.provide('appProvided', 'value')` was called
  const appProvided = inject('appProvided')

  // ...

  return {
    // ...
  }
})
```

:::warning AVISO
Não retorne propriedades como `useRoute()` ou `appProvided` (do exemplo acima) uma vez que não pertencem à própria memória e podes acessá-los diretamente dentro dos componentes com a `useRoute()` e `inject('appProvided')`.
:::

## Qual sintaxe eu deveria escolher? {#what-syntax-should-i-pick}

De acordo com o artigo que fala sobre a escolha entre a [API de Composição e API de Opções da Vue](https://pt.vuejs.org/guide/introduction#which-to-choose), escolha aquela com a qual estás mais confortável. Se não estiveres certo de qual, experimente primeiro a [Memórias baseadas em Opções](#option-stores).

## Utilizando a memória {#using-the-store}

Nós estamos a _definir_ uma memória porque a memória não será criada até que a `use...Store()` for chamada dentro do componente `<script setup>` (ou dentro de `setup()` **tal como todas as funções de composição**):

```vue
<script setup>
import { useCounterStore } from '@/stores/counter'

// acessar a variável `store` em qualquer parte no componente ✨
const store = useCounterStore()
</script>
```

:::tip DICA
Se ainda não estivermos a usar os componentes `setup`, [podemos continuar a usar a Pinia com os _auxiliares de mapa_](../cookbook/options-api).
:::

Tu podes definir quantas memórias que quiseres e **deves definir cada memória em um ficheiro diferente** para obter o melhor da pinia (tal como permitir a separação de código e fazer inferência de TypeScript do teu pacote automaticamente).

Uma vez que a memória é instanciada, podes acessar diretamente qualquer propriedade `state`, `getters`, e `actions` definida na memória. Nós veremos estes em detalhe nas próximas páginas mas a conclusão automática ajudar-te-á.

Nota que a `store` é um objeto envolvido com a `reactive`, querendo dizer que não é preciso escrever `.value` depois dos recuperadores (getters, em Inglês) mas, tal como as `props` em `setup`, **nós não podemos desestruturá-las**:

```vue
<script setup>
const store = useCounterStore()
// ❌ This won't work because it breaks reactivity
// it's the same as destructuring from `props`
const { name, doubleCount } = store // [!code warning]
name // will always be "Eduardo" // [!code warning]
doubleCount // will always be 0 // [!code warning]

setTimeout(() => {
  store.increment()
}, 1000)

// ✅ this one will be reactive
// 💡 but you could also just use `store.doubleCount` directly
const doubleValue = computed(() => store.doubleCount)
</script>
```

## Desestruturando a partir duma Memória {#destructuring-from-a-store}

Para extrair propriedades da memória enquanto preserva-se a sua reatividade, precisas utilizar a `storeToRefs()`. Ela criará referências para todas as propriedades reativas. Isto é útil para quando estiveres apenas utilizando o estado da memória mas não chamando nenhuma ação. Nota que podes desestruturar as ações diretamente da memória visto que elas também estão presas a própria memória:

```vue
<script setup>
import { storeToRefs } from 'pinia'

const store = useCounterStore()
// `name` and `doubleCount` are reactive refs
// This will also extract refs for properties added by plugins
// but skip any action or non reactive (non ref/reactive) property
const { name, doubleCount } = storeToRefs(store)
// the increment action can just be destructured
const { increment } = store
</script>
```
