# Ações (`actions`)

As ações são as equivalentes dos [métodos](https://v3.vuejs.org/guide/data-methods.html#methods) em componentes. Elas podem ser definidas com a propriedade `actions` em `defineStore()` e **elas são perfeitas para definir a lógica do negócio**:

```js
export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
  }),
  actions: {
    // visto que dependemos de `this`, não podemos utilizar uma função em flecha (arrow)
    increment() {
      this.count++
    },
    randomizeCounter() {
      this.count = Math.round(100 * Math.random())
    },
  },
})
```

Tal como os [recuperadores (`getters`)](./getters.md), as ações tem acesso a _instância da memória inteira_ através de `this` com **suporte total de tipos (e conclusão automática ✨)**. **Ao contrário dos recuperadores, as `ações` podem ser assíncronas**, tu podes `esperar` dentro das ações qualquer chamada de API ou até mesmo outras ações! Cá está um exemplo utilizando [Mande](https://github.com/posva/mande). Nota que a biblioteca que utilizas não importa, contanto que recebas uma `Promessa`, poderias até mesmo utilizar a função `fetch` nativa (no navegador apenas):

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
        // deixe o componente de formulário exibir o erro
        return error
      }
    },
  },
})
```

Tu também estás completamente livre para definir quaisquer argumentos que quiseres e retornares qualquer coisa. Quando estiveres a chamar as ações, tudo será automaticamente inferido!

As ações são invocadas tal como os métodos:

```js
export default defineComponent({
  setup() {
    const store = useCounterStore()
    // chama a ação como um método da memória
    store.randomizeCounter()

    return {}
  },
})
```

## Acessando outras ações de memórias

Para utilizar uma outra memória, podes _utilizá-la_ diretamente dentro da _ação_:

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

## Utilização com `setup()`

Tu podes chamar diretamente qualquer ação como um método da memória:

```js
export default {
  setup() {
    const store = useStore()

    store.randomizeCounter()
  },
}
```

## Utilização com API de Opções

Para os seguintes exemplos, podes assumir que a seguinte memória foi criada:

```js
// Caminho do Ficheiro de Exemplo:
// ./src/stores/counterStore.js

import { defineStore } from 'pinia'

const useCounterStore = defineStore('counterStore', {
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

### Com `setup()`

Apesar de a API de Composição não ser para todos, o gatilho `setup()` pode tornar a utilização da Pinia mais fácil de se trabalhar dentro da API de Opções. Sem a necessidade de funções auxiliares de delinear adicionais!

```js
import { useCounterStore } from '../stores/counterStore'

export default {
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
}
```

### Sem `setup()`

Se preferirias não utilizar a API de Composição, podes utilizar a auxiliar `mapActions()` para delinear as propriedades de ações como métodos dentro do teu componente:

```js
import { mapActions } from 'pinia'
import { useCounterStore } from '../stores/counterStore'

export default {
  methods: {
    // dá acesso ao `this.increment()` dentro do componente
    // o mesmo que chamar a partir do `store.increment()`
    ...mapActions(useCounterStore, ['increment'])
    // o mesmo que acima exceto que regista-o como `this.myOwnName()`
    ...mapActions(useCounterStore, { myOwnName: 'increment' }),
  },
}
```

## Subscrevendo às ações

É possível observar as ações e seus resultados com `store.$onActions()`. A função de resposta passada para ela é executada antes da própria ação. O `after` manipula as promessas e permite-te executar uma função depois de resolver a ação. De uma maneira semelhante, o `onError` permite-te executar uma função se a ação lançar ou rejeitar. Estes são úteis para rastrear erros em tempo de execução, parecida com [esta dica na documentação da Vue](https://v3.vuejs.org/guide/tooling/deployment.html#tracking-runtime-errors).

Cá está um exemplo que regista antes da execução das ações e depois de elas resolverem ou rejeitarem.

```js
const unsubscribe = someStore.$onAction(
  ({
    name, // nome da ação
    store, // instância da memória, o mesmo que `someStore`
    args, // arranjo de parâmetros passados para a ação
    after, // aciona depois do retorno ou resolução da ação
    onError, // aciona se lançar ou rejeitar a ação
  }) => {
    // uma variável partilhada para esta chamada de ação especifica
    const startTime = Date.now()
    // isto acionará antes de uma ação na memória (`store`) ser executada
    console.log(`Start "${name}" with params [${args.join(', ')}].`)

    // isto acionará se a ação for bem-sucedida e depois dela ter sido executada completamente.
    // ele espera por qualquer retorno prometido
    after((result) => {
      console.log(
        `Finished "${name}" after ${
          Date.now() - startTime
        }ms.\nResult: ${result}.`
      )
    })

    // isto acionará se a ação lançar ou retornar uma promessa que rejeita
    onError((error) => {
      console.warn(
        `Failed "${name}" after ${Date.now() - startTime}ms.\nError: ${error}.`
      )
    })
  }
)

// remove o ouvinte manualmente
unsubscribe()
```

Por padrão, as _subscrições da ação_ estão presas ao componente onde elas são adicionadas (se a memória está dentro de uma `setup()` do componente). Querendo dizer que, elas serão automaticamente removidas quando o componente for desmontado. Se também quiseres preservá-las depois do componente ser desmontado, passe `true` como segundo argumento para _separar_ a _subscrição da ação_ do componente actual:

```js
export default {
  setup() {
    const someStore = useSomeStore()

    // esta subscrição será preservada mesmo depois do componente ser desmontado
    someStore.$onAction(callback, true)

    // ...
  },
}
```
