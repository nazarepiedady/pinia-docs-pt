# Substituição de Módulo Instantânea %{#HMR-Hot-Module-Replacement-}%

A Pinia suporta a substituição de módulo instantânea para podermos editar as nossas memórias e interagir com estas diretamente na nossa aplicação sem recarregar a página, permitindo-nos manter o estado existente, adicionar, ou mesmo remover estado, ações e recuperadores.

No momento, apenas a [Vite](https://pt.vitejs.dev/guide/api-hmr#hmr-api) é oficialmente suportada, mas qualquer empacotador que implemente a especificação `import.meta.hot` deve funcionar (por exemplo, a [webpack](https://webpack.js.org/api/module-variables/#importmetawebpackhot) parece usar `import.meta.webpackHot` ao invés de `import.meta.hot`). Nós precisamos de adicionar este trecho de código junto a qualquer declaração da memória. Digamos que temos três memórias: `auth.js`, `cart.js`, `chat.js`, teremos que adicionar (e adaptar) isto após a criação da _definição da memória_:

```js
// auth.js
import { defineStore, acceptHMRUpdate } from 'pinia'

export const useAuth = defineStore('auth', {
  // opções...
})

// certifique-se de passar a definição correta da memória,
// neste caso `useAuth`.
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuth, import.meta.hot))
}
```
