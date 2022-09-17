---
sidebar: "auto"
editLinks: false
sidebarDepth: 3
---

[Documentação da API](../index.md) / [@pinia/testing](../modules/pinia_testing.md) / TestingPinia

# Interface: TestingPinia

[@pinia/testing](../modules/pinia_testing.md).TestingPinia

Instância de pinia especificamente desenhada para testes. Estende uma 
instância regular de [Pinia](pinia.Pinia.md) com propriedades de teste especificas.

## Hierarquia

- [`Pinia`](pinia.Pinia.md)

  ↳ **`TestingPinia`**

## Propriedades

### app

• **app**: `App`<`any`\>

Aplicação utilizada pela Pinia

#### Definida em

[packages/testing/src/testing.ts:72](https://github.com/vuejs/pinia/blob/2b998ee/packages/testing/src/testing.ts#L72)

___

### state

• **state**: `Ref`<`Record`<`string`, [`StateTree`](../modules/pinia.md#statetree)\>\>

estado de raiz

#### Herdada de

[Pinia](pinia.Pinia.md).[state](pinia.Pinia.md#state)

#### Definida em

[packages/pinia/src/rootStore.ts:51](https://github.com/vuejs/pinia/blob/2b998ee/packages/pinia/src/rootStore.ts#L51)

## Métodos

### install

▸ **install**(`app`): `void`

#### Parâmetros

| Nome | Tipo |
| :------ | :------ |
| `app` | `App`<`any`\> |

#### Retorna

`void`

#### Herdada de

[Pinia](pinia.Pinia.md).[install](pinia.Pinia.md#install)

#### Definida em

[packages/pinia/src/rootStore.ts:46](https://github.com/vuejs/pinia/blob/2b998ee/packages/pinia/src/rootStore.ts#L46)

___

### use

▸ **use**(`plugin`): [`Pinia`](pinia.Pinia.md)

Adiciona uma extensão de memória para estender todas as memórias

#### Parâmetros

| Nome | Tipo | Descrição |
| :------ | :------ | :------ |
| `plugin` | [`PiniaPlugin`](pinia.PiniaPlugin.md) | extensão de memória para adicionar |

#### Retorna

[`Pinia`](pinia.Pinia.md)

#### Herdada de

[Pinia](pinia.Pinia.md).[use](pinia.Pinia.md#use)

#### Definida em

[packages/pinia/src/rootStore.ts:58](https://github.com/vuejs/pinia/blob/2b998ee/packages/pinia/src/rootStore.ts#L58)
