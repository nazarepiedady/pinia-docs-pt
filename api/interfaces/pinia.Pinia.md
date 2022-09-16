---
sidebar: "auto"
editLinks: false
sidebarDepth: 3
---

[API da Documentação](../index.md) / [pinia](../modules/pinia.md) / Pinia

# Interface: Pinia

[pinia](../modules/pinia.md).Pinia

Toda aplicação deve possuir a sua própria instância de pinia para ser 
capaz de criar memórias.

## Hierarquia

- **`Pinia`**

  ↳ [`TestingPinia`](pinia_testing.TestingPinia.md)

## Propriedades

### state

• **state**: `Ref`<`Record`<`string`, [`StateTree`](../modules/pinia.md#statetree)\>\>

estado de raiz

#### Definida em

[packages/pinia/src/rootStore.ts:51](https://github.com/vuejs/pinia/blob/2b998ee/packages/pinia/src/rootStore.ts#L51)

## Métodos

### install

▸ **install**(`app`): `void`

#### Parâmetros

| Name | Tipo |
| :------ | :------ |
| `app` | `App`<`any`\> |

#### Retorna

`void`

#### Definida em

[packages/pinia/src/rootStore.ts:46](https://github.com/vuejs/pinia/blob/2b998ee/packages/pinia/src/rootStore.ts#L46)

___

### use

▸ **use**(`plugin`): [`Pinia`](pinia.Pinia.md)

Adiciona uma extensão de memória para estender toda memória

#### Parâmetros

| Nome | Tipo | Descrição |
| :------ | :------ | :------ |
| `plugin` | [`PiniaPlugin`](pinia.PiniaPlugin.md) | extensão de memória para adicionar |

#### Retorna

[`Pinia`](pinia.Pinia.md)

#### Definida em

[packages/pinia/src/rootStore.ts:58](https://github.com/vuejs/pinia/blob/2b998ee/packages/pinia/src/rootStore.ts#L58)
