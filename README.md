<div align="center">

# ![@react-hookz/web](.github/logo.png)

[![NPM Downloads](https://img.shields.io/npm/dm/%40react-hookz%2Fweb?style=flat-square)](https://www.npmjs.com/package/@react-hookz/web)
[![Dependents](https://img.shields.io/librariesio/dependents/npm/%40react-hookz%2Fweb?style=flat-square)](https://www.npmjs.com/package/@react-hookz/web)
[![Build](https://img.shields.io/github/actions/workflow/status/react-hookz/web/ci-cd.yml?branch=master&style=flat-square)](https://github.com/react-hookz/web/actions)
[![Coverage](https://img.shields.io/codecov/c/github/react-hookz/web?style=flat-square)](https://app.codecov.io/gh/react-hookz/web)

× **[DISCORD](https://discord.gg/Fjwphtu65f)** × **[RELEASES](https://github.com/react-hookz/web/releases)** ×

</div>

---

`@react-hookz/web` is a library of general-purpose React hooks built with care and SSR compatibility in mind.

## Install

This one is pretty simple, everyone knows what to do:

```shell
npm i @react-hookz/web
# or
yarn add @react-hookz/web
```

As hooks was introduced to the world in React 16.8, `@react-hookz/web` requires - you guessed it - `react` and
`react-dom` 16.8+. Also, as React does not support IE, `@react-hookz/web` don't either.

## Usage

> This package distributed with ESNext language level and ES modules system. It means that depending on your browser
> target you might need to transpile it. Every major bundler provides a way to transpile `node_modules` fully or
> partially. Address your bundler documentation for more details.

You can import hooks two ways:

```ts
// from the root of package
import {useMountEffect} from '@react-hookz/web';
// or single hook directly
import {useMountEffect} from '@react-hookz/web/useMountEffect/index.js';
```

In case your bundler supports tree-shaking (most of modern does) - both variants are equal and only necessary code will
get into your bundle. Direct hook imports should be considered otherwise.

## Migrating from react-use

`@react-hookz/web` was built as a [spiritual successor](https://github.com/streamich/react-use/issues/1974) of
`react-use` by one of its former maintainers.

## Hooks list

- #### Callback
  - [**`useDebouncedCallback`**](./src/useDebouncedCallback/index.ts) — Makes passed function debounced, otherwise acts
    like `useCallback`.
  - [**`useRafCallback`**](./src/useRafCallback/index.ts) — Makes passed function to be called within next animation
    frame.
  - [**`useThrottledCallback`**](./src/useThrottledCallback/index.ts) — Makes passed function throttled, otherwise acts
    like `useCallback`.

- #### Lifecycle
  - [**`useConditionalEffect`**](./src/useConditionalEffect/index.ts) — Like `useEffect` but callback invoked only if
    given conditions match a given predicate.
  - [**`useCustomCompareEffect`**](./src/useCustomCompareEffect/index.ts) — Like `useEffect` but uses a provided
    comparator function to validate dependency changes.
  - [**`useDebouncedEffect`**](./src/useDebouncedEffect/index.ts) — Like `useEffect`, but passed function is debounced.
  - [**`useDeepCompareEffect`**](./src/useDeepCompareEffect/index.ts) — Like `useEffect` but uses
    `@react-hookz/deep-equal` comparator function to validate deep dependency changes.
  - [**`useFirstMountState`**](./src/useFirstMountState/index.ts) — Returns a boolean that is `true` only on first
    render.
  - [**`useIntervalEffect`**](./src/useIntervalEffect/index.ts) — Like `setInterval` but in the form of a React hook.
  - [**`useIsMounted`**](./src/useIsMounted/index.ts) — Returns a function that yields current mount state.
  - [**`useIsomorphicLayoutEffect`**](./src/useIsomorphicLayoutEffect/index.ts) — Like `useLayoutEffect` but falls back
    to `useEffect` during SSR.
  - [**`useMountEffect`**](./src/useMountEffect/index.ts) — Run an effect only when a component mounts.
  - [**`useRafEffect`**](./src/useRafEffect/index.ts) — Like `useEffect`, but the effect is only run within an animation
    frame.
  - [**`useRerender`**](./src/useRerender/index.ts) — Returns a callback that re-renders the component.
  - [**`useThrottledEffect`**](./src/useThrottledEffect/index.ts) — Like `useEffect`, but the passed function is
    throttled.
  - [**`useTimeoutEffect`**](./src/useTimeoutEffect/index.ts) — Like `setTimeout`, but in the form of a React hook.
  - [**`useUnmountEffect`**](./src/useUnmountEffect/index.ts) — Run an effect only when a component unmounts.
  - [**`useUpdateEffect`**](./src/useUpdateEffect/index.ts) — An effect hook that ignores the first render (not invoked
    on mount).
  - [**`useLifecycleLogger`**](./src/useLifecycleLogger/index.ts) — This hook provides logging when the component
    mounts, updates and unmounts.

- #### State
  - [**`useControlledRerenderState`**](./src/useControlledRerenderState/index.ts) — Like `useState`, but its state
    setter accepts an extra argument, that allows cancelling renders.
  - [**`useCounter`**](./src/useCounter/index.ts) — Tracks a numeric value and offers functions for manipulating it.
  - [**`useDebouncedState`**](./src/useDebouncedState/index.ts) — Like `useState` but its state setter is debounced.
  - [**`useFunctionalState`**](./src/useFunctionalState/index.ts) — Like `useState` but instead of raw state, a state
    getter function is returned.
  - [**`useList`**](./src/useList/index.ts) — Tracks a list and offers functions for manipulating it.
  - [**`useMap`**](./src/useMap/index.ts) — Tracks the state of a `Map`.
  - [**`useMediatedState`**](./src/useMediatedState/index.ts) — Like `useState`, but every value set is passed through a
    mediator function.
  - [**`usePrevious`**](./src/usePrevious/index.ts) — Returns the value passed to the hook on previous render.
  - [**`usePreviousDistinct`**](./src/usePreviousDistinct/index.ts) — Returns the most recent distinct value passed to
    the hook on previous renders.
  - [**`useQueue`**](./src/useQueue/index.ts) — A state hook implementing FIFO queue.
  - [**`useRafState`**](./src/useRafState/index.ts) — Like `React.useState`, but state is only updated within animation
    frame.
  - [**`useRenderCount`**](./src/useRenderCount/index.ts) — Tracks component's render count including first render.
  - [**`useSet`**](./src/useSet/index.ts) — Tracks the state of a `Set`.
  - [**`useToggle`**](./src/useToggle/index.ts) — Like `useState`, but can only be `true` or `false`.
  - [**`useThrottledState`**](./src/useThrottledState/index.ts) — Like `useState` but its state setter is throttled.
  - [**`useValidator`**](./src/useValidator/index.ts) — Performs validation when any of the provided dependencies
    change.

- #### Navigator
  - [**`useNetworkState`**](./src/useNetworkState/index.ts) — Tracks the state of the browser's network connection.
  - [**`useVibrate`**](./src/useVibrate/index.ts) — Provides vibration feedback using the Vibration API.
  - [**`usePermission`**](./src/usePermission/index.ts) — Tracks the state of a permission.

- #### Miscellaneous
  - [**`useSyncedRef`**](./src/useSyncedRef/index.ts) — Like `useRef`, but it returns an immutable ref that contains the
    actual value.
  - [**`useCustomCompareMemo`**](./src/useCustomCompareMemo/index.ts) — Like `useMemo` but uses provided comparator
    function to validate dependency changes.
  - [**`useDeepCompareMemo`**](./src/useDeepCompareMemo/index.ts) — Like `useMemo` but uses `@react-hookz/deep-equal`
    comparator function to validate deep dependency changes.
  - [**`useHookableRef`**](./src/useHookableRef/index.ts) — Like `useRef` but it is possible to define handlers for
    getting and setting the value.

- #### Side-effect
  - [**`useAsync`**](./src/useAsync/index.ts) — Executes provided async function and tracks its results and errors.
  - [**`useAsyncAbortable`**](./src/useAsyncAbortable/index.ts) — Like `useAsync`, but also provides `AbortSignal` as
    first function argument to the async function.
  - [**`useCookieValue`**](./src/useCookieValue/index.ts) — Manages a single cookie.
  - [**`useLocalStorageValue`**](./src/useLocalStorageValue/index.ts) — Manages a single LocalStorage key.
  - [**`useSessionStorageValue`**](./src/useSessionStorageValue/index.ts) — Manages a single SessionStorage key.

- #### Sensor
  - [**`useIntersectionObserver`**](./src/useIntersectionObserver/index.ts) — Observe changes in the intersection of a
    target element with an ancestor element or with the viewport.
  - [**`useMeasure`**](./src/useMeasure/index.ts) — Uses `ResizeObserver` to track an element's dimensions and to
    re-render the component when they change.
  - [**`useMediaQuery`**](./src/useMediaQuery/index.ts) — Tracks the state of a CSS media query.
  - [**`useResizeObserver`**](./src/useResizeObserver/index.ts) — Invokes a callback whenever `ResizeObserver` detects a
    change to the target's size.
  - [**`useScreenOrientation`**](./src/useScreenOrientation/index.ts) — Checks if the screen is in `portrait` or
    `landscape` orientation and automatically re-renders on orientation change.
  - [**`useDocumentVisibility`**](./src/useDocumentVisibility/index.ts) — Tracks document visibility state.

- #### Dom
  - [**`useClickOutside`**](./src/useClickOutside/index.ts) — Triggers a callback when the user clicks outside a target
    element.
  - [**`useEventListener`**](./src/useEventListener/index.ts) — Subscribes an event listener to a target element.
  - [**`useKeyboardEvent`**](./src/useKeyboardEvent/index.ts) — Invokes a callback when a keyboard event occurs on the
    chosen target.
  - [**`useWindowSize`**](./src/useWindowSize/index.ts) — Tracks the inner dimensions of the browser window.

## Contributors

<!-- readme: collaborators,contributors,semantic-release-bot/-,lint-action/- -start -->
<table>
	<tbody>
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
                <a href="https://github.com/wesgro">
                    <img src="https://avatars.githubusercontent.com/u/595567?v=4" width="100;" alt="wesgro"/>
                    <br />
                    <sub><b>Jake Ketcheson</b></sub>
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
                <a href="https://github.com/AndreasNel">
                    <img src="https://avatars.githubusercontent.com/u/17763359?v=4" width="100;" alt="AndreasNel"/>
                    <br />
                    <sub><b>Andreas Nel</b></sub>
                </a>
            </td>
            <td align="center">
                <a href="https://github.com/fengkx">
                    <img src="https://avatars.githubusercontent.com/u/16515468?v=4" width="100;" alt="fengkx"/>
                    <br />
                    <sub><b>Fengkx</b></sub>
                </a>
            </td>
		</tr>
		<tr>
            <td align="center">
                <a href="https://github.com/paul-sachs">
                    <img src="https://avatars.githubusercontent.com/u/11449728?v=4" width="100;" alt="paul-sachs"/>
                    <br />
                    <sub><b>Paul Sachs</b></sub>
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
                <a href="https://github.com/michaltarasiuk">
                    <img src="https://avatars.githubusercontent.com/u/69385846?v=4" width="100;" alt="michaltarasiuk"/>
                    <br />
                    <sub><b>Null</b></sub>
                </a>
            </td>
            <td align="center">
                <a href="https://github.com/KonradLinkowski">
                    <img src="https://avatars.githubusercontent.com/u/26126510?v=4" width="100;" alt="KonradLinkowski"/>
                    <br />
                    <sub><b>Konrad Linkowski</b></sub>
                </a>
            </td>
            <td align="center">
                <a href="https://github.com/jpwallace22">
                    <img src="https://avatars.githubusercontent.com/u/93415734?v=4" width="100;" alt="jpwallace22"/>
                    <br />
                    <sub><b>Justin Wallace</b></sub>
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
                <a href="https://github.com/dantman">
                    <img src="https://avatars.githubusercontent.com/u/53399?v=4" width="100;" alt="dantman"/>
                    <br />
                    <sub><b>Daniel Friesen</b></sub>
                </a>
            </td>
            <td align="center">
                <a href="https://github.com/ChloeMouret">
                    <img src="https://avatars.githubusercontent.com/u/63965373?v=4" width="100;" alt="ChloeMouret"/>
                    <br />
                    <sub><b>Null</b></sub>
                </a>
            </td>
		</tr>
		<tr>
            <td align="center">
                <a href="https://github.com/punkle">
                    <img src="https://avatars.githubusercontent.com/u/553697?v=4" width="100;" alt="punkle"/>
                    <br />
                    <sub><b>Brian Fletcher</b></sub>
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
                <a href="https://github.com/lensbart">
                    <img src="https://avatars.githubusercontent.com/u/20876627?v=4" width="100;" alt="lensbart"/>
                    <br />
                    <sub><b>Bart Lens</b></sub>
                </a>
            </td>
            <td align="center">
                <a href="https://github.com/axelboc">
                    <img src="https://avatars.githubusercontent.com/u/2936402?v=4" width="100;" alt="axelboc"/>
                    <br />
                    <sub><b>Axel Bocciarelli</b></sub>
                </a>
            </td>
            <td align="center">
                <a href="https://github.com/akd-io">
                    <img src="https://avatars.githubusercontent.com/u/30059155?v=4" width="100;" alt="akd-io"/>
                    <br />
                    <sub><b>Anders Kjær Damgaard</b></sub>
                </a>
            </td>
		</tr>
	<tbody>
</table>
<!-- readme: collaborators,contributors,semantic-release-bot/-,lint-action/- -end -->
