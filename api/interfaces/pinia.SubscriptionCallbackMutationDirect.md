---
sidebar: "auto"
editLinks: false
sidebarDepth: 3
---

[Documentação da API](../index.md) / [pinia](../modules/pinia.md) / SubscriptionCallbackMutationDirect

# Interface: SubscriptionCallbackMutationDirect

[pinia](../modules/pinia.md).SubscriptionCallbackMutationDirect

Contexto passado para uma resposta de subscrição quando se faz uma mutação direta do estado de uma memória com `store.someState = newValue` ou `store.$state.someState = newValue`.

## Hierarquia

- [`_SubscriptionCallbackMutationBase`](pinia._SubscriptionCallbackMutationBase.md)

  ↳ **`SubscriptionCallbackMutationDirect`**

## Propriedades

### events

• **events**: `DebuggerEvent`

APENAS EM DESENVOLVIMENTO. Diferentes chamadas de mutação.

#### Definida em

[packages/pinia/src/types.ts:96](https://github.com/vuejs/pinia/blob/2b998ee/packages/pinia/src/types.ts#L96)

___

### storeId

• **storeId**: `string`

`id` da memória que está fazendo a mutação.

#### Herdado de

[_SubscriptionCallbackMutationBase](pinia._SubscriptionCallbackMutationBase.md).[storeId](pinia._SubscriptionCallbackMutationBase.md#storeid)

#### Definida em

[packages/pinia/src/types.ts:81](https://github.com/vuejs/pinia/blob/2b998ee/packages/pinia/src/types.ts#L81)

___

### type

• **type**: [`direct`](../enums/pinia.MutationType.md#direct)

Tipo da mutação

#### Sobreposições

[_SubscriptionCallbackMutationBase](pinia._SubscriptionCallbackMutationBase.md).[type](pinia._SubscriptionCallbackMutationBase.md#type)

#### Definida em

[packages/pinia/src/types.ts:91](https://github.com/vuejs/pinia/blob/2b998ee/packages/pinia/src/types.ts#L91)
