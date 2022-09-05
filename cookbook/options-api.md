# Utilização sem a `setup()`

A pinia pode ser utilizada mesmo que não estejas utilizando a API de composição (se estiveres utilizando a Vue 2, mas ainda precisas instalar a extensão `@vue/composition-api`). Embora recomendamos-te dar uma chance a API de Composição e aprende-la, pode ainda não ser o teu momento e da tua equipa, podes estar em processo de migração de uma aplicação, ou qualquer outra razão. Existem algumas funções:

- [mapStores](#dando-acesso-à-memória-inteira)
- [mapState](../core-concepts/state.md#utilização-com-a-api-de-opções)
- [mapWritableState](../core-concepts/state.md#estado-modificável)
- ⚠️ [mapGetters](../core-concepts/getters.md#sem-a-setup) (apenas por conveniência de migração, utilize de preferência a `mapState()`)
- [mapActions](../core-concepts/actions.md#sem-a-setup)

## Dando acesso à memória inteira

Se precisares acessar tudo da memória, pode ser demasiado ter que delinear cada propriedade da memória... No lugar disto podes ter acesso à memória inteira com `mapStores()`:

```js
import { mapStores } from 'pinia'

// dada duas memórias com os seguintes ids
const useUserStore = defineStore('user', {
  // ...
})
const useCartStore = defineStore('cart', {
  // ...
})

export default {
  computed: {
    // repare que não estamos passando um arranjo,
    // apenas uma memória depois de outra
    // cada memória estará acessível como sua `id + 'Store'`
    ...mapStores(useCartStore, useUserStore)
  },

  methods: {
    async buyStuff() {
      // utilize-os em qualquer lugar!
      if (this.userStore.isAuthenticated()) {
        await this.cartStore.buy()
        this.$router.push('/purchased')
      }
    },
  },
}
```

Por padrão, a Pinia adicionará o sufixo `"Store"` ao `id` de cada memória. Tu podes personalizar este comportamento chamando o `setMapStoreSuffix()`:

```js
import { createPinia, setMapStoreSuffix } from 'pinia'

// remova completamente o sufixo: `this.user`, `this.cart`
setMapStoreSuffix('')
// `this.user_store`, `this.cart_store` (está bem, eu não o julgo)
setMapStoreSuffix('_store')
export const pinia = createPinia()
```

## TypeScript

Por padrão, todos auxiliares de delinear (mapa, em outras palavras) suportam a conclusão automática e tu não precisas fazer nada. Se chamares `setMapStoreSuffix()` para mudar o sufixo `"Store"`, precisarás também adicioná-lo em algum lugar em um ficheiro TypeScript ou no teu ficheiro `global.d.ts`. O lugar mais conveniente seria o mesmo lugar onde tu chamas `setMapStoreSuffix()`:

```ts
import { createPinia, setMapStoreSuffix } from 'pinia'

setMapStoreSuffix('') // remova completamente o sufixo
export const pinia = createPinia()

declare module 'pinia' {
  export interface MapStoresCustomization {
    // define-a para o mesmo valor que o de cima
    suffix: ''
  }
}
```

:::warning
Se estiveres utilizando um ficheiro de declaração de TypeScript (tipo `global.d.ts`), certifique-te de `importar 'pinia'` no inicio dele para expor todos tipos existentes.
:::
