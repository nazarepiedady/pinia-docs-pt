---
sidebar: "auto"
editLinks: false
sidebarDepth: 3
---

[Documentação da API](../index.md) / [pinia](../modules/pinia.md) / DefineSetupStoreOptions

# Interface: DefineSetupStoreOptions<Id, S, G, A\>

[pinia](../modules/pinia.md).DefineSetupStoreOptions

Parâmetro de opções de `defineStore()` para memórias baseadas em composições. Podem ser estendidas para aumentar as memórias com a API de extensão. @see [DefineStoreOptionsBase](pinia.DefineStoreOptionsBase.md).

## Parâmetros de tipo

| Nome | Tipo |
| :------ | :------ |
| `Id` | extends `string` |
| `S` | extends [`StateTree`](../modules/pinia.md#statetree) |
| `G` | `G` |
| `A` | `A` |

## Hierarquia

- [`DefineStoreOptionsBase`](pinia.DefineStoreOptionsBase.md)<`S`, [`Store`](../modules/pinia.md#store)<`Id`, `S`, `G`, `A`\>\>

  ↳ **`DefineSetupStoreOptions`**

## Propriedades

### actions

• `Optional` **actions**: `A`


Ações extraídas. Adicionada pelo `useStore()`. NÃO DEVE ser adicionada pelo utilizador quando estiver criando a memória. Podem ser utilizadas em extensões para receber a lista de ações em uma memória definida com uma função de composição. Nota que este sempre é definido

#### Definida em

[packages/pinia/src/types.ts:704](https://github.com/vuejs/pinia/blob/2b998ee/packages/pinia/src/types.ts#L704)
