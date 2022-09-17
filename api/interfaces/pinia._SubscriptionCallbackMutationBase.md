---
sidebar: "auto"
editLinks: false
sidebarDepth: 3
---

[Documentação da API](../index.md) / [pinia](../modules/pinia.md) / \_SubscriptionCallbackMutationBase

# Interface: \_SubscriptionCallbackMutationBase

[pinia](../modules/pinia.md)._SubscriptionCallbackMutationBase

Tipo base para o contexto passado para uma resposta de subscrição. Tipo interno.

## Hierarquia

- **`_SubscriptionCallbackMutationBase`**

  ↳ [`SubscriptionCallbackMutationDirect`](pinia.SubscriptionCallbackMutationDirect.md)

  ↳ [`SubscriptionCallbackMutationPatchFunction`](pinia.SubscriptionCallbackMutationPatchFunction.md)

  ↳ [`SubscriptionCallbackMutationPatchObject`](pinia.SubscriptionCallbackMutationPatchObject.md)

## Propriedades

### storeId

• **storeId**: `string`

`id` da memória que está fazendo a mutação.

#### Definida em

[packages/pinia/src/types.ts:81](https://github.com/vuejs/pinia/blob/2b998ee/packages/pinia/src/types.ts#L81)

___

### type

• **type**: [`MutationType`](../enums/pinia.MutationType.md)

Tipo da mutação

#### Definida em

[packages/pinia/src/types.ts:76](https://github.com/vuejs/pinia/blob/2b998ee/packages/pinia/src/types.ts#L76)
