---
sidebar: "auto"
editLinks: false
sidebarDepth: 3
---

[Documentação da API](../index.md) / [pinia](../modules/pinia.md) / DefineStoreOptionsInPlugin

# Interface: DefineStoreOptionsInPlugin<Id, S, G, A\>

[pinia](../modules/pinia.md).DefineStoreOptionsInPlugin

`options` disponíveis quando se está criando uma extensão de pinia.

## Parâmetros de tipo

| Nome | Tipo |
| :------ | :------ |
| `Id` | extends `string` |
| `S` | extends [`StateTree`](../modules/pinia.md#statetree) |
| `G` | `G` |
| `A` | `A` |

## Hierarquia

- `Omit`<[`DefineStoreOptions`](pinia.DefineStoreOptions.md)<`Id`, `S`, `G`, `A`\>, ``"id"`` \| ``"actions"``\>

  ↳ **`DefineStoreOptionsInPlugin`**

## Propriedades

### actions

• **actions**: `A`

Objeto extraído das ações. Adicionado pelo `useStore()` quando a memória for construída utilizando a API de composições, caso contrário utiliza aquele passado para `defineStore()`.

#### Definida em

[packages/pinia/src/types.ts:721](https://github.com/vuejs/pinia/blob/2b998ee/packages/pinia/src/types.ts#L721)

___

### getters

• `Optional` **getters**: `G` & `ThisType`<`UnwrapRef`<`S`\> & [`_StoreWithGetters`](../modules/pinia.md#_storewithgetters)<`G`\> & [`PiniaCustomProperties`](pinia.PiniaCustomProperties.md)<`string`, [`StateTree`](../modules/pinia.md#statetree), [`_GettersTree`](../modules/pinia.md#_getterstree)<[`StateTree`](../modules/pinia.md#statetree)\>, [`_ActionsTree`](../modules/pinia.md#_actionstree)\>\> & [`_GettersTree`](../modules/pinia.md#_getterstree)<`S`\>

Objeto opcional de recuperadores.

#### Herdado de

Omit.getters

#### Definida em

[packages/pinia/src/types.ts:645](https://github.com/vuejs/pinia/blob/2b998ee/packages/pinia/src/types.ts#L645)

## Métodos

### hydrate

▸ `Optional` **hydrate**(`storeState`, `initialState`): `void`

Permite a hidratação da memória durante a interpretação feita no lado do servidor quando estado complexo (como aqueles que apenas lado do cliente faz referência) são utilizados na definição da memória e copiar o valor de `pinia.state` não é suficiente.

**`exemplo`**
Se no teu `state`, utilizares quaisquer `customRef`, `computed`, ou `ref` que tem um valor diferente no servidor e cliente, precisas hidratá-los manualmente, por exemplo, uma referência personalizada que está guardada no armazenamento local:

```ts
const useStore = defineStore('main', {
  state: () => ({
    n: useLocalStorage('key', 0)
  }),
  hydrate(storeState, initialState) {
    // @ts-expect-error: https://github.com/microsoft/TypeScript/issues/43826
    storeState.n = useLocalStorage('key', 0)
  }
})
```

#### Parâmetros

| Nome | Tipo | Descrição |
| :------ | :------ | :------ |
| `storeState` | `UnwrapRef`<`S`\> | o estado atual na memória |
| `initialState` | `UnwrapRef`<`S`\> | initialState ou estado inicial |

#### Retorna

`void`

#### Herdada de

Omit.hydrate

#### Definida em

[packages/pinia/src/types.ts:685](https://github.com/vuejs/pinia/blob/2b998ee/packages/pinia/src/types.ts#L685)

___

### state

▸ `Optional` **state**(): `S`

Função para criar um novo estado. **Deve ser uma função em flecha** para garantir digitações correta!

#### Retorna

`S`

#### Herdado de

Omit.state

#### Definida em

[packages/pinia/src/types.ts:640](https://github.com/vuejs/pinia/blob/2b998ee/packages/pinia/src/types.ts#L640)
