---
sidebar: "auto"
editLinks: false
sidebarDepth: 3
---

[Documentação da API](../index.md) / [pinia](../modules/pinia.md) / DefineStoreOptions

# Interface: DefineStoreOptions<Id, S, G, A\>

[pinia](../modules/pinia.md).DefineStoreOptions

Parâmetro de opções de `defineStore()` para memórias baseadas em opções. Pode ser estendido para aumentar as memórias com a API de extensão. @see [DefineStoreOptionsBase](pinia.DefineStoreOptionsBase.md).

## Parâmetros de tipo

| Nome | Tipo |
| :------ | :------ |
| `Id` | extends `string` |
| `S` | extends [`StateTree`](../modules/pinia.md#statetree) |
| `G` | `G` |
| `A` | `A` |

## Hierarquia

- [`DefineStoreOptionsBase`](pinia.DefineStoreOptionsBase.md)<`S`, [`Store`](../modules/pinia.md#store)<`Id`, `S`, `G`, `A`\>\>

  ↳ **`DefineStoreOptions`**

## Propriedades

### actions

• `Optional` **actions**: `A` & `ThisType`<`A` & `UnwrapRef`<`S`\> & [`_StoreWithState`](pinia._StoreWithState.md)<`Id`, `S`, `G`, `A`\> & [`_StoreWithGetters`](../modules/pinia.md#_storewithgetters)<`G`\> & [`PiniaCustomProperties`](pinia.PiniaCustomProperties.md)<`string`, [`StateTree`](../modules/pinia.md#statetree), [`_GettersTree`](../modules/pinia.md#_getterstree)<[`StateTree`](../modules/pinia.md#statetree)\>, [`_ActionsTree`](../modules/pinia.md#_actionstree)\>\>

Objeto opcional de ações.

#### Definida em

[packages/pinia/src/types.ts:652](https://github.com/vuejs/pinia/blob/2b998ee/packages/pinia/src/types.ts#L652)

___

### getters

• `Optional` **getters**: `G` & `ThisType`<`UnwrapRef`<`S`\> & [`_StoreWithGetters`](../modules/pinia.md#_storewithgetters)<`G`\> & [`PiniaCustomProperties`](pinia.PiniaCustomProperties.md)<`string`, [`StateTree`](../modules/pinia.md#statetree), [`_GettersTree`](../modules/pinia.md#_getterstree)<[`StateTree`](../modules/pinia.md#statetree)\>, [`_ActionsTree`](../modules/pinia.md#_actionstree)\>\> & [`_GettersTree`](../modules/pinia.md#_getterstree)<`S`\>

Objeto opcional de recuperadores.

#### Definida em

[packages/pinia/src/types.ts:645](https://github.com/vuejs/pinia/blob/2b998ee/packages/pinia/src/types.ts#L645)

___

### id

• **id**: `Id`

Chave única em sequência de caracteres para identificar a memória através da aplicação.

#### Definida em

[packages/pinia/src/types.ts:634](https://github.com/vuejs/pinia/blob/2b998ee/packages/pinia/src/types.ts#L634)

## Métodos

### hydrate

▸ `Optional` **hydrate**(`storeState`, `initialState`): `void`

Permite hidratar a memória durante a SSR quando um estado complexo (como aquele que só o lado do cliente faz referência) são utilizados na definição da memória e copiar o valor de `pinia.state` não é o suficiente.

**`exemplo`**
Se no teu `state`, utilizares algum `customRef`, algum `computed`, ou algum `ref` que têm um valor diferente no Servidor e no Cliente, precisas hidratá-los manualmente. Por exemplo, uma referência personalizada que é guardada no armazenamento local:

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
| `initialState` | `UnwrapRef`<`S`\> | initialState |

#### Retorna

`void`

#### Definida em

[packages/pinia/src/types.ts:685](https://github.com/vuejs/pinia/blob/2b998ee/packages/pinia/src/types.ts#L685)

___

### state

▸ `Optional` **state**(): `S`

Função para criar um novo estado. **Deve ser uma função em flecha** para digitações corretas!

#### Retorna

`S`

#### Definida em

[packages/pinia/src/types.ts:640](https://github.com/vuejs/pinia/blob/2b998ee/packages/pinia/src/types.ts#L640)
