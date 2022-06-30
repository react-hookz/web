<div align="center">

# ![@react-hookz/web](.github/logo.png)

[![NPM Version](https://flat.badgen.net/npm/v/@react-hookz/web)](https://www.npmjs.com/package/@react-hookz/web)
[![NPM Downloads](https://flat.badgen.net/npm/dm/@react-hookz/web)](https://www.npmjs.com/package/@react-hookz/web)
[![NPM Dependents](https://flat.badgen.net/npm/dependents/@react-hookz/web)](https://www.npmjs.com/package/@react-hookz/web)
[![Build](https://img.shields.io/github/workflow/status/react-hookz/web/CI?style=flat-square)](https://github.com/react-hookz/web/actions)
[![Coverage](https://flat.badgen.net/codecov/c/github/react-hookz/web)](https://app.codecov.io/gh/react-hookz/web)
[![Types](https://flat.badgen.net/npm/types/@react-hookz/web)](https://www.npmjs.com/package/@react-hookz/web)
[![Tree Shaking](https://flat.badgen.net/bundlephobia/tree-shaking/@react-hookz/web)](https://bundlephobia.com/result?p=@react-hookz/web)

× **[DOCS](https://react-hookz.github.io/web/)** × **[DISCORD](https://discord.gg/Fjwphtu65f)** ×
**[CHANGELOG](https://github.com/react-hookz/web/blob/master/CHANGELOG.md)** ×

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
import { useMountEffect } from '@react-hookz/web';
// in case you need esm modules
import { useMountEffect } from '@react-hookz/web/esm';
// in case you want all the recent ES features
import { useMountEffect } from '@react-hookz/web/esnext';
```

## Migrating from react-use

Coming from `react-use`? Check out our
[migration guide](https://react-hookz.github.io/web/?path=/docs/migrating-from-react-use--page).

## Hooks list

- #### Callback

  - [**`useDebouncedCallback`**](https://react-hookz.github.io/web/?path=/docs/callback-usedebouncedcallback--example)
    — Makes passed function debounced, otherwise acts like `useCallback`.
  - [**`useRafCallback`**](https://react-hookz.github.io/web/?path=/docs/callback-userafcallback--example)
    — Makes passed function to be called within next animation frame.
  - [**`useThrottledCallback`**](https://react-hookz.github.io/web/?path=/docs/callback-usethrottledcallback--example)
    — Makes passed function throttled, otherwise acts like `useCallback`.

- #### Lifecycle

  - [**`useConditionalEffect`**](https://react-hookz.github.io/web/?path=/docs/lifecycle-useconditionaleffect--example)
    — Like `useEffect` but callback invoked only if conditions match predicate.
  - [**`useCustomCompareEffect`**](https://react-hookz.github.io/web/?path=/docs/lifecycle-usecustomcompareeffect--example)
    — Like `useEffect` but uses provided comparator function to validate dependency changes.
  - [**`useDebouncedEffect`**](https://react-hookz.github.io/web/?path=/docs/lifecycle-usedebouncedeffect--example)
    — Like `useEffect`, but passed function is debounced.
  - [**`useDeepCompareEffect`**](https://react-hookz.github.io/web/?path=/docs/lifecycle-usedeepcompareeffect--example)
    — Like `useEffect` but uses `@react-hookz/deep-equal` comparator function to validate deep
    dependency changes.
  - [**`useFirstMountState`**](https://react-hookz.github.io/web/?path=/docs/lifecycle-usefirstmountstate--example)
    — Return boolean that is `true` only on first render.
  - [**`useIntervalEffect`**](https://react-hookz.github.io/web/?path=/docs/lifecycle-useintervaleffect--example)
    — Like `setInterval` but in form of react hook.
  - [**`useIsMounted`**](https://react-hookz.github.io/web/?path=/docs/lifecycle-useismounted--example)
    — Returns function that yields current mount state.
  - [**`useIsomorphicLayoutEffect`**](https://react-hookz.github.io/web/?path=/docs/lifecycle-useisomorphiclayouteffect--page)
    — `useLayoutEffect` for browser with fallback to `useEffect` for SSR.
  - [**`useMountEffect`**](https://react-hookz.github.io/web/?path=/docs/lifecycle-usemounteffect--example)
    — Run effect only when component first-mounted.
  - [**`useRafEffect`**](https://react-hookz.github.io/web/?path=/docs/lifecycle-useRafEffect--example)
    — Like `React.useEffect`, but effect is only run within animation frame.
  - [**`useRerender`**](https://react-hookz.github.io/web/?path=/docs/lifecycle-usererender--example)
    — Return callback that re-renders component.
  - [**`useThrottledEffect`**](https://react-hookz.github.io/web/?path=/docs/lifecycle-usethrottledeffect--example)
    — Like `useEffect`, but passed function is throttled.
  - [**`useUnmountEffect`**](https://react-hookz.github.io/web/?path=/docs/lifecycle-useunmounteffect--example)
    — Run effect only when component unmounted.
  - [**`useUpdateEffect`**](https://react-hookz.github.io/web/?path=/docs/lifecycle-useupdateeffect--example)
    — Effect hook that ignores the first render (not invoked on mount).
  - [**`useLifecycleLogger`**](https://react-hookz.github.io/web/?path=/docs/lifecycle-uselifecycleLogger--example)
    — This hook provides a console log when the component mounts, updates and unmounts.

- #### State

  - [**`useCounter`**](https://react-hookz.github.io/web/?path=/docs/state-usecounter--example)
    — Tracks a numeric value and offers functions for manipulating it.
  - [**`useDebouncedState`**](https://react-hookz.github.io/web/?path=/docs/state-usedebouncedstate--example)
    — Like `useSafeState` but its state setter is debounced.
  - [**`useFunctionalState`**](https://react-hookz.github.io/web/?path=/docs/state-usefunctionalstate--page)
    — Like `useState` but instead of raw state, state getter returned.
  - [**`useList`**](https://react-hookz.github.io/web/?path=/docs/state-uselist--example)
    — Tracks a list and offers functions for manipulating it.
  - [**`useMap`**](https://react-hookz.github.io/web/?path=/docs/state-usemap--example) — Tracks the
    state of a `Map`.
  - [**`useMediatedState`**](https://react-hookz.github.io/web/?path=/docs/state-usemediatedstate--example)
    — Like `useState`, but every value set is passed through a mediator function.
  - [**`usePrevious`**](https://react-hookz.github.io/web/?path=/docs/state-useprevious--example) —
    Returns the value passed to the hook on previous render.
  - [**`usePreviousDistinct`**](https://react-hookz.github.io/web/?path=/docs/state-usepreviousdistinct--example) —
    Returns the most recent distinct value passed to the hook on previous render.
  - [**`useRafState`**](https://react-hookz.github.io/web/?path=/docs/state-userafstate--example) —
    Like `React.useState`, but state is only updated within animation frame.
  - [**`useSafeState`**](https://react-hookz.github.io/web/?path=/docs/state-usesafestate--page) —
    Like `useState`, but its state setter is guarded against sets on unmounted component.
  - [**`useSet`**](https://react-hookz.github.io/web/?path=/docs/state-useset--example) — Tracks the
    state of a `Set`.
  - [**`useToggle`**](https://react-hookz.github.io/web/?path=/docs/state-usetoggle--example) — Like
    `useState`, but can only become `true` or `false`.
  - [**`useThrottledState`**](https://react-hookz.github.io/web/?path=/docs/state-usethrottledstate--example)
    — Like `useSafeState` but its state setter is throttled.
  - [**`useValidator`**](https://react-hookz.github.io/web/?path=/docs/state-usevalidator--example)
    — Performs validation when any of provided dependencies has changed.

- #### Navigator

  - [**`useNetworkState`**](https://react-hookz.github.io/web/?path=/docs/navigator-usenetworkstate--example)
    — Tracks the state of browser's network connection.
  - [**`useVibrate`**](https://react-hookz.github.io/web/?path=/docs/navigator-usevibrate--example)
    — Provides vibration feedback using the Vibration API.
  - [**`usePermission`**](https://react-hookz.github.io/web/?path=/docs/navigator-usepermission--example)
    — Tracks a permission state.

- #### Miscellaneous

  - [**`useSyncedRef`**](https://react-hookz.github.io/web/?path=/docs/miscellaneous-usesyncedref--example)
    — Like `useRef`, but it returns immutable ref that contains actual value.
  - [**`useHookableRef`**](https://react-hookz.github.io/web/?path=/docs/miscellaneous-usehookableref--example)
    — Like `useRef` but it is possible to define get and set handlers.

- #### Side-effect

  - [**`useAsync`**](https://react-hookz.github.io/web/?path=/docs/side-effect-useasync--example) —
    Executes provided async function and tracks its result and error.
  - [**`useAsyncAbortable`**](https://react-hookz.github.io/web/?path=/docs/side-effect-useasyncabortable--example)
    — Like `useAsync`, but also provides `AbortSignal` as first function argument to async function.
  - [**`useCookieValue`**](https://react-hookz.github.io/web/?path=/docs/side-effect-usecookievalue--example)
    — Manages a single cookie.
  - [**`useLocalStorageValue`**](https://react-hookz.github.io/web/?path=/docs/side-effect-uselocalstoragevalue--example)
    — Manages a single LocalStorage key.
  - [**`useSessionStorageValue`**](https://react-hookz.github.io/web/?path=/docs/side-effect-usesessionstoragevalue--example)
    — Manages a single SessionStorage key.

- #### Sensor

  - [**`useIntersectionObserver`**](https://react-hookz.github.io/web/?path=/docs/sensor-useintersectionobserver--example)
    — Observe changes in the intersection of a target element with an ancestor element or with a
    top-level document's viewport.
  - [**`useMeasure`**](https://react-hookz.github.io/web/?path=/docs/sensor-usemeasure--example) —
    Uses ResizeObserver to track element dimensions and re-render component when they change.
  - [**`useMediaQuery`**](https://react-hookz.github.io/web/?path=/docs/sensor-usemediaquery--example)
    — Tracks the state of CSS media query.
  - [**`useResizeObserver`**](https://react-hookz.github.io/web/?path=/docs/sensor-useresizeobserver--example)
    — Invokes a callback whenever ResizeObserver detects a change to target's size.
  - [**`useScreenOrientation`**](https://react-hookz.github.io/web/?path=/docs/sensor-usescreenorientation--example)
    — Checks if screen is in `portrait` or `landscape` orientation and automatically re-renders on
    orientation change.

- #### Dom

  - [**`useClickOutside`**](https://react-hookz.github.io/web/?path=/docs/dom-useclickoutside--example)
    — Triggers callback when user clicks outside the target element.
  - [**`useDocumentTitle`**](https://react-hookz.github.io/web/?path=/docs/dom-usedocumenttitle--example)
    — Sets title of the page.
  - [**`useEventListener`**](https://react-hookz.github.io/web/?path=/docs/dom-useeventlistener--example)
    — Subscribes an event listener to the target, and automatically unsubscribes it on unmount.
  - [**`useKeyboardEvent`**](https://react-hookz.github.io/web/?path=/docs/dom-usekeyboardevent--example)
    — Executes callback when keyboard event occurred on target.
  - [**`useWindowSize`**](https://react-hookz.github.io/web/?path=/docs/dom-usewindowsize--example)
    — Tracks window inner dimensions.
