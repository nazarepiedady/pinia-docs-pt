---
sidebar: "auto"
editLinks: false
sidebarDepth: 3
---

[Documentação da API](../index.md) / [pinia](../modules/pinia.md) / PiniaPluginContext

# Interface: PiniaPluginContext<Id, S, G, A\>

[pinia](../modules/pinia.md).PiniaPluginContext

Argumento de contexto passado para as extensões de Pinia.

## Parâmetros de tipo

| Nome | Tipo |
| :------ | :------ |
| `Id` | extends `string` = `string` |
| `S` | extends [`StateTree`](../modules/pinia.md#statetree) = [`StateTree`](../modules/pinia.md#statetree) |
| `G` | [`_GettersTree`](../modules/pinia.md#_getterstree)<`S`\> |
| `A` | [`_ActionsTree`](../modules/pinia.md#_actionstree) |

## Propriedades

### app

• **app**: `App`<`any`\>

Aplicação atual criada com `Vue.createApp()`.

#### Definida em

[packages/pinia/src/rootStore.ts:117](https://github.com/vuejs/pinia/blob/2b998ee/packages/pinia/src/rootStore.ts#L117)

___

### options

• **options**: [`DefineStoreOptionsInPlugin`](pinia.DefineStoreOptionsInPlugin.md)<`Id`, `S`, `G`, `A`\>

Objeto de opções definindo a memória passada para `defineStore()`.

#### Definida em

[packages/pinia/src/rootStore.ts:127](https://github.com/vuejs/pinia/blob/2b998ee/packages/pinia/src/rootStore.ts#L127)

___

### pinia

• **pinia**: [`Pinia`](pinia.Pinia.md)

Instância de pinia.

#### Definida em

[packages/pinia/src/rootStore.ts:112](https://github.com/vuejs/pinia/blob/2b998ee/packages/pinia/src/rootStore.ts#L112)

___

### store

• **store**: [`Store`](../modules/pinia.md#store)<`Id`, `S`, `G`, `A`\>

Memória atual sendo estendida.

#### Definida em

[packages/pinia/src/rootStore.ts:122](https://github.com/vuejs/pinia/blob/2b998ee/packages/pinia/src/rootStore.ts#L122)
