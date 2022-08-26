# Getters

<VueSchoolLink
  href="https://vueschool.io/lessons/getters-in-pinia"
  title="Learn all about getters in Pinia"
/>

Getters are exactly the equivalent of [computed values](https://vuejs.org/guide/essentials/computed.html) for the state of a Store. They can be defined with the `getters` property in `defineStore()`. They receive the `state` as the first parameter **to encourage** the usage of arrow function:

```js
export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
  }),
  getters: {
    doubleCount: (state) => state.count * 2,
  },
})
```

Most of the time, getters will only rely on the state, however, they might need to use other getters. Because of this, we can get access to the _whole store instance_ through `this` when defining a regular function **but it is necessary to define the type of the return type (in TypeScript)**. This is due to a known limitation in TypeScript and **doesn't affect getters defined with an arrow function nor getters not using `this`**:

```ts
export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
  }),
  getters: {
    // automatically infers the return type as a number
    doubleCount(state) {
      return state.count * 2
    },
    // the return type **must** be explicitly set
    doublePlusOne(): number {
      // autocompletion and typings for the whole store ✨
      return this.doubleCount + 1
    },
  },
})
```

Then you can access the getter directly on the store instance:

```vue
<template>
  <p>Double count is {{ store.doubleCount }}</p>
</template>

<script>
export default {
  setup() {
    const store = useCounterStore()

    return { store }
  },
}
</script>
```

## Accessing other getters

As with computed properties, you can combine multiple getters. Access any other getter via `this`. Even if you are not using TypeScript, you can hint your IDE for types with the [JSDoc](https://jsdoc.app/tags-returns.html):

```js
export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
  }),
  getters: {
    // type is automatically inferred because we are not using `this`
    doubleCount: (state) => state.count * 2,
    // here we need to add the type ourselves (using JSDoc in JS). We can also
    // use this to document the getter
    /**
     * Returns the count value times two plus one.
     *
     * @returns {number}
     */
    doubleCountPlusOne() {
      // autocompletion ✨
      return this.doubleCount + 1
    },
  },
})
```

## Passing arguments to getters

_Getters_ are just _computed_ properties behind the scenes, so it's not possible to pass any parameters to them. However, you can return a function from the _getter_ to accept any arguments:

```js
export const useStore = defineStore('main', {
  getters: {
    getUserById: (state) => {
      return (userId) => state.users.find((user) => user.id === userId)
    },
  },
})
```

and use in component:

```vue
<script>
export default {
  setup() {
    const store = useStore()

    return { getUserById: store.getUserById }
  },
}
</script>

<template>
  <p>User 2: {{ getUserById(2) }}</p>
</template>
```

Note that when doing this, **getters are not cached anymore**, they are simply functions that you invoke. You can however cache some results inside of the getter itself, which is uncommon but should prove more performant:

```js
export const useStore = defineStore('main', {
  getters: {
    getActiveUserById(state) {
      const activeUsers = state.users.filter((user) => user.active)
      return (userId) => activeUsers.find((user) => user.id === userId)
    },
  },
})
```

## Accessing other stores getters

To use another store getters, you can directly _use it_ inside of the _getter_:

```js
import { useOtherStore } from './other-store'

export const useStore = defineStore('main', {
  state: () => ({
    // ...
  }),
  getters: {
    otherGetter(state) {
      const otherStore = useOtherStore()
      return state.localData + otherStore.data
    },
  },
})
```

## Usage with `setup()`

You can directly access any getter as a property of the store (exactly like state properties):

```js
export default {
  setup() {
    const store = useCounterStore()

    store.count = 3
    store.doubleCount // 6
  },
}
```

## Usage with the Options API

<VueSchoolLink
  href="https://vueschool.io/lessons/access-pinia-getters-in-the-options-api"
  title="Access Pinia Getters via the Options API"
/>

For the following examples, you can assume the following store was created:

```js
// Example File Path:
// ./src/stores/counter.js

import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
  }),
  getters: {
    doubleCount(state) {
      return state.count * 2
    },
  },
})
```

### With `setup()`

While Composition API is not for everyone, the `setup()` hook can make using Pinia easier to work with in the Options API. No extra map helper functions needed!

```js
import { useCounterStore } from '../stores/counter'

export default {
  setup() {
    const counterStore = useCounterStore()

    return { counterStore }
  },
  computed: {
    quadrupleCounter() {
      return this.counterStore.doubleCount * 2
    },
  },
}
```

### Without `setup()`

You can use the same `mapState()` function used in the [previous section of state](./state.md#options-api) to map to getters:

```js
import { mapState } from 'pinia'
import { useCounterStore } from '../stores/counter'

export default {
  computed: {
    // gives access to this.doubleCount inside the component
    // same as reading from store.doubleCount
    ...mapState(useCounterStore, ['doubleCount']),
    // same as above but registers it as this.myOwnName
    ...mapState(useCounterStore, {
      myOwnName: 'doubleCount',
      // you can also write a function that gets access to the store
      double: (store) => store.doubleCount,
    }),
  },
}
```
