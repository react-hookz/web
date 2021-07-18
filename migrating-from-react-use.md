# Migrating from `react-use`

One of `@react-hookz/web`'s primary goals is to replace [react-use](https://github.com/streamich/react-use), the no longer maintained project `@react-hookz/web` grew out of.

## A note on missing hooks

The most common `react-use` hooks have already been ported to `@react-hookz/web`. You can track our progress porting the rest of `react-use`'s hooks in [this issue](https://github.com/react-hookz/web/issues/33).

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

#### useMedia

Implemented as [useMediaQuery](https://react-hookz.github.io/web/?path=/docs/sensor-usemediaquery)

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

#### useNetworkState

Implemented as [useNetwork](https://react-hookz.github.io/web/?path=/docs/navigator-usenetwork)

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

#### useMeasure

Implemented as [useMeasure](https://react-hookz.github.io/web/?path=/docs/sensor-usemeasure)

#### useSize

Not implemented yet

#### createBreakpoint

No plans to implement

#### useScrollbarWidth

Not implemented yet

### UI

#### useAudio

Not implemented yet

#### useClickAway

Implmented as [useClickOutside](https://react-hookz.github.io/web/?path=/docs/dom-useclickoutside))

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

#### useUpdate

Implemented as [useRerender](https://react-hookz.github.io/web/?path=/docs/lifecycle-useRerender)

### Side-effects

#### useAsync

Implemented as [useAsync](https://react-hookz.github.io/web/?path=/docs/side-effect-useasync)

#### useAsyncFn

Implemented as [useAsync](https://react-hookz.github.io/web/?path=/docs/side-effect-useasync)

#### useAsyncRetry

Implemented as [useAsync](https://react-hookz.github.io/web/?path=/docs/side-effect-useasync)

#### useBeforeUnload

Not implemented yet

#### useCookie

Implemented as [useCookie](https://react-hookz.github.io/web/?path=/docs/side-effect-usecookie)

#### useCopyToClipboard

Not implemented yet

#### useDebounce

`@react-hookz/web` has three options for debouncing, which we feel are both more ergonomic and flexible than `react-use`'s implementation.

Implemented as [useDebounceCallback](https://react-hookz.github.io/web/?path=/docs/callback-usedebouncecallback)

#### useError

Not implemented yet

#### useFavicon

Not implemented yet

#### useLocalStorage

Implemented as [useLocalStorageValue](https://react-hookz.github.io/web/?path=/docs/side-effect-uselocalstoragevalue)

#### useLockBodyScroll

Not implemented yet

#### useRafLoop

Not implemented yet

#### useSessionStorage

Implemented as [useSessionStorageValue](https://react-hookz.github.io/web/?path=/docs/side-effect-usesessionstoragevalue)

#### useThrottle and useThrottleFn

`@react-hookz/web` has three options for throttling, which we feel are both more ergonomic and flexible than `react-use`'s implementations.

#### useTitle

Implemented as [useDocumentTitle](https://react-hookz.github.io/web/?path=/docs/dom-usedocumenttitle)

#### usePermission

Implemented as [usePermission](https://react-hookz.github.io/web/?path=/docs/navigator-usepermission)

### Lifecycles

#### useEffectOnce

No plans to implement

#### useEvent

Implemented as [useEventListener](https://react-hookz.github.io/web/?path=/docs/dom-useeventlistener)

#### useLifecycles

No plans to implement

#### useMountedState

Implemented as [useIsMounted](https://react-hookz.github.io/web/?path=/docs/lifecycle-useIsMounted)

#### useUnmountPromise

Not implemented yet

#### usePromise

Not implemented yet

#### useLogger

Not implemented yet

#### useMount

Implemented as [useMountEffect](https://react-hookz.github.io/web/?path=/docs/lifecycle-useMountEffect)

#### useUnmount

Implemented as [useUnmountEffect](https://react-hookz.github.io/web/?path=/docs/lifecycle-useUnmountEffect)

#### useUpdateEffect

Implemented as [useUpdateEffect](https://react-hookz.github.io/web/?path=/docs/lifecycle-useUpdateEffect)

#### useIsomorphicLayoutEffect

Implemented as [useIsomorphicLayoutEffect](https://react-hookz.github.io/web/?path=/docs/lifecycle-useIsomorphicLayoutEffect)

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

#### useLatest

Implemented as [useSynchedRef](https://react-hookz.github.io/web/?path=/docs/miscellaneous-usesyncedref)

#### usePrevious

Implemented as [usePrevious](https://react-hookz.github.io/web/?path=/docs/state-useprevious)

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

#### useToggle

Implemented as [useToggle](https://react-hookz.github.io/web/?path=/docs/state-usetoggle)

#### useBoolean

Implemented as [useToggle](https://react-hookz.github.io/web/?path=/docs/state-usetoggle)

#### useCounter

Not implemented yet

#### useNumber

Not implemented yet

#### useList

Not implemented yet

#### useUpsert

Not implemented yet

#### useMap

Implemented as [useMap](https://react-hookz.github.io/web/?path=/docs/state-usemap)

#### useSet

Implemented as [useSet](https://react-hookz.github.io/web/?path=/docs/state-useset)

#### useQueue

Not implemented yet

#### useStateValidator

// - UseValidator link is missing from the issue and the docs are broken

#### useStateWithHistory

Not implemented yet

#### useMultiStateValidator

Not implemented yet

#### useMediatedState

Implemented as [useMediatedState](https://react-hookz.github.io/web/?path=/docs/lifecycle-usemediatedstate)

#### useFirstMountState

Implemented as [useFirstMountState](https://react-hookz.github.io/web/?path=/docs/lifecycle-usefirstmountstate)

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
