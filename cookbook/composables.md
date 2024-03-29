# Lidando com Funções de Composição %{#Dealing-with-Composables}%

As [funções de composição](https://pt.vuejs.org/guide/reusability/composables#composables) são funções aproveitam a API de Composição da Vue para encapsular e reutilizar a lógica com estado. Quer escrevamos as nossas próprias bibliotecas, usemos [bibliotecas externas](https://vueuse.org/) ou façamos ambas, podemos usar plenamente o poder das funções de composição nas nossas memórias da pinia.

## Memórias de Opções %{#Option-Stores}%

Quando definimos uma memória de opções, podemos chamar função de composição dentro da propriedade `state`:

```ts
export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: useLocalStorage('pinia/auth/login', 'bob'),
  }),
})
```

Tenha em mente que **só podemos retornar estado gravável** (por exemplo, uma `ref()`). Eis alguns exemplos de funções de composição que podemos usar:

- [`useLocalStorage`](https://vueuse.org/core/useLocalStorage/)
- [`useAsyncState`](https://vueuse.org/core/useAsyncState/)

Eis alguns exemplos de funções de composição que não podem ser usadas em memórias de opções (mas podem ser usadas com as memórias de configuração):

- [`useMediaControls`](https://vueuse.org/core/useMediaControls/): expõe funções
- [`useMemoryInfo`](https://vueuse.org/core/useMemory/): expõe dados que só podem ser lidos
- [`useEyeDropper`](https://vueuse.org/core/useEyeDropper/): expõe dados e funções que só podem ser lidos

## Memórias de Configuração %{#Setup-Stores}%

Por outro lado, ao definir uma memória de configuração, podemos usar quase qualquer função de composição, uma vez que cada propriedade é discernida por um estado, uma ação ou recuperadora: 

```ts
import { defineStore, skipHydrate } from 'pinia'
import { useMediaControls } from '@vueuse/core'

export const useVideoPlayer = defineStore('video', () => {
  // não exporemos (retornaremos) este elemento diretamente
  const videoElement = ref<HTMLVideoElement>()
  const src = ref('/data/video.mp4')
  const { playing, volume, currentTime, togglePictureInPicture } =
    useMediaControls(videoElement, { src })

  function loadVideo(element: HTMLVideoElement, src: string) {
    videoElement.value = element
    src.value = src
  }

  return {
    src,
    playing,
    volume,
    currentTime,

    loadVideo,
    togglePictureInPicture,
  }
})
```

:::warning AVISO
Diferente do estado normal, `ref<HTMLVideoElement>()` contém uma referência que não é normalizável para o elemento do DOM. É por isso que não a retornamos diretamente. Já que é um estado apenas para o cliente, sabemos que este não será definido no servidor e **sempre** começará como `undefined` no cliente.
:::

## Interpretação do Lado do Servidor %{#SSR}%

Quando lidamos com a [Interpretação do Lado do Servidor](../ssr/index), precisamos de ter em atenção alguns passos adicionais para podermos usar as funções de composição nas nossas memórias.

Nas [Memórias de Opções](#Option-Stores), precisamos definir uma função `hydrate()`. Esta função é chamada quando uma memória é instanciada no cliente (o navegador) quando existe um estado inicial disponível no momento em que a memória é criada. A razão pela qual precisamos definir essa função é porque, neste cenário, `state()` não é chamada:

```ts
import { defineStore, skipHydrate } from 'pinia'
import { useLocalStorage } from '@vueuse/core'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: useLocalStorage('pinia/auth/login', 'bob'),
  }),

  hydrate(state, initialState) {
    // neste caso, podemos ignorar completamente o estado
    // inicial, uma vez que queremos ler o valor do navegador
    state.user = useLocalStorage('pinia/auth/login', 'bob')
  },
})
```

Nas [Memórias de Configuração](#Setup-Stores), precisamos usar uma auxiliar chamada `skipHydrate()` em qualquer propriedade de estado que não deva ser retirada do estado inicial. Diferentemente das memórias de opções, as memórias de configuração não podem simplesmente _pular a chamada `state()`_, então marcamos as propriedades que não podem ser hidratadas com `skipHydrate()`. Nota que isto só se aplica as propriedades reativas graváveis:

```ts
import { defineStore, skipHydrate } from 'pinia'
import { useEyeDropper, useLocalStorage } from '@vueuse/core'

export const useColorStore = defineStore('colors', () => {
  const { isSupported, open, sRGBHex } = useEyeDropper()
  const lastColor = useLocalStorage('lastColor', sRGBHex)
  // ...
  return {
    lastColor: skipHydrate(lastColor), // Ref<string>
    open, // Function
    isSupported, // boolean (nem sequer reativo)
  }
})
```
