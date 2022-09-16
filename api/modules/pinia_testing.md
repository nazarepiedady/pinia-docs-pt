---
sidebar: "auto"
editLinks: false
sidebarDepth: 3
---

[Documentação da API](../index.md) / @pinia/testing

# Módulo: @pinia/testing

## Interfaces

- [TestingOptions](../interfaces/pinia_testing.TestingOptions.md)
- [TestingPinia](../interfaces/pinia_testing.TestingPinia.md)

## Funções

### createTestingPinia

▸ **createTestingPinia**(`options?`): [`TestingPinia`](../interfaces/pinia_testing.TestingPinia.md)

Cria uma instância de pinia desenhada para testes de unidade que **precisam imitar** a memória. Por padrão, **todas ações são simuladas** e logo não executadas. Isto permite-te testar a unidade da sua memória e componentes separadamente. Tu podes mudar isto com a opção `stubActions`. Se estiveres utilizando a `jest`, elas são substituídas com a `jest.fn()`, de outro modo, tu deves fornecer a tua própria opção `createSpy`.

#### Parâmetros

| Nome | Tipo | Descrição |
| :------ | :------ | :------ |
| `options` | [`TestingOptions`](../interfaces/pinia_testing.TestingOptions.md) | opções para configurar a testagem de pinia |

#### Retorna

[`TestingPinia`](../interfaces/pinia_testing.TestingPinia.md)

uma instância de pinia aumentada

#### Definida em

[packages/testing/src/testing.ts:92](https://github.com/vuejs/pinia/blob/2b998ee/packages/testing/src/testing.ts#L92)
