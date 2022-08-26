# Server Side Rendering (SSR)

:::tip
If you are using **Nuxt.js,** you need to read [**these instructions**](./nuxt.md) instead.
:::

Creating stores with Pinia should work out of the box for SSR as long as you call your `useStore()` functions at the top of `setup` functions, `getters` and `actions`:

```js
export default defineComponent({
  setup() {
    // this works because pinia knows what application is running inside of
    // `setup()`
    const main = useMainStore()
    return { main }
  },
})
```

## Using the store outside of `setup()`

If you need to use the store somewhere else, you need to pass the `pinia` instance [that was passed to the app](#install-the-plugin) to the `useStore()` function call:

```js
const pinia = createPinia()
const app = createApp(App)

app.use(router)
app.use(pinia)

router.beforeEach((to) => {
  // ✅ This will work make sure the correct store is used for the
  // current running app
  const main = useMainStore(pinia)

  if (to.meta.requiresAuth && !main.isLoggedIn) return '/login'
})
```

Pinia conveniently adds itself as `$pinia` to your app so you can use it in functions like `serverPrefetch()`:

```js
export default {
  serverPrefetch() {
    const store = useStore(this.$pinia)
  },
}
```

## State hydration

To hydrate the initial state, you need to make sure the rootState is included somewhere in the HTML for Pinia to pick it up later on. Depending on what you are using for SSR, **you should escape the state for security reasons**. We recommend using [@nuxt/devalue](https://github.com/nuxt-contrib/devalue) which is the one used by Nuxt.js:

```js
import devalue from '@nuxt/devalue'
import { createPinia } from 'pinia'
// retrieve the rootState server side
const pinia = createPinia()
const app = createApp(App)
app.use(router)
app.use(pinia)

// after rendering the page, the root state is built and can be read directly
// on `pinia.state.value`.

// serialize, escape (VERY important if the content of the state can be changed
// by the user, which is almost always the case), and place it somewhere on
// the page, for example, as a global variable.
devalue(pinia.state.value)
```

Depending on what you are using for SSR, you will set an _initial state_ variable that will be serialized in the HTML. You should also protect yourself from XSS attacks. For example, with [vite-ssr](https://github.com/frandiox/vite-ssr) you can use the [`transformState` option](https://github.com/frandiox/vite-ssr#state-serialization) and `@nuxt/devalue`:

```js
import devalue from '@nuxt/devalue'

export default viteSSR(
  App,
  {
    routes,
    transformState(state) {
      return import.meta.env.SSR ? devalue(state) : state
    },
  },
  ({ initialState }) => {
    // ...
    if (import.meta.env.SSR) {
      // this will be stringified and set to window.__INITIAL_STATE__
      initialState.pinia = pinia.state.value
    } else {
      // on the client side, we restore the state
      pinia.state.value = initialState.pinia
    }
  }
)
```

You can use [other alternatives](https://github.com/nuxt-contrib/devalue#see-also) to `@nuxt/devalue` depending on what you need, e.g. if you can serialize and parse your state with `JSON.stringify()`/`JSON.parse()`, **you could improve your performance by a lot**.

Adapt this strategy to your environment. Make sure to hydrate pinia's state before calling any `useStore()` function on client side. For example, if we serialize the state into a `<script>` tag to make it accessible globally on client side through `window.__pinia`, we can write this:

```js
const pinia = createPinia()
const app = createApp(App)
app.use(pinia)

// must be set by the user
if (isClient) {
  pinia.state.value = JSON.parse(window.__pinia)
}
```
