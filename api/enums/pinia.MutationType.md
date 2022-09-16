---
sidebar: "auto"
editLinks: false
sidebarDepth: 3
---

[Documentação da API](../index.md) / [pinia](../modules/pinia.md) / MutationType

# Enumeração: MutationType

[pinia](../modules/pinia.md).MutationType

Tipos possíveis para `SubscriptionCallback`

## Membros da Enumeração

### direct

• **direct** = `"direct"`

Mutação direta do estado:

- `store.name = 'new name'`
- `store.$state.name = 'new name'`
- `store.list.push('new item')`

#### Definida em

[packages/pinia/src/types.ts:50](https://github.com/vuejs/pinia/blob/2b998ee/packages/pinia/src/types.ts#L50)

___

### patchFunction

• **patchFunction** = `"patch function"`

Mudou o estado com `$path` e uma função

- `store.$patch(state => state.name = 'newName')`

#### Definida em

[packages/pinia/src/types.ts:64](https://github.com/vuejs/pinia/blob/2b998ee/packages/pinia/src/types.ts#L64)

___

### patchObject

• **patchObject** = `"patch object"`

Mudou o estado com `$patch` e um objeto

- `store.$patch({ name: 'newName' })`

#### Definida em

[packages/pinia/src/types.ts:57](https://github.com/vuejs/pinia/blob/2b998ee/packages/pinia/src/types.ts#L57)
