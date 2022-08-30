# Extensões (`plugins`)

As memórias da Pinia podem ser completamente estendidas graças a uma API de baixo nível. Cá está uma lista de coisas que podes fazer:

- Adicionar novas propriedades às memórias
- Adicionar novas opções quando estiveres definindo memórias
- Adicionar novos métodos às memórias
- Envolver os métodos existentes
- Mudar ou até mesmo cancelar ações
- Implementar efeitos colaterais tipo [Armazenamento Local](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- Aplicar **apenas** para memórias especificas

As extensões são adicionas à instância de `pinia` com `pinia.use()`. O exemplo mais simples é a adição de uma propriedade estática para todas memórias com retorno de um objeto:

```js
import { createPinia } from 'pinia'

// adiciona uma propriedade com o nome `secret` para toda memória que for criada depois desta extensão ser instalada
// isto poderia estar em um ficheiro diferente
function SecretPiniaPlugin() {
  return { secret: 'the cake is a lie' }
}

const pinia = createPinia()
// entregar a extensão ao pinia
pinia.use(SecretPiniaPlugin)

// em um outro ficheiro
const store = useStore()
store.secret // 'the cake is a lie'
```

Isto é útil para adicionar objetos globais tais como roteador, modal, gestores de brinde (toast, termo em Inglês).

## Introdução

Uma extensão de Pinia é uma função que opcionalmente retorna propriedades a serem adicionadas à uma memória. Ela recebe um argumento opcional, um _contexto_:

```js
export function myPiniaPlugin(context) {
  context.pinia // a pinia criada com `createPinia()`
  context.app // o aplicação atual criada com `createApp()` (apenas na Vue 3)
  context.store // a memória que a extensão está aumentando
  context.options // o objeto de opções definindo a memória passada para `defineStore()`
  // ...
}
```

Esta função é então passada para `pinia` com `pinia.use()`:

```js
pinia.use(myPiniaPlugin)
```

As extensões apenas são aplicadas às memórias **criadas depois da `pinia` ser passada para a aplicação**, do contrário elas não serão aplicadas.

## Aumentando uma Memória

You can add properties to every store by simply returning an object of them in a plugin:
Tu podes adicionar propriedades para toda memória ao simplesmente retornar um objeto delas em uma extensão:

```js
pinia.use(() => ({ hello: 'world' }))
```

Tu podes também definir a propriedade diretamente na `store` mas **se possível utilize a versão que retorna assim elas podem ser automaticamente rastreadas pela ferramenta do programador (devtools, em Inglês)**:

```js
pinia.use(({ store }) => {
  store.hello = 'world'
})
```

Qualquer propriedade _retornada_ por uma extensão será automaticamente rastreada pela ferramenta do programador então para tornar `hello` visível na ferramenta do programador, certifique-se de adicioná-lo à `store._customProperties` **apenas no modo de desenvolvimento** se quiseres depurá-la na ferramenta do programador:

```js
// do exemplo acima
pinia.use(({ store }) => {
  store.hello = 'world'
  // certifique-se de que o teu empacotador manipule isto. o webpack e vite devem fazê-lo por padrão
  if (process.env.NODE_ENV === 'development') {
    // adiciona quaisquer chaves que definires na memória
    store._customProperties.add('hello')
  }
})
```

Nota que toda memória que é envolvida com [`reactive`](https://v3.vuejs.org/api/basic-reactivity.html#reactive), desembrulha automaticamente qualquer referência (`ref()`, `computed()`, ...) que ela contenha:

```js
const sharedRef = ref('shared')
pinia.use(({ store }) => {
  // cada memória tem sua propriedade `hello` individual
  store.hello = ref('secret')
  // ela é desembrulhada automaticamente
  store.hello // 'secret'

  // todas memórias estão partilhando o valor da propriedade `shared`
  store.shared = sharedRef
  store.shared // 'shared'
})
```

É por isso que podes acessar todas propriedades computadas sem `.value` e por isto que elas são reativas.

### Adicionando novo estado

Se quiseres adicionar novas propriedades de estado à uma memória ou propriedades que estão destinadas a serem utilizadas durante a hidratação, **terás de adicioná-la em dois lugares**:

- Na `store`, assim podes acessá-la com `store.myState`
- Na `store.$state`, assim ela pode ser utilizada na ferramenta do programador e, **ser adaptada (serialized, em Inglês) durante a interpretação no lado do servidor (SSR, sigla em Inglês)**

Além de que, certamente terás de utilizar uma `ref()` (ou outra API reativa) para partilhar o valor através de acessos diferentes:

```js
import { toRef, ref } from 'vue'

pinia.use(({ store }) => {
  // para corretamente manipular a SSR, precisamos ter a certeza de que não estamos sobrepondo um valor existente
  if (!Object.prototype.hasOwnProperty(store.$state, 'hasError')) {
    // `hasError` é definido dentro da extensão, assim cada memória tem sua propriedade `state` individual
    const hasError = ref(false)
    // a definição da variável em `$state`, permite que ela seja adaptada durante a SSR
    store.$state.hasError = hasError
  }
  // podemos transferir a `ref` de `state` para a `store`, desta maneira
  // ambos acessos: `store.hasError` e `store.$state.hasError` funcionarão
  // e partilharão a mesma variável
  // Consulte https://vuejs.org/api/reactivity-utilities.html#toref
  store.hasError = toRef(store.$state, 'hasError')

  // neste caso é melhor não retornar `hasError` visto que será
  // exibida na secção `state` na ferramenta do programador
  // de qualquer maneira e se a retornarmos, a ferramenta do programador a exibirá duas vezes
})
```

Nota que as mudanças de estado ou adições que ocorrem dentro de uma extensão (que inclui a chamada `store.$patch()`) acontecem antes da memória estar ativa e portanto **não aciona quaisquer subscrições**.

:::warning
Se estiveres utilizando a **Vue 2**, a Pinia está sujeita às [mesmas advertências de reatividade](https://vuejs.org/v2/guide/reactivity.html#Change-Detection-Caveats) da  Vue. Precisarás utilizar a `set` da `@vue/composition-api` quando estiveres criando novas propriedades de estado tais como `secret` e `hasError`:

```js
import { set, toRef } from '@vue/composition-api'
pinia.use(({ store }) => {
  if (!Object.prototype.hasOwnProperty(store.$state, 'hello')) {
    const secretRef = ref('secret')
    // Se o dado está destinado a ser utilizado durante a SSR, deves
    // defini-la na propriedade `$state` assim ele é adaptado e
    // recuperado durante a hidratação
    set(store.$state, 'secret', secretRef)
  }
  // defini-a também diretamente na `store`, assim podes acessá-la
  // de duas maneiras: `store.$state.secret` / `store.secret`
  set(store, 'secret', toRef(store.$state, 'secret'))
  store.secret // 'secret'
})
```

:::

## Adicionando novas propriedades externas

Quando estiveres adicionando propriedades externas, para as instâncias de classe que vêm de outras bibliotecas, ou simplesmente coisas que não são reativas, deves envolver o objeto com `markRaw()` antes de passá-lo ao `pinia`. Cá está um exemplo adicionando o roteador para toda memória:

```js
import { markRaw } from 'vue'
// adapta isto com base onde teu roteador está
import { router } from './router'

pinia.use(({ store }) => {
  store.router = markRaw(router)
})
```

## Chamando `$subscribe` dentro de extensões

Tu também podes utilizar [`store.$subscribe`](./state.md#subscrevendo-ao-estado) e [`store.$onAction`](./actions.md#subscrevendo-às-ações) dentro de extensões:

```ts
pinia.use(({ store }) => {
  store.$subscribe(() => {
    // reage as mudanças da memória (`store`)
  })
  store.$onAction(() => {
    // reage as ações da memória (`store`)
  })
})
```

## Adicionando novas opções

É possível criar novas opções quando estiveres definindo as memórias para depois as consumires a partir das extensões. Por exemplo, poderias criar uma opção `debounce` que permite-te aplicar o `debounce` à qualquer ação:

```js
defineStore('search', {
  actions: {
    searchContacts() {
      // ...
    },
  },

  // isto depois será lido por uma extensão
  debounce: {
    // aplicar `debounce` a ação `searchContacts` por 300ms
    searchContacts: 300,
  },
})
```

A extensão pode então ler aquela opção para envolver as ações e substituir as originais:

```js
// utilize qualquer biblioteca de `debounce`
import debounce from 'lodash/debounce'

pinia.use(({ options, store }) => {
  if (options.debounce) {
    // estamos sobrepondo as ações com as novas
    return Object.keys(options.debounce).reduce((debouncedActions, action) => {
      debouncedActions[action] = debounce(
        store[action],
        options.debounce[action]
      )
      return debouncedActions
    }, {})
  }
})
```

Nota que as opções personalizadas são passadas como terceiro argumento quando estiveres utilizando a sintaxe de `setup`:

```js
defineStore(
  'search',
  () => {
    // ...
  },
  {
    // isto depois será lido por uma extensão
    debounce: {
      // aplicar `debounce` a ação `searchContacts` por 300ms
      searchContacts: 300,
    },
  }
)
```

## TypeScript

Tudo mostrado acima pode ser feito com suporte a tipos, assim já não precisas de utilizar `any` ou `@ts-ignore`.

### Tipando as extensões

Uma extensão de Pinia pode ser tipada como se segue:

```ts
import { PiniaPluginContext } from 'pinia'

export function myPiniaPlugin(context: PiniaPluginContext) {
  // ...
}
```

### Tipando as novas propriedades da memória

Quando estiveres adicionando novas propriedades à memória, também deves aumentar a interface de `PiniaCustomProperties`.

```ts
import 'pinia'

declare module 'pinia' {
  export interface PiniaCustomProperties {
    // com uso de um definidor (setter, em Inglês) podemos permitir ambas `strings` e `refs`
    set hello(value: string | Ref<string>)
    get hello(): string

    // também podes definir valores mais simples
    simpleNumber: number
  }
}
```

Isto pode ser então escrito e lido com segurança:

```ts
pinia.use(({ store }) => {
  store.hello = 'Hola'
  store.hello = ref('Hola')

  store.simpleNumber = Math.random()
  // `@ts-expect-error`: não tipamos isto corretamente
  store.simpleNumber = ref(Math.random())
})
```

A `PiniaCustomProperties` é um tipo genérico que permite-te referenciar propriedades de uma memória. Suponha que o seguinte exemplo onde copiamos em cima das opções iniciais como `$options` (isto só funciona para as memórias baseadas em opções):

```ts
pinia.use(({ options }) => ({ $options: options }))
```

Podemos tipar corretamente isto com o uso de 4 tipos genéricos de `PiniaCustomProperties`:

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

:::tip
Quanto estiveres estendendo os tipos em genéricos, eles devem ser nomeados **exatamente como estão no código-fonte**. `Id` não pode ser nomeado `id` ou `I`, e `S` não pode ser nomeado `State`. Cá está o que cada letra significa:

- S: State (Estado)
- G: Getters (Recuperadores)
- A: Actions (Ações)
- SS: Setup Store / Store (Memória baseada em Composições / Memória)

:::

### Tipando o novo estado

Quando estiveres adicionando novas propriedades de estado (para ambas, a `store` e `store.$state`), precisas de preferência adicionar o tipo ao `PiniaCustomStateProperties`. Diferentemente de `PiniaCustomProperties`, ela só recebe o `State` genérico:

```ts
import 'pinia'

declare module 'pinia' {
  export interface PiniaCustomStateProperties<S> {
    hello: string
  }
}
```

### Tipando novas opções de criação

Quando estiveres criando novas opções para `defineStore()`, deves estender a `DefineStoreOptionsBase`. Diferentemente de `PiniaCustomProperties`, ela só expõem dois tipos genéricos: o tipo `State` e o tipo `Store`, permitindo-te limitar o que pode ser definido. Por exemplo, podes utilizar os nomes das ações:

```ts
import 'pinia'

declare module 'pinia' {
  export interface DefineStoreOptionsBase<S, Store> {
    // permite a definição de um número de `ms` para quaisquer das ações
    debounce?: Partial<Record<keyof StoreActions<Store>, number>>
  }
}
```

:::tip
Há também um tipo `StoreGetters` para extrair os _recuperadores (getters, em Inglês)_ de um tipo `Store`. Também podes estender as opções das _memórias baseadas em composição_ ou _memórias baseadas em opções_ **apenas** estendendo os tipos `DefineStoreOptions` e `DefineSetupStoreOptions` respetivamente.
:::

## Nuxt.js

Quando estiveres [utilizando a `pinia` junto da Nuxt](../ssr/nuxt.md), terás de criar uma [extensão de Nuxt](https://nuxtjs.org/docs/2.x/directory-structure/plugins) primeiro. Isto dar-te-á acesso à instância de `pinia`:

```ts
// plugins/myPiniaPlugin.js
import { PiniaPluginContext } from 'pinia'
import { Plugin } from '@nuxt/types'

function MyPiniaPlugin({ store }: PiniaPluginContext) {
  store.$subscribe((mutation) => {
    // reage as mudanças da memória
    console.log(`[🍍 ${mutation.storeId}]: ${mutation.type}.`)
  })

  // Nota que isto precisa ser tipado caso estiveres utilizando TS (TypeScript)
  return { creationTime: new Date() }
}

const myPlugin: Plugin = ({ $pinia }) => {
  $pinia.use(MyPiniaPlugin)
}

export default myPlugin
```

Nota que o exemplo acima está utilizando TypeScript, precisas remover as anotações de tipos `PiniaPluginContext` e `Plugin` bem como as importações delas caso estiveres utilizando um ficheiro `.js`.