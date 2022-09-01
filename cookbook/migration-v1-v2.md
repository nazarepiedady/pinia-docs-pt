# Migrando de 0.x (v1) para v2

Desde a versão `2.0.0-rc.4`, a pinia suporta ambas versões Vue 2 e Vue 3! Isto significa que todas as novas atualizações serão aplicadas a esta versão 2 assim utilizadores de ambas Vue 2 e Vue 3 poderão beneficiar-se disto. Se estiveres a utilizando a Vue 3, isto não muda nada para ti visto que já estavas a utilizar a `rc` e podes consultar [o Relatório de Mudança](https://github.com/vuejs/pinia/blob/v2/packages/pinia/CHANGELOG.md) para teres uma explicação mais detalhada de tudo que mudou. De outro modo, **este guia é para ti**!

## Depreciações

Vamos olhar em todas as mudanças que precisas aplicar ao teu código. Primeiro, certifique-te de já estás executando a versão 0.x mais recente para veres algumas depreciações:

```shell
npm i 'pinia@^0.x.x'
# ou com o yarn
yarn add 'pinia@^0.x.x'
```

Se estiveres a utilizando a ESLint, considere a utilização [desta extensão](https://github.com/gund/eslint-plugin-deprecation) para encontrares todas utilizações depreciadas. De outro modo, deves ser capaz de vê-las visto que elas aparecem riscadas. Estas são as APIs que foram depreciadas e que foram removidas:

- `createStore()` torna-se `defineStore()`
- Em subscrições, `storeName` torna-se `storeId`
- `PiniaPlugin` foi renomeada `PiniaVuePlugin` (extensão de Pinia para Vue 2)
- `$subscribe()` não aceita mais um _booleano_ como segundo parâmetro, no lugar deste passe um objeto com `detached: true`.
- Extensões de Pinia não recebem mais a `id` da memória diretamente. No lugar desta utilize `store.$id`.

## Mudanças com Quebras de Compatibilidades

Depois de remover estes, podes atualizar para versão 2 com:

```shell
npm i 'pinia@^2.x.x'
# ou com o yarn
yarn add 'pinia@^2.x.x'
```

E comece a atualização do teu código.

### Memória de Tipo Genérico

Adicionada na [2.0.0-rc.0](https://github.com/vuejs/pinia/blob/v2/packages/pinia/CHANGELOG.md#200-rc0-2021-07-28)

Substitua qualquer utilização do tipo `GenericStore` com `StoreGeneric`. Este é o novo tipo de memória genérica que deve aceitar qualquer tipo de memória. Se estavas a escrever funções utilizando o tipo `Store` sem a passagem de seus genéricos (por exemplo, `Store<Id, State, Getters, Actions>`), também deves utilizar o `StoreGeneric` visto que o tipo `Store` sem os genéricos cria um tipo de memória vazia.

```diff
-function takeAnyStore(store: Store) {}
+function takeAnyStore(store: StoreGeneric) {}

-function takeAnyStore(store: GenericStore) {}
+function takeAnyStore(store: StoreGeneric) {}
```

## `DefineStoreOptions` para extensões

Se estavas a escrever extensões, utilizando TypeScript, e estendendo o tipo `DefineStoreOptions` para adicionar opções personalizadas, deves renomeá-lo para `DefineStoreOptionsBase`. Este tipo aplicará para ambas memórias baseadas em composições e as baseadas em opções.

```diff
 declare module 'pinia' {
-  export interface DefineStoreOptions<S, Store> {
+  export interface DefineStoreOptionsBase<S, Store> {
     debounce?: {
       [k in keyof StoreActions<Store>]?: number
     }
   }
 }
```

## `PiniaStorePlugin` foi renomeado

O tipo `PiniaStorePlugin` foi renomeado para `PiniaPlugin`.

```diff
-import { PiniaStorePlugin } from 'pinia'
+import { PiniaPlugin } from 'pinia'

-const piniaPlugin: PiniaStorePlugin = () => {
+const piniaPlugin: PiniaPlugin = () => {
   // ...
 }
```

**Nota que esta mudança só pode ser feita depois da atualização para a versão mais recente da Pinia sem depreciações**.

## Versão da `@vue/composition-api`

Visto que agora a pinia depende da `offsetScope()`, deves utilizar pelo menos a versão `1.1.0` da `@vue/composition-api`:

```shell
npm i @vue/composition-api@latest
# ou com o yarn
yarn add @vue/composition-api@latest
```

## Suporte da Webpack 4

Se estiveres a utilizar a webpack 4 (CLI de Vue utiliza a webpack 4), podes deparar-te com um erro como este:

```
ERROR  Failed to compile with 18 errors

 error  in ./node_modules/pinia/dist/pinia.mjs

Can't import the named export 'computed' from non EcmaScript module (only default export is available)
```

Isto é devido a modernização dos ficheiros de distribuição para suportarem módulos ESM nativos na Node.js. Agora os ficheiros estão utilizando a extensão `.mjs` e `.cjs` para permitir a Node beneficiar-se disto. Para corrigir este problema tens duas possibilidades:

- Se estiveres a utilizar versão 4.x da CLI de Vue, atualize as tuas dependências. Isto deve incluir a correção abaixo.
  - Se a atualização não for possível para ti, adicione isto ao teu `vue.config.js`:
    ```js
    // vue.config.js
    module.exports = {
      configureWebpack: {
        module: {
          rules: [
            {
              test: /\.mjs$/,
              include: /node_modules/,
              type: 'javascript/auto',
            },
          ],
        },
      },
    }
    ```
- Se estiveres lidando com a webpack manualmente, terás que deixá-la saber como lidar com ficheiros `.mjs`:
  ```js
  // webpack.config.js
  module.exports = {
    module: {
      rules: [
        {
          test: /\.mjs$/,
          include: /node_modules/,
          type: 'javascript/auto',
        },
      ],
    },
  }
  ```

## Ferramenta do Programador (devtools, em Inglês)

A versão 2 da Pinia não mais desvia a versão 5 da Ferramenta do Programador de Vue, ela requer a versão 6 Ferramenta do Programador de Vue. Encontre a ligação descarregar na [documentação da Vue Devtools](https://devtools.vuejs.org/guide/installation.html#chrome) para o **canal beta** da extensão.

## Nuxt

Se estiveres utilizando a Nuxt, agora a pinia tem o seu pacote dedicado a Nuxt 🎉. Instale-o com:

```shell
npm i @pinia/nuxt
# ou com o yarn
yarn add @pinia/nuxt
```

Certifique-se também de **atualizar o teu pacote `@nuxtjs/composition-api`**.

Depois adapte o teu `nuxt.config.js` e o teu `tsconfig.json` se estiveres utilizando TypeScript:

```diff
 // nuxt.config.js
 module.exports {
   buildModules: [
     '@nuxtjs/composition-api/module',
-    'pinia/nuxt',
+    '@pinia/nuxt',
   ],
 }
```

```diff
 // tsconfig.json
 {
   "types": [
     // ...
-    "pinia/nuxt/types"
+    "@pinia/nuxt"
   ]
 }
```

Também é recomendado uma leitura [da secção dedicada a Nuxt](../ssr/nuxt.md).
