# Extensões %{#Plugins}%

As memórias da Pinia podem ser completamente estendidas através duma API de baixo nível. Eis uma lista de coisas que podemos fazer:

- Adicionar novas propriedades às memórias
- Adicionar novas opções quando definimos memórias
- Adicionar novos métodos às memórias
- Embrulhar os métodos existentes
- Intercetar ações e seus resultados
- Implementar efeitos colaterais tais como [Armazenamento Local](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- Aplicar **apenas** às memórias especificas

As extensões são adicionas à instância de `pinia` com `pinia.use()`. O exemplo mais simples é adicionar uma propriedade estática em todas as memórias retornando um objeto:

```js
import { createPinia } from 'pinia'

// adicionar uma propriedade `secret` em toda
// memória criada depois desta extensão ser
// instalada, isto poderia estar
// num ficheiro diferente
function SecretPiniaPlugin() {
  return { secret: 'the cake is a lie' }
}

const pinia = createPinia()
// atribuir a extensão à pinia
pinia.use(SecretPiniaPlugin)

// num outro ficheiro
const store = useStore()
store.secret // 'the cake is a lie'
```

Isto é útil para adicionar objetos tais como roteador, modal, ou gestores de brinde.

## Introdução %{#Introduction}%

Uma extensão de Pinia é uma função que retorna opcionalmente as propriedades a serem adicionadas à uma memória. Esta recebe um argumento opcional, um _contexto_:

```js
export function myPiniaPlugin(context) {
  context.pinia // pinia criada com `createPinia()`
  context.app // aplicação atual criada com `createApp()` (só na Vue 3)
  context.store // memória manipulada pela extensão
  context.options // objeto de opções da memória passada a `defineStore()`
  // ...
}
```

Esta função é então passada à `pinia` com `pinia.use()`:

```js
pinia.use(myPiniaPlugin)
```

As extensão apenas são aplicadas às memórias criadas **depois das próprias extensões, e depois da `pinia` ser passada à aplicação**, de outro modo não serão aplicadas.

## Aumentando uma Memória %{#Augmenting-a-Store}%

Nós podemos adicionar as propriedades a toda memória simplesmente retornando um objeto destas numa extensão:

```js
pinia.use(() => ({ hello: 'world' }))
```

Nós também podemos definir a propriedade diretamente sobre a `store` mas **se possível usamos a versão de retorno, assim podem ser rastreadas automaticamente pelas ferramentas de programação do navegador**:

```js
pinia.use(({ store }) => {
  store.hello = 'world'
})
```

Qualquer propriedade _retornada_ por uma extensão será rastreada automaticamente pelas ferramentas de programação do navegador, então no sentido de tornar `hello` visível nas ferramentas de programação do navegador, devemos certificar-nos de adicioná-la à `store._customProperties` **apenas no modo de desenvolvimento** se quisermos depurá-la nas ferramentas de programação do navegador: 

```js
// a partir do exemplo acima
pinia.use(({ store }) => {
  store.hello = 'world'
  // garantir que o empacotador manipule isto.
  // a webpack e vite devem fazê-lo por padrão
  if (process.env.NODE_ENV === 'development') {
    // adicionar quaisquer chaves que definimos na memória
    store._customProperties.add('hello')
  }
})
```

Nota que toda memória é embrulhada com a [`reactive`](https://pt.vuejs.org/api/basic-reactivity#reactive), desembrulhando automaticamente qualquer referência (`ref()`, `computed()`, ...) que esta contiver:

```js
const sharedRef = ref('shared')
pinia.use(({ store }) => {
  // cada memória tem sua propriedade `hello`
  store.hello = ref('secret')
  // é desembrulhada automaticamente
  store.hello // 'secret'

  // todas memórias estão partilhando
  // o valor da propriedade `shared`
  store.shared = sharedRef
  store.shared // 'shared'
})
```

É por causa disto que podemos acessar todas as propriedades computadas sem `.value` e por isto são reativas.

### Adicionando Novo Estado %{#Adding-new-state}%

Se quisermos adicionar novas propriedades de estado à uma memória ou às propriedades que estão destinadas a serem usadas durante a hidratação, **precisaremos adicioná-lo em dois lugares**:

- Na `store`, assim podemos acessá-lo com `store.myState`
- Na `store.$state`, assim pode ser usada nas ferramentas de programação do navegador e, **ser serializada durante a interpretação do lado do servidor**.

Além de que, certamente precisaremos usar uma `ref()` (ou outra API reativa) para partilhar o valor através de diferentes acessos:

```js
import { toRef, ref } from 'vue'

pinia.use(({ store }) => {
  // para manipular corretamente a interpretação do lado servidor,
  // precisamos garantir que não estamos sobrepondo
  // um valor existente
  if (!Object.prototype.hasOwnProperty(store.$state, 'hasError')) {
    // `hasError` é definida dentro da extensão,
    // assim cada memória tem sua propriedade de estado
    const hasError = ref(false)
    // definir a variável na `$state`, permite que esta seja
    // serializada durante a interpretação do lado do servidor
    store.$state.hasError = hasError
  }
  // precisamos transferir a `ref` de `state` para a `store`,
  // desta maneira ambos acessos: `store.hasError` e
  // `store.$state.hasError` funcionarão e
  // partilharão a mesma variável
  // Consulte https://pt.vuejs.org/api/reactivity-utilities#toref
  store.hasError = toRef(store.$state, 'hasError')

  // neste caso é melhor não retornar `hasError` visto que
  // será exibida na secção `state` nas ferramentas de programação
  // e se a retornarmos, as ferramentas de programação a exibirão
  // duas vezes.
})
```

Nota que as mudanças de estado ou adições que ocorrem dentro duma extensão (que inclui chamar `store.$patch()`) acontecem antes da memória estar ativa e portanto **não aciona quaisquer subscrições**.

:::warning AVISO
Se estivermos usando a **Vue 2**, a Pinia está sujeita às [mesmas advertências de reatividade](https://v2.vuejs.org/v2/guide/reactivity.html#Change-Detection-Caveats) conforme a Vue. Nós precisaremos usar `Vue.set()` (Vue 2.7) ou `set()` (do `@vue/composition-api` para a Vue <2.7) para quando criarmos as novas propriedades de estado como `secret` e `hasError`:

```js
import { set, toRef } from '@vue/composition-api'
pinia.use(({ store }) => {
  if (!Object.prototype.hasOwnProperty(store.$state, 'secret')) {
    const secretRef = ref('secret')
    // Se o dado estiver destinado a ser usado durante a
    // interpretação do lado do servidor, devemos
    // defini-lo na propriedade `$state`, assim é
    // serializado e recuperado durante a hidratação
    set(store.$state, 'secret', secretRef)
  }
  // também o definimos diretamente na memória,
  // assim podemos acessá-lo de duas maneiras:
  // `store.$state.secret` / `store.secret`
  set(store, 'secret', toRef(store.$state, 'secret'))
  store.secret // 'secret'
})
```

:::

#### Redefinindo o Estado adicionado nas Extensões %{#Resetting-state-added-in-plugins}%

Por padrão, `$reset()` reiniciará o estado adicionado pelas extensões mas podemos sobrepor este para reiniciar o estado que adicionamos:

```js
import { toRef, ref } from 'vue'

pinia.use(({ store }) => {
  // este é o mesmo código de cima por referência
  if (!Object.prototype.hasOwnProperty(store.$state, 'hasError')) {
    const hasError = ref(false)
    store.$state.hasError = hasError
  }
  store.hasError = toRef(store.$state, 'hasError')

  // temos de nos certificar de definir o
  // contexto (`this`) à memória
  const originalReset = store.$reset.bind(store)

  // sobrepor a função `$reset`
  return {
    $reset() {
      originalReset()
      store.hasError = false
    },
  }
})
```

## Adicionando Novas Propriedades Externas %{#Adding-new-external-properties}%

Quando adicionamos propriedades externas, as instâncias de classe que vêm de outras bibliotecas, ou simplesmente coisas que não são reativas, devemos embrulhar o objeto com `markRaw()` antes de passá-lo à `pinia`. Eis um exemplo adicionando o roteador à toda memória:

```js
import { markRaw } from 'vue'
// adaptar isto baseado em onde o nosso roteador está
import { router } from './router'

pinia.use(({ store }) => {
  store.router = markRaw(router)
})
```

## Chamando `$subscribe` dentro das Extensões %{#Calling-subscribe-inside-plugins}%

Nós também podemos usar [`store.$subscribe`](./state#Subscribing-to-the-state) e [`store.$onAction`](./actions#Subscribing-to-actions) dentro das extensões:

```ts
pinia.use(({ store }) => {
  store.$subscribe(() => {
    // reagir às mudanças da memória
  })
  store.$onAction(() => {
    // reagir às ações da memória
  })
})
```

## Adicionando Novas Opções %{#Adding-new-options}%

É possível criar novas opções quando definimos as memórias para depois as consumir a partir das extensões. Por exemplo, poderíamos criar uma opção `debounce` que permite-nos reduzir a chamada de qualquer ação:

```js
defineStore('search', {
  actions: {
    searchContacts() {
      // ...
    },
  },

  // esta depois será lida por uma extensão
  debounce: {
    // reduzir a chamada da ação `searchContacts` por 300ms
    searchContacts: 300,
  },
})
```

A extensão depois pode ler esta opção para embrulhar as ações e substituir as originais:

```js
// usar qualquer biblioteca de `debounce`
import debounce from 'lodash/debounce'

pinia.use(({ options, store }) => {
  if (options.debounce) {
    // estamos sobrepondo as ações com as novas
    return Object.keys(options.debounce).reduce(
      (debouncedActions, action) => {
        debouncedActions[action] = debounce(
          store[action],
          options.debounce[action]
        )
        return debouncedActions
    }, {})
  }
})
```

Nota que as opções personalizadas são passadas como terceiro argumento quando escrevemos a sintaxe de configuração (ou `setup`):

```js
defineStore(
  'search',
  () => {
    // ...
  },
  {
    // esta depois será lido por uma extensão
    debounce: {
      // reduzir a chamada da ação `searchContacts` por 300ms
      searchContacts: 300,
    },
  }
)
```

## TypeScript %{#TypeScript}%

Tudo que foi mostrado acima pode ser feito com suporte de tipificação, então nunca mais precisaremos usar `any` ou `@ts-ignore`.

### Tipificando as Extensões %{#Typing-plugins}%

Uma extensão de Pinia pode ser tipificada da seguinte maneira:

```ts
import { PiniaPluginContext } from 'pinia'

export function myPiniaPlugin(context: PiniaPluginContext) {
  // ...
}
```

### Tipificando Novas Propriedades da Memória %{#Typing-new-store-properties}%

Quando adicionamos novas propriedades à memória, também devemos estender a interface `PiniaCustomProperties`:

```ts
import 'pinia'
import type { Router } from 'vue-router'

declare module 'pinia' {
  export interface PiniaCustomProperties {
    // usando um definidor podemos permitir ambas
    // sequências de caracteres e referências
    set hello(value: string | Ref<string>)
    get hello(): string

    // também podemos definir valores mais simples
    simpleNumber: number

    // tipificar o roteador adicionado
    // pela extensão acima (#adding-new-external-properties)
    router: Router
  }
}
```

Isto pode então ser escrito e lido com segurança:

```ts
pinia.use(({ store }) => {
  store.hello = 'Hola'
  store.hello = ref('Hola')

  store.simpleNumber = Math.random()
  // @ts-expect-error: nós não tipificamos isto corretamente
  store.simpleNumber = ref(Math.random())
})
```

`PiniaCustomProperties` é um tipo genérico que permite-nos referenciar propriedades duma memória. Suponhamos que o seguinte exemplo onde copiamos as opções iniciais como `$options` (isto apenas funcionaria para memórias de opções):

```ts
pinia.use(({ options }) => ({ $options: options }))
```

Nós podemos tipificar isto corretamente usando os 4 tipos genéricos de `PiniaCustomProperties`:

```ts
import 'pinia'

declare module 'pinia' {
  export interface PiniaCustomProperties<Id, S, G, A> {
    $options: {
      id: Id
      state?: () => S
      getters?: G
      actions?: A
    }
  }
}
```

:::tip DICA
Quando estendemos os tipos em genéricos, estes deve ser nomeados **exatamente como estão no código-fonte**. `Id` não pode ser nomeado `id` ou `I`, e `S` não pode ser nomeado `State`. Eis o que cada letra significa:

- S: State (Estado)
- G: Getters (Recuperadores)
- A: Actions (Ações)
- SS: Setup Store / Store (Memória de Configuração / Memória)

:::

### Tipificando Novo Estado %{#Typing-new-state}%

Quando adicionamos novas propriedades de estado (à ambas, a `store` e `store.$state`), precisamos adicionar o tipo ao `PiniaCustomStateProperties`. Diferentemente de `PiniaCustomProperties`, este apenas recebe o `State` genérico:

```ts
import 'pinia'

declare module 'pinia' {
  export interface PiniaCustomStateProperties<S> {
    hello: string
  }
}
```

### Tipificando Novas Opções de Criação %{#Typing-new-creation-options}%

Quando criamos novas opções para `defineStore()`, devemos estender o `DefineStoreOptionsBase`. Diferentemente de `PiniaCustomProperties`, apenas expõe dois genéricos: o tipo `State` e o `Store`, permitindo-nos limitar o que pode ser definido. Por exemplo, podemos usar os nomes das ações:

```ts
import 'pinia'

declare module 'pinia' {
  export interface DefineStoreOptionsBase<S, Store> {
    // permitir a definição dum número de `ms`
    // para quaisquer uma das ações
    debounce?: Partial<Record<keyof StoreActions<Store>, number>>
  }
}
```

:::tip DICA
Também existe um tipo `StoreGetters` para extrair os _recuperadores_ a partir dum tipo `Store`. Nós também podemos estender as opções das _memórias de configuração_ ou _memórias de opção_ **apenas** estendendo os tipos `DefineStoreOptions` e `DefineSetupStoreOptions` respetivamente.
:::

## Nuxt.js %{#Nuxt-js}%

Quando [usamos a `pinia` em conjunto com a Nuxt](../ssr/nuxt), primeiro precisaremos criar uma [extensão de Nuxt](https://nuxt.com/docs/guide/directory-structure/plugins). Isto dar-nos-á à instância de `pinia`:

```ts{14-16}
// plugins/myPiniaPlugin.ts
import { PiniaPluginContext } from 'pinia'

function MyPiniaPlugin({ store }: PiniaPluginContext) {
  store.$subscribe((mutation) => {
    // reagir às mudanças da memória
    console.log(`[🍍 ${mutation.storeId}]: ${mutation.type}.`)
  })

  // Nota que isto precisa ser tipificado se usamos TypeScript
  return { creationTime: new Date() }
}

export default defineNuxtPlugin(({ $pinia }) => {
  $pinia.use(MyPiniaPlugin)
})
```

:::info INFORMAÇÃO

O exemplo acima estiver usando a TypeScript, precisamos remover as anotações de tipo `PiniaPluginContext` e `Plugin` bem como as suas importações se usarmos um ficheiro `.js`.

:::

### Nuxt.js 2 %{#Nuxt-js-2}%

Se usarmos a Nuxt.js 2, os tipos são ligeiramente diferentes:

```ts{3,15-17}
// plugins/myPiniaPlugin.ts
import { PiniaPluginContext } from 'pinia'
import { Plugin } from '@nuxt/types'

function MyPiniaPlugin({ store }: PiniaPluginContext) {
  store.$subscribe((mutation) => {
    // reagir às mudanças da memória
    console.log(`[🍍 ${mutation.storeId}]: ${mutation.type}.`)
  })

  // Nota que isto precisa ser tipificado se usamos TypeScript
  return { creationTime: new Date() }
}

const myPlugin: Plugin = ({ $pinia }) => {
  $pinia.use(MyPiniaPlugin)
}

export default myPlugin
```