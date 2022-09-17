---
sidebar: "auto"
editLinks: false
sidebarDepth: 3
---

[Documentação da API](../index.md) / [@pinia/testing](../modules/pinia_testing.md) / TestingOptions

# Interface: TestingOptions

[@pinia/testing](../modules/pinia_testing.md).TestingOptions

## Propriedades

### fakeApp

• `Optional` **fakeApp**: `boolean`

Cria uma aplicação vazia e chama `app.use(pinia)` com a pinia de testes criada. Isto é, permite-te utilizar extensões enquanto estiveres realizando testes unitários visto que as extensões **esperarão a pinia ser instalada no sentido de serem executadas**. Predefinida para `false`.

#### Definida em

[packages/testing/src/testing.ts:57](https://github.com/vuejs/pinia/blob/2b998ee/packages/testing/src/testing.ts#L57)

___

### initialState

• `Optional` **initialState**: [`StateTree`](../modules/pinia.md#statetree)

Permite a definição de um estado inicial parcial de todas as tuas memórias. Este estado é aplicado depois de uma memória ser criada, permitindo-te apenas definir algumas propriedades que são obrigatórias no teu teste.

#### Definida em

[packages/testing/src/testing.ts:27](https://github.com/vuejs/pinia/blob/2b998ee/packages/testing/src/testing.ts#L27)

___

### plugins

• `Optional` **plugins**: [`PiniaPlugin`](pinia.PiniaPlugin.md)[]

As Extensões podem ser instaladas antes dos testes de extensão. Adiciona quaisquer extensões utilizadas na tua aplicação que será utilizada enquanto estiveres testando.

#### Definida em

[packages/testing/src/testing.ts:33](https://github.com/vuejs/pinia/blob/2b998ee/packages/testing/src/testing.ts#L33)

___

### stubActions

• `Optional` **stubActions**: `boolean`

Quando é definida como `false`, as ações são apenas espiadas, elas continua sendo executadas. Quando é definida como `true`, as ações serão substituídas por espiões, resultando na não execução do código deles. Predefinido como `true`. NOTA: quando estiveres fornecendo `createSpy()`, ela **apenas** tornará o argumento `fn` em `undefined`. Tu continuas a precisar manipular isto em `createSpy()`. 

#### Definida em

[packages/testing/src/testing.ts:42](https://github.com/vuejs/pinia/blob/2b998ee/packages/testing/src/testing.ts#L42)

___

### stubPatch

• `Optional` **stubPatch**: `boolean`

Quando é definida como `true`, as chamadas de `$patch()` não mudarão o estado. Predefinida como `false`. NOTA: quando estiveres fornecendo `createSpy()`, ela **apenas** tornará o argumento `fn` em `undefined`. Tu continuas a precisar manipular isto em `createSpy()`.

#### Definida em

[packages/testing/src/testing.ts:49](https://github.com/vuejs/pinia/blob/2b998ee/packages/testing/src/testing.ts#L49)

## Métodos

### createSpy

▸ `Optional` **createSpy**(`fn?`): (...`args`: `any`[]) => `any`

Função utilizada para criar um espião para as ações e `$patch()`. Pré-configurado com o `jest.fn()` em projetos utilizando `jest` ou `vi.fn()` em projetos utilizando `vitest`.

#### Parâmetros

| Nome | Tipo |
| :------ | :------ |
| `fn?` | (...`args`: `any`[]) => `any` |

#### Retorna

`fn`

▸ (...`args`): `any`

##### Parâmetros

| Nome | Tipo |
| :------ | :------ |
| `...args` | `any`[] |

##### Retorna

`any`

#### Definido em

[packages/testing/src/testing.ts:63](https://github.com/vuejs/pinia/blob/2b998ee/packages/testing/src/testing.ts#L63)
