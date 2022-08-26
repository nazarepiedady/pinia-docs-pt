---
sidebar: "auto"
editLinks: false
sidebarDepth: 3
---

[API Documentation](../index.md) / [pinia](../modules/pinia.md) / SubscriptionCallbackMutationPatchObject

# Interface: SubscriptionCallbackMutationPatchObject<S\>

[pinia](../modules/pinia.md).SubscriptionCallbackMutationPatchObject

Context passed to a subscription callback when `store.$patch()` is called
with an object.

## Type parameters

| Name |
| :------ |
| `S` |

## Hierarchy

- [`_SubscriptionCallbackMutationBase`](pinia._SubscriptionCallbackMutationBase.md)

  ↳ **`SubscriptionCallbackMutationPatchObject`**

## Properties

### events

• **events**: `DebuggerEvent`[]

DEV ONLY. Array for patch calls.

___

### payload

• **payload**: [`_DeepPartial`](../modules/pinia.md#_deeppartial)<`S`\>

Object passed to `store.$patch()`.

___

### storeId

• **storeId**: `string`

`id` of the store doing the mutation.

#### Inherited from

[_SubscriptionCallbackMutationBase](pinia._SubscriptionCallbackMutationBase.md).[storeId](pinia._SubscriptionCallbackMutationBase.md#storeid)

___

### type

• **type**: [`patchObject`](../enums/pinia.MutationType.md#patchobject)

Type of the mutation.

#### Overrides

[_SubscriptionCallbackMutationBase](pinia._SubscriptionCallbackMutationBase.md).[type](pinia._SubscriptionCallbackMutationBase.md#type)
