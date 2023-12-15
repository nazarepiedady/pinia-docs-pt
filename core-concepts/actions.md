# Ações %{#Actions}%

<VueSchoolLink
  href="https://vueschool.io/lessons/synchronous-and-asynchronous-actions-in-pinia"
  title="Aprenda tudo sobre as ações na Pinia"
/>

As ações são as equivalentes dos [métodos](https://pt.vuejs.org/api/options-state#methods) nos componentes. Estas podem ser definidas com a propriedade `actions` na `defineStore()` e **são perfeitas para definir a lógica do negócio**:

```js
export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
  }),
  actions: {
    // uma vez que dependemos da `this`,
    // não podemos usar uma função de flecha
    increment() {
      this.count++
    },
    randomizeCounter() {
      this.count = Math.round(100 * Math.random())
    },
  },
})
```

Tal como os [recuperadores](./getters), as ações têm acesso à _instância da memória inteira_ através da `this` com **suporte completo à tipificação (e conclusão automática ✨)**. **Ao contrário dos recuperadores, as `actions` podem ser assíncronas**, podemos `await` dentro das ações qualquer chamada de API ou até mesmo outras ações! Eis um exemplo usando [Mande](https://github.com/posva/mande). Nota que a biblioteca que usamos não importa desde que recebamos uma `Promise`, poderíamos até mesmo usar a função `fetch` nativa (apenas do navegador):

```js
import { mande } from 'mande'

const api = mande('/api/users')

export const useUsers = defineStore('users', {
  state: () => ({
    userData: null,
    // ...
  }),

  actions: {
    async registerUser(login, password) {
      try {
        this.userData = await api.post({ login, password })
        showTooltip(`Welcome back ${this.userData.name}!`)
      } catch (error) {
        showTooltip(error)
        // deixar o componente de formulário exibir o erro
        return error
      }
    },
  },
})
```

Nós também estamos completamente livres para definir quaisquer argumentos que quisermos e retornar qualquer coisa. Quando chamarmos as ações, tudo será inferido automaticamente!

As ações são invocadas da mesma maneira que as funções e métodos normais:

```vue
<script setup>
const store = useCounterStore()
// chamar a ação como um método da memória
store.randomizeCounter()
</script>

<template>
  <!-- Mesmo sobre o modelo de marcação -->
  <button @click="store.randomizeCounter()">Randomize</button>
</template>
```

## Acessando Outras Ações da Memória %{#Accessing-other-stores-actions}%

Para usarmos uma outra memória, podemos _usá-la_ diretamente de dentro da _ação_:

```js
import { useAuthStore } from './auth-store'

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    preferences: null,
    // ...
  }),
  actions: {
    async fetchUserPreferences() {
      const auth = useAuthStore()
      if (auth.isAuthenticated) {
        this.preferences = await fetchPreferences()
      } else {
        throw new Error('User must be authenticated')
      }
    },
  },
})
```

## Uso com a API de Opções %{#Usage-with-the-Options-API}%

<VueSchoolLink
  href="https://vueschool.io/lessons/access-pinia-actions-in-the-options-api"
  title="Acessar os Recuperadores da Pinia através da API de Opções"
/>

Para os seguintes exemplos, podemos assumir que a seguinte memória foi criada:

```js
// Caminho do Ficheiro de Exemplo:
// ./src/stores/counter.js

import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0
  }),
  actions: {
    increment() {
      this.count++
    }
  }
})
```

### Usando com a `setup()` %{#With-setup-}%

Embora a API de Composição não seja para todos, a função gatilho `setup()` pode facilitar o uso da Pinia dentro da API de Opções. Sem a necessidade de funções auxiliares mapeamento adicionais!

```vue
<script>
import { useCounterStore } from '../stores/counter'

export default defineComponent({
  setup() {
    const counterStore = useCounterStore()

    return { counterStore }
  },
  methods: {
    incrementAndPrint() {
      this.counterStore.increment()
      console.log('New Count:', this.counterStore.count)
    },
  },
})
</script>
```

### Usando sem a `setup()` %{#Without-setup-}%

Se preferiríamos não usar a API de Composição, podemos usar a auxiliar `mapActions()` para mapear as propriedades das ações como métodos no nosso componente:

```js
import { mapActions } from 'pinia'
import { useCounterStore } from '../stores/counter'

export default {
  methods: {
    // dar acesso ao `this.increment()` dentro do componente
    // o mesmo que chamar a partir de `store.increment()`
    ...mapActions(useCounterStore, ['increment'])
    // o mesmo que acima exceto que o regista como `this.myOwnName()`
    ...mapActions(useCounterStore, { myOwnName: 'increment' }),
  },
}
```

## Subscrevendo às Ações %{#Subscribing-to-actions}%

É possível observar as ações e seus resultados com `store.$onActions()`. A função de resposta passada à esta é executada antes da própria ação. `after` manipula as promessas e permite-nos executar uma função depois da ação resolver-se. Duma maneira semelhante, `onError` permite-nos executar uma função se a ação lançar um erro ou rejeitar-se. Estas são úteis para rastrear os erros durante a execução, semelhante a [esta dica na documentação da Vue](https://pt.vuejs.org/guide/best-practices/production-deployment#tracking-runtime-errors).

Eis um exemplo que regista antes de executar as ações e depois de resolverem-se ou rejeitarem-se:

```js
const unsubscribe = someStore.$onAction(
  ({
    name, // nome da ação
    store, // instância da memória, o mesmo que `someStore`
    args, // vetor de parâmetros passados à ação
    after, // disparar depois do retorno ou resolução da ação
    onError, // disparar se lançar-se ou rejeitar-se
  }) => {
    // uma variável partilhada para esta chamada de ação especifica
    const startTime = Date.now()
    // isto acionará antes duma ação na `store` ser executada
   console.log(`Start "${name}" with params [${args.join(', ')}].`)

    // isto acionará se a ação for bem-sucedida e
    // depois de ser executada completamente.
    // esta espera por qualquer retorno prometido
    after((result) => {
      console.log(
        `Finished "${name}" after ${
          Date.now() - startTime
        }ms.\nResult: ${result}.`
      )
    })

    // isto acionará se a ação lançar-se ou
    // retornar uma promessa que rejeita-se
    onError((error) => {
      console.warn(
        `Failed "${name}" after ${Date.now() - startTime}ms.\nError: ${error}.`
      )
    })
  }
)

// remover manualmente o ouvinte
unsubscribe()
```

Por padrão, as _subscrições da ação_ estão vinculadas ao componente onde foram adicionadas (se a memória estiver dentro duma `setup()` do componente). Querendo dizer que, serão removidas automaticamente quando o componente for desmontado. Se também quisermos as preservar depois do componente ser desmontado, passamos `true` como segundo argumento para _separar_ a _subscrição da ação_ do componente atual:

```vue
<script setup>
const someStore = useSomeStore()

// esta subscrição será preservada mesmo depois
// do componente ser desmontado
someStore.$onAction(callback, true)
</script>
```
