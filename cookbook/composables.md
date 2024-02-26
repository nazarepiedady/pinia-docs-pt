# Lidando com Funções de Composição {#Dealing-with-Composables}

As [funções de composição](https://pt.vuejs.org/guide/reusability/composables#composables) são funções aproveitam a API de Composição da Vue para encapsular e reutilizar a lógica com estado. Quer escrevamos as nossas próprias bibliotecas, usemos [bibliotecas externas](https://vueuse.org/) ou façamos ambas, podemos usar plenamente o poder das funções de composição nas nossas memórias da pinia.

## Memórias Baseadas em Opções

Quando estiveres definindo uma memória baseada opções, tu podes chamar uma constituível dentro da propriedade `state`:

```ts
export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: useLocalStorage('pinia/auth/login', 'bob'),
  }),
})
```

Lembre-se de que **só podes retornar estado gravável** (por exemplo, uma `ref()`). Cá está alguns exemplos de constituíveis que podes utilizar:

- [`useLocalStorage`](https://vueuse.org/core/useLocalStorage/)
- [`useAsyncState`](https://vueuse.org/core/useAsyncState/)

Cá está alguns exemplos de constituíveis que não podem ser utilizadas em memórias baseadas em opções (mas podem ser utilizadas com memórias baseadas em composições):

- [`useMediaControls`](https://vueuse.org/core/useMediaControls/): expõe funções
- [`useMemoryInfo`](https://vueuse.org/core/useMemory/): expõe dados de somente leitura
- [`useEyeDropper`](https://vueuse.org/core/useEyeDropper/): expõe dados e funções de somente leitura

## Memórias Baseadas em Composições

Por outro lado, quando estiveres definindo uma memória baseada em composições, tu podes utilizar quase qualquer constituível desde que toda propriedade seja discernida dentro do estado, da ação, ou recuperador:

```ts
import { defineStore, skipHydrate } from 'pinia'
import { useMediaControls } from '@vueuse/core'

export const useVideoPlayer = defineStore('video', () => {
  // não iremos expor este elemento diretamente
  const videoElement = ref<HTMLVideoElement>()
  const src = ref('/data/video.mp4')
  const { playing, volume, currentTime, togglePictureInPicture } =
    useMediaControls(video, { src })
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

## SSR

Quando estiveres lidando com a [Interpretação no Lado do Servidor (SSR, sigla em Inglês)](../ssr/index.md), tu precisas considerar algumas etapas extras para utilizares os constituíveis dentro das tuas memórias.

Nas [Memórias baseadas em Opções](#memórias-baseadas-em-opções), tu precisas definir uma função `hydrate()`. Esta função é chamada quando a memória for instanciada no cliente (o navegador) quando houver um estado inicial disponível no momento em que a memória for criada. A razão de nós precisarmos definir esta função é que em tal cenário, `state()` não é chamada.

```ts
import { defineStore, skipHydrate } from 'pinia'
import { useLocalStorage } from '@vueuse/core'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: useLocalStorage('pinia/auth/login', 'bob'),
  }),
  hydrate(state, initialState) {
    // neste caso podemos ignorar completamente o estado inicial
    // visto que queremos ler o valor a partir do navegador
    state.user = useLocalStorage('pinia/auth/login', 'bob')
  },
})
```

Nas [Memórias baseadas em Composições](#memórias-baseadas-em-composições), tu precisas utilizar um auxiliar com o nome `skipHydrate()` em qualquer propriedade de estado que não deveria ser buscada no estado inicial. Diferentemente das memórias baseadas em opções, as memórias baseadas em composições só não podem _ignorar a chamada de `state()`_, então nós marcamos as propriedades que não podem ser hidratadas com `skipHydrate()`. Nota que isto só se aplica às propriedades reativas graváveis:

```ts
import { defineStore, skipHydrate } from 'pinia'
import { useEyeDropper, useLocalStorage } from '@vueuse/core'

export const useColorStore = defineStore('colors', () => {
  const { isSupported, open, sRGBHex } = useEyeDropper()
  const lastColor = useLocalStorage('lastColor', sRGBHex)
  // ...
  return {
    lastColor: skipHydrate(lastColor), // Ref<string>
    open, // Função
    isSupported, // booleano (não sequer é reativo)
  }
})
```
