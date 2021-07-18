# Migrating from `react-use`

One of `@react-hookz/web`'s primary goals is to replace [react-use](https://github.com/streamich/react-use), the no longer maintained project `@react-hookz/web` grew out of.

## A note on missing hooks

Many of `react-use`'s hooks have already been ported to `@react-hookz/web`. You can track our work in [this issue](https://github.com/react-hookz/web/issues/33).

If there is a `react-use` hook you need that isn't ported yet, please comment there - or even better, make a PR!

In the mean time, **feel free to use both `@react-hookz/web` and `react-use` in tandem**.

## Installation

See [our README](https://github.com/react-hookz/web).

## Migrating Hooks

### Sensors

#### useBattery

Not implemented yet

#### useGeolocation

Not implemented yet

#### useHover

Not implemented yet

#### useHoverDirty

Not implemented yet

#### useHash

Not implemented yet

#### useIdle

Not implemented yet

#### useIntersection

Not implemented yet

#### useKey

Not implemented yet

#### useKeyPress

Not implemented yet

#### useKeyboardJs

Not implemented yet

#### useKeyPressEvent

Not implemented yet

#### useLocation

Not implemented yet

#### useSearchParam

Not implemented yet

#### useLongPress

Not implemented yet

- [x] [useMedia](https://github.com/streamich/react-use/blob/master/docs/useMedia.md) — tracks state of a CSS media query. (implemented as [useMediaQuery](https://react-hookz.github.io/web/?path=/docs/sensor-usemediaquery))

#### useMediaDevices

Not implemented yet

#### useMotion

Not implemented yet

#### useMouse

Not implemented yet

#### useMouseHovered

Not implemented yet

#### useMouseWheel

Not implemented yet

- [x] [useNetworkState](https://github.com/streamich/react-use/blob/master/docs/useNetworkState.md) — tracks the state of browser's network connection. (implemented as [useNetwork](https://react-hookz.github.io/web/?path=/docs/navigator-usenetwork))

#### useOrientation

Not implemented yet

#### usePageLeave

Not implemented yet

#### useScratch

Not implemented yet

#### useScroll

Not implemented yet

#### useScrolling

Not implemented yet

#### useStartTyping

Not implemented yet

#### useWindowScroll

Not implemented yet

#### useWindowSize

Not implemented yet

- [x] [useMeasure](https://github.com/streamich/react-use/blob/master/docs/useMeasure.md) — tracks an HTML element's dimensions. (implemented as [useMeasure](https://react-hookz.github.io/web/?path=/docs/sensor-usemeasure))

#### useSize

Not implemented yet

#### createBreakpoint

No plans to implement

#### useScrollbarWidth

Not implemented yet

### UI

#### useAudio

Not implemented yet

- [x] [useClickAway](https://github.com/streamich/react-use/blob/master/docs/useClickAway.md) — triggers callback when user clicks outside target area. (Implmented as [useClickOutside](https://react-hookz.github.io/web/?path=/docs/dom-useclickoutside))

#### useCss

Not implemented yet

#### useDrop

Not implemented yet

#### useDropArea

Not implemented yet

#### useFullscreen

Not implemented yet

#### useSlider

Not implemented yet

#### useSpeech

Not implemented yet

#### useVibrate

Not implemented yet

#### useVideo

Not implemented yet

### Animations

#### useRaf

Not implemented yet

#### useInterval

Not implemented yet

#### useSpring

Not implemented yet

#### useTimeout

Not implemented yet

#### useTimeoutFn

Not implemented yet

#### useTween

Not implemented yet

- [x] [useUpdate](https://github.com/streamich/react-use/blob/master/docs/useUpdate.md) — returns a callback, which re-renders component when called. (Implemented as [useRerender](https://react-hookz.github.io/web/?path=/docs/lifecycle-useRerender))

### Side-effects

- [x] [useAsync](https://github.com/streamich/react-use/blob/master/docs/useAsync.md) — resolves an async function. (implemented as [useAsync](https://react-hookz.github.io/web/?path=/docs/side-effect-useasync))
- [x] [useAsyncFn](https://github.com/streamich/react-use/blob/master/docs/useAsyncFn.md) — resolves an async function. (implemented as [useAsync](https://react-hookz.github.io/web/?path=/docs/side-effect-useasync))
- [x] [useAsyncRetry](https://github.com/streamich/react-use/blob/master/docs/useAsyncRetry.md) — resolves an async function. (implemented as [useAsync](https://react-hookz.github.io/web/?path=/docs/side-effect-useasync))

#### useBeforeUnload

Not implemented yet

- [x] [useCookie](https://github.com/streamich/react-use/blob/master/docs/useCookie.md) — provides way to read, update and delete a cookie. (implemented as [useCookie](https://react-hookz.github.io/web/?path=/docs/side-effect-usecookie))

#### useCopyToClipboard

Not implemented yet

- [x] [useDebounce](https://github.com/streamich/react-use/blob/master/docs/useDebounce.md) — debounces a function. (Implemented as [useDebounceCallback](https://react-hookz.github.io/web/?path=/docs/callback-usedebouncecallback))

#### useError

Not implemented yet

#### useFavicon

Not implemented yet

- [x] [useLocalStorage](https://github.com/streamich/react-use/blob/master/docs/useLocalStorage.md) — manages a value in localStorage. (Implemented as [useLocalStorageValue](https://react-hookz.github.io/web/?path=/docs/side-effect-uselocalstoragevalue))

#### useLockBodyScroll

Not implemented yet

#### useRafLoop

Not implemented yet

- [x] [useSessionStorage](https://github.com/streamich/react-use/blob/master/docs/useSessionStorage.md) — manages a value in sessionStorage. (Implemented as [useSessionStorageValue](https://react-hookz.github.io/web/?path=/docs/side-effect-usesessionstoragevalue))
- [x] [useThrottle](https://github.com/streamich/react-use/blob/master/docs/useThrottle.md) — throttles a function.

#### useThrottleFn

No plans to implement

- [x] [useTitle](https://github.com/streamich/react-use/blob/master/docs/useTitle.md) — sets title of the page. (Implemented as [useDocumentTitle](https://react-hookz.github.io/web/?path=/docs/dom-usedocumenttitle))
- [x] [usePermission](https://github.com/streamich/react-use/blob/master/docs/usePermission.md) — query permission status for browser APIs. (Implemented as [usePermission](https://react-hookz.github.io/web/?path=/docs/navigator-usepermission))

### Lifecycles

#### useEffectOnce

No plans to implement

- [x] [useEvent](https://github.com/streamich/react-use/blob/master/docs/useEvent.md) — subscribe to events. (Implemented as [useEventListener](https://react-hookz.github.io/web/?path=/docs/dom-useeventlistener))

#### useLifecycles

No plans to implement

- [x] [useMountedState](https://github.com/streamich/react-use/blob/master/docs/useMountedState.md) — track if component is mounted. (Implemented as [useIsMounted](https://react-hookz.github.io/web/?path=/docs/lifecycle-useIsMounted))

#### useUnmountPromise

Not implemented yet

#### usePromise

Not implemented yet

#### useLogger

Not implemented yet

- [x] [useMount](https://github.com/streamich/react-use/blob/master/docs/useMount.md) — calls mount callbacks. (Implemented as [useMountEffect](https://react-hookz.github.io/web/?path=/docs/lifecycle-useMountEffect))
- [x] [useUnmount](https://github.com/streamich/react-use/blob/master/docs/useUnmount.md) — calls unmount callbacks. (Implemented as [useUnmountEffect](https://react-hookz.github.io/web/?path=/docs/lifecycle-useUnmountEffect))
- [x] [useUpdateEffect](https://github.com/streamich/react-use/blob/master/docs/useUpdateEffect.md) — run an effect only on updates. (Implemented as [useUpdateEffect](https://react-hookz.github.io/web/?path=/docs/lifecycle-useUpdateEffect))
- [x] [useIsomorphicLayoutEffect](https://github.com/streamich/react-use/blob/master/docs/useIsomorphicLayoutEffect.md) — useLayoutEffect that does not show warning when server-side rendering. (Implemented as [useIsomorphicLayoutEffect](https://react-hookz.github.io/web/?path=/docs/lifecycle-useIsomorphicLayoutEffect))

#### useDeepCompareEffect

Not implemented yet

#### useShallowCompareEffect

Not implemented yet

#### useCustomCompareEffect

Not implemented yet

### State

#### createMemo

No plans to implement

#### createReducer

No plans to implement

#### createReducerContext

No plans to implement

#### createStateContext

No plans to implement

#### useDefault

Not implemented yet

#### useGetSet

Not implemented yet

#### useGetSetState

Not implemented yet

- [x] [useLatest](https://github.com/streamich/react-use/blob/master/docs/useLatest.md) — returns the latest state or props (as useSynchedRef)
- [x] [usePrevious](https://github.com/streamich/react-use/blob/master/docs/usePrevious.md) — returns the previous state or props. (Implemented as [usePrevious](https://react-hookz.github.io/web/?path=/docs/state-useprevious))

#### usePreviousDistinct

Not implemented yet

#### useObservable

Not implemented yet

#### useRafState

Not implemented yet

#### useSetState

Not implemented yet

#### useStateList

Not implemented yet

- [x] [useToggle](https://github.com/streamich/react-use/blob/master/docs/useToggle.md) — tracks state of a boolean. (Implemented as [useToggle](https://react-hookz.github.io/web/?path=/docs/state-usetoggle))
- [x] [useBoolean](https://github.com/streamich/react-use/blob/master/docs/useBoolean.md) — tracks state of a boolean. (Implemented as [useToggle](https://react-hookz.github.io/web/?path=/docs/state-usetoggle))

#### useCounter

Not implemented yet

#### useNumber

Not implemented yet

#### useList

Not implemented yet

#### useUpsert

Not implemented yet

- [x] [useMap](https://github.com/streamich/react-use/blob/master/docs/useMap.md) — tracks state of an object. (Implemented as [useMap](https://react-hookz.github.io/web/?path=/docs/state-usemap))
- [x] [useSet](https://github.com/streamich/react-use/blob/master/docs/useSet.md) — tracks state of a Set. (Implemented as [useSet](https://react-hookz.github.io/web/?path=/docs/state-useset))

#### useQueue

Not implemented yet

- [x] [useStateValidator](https://github.com/streamich/react-use/blob/master/docs/useStateValidator.md) — tracks state of an object.

#### useStateWithHistory

Not implemented yet

#### useMultiStateValidator

Not implemented yet

- [x] [useMediatedState](https://github.com/streamich/react-use/blob/master/docs/useMediatedState.md) — like the regular useState but with mediation by custom function. (Implemented as [useMediatedState](https://react-hookz.github.io/web/?path=/docs/lifecycle-usemediatedstate))
- [x] [useFirstMountState](https://github.com/streamich/react-use/blob/master/docs/useFirstMountState.md) — check if current render is first. (Implemented as [useFirstMountState](https://react-hookz.github.io/web/?path=/docs/lifecycle-usefirstmountstate))

#### useRendersCount

Not implemented yet

#### createGlobalState

No plans to implement

#### useMethods

Not implemented yet

### Miscellaneous

#### useEnsuredForwardedRef

Not implemented yet

#### ensuredForwardRef

Not implemented yet
