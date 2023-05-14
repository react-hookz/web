<div align="center">

# ![@react-hookz/web](.github/logo.png)

[![NPM Version](https://flat.badgen.net/npm/v/@react-hookz/web)](https://www.npmjs.com/package/@react-hookz/web)
[![NPM Downloads](https://flat.badgen.net/npm/dm/@react-hookz/web)](https://www.npmjs.com/package/@react-hookz/web)
[![NPM Dependents](https://flat.badgen.net/npm/dependents/@react-hookz/web)](https://www.npmjs.com/package/@react-hookz/web)
[![Build](https://img.shields.io/github/actions/workflow/status/react-hookz/web/ci-cd.yml?branch=master&style=flat-square)](https://github.com/react-hookz/web/actions)
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
Also, as React does not support IE, `@react-hookz/web` don't either.

## Usage

> This package distributed with ESNext language level and both, CJS and ES imports.  
> It means that depending on your browser target you might need to transpile it. Every major
> bundler provides a way to transpile `node_modules` fully or partially.
> Address your bundler documentation for more details.

You can import hooks two ways:

```ts
// from the root of package
import { useMountEffect } from '@react-hookz/web';
// or single hook directly
import { useMountEffect } from '@react-hookz/web/esm/useMountEffect';
```

In case your bundler supports tree-shaking (most of modern does) - both variants are equal and only
necessary code will get into your bundle. Direct hook imports should be considered otherwise.  
In case, for some reason, you are not able to use ES imports - you should direct-import hooks from
`@react-hookz/web/esm` folder.

## Migrating from react-use

`@react-hookz/web` was built as a [spiritual successor](https://github.com/streamich/react-use/issues/1974)
of `react-use` by one of its former maintainers.

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
    — Like `useEffect` but callback invoked only if given conditions match a given predicate.
  - [**`useCustomCompareEffect`**](https://react-hookz.github.io/web/?path=/docs/lifecycle-usecustomcompareeffect--example)
    — Like `useEffect` but uses a provided comparator function to validate dependency changes.
  - [**`useDebouncedEffect`**](https://react-hookz.github.io/web/?path=/docs/lifecycle-usedebouncedeffect--example)
    — Like `useEffect`, but passed function is debounced.
  - [**`useDeepCompareEffect`**](https://react-hookz.github.io/web/?path=/docs/lifecycle-usedeepcompareeffect--example)
    — Like `useEffect` but uses `@react-hookz/deep-equal` comparator function to validate deep
    dependency changes.
  - [**`useFirstMountState`**](https://react-hookz.github.io/web/?path=/docs/lifecycle-usefirstmountstate--example)
    — Returns a boolean that is `true` only on first render.
  - [**`useIntervalEffect`**](https://react-hookz.github.io/web/?path=/docs/lifecycle-useintervaleffect--example)
    — Like `setInterval` but in the form of a React hook.
  - [**`useIsMounted`**](https://react-hookz.github.io/web/?path=/docs/lifecycle-useismounted--example)
    — Returns a function that yields current mount state.
  - [**`useIsomorphicLayoutEffect`**](https://react-hookz.github.io/web/?path=/docs/lifecycle-useisomorphiclayouteffect--page)
    — Like `useLayoutEffect` but falls back to `useEffect` during SSR.
  - [**`useMountEffect`**](https://react-hookz.github.io/web/?path=/docs/lifecycle-usemounteffect--example)
    — Run an effect only when a component mounts.
  - [**`useRafEffect`**](https://react-hookz.github.io/web/?path=/docs/lifecycle-useRafEffect--example)
    — Like `useEffect`, but the effect is only run within an animation frame.
  - [**`useRerender`**](https://react-hookz.github.io/web/?path=/docs/lifecycle-usererender--example)
    — Returns a callback that re-renders the component.
  - [**`useThrottledEffect`**](https://react-hookz.github.io/web/?path=/docs/lifecycle-usethrottledeffect--example)
    — Like `useEffect`, but the passed function is throttled.
  - [**`useTimeoutEffect`**](https://react-hookz.github.io/web/?path=/docs/lifecycle-usetimeouteffect--example)
    — Like `setTimeout`, but in the form of a React hook.
  - [**`useUnmountEffect`**](https://react-hookz.github.io/web/?path=/docs/lifecycle-useunmounteffect--example)
    — Run an effect only when a component unmounts.
  - [**`useUpdateEffect`**](https://react-hookz.github.io/web/?path=/docs/lifecycle-useupdateeffect--example)
    — An effect hook that ignores the first render (not invoked on mount).
  - [**`useLifecycleLogger`**](https://react-hookz.github.io/web/?path=/docs/lifecycle-uselifecycleLogger--example)
    — This hook provides logging when the component mounts, updates and unmounts.

- #### State

  - [**`useControlledRerenderState`**](https://react-hookz.github.io/web/?path=/docs/state-usecontrolledrerenderstate--example)
    — Like `useState`, but its state setter accepts an extra argument, that allows cancelling
    renders.
  - [**`useCounter`**](https://react-hookz.github.io/web/?path=/docs/state-usecounter--example)
    — Tracks a numeric value and offers functions for manipulating it.
  - [**`useDebouncedState`**](https://react-hookz.github.io/web/?path=/docs/state-usedebouncedstate--example)
    — Like `useState` but its state setter is debounced.
  - [**`useFunctionalState`**](https://react-hookz.github.io/web/?path=/docs/state-usefunctionalstate--page)
    — Like `useState` but instead of raw state, a state getter function is returned.
  - [**`useList`**](https://react-hookz.github.io/web/?path=/docs/state-uselist--example)
    — Tracks a list and offers functions for manipulating it.
  - [**`useMap`**](https://react-hookz.github.io/web/?path=/docs/state-usemap--example) — Tracks the
    state of a `Map`.
  - [**`useMediatedState`**](https://react-hookz.github.io/web/?path=/docs/state-usemediatedstate--example)
    — Like `useState`, but every value set is passed through a mediator function.
  - [**`usePrevious`**](https://react-hookz.github.io/web/?path=/docs/state-useprevious--example) —
    Returns the value passed to the hook on previous render.
  - [**`usePreviousDistinct`**](https://react-hookz.github.io/web/?path=/docs/state-usepreviousdistinct--example) —
    Returns the most recent distinct value passed to the hook on previous renders.
  - [**`useQueue`**](https://react-hookz.github.io/web/?path=/docs/state-usequeue--example) —
    A state hook implementing FIFO queue.
  - [**`useRafState`**](https://react-hookz.github.io/web/?path=/docs/state-userafstate--example) —
    Like `React.useState`, but state is only updated within animation frame.
  - [**`useRenderCount`**](https://react-hookz.github.io/web/?path=/docs/state-userendercount--example) —
    Tracks component's render count including first render.
  - [**`useSet`**](https://react-hookz.github.io/web/?path=/docs/state-useset--example) — Tracks the
    state of a `Set`.
  - [**`useToggle`**](https://react-hookz.github.io/web/?path=/docs/state-usetoggle--example) — Like
    `useState`, but can only be `true` or `false`.
  - [**`useThrottledState`**](https://react-hookz.github.io/web/?path=/docs/state-usethrottledstate--example)
    — Like `useState` but its state setter is throttled.
  - [**`useValidator`**](https://react-hookz.github.io/web/?path=/docs/state-usevalidator--example)
    — Performs validation when any of the provided dependencies change.

- #### Navigator

  - [**`useNetworkState`**](https://react-hookz.github.io/web/?path=/docs/navigator-usenetworkstate--example)
    — Tracks the state of the browser's network connection.
  - [**`useVibrate`**](https://react-hookz.github.io/web/?path=/docs/navigator-usevibrate--example)
    — Provides vibration feedback using the Vibration API.
  - [**`usePermission`**](https://react-hookz.github.io/web/?path=/docs/navigator-usepermission--example)
    — Tracks the state of a permission.

- #### Miscellaneous

  - [**`useSyncedRef`**](https://react-hookz.github.io/web/?path=/docs/miscellaneous-usesyncedref--example)
    — Like `useRef`, but it returns an immutable ref that contains the actual value.
  - [**`useCustomCompareMemo`**](https://react-hookz.github.io/web/?path=/docs/miscellaneous-useCustomCompareMemo--example)
    — Like `useMemo` but uses provided comparator function to validate dependency changes.
  - [**`useDeepCompareMemo`**](https://react-hookz.github.io/web/?path=/docs/miscellaneous-useDeepCompareMemo--example)
    — Like `useMemo` but uses `@react-hookz/deep-equal` comparator function to validate deep
    dependency changes.
  - [**`useHookableRef`**](https://react-hookz.github.io/web/?path=/docs/miscellaneous-usehookableref--example)
    — Like `useRef` but it is possible to define handlers for getting and setting the value.

- #### Side-effect

  - [**`useAsync`**](https://react-hookz.github.io/web/?path=/docs/side-effect-useasync--example) —
    Executes provided async function and tracks its results and errors.
  - [**`useAsyncAbortable`**](https://react-hookz.github.io/web/?path=/docs/side-effect-useasyncabortable--example)
    — Like `useAsync`, but also provides `AbortSignal` as first function argument to the async function.
  - [**`useCookieValue`**](https://react-hookz.github.io/web/?path=/docs/side-effect-usecookievalue--example)
    — Manages a single cookie.
  - [**`useLocalStorageValue`**](https://react-hookz.github.io/web/?path=/docs/side-effect-uselocalstoragevalue--example)
    — Manages a single LocalStorage key.
  - [**`useSessionStorageValue`**](https://react-hookz.github.io/web/?path=/docs/side-effect-usesessionstoragevalue--example)
    — Manages a single SessionStorage key.

- #### Sensor

  - [**`useIntersectionObserver`**](https://react-hookz.github.io/web/?path=/docs/sensor-useintersectionobserver--example)
    — Observe changes in the intersection of a target element with an ancestor element or with the
    viewport.
  - [**`useMeasure`**](https://react-hookz.github.io/web/?path=/docs/sensor-usemeasure--example) —
    Uses `ResizeObserver` to track an element's dimensions and to re-render the component when they change.
  - [**`useMediaQuery`**](https://react-hookz.github.io/web/?path=/docs/sensor-usemediaquery--example)
    — Tracks the state of a CSS media query.
  - [**`useResizeObserver`**](https://react-hookz.github.io/web/?path=/docs/sensor-useresizeobserver--example)
    — Invokes a callback whenever `ResizeObserver` detects a change to the target's size.
  - [**`useScreenOrientation`**](https://react-hookz.github.io/web/?path=/docs/sensor-usescreenorientation--example)
    — Checks if the screen is in `portrait` or `landscape` orientation and automatically re-renders on
    orientation change.
  - [**`useDocumentVisibility`**](https://react-hookz.github.io/web/?path=/docs/sensor-usedocumentvisibility--example)
    — Tracks document visibility state.

- #### Dom

  - [**`useClickOutside`**](https://react-hookz.github.io/web/?path=/docs/dom-useclickoutside--example)
    — Triggers a callback when the user clicks outside a target element.
  - [**`useEventListener`**](https://react-hookz.github.io/web/?path=/docs/dom-useeventlistener--example)
    — Subscribes an event listener to a target element.
  - [**`useKeyboardEvent`**](https://react-hookz.github.io/web/?path=/docs/dom-usekeyboardevent--example)
    — Invokes a callback when a keyboard event occurs on the chosen target.
  - [**`useWindowSize`**](https://react-hookz.github.io/web/?path=/docs/dom-usewindowsize--example)
    — Tracks the inner dimensions of the browser window.

## Contributors

<!-- readme: collaborators,contributors,semantic-release-bot/-,lint-action/- -start -->
<table>
<tr>
    <td align="center">
        <a href="https://github.com/xobotyi">
            <img src="https://avatars.githubusercontent.com/u/6178739?v=4" width="100;" alt="xobotyi"/>
            <br />
            <sub><b>Anton Zinovyev</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/JoeDuncko">
            <img src="https://avatars.githubusercontent.com/u/6749768?v=4" width="100;" alt="JoeDuncko"/>
            <br />
            <sub><b>Joe Duncko</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/ArttuOll">
            <img src="https://avatars.githubusercontent.com/u/60509537?v=4" width="100;" alt="ArttuOll"/>
            <br />
            <sub><b>Arttu Olli</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/kylemh">
            <img src="https://avatars.githubusercontent.com/u/9523719?v=4" width="100;" alt="kylemh"/>
            <br />
            <sub><b>Kyle Holmberg</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/AndreasNel">
            <img src="https://avatars.githubusercontent.com/u/17763359?v=4" width="100;" alt="AndreasNel"/>
            <br />
            <sub><b>Andreas Nel</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/Rey-Wang">
            <img src="https://avatars.githubusercontent.com/u/45580554?v=4" width="100;" alt="Rey-Wang"/>
            <br />
            <sub><b>Rey Wang</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/wesgro">
            <img src="https://avatars.githubusercontent.com/u/595567?v=4" width="100;" alt="wesgro"/>
            <br />
            <sub><b>Jake Ketcheson</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/akd-io">
            <img src="https://avatars.githubusercontent.com/u/30059155?v=4" width="100;" alt="akd-io"/>
            <br />
            <sub><b>Anders Kjær Damgaard</b></sub>
        </a>
    </td></tr>
<tr>
    <td align="center">
        <a href="https://github.com/axelboc">
            <img src="https://avatars.githubusercontent.com/u/2936402?v=4" width="100;" alt="axelboc"/>
            <br />
            <sub><b>Axel Bocciarelli</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/lensbart">
            <img src="https://avatars.githubusercontent.com/u/20876627?v=4" width="100;" alt="lensbart"/>
            <br />
            <sub><b>Bart Lens</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/birant">
            <img src="https://avatars.githubusercontent.com/u/29652801?v=4" width="100;" alt="birant"/>
            <br />
            <sub><b>Birant İyigün</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/punkle">
            <img src="https://avatars.githubusercontent.com/u/553697?v=4" width="100;" alt="punkle"/>
            <br />
            <sub><b>Brian Fletcher</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/ChloeMouret">
            <img src="https://avatars.githubusercontent.com/u/63965373?v=4" width="100;" alt="ChloeMouret"/>
            <br />
            <sub><b>Null</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/dantman">
            <img src="https://avatars.githubusercontent.com/u/53399?v=4" width="100;" alt="dantman"/>
            <br />
            <sub><b>Daniel Friesen</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/JoshuaStewartEntelect">
            <img src="https://avatars.githubusercontent.com/u/92043787?v=4" width="100;" alt="JoshuaStewartEntelect"/>
            <br />
            <sub><b>Joshua Stewart</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/jpwallace22">
            <img src="https://avatars.githubusercontent.com/u/93415734?v=4" width="100;" alt="jpwallace22"/>
            <br />
            <sub><b>Justin Wallace</b></sub>
        </a>
    </td></tr>
<tr>
    <td align="center">
        <a href="https://github.com/KonradLinkowski">
            <img src="https://avatars.githubusercontent.com/u/26126510?v=4" width="100;" alt="KonradLinkowski"/>
            <br />
            <sub><b>Konrad Linkowski</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/MichalTarasiuk">
            <img src="https://avatars.githubusercontent.com/u/69385846?v=4" width="100;" alt="MichalTarasiuk"/>
            <br />
            <sub><b>Michał Tarasiuk</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/Myzel394">
            <img src="https://avatars.githubusercontent.com/u/50424412?v=4" width="100;" alt="Myzel394"/>
            <br />
            <sub><b>Null</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/paul-sachs">
            <img src="https://avatars.githubusercontent.com/u/11449728?v=4" width="100;" alt="paul-sachs"/>
            <br />
            <sub><b>Paul Sachs</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/fengkx">
            <img src="https://avatars.githubusercontent.com/u/16515468?v=4" width="100;" alt="fengkx"/>
            <br />
            <sub><b>Fengkx</b></sub>
        </a>
    </td></tr>
</table>
<!-- readme: collaborators,contributors,semantic-release-bot/-,lint-action/- -end -->
