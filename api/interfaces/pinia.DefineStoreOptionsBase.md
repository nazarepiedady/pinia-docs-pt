---
sidebar: "auto"
editLinks: false
sidebarDepth: 3
---

[Documentação da API](../index.md) / [pinia](../modules/pinia.md) / DefineStoreOptionsBase

# Interface: DefineStoreOptionsBase<S, Store\>

[pinia](../modules/pinia.md).DefineStoreOptionsBase

Opções passadas para `defineStore()` que são comuns entre as memórias baseadas em composições e memórias baseadas em opções. Estende esta interface se quiseres adicionar opções personalizadas para ambos tipos de memórias.

## Parâmetros de tipo

| Nome | Tipo |
| :------ | :------ |
| `S` | extends [`StateTree`](../modules/pinia.md#statetree) |
| `Store` | `Store` |

## Hierarquia

- **`DefineStoreOptionsBase`**

  ↳ [`DefineStoreOptions`](pinia.DefineStoreOptions.md)

  ↳ [`DefineSetupStoreOptions`](pinia.DefineSetupStoreOptions.md)
