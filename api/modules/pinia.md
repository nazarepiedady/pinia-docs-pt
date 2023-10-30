---
editLink: false
---

[API Documentation](../index.md) / pinia

# Módulo: pinia %{#Module-pinia}%

## Enumerações %{#Enumerations}%

- [`MutationType`](../enums/pinia.MutationType.md)

## Interfaces %{#Interfaces}%

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

## Pseudónimos de Tipo %{#Type-Aliases}%

### `PiniaStorePlugin` %{#PiniaStorePlugin}%

Ƭ **PiniaStorePlugin**: [`PiniaPlugin`](../interfaces/pinia.PiniaPlugin.md)

Extensão para estender toda memória.

**`Deprecated`**

use `PiniaPlugin`

___

### `StateTree` %{#StateTree}%

Ƭ **StateTree**: `Record`<`string` \| `number` \| `symbol`, `any`\>

Estado genérico duma Memória

___

### `Store` %{#Store}%

Ƭ **Store**<`Id`, `S`, `G`, `A`\>: [`_StoreWithState`](../interfaces/pinia._StoreWithState.md)<`Id`, `S`, `G`, `A`\> & `UnwrapRef`<`S`\> & [`_StoreWithGetters`](pinia.md#_storewithgetters)<`G`\> & [`_ActionsTree`](pinia.md#_actionstree) extends `A` ? {} : `A` & [`PiniaCustomProperties`](../interfaces/pinia.PiniaCustomProperties.md)<`Id`, `S`, `G`, `A`\> & [`PiniaCustomStateProperties`](../interfaces/pinia.PiniaCustomStateProperties.md)<`S`\>

Tipo de memória para construir uma memoria.

#### Parâmetros de Tipo %{#Type-parameters}%

| Nome | Tipo |
| :------ | :------ |
| `Id` | extends `string` = `string` |
| `S` | extends [`StateTree`](pinia.md#statetree) = {} |
| `G` | {} |
| `A` | {} |

___

### `StoreActions` %{#StoreActions}%

Ƭ **StoreActions**<`SS`\>: `SS` extends [`Store`](pinia.md#store)<`string`, [`StateTree`](pinia.md#statetree), [`_GettersTree`](pinia.md#_getterstree)<[`StateTree`](pinia.md#statetree)\>, infer A\> ? `A` : [`_ExtractActionsFromSetupStore`](pinia.md#_extractactionsfromsetupstore)<`SS`\>

Extrai as ações dum tipo de memória. Funciona com ambas memória de Composição ou uma memória de Opções.

#### Parâmetros de Tipo %{#Type-parameters-1}%

| Nome |
| :------ |
| `SS` |

___

### `StoreGeneric` %{#StoreGeneric}%

Ƭ **StoreGeneric**: [`Store`](pinia.md#store)<`string`, [`StateTree`](pinia.md#statetree), [`_GettersTree`](pinia.md#_getterstree)<[`StateTree`](pinia.md#statetree)\>, [`_ActionsTree`](pinia.md#_actionstree)\>

Versão genérica e de tipo inseguro da memória. Não falha no acesso com sequências de caracteres, tornando mais fácil de escrever funções genéricas que não se importam com a memória que é passada.

___

### `StoreGetters` %{#StoreGetters}%

Ƭ **StoreGetters**<`SS`\>: `SS` extends [`Store`](pinia.md#store)<`string`, [`StateTree`](pinia.md#statetree), infer G, [`_ActionsTree`](pinia.md#_actionstree)\> ? [`_StoreWithGetters`](pinia.md#_storewithgetters)<`G`\> : [`_ExtractGettersFromSetupStore`](pinia.md#_extractgettersfromsetupstore)<`SS`\>

Extrai os recuperadores dum tipo de memória. Funciona com ambas memória de Composição ou uma memória de Opções.

#### Parâmetros de Tipo %{#Type-parameters-2}%

| Nome |
| :------ |
| `SS` |

___

### `StoreOnActionListener` %{#StoreOnActionListener}%

Ƭ **StoreOnActionListener**<`Id`, `S`, `G`, `A`\>: (`context`: [`StoreOnActionListenerContext`](pinia.md#storeonactionlistenercontext)<`Id`, `S`, `G`, {} extends `A` ? [`_ActionsTree`](pinia.md#_actionstree) : `A`\>) => `void`

#### Parâmetros de Tipo %{#Type-parameters-3}%

| Nome | Tipo |
| :------ | :------ |
| `Id` | extends `string` |
| `S` | extends [`StateTree`](pinia.md#statetree) |
| `G` | `G` |
| `A` | `A` |

#### Declaração de Tipo %{#Type-declaration}%

▸ (`context`): `void`

Argumento da `store.$onAction()`

##### Parâmetros %{#Parameters}%

| Nome | Tipo |
| :------ | :------ |
| `context` | [`StoreOnActionListenerContext`](pinia.md#storeonactionlistenercontext)<`Id`, `S`, `G`, {} extends `A` ? [`_ActionsTree`](pinia.md#_actionstree) : `A`\> |

##### Retornos %{#Returns}%

`void`

___

### `StoreOnActionListenerContext` %{#StoreOnActionListenerContext}%

Ƭ **StoreOnActionListenerContext**<`Id`, `S`, `G`, `A`\>: [`_ActionsTree`](pinia.md#_actionstree) extends `A` ? [`_StoreOnActionListenerContext`](../interfaces/pinia._StoreOnActionListenerContext.md)<[`StoreGeneric`](pinia.md#storegeneric), `string`, [`_ActionsTree`](pinia.md#_actionstree)\> : { [Name in keyof A]: Name extends string ? \_StoreOnActionListenerContext<Store<Id, S, G, A\>, Name, A\> : never }[keyof `A`]

Objeto de contexto passado às funções de resposta de `store.$onAction(context => {})`. TODO: deve possuir apenas o identificador único (ou, Id), a memória e as ações para gerar o objeto apropriado.

#### Parâmetros de Tipo %{#Type-parameters-4}%

| Nome | Tipo |
| :------ | :------ |
| `Id` | extends `string` |
| `S` | extends [`StateTree`](pinia.md#statetree) |
| `G` | `G` |
| `A` | `A` |

___

### `StoreState` %{#StoreState}%

Ƭ **StoreState**<`SS`\>: `SS` extends [`Store`](pinia.md#store)<`string`, infer S, [`_GettersTree`](pinia.md#_getterstree)<[`StateTree`](pinia.md#statetree)\>, [`_ActionsTree`](pinia.md#_actionstree)\> ? `UnwrapRef`<`S`\> : [`_ExtractStateFromSetupStore`](pinia.md#_extractstatefromsetupstore)<`SS`\>

Extrai o estado dum tipo de memória. Funciona com ambas memória de Composição ou uma memória de Opções. Nota que isto desembrulha as referências.

#### Parâmetros de Tipo %{#Type-parameters-5}%

| Nome |
| :------ |
| `SS` |

___

### `SubscriptionCallback` %{#SubscriptionCallback}%

Ƭ **SubscriptionCallback**<`S`\>: (`mutation`: [`SubscriptionCallbackMutation`](pinia.md#subscriptioncallbackmutation)<`S`\>, `state`: `UnwrapRef`<`S`\>) => `void`

#### Parâmetros de Tipo %{#Type-parameters-6}%

| Nome |
| :------ |
| `S` |

#### Declaração de Tipo %{#Type-declaration-1}%

▸ (`mutation`, `state`): `void`

Função de resposta duma subscrição

##### Parâmetros %{#Parameters-1}%

| Nome | Tipo |
| :------ | :------ |
| `mutation` | [`SubscriptionCallbackMutation`](pinia.md#subscriptioncallbackmutation)<`S`\> |
| `state` | `UnwrapRef`<`S`\> |

##### Retornos %{#Returns-1}%

`void`

___

### `SubscriptionCallbackMutation` %{#SubscriptionCallbackMutation}%

Ƭ **SubscriptionCallbackMutation**<`S`\>: [`SubscriptionCallbackMutationDirect`](../interfaces/pinia.SubscriptionCallbackMutationDirect.md) \| [`SubscriptionCallbackMutationPatchObject`](../interfaces/pinia.SubscriptionCallbackMutationPatchObject.md)<`S`\> \| [`SubscriptionCallbackMutationPatchFunction`](../interfaces/pinia.SubscriptionCallbackMutationPatchFunction.md)

Objeto de contexto passado à uma função de resposta de subscrição.

#### Parâmetros de Tipo %{#Type-parameters-7}%

| Nome |
| :------ |
| `S` |

___

### `_ActionsTree` %{#-ActionsTree}%

Ƭ **\_ActionsTree**: `Record`<`string`, [`_Method`](pinia.md#_method)\>

Tipo dum objeto de ações. Apenas para uso interno. **Apenas** para uso interno.

___

### `_Awaited` %{#-Awaited}%

Ƭ **\_Awaited**<`T`\>: `T` extends ``null`` \| `undefined` ? `T` : `T` extends `object` & { `then`: (`onfulfilled`: `F`) => `any`  } ? `F` extends (`value`: infer V, ...`args`: `any`) => `any` ? [`_Awaited`](pinia.md#_awaited)<`V`\> : `never` : `T`

#### Parâmetros de Tipo %{#Type-parameters-8}%

| Nome |
| :------ |
| `T` |

___

### `_DeepPartial` %{#-DeepPartial}%

Ƭ **\_DeepPartial**<`T`\>: { [K in keyof T]?: \_DeepPartial<T[K]\> }

`Partial<T>` recursivo. Usado pelo [[`$patch`]](pinia.md#store).

**Apenas** para uso interno

#### Parâmetros de Tipo %{#Type-parameters-9}%

| Nome |
| :------ |
| `T` |

___

### `_ExtractActionsFromSetupStore` %{#-ExtractActionsFromSetupStore}%

Ƭ **\_ExtractActionsFromSetupStore**<`SS`\>: `SS` extends `undefined` \| `void` ? {} : [`_ExtractActionsFromSetupStore_Keys`](pinia.md#_extractactionsfromsetupstore_keys)<`SS`\> extends keyof `SS` ? `Pick`<`SS`, [`_ExtractActionsFromSetupStore_Keys`](pinia.md#_extractactionsfromsetupstore_keys)<`SS`\>\> : `never`

**Apenas** para uso interno

#### Parâmetros de Tipo %{#Type-parameters-10}%

| Nome |
| :------ |
| `SS` |

___

### `_ExtractActionsFromSetupStore_Keys` %{#-ExtractActionsFromSetupStore-Keys}%

Ƭ **\_ExtractActionsFromSetupStore\_Keys**<`SS`\>: keyof { [K in keyof SS as SS[K] extends \_Method ? K : never]: any }

Tipo que ativa a refatoração através do ambiente de desenvolvimento integrado. **Apenas** para uso interno 

#### Parâmetros de Tipo %{#Type-parameters-11}%

| Nome |
| :------ |
| `SS` |

___

### `_ExtractGettersFromSetupStore` %{#-ExtractGettersFromSetupStore}%

Ƭ **\_ExtractGettersFromSetupStore**<`SS`\>: `SS` extends `undefined` \| `void` ? {} : [`_ExtractGettersFromSetupStore_Keys`](pinia.md#_extractgettersfromsetupstore_keys)<`SS`\> extends keyof `SS` ? `Pick`<`SS`, [`_ExtractGettersFromSetupStore_Keys`](pinia.md#_extractgettersfromsetupstore_keys)<`SS`\>\> : `never`

**Apenas** para uso interno

#### Parâmetros de Tipo %{#Type-parameters-12}%

| Nome |
| :------ |
| `SS` |

___

### `_ExtractGettersFromSetupStore_Keys` %{#-ExtractGettersFromSetupStore-Keys}%

Ƭ **\_ExtractGettersFromSetupStore\_Keys**<`SS`\>: keyof { [K in keyof SS as SS[K] extends ComputedRef ? K : never]: any }

Tipo que ativa a refatoração através do ambiente de desenvolvimento integrado. **Apenas** para uso interno 

#### Parâmetros de Tipo %{#Type-parameters-13}%

| Nome |
| :------ |
| `SS` |

___

### `_ExtractStateFromSetupStore` %{#-ExtractStateFromSetupStore}%

Ƭ **\_ExtractStateFromSetupStore**<`SS`\>: `SS` extends `undefined` \| `void` ? {} : [`_ExtractStateFromSetupStore_Keys`](pinia.md#_extractstatefromsetupstore_keys)<`SS`\> extends keyof `SS` ? [`_UnwrapAll`](pinia.md#_unwrapall)<`Pick`<`SS`, [`_ExtractStateFromSetupStore_Keys`](pinia.md#_extractstatefromsetupstore_keys)<`SS`\>\>\> : `never`

**Apenas** para uso interno

#### Parâmetros de Tipo %{#Type-parameters-14}%

| Nome |
| :------ |
| `SS` |

___

### `_ExtractStateFromSetupStore_Keys` %{#-ExtractStateFromSetupStore-Keys}%

Ƭ **\_ExtractStateFromSetupStore\_Keys**<`SS`\>: keyof { [K in keyof SS as SS[K] extends \_Method \| ComputedRef ? never : K]: any }

Tipo que ativa a refatoração através do ambiente de desenvolvimento integrado. **Apenas** para uso interno 

#### Parâmetros de Tipo %{#Type-parameters-15}%

| Nome |
| :------ |
| `SS` |

___

### `_GettersTree` %{#-GettersTree}%

Ƭ **\_GettersTree**<`S`\>: `Record`<`string`, (`state`: `UnwrapRef`<`S`\> & `UnwrapRef`<[`PiniaCustomStateProperties`](../interfaces/pinia.PiniaCustomStateProperties.md)<`S`\>\>) => `any` \| () => `any`\>

Tipo dum objeto de recuperadores que inferem o argumento. Apenas para uso interno. **Apenas** para uso interno.

#### Parâmetro de Tipo %{#Type-parameters-16}%

| Nome | Tipo |
| :------ | :------ |
| `S` | extends [`StateTree`](pinia.md#statetree) |

___

### `_MapActionsObjectReturn` %{#-MapActionsObjectReturn}%

Ƭ **\_MapActionsObjectReturn**<`A`, `T`\>: { [key in keyof T]: A[T[key]] }

**Apenas** para uso interno

#### Parâmetros de Tipo %{#Type-parameters-17}%

| Nome | Tipo |
| :------ | :------ |
| `A` | `A` |
| `T` | extends `Record`<`string`, keyof `A`\> |

___

### `_MapActionsReturn` %{#-MapActionsReturn}%

Ƭ **\_MapActionsReturn**<`A`\>: { [key in keyof A]: A[key] }

**Apenas** para uso interno

#### Parâmetros de Tipo %{#Type-parameters-18}%

| Nome |
| :------ |
| `A` |

___

### `_MapStateObjectReturn` %{#-MapStateObjectReturn}%

Ƭ **\_MapStateObjectReturn**<`Id`, `S`, `G`, `A`, `T`\>: { [key in keyof T]: Function }

**Apenas** para uso interno

#### Parâmetros de Tipo %{#Type-parameters-19}%

| Nome | Tipo |
| :------ | :------ |
| `Id` | extends `string` |
| `S` | extends [`StateTree`](pinia.md#statetree) |
| `G` | extends [`_GettersTree`](pinia.md#_getterstree)<`S`\> |
| `A` | `A` |
| `T` | extends `Record`<`string`, keyof `S` \| keyof `G` \| (`store`: [`Store`](pinia.md#store)<`Id`, `S`, `G`, `A`\>) => `any`\> = {} |

___

### `_MapStateReturn` %{#-MapStateReturn}%

Ƭ **\_MapStateReturn**<`S`, `G`, `Keys`\>: { [key in Keys]: Function }

**Apenas** para uso interno

#### Parâmetros de Tipo %{#Type-parameters-20}%

| Nome | Tipo |
| :------ | :------ |
| `S` | extends [`StateTree`](pinia.md#statetree) |
| `G` | extends [`_GettersTree`](pinia.md#_getterstree)<`S`\> |
| `Keys` | extends keyof `S` \| keyof `G` = keyof `S` \| keyof `G` |

___

### `_MapWritableStateObjectReturn` %{#-MapWritableStateObjectReturn}%

Ƭ **\_MapWritableStateObjectReturn**<`S`, `T`\>: { [key in keyof T]: Object }

**Apenas** para uso interno

#### Parâmetros de Tipo %{#Type-parameters-21}%

| Nome | Tipo |
| :------ | :------ |
| `S` | extends [`StateTree`](pinia.md#statetree) |
| `T` | extends `Record`<`string`, keyof `S`\> |

___

### `_MapWritableStateReturn` %{#-MapWritableStateReturn}%

Ƭ **\_MapWritableStateReturn**<`S`\>: { [key in keyof S]: Object }

**Apenas** para uso interno

#### Parâmetros de Tipo %{#Type-parameters-22}%

| Nome | Tipo |
| :------ | :------ |
| `S` | extends [`StateTree`](pinia.md#statetree) |

___

### `_Method` %{#-Method}%

Ƭ **\_Method**: (...`args`: `any`[]) => `any`

#### Declaração de Tipo %{#Type-declaration-2}%

▸ (`...args`): `any`

Tipo genérico para uma função que infere os argumentos e retorna o tipo.

**Apenas** para uso interno

##### Parâmetros %{#Parameters-2}%

| Nome | Tipo |
| :------ | :------ |
| `...args` | `any`[] |

##### Retornos %{#Returns-2}%

`any`

___

### `_Spread` %{#-Spread}%

Ƭ **\_Spread**<`A`\>: `A` extends [infer L, ...(infer R)] ? [`_StoreObject`](pinia.md#_storeobject)<`L`\> & [`_Spread`](pinia.md#_spread)<`R`\> : `unknown`

**Apenas** para uso interno.

#### Parâmetros de Tipo %{#Type-parameters-23}%

| Nome | Tipo |
| :------ | :------ |
| `A` | extends readonly `any`[] |

___

### `_StoreObject` %{#-StoreObject}%

Ƭ **\_StoreObject**<`S`\>: `S` extends [`StoreDefinition`](../interfaces/pinia.StoreDefinition.md)<infer Ids, infer State, infer Getters, infer Actions\> ? { [Id in \`${Ids}${MapStoresCustomization extends Record<"suffix", infer Suffix\> ? Suffix : "Store"}\`]: Function } : {}

**Apenas** para uso interno.

#### Parâmetros de Tipo %{#Type-parameters-24}%

| Nome |
| :------ |
| `S` |

___

### `_StoreWithActions` %{#-StoreWithActions}%

Ƭ **\_StoreWithActions**<`A`\>: { [k in keyof A]: A[k] extends Function ? Function : never }

Memória aumentada para as ações. Apenas para uso interno. **Apenas** para uso interno.

#### Parâmetros de Tipo %{#Type-parameters-25}%

| Nome |
| :------ |
| `A` |

___

### `_StoreWithGetters` %{#-StoreWithGetters}%

Ƭ **\_StoreWithGetters**<`G`\>: { readonly [k in keyof G]: G[k] extends Function ? R : UnwrapRef<G[k]\> }

Memória aumentada com os recuperadores. Apenas para uso interno. **Apenas** para uso interno.

#### Parâmetros de Tipo %{#Type-parameters-26}%

| Nome |
| :------ |
| `G` |

___

### `_UnwrapAll` %{#-UnwrapAll}%

Ƭ **\_UnwrapAll**<`SS`\>: { [K in keyof SS]: UnwrapRef<SS[K]\> }

Tipo que ativa a refatoração através do ambiente de desenvolvimento integrado. **Apenas** para uso interno

#### Parâmetros de Tipo %{#Type-parameters-27}%

| Nome |
| :------ |
| `SS` |

## Variáveis %{#Variables}%

### `PiniaVuePlugin` %{#PiniaVuePlugin}%

• `Const` **PiniaVuePlugin**: `Plugin`

Extensão de Vue 2 que deve ser instalada para a pinia funcionar. Nota que **não precisamos desta extensão se estivermos a usar a Nuxt.js**. Use `buildModule`: https://pinia-docs-pt.netlify.app/ssr/nuxt.html.

**Exemplo**

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

**Parâmetro**

`Vue` importada a partir de 'vue'.

## Funções %{#Functions}%

### `acceptHMRUpdate` %{#acceptHMRUpdate}%

▸ **acceptHMRUpdate**<`Id`, `S`, `G`, `A`\>(`initialUseStore`, `hot`): (`newModule`: `any`) => `any`

Cria um função de _aceitação_ para passar ao `import.meta.hot` em aplicações de Vite.

#### Parâmetros de Tipo %{#Type-parameters-28}%

| Nome | Tipo |
| :------ | :------ |
| `Id` | extends `string` = `string` |
| `S` | extends [`StateTree`](pinia.md#statetree) = [`StateTree`](pinia.md#statetree) |
| `G` | extends [`_GettersTree`](pinia.md#_getterstree)<`S`\> = [`_GettersTree`](pinia.md#_getterstree)<`S`\> |
| `A` | [`_ActionsTree`](pinia.md#_actionstree) |

#### Parâmetros %{#Parameters-3}%

| Nome | Tipo | Descrição |
| :------ | :------ | :------ |
| `initialUseStore` | [`StoreDefinition`](../interfaces/pinia.StoreDefinition.md)<`Id`, `S`, `G`, `A`\> | retorno da `defineStore` para atualização instantânea |
| `hot` | `any` | `import.meta.hot` |

#### Retornos %{#Returns-3}%

`fn`

▸ (`newModule`): `any`

##### Parâmetros %{#Parameters-4}%

| Nome | Tipo |
| :------ | :------ |
| `newModule` | `any` |

##### Retornos %{#Returns-4}%

`any`

**Exemplo**

```js
const useUser = defineStore(...)
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUser, import.meta.hot))
}
```

___

### `createPinia` %{#createPinia}%

▸ **createPinia**(): [`Pinia`](../interfaces/pinia.Pinia.md)

Cria uma instância de pinia à ser usada pela aplicação.

#### Retornos %{#Returns-5}%

[`Pinia`](../interfaces/pinia.Pinia.md)

___

### `defineStore` %{#defineStore}%

▸ **defineStore**<`Id`, `S`, `G`, `A`\>(`id`, `options`): [`StoreDefinition`](../interfaces/pinia.StoreDefinition.md)<`Id`, `S`, `G`, `A`\>

Cria uma função de `useStore` que recupera a instância da memória

#### Parâmetros de Tipo %{#Type-parameters-29}%

| Nome | Tipo |
| :------ | :------ |
| `Id` | extends `string` |
| `S` | extends [`StateTree`](pinia.md#statetree) = {} |
| `G` | extends [`_GettersTree`](pinia.md#_getterstree)<`S`\> = {} |
| `A` | {} |

#### Parâmetros %{#Parameters-5}%

| Nome | Tipo | Description |
| :------ | :------ | :------ |
| `id` | `Id` | identificador único da memória (deve ser único) |
| `options` | `Omit`<[`DefineStoreOptions`](../interfaces/pinia.DefineStoreOptions.md)<`Id`, `S`, `G`, `A`\>, ``"id"``\> | opções para definir a memória |

#### Retornos %{#Returns-6}%

[`StoreDefinition`](../interfaces/pinia.StoreDefinition.md)<`Id`, `S`, `G`, `A`\>

▸ **defineStore**<`Id`, `S`, `G`, `A`\>(`options`): [`StoreDefinition`](../interfaces/pinia.StoreDefinition.md)<`Id`, `S`, `G`, `A`\>

Cria uma função de `useStore` que recupera esta a instância da memória.

#### Parâmetros de Tipo %{#Type-parameters-30}%

| Nome | Tipo |
| :------ | :------ |
| `Id` | extends `string` |
| `S` | extends [`StateTree`](pinia.md#statetree) = {} |
| `G` | extends [`_GettersTree`](pinia.md#_getterstree)<`S`\> = {} |
| `A` | {} |

#### Parâmetros %{#Parameters-6}%

| Nome | Tipo | Descrição |
| :------ | :------ | :------ |
| `options` | [`DefineStoreOptions`](../interfaces/pinia.DefineStoreOptions.md)<`Id`, `S`, `G`, `A`\> | opções para definir a memória |

#### Retornos %{#Returns-7}%

[`StoreDefinition`](../interfaces/pinia.StoreDefinition.md)<`Id`, `S`, `G`, `A`\>

▸ **defineStore**<`Id`, `SS`\>(`id`, `storeSetup`, `options?`): [`StoreDefinition`](../interfaces/pinia.StoreDefinition.md)<`Id`, [`_ExtractStateFromSetupStore`](pinia.md#_extractstatefromsetupstore)<`SS`\>, [`_ExtractGettersFromSetupStore`](pinia.md#_extractgettersfromsetupstore)<`SS`\>, [`_ExtractActionsFromSetupStore`](pinia.md#_extractactionsfromsetupstore)<`SS`\>\>

Cria uma função de `useStore` que recupera a instância da memória

#### Parâmetros de Tipo %{#Type-parameters-31}%

| Nome | Tipo |
| :------ | :------ |
| `Id` | extends `string` |
| `SS` | `SS` |

#### Parâmetros %{#Parameters-7}%

| Nome | Tipo | Descrição |
| :------ | :------ | :------ |
| `id` | `Id` | identificador único da memória (deve ser único) |
| `storeSetup` | () => `SS` | função que define a memória |
| `options?` | [`DefineSetupStoreOptions`](../interfaces/pinia.DefineSetupStoreOptions.md)<`Id`, [`_ExtractStateFromSetupStore`](pinia.md#_extractstatefromsetupstore)<`SS`\>, [`_ExtractGettersFromSetupStore`](pinia.md#_extractgettersfromsetupstore)<`SS`\>, [`_ExtractActionsFromSetupStore`](pinia.md#_extractactionsfromsetupstore)<`SS`\>\> | opções adicionais |

#### Retornos %{#Returns-8}%

[`StoreDefinition`](../interfaces/pinia.StoreDefinition.md)<`Id`, [`_ExtractStateFromSetupStore`](pinia.md#_extractstatefromsetupstore)<`SS`\>, [`_ExtractGettersFromSetupStore`](pinia.md#_extractgettersfromsetupstore)<`SS`\>, [`_ExtractActionsFromSetupStore`](pinia.md#_extractactionsfromsetupstore)<`SS`\>\>

___

### `getActivePinia` %{#getActivePinia}%

▸ **getActivePinia**(): `undefined` \| [`Pinia`](../interfaces/pinia.Pinia.md)

Obtém a pinia em atividade atualmente se existir alguma.

#### Retornos %{#Returns-9}%

`undefined` \| [`Pinia`](../interfaces/pinia.Pinia.md)

___

### `mapActions` %{#mapActions}%

▸ **mapActions**<`Id`, `S`, `G`, `A`, `KeyMapper`\>(`useStore`, `keyMapper`): [`_MapActionsObjectReturn`](pinia.md#_mapactionsobjectreturn)<`A`, `KeyMapper`\>

Permite usar diretamente ações a partir da nossa memória sem usar a API de composição (`setup()`) gerando um objeto à ser propagado no campo `methods` dum componente. Os valores do objeto são as ações enquanto as chaves são os nomes dos métodos resultantes.

#### Parâmetros de Tipo %{#Type-parameters-32}%

| Nome | Tipo |
| :------ | :------ |
| `Id` | extends `string` |
| `S` | extends [`StateTree`](pinia.md#statetree) |
| `G` | extends [`_GettersTree`](pinia.md#_getterstree)<`S`\> |
| `A` | `A` |
| `KeyMapper` | extends `Record`<`string`, keyof `A`\> |

#### Parâmetros %{#Parameters-8}%

| Nome | Tipo | Descrição |
| :------ | :------ | :------ |
| `useStore` | [`StoreDefinition`](../interfaces/pinia.StoreDefinition.md)<`Id`, `S`, `G`, `A`\> | store to map from |
| `keyMapper` | `KeyMapper` | objeto para definir novos nomes para as ações |

#### Retornos %{#Returns-10}%

[`_MapActionsObjectReturn`](pinia.md#_mapactionsobjectreturn)<`A`, `KeyMapper`\>

**Exemplo**

```js
export default {
  methods: {
    // outras propriedades de `methods`
    // `useCounterStore` tem duas ações nomeadas `increment` e `setCount`
    ...mapActions(useCounterStore, { moar: 'increment', setIt: 'setCount' })
  },

  created() {
    this.moar()
    this.setIt(2)
  }
}
```

▸ **mapActions**<`Id`, `S`, `G`, `A`\>(`useStore`, `keys`): [`_MapActionsReturn`](pinia.md#_mapactionsreturn)<`A`\>

Permite usar diretamente as ações a partir da nossa memória sem usar a API de composição (`setup()`) gerando um objeto à ser propagado no campo `methods` dum componente.

#### Parâmetros de Tipo %{#Type-parameters-33}%

| Nome | Tipo |
| :------ | :------ |
| `Id` | extends `string` |
| `S` | extends [`StateTree`](pinia.md#statetree) |
| `G` | extends [`_GettersTree`](pinia.md#_getterstree)<`S`\> |
| `A` | `A` |

#### Parâmetros %{#Parameters-9}%

| Nome | Tipo | Descrição |
| :------ | :------ | :------ |
| `useStore` | [`StoreDefinition`](../interfaces/pinia.StoreDefinition.md)<`Id`, `S`, `G`, `A`\> | memória a partir da qual mapear |
| `keys` | keyof `A`[] | vetor de nomes de ação à mapear |

#### Retornos %{#Returns-11}%

[`_MapActionsReturn`](pinia.md#_mapactionsreturn)<`A`\>

**Exemplo**

```js
export default {
  methods: {
    // outras propriedades de `methods`
    ...mapActions(useCounterStore, ['increment', 'setCount'])
  },

  created() {
    this.increment()
    this.setCount(2) // passar argumentos conforme o habitual
  }
}
```

___

### `mapGetters` %{#mapGetters}%

▸ **mapGetters**<`Id`, `S`, `G`, `A`, `KeyMapper`\>(`useStore`, `keyMapper`): [`_MapStateObjectReturn`](pinia.md#_mapstateobjectreturn)<`Id`, `S`, `G`, `A`, `KeyMapper`\>

Pseudónimo para `mapState()`. Nós deveríamos usar `mapState()`.

#### Parâmetros de Tipo %{#Type-parameters-34}%

| Nome | Tipo |
| :------ | :------ |
| `Id` | extends `string` |
| `S` | extends [`StateTree`](pinia.md#statetree) |
| `G` | extends [`_GettersTree`](pinia.md#_getterstree)<`S`\> |
| `A` | `A` |
| `KeyMapper` | extends `Record`<`string`, keyof `S` \| keyof `G` \| (`store`: [`Store`](pinia.md#store)<`Id`, `S`, `G`, `A`\>) => `any`\> |

#### Parâmetros %{#Parameters-10}%

| Nome | Tipo |
| :------ | :------ |
| `useStore` | [`StoreDefinition`](../interfaces/pinia.StoreDefinition.md)<`Id`, `S`, `G`, `A`\> |
| `keyMapper` | `KeyMapper` |

#### Retornos %{#Returns-12}%

[`_MapStateObjectReturn`](pinia.md#_mapstateobjectreturn)<`Id`, `S`, `G`, `A`, `KeyMapper`\>

**`Deprecated`**

use `mapState()`.

▸ **mapGetters**<`Id`, `S`, `G`, `A`, `Keys`\>(`useStore`, `keys`): [`_MapStateReturn`](pinia.md#_mapstatereturn)<`S`, `G`, `Keys`\>

Pseudónimo para `mapState()`. Nós deveríamos usar `mapState()`.

#### Parâmetros %{#Type-parameters-35}%

| Nome | Tipo |
| :------ | :------ |
| `Id` | extends `string` |
| `S` | extends [`StateTree`](pinia.md#statetree) |
| `G` | extends [`_GettersTree`](pinia.md#_getterstree)<`S`\> |
| `A` | `A` |
| `Keys` | extends `string` \| `number` \| `symbol` |

#### Parâmetros %{#Parameters-11}%

| Nome | Tipo |
| :------ | :------ |
| `useStore` | [`StoreDefinition`](../interfaces/pinia.StoreDefinition.md)<`Id`, `S`, `G`, `A`\> |
| `keys` | readonly `Keys`[] |

#### Retornos %{#Returns-13}%

[`_MapStateReturn`](pinia.md#_mapstatereturn)<`S`, `G`, `Keys`\>

**`Deprecated`**

use `mapState()`.

___

### `mapState` %{#mapState}%

▸ **mapState**<`Id`, `S`, `G`, `A`, `KeyMapper`\>(`useStore`, `keyMapper`): [`_MapStateObjectReturn`](pinia.md#_mapstateobjectreturn)<`Id`, `S`, `G`, `A`, `KeyMapper`\>

Permite usar o estado e os recuperadores a partir duma memória sem usar a API de composição (`setup()`) gerando um objeto à ser propagado no campo `computed` dum componente. Os valores do objeto são as propriedades de estado ou recuperadores enquanto as chaves são os nomes das propriedades computadas resultantes. Opcionalmente, também podemos passar uma função personalizada que receberá a memória como seu primeiro argumento. Nota que embora esta tenha acesso à instância do componente através da `this`, não será tipificada.

#### Parâmetros de Tipo %{#Type-parameters-36}%

| Nome | Tipo |
| :------ | :------ |
| `Id` | extends `string` |
| `S` | extends [`StateTree`](pinia.md#statetree) |
| `G` | extends [`_GettersTree`](pinia.md#_getterstree)<`S`\> |
| `A` | `A` |
| `KeyMapper` | extends `Record`<`string`, keyof `S` \| keyof `G` \| (`store`: [`Store`](pinia.md#store)<`Id`, `S`, `G`, `A`\>) => `any`\> |

#### Parâmetros %{#Parameters-12}%

| Nome | Tipo | Descrição |
| :------ | :------ | :------ |
| `useStore` | [`StoreDefinition`](../interfaces/pinia.StoreDefinition.md)<`Id`, `S`, `G`, `A`\> | memória a partir da qual mapear |
| `keyMapper` | `KeyMapper` | objeto de propriedades de estado e recuperadores |

#### Retornos %{#Returns-14}%

[`_MapStateObjectReturn`](pinia.md#_mapstateobjectreturn)<`Id`, `S`, `G`, `A`, `KeyMapper`\>

**Exemplo**

```js
export default {
  computed: {
    // outras propriedades de `computed`
    // `useCounterStore` tem uma propriedade de estado nomeada `count`
    // e um recuperador `double`
    ...mapState(useCounterStore, {
      n: 'count',
      triple: store => store.n * 3,
      // nota que não podemos usar uma função de flecha
      // se quisermos usar `this`
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

▸ **mapState**<`Id`, `S`, `G`, `A`, `Keys`\>(`useStore`, `keys`): [`_MapStateReturn`](pinia.md#_mapstatereturn)<`S`, `G`, `Keys`\>

Permite usar o estado e recuperadores a partir duma memória sem usar a API de composição (`setup()`) gerando um objeto à ser propagado no campo `computed` dum componente.

#### Parâmetros de Tipo %{#Type-parameters-37}%

| Nome | Tipo |
| :------ | :------ |
| `Id` | extends `string` |
| `S` | extends [`StateTree`](pinia.md#statetree) |
| `G` | extends [`_GettersTree`](pinia.md#_getterstree)<`S`\> |
| `A` | `A` |
| `Keys` | extends `string` \| `number` \| `symbol` |

#### Parâmetros %{#Parameters-13}%

| Nome | Tipo | Descrição |
| :------ | :------ | :------ |
| `useStore` | [`StoreDefinition`](../interfaces/pinia.StoreDefinition.md)<`Id`, `S`, `G`, `A`\> | memória a partir da qual mapear |
| `keys` | readonly `Keys`[] | vetor de propriedades de estado e recuperadores |

#### Retornos %{#Returns-15}%

[`_MapStateReturn`](pinia.md#_mapstatereturn)<`S`, `G`, `Keys`\>

**Exemplo**

```js
export default {
  computed: {
    // outras propriedades de `computed`
    ...mapState(useCounterStore, ['count', 'double'])
  },

  created() {
    this.count // 2
    this.double // 4
  }
}
```

___

### `mapStores` %{#mapStores}%

▸ **mapStores**<`Stores`\>(`...stores`): [`_Spread`](pinia.md#_spread)<`Stores`\>

Permite usar as memórias sem a API de composição (`setup()`) gerando um objeto à ser propagado no campo `computed` dum componente. Esta aceita uma lista de definições de memória.

#### Parâmetros de Tipo %{#Type-parameters-38}%

| Nome | Tipo |
| :------ | :------ |
| `Stores` | extends `any`[] |

#### Parâmetros %{#Parameters-14}%

| Nome | Tipo | Descrição |
| :------ | :------ | :------ |
| `...stores` | [`...Stores[]`] | lista de memórias à mapear à um objeto |

#### Retornos %{#Returns-16}%

[`_Spread`](pinia.md#_spread)<`Stores`\>

**Exemplo**

```js
export default {
  computed: {
    // outras propriedades de `computed`
    ...mapStores(useUserStore, useCartStore)
  },

  created() {
    this.userStore // memória com o identificador "user"
    this.cartStore // memória com o identificador "cart"
  }
}
```

___

### `mapWritableState` %{#mapWritableState}%

▸ **mapWritableState**<`Id`, `S`, `G`, `A`, `KeyMapper`\>(`useStore`, `keyMapper`): [`_MapWritableStateObjectReturn`](pinia.md#_mapwritablestateobjectreturn)<`S`, `KeyMapper`\>

O mesmo que `mapState` exceto que também cria definidores computados assim o estado pode ser modificado. Diferentemente de `mapState()`, apenas as propriedades de `state` podem ser adicionadas.

#### Parâmetros de Tipo %{#Type-parameters-39}%

| Nome | Tipo |
| :------ | :------ |
| `Id` | extends `string` |
| `S` | extends [`StateTree`](pinia.md#statetree) |
| `G` | extends [`_GettersTree`](pinia.md#_getterstree)<`S`\> |
| `A` | `A` |
| `KeyMapper` | extends `Record`<`string`, keyof `S`\> |

#### Parâmetros %{#Parameters-15}%

| Nome | Tipo | Descrição |
| :------ | :------ | :------ |
| `useStore` | [`StoreDefinition`](../interfaces/pinia.StoreDefinition.md)<`Id`, `S`, `G`, `A`\> | memória a partir da qual mapear |
| `keyMapper` | `KeyMapper` | objeto de propriedades de estado |

#### Retornos %{#Returns-17}%

[`_MapWritableStateObjectReturn`](pinia.md#_mapwritablestateobjectreturn)<`S`, `KeyMapper`\>

▸ **mapWritableState**<`Id`, `S`, `G`, `A`, `Keys`\>(`useStore`, `keys`): { [K in Keys]: Object }

Permite usar o estado e recuperadores a partir duma memória sem usar a API de composição (`setup()`) gerando um objeto à ser propagado no campo `computed` dum componente.

#### Parâmetros de Tipo %{#Type-parameters-40}%

| Nome | Tipo |
| :------ | :------ |
| `Id` | extends `string` |
| `S` | extends [`StateTree`](pinia.md#statetree) |
| `G` | extends [`_GettersTree`](pinia.md#_getterstree)<`S`\> |
| `A` | `A` |
| `Keys` | extends `string` \| `number` \| `symbol` |

#### Parâmetros %{#Parameters-16}%

| Nome | Tipo | Descrição |
| :------ | :------ | :------ |
| `useStore` | [`StoreDefinition`](../interfaces/pinia.StoreDefinition.md)<`Id`, `S`, `G`, `A`\> | memória a partir da qual mapear |
| `keys` | readonly `Keys`[] | vetor de propriedades de estado |

#### Retornos %{#Returns-18}%

{ [K in Keys]: Object }

___

### `setActivePinia` %{#setActivePinia}%

▸ **setActivePinia**(`pinia`): [`Pinia`](../interfaces/pinia.Pinia.md)

Define ou desfaz a definição da pinia em atividade. Usada na interpretação do lado do servidor e internamente quando chamamos as ações e recuperadores.

#### Parâmetros %{#Parameters-17}%

| Nome | Tipo | Descrição |
| :------ | :------ | :------ |
| `pinia` | [`Pinia`](../interfaces/pinia.Pinia.md) | instância de pinia |

#### Retornos %{#Returns-19}%

[`Pinia`](../interfaces/pinia.Pinia.md)

▸ **setActivePinia**(`pinia`): `undefined`

Define ou desfaz a definição da pinia em atividade. Usada na interpretação do lado do servidor e internamente quando chamamos as ações e recuperadores.

#### Parâmetros %{#Parameters-18}%

| Nome | Tipo | Descrição |
| :------ | :------ | :------ |
| `pinia` | `undefined` | instância de pinia |

#### Retornos %{#Returns-20}%

`undefined`

▸ **setActivePinia**(`pinia`): `undefined` \| [`Pinia`](../interfaces/pinia.Pinia.md)

Define ou desfaz a definição da pinia em atividade. Usada na interpretação do lado do servidor e internamente quando chamamos as ações e recuperadores.

#### Parâmetros %{#Parameters-19}%

| Nome | Tipo | Descrição |
| :------ | :------ | :------ |
| `pinia` | `undefined` \| [`Pinia`](../interfaces/pinia.Pinia.md) | instância de pinia |

#### Retornos %{#Returns-21}%

`undefined` \| [`Pinia`](../interfaces/pinia.Pinia.md)

___

### `setMapStoreSuffix` %{#setMapStoreSuffix}%

▸ **setMapStoreSuffix**(`suffix`): `void`

Muda o sufixo adicionado à `mapStores()`. Pode ser definido para uma sequência de caracteres vazia. Predefinida para `"Store"`. Devemos certificar-nos de estender a interface `MapStoresCustomization` se estivermos a usar a TypeScript.

#### Parâmetros %{#Parameters-20}%

| Nome | Tipo | Descrição |
| :------ | :------ | :------ |
| `suffix` | `string` | novo sufixo |

#### Retornos %{#Returns-22}%

`void`

___

### `skipHydrate` %{#skipHydrate}%

▸ **skipHydrate**<`T`\>(`obj`): `T`

Diz a pinia para ignorar o processo de hidratação dum dado objeto. Isto é útil em memórias de composição (apenas) quando retornamos um objeto com estado na memória mas que não é de fato estado, por exemplo, retornar uma instância do roteador numa memória de composição.

#### Parâmetros de Tipo %{#Type-parameters-41}%

| Nome | Tipo |
| :------ | :------ |
| `T` | `any` |

#### Parâmetros %{#Parameters-21}%

| Nome | Tipo | Descrição |
| :------ | :------ | :------ |
| `obj` | `T` | objeto alvo |

#### Retornos %{#Returns-23}%

`T`

obj

___

### `storeToRefs` %{#storeToRefs}%

▸ **storeToRefs**<`SS`\>(`store`): `StoreToRefs`<`SS`\>


Cria um objeto de referências com todos os estados, recuperadores, e propriedades de estado adicionados por extensão da memória. Semelhante à `toRefs()` mas especialmente desenhado para as memórias da pinia, assim métodos e propriedades que não são reativas são completamente ignorados.

#### Parâmetros de Tipo %{#Type-parameters-42}%

| Nome | Tipo |
| :------ | :------ |
| `SS` | extends [`_StoreWithState`](../interfaces/pinia._StoreWithState.md)<`string`, [`StateTree`](pinia.md#statetree), [`_GettersTree`](pinia.md#_getterstree)<[`StateTree`](pinia.md#statetree)\>, [`_ActionsTree`](pinia.md#_actionstree), `SS`\> & [`StateTree`](pinia.md#statetree) & [`_StoreWithGetters`](pinia.md#_storewithgetters)<[`_GettersTree`](pinia.md#_getterstree)<[`StateTree`](pinia.md#statetree)\>\> & [`PiniaCustomProperties`](../interfaces/pinia.PiniaCustomProperties.md)<`string`, [`StateTree`](pinia.md#statetree), [`_GettersTree`](pinia.md#_getterstree)<[`StateTree`](pinia.md#statetree)\>, [`_ActionsTree`](pinia.md#_actionstree), `SS`\> & [`PiniaCustomStateProperties`](../interfaces/pinia.PiniaCustomStateProperties.md)<[`StateTree`](pinia.md#statetree), `SS`\> |

#### Parâmetros %{#Parameters-22}%

| Nome | Tipo | Descrição |
| :------ | :------ | :------ |
| `store` | `SS` | memória a partir da qual extrair as referências |

#### Retornos %{#Returns-24}%

`StoreToRefs`<`SS`\>
