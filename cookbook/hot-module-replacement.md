# Substituição de Módulo Instantânea (HMR, sigla em Inglês)

A Pinia suporta a Substituição de Módulo Instantânea (HMR, sigla em Inglês) assim podes editar as tuas memórias e interagir diretamente com elas na tua aplicação sem o recarregamento da página, permitindo-te preservar o estado existente, adicionar, ou até mesmo remover o estado (`state`), as ações (`actions`), e os recuperadores (`getters`).

No momento, apenas a [Vite](https://vitejs.dev/) é oficialmente suportada mas qualquer empacotador implementando a especificação `import.meta.hot` deve funcionar (por exemplo, [Webpack](https://webpack.js.org/api/module-variables/#importmetawebpackhot) parece utilizar `import.meta.webpackHot` no lugar de `import.meta.hot`).
Tu precisas adicionar este trecho de código ao lado de qualquer declaração de memória. Vamos dizer que tens três memórias: `auth.js`, `cart.js`, e `chat.js`, tu terás de adicionar (e adaptar) isto depois da criação da _definição de memória_:

```js
// auth.js
import { defineStore, acceptHMRUpdate } from 'pinia'

const useAuth = defineStore('auth', {
  // opções...
})

// certifique-se de passar a definição de memória correta, neste caso `useAuth`
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuth, import.meta.hot))
}
```
