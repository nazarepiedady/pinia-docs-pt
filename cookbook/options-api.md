# Uso sem `setup` %{#Usage-without-setup-}%

A Pinia pode ser usada mesmo se não estivermos usando a API de composição (se estivermos usando a Vue <2.7, ainda precisamos instalar a extensão `@vue/composition-api`). Embora recomendemos que os programadores experimentem e aprendam a API de composição, pode não ser ainda a altura certa para alguns e para a sua equipa, alguns podem estar no processo de migração duma aplicação, ou qualquer outro motivo. Existem algumas funções:

- [`mapStores`](#Giving-access-to-the-whole-store)
- [`mapState`](../core-concepts/state#Usage-with-the-Options-API)
- [`mapWritableState`](../core-concepts/state#Modifiable-state)
- ⚠️ [`mapGetters`](../core-concepts/getters#Without-setup-) (apenas por conveniência de migração, recomendamos usar a `mapState()`)
- [`mapActions`](../core-concepts/actions#Without-setup-)

## Dar Acesso a Toda a Memória %{#Giving-access-to-the-whole-store}%

Se precisarmos de aceder a praticamente tudo a partir da memória, poderá ser demasiado complicado mapear todas as propriedades da memória... Em vez disso, podemos obter acesso a toda a memória com `mapStores()`:

```js
import { mapStores } from 'pinia'

// dadas duas memórias com os seguintes identificadores
const useUserStore = defineStore('user', {
  // ...
})
const useCartStore = defineStore('cart', {
  // ...
})

export default {
  computed: {
    // nota que não passamos um vetor, apenas uma memória após outra
    // cada memória será acessível como o seu identificador + 'Store'
    ...mapStores(useCartStore, useUserStore)
  },

  methods: {
    async buyStuff() {
      // usá-las em qualquer lugar!
      if (this.userStore.isAuthenticated()) {
        await this.cartStore.buy()
        this.$router.push('/purchased')
      }
    },
  },
}
```

Por padrão, a Pinia adicionará o sufixo `"Store"` ao `id` de cada memória. Podemos personalizar este comportamento chamando a função `setMapStoreSuffix()`:

```js
import { createPinia, setMapStoreSuffix } from 'pinia'

// remover completamente o sufixo: `this.user`, `this.cart`
setMapStoreSuffix('')
// `this.user_store`, `this.cart_store`
// (está tudo bem, não julgaremos ninguém)
setMapStoreSuffix('_store')
export const pinia = createPinia()
```

## TypeScript %{#TypeScript}%

Por padrão, todos os auxiliares de mapas suportam o conclusão automática da escrita de código e não precisamos de fazer nada. Se chamarmos `setMapStoreSuffix()` para alterar o sufixo `"Store"`, precisaremos também adicioná-lo em algum lugar num ficheiro de TypeScript ou no nosso ficheiro `global.d.ts`. O local mais conveniente seria o mesmo local onde chamamos `setMapStoreSuffix()`:

```ts
import { createPinia, setMapStoreSuffix } from 'pinia'

setMapStoreSuffix('') // remover completamente o sufixo
export const pinia = createPinia()

declare module 'pinia' {
  export interface MapStoresCustomization {
    // definir o mesmo valor que o anterior
    suffix: ''
  }
}
```

:::warning AVISO
Se estivermos a usar um ficheiro de declaração da TypeScript (como `global.d.ts`), temos de nos certificar de importarmos `'pinia'` no topo do ficheiro para expor todos os tipos existentes.
:::
