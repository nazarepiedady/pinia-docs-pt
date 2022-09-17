---
sidebar: "auto"
editLinks: false
sidebarDepth: 3
---

[Documentação da API](../index.md) / [pinia](../modules/pinia.md) / StoreProperties

# Interface: StoreProperties<Id\>

[pinia](../modules/pinia.md).StoreProperties

Propriedades de uma memória.

## Parâmetros de tipo

| Nome | Tipo |
| :------ | :------ |
| `Id` | extends `string` |

## Hierarquia

- **`StoreProperties`**

  ↳ [`_StoreWithState`](pinia._StoreWithState.md)

## Propriedades

### $id

• **$id**: `Id`

Identificador único da memória

#### Definida em

[packages/pinia/src/types.ts:265](https://github.com/vuejs/pinia/blob/2b998ee/packages/pinia/src/types.ts#L265)

___

### \_customProperties

• **\_customProperties**: `Set`<`string`\>

Utilizada pela extensão da ferramenta do programador para recuperar propriedades adicionadas com as extensões. Removida em produção. Pode ser utilizada pelo utilizador para adicionar chaves de propriedade da memória que deveriam ser exibidas na ferramenta do programador.

#### Definida em

[packages/pinia/src/types.ts:293](https://github.com/vuejs/pinia/blob/2b998ee/packages/pinia/src/types.ts#L293)
