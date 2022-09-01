# Migrando da Vuex <=4

Embora a estrutura da memória de Vuex e Pinia sejam diferentes, muito da lógico pode ser reutilizada. Este guia serve para auxiliar-te através do processo e apontar alguns entendimentos comuns que podem aparecer.


## Preparação

Primeiro, siga o [guia Começar](../getting-started.md) para instalar a Pinia.

## Reestruturando Módulos para as Memórias

A Vuex tem o conceito de uma única memória com vários _módulos_. Estes módulos podem ser opcionalmente nomes reservados e até mesmo encaixados dentro de umas as outras.

A maneira mais fácil para a transição daquele conceito para ser utilizado com a Pinia é de que agora cada módulo que utilizaste anteriormente é agora uma _memória(`store`)_. Cada memória precisa de uma `id` o que é semelhante a um nome reservado na Vuex. Isto significa que cada memória é um nome reservado por padrão. Módulos encaixados também podem cada um tornar-se em sua própria memória. As memórias que dependem umas das outras simplesmente importarão a outra memória.

Como escolhes reestruturar os teus módulos de Vuex para memórias de Pinia depende inteiramente ti, mas cá está uma sugestão:

```bash
# Exemplo da Vuex (assumindo módulos de nomes reservados)
src
└── store
    ├── index.js           # Inicializa a Vuex, importa os módulos
    └── modules
        ├── module1.js     # nome de espaço reservado de 'module1'
        └── nested
            ├── index.js   # nome de espaço reservado de 'nested', importa o module2 e module3
            ├── module2.js # nome de espaço reservado de 'nested/module2'
            └── module3.js # nome de espaço reservado de 'nested/module3'

# Equivalente em Pinia, nota que os `id` correspondem aos anteriores nomes de espaço reservados
src
└── stores
    ├── index.js          # (Opcional) Inicializa a Pinia, não importa as memórias
    ├── module1.js        # id de 'module1'
    ├── nested-module2.js # id de 'nestedModule2'
    ├── nested-module3.js # id de 'nestedModule3'
    └── nested.js         # id de 'nested'
```

Isto cria uma estrutura plana para as memórias mas também preserva os anteriores nomes reservados com os `id` equivalentes. Se tinhas algum estado/recuperadores/ações/mutações na raiz da memória (no ficheiro `store/index.js` de Vuex) podes desejar criar uma outra memória chamada de algo tipo `root` que segura todas aquelas informações.

O diretório para a Pinia é geralmente chamado de `stores` no lugar de `store`. Isto é para enfatizar que a Pinia utiliza várias memórias, no lugar de uma única memória na Vuex.

Para projetos maiores podes desejar realizar esta conversão de módulo por módulo em vez de converter tudo de uma só vez. Tu podes na realidade misturar juntos a Pinia e a Vuex durante a migração assim esta abordagem pode também funcionar e é uma outra razão para a nomeação do diretório da Pinia para `stores`.

## Convertendo um Único Módulo

Aqui está um exemplo completo de antes e depois da conversão de um módulo de Vuex para uma memória de Pinia, consulte abaixo para um guia passo a passo. O exemplo da Pinia utiliza um memória com a sintaxe de opções visto que a estrutura é mais parecida ao da Vuex:

```ts
// Módulo da Vuex no nome de espaço reservado de 'auth/user'
import { Module } from 'vuex'
import { api } from '@/api'
import { RootState } from '@/types' // Se estiveres utilizando uma definição de tipo de Vuex

interface State {
  firstName: string
  lastName: string
  userId: number | null
}

const storeModule: Module<State, RootState> = {
  namespaced: true,
  state: {
    firstName: '',
    lastName: '',
    userId: null
  },
  getters: {
    firstName: (state) => state.firstName,
    fullName: (state) => `${state.firstName} ${state.lastName}`,
    loggedIn: (state) => state.userId !== null,
    // combinar com algum estado de outros módulos
    fullUserDetails: (state, getters, rootState, rootGetters) => {
      return {
        ...state,
        fullName: getters.fullName,
        // ler o estado de um outro módulo nomeado `auth`
        ...rootState.auth.preferences,
        // ler um recuperador de um módulo de nome de espaço reservado chamado de `email` encaixado sob `auth`
        ...rootGetters['auth/email'].details
      }
    }
  },
  actions: {
    async loadUser ({ state, commit }, id: number) {
      if (state.userId !== null) throw new Error('Already logged in')
      const res = await api.user.load(id)
      commit('updateUser', res)
    }
  },
  mutations: {
    updateUser (state, payload) {
      state.firstName = payload.firstName
      state.lastName = payload.lastName
      state.userId = payload.userId
    },
    clearUser (state) {
      state.firstName = ''
      state.lastName = ''
      state.userId = null
    }
  }
}

export default storeModule
```

```ts
// Memória de Pinia
import { defineStore } from 'pinia'
import { useAuthPreferencesStore } from './auth-preferences'
import { useAuthEmailStore } from './auth-email'
import vuexStore from '@/store' // para conversão gradual, consulte o `fullUserDetails`

interface State {
  firstName: string
  lastName: string
  userId: number | null
}

export const useAuthUserStore = defineStore('authUser', {
  // converter para uma função
  state: (): State => ({
    firstName: '',
    lastName: '',
    userId: null
  }),
  getters: {
    // recuperador de `firstName` removido, já não é necessário
    fullName: (state) => `${state.firstName} ${state.lastName}`,
    loggedIn: (state) => state.userId !== null,
    // deves definir o tipo de retorno por causa da utilização do `this`
    fullUserDetails (state): FullUserDetails {
      // importar de outras memórias
      const authPreferencesStore = useAuthPreferencesStore()
      const authEmailStore = useAuthEmailStore()
      return {
        ...state,
        // agora outros recuperadores em `this`
        fullName: this.fullName,
        ...authPreferencesStore.$state,
        ...authEmailStore.details
      }

      // alternativa se outros módulos ainda estiverem na Vuex
      // return {
      //   ...state,
      //   fullName: this.fullName,
      //   ...vuexStore.state.auth.preferences,
      //   ...vuexStore.getters['auth/email'].details
      // }
    }
  },
  actions: {
    // nenhum contexto como primeiro argumento, utilize `this` no lugar
    async loadUser (id: number) {
      if (this.userId !== null) throw new Error('Already logged in')
      const res = await api.user.load(id)
      this.updateUser(res)
    },
    // mutações podem agora tornar-se ações, no lugar de `state` como primeiro argumento utilize `this`
    updateUser (payload) {
      this.firstName = payload.firstName
      this.lastName = payload.lastName
      this.userId = payload.userId
    },
    // reinicie facilmente o estado utilizando `$reset`
    clearUser () {
      this.$reset()
    }
  }
})
```

Vamos decompor o que está acima em passos:

1. Adicionar um `id` obrigatório para a memória, podes desejar manter isto o mesmo como nome de espaço reservado de antes. É recomendado certificar-se de que o `id` seja em _camelCase_ visto que facilita o uso da mesma com a `mapStores()`.
2. Converter o `state` para uma função se já não for uma
3. Converter os `getters`
    1. Remover quaisquer recuperadores que retorna o estado sob o mesmo nome (por exemplo, `firstName: (state) => state.firstName`), não são necessários visto que podes acessar qualquer estado diretamente da instância da memória
    2. Se precisares acessar outros recuperadores, eles estão sobre o `this` no lugar de estarem utilizando o segundo argumento. Lembre-se de que se estiveres utilizando o `this` então terás de utilizar uma função regular no lugar de uma função em flecha. Também nota que precisarás especificar um tipo de retorno por causa das limitações de TypeScript, consulte [aqui](../core-concepts/getters.md#acessando-outros-recuperadores) para mais detalhes
    3. Se estiveres utilizando os argumentos `rootState` ou `rootGetters`, substitui-os diretamente pela importação de outra memória, ou se elas existirem na Vuex então acesse-as diretamente a partir da Vuex
4. Converter as `actions`
    1. Remover o primeiro argumento de `context` de cada ação. No lugar disto, tudo deve ser acessível a partir de `this`
    2. Se estiveres utilizando outras memórias ou importe-as diretamente ou acesse-as na Vuex, o mesmo para os recuperadores (getters)
5. Converter as `mutations`
    1. Mutações não existem mais. Estes podem ser convertidos para `actions` (ações), ou podes apenas atribuir diretamente a memória dentro dos teus componentes (por exemplo, `userStore.firstName = 'First'`)
    2. Se estiveres convertendo para ações, remova o primeiro argumento de `state` e substitua quaisquer atribuições com `this`.
    3. Uma mutação comum é reiniciar o estado de volta para o seu estado inicial. Isto é uma funcionalidade embutida com o método `$reset` da memória. Nota que esta funcionalidade apenas existe para memórias baseadas em opções.

Como podes ver a maior parte do teu código pode ser reutilizado. A segurança de tipo deve também ajudar-te a identificar o que precisa ser mudado se alguma coisa estiver falta.

## Utilização Dentro de Componentes

Agora que a teu módulo de Vuex foi convertido para uma memória de Pinia, qualquer componente ou outro ficheiro que utilize este módulo também precisa ser atualizado.

Se antes estavas utilizando auxiliares de `map` da Vuex, é importante olhar para o [guia de Utilização sem `setup()`](./options-api.md) visto que a maior parte destes auxiliares podem ser reutilizados.

Se estavas utilizando `useStore` então no lugar deste importe a nova memória diretamente e acesse o estado nela. Por exemplo:

```ts
// Vuex
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  setup () {
    const store = useStore()

    const firstName = computed(() => store.state.auth.user.firstName)
    const fullName = computed(() => store.getters['auth/user/fullName'])

    return {
      firstName,
      fullName
    }
  }
})
```

```ts
// Pinia
import { defineComponent, computed } from 'vue'
import { useAuthUserStore } from '@/stores/auth-user'

export default defineComponent({
  setup () {
    const authUserStore = useAuthUserStore()

    const firstName = computed(() => authUserStore.firstName)
    const fullName = computed(() => authUserStore.fullName)

    return {
      // podes também acessar a memória inteira no teu componente ao retorná-la
      authUserStore,
      firstName,
      fullName
    }
  }
})
```

## Utilização Fora de Componentes

A atualização da utilização fora de componentes deve ser simples enquanto fores cuidadoso em _não utilizar uma memória fora de funções_. Aqui está um exemplo de utilização da memória em uma sentinela de navegação de Vue Router:

```ts
// Vuex
import vuexStore from '@/store'

router.beforeEach((to, from, next) => {
  if (vuexStore.getters['auth/user/loggedIn']) next()
  else next('/login')
})
```

```ts
// Pinia
import { useAuthUserStore } from '@/stores/auth-user'

router.beforeEach((to, from, next) => {
  // Deve ser utilizada dentro da função!
  const authUserStore = useAuthUserStore()
  if (authUserStore.loggedIn) next()
  else next('/login')
})
```

Mais detalhes podem ser encontrados [aqui](../core-concepts/outside-component-usage.md).

## Utilização Avançada da Vuex 

No caso de teu memória de Vuex estiver utilizando algumas das funcionalidades mais avançadas que ela oferece, aqui está alguma orientação de como conseguir o mesmo em Pinia. Alguns destes pontos já estão cobertos neste [sumário de comparação](../introduction.md#comparação-com-a-vuex-3x4x).

### Módulos Dinâmicos

Não há necessidade de dinamicamente registar módulos na Pinia. As memórias são dinâmicas por padrão e são apenas registadas quando elas são necessárias. Se uma memória nunca for utilizada, nunca será "registada".

### Substituição de Módulo Instantânea

Substituição de Módulo Instantânea (HMR, sigla em Inglês) também é suportada mas precisará ser substituída, consulte o [guia de HMR](./hot-module-replacement.md).

### Extensões

Se utilizas uma extensão de Vuex publica então verifique se há uma alternativa para Pinia. Se não precisarás escrever a tua própria ou avaliar se a extensão continua a ser necessária.

Se tiveres escrito uma extensão por ti mesmo, então pode provavelmente ser atualizada para funcionar com a Pinia. Consulte a [Guia de Extensão](../core-concepts/plugins.md).
