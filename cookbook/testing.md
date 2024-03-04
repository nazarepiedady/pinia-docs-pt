# Testando Memórias %{#Testing-stores}%

As memórias serão, por padrão, usadas em muitos lugares e podem tornar os testes muito mais difíceis do que deveriam. Felizmente, esse não precisa ser o caso. Nós precisamos cuidar de três ao testar memórias:

- A instância da `pinia`: As memórias não podem funcionar sem esta
- `actions`: na maioria das vezes, estas contém a lógica mais complexa das nossas memórias. Não seria bom se fossem simuladas por padrão?
- Extensões: Se dependermos de extensões, também teremos de os instalar para os testes.

Dependendo do que ou como testamos, temos de tratar estes três aspetos de maneira diferente.

## Teste Unitário duma Memória %{#Unit-testing-a-store}%

Para testar a unidade duma memória, a parte mais importante é criar uma instância de pinia:

```js
// stores/counter.spec.ts
import { setActivePinia, createPinia } from 'pinia'
import { useCounterStore } from '../src/stores/counter'

describe('Counter Store', () => {
  beforeEach(() => {
    // cria uma nova pinia e torna-a ativa, para ser
    // automaticamente apanhada por qualquer chamada
    // de `useStore()` sem ter que a passar para ela:
    // `useStore(pinia)`
    setActivePinia(createPinia())
  })

  it('increments', () => {
    const counter = useCounterStore()
    expect(counter.n).toBe(0)
    counter.increment()
    expect(counter.n).toBe(1)
  })

  it('increments by amount', () => {
    const counter = useCounterStore()
    counter.increment(10)
    expect(counter.n).toBe(10)
  })
})
```

Se tivermos alguma extensão de memória, existe uma coisa importante a saber: **as extensões não serão usadas até a `pinia` ser instalada numa aplicação**. Isto pode ser solucionado criando uma aplicação vazia ou uma aplicação falsa:

```js
import { setActivePinia, createPinia } from 'pinia'
import { createApp } from 'vue'
import { somePlugin } from '../src/stores/plugin'

// o mesmo código que o anterior...

// não precisamos de criar uma aplicação por teste
const app = createApp({})
beforeEach(() => {
  const pinia = createPinia().use(somePlugin)
  app.use(pinia)
  setActivePinia(pinia)
})
```

## Teste Unitário de Componentes %{#Unit-testing-components}%

Isto pode ser alcançado com `createTestingPinia()`, que retorna uma instância de `pinia` desenhada auxiliar nos testes unitários de componentes.

Começamos por instalar `@pinia/testing`:

```shell
npm i -D @pinia/testing
```

E precisamos de certificar-nos de que criamos uma instância de `pinia` de testes nos nossos testes quando montarmos um componente:

```js
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
// importar qualquer memória com a qual
// queremos interagir nos testes
import { useSomeStore } from '@/stores/myStore'

const wrapper = mount(Counter, {
  global: {
    plugins: [createTestingPinia()],
  },
})

const store = useSomeStore() // usa a pinia de teste!

// o estado pode ser manipulado diretamente
store.name = 'my new name'
// também pode ser feito através do remendo
store.$patch({ name: 'new name' })
expect(store.name).toBe('new name')

// As ações são esboçadas por padrão, o que significa
// que não executam o seu código por padrão.
// Consultar abaixo para personalizar este comportamento.
store.someAction()

expect(store.someAction).toHaveBeenCalledTimes(1)
expect(store.someAction).toHaveBeenLastCalledWith()
```

Por favor, note que se estivermos usando a Vue 2, `@vue/test-utils` requer uma [configuração ligeiramente diferente](#Unit-test-components-Vue-2-).

### Estado Inicial %{#Initial-State}%

Nós podemos definir o estado inicial de **todas as nossas memórias** ao criarmos uma instância de `pinia` de teste, passando um objeto `initialState`. Este objeto será usado pela pinia de teste para _remendar_ as memórias quando elas forem criadas. Digamos que queremos inicializar o estado desta memória:

```ts
import { defineStore } from 'pinia'

const useCounterStore = defineStore('counter', {
  state: () => ({ n: 0 }),
  // ...
})
```

Uma vez que a memória tem o nome _"counter"_, precisamos adicionar um objeto correspondente a `initialState`:

```ts
// Em algum lugar no nosso teste
const wrapper = mount(Counter, {
  global: {
    plugins: [
      createTestingPinia({
        initialState: {
          counter: { n: 20 }, // iniciar o contador a 20 em vez de 0
        },
      }),
    ],
  },
})

const store = useSomeStore() // usa a pinia de teste!
store.n // 20
```

### Personalização do Comportamento das Ações %{#Customizing-behavior-of-actions}%

A `createTestingPinia` elimina todas as ações da memória, a menos que seja dito o contrário. Isto nos permite testes os nossos componentes e memórias separadamente.

Se quisermos reverter este comportamento e executar normalmente nossas ações durante os testes, especifique `stubActions: false` ao chamar `createTestingPinia`:

```js
const wrapper = mount(Counter, {
  global: {
    plugins: [createTestingPinia({ stubActions: false })],
  },
})

const store = useSomeStore()

// Agora esta chamada EXECUTARÁ a
// implementação definida pela memória
store.someAction()

// ...mas continua a ser envolvido por um espião,
// pelo que podemos inspecionar as chamadas.
expect(store.someAction).toHaveBeenCalledTimes(1)
```

### Especificação da função `createSpy` %{#Specifying-the-createSpy-function}%

Ao usar a Jest, ou Vitest com a `globals: true`, a `createTestingPinia` esboça automaticamente as ações usando a função espia baseada na abstração de teste existente (`jest.fn` ou `vitest.fn`). Se não estivermos usando `globals: true` ou usando uma abstração diferente, precisamos fornecer uma opção [`createSpy`](/api/interfaces/pinia_testing.TestingOptions#createspy):

::: code-group

```ts [vitest]
// NOTA: não é necessário com `globals: true`
import { vi } from 'vitest'

createTestingPinia({
  createSpy: vi.fn,
})
```

```ts [sinon]
import sinon from 'sinon'

createTestingPinia({
  createSpy: sinon.spy,
})
```

:::

Nós podemos encontrar mais exemplos nos [testes do pacote de testes](https://github.com/vuejs/pinia/blob/v2/packages/testing/src/testing.spec.ts).

### Simulação dos Recuperadores %{#Mocking-getters}%

Por padrão, qualquer recuperador será computado como um uso normal, mas podemos forçar manualmente um valor definindo o recuperador para o que quisermos:

```ts
import { defineStore } from 'pinia'
import { createTestingPinia } from '@pinia/testing'

const useCounterStore = defineStore('counter', {
  state: () => ({ n: 1 }),
  getters: {
    double: (state) => state.n * 2,
  },
})

const pinia = createTestingPinia()
const counter = useCounterStore(pinia)

counter.double = 3 // 🪄 os recuperadores só são graváveis nos testes

// definir como `undefined` para repor o comportamento predefinido
// @ts-expect-error: normalmente é um número
counter.double = undefined
counter.double // 2 (=1 x 2)
```

### Extensões da Pinia %{#Pinia-Plugins}%

Se tivermos alguma extensão de pinia, precisamos de certificar-nos de passá-los ao chamar `createTestingPinia()` para que ela seja aplicada corretamente. **Não podemos adicioná-los com `testingPinia.use(MyPlugin)`** como faríamos com uma pinia normal:

```js
import { createTestingPinia } from '@pinia/testing'
import { somePlugin } from '../src/stores/plugin'

// dentro dum teste
const wrapper = mount(Counter, {
  global: {
    plugins: [
      createTestingPinia({
        stubActions: false,
        plugins: [somePlugin],
      }),
    ],
  },
})
```

## Testes E2E

Quando se trata da pinia, não precisas mudar nada para testes `e2e`, este é o objetivo dos testes `e2e`! Poderias talvez testar requisições HTTP, mas desta maneira fora do âmbito deste guia 😄.

## Teste unitário de componentes (Vue 2)

Quando estiveres utilizando a [Vue Test Utils 1](https://v1.test-utils.vuejs.org/), instale a Pinia em um `localVue`:

```js
import { PiniaVuePlugin } from 'pinia'
import { createLocalVue, mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'

const localVue = createLocalVue()
localVue.use(PiniaVuePlugin)

const wrapper = mount(Counter, {
  localVue,
  pinia: createTestingPinia(),
})

const store = useSomeStore() // utiliza a pinia de testes!
```
