---
sidebar: "auto"
editLinks: false
sidebarDepth: 3
---

[Documentação da API](../index.md) / pinia

# Módulo: pinia

## Enumerações

- [MutationType](../enums/pinia.MutationType.md)

## Interfaces

- [DefineSetupStoreOptions](../interfaces/pinia.DefineSetupStoreOptions.md)
- [DefineStoreOptions](../interfaces/pinia.DefineStoreOptions.md)
- [DefineStoreOptionsBase](../interfaces/pinia.DefineStoreOptionsBase.md)
- [DefineStoreOptionsInPlugin](../interfaces/pinia.DefineStoreOptionsInPlugin.md)
- [MapStoresCustomization](../interfaces/pinia.MapStoresCustomization.md)
- [Pinia](../interfaces/pinia.Pinia.md)
- [PiniaCustomProperties](../interfaces/pinia.PiniaCustomProperties.md)
- [PiniaCustomStateProperties](../interfaces/pinia.PiniaCustomStateProperties.md)
- [PiniaPlugin](../interfaces/pinia.PiniaPlugin.md)
- [PiniaPluginContext](../interfaces/pinia.PiniaPluginContext.md)
- [StoreDefinition](../interfaces/pinia.StoreDefinition.md)
- [StoreProperties](../interfaces/pinia.StoreProperties.md)
- [SubscriptionCallbackMutationDirect](../interfaces/pinia.SubscriptionCallbackMutationDirect.md)
- [SubscriptionCallbackMutationPatchFunction](../interfaces/pinia.SubscriptionCallbackMutationPatchFunction.md)
- [SubscriptionCallbackMutationPatchObject](../interfaces/pinia.SubscriptionCallbackMutationPatchObject.md)
- [\_StoreOnActionListenerContext](../interfaces/pinia._StoreOnActionListenerContext.md)
- [\_StoreWithState](../interfaces/pinia._StoreWithState.md)
- [\_SubscriptionCallbackMutationBase](../interfaces/pinia._SubscriptionCallbackMutationBase.md)

## Pseudónimos de tipo

### PiniaStorePlugin

Ƭ **PiniaStorePlugin**: [`PiniaPlugin`](../interfaces/pinia.PiniaPlugin.md)

Extensão para expandir toda memória.

**`depreciado`** utilize `PiniaPlugin` no lugar

#### Definida em

[packages/pinia/src/rootStore.ts:149](https://github.com/vuejs/pinia/blob/2b998ee/packages/pinia/src/rootStore.ts#L149)

___

### StateTree

Ƭ **StateTree**: `Record`<`string` \| `number` \| `symbol`, `any`\>

Estado genérico de uma Memória

#### Definida em

[packages/pinia/src/types.ts:13](https://github.com/vuejs/pinia/blob/2b998ee/packages/pinia/src/types.ts#L13)

___

### Store

Ƭ **Store**<`Id`, `S`, `G`, `A`\>: [`_StoreWithState`](../interfaces/pinia._StoreWithState.md)<`Id`, `S`, `G`, `A`\> & `UnwrapRef`<`S`\> & [`_StoreWithGetters`](pinia.md#_storewithgetters)<`G`\> & [`_ActionsTree`](pinia.md#_actionstree) extends `A` ? {} : `A` & [`PiniaCustomProperties`](../interfaces/pinia.PiniaCustomProperties.md)<`Id`, `S`, `G`, `A`\> & `PiniaCustomStateProperties`<`S`\>

Tipo de Memória para construir uma memória.

#### Parâmetros de tipo

| Nome | Tipo |
| :------ | :------ |
| `Id` | extends `string` = `string` |
| `S` | extends [`StateTree`](pinia.md#statetree) = {} |
| `G` | {} |
| `A` | {} |

#### Definida em

[packages/pinia/src/types.ts:470](https://github.com/vuejs/pinia/blob/2b998ee/packages/pinia/src/types.ts#L470)

___

### StoreActions

Ƭ **StoreActions**<`SS`\>: `SS` extends [`Store`](pinia.md#store)<`string`, [`StateTree`](pinia.md#statetree), [`_GettersTree`](pinia.md#_getterstree)<[`StateTree`](pinia.md#statetree)\>, infer A\> ? `A` : [`_ExtractActionsFromSetupStore`](pinia.md#_extractactionsfromsetupstore)<`SS`\>

Extrai as ações de um tipo de memória. Funciona para ambas, Memórias baseadas em Composições ou Memórias baseadas em Opções.

#### Parâmetros de tipo

| Nome |
| :------ |
| `SS` |

#### Definida em

[packages/pinia/src/store.ts:729](https://github.com/vuejs/pinia/blob/2b998ee/packages/pinia/src/store.ts#L729)

___

### StoreGeneric

Ƭ **StoreGeneric**: [`Store`](pinia.md#store)<`string`, [`StateTree`](pinia.md#statetree), [`_GettersTree`](pinia.md#_getterstree)<[`StateTree`](pinia.md#statetree)\>, [`_ActionsTree`](pinia.md#_actionstree)\>

Versão genérica e sem segurança de tipo da Memória. Não falha em acessar com sequências, tornando-o muito mais fácil para escrever funções genéricas que não se importa com o tipo de memória que é passada.

#### Definida em

[packages/pinia/src/types.ts:489](https://github.com/vuejs/pinia/blob/2b998ee/packages/pinia/src/types.ts#L489)

___

### StoreGetters

Ƭ **StoreGetters**<`SS`\>: `SS` extends [`Store`](pinia.md#store)<`string`, [`StateTree`](pinia.md#statetree), infer G, [`_ActionsTree`](pinia.md#_actionstree)\> ? [`_StoreWithGetters`](pinia.md#_storewithgetters)<`G`\> : [`_ExtractGettersFromSetupStore`](pinia.md#_extractgettersfromsetupstore)<`SS`\>

Extrai os recuperadores de um tipo de memória. Funciona para ambas, Memórias baseadas em Composições ou Memórias baseadas em Opções.

#### Parâmetros de tipo

| Nome |
| :------ |
| `SS` |

#### Definida em

[packages/pinia/src/store.ts:742](https://github.com/vuejs/pinia/blob/2b998ee/packages/pinia/src/store.ts#L742)

___

### StoreOnActionListener

Ƭ **StoreOnActionListener**<`Id`, `S`, `G`, `A`\>: (`context`: [`StoreOnActionListenerContext`](pinia.md#storeonactionlistenercontext)<`Id`, `S`, `G`, {} extends `A` ? [`_ActionsTree`](pinia.md#_actionstree) : `A`\>) => `void`

#### Parâmetros de tipo

| Nome | Tipo |
| :------ | :------ |
| `Id` | amplia `string` |
| `S` | amplia [`StateTree`](pinia.md#statetree) |
| `G` | `G` |
| `A` | `A` |

#### Declaração de tipo

▸ (`context`): `void`

Argumento de `store.$onAction()`

##### Parâmetros

| Nome | Tipo |
| :------ | :------ |
| `context` | [`StoreOnActionListenerContext`](pinia.md#storeonactionlistenercontext)<`Id`, `S`, `G`, {} extends `A` ? [`_ActionsTree`](pinia.md#_actionstree) : `A`\> |

##### Retorna

`void`

#### Definida em

[packages/pinia/src/types.ts:243](https://github.com/vuejs/pinia/blob/2b998ee/packages/pinia/src/types.ts#L243)

___

### StoreOnActionListenerContext

Ƭ **StoreOnActionListenerContext**<`Id`, `S`, `G`, `A`\>: [`_ActionsTree`](pinia.md#_actionstree) extends `A` ? [`_StoreOnActionListenerContext`](../interfaces/pinia._StoreOnActionListenerContext.md)<[`StoreGeneric`](pinia.md#storegeneric), `string`, [`_ActionsTree`](pinia.md#_actionstree)\> : { [Name in keyof A]: Name extends string ? \_StoreOnActionListenerContext<Store<Id, S, G, A\>, Name, A\> : never }[keyof `A`]

Objeto de contexto passado para resposta de `store.$onAction(context => {})`
TODO: deve ter apenas a Id, a Memória e Ações para gerar o objeto apropriado

#### Parâmetros de tipo

| Nome | Tipo |
| :------ | :------ |
| `Id` | extends `string` |
| `S` | extends [`StateTree`](pinia.md#statetree) |
| `G` | `G` |
| `A` | `A` |

#### Definida em

[packages/pinia/src/types.ts:227](https://github.com/vuejs/pinia/blob/2b998ee/packages/pinia/src/types.ts#L227)

___

### StoreState

Ƭ **StoreState**<`SS`\>: `SS` extends [`Store`](pinia.md#store)<`string`, infer S, [`_GettersTree`](pinia.md#_getterstree)<[`StateTree`](pinia.md#statetree)\>, [`_ActionsTree`](pinia.md#_actionstree)\> ? `UnwrapRef`<`S`\> : [`_ExtractStateFromSetupStore`](pinia.md#_extractstatefromsetupstore)<`SS`\>

Extrai o estado de um tipo de memória. Funciona para ambas, Memórias baseadas em Composições ou Memórias baseadas em Opções.

#### Parâmetros de tipo

| Nome |
| :------ |
| `SS` |

#### Definida em

[packages/pinia/src/store.ts:755](https://github.com/vuejs/pinia/blob/2b998ee/packages/pinia/src/store.ts#L755)

___

### SubscriptionCallback

Ƭ **SubscriptionCallback**<`S`\>: (`mutation`: [`SubscriptionCallbackMutation`](pinia.md#subscriptioncallbackmutation)<`S`\>, `state`: `UnwrapRef`<`S`\>) => `void`

#### Parâmetros de tipo

| Nome |
| :------ |
| `S` |

#### Declaração de tipo

▸ (`mutation`, `state`): `void`

Resposta de uma subscrição

##### Parâmetros

| Nome | Tipo |
| :------ | :------ |
| `mutation` | [`SubscriptionCallbackMutation`](pinia.md#subscriptioncallbackmutation)<`S`\> |
| `state` | `UnwrapRef`<`S`\> |

##### Retorna

`void`

#### Definida em

[packages/pinia/src/types.ts:148](https://github.com/vuejs/pinia/blob/2b998ee/packages/pinia/src/types.ts#L148)

___

### SubscriptionCallbackMutation

Ƭ **SubscriptionCallbackMutation**<`S`\>: [`SubscriptionCallbackMutationDirect`](../interfaces/pinia.SubscriptionCallbackMutationDirect.md) \| [`SubscriptionCallbackMutationPatchObject`](../interfaces/pinia.SubscriptionCallbackMutationPatchObject.md)<`S`\> \| [`SubscriptionCallbackMutationPatchFunction`](../interfaces/pinia.SubscriptionCallbackMutationPatchFunction.md)

Objeto de contexto passado para uma resposta de subscrição

#### Parâmetros de tipo

| Nome |
| :------ |
| `S` |

#### Definida em

[packages/pinia/src/types.ts:140](https://github.com/vuejs/pinia/blob/2b998ee/packages/pinia/src/types.ts#L140)

___

### \_ActionsTree

Ƭ **\_ActionsTree**: `Record`<`string`, [`_Method`](pinia.md#_method)\>

Tipo de um objeto de Ações. Apenas para uso interno.
**Apenas** para uso interno

#### Definida em

[packages/pinia/src/types.ts:555](https://github.com/vuejs/pinia/blob/2b998ee/packages/pinia/src/types.ts#L555)

___

### \_Awaited

Ƭ **\_Awaited**<`T`\>: `T` extends ``null`` \| `undefined` ? `T` : `T` extends `object` & { `then`: (`onfulfilled`: `F`) => `any`  } ? `F` extends (`value`: infer V, ...`args`: `any`) => `any` ? [`_Awaited`](pinia.md#_awaited)<`V`\> : `never` : `T`

#### Parâmetros de tipo

| Nome |
| :------ |
| `T` |

#### Definida em

[packages/pinia/src/types.ts:164](https://github.com/vuejs/pinia/blob/2b998ee/packages/pinia/src/types.ts#L164)

___

### \_DeepPartial

Ƭ **\_DeepPartial**<`T`\>: { [K in keyof T]?: \_DeepPartial<T[K]\> }

Recursivo `Partial<T>`. Utilizado pelo {@link Store.$patch}.

**Apenas** para uso interno

#### Parâmetros de tipo

| Nome |
| :------ |
| `T` |

#### Definida em

[packages/pinia/src/types.ts:35](https://github.com/vuejs/pinia/blob/2b998ee/packages/pinia/src/types.ts#L35)

___

### \_ExtractActionsFromSetupStore

Ƭ **\_ExtractActionsFromSetupStore**<`SS`\>: `SS` extends `undefined` \| `void` ? {} : [`_ExtractActionsFromSetupStore_Keys`](pinia.md#_extractactionsfromsetupstore_keys)<`SS`\> extends keyof `SS` ? `Pick`<`SS`, [`_ExtractActionsFromSetupStore_Keys`](pinia.md#_extractactionsfromsetupstore_keys)<`SS`\>\> : `never`

**Apenas** para uso interno

#### Parâmetros de tipo

| Nome |
| :------ |
| `SS` |

#### Definida em

[packages/pinia/src/types.ts:599](https://github.com/vuejs/pinia/blob/2b998ee/packages/pinia/src/types.ts#L599)

___

### \_ExtractActionsFromSetupStore\_Keys

Ƭ **\_ExtractActionsFromSetupStore\_Keys**<`SS`\>: keyof { [K in keyof SS as SS[K] extends \_Method ? K : never]: any }

Tipo que habilita a refatoração através da IDE.
**Apenas** para uso interno

#### Type parameters
#### Parâmetros de tipo

| Nome |
| :------ |
| `SS` |

#### Definida em

[packages/pinia/src/types.ts:569](https://github.com/vuejs/pinia/blob/2b998ee/packages/pinia/src/types.ts#L569)

___

### \_ExtractGettersFromSetupStore

Ƭ **\_ExtractGettersFromSetupStore**<`SS`\>: `SS` extends `undefined` \| `void` ? {} : [`_ExtractGettersFromSetupStore_Keys`](pinia.md#_extractgettersfromsetupstore_keys)<`SS`\> extends keyof `SS` ? [`_UnwrapAll`](pinia.md#_unwrapall)<`Pick`<`SS`, [`_ExtractGettersFromSetupStore_Keys`](pinia.md#_extractgettersfromsetupstore_keys)<`SS`\>\>\> : `never`

**Apenas** para uso interno

#### Type parameters
#### Parâmetros de tipo

| Nome |
| :------ |
| `SS` |

#### Definida em

[packages/pinia/src/types.ts:608](https://github.com/vuejs/pinia/blob/2b998ee/packages/pinia/src/types.ts#L608)

___

### \_ExtractGettersFromSetupStore\_Keys

Ƭ **\_ExtractGettersFromSetupStore\_Keys**<`SS`\>: keyof { [K in keyof SS as SS[K] extends ComputedRef ? K : never]: any }

Tipo que habilita a refatoração através da IDE.
**Apenas** para uso interno

#### Parâmetros de tipo

| Nome |
| :------ |
| `SS` |

#### Definida em

[packages/pinia/src/types.ts:577](https://github.com/vuejs/pinia/blob/2b998ee/packages/pinia/src/types.ts#L577)

___

### \_ExtractStateFromSetupStore

Ƭ **\_ExtractStateFromSetupStore**<`SS`\>: `SS` extends `undefined` \| `void` ? {} : [`_ExtractStateFromSetupStore_Keys`](pinia.md#_extractstatefromsetupstore_keys)<`SS`\> extends keyof `SS` ? [`_UnwrapAll`](pinia.md#_unwrapall)<`Pick`<`SS`, [`_ExtractStateFromSetupStore_Keys`](pinia.md#_extractstatefromsetupstore_keys)<`SS`\>\>\> : `never`

**Apenas** para uso interno

#### Parâmetros de tipo

| Nome |
| :------ |
| `SS` |

#### Definida em

[packages/pinia/src/types.ts:590](https://github.com/vuejs/pinia/blob/2b998ee/packages/pinia/src/types.ts#L590)

___

### \_ExtractStateFromSetupStore\_Keys

Ƭ **\_ExtractStateFromSetupStore\_Keys**<`SS`\>: keyof { [K in keyof SS as SS[K] extends \_Method \| ComputedRef ? never : K]: any }

Tipo que habilita a refatoração através da IDE.
**Apenas** para uso interno


#### Parâmetros de tipo

| Nome |
| :------ |
| `SS` |

#### Definida em

[packages/pinia/src/types.ts:561](https://github.com/vuejs/pinia/blob/2b998ee/packages/pinia/src/types.ts#L561)

___

### \_GettersTree

Ƭ **\_GettersTree**<`S`\>: `Record`<`string`, (`state`: `UnwrapRef`<`S`\> & `UnwrapRef`<`PiniaCustomStateProperties`<`S`\>\>) => `any` \| () => `any`\>

Tipo de um objeto de Recuperadores que infere o argumento. Apenas para uso interno.
**Apenas** para uso interno

#### Parâmetros de tipo

| Nome | Tipo |
| :------ | :------ |
| `S` | extends [`StateTree`](pinia.md#statetree) |

#### Definida em

[packages/pinia/src/types.ts:545](https://github.com/vuejs/pinia/blob/2b998ee/packages/pinia/src/types.ts#L545)

___

### \_MapActionsObjectReturn

Ƭ **\_MapActionsObjectReturn**<`A`, `T`\>: { [key in keyof T]: A[T[key]] }

**Apenas** para uso interno

#### Parâmetros de tipo

| Nome | Tipo |
| :------ | :------ |
| `A` | `A` |
| `T` | extends `Record`<`string`, keyof `A`\> |

#### Definida em

[packages/pinia/src/mapHelpers.ts:297](https://github.com/vuejs/pinia/blob/2b998ee/packages/pinia/src/mapHelpers.ts#L297)

___

### \_MapActionsReturn

Ƭ **\_MapActionsReturn**<`A`\>: { [key in keyof A]: A[key] }

**Apenas** para uso interno

#### Parâmetros de tipo

| Nome |
| :------ |
| `A` |

#### Definida em

[packages/pinia/src/mapHelpers.ts:290](https://github.com/vuejs/pinia/blob/2b998ee/packages/pinia/src/mapHelpers.ts#L290)

___

### \_MapStateObjectReturn

Ƭ **\_MapStateObjectReturn**<`Id`, `S`, `G`, `A`, `T`\>: { [key in keyof T]: Function }

**Apenas** para uso interno

#### Parâmetros de tipo

| Nome | Tipo |
| :------ | :------ |
| `Id` | extends `string` |
| `S` | extends [`StateTree`](pinia.md#statetree) |
| `G` | extends [`_GettersTree`](pinia.md#_getterstree)<`S`\> |
| `A` | `A` |
| `T` | extends `Record`<`string`, keyof `S` \| keyof `G` \| (`store`: [`Store`](pinia.md#store)<`Id`, `S`, `G`, `A`\>) => `any`\> = {} |

#### Definida em

[packages/pinia/src/mapHelpers.ts:141](https://github.com/vuejs/pinia/blob/2b998ee/packages/pinia/src/mapHelpers.ts#L141)

___

### \_MapStateReturn

Ƭ **\_MapStateReturn**<`S`, `G`, `Keys`\>: { [key in Keys]: Function }

**Apenas** para uso interno

#### Parâmetros de tipo

| Nome | Tipo |
| :------ | :------ |
| `S` | extends [`StateTree`](pinia.md#statetree) |
| `G` | extends [`_GettersTree`](pinia.md#_getterstree)<`S`\> |
| `Keys` | extends keyof `S` \| keyof `G` = keyof `S` \| keyof `G` |

#### Definida em

[packages/pinia/src/mapHelpers.ts:125](https://github.com/vuejs/pinia/blob/2b998ee/packages/pinia/src/mapHelpers.ts#L125)

___

### \_MapWritableStateObjectReturn

Ƭ **\_MapWritableStateObjectReturn**<`S`, `T`\>: { [key in keyof T]: Object }

**Apenas** para uso interno

#### Parâmetros de tipo

| Nome | Tipo |
| :------ | :------ |
| `S` | extends [`StateTree`](pinia.md#statetree) |
| `T` | extends `Record`<`string`, keyof `S`\> |

#### Definida em

[packages/pinia/src/mapHelpers.ts:422](https://github.com/vuejs/pinia/blob/2b998ee/packages/pinia/src/mapHelpers.ts#L422)

___

### \_MapWritableStateReturn

Ƭ **\_MapWritableStateReturn**<`S`\>: { [key in keyof S]: Object }

**Apenas** para uso interno

#### Parâmetros de tipo

| Nome | Tipo |
| :------ | :------ |
| `S` | extends [`StateTree`](pinia.md#statetree) |

#### Definida em

[packages/pinia/src/mapHelpers.ts:412](https://github.com/vuejs/pinia/blob/2b998ee/packages/pinia/src/mapHelpers.ts#L412)

___

### \_Method

Ƭ **\_Method**: (...`args`: `any`[]) => `any`

#### Declaração de tipo

▸ (...`args`): `any`

Tipo genérico para uma função que pode inferir argumentos e tipo de retorno

**Apenas** para uso interno

##### Parâmetros

| Nome | Tipo |
| :------ | :------ |
| `...args` | `any`[] |

##### Retorna

`any`

#### Definida em

[packages/pinia/src/types.ts:439](https://github.com/vuejs/pinia/blob/2b998ee/packages/pinia/src/types.ts#L439)

___

### \_Spread

Ƭ **\_Spread**<`A`\>: `A` extends [infer L, ...infer R] ? [`_StoreObject`](pinia.md#_storeobject)<`L`\> & [`_Spread`](pinia.md#_spread)<`R`\> : `unknown`

**Apenas** para uso interno

#### Parâmetros de tipo

| Nome | Tipo |
| :------ | :------ |
| `A` | extends readonly `any`[] |

#### Definida em

[packages/pinia/src/mapHelpers.ts:53](https://github.com/vuejs/pinia/blob/2b998ee/packages/pinia/src/mapHelpers.ts#L53)

___

### \_StoreObject

Ƭ **\_StoreObject**<`S`\>: `S` extends [`StoreDefinition`](../interfaces/pinia.StoreDefinition.md)<infer Ids, infer State, infer Getters, infer Actions\> ? { [Id in \`${Ids}${MapStoresCustomization extends Record<"suffix", string\> ? MapStoresCustomization["suffix"] : "Store"}\`]: Function } : {}

**Apenas** para uso interno

#### Parâmetros de tipo

| Nome |
| :------ |
| `S` |

#### Definida em

[packages/pinia/src/mapHelpers.ts:25](https://github.com/vuejs/pinia/blob/2b998ee/packages/pinia/src/mapHelpers.ts#L25)

___

### \_StoreWithActions

Ƭ **\_StoreWithActions**<`A`\>: { [k in keyof A]: A[k] extends Function ? Function : never }

Memória aumentada para ações. Apenas para uso interno.
**Apenas** para uso interno

#### Parâmetros de tipo

| Nome |
| :------ |
| `A` |

#### Definida em

[packages/pinia/src/types.ts:451](https://github.com/vuejs/pinia/blob/2b998ee/packages/pinia/src/types.ts#L451)

___

### \_StoreWithGetters

Ƭ **\_StoreWithGetters**<`G`\>: { readonly [k in keyof G]: G[k] extends Function ? R : UnwrapRef<G[k]\> }

Memória aumentada com recuperadores. Apenas para uso interno.
**Apenas** para uso interno

#### Type parameters
#### Parâmetros de tipo

| Nome |
| :------ |
| `G` |

#### Definida em

[packages/pinia/src/types.ts:461](https://github.com/vuejs/pinia/blob/2b998ee/packages/pinia/src/types.ts#L461)

___

### \_UnwrapAll

Ƭ **\_UnwrapAll**<`SS`\>: { [K in keyof SS]: UnwrapRef<SS[K]\> }

Tipo que permite a refatoração através da IDE.
**Apenas** para uso interno

#### Parâmetros de tipo

| Nome |
| :------ |
| `SS` |

#### Definida em

[packages/pinia/src/types.ts:585](https://github.com/vuejs/pinia/blob/2b998ee/packages/pinia/src/types.ts#L585)

## Variáveis

### PiniaVuePlugin

• `Const` **PiniaVuePlugin**: `Plugin`


Extensão de Vue 2 que deve ser instalada para a `pinia` funcionar. Nota **não precisas
dista extensão se estiveres utilizando a Nuxt.js**. Utilize a `buildModule` no lugar:
https://pinia.vuejs.org/ssr/nuxt.html.

**`exemplo`**
```js
import Vue from 'vue'
import { PiniaVuePlugin, createPinia } from 'pinia'

Vue.use(PiniaVuePlugin)
const pinia = createPinia()

new Vue({
  el: '#app',
  // ...
  pinia,
})
```

**`parâmetro`** `Vue` importado de 'vue'.

#### Definida em

[packages/pinia/src/vue2-plugin.ts:28](https://github.com/vuejs/pinia/blob/2b998ee/packages/pinia/src/vue2-plugin.ts#L28)

## Funções

### acceptHMRUpdate

▸ **acceptHMRUpdate**(`initialUseStore`, `hot`): (`newModule`: `any`) => `any`

Cria uma função _aceitar_ para passar para `import.meta.hot` em aplicações Vite.

**`exemplo`**
```js
const useUser = defineStore(...)
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUser, import.meta.hot))
}
```

#### Parâmetros

| Nome | Tipo | Descrição |
| :------ | :------ | :------ |
| `initialUseStore` | [`StoreDefinition`](../interfaces/pinia.StoreDefinition.md)<`string`, [`StateTree`](pinia.md#statetree), [`_GettersTree`](pinia.md#_getterstree)<[`StateTree`](pinia.md#statetree)\>, [`_ActionsTree`](pinia.md#_actionstree)\> | retorno do `defineStore` para atualização instantânea |
| `hot` | `any` | `import.meta.hot` |

#### Retorna

`fn`

▸ (`newModule`): `any`

#### Parâmetros

| Nome | Tipo |
| :------ | :------ |
| `newModule` | `any` |

##### Retorna

`any`

#### Definida em

[packages/pinia/src/hmr.ts:73](https://github.com/vuejs/pinia/blob/2b998ee/packages/pinia/src/hmr.ts#L73)

___

### createPinia

▸ **createPinia**(): [`Pinia`](../interfaces/pinia.Pinia.md)

Cria uma instância Pinia para ser utilizada pela aplicação

#### Retorna

[`Pinia`](../interfaces/pinia.Pinia.md)

#### Definida em

[packages/pinia/src/createPinia.ts:10](https://github.com/vuejs/pinia/blob/2b998ee/packages/pinia/src/createPinia.ts#L10)

___

### defineStore

▸ **defineStore**<`Id`, `S`, `G`, `A`\>(`id`, `options`): [`StoreDefinition`](../interfaces/pinia.StoreDefinition.md)<`Id`, `S`, `G`, `A`\>

Cria uma função `useStore` que recupera a instância da memória

#### Parâmetros de tipo

| Nome | Tipo |
| :------ | :------ |
| `Id` | extends `string` |
| `S` | extends [`StateTree`](pinia.md#statetree) = {} |
| `G` | extends [`_GettersTree`](pinia.md#_getterstree)<`S`\> = {} |
| `A` | {} |

#### Parâmetros

| Nome | Tipo | Descrição |
| :------ | :------ | :------ |
| `id` | `Id` | id da memória (deve ser único) |
| `options` | `Omit`<[`DefineStoreOptions`](../interfaces/pinia.DefineStoreOptions.md)<`Id`, `S`, `G`, `A`\>, ``"id"``\> | opções para definir a memória |

#### Retorna

[`StoreDefinition`](../interfaces/pinia.StoreDefinition.md)<`Id`, `S`, `G`, `A`\>

#### Definida em

[packages/pinia/src/store.ts:778](https://github.com/vuejs/pinia/blob/2b998ee/packages/pinia/src/store.ts#L778)

▸ **defineStore**<`Id`, `S`, `G`, `A`\>(`options`): [`StoreDefinition`](../interfaces/pinia.StoreDefinition.md)<`Id`, `S`, `G`, `A`\>

Cria uma função `useStore` que recupera a instância da memória

#### Parâmetros de tipo

| Nome | Tipo |
| :------ | :------ |
| `Id` | extends `string` |
| `S` | extends [`StateTree`](pinia.md#statetree) = {} |
| `G` | extends [`_GettersTree`](pinia.md#_getterstree)<`S`\> = {} |
| `A` | {} |

#### Parâmetros

| Nome | Tipo | Descrição |
| :------ | :------ | :------ |
| `options` | [`DefineStoreOptions`](../interfaces/pinia.DefineStoreOptions.md)<`Id`, `S`, `G`, `A`\> | opções para definir a memória |

#### Retorna

[`StoreDefinition`](../interfaces/pinia.StoreDefinition.md)<`Id`, `S`, `G`, `A`\>

#### Definida em

[packages/pinia/src/store.ts:794](https://github.com/vuejs/pinia/blob/2b998ee/packages/pinia/src/store.ts#L794)

▸ **defineStore**<`Id`, `SS`\>(`id`, `storeSetup`, `options?`): [`StoreDefinition`](../interfaces/pinia.StoreDefinition.md)<`Id`, [`_ExtractStateFromSetupStore`](pinia.md#_extractstatefromsetupstore)<`SS`\>, [`_ExtractGettersFromSetupStore`](pinia.md#_extractgettersfromsetupstore)<`SS`\>, [`_ExtractActionsFromSetupStore`](pinia.md#_extractactionsfromsetupstore)<`SS`\>\>

Cria uma função `useStore` que recupera a instância da memória

#### Parâmetros de tipo

| Nome | Tipo |
| :------ | :------ |
| `Id` | extends `string` |
| `SS` | `SS` |

#### Parâmetros

| Nome | Tipo | Descrição |
| :------ | :------ | :------ |
| `id` | `Id` | id da memória (deve ser única) |
| `storeSetup` | () => `SS` | função que define a memória |
| `options?` | [`DefineSetupStoreOptions`](../interfaces/pinia.DefineSetupStoreOptions.md)<`Id`, [`_ExtractStateFromSetupStore`](pinia.md#_extractstatefromsetupstore)<`SS`\>, [`_ExtractGettersFromSetupStore`](pinia.md#_extractgettersfromsetupstore)<`SS`\>, [`_ExtractActionsFromSetupStore`](pinia.md#_extractactionsfromsetupstore)<`SS`\>\> | opções adicionais |

#### Retorna

[`StoreDefinition`](../interfaces/pinia.StoreDefinition.md)<`Id`, [`_ExtractStateFromSetupStore`](pinia.md#_extractstatefromsetupstore)<`SS`\>, [`_ExtractGettersFromSetupStore`](pinia.md#_extractgettersfromsetupstore)<`SS`\>, [`_ExtractActionsFromSetupStore`](pinia.md#_extractactionsfromsetupstore)<`SS`\>\>

#### Definida em

[packages/pinia/src/store.ts:809](https://github.com/vuejs/pinia/blob/2b998ee/packages/pinia/src/store.ts#L809)

___

### getActivePinia

▸ **getActivePinia**(): `undefined` \| [`Pinia`](../interfaces/pinia.Pinia.md)

Recebe a `pinia` ativa atualmente se houver alguma. 

#### Retorna

`undefined` \| [`Pinia`](../interfaces/pinia.Pinia.md)

#### Definida em

[packages/pinia/src/rootStore.ts:39](https://github.com/vuejs/pinia/blob/2b998ee/packages/pinia/src/rootStore.ts#L39)

___

### mapActions

▸ **mapActions**<`Id`, `S`, `G`, `A`, `KeyMapper`\>(`useStore`, `keyMapper`): [`_MapActionsObjectReturn`](pinia.md#_mapactionsobjectreturn)<`A`, `KeyMapper`\>

Permite diretamente utilizar as ações da tua memória sem a utilização da API 
de composição (`setup()`) pela geração de um objeto para ser propagado nos campos
`methods` de um componente. Os valores do objeto são as ações enquanto as chaves
são os nomes dos métodos resultantes.

**`example`**
```js
export default {
  methods: {
    // outros propriedades de métodos
    // `useCounterStore` tem duas ações nomeadas `increment` e `setCount`
    ...mapActions(useCounterStore, { moar: 'increment', setIt: 'setCount' })
  },

  created() {
    this.moar()
    this.setIt(2)
  }
}
```

#### Parâmetros de tipo

| Nome | Tipo |
| :------ | :------ |
| `Id` | extends `string` |
| `S` | extends [`StateTree`](pinia.md#statetree) |
| `G` | extends [`_GettersTree`](pinia.md#_getterstree)<`S`\> |
| `A` | `A` |
| `KeyMapper` | extends `Record`<`string`, keyof `A`\> |

#### Parâmetros

| Nome | Tipo | Descrição |
| :------ | :------ | :------ |
| `useStore` | [`StoreDefinition`](../interfaces/pinia.StoreDefinition.md)<`Id`, `S`, `G`, `A`\> | memória para delinear a partir |
| `keyMapper` | `KeyMapper` | objeto para definir novos nomes para as ações |

#### Retorna

[`_MapActionsObjectReturn`](pinia.md#_mapactionsobjectreturn)<`A`, `KeyMapper`\>

#### Definida em

[packages/pinia/src/mapHelpers.ts:326](https://github.com/vuejs/pinia/blob/2b998ee/packages/pinia/src/mapHelpers.ts#L326)

▸ **mapActions**<`Id`, `S`, `G`, `A`\>(`useStore`, `keys`): [`_MapActionsReturn`](pinia.md#_mapactionsreturn)<`A`\>

Permite diretamente utilizar ações da tua memória sem a utilização da API
de composição (`setup()`) pela geração de um objeto ser propagado nos campos
de `methods` de um componente.

**`example`**
```js
export default {
  methods: {
    // outros propriedades de métodos
    ...mapActions(useCounterStore, ['increment', 'setCount'])
  },

  created() {
    this.increment()
    this.setCount(2) // passar argumentos como habitual
  }
}
```

#### Parâmetros de tipo

| Nome | Tipo |
| :------ | :------ |
| `Id` | extends `string` |
| `S` | extends [`StateTree`](pinia.md#statetree) |
| `G` | extends [`_GettersTree`](pinia.md#_getterstree)<`S`\> |
| `A` | `A` |

#### Parâmetros

| Nome | Tipo | Descrição |
| :------ | :------ | :------ |
| `useStore` | [`StoreDefinition`](../interfaces/pinia.StoreDefinition.md)<`Id`, `S`, `G`, `A`\> | memória para delinear a partir |
| `keys` | keyof `A`[] | arranjo de nomes de ação para delinear |

#### Retorna

[`_MapActionsReturn`](pinia.md#_mapactionsreturn)<`A`\>

#### Definida em

[packages/pinia/src/mapHelpers.ts:359](https://github.com/vuejs/pinia/blob/2b998ee/packages/pinia/src/mapHelpers.ts#L359)

___

### mapGetters

▸ **mapGetters**<`Id`, `S`, `G`, `A`, `KeyMapper`\>(`useStore`, `keyMapper`): [`_MapStateObjectReturn`](pinia.md#_mapstateobjectreturn)<`Id`, `S`, `G`, `A`, `KeyMapper`\>

Pseudónimos para `mapState()`. Tu deves utilizar `mapState` no lugar.

**`depreciado`** utilize `mapState()` no lugar.

#### Parâmetros de tipo

| Nome | Tipo |
| :------ | :------ |
| `Id` | extends `string` |
| `S` | extends [`StateTree`](pinia.md#statetree) |
| `G` | extends [`_GettersTree`](pinia.md#_getterstree)<`S`\> |
| `A` | `A` |
| `KeyMapper` | extends `Record`<`string`, keyof `S` \| keyof `G` \| (`store`: [`Store`](pinia.md#store)<`Id`, `S`, `G`, `A`\>) => `any`\> |

#### Parâmetros

| Nome | Tipo |
| :------ | :------ |
| `useStore` | [`StoreDefinition`](../interfaces/pinia.StoreDefinition.md)<`Id`, `S`, `G`, `A`\> |
| `keyMapper` | `KeyMapper` |

#### Retorna

[`_MapStateObjectReturn`](pinia.md#_mapstateobjectreturn)<`Id`, `S`, `G`, `A`, `KeyMapper`\>

#### Definida em

[packages/pinia/src/mapHelpers.ts:285](https://github.com/vuejs/pinia/blob/2b998ee/packages/pinia/src/mapHelpers.ts#L285)

▸ **mapGetters**<`Id`, `S`, `G`, `A`, `Keys`\>(`useStore`, `keys`): [`_MapStateReturn`](pinia.md#_mapstatereturn)<`S`, `G`, `Keys`\>

Pseudónimos para `mapState()`. Tu deves utilizar `mapState` no lugar.

**`depreciado`** utilize `mapState()` no lugar.

#### Parâmetros de tipo

| Nome | Tipo |
| :------ | :------ |
| `Id` | extends `string` |
| `S` | extends [`StateTree`](pinia.md#statetree) |
| `G` | extends [`_GettersTree`](pinia.md#_getterstree)<`S`\> |
| `A` | `A` |
| `Keys` | extends `string` \| `number` \| `symbol` |

#### Parâmetros

| Nome | Tipo |
| :------ | :------ |
| `useStore` | [`StoreDefinition`](../interfaces/pinia.StoreDefinition.md)<`Id`, `S`, `G`, `A`\> |
| `keys` | readonly `Keys`[] |

#### Retorna

[`_MapStateReturn`](pinia.md#_mapstatereturn)<`S`, `G`, `Keys`\>

#### Definida em

[packages/pinia/src/mapHelpers.ts:285](https://github.com/vuejs/pinia/blob/2b998ee/packages/pinia/src/mapHelpers.ts#L285)

___

### mapState

▸ **mapState**<`Id`, `S`, `G`, `A`, `KeyMapper`\>(`useStore`, `keyMapper`): [`_MapStateObjectReturn`](pinia.md#_mapstateobjectreturn)<`Id`, `S`, `G`, `A`, `KeyMapper`\>

Permite a utilização de estado e recuperadores de uma memória sem a utilização
da API de composição (`setup()`) pela geração de um objeto propagado em um campo
`computed` de um componente. Os valores do objeto são as propriedades/recuperadores
do estado enquanto as chaves são os nomes das propriedades computadas resultantes.
Opcionalmente, tu podes também passar uma função personalizada que receberá a memória
como seu primeiro argumento. Nota que enquanto ela tem acesso a instância do componente
através de `this`, ela não será tipada.

**`example`**
```js
export default {
  computed: {
    // outras propriedades computadas
    // `useCounterStore` tem uma propriedade de estado com o nome `count` e um recuperador `double`
    ...mapState(useCounterStore, {
      n: 'count',
      triple: store => store.n * 3,
      // nota que não podemos utilizar uma função em flecha se quisermos utilizar `this`
      custom(store) {
        return this.someComponentValue + store.n
      },
      doubleN: 'double'
    })
  },

  created() {
    this.n // 2
    this.doubleN // 4
  }
}
```

#### Parâmetros de tipo

| Nome | Tipo |
| :------ | :------ |
| `Id` | extends `string` |
| `S` | extends [`StateTree`](pinia.md#statetree) |
| `G` | extends [`_GettersTree`](pinia.md#_getterstree)<`S`\> |
| `A` | `A` |
| `KeyMapper` | extends `Record`<`string`, keyof `S` \| keyof `G` \| (`store`: [`Store`](pinia.md#store)<`Id`, `S`, `G`, `A`\>) => `any`\> |

#### Parâmetros

| Nome | Tipo | Descrição |
| :------ | :------ | :------ |
| `useStore` | [`StoreDefinition`](../interfaces/pinia.StoreDefinition.md)<`Id`, `S`, `G`, `A`\> | memória a delinear a partir de |
| `keyMapper` | `KeyMapper` | objeto de propriedades de estado ou recuperadores |

#### Retorna

[`_MapStateObjectReturn`](pinia.md#_mapstateobjectreturn)<`Id`, `S`, `G`, `A`, `KeyMapper`\>

#### Definida em

[packages/pinia/src/mapHelpers.ts:194](https://github.com/vuejs/pinia/blob/2b998ee/packages/pinia/src/mapHelpers.ts#L194)

▸ **mapState**<`Id`, `S`, `G`, `A`, `Keys`\>(`useStore`, `keys`): [`_MapStateReturn`](pinia.md#_mapstatereturn)<`S`, `G`, `Keys`\>

Permite a utilização de estado e recuperadores de uma memória sem a utilização da
API de composição (`setup()`) pela geração de um objeto a ser propagado em um campo
`computed` de um componente.

**`example`**
```js
export default {
  computed: {
    // outras propriedades computadas
    ...mapState(useCounterStore, ['count', 'double'])
  },

  created() {
    this.count // 2
    this.double // 4
  }
}
```

#### Parâmetros de tipo

| Nome | Tipo |
| :------ | :------ |
| `Id` | extends `string` |
| `S` | extends [`StateTree`](pinia.md#statetree) |
| `G` | extends [`_GettersTree`](pinia.md#_getterstree)<`S`\> |
| `A` | `A` |
| `Keys` | extends `string` \| `number` \| `symbol` |

#### Parâmetros

| Nome | Tipo | Descrição |
| :------ | :------ | :------ |
| `useStore` | [`StoreDefinition`](../interfaces/pinia.StoreDefinition.md)<`Id`, `S`, `G`, `A`\> | memória a delinear a partir de |
| `keys` | readonly `Keys`[] | arranjo de propriedades estado ou recuperadores |

#### Retorna

[`_MapStateReturn`](pinia.md#_mapstatereturn)<`S`, `G`, `Keys`\>

#### Definida em

[packages/pinia/src/mapHelpers.ts:231](https://github.com/vuejs/pinia/blob/2b998ee/packages/pinia/src/mapHelpers.ts#L231)

___

### mapStores

▸ **mapStores**<`Stores`\>(...`stores`): [`_Spread`](pinia.md#_spread)<`Stores`\>

Permite a utilização de memórias sem a API de composição (`setup()`) pela geração
de um objeto a ser propagado em um campo `computed` de um componente. Ela aceita
uma lista de definições de memória.

**`example`**
```js
export default {
  computed: {
    // outras propriedades computadas
    ...mapStores(useUserStore, useCartStore)
  },

  created() {
    this.userStore // memória com a `id` "user"
    this.cartStore // memória com a `id` "cart"
  }
}
```

#### Parâmetros de tipo

| Nome | Tipo |
| :------ | :------ |
| `Stores` | extends `any`[] |

#### Parâmetros

| Nome | Tipo | Descrição |
| :------ | :------ | :------ |
| `...stores` | [...Stores[]] | lista de memórias para delinear para um objeto |

#### Retorna

[`_Spread`](pinia.md#_spread)<`Stores`\>

#### Definida em

[packages/pinia/src/mapHelpers.ts:96](https://github.com/vuejs/pinia/blob/2b998ee/packages/pinia/src/mapHelpers.ts#L96)

___

### mapWritableState

▸ **mapWritableState**<`Id`, `S`, `G`, `A`, `KeyMapper`\>(`useStore`, `keyMapper`): [`_MapWritableStateObjectReturn`](pinia.md#_mapwritablestateobjectreturn)<`S`, `KeyMapper`\>

O mesmo que `mapState()` exceto que cria definidores computados bem como o estado
que pode ser modificado. Diferentemente de `mapState()`, apenas as propriedades de
`state` podem ser adicionadas.

#### Parâmetros de tipo

| Nome | Tipo |
| :------ | :------ |
| `Id` | extends `string` |
| `S` | extends [`StateTree`](pinia.md#statetree) |
| `G` | extends [`_GettersTree`](pinia.md#_getterstree)<`S`\> |
| `A` | `A` |
| `KeyMapper` | extends `Record`<`string`, keyof `S`\> |

#### Parâmetros

| Nome | Tipo | Descrição |
| :------ | :------ | :------ |
| `useStore` | [`StoreDefinition`](../interfaces/pinia.StoreDefinition.md)<`Id`, `S`, `G`, `A`\> | memória para mapear a partir de |
| `keyMapper` | `KeyMapper` | objeto de propriedades de estado |

#### Retorna

[`_MapWritableStateObjectReturn`](pinia.md#_mapwritablestateobjectreturn)<`S`, `KeyMapper`\>

#### Definida em

[packages/pinia/src/mapHelpers.ts:440](https://github.com/vuejs/pinia/blob/2b998ee/packages/pinia/src/mapHelpers.ts#L440)

▸ **mapWritableState**<`Id`, `S`, `G`, `A`\>(`useStore`, `keys`): [`_MapWritableStateReturn`](pinia.md#_mapwritablestatereturn)<`S`\>

Permite a utilização de estado e recuperadores de uma memória sem a utilização
da API de composição (`setup()`) pela geração de um objeto que pode ser propagado
em um campo `computed` de um componente.

#### Parâmetros de tipo

| Nome | Tipo |
| :------ | :------ |
| `Id` | extends `string` |
| `S` | extends [`StateTree`](pinia.md#statetree) |
| `G` | extends [`_GettersTree`](pinia.md#_getterstree)<`S`\> |
| `A` | `A` |

#### Parâmetros

| Nome | Tipo | Descrição |
| :------ | :------ | :------ |
| `useStore` | [`StoreDefinition`](../interfaces/pinia.StoreDefinition.md)<`Id`, `S`, `G`, `A`\> | memória para mapear a partir de |
| `keys` | keyof `S`[] | arranjo de propriedades de estado |

#### Retorna

[`_MapWritableStateReturn`](pinia.md#_mapwritablestatereturn)<`S`\>

#### Definida em

[packages/pinia/src/mapHelpers.ts:458](https://github.com/vuejs/pinia/blob/2b998ee/packages/pinia/src/mapHelpers.ts#L458)

___

### setActivePinia

▸ **setActivePinia**(`pinia`): `undefined` \| [`Pinia`](../interfaces/pinia.Pinia.md)

Define ou desfaz a definição da `pinia` ativa. Utilizada em SSR e internamente quando
se está chamado ações e recuperadores

#### Parâmetros

| Nome | Tipo | Descrição |
| :------ | :------ | :------ |
| `pinia` | `undefined` \| [`Pinia`](../interfaces/pinia.Pinia.md) | instância de Pinia |

#### Retorna

`undefined` \| [`Pinia`](../interfaces/pinia.Pinia.md)

#### Definida em

[packages/pinia/src/rootStore.ts:33](https://github.com/vuejs/pinia/blob/2b998ee/packages/pinia/src/rootStore.ts#L33)

___

### setMapStoreSuffix

▸ **setMapStoreSuffix**(`suffix`): `void`

Muda o sufixo adicionado pelo `mapStores()`. Pode ser definido para uma sequência
de caracteres vazia. Predefinida para `"Store"`. Certifique-se de estender a 
interface `MapStoresCustomization` se precisares de utilizar TypeScript.

#### Parâmetros

| Nome | Tipo | Descrição |
| :------ | :------ | :------ |
| `suffix` | `string` | novo sufixo |

#### Retorna

`void`

#### Definida em

[packages/pinia/src/mapHelpers.ts:66](https://github.com/vuejs/pinia/blob/2b998ee/packages/pinia/src/mapHelpers.ts#L66)

___

### skipHydrate

▸ **skipHydrate**<`T`\>(`obj`): `T`

#### Parâmetros de tipo

| Nome | Tipo |
| :------ | :------ |
| `T` | `any` |

#### Parâmetros

| Nome | Tipo |
| :------ | :------ |
| `obj` | `T` |

#### Retorna

`T`

#### Definida em

[packages/pinia/src/store.ts:87](https://github.com/vuejs/pinia/blob/2b998ee/packages/pinia/src/store.ts#L87)

___

### storeToRefs

▸ **storeToRefs**<`SS`\>(`store`): `ToRefs`<[`StoreState`](pinia.md#storestate)<`SS`\> & [`StoreGetters`](pinia.md#storegetters)<`SS`\> & [`PiniaCustomStateProperties`](../interfaces/pinia.PiniaCustomStateProperties.md)<[`StoreState`](pinia.md#storestate)<`SS`\>\>\>

Cria um objeto de referências com todos o estado, os recuperadores e propriedades de
estado adicionadas por extensão da memória. Semelhante ao `toRefs()` mas especialmente
desenhada para as memórias de Pinia assim métodos e propriedades não reativas são
completamente ignoradas.

#### Parâmetros de tipo

| Nome | Tipo |
| :------ | :------ |
| `SS` | extends [`_StoreWithState`](../interfaces/pinia._StoreWithState.md)<`string`, [`StateTree`](pinia.md#statetree), [`_GettersTree`](pinia.md#_getterstree)<[`StateTree`](pinia.md#statetree)\>, [`_ActionsTree`](pinia.md#_actionstree), `SS`\> & {} & [`_StoreWithGetters`](pinia.md#_storewithgetters)<[`_GettersTree`](pinia.md#_getterstree)<[`StateTree`](pinia.md#statetree)\>\> & [`PiniaCustomProperties`](../interfaces/pinia.PiniaCustomProperties.md)<`string`, [`StateTree`](pinia.md#statetree), [`_GettersTree`](pinia.md#_getterstree)<[`StateTree`](pinia.md#statetree)\>, [`_ActionsTree`](pinia.md#_actionstree), `SS`\> & `PiniaCustomStateProperties`<[`StateTree`](pinia.md#statetree), `SS`\> |

#### Parâmetros

| Nome | Tipo | Descrição |
| :------ | :------ | :------ |
| `store` | `SS` | memória para extrair as referências a partir de |

#### Retorna

`ToRefs`<[`StoreState`](pinia.md#storestate)<`SS`\> & [`StoreGetters`](pinia.md#storegetters)<`SS`\> & [`PiniaCustomStateProperties`](../interfaces/pinia.PiniaCustomStateProperties.md)<[`StoreState`](pinia.md#storestate)<`SS`\>\>\>

#### Definida em

[packages/pinia/src/storeToRefs.ts:21](https://github.com/vuejs/pinia/blob/2b998ee/packages/pinia/src/storeToRefs.ts#L21)
