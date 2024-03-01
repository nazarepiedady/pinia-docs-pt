# Compondo Memórias %{#Composing-Stores}%

A composição de memórias consiste em ter memórias que se utilizam umas às outras, e isto é suportado na Pinia. Existe uma regra a seguir:

Se **duas ou mais memórias se utilizarem mutuamente**, não podem criar um ciclo infinito através de _recuperadores (`getters`)_ ou _ações (`actions`)_. Não podem **ambas** ler diretamente o estado uma da outra na sua função de configuração:

```js
const useX = defineStore('x', () => {
  const y = useY()

  // ❌ Isto não é possível porque
  // `y` também tenta ler `x.name`
  y.name

  function doSomething() {
    // ✅ Ler propriedades de `y` em
    // computadas (`computed`) ou ações (`actions`)
    const yName = y.name
    // ...
  }

  return {
    name: ref('I am X'),
  }
})

const useY = defineStore('y', () => {
  const x = useX()

  // ❌ Isto não é possível porque
  // `x` também tenta ler `y.name`
  x.name

  function doSomething() {
    // ✅ Ler propriedades de `x` em
    // computadas (`computed`) ou ações (`actions`)
    const xName = x.name
    // ...
  }

  return {
    name: ref('I am Y'),
  }
})
```

## Memórias Encaixadas %{#Nested-Stores}%

Nota que se uma memória utiliza outra memória, podemos importar e chamar diretamente a função `useStore()` dentro das _ações (`actions`)_ e _recuperadores (`getters`)_. Depois, podemos interagir com a memória tal como a faríamos num componente de Vue. Consultar os [Recuperadores Partilhados](#Shared-Getters) e as [Ações Partilhadas](#Shared-Actions).

Quando se trata de _memórias de configuração_, podemos simplesmente usar uma das memórias **no topo** da função da memória:

```ts
import { useUserStore } from './user'

export const useCartStore = defineStore('cart', () => {
  const user = useUserStore()
  const list = ref([])

  const summary = computed(() => {
    return `Hi ${user.name}, you have ${list.value.length} items in your cart. It costs ${price.value}.`
  })

  function purchase() {
    return apiPurchase(user.id, this.list)
  }

  return { summary, purchase }
})
```

## Recuperadores Partilhados %{#Shared-Getters}%

Nós podemos simplesmente chamar `useOtherStore()` dentro duma _recuperadora_:

```js
import { defineStore } from 'pinia'
import { useUserStore } from './user'

export const useCartStore = defineStore('cart', {
  getters: {
    summary(state) {
      const user = useUserStore()

      return `Hi ${user.name}, you have ${state.list.length} items in your cart. It costs ${state.price}.`
    },
  },
})
```

## Ações Partilhadas %{#Shared-Actions}%

O mesmo se aplica às _ações_:

```js
import { defineStore } from 'pinia'
import { useUserStore } from './user'

export const useCartStore = defineStore('cart', {
  actions: {
    async orderCart() {
      const user = useUserStore()

      try {
        await apiOrderCart(user.token, this.items)
        // outra ação
        this.emptyCart()
      } catch (err) {
        displayError(err)
      }
    },
  },
})
```

Uma vez que as ações podem ser assíncronas, temos de nos certificar que **todas as nossas chamadas de `useStore()`** aparecem antes de qualquer `await`. Caso contrário, isto poderia levar à utilização da instância errada de pinia _nas aplicações da interpretação do lado do servidor_:

```js{7-8,11-13}
import { defineStore } from 'pinia'
import { useUserStore } from './user'

export const useCartStore = defineStore('cart', {
  actions: {
    async orderCart() {
      // ✅ chamar no topo da ação antes de qualquer `await`
      const user = useUserStore()

      try {
        await apiOrderCart(user.token, this.items)
        // ❌ chamada após uma instrução `await`
        const otherStore = useOtherStore()
        // outra ação
        this.emptyCart()
      } catch (err) {
        displayError(err)
      }
    },
  },
})
```