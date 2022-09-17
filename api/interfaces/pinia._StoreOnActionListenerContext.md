---
sidebar: "auto"
editLinks: false
sidebarDepth: 3
---

[Documentação da API](../index.md) / [pinia](../modules/pinia.md) / \_StoreOnActionListenerContext

# Interface: \_StoreOnActionListenerContext<Store, ActionName, A\>

[pinia](../modules/pinia.md)._StoreOnActionListenerContext

Tipo atual para [StoreOnActionListenerContext](../modules/pinia.md#storeonactionlistenercontext). Existe para propósito de refatoração. Apenas para utilização interna.
**Apenas** para utilização interna.

## Parâmetros de tipo

| Nome | Tipo |
| :------ | :------ |
| `Store` | `Store` |
| `ActionName` | extends `string` |
| `A` | `A` |

## Propriedades

### args

• **args**: `A` extends `Record`<`ActionName`, [`_Method`](../modules/pinia.md#_method)\> ? `Parameters`<`A`[`ActionName`]\> : `unknown`[]

Parâmetros passados para a ação

#### Definida em

[packages/pinia/src/types.ts:195](https://github.com/vuejs/pinia/blob/2b998ee/packages/pinia/src/types.ts#L195)

___

### name

• **name**: `ActionName`

Nome da ação

#### Definida em

[packages/pinia/src/types.ts:185](https://github.com/vuejs/pinia/blob/2b998ee/packages/pinia/src/types.ts#L185)

___

### store

• **store**: `Store`

Memória que está invocando a ação

#### Definida em

[packages/pinia/src/types.ts:190](https://github.com/vuejs/pinia/blob/2b998ee/packages/pinia/src/types.ts#L190)

## Métodos

### after

▸ **after**(`callback`): `void`

Define um gatilho uma vez que a ação é terminada. Recebe o valor de retorno da ação, se for uma Promessa, ela será desembrulhada. Pode retornar um valor (outro senão `undefined`) para **sobrescrever** o valor retornado.

#### Parâmetros

| Nome | Tipo |
| :------ | :------ |
| `callback` | `A` extends `Record`<`ActionName`, [`_Method`](../modules/pinia.md#_method)\> ? (`resolvedReturn`: [`_Awaited`](../modules/pinia.md#_awaited)<`ReturnType`<`A`[`ActionName`]\>\>) => `void` \| `ReturnType`<`A`[`ActionName`]\> \| [`_Awaited`](../modules/pinia.md#_awaited)<`ReturnType`<`A`[`ActionName`]\>\> : () => `void` |

#### Retorna

`void`

#### Definida em

[packages/pinia/src/types.ts:204](https://github.com/vuejs/pinia/blob/2b998ee/packages/pinia/src/types.ts#L204)

___

### onError

▸ **onError**(`callback`): `void`

Define um gatilho se a ação falhar. Retorna `false` para capturar o erro e impedi-o de propagar-se.

#### Parâmetros

| Nome | Tipo |
| :------ | :------ |
| `callback` | (`error`: `unknown`) => `unknown` |

#### Retorna

`void`

#### Definida em

[packages/pinia/src/types.ts:220](https://github.com/vuejs/pinia/blob/2b998ee/packages/pinia/src/types.ts#L220)
