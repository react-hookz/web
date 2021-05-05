# ![@react-hookz/web](.github/logo.png)

React hooks done right, for browser and SSR.

[![NPM Version](https://flat.badgen.net/npm/v/@react-hookz/web)](https://www.npmjs.com/package/@react-hookz/web)
[![NPM Downloads](https://flat.badgen.net/npm/dm/@react-hookz/web)](https://www.npmjs.com/package/@react-hookz/web)
[![NPM Dependents](https://flat.badgen.net/npm/dependents/@react-hookz/web)](https://www.npmjs.com/package/@react-hookz/web)
[![Build](https://img.shields.io/github/workflow/status/react-hookz/web/CI?style=flat-square)](https://github.com/react-hookz/web/actions)
[![Coverage](https://flat.badgen.net/codecov/c/github/react-hookz/web)](https://app.codecov.io/gh/react-hookz/web)
[![Types](https://flat.badgen.net/npm/types/@react-hookz/web)](https://www.npmjs.com/package/@react-hookz/web)

`@react-hookz/web` is a library of general-purpose React hooks built with care and SSR compatibility
in mind.

## Install

This one is pretty simple, everyone knows what to do:

```shell
npm i @react-hookz/web
# or
yarn add @react-hookz/web
```

As hooks was introduced to the world in React 16.8, `@react-hookz/web` requires - you guessed it - 
`react` and `react-dom` 16.8+.  
Also, as React does not support IE, `@react-hookz/web` does not do so either. You'll have to
transpile your `node-modules` in order to run in IE.

## Usage

This package provides three levels of compilation:

1. **Main**, the `/cjs` folder — CommonJS modules, with ES5 lang level.
2. **ESM**, the `/esm` folder — it is ES modules (browser compatible), with ES5 lang level.
3. **ESNext**, the `/esnext` folder — it is ES modules (browser compatible), with ESNext lang level.

So, if you need the `useMountEffect` hook, depending on your needs, you can import in three ways
(there are actually more, but these are the three most common):

```ts
// in case you need cjs modules
import { useMountEffect } from "@react-hookz/web";
// in case you need esm modules
import { useMountEffect } from "@react-hookz/web/esm";
// in case you want all the recent ES features
import { useMountEffect } from "@react-hookz/web/esnext";
```

## Hooks list

- #### Callback
  
  - [`useDebounceCallback`](https://react-hookz.github.io/web/?path=/docs/callback-usedebouncecallback--example)
    — Makes passed function debounced, otherwise acts like `useCallback`.

- #### Lifecycle

    - [`useConditionalEffect`](https://react-hookz.github.io/web/?path=/docs/lifecycle-useconditionaleffect--example)
      — Like `useEffect` but callback invoked only if conditions match predicate.
    - [`useConditionalUpdateEffect`](https://react-hookz.github.io/web/?path=/docs/lifecycle-useconditionalupdateeffect--example)
      — Like `useUpdateEffect` but callback invoked only if conditions match predicate.
    - [`useFirstMountState`](https://react-hookz.github.io/web/?path=/docs/lifecycle-usefirstmountstate--example)
      — Return boolean that is `true` only on first render.
    - [`useIsMounted`](https://react-hookz.github.io/web/?path=/docs/lifecycle-useismounted--example)
      — Returns function that yields current mount state.
    - [`useMountEffect`](https://react-hookz.github.io/web/?path=/docs/lifecycle-usemounteffect--example)
      — Run effect only when component is first mounted.
    - [`useRerender`](https://react-hookz.github.io/web/?path=/docs/lifecycle-usererender--example)
      — Return callback that re-renders component.
    - [`useUnmountEffect`](https://react-hookz.github.io/web/?path=/docs/lifecycle-useunmounteffect--example)
      — Run effect only when component is unmounted.
    - [`useUpdateEffect`](https://react-hookz.github.io/web/?path=/docs/lifecycle-useupdateeffect--example)
      — Effect hook that ignores the first render (not invoked on mount).
    - [`useIsomorphicLayoutEffect`](http://react-hookz.github.io/?path=/docs/lifecycle-useisomorphiclayouteffect--page)
      — `useLayoutEffect` for browser with fallback to `useEffect` for SSR.

- #### State

    - [`useMediatedState`](https://react-hookz.github.io/web/?path=/docs/state-usemediatedstate--example)
      — Like `useState`, but every value set is passed through a mediator function.
    - [`usePrevious`](https://react-hookz.github.io/web/?path=/docs/state-useprevious--example)
      — Returns the value passed to the hook on previous render.
    - [`useSafeState`](https://react-hookz.github.io/web/?path=/docs/state-usesafestate--page)
      — Like `useState`, but its state setter is guarded against sets on unmounted component.
    - [`useToggle`](https://react-hookz.github.io/web/?path=/docs/state-usetoggle--example)
      — Like `useState`, but can only become `true` or `false`.

- #### Navigator

    - [`useNetworkState`](http://react-hookz.github.io/?path=/docs/navigator-usenetwork--example)
      — Tracks the state of browser's network connection.

- #### Miscellaneous

    - [`useSyncedRef`](http://react-hookz.github.io/?path=/docs/miscellaneous-usesyncedref--example)
      — Like `useRef`, but it returns immutable ref that contains actual value.

- #### Web API
    
    - [`useLocalStorageValue`](http://react-hookz.github.io/?path=/docs/web-api-uselocalstoragevalue--example)
      — 
