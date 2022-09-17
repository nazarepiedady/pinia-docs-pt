---
sidebar: "auto"
editLinks: false
sidebarDepth: 3
---

[Documentação da API](../index.md) / [pinia](../modules/pinia.md) / StoreDefinition

# Interface: StoreDefinition<Id, S, G, A\>

[pinia](../modules/pinia.md).StoreDefinition

## Parâmetros de tipo

| Nome | Tipo |
| :------ | :------ |
| `Id` | extends `string` = `string` |
| `S` | extends [`StateTree`](../modules/pinia.md#statetree) = [`StateTree`](../modules/pinia.md#statetree) |
| `G` | [`_GettersTree`](../modules/pinia.md#_getterstree)<`S`\> |
| `A` | [`_ActionsTree`](../modules/pinia.md#_actionstree) |

## Invocável

### StoreDefinition

▸ **StoreDefinition**(`pinia?`, `hot?`): [`Store`](../modules/pinia.md#store)<`Id`, `S`, `G`, `A`\>

Retorna uma memória, cria ela se necessário.

#### Parâmetros

| Nome | Tipo | Descrição |
| :------ | :------ | :------ |
| `pinia?` | ``null`` \| [`Pinia`](pinia.Pinia.md) | Instância de pinia para recuperar a memória |
| `hot?` | [`StoreGeneric`](../modules/pinia.md#storegeneric) | substituição de módulo instantânea apenas para desenvolvimento |

#### Retorna

[`Store`](../modules/pinia.md#store)<`Id`, `S`, `G`, `A`\>

#### Definida em

[packages/pinia/src/types.ts:511](https://github.com/vuejs/pinia/blob/2b998ee/packages/pinia/src/types.ts#L511)

## Propriedades

### $id

• **$id**: `Id`

Id da memória. Utilizada pelos auxiliares de delineamento.

#### Definida em

[packages/pinia/src/types.ts:516](https://github.com/vuejs/pinia/blob/2b998ee/packages/pinia/src/types.ts#L516)
