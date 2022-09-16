---
sidebar: "auto"
editLinks: false
sidebarDepth: 3
---

[Documentação da API](../index.md) / [pinia](../modules/pinia.md) / PiniaPlugin

# Interface: PiniaPlugin

[pinia](../modules/pinia.md).PiniaPlugin

## Invocável

### PiniaPlugin

▸ **PiniaPlugin**(`context`): `void` \| `Partial`<[`PiniaCustomProperties`](pinia.PiniaCustomProperties.md)<`string`, [`StateTree`](../modules/pinia.md#statetree), [`_GettersTree`](../modules/pinia.md#_getterstree)<[`StateTree`](../modules/pinia.md#statetree)\>, [`_ActionsTree`](../modules/pinia.md#_actionstree)\> & `PiniaCustomStateProperties`<[`StateTree`](../modules/pinia.md#statetree)\>\>

Extensão para estender toda memória. Retorna um objeto para estender a 
memória ou não retorna nada.

#### Parâmetros

| Nome | Tipo | Descrição |
| :------ | :------ | :------ |
| `context` | [`PiniaPluginContext`](pinia.PiniaPluginContext.md)<`string`, [`StateTree`](../modules/pinia.md#statetree), [`_GettersTree`](../modules/pinia.md#_getterstree)<[`StateTree`](../modules/pinia.md#statetree)\>, [`_ActionsTree`](../modules/pinia.md#_actionstree)\> | Contexto |

#### Retorna

`void` \| `Partial`<[`PiniaCustomProperties`](pinia.PiniaCustomProperties.md)<`string`, [`StateTree`](../modules/pinia.md#statetree), [`_GettersTree`](../modules/pinia.md#_getterstree)<[`StateTree`](../modules/pinia.md#statetree)\>, [`_ActionsTree`](../modules/pinia.md#_actionstree)\> & `PiniaCustomStateProperties`<[`StateTree`](../modules/pinia.md#statetree)\>\>

#### Definida em

[packages/pinia/src/rootStore.ts:140](https://github.com/vuejs/pinia/blob/2b998ee/packages/pinia/src/rootStore.ts#L140)
