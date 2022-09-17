---
sidebar: "auto"
editLinks: false
sidebarDepth: 3
---

[Documentação da API](../index.md) / [pinia](../modules/pinia.md) / SubscriptionCallbackMutationPatchFunction

# Interface: SubscriptionCallbackMutationPatchFunction

[pinia](../modules/pinia.md).SubscriptionCallbackMutationPatchFunction

Contexto passado para um resposta de subscrição quando `store.$patch()` é chamada com uma função.

## Hierarquia

- [`_SubscriptionCallbackMutationBase`](pinia._SubscriptionCallbackMutationBase.md)

  ↳ **`SubscriptionCallbackMutationPatchFunction`**

## Propriedades

### events

• **events**: `DebuggerEvent`[]

APENAS DESENVOLVIMENTO. Arranjo de todas as mutações feita dentro da resposta.

#### Definida em

[packages/pinia/src/types.ts:129](https://github.com/vuejs/pinia/blob/2b998ee/packages/pinia/src/types.ts#L129)

___

### storeId

• **storeId**: `string`

`id` da memória que está fazendo a mutação.

#### Herdada de

[_SubscriptionCallbackMutationBase](pinia._SubscriptionCallbackMutationBase.md).[storeId](pinia._SubscriptionCallbackMutationBase.md#storeid)

#### Definida em

[packages/pinia/src/types.ts:81](https://github.com/vuejs/pinia/blob/2b998ee/packages/pinia/src/types.ts#L81)

___

### type

• **type**: [`patchFunction`](../enums/pinia.MutationType.md#patchfunction)

Tipo da mutação

#### Sobreposições

[_SubscriptionCallbackMutationBase](pinia._SubscriptionCallbackMutationBase.md).[type](pinia._SubscriptionCallbackMutationBase.md#type)

#### Definida em

[packages/pinia/src/types.ts:124](https://github.com/vuejs/pinia/blob/2b998ee/packages/pinia/src/types.ts#L124)
