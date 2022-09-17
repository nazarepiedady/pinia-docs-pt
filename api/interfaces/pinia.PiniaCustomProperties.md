---
sidebar: "auto"
editLinks: false
sidebarDepth: 3
---

[Documentação da API](../index.md) / [pinia](../modules/pinia.md) / PiniaCustomProperties

# Interface: PiniaCustomProperties<Id, S, G, A\>

[pinia](../modules/pinia.md).PiniaCustomProperties

Interface a ser estendida pelos utilizadores quando eles adicionam propriedades através de extensões.

## Parâmetros de tipo

| Nome | Tipo |
| :------ | :------ |
| `Id` | extends `string` = `string` |
| `S` | extends [`StateTree`](../modules/pinia.md#statetree) = [`StateTree`](../modules/pinia.md#statetree) |
| `G` | [`_GettersTree`](../modules/pinia.md#_getterstree)<`S`\> |
| `A` | [`_ActionsTree`](../modules/pinia.md#_actionstree) |

## Propriedades

### $nuxt

• **$nuxt**: `Context`

Contexto de nuxt.

#### Definida em

[packages/nuxt/src/module.ts:68](https://github.com/vuejs/pinia/blob/2b998ee/packages/nuxt/src/module.ts#L68)

___

### double

• **double**: `number`

#### Definida em

[packages/pinia/__tests__/storePlugins.spec.ts:14](https://github.com/vuejs/pinia/blob/2b998ee/packages/pinia/__tests__/storePlugins.spec.ts#L14)

___

### globalA

• **globalA**: `string`

#### Definida em

[packages/pinia/__tests__/storePlugins.spec.ts:11](https://github.com/vuejs/pinia/blob/2b998ee/packages/pinia/__tests__/storePlugins.spec.ts#L11)

___

### globalB

• **globalB**: `string`

#### Definida em

[packages/pinia/__tests__/storePlugins.spec.ts:12](https://github.com/vuejs/pinia/blob/2b998ee/packages/pinia/__tests__/storePlugins.spec.ts#L12)

___

### hasApp

• **hasApp**: `boolean`

#### Definida em

[packages/pinia/__tests__/storePlugins.spec.ts:9](https://github.com/vuejs/pinia/blob/2b998ee/packages/pinia/__tests__/storePlugins.spec.ts#L9)

___

### idFromPlugin

• **idFromPlugin**: `Id`

#### Definida em

[packages/pinia/__tests__/storePlugins.spec.ts:10](https://github.com/vuejs/pinia/blob/2b998ee/packages/pinia/__tests__/storePlugins.spec.ts#L10)

___

### pluginN

• **pluginN**: `number`

#### Definida em

[packages/pinia/__tests__/storePlugins.spec.ts:7](https://github.com/vuejs/pinia/blob/2b998ee/packages/pinia/__tests__/storePlugins.spec.ts#L7)

___

### shared

• **shared**: `number`

#### Definida em

[packages/pinia/__tests__/storePlugins.spec.ts:13](https://github.com/vuejs/pinia/blob/2b998ee/packages/pinia/__tests__/storePlugins.spec.ts#L13)

___

### uid

• **uid**: `number`

#### Definida em

[packages/pinia/__tests__/storePlugins.spec.ts:8](https://github.com/vuejs/pinia/blob/2b998ee/packages/pinia/__tests__/storePlugins.spec.ts#L8)

## Acessórios

### route

• `get` **route**(): `RouteLocationNormalized`

#### Retorna

`RouteLocationNormalized`

#### Definida em

[packages/playground/src/main.ts:17](https://github.com/vuejs/pinia/blob/2b998ee/packages/playground/src/main.ts#L17)

• `set` **route**(`value`): `void`

#### Parâmetros

| Nome | Tipo |
| :------ | :------ |
| `value` | `RouteLocationNormalizedLoaded` \| `Ref`<`RouteLocationNormalizedLoaded`\> |

#### Retorna

`void`

#### Definida em

[packages/playground/src/main.ts:14](https://github.com/vuejs/pinia/blob/2b998ee/packages/playground/src/main.ts#L14)
