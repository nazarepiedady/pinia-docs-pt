# Testando Memórias %{#Testing-stores}%

As memórias serão, por padrão, usadas em muitos lugares e podem tornar os testes muito mais difíceis do que deveriam. Felizmente, esse não precisa ser o caso. Nós precisamos cuidar de três ao testar memórias:

- A instância da `pinia`: As memórias não podem funcionar sem esta
- `actions`: na maioria das vezes, estas contém a lógica mais complexa das nossas memórias. Não seria bom se fossem simuladas por padrão?
- Extensões: Se dependermos de extensões, também teremos de os instalar para os testes.

Dependendo do que ou como testamos, temos de tratar estes três aspetos de maneira diferente.

## Testagem unitária de uma memória

Para fazer teste unitário em uma memória, a parte mais importante é a criação de uma instância de `pinia`:

```js
// counterStore.spec.ts
import { setActivePinia, createPinia } from 'pinia'
import { useCounter } from '../src/stores/counter'

describe('Counter Store', () => {
  beforeEach(() => {
    // cria um nova instância de pinia e torna-a ativa assim será automaticamente
    // capturada por qualquer chamada de `useStore()` sem ter de passá-la para ela:
    // `useStore(pinia)`
    setActivePinia(createPinia())
  })

  it('increments', () => {
    const counter = useCounter()
    expect(counter.n).toBe(0)
    counter.increment()
    expect(counter.n).toBe(1)
  })

  it('increments by amount', () => {
    const counter = useCounter()
    counter.increment(10)
    expect(counter.n).toBe(10)
  })
})
```

Se tiveres quaisquer extensões de memória, há uma coisa importante a saber: **extensões não serão utilizadas até que a `pinia` esteja instalada em uma Aplicação**. Isto pode ser solucionado pela criação de uma Aplicação vazia ou falsificar uma:

```js
import { setActivePinia, createPinia } from 'pinia'
import { createApp } from 'vue'
import { somePlugin } from '../src/stores/plugin'

// o mesmo código de cima...

// não precisas criar uma aplicação por teste
const app = createApp({})
beforeEach(() => {
  const pinia = createPinia().use(somePlugin)
  app.use(pinia)
  setActivePinia(pinia)
})
```

## Testagem unitária de componentes

Isto pode ser alcançado com `createTestingPinia()`, que retorna uma instância de pinia desenhada para ajudar a realizar testes unitários em componentes.

Comece por instalar `@pinia/testing`:

```shell
npm i -D @pinia/testing
```

E certifique-te de criar uma instância de pinia de testes em seus testes quando estiveres montando um componente:

```js
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'

const wrapper = mount(Counter, {
  global: {
    plugins: [createTestingPinia()],
  },
})

const store = useSomeStore() // utiliza a pinia de testes

// o estado pode ser diretamente manipulado
store.name = 'my new name'
// pode também ser feito através do remendo
store.$patch({ name: 'new name' })
expect(store.name).toBe('new name')

// ações são bloqueadas por padrão, significando que elas não executam seu código por padrão.
// Veja abaixo como personalizar este comportamento.
store.someAction()

expect(store.someAction).toHaveBeenCalledTimes(1)
expect(store.someAction).toHaveBeenLastCalledWith()
```

Nota que se estiveres utilizando a Vue 2, a biblioteca `@vue/test-utils` requer um [configuração ligeiramente diferente](#teste-unitários-em-componentes-vue-2).

### Estado Inicial

Tu podes definir o estado initial de **todas as tuas memórias** quando estiveres criando uma instância de testes de pinia ao passar um objeto `initialState`. Este objeto será utilizado pela instância de testes de pinia para _remendar_ as memórias quando elas forem criadas. Vamos dizer que queres inicializar o estado desta memória:

```ts
import { defineStore } from 'pinia'

const useCounterStore = defineStore('counter', {
  state: () => ({ n: 0 }),
  // ...
})
```

Visto que a memória foi nomeada _"counter"_, tu precisas adicionar um objeto correspondente ao `initialState`:

```ts
// algum lugar no seu teste
const wrapper = mount(Counter, {
  global: {
    plugins: [
      createTestingPinia({
        initialState: {
          counter: { n: 20 }, // inicia o `counter` em 20 no lugar de 0
        },
      }),
    ],
  },
})

const store = useSomeStore() // utiliza a instância de testes de pinia!
store.n // 20
```

### Personalizando o comportamento das ações

`createTestingPinia` apaga todas ações da memória a menos que seja dito o contrário. Isto permite-te testar seus componentes e memórias separadamente.

Se quiseres reverter este comportamento e executar normalmente as tuas ações durante os testes, especifique `stubActions: false` quando estiveres chamando a `createTestingPinia`:

```js
const wrapper = mount(Counter, {
  global: {
    plugins: [createTestingPinia({ stubActions: false })],
  },
})

const store = useSomeStore()

// Agora esta chamada EXECUTARÁ a implementação definida pela memória
store.someAction()

// ...mas ela continua envolvida com um espião (`spy`), assim podes inspecionar as chamadas
expect(store.someAction).toHaveBeenCalledTimes(1)
```

### Especificando a função createSpy

Quando estiveres utilizando a Jest, ou a Vitest com `globals: true`, a `createTestingPinia` bate automaticamente as ações utilizando a função espião (`spy`) baseada na abstração de teste existente (`jest.fn` ou `vitest.fn`). Se estas utilizando uma abstração diferente, precisarás fornecer uma opção [`createSpy`](/api/interfaces/pinia_testing.TestingOptions.md#createspy):

```js
import sinon from 'sinon'

createTestingPinia({
  createSpy: sinon.spy, / utiliza o espião do `sinon` para envolver as ações
})
```

Tu podes encontrar mais exemplos nos [testes do pacote de testes](https://github.com/vuejs/pinia/blob/v2/packages/testing/src/testing.spec.ts).

### Simulando recuperadores

Por padrão, qualquer recuperador será computado como a utilização regular, mas podes automaticamente forçar um valor pela definição do recuperador para qualquer coisa que quiseres:  

```ts
import { defineStore } from 'pinia'
import { createTestingPinia } from '@pinia/testing'

const useCounter = defineStore('counter', {
  state: () => ({ n: 1 }),
  getters: {
    double: (state) => state.n * 2,
  },
})

const pinia = createTestingPinia()
const counter = useCounter(pinia)

counter.double = 3 // 🪄 os recuperadores são apenas graváveis em testes 

// define para `não definido` para reiniciar o comportamento padrão
// @ts-expect-error: normalmente é um número
counter.double = undefined
counter.double // 2 (=1 x 2)
```

### Extensões de Pinia

Se tiveres quaisquer extensões de pinia, certifique-se de passá-los quando estiveres chamando a `createTestinPinia()` assim elas são propriamente aplicadas. **Não adicione-os com `testingPinia.use(MyPlugin)`** como farias com uma pinia regular:

```js
import { createTestingPinia } from '@pinia/testing'
import { somePlugin } from '../src/stores/plugin'

// dentro de algum teste
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
