# Compondo Memórias

A composição de memórias tem haver com memórias que se utilizam umas as outras, e isto é suportado na Pinia. Há uma regra à seguir:

Se **duas ou mais memórias se utilizarem uma à outra**, elas não podem criar um desvio infinito por meio dos _recuperadores (`getters`)_ ou _ações (`actions`)_. Elas não podem **ambas** diretamente ler o estado de uma da outra em suas funções de configuração:

```js
const useX = defineStore('x', () => {
  const y = useY()

  // ❌ Isto não é possível porque `y` também tenta ler `x.name`
  y.name

  function doSomething() {
    // ✅ Leia as propriedades de `y` em computadas (`computed`) ou ações (`actions`)
    const yName = y.name
    // ...
  }

  return {
    name: ref('I am X'),
  }
})

const useY = defineStore('y', () => {
  const x = useX()

  // ❌ Isto não é possível porque `x` também tenta ler `y.name`
  x.name

  function doSomething() {
    // ✅ Leia as propriedades de `x` em computadas (`computed`) ou ações (`actions`)
    const xName = x.name
    // ...
  }

  return {
    name: ref('I am Y'),
  }
})
```

## Memórias Encaixadas

Nota que se uma memória utilizar uma outra memória, podes importar e chamar a função `useStore()` diretamente de dentro das _ações_ e _recuperadores_. A seguir podes interagir com a memória tal como farias de dentro de um componente de Vue. Consulte [Recuperadores Partilhados](#recuperadores-partilhados) e [Ações Partilhadas](#ações-partilhadas).

Quando isto vem para _memórias baseadas em composição_, podes simplesmente utilizar uma das memórias **no inicio** da função de memória: 

```ts
import { useUserStore } from './user'

export const useCartStore = defineStore('cart', () => {
  const user = useUserStore()

  const summary = computed(() => {
    return `Hi ${user.name}, you have ${state.list.length} items in your cart. It costs ${state.price}.`
  })

  function purchase() {
    return apiPurchase(user.id, this.list)
  }

  return { summary, purchase }
})
```

## Recuperadores Partilhados

Tu podes chamar simplesmente `useOtherStore()` dentro de um _recuperador_:

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

## Ações Partilhadas

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
        // um outra ação
        this.emptyCart()
      } catch (err) {
        displayError(err)
      }
    },
  },
})
```

