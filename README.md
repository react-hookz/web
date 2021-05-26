<div align="center">

# ![@react-hookz/web](.github/logo.png)

[![NPM Version](https://flat.badgen.net/npm/v/@react-hookz/web)](https://www.npmjs.com/package/@react-hookz/web)
[![NPM Downloads](https://flat.badgen.net/npm/dm/@react-hookz/web)](https://www.npmjs.com/package/@react-hookz/web)
[![NPM Dependents](https://flat.badgen.net/npm/dependents/@react-hookz/web)](https://www.npmjs.com/package/@react-hookz/web)
[![Build](https://img.shields.io/github/workflow/status/react-hookz/web/CI?style=flat-square)](https://github.com/react-hookz/web/actions)
[![Coverage](https://flat.badgen.net/codecov/c/github/react-hookz/web)](https://app.codecov.io/gh/react-hookz/web)
[![Types](https://flat.badgen.net/npm/types/@react-hookz/web)](https://www.npmjs.com/package/@react-hookz/web)
[![Tree Shaking](https://flat.badgen.net/bundlephobia/tree-shaking/@react-hookz/web)](https://bundlephobia.com/result?p=@react-hookz/web)

× **[DOCS](https://react-hookz.github.io/web/)**
× **[DISCORD](https://discord.gg/Fjwphtu65f)**
× **[CHANGELOG](https://github.com/react-hookz/web/blob/master/CHANGELOG.md)** ×

</div>

---

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

  - [**`useDebounceCallback`**](https://react-hookz.github.io/web/?path=/docs/callback-usedebouncecallback)
    — Makes passed function debounced, otherwise acts like `useCallback`.
  - [**`useRafCallback`**](https://react-hookz.github.io/web/?path=/docs/callback-userafcallback)
    — Makes passed function to be called within next animation frame.

- #### Lifecycle

  - [**`useConditionalEffect`**](https://react-hookz.github.io/web/?path=/docs/lifecycle-useconditionaleffect)
    — Like `useEffect` but callback invoked only if conditions match predicate.
  - [**`useConditionalUpdateEffect`**](https://react-hookz.github.io/web/?path=/docs/lifecycle-useconditionalupdateeffect)
    — Like `useUpdateEffect` but callback invoked only if conditions match predicate.
  - [**`useFirstMountState`**](https://react-hookz.github.io/web/?path=/docs/lifecycle-usefirstmountstate)
    — Return boolean that is `true` only on first render.
  - [**`useIsMounted`**](https://react-hookz.github.io/web/?path=/docs/lifecycle-useismounted)
    — Returns function that yields current mount state.
  - [**`useMountEffect`**](https://react-hookz.github.io/web/?path=/docs/lifecycle-usemounteffect)
    — Run effect only when component is first mounted.
  - [**`useRerender`**](https://react-hookz.github.io/web/?path=/docs/lifecycle-usererender)
    — Return callback that re-renders component.
  - [**`useUnmountEffect`**](https://react-hookz.github.io/web/?path=/docs/lifecycle-useunmounteffect)
    — Run effect only when component is unmounted.
  - [**`useUpdateEffect`**](https://react-hookz.github.io/web/?path=/docs/lifecycle-useupdateeffect)
    — Effect hook that ignores the first render (not invoked on mount).
  - [**`useIsomorphicLayoutEffect`**](https://react-hookz.github.io/?path=/docs/lifecycle-useisomorphiclayouteffect)
    — `useLayoutEffect` for browser with fallback to `useEffect` for SSR.

- #### State

  - [**`useMediatedState`**](https://react-hookz.github.io/web/?path=/docs/state-usemediatedstate)
    — Like `useState`, but every value set is passed through a mediator function.
  - [**`usePrevious`**](https://react-hookz.github.io/web/?path=/docs/state-useprevious)
    — Returns the value passed to the hook on previous render.
  - [**`useSafeState`**](https://react-hookz.github.io/web/?path=/docs/state-usesafestate)
    — Like `useState`, but its state setter is guarded against sets on unmounted component.
  - [**`useToggle`**](https://react-hookz.github.io/web/?path=/docs/state-usetoggle)
    — Like `useState`, but can only become `true` or `false`.

- #### Navigator

  - [**`useNetworkState`**](https://react-hookz.github.io/?path=/docs/navigator-usenetwork)
    — Tracks the state of browser's network connection.

- #### Miscellaneous

  - [**`useSyncedRef`**](https://react-hookz.github.io/?path=/docs/miscellaneous-usesyncedref)
    — Like `useRef`, but it returns immutable ref that contains actual value.

- #### Side-effect

  - [**`useLocalStorageValue`**](https://react-hookz.github.io/?path=/docs/side-effect-uselocalstoragevalue)
    — Manages a single LocalStorage key.
  - [**`useSessionStorageValue`**](https://react-hookz.github.io/?path=/docs/side-effect-usesessionstoragevalue)
    — Manages a single SessionStorage key.

- #### Sensor

  - [**`useResizeObserver`**](https://react-hookz.github.io/?path=/docs/sensor-useresizeobserver)
    — Invokes a callback whenever ResizeObserver detects a change to target's size.
  - [**`useMeasure`**](https://react-hookz.github.io/?path=/docs/sensor-usemeasure)
    — Uses ResizeObserver to track element dimensions and re-render component when they change.

- #### Dom

  - [**`useDocumentTitle`**](https://react-hookz.github.io/?path=/docs/dom-usedocumenttitle)
    — Sets title of the page.
