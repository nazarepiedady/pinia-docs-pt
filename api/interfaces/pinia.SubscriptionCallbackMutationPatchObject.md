---
sidebar: "auto"
editLinks: false
sidebarDepth: 3
---

[Documentação da API](../index.md) / [pinia](../modules/pinia.md) / SubscriptionCallbackMutationPatchObject

# Interface: SubscriptionCallbackMutationPatchObject<S\>

[pinia](../modules/pinia.md).SubscriptionCallbackMutationPatchObject

Contexto passado para uma resposta de subscrição quando `store.$patch()` é chamada com um objeto.

## Parâmetros de tipo

| Nome |
| :------ |
| `S` |

## Hierarquia

- [`_SubscriptionCallbackMutationBase`](pinia._SubscriptionCallbackMutationBase.md)

  ↳ **`SubscriptionCallbackMutationPatchObject`**

## Propriedades

### events

• **events**: `DebuggerEvent`[]

PARA DESENVOLVIMENTO APENAS. Arranjo para chamadas do remendo (patch).

#### Definida em

[packages/pinia/src/types.ts:110](https://github.com/vuejs/pinia/blob/2b998ee/packages/pinia/src/types.ts#L110)

___

### payload

• **payload**: [`_DeepPartial`](../modules/pinia.md#_deeppartial)<`S`\>

Objeto passado para `store.$patch()`.

#### Definida em

[packages/pinia/src/types.ts:115](https://github.com/vuejs/pinia/blob/2b998ee/packages/pinia/src/types.ts#L115)

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

• **type**: [`patchObject`](../enums/pinia.MutationType.md#patchobject)

Tipo da mutação

#### Sobreposições

[_SubscriptionCallbackMutationBase](pinia._SubscriptionCallbackMutationBase.md).[type](pinia._SubscriptionCallbackMutationBase.md#type)

#### Definida em

[packages/pinia/src/types.ts:105](https://github.com/vuejs/pinia/blob/2b998ee/packages/pinia/src/types.ts#L105)
