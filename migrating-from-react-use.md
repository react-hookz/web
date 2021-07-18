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

- [ ] [useBattery](https://github.com/streamich/react-use/blob/master/docs/useBattery.md) — tracks device battery state.
- [ ] [useGeolocation](https://github.com/streamich/react-use/blob/master/docs/useGeolocation.md) — tracks geo location state of user's device.
- [ ] [useHover](https://github.com/streamich/react-use/blob/master/docs/useHover.md) — tracks mouse hover state of some element.
- [ ] [useHoverDirty](https://github.com/streamich/react-use/blob/master/docs/useHoverDirty.md) — tracks mouse hover state of some element.
- [ ] [useHash](https://github.com/streamich/react-use/blob/master/docs/useHash.md) — tracks location hash value.
- [ ] [useIdle](https://github.com/streamich/react-use/blob/master/docs/useIdle.md) — tracks whether user is being inactive.
- [ ] [useIntersection](https://github.com/streamich/react-use/blob/master/docs/useIntersection.md) — tracks an HTML element's intersection. (Implemented as [useIntersectionObserver](https://react-hookz.github.io/web/?path=/docs/sensor-useintersectionobserver))
- [ ] [useKey](https://github.com/streamich/react-use/blob/master/docs/useKey.md) — track keys.
- [ ] [useKeyPress](https://github.com/streamich/react-use/blob/master/docs/useKeyPress.md) — track keys.
- [ ] [useKeyboardJs](https://github.com/streamich/react-use/blob/master/docs/useKeyboardJs.md) — track keys.
- [ ] [useKeyPressEvent](https://github.com/streamich/react-use/blob/master/docs/useKeyPressEvent.md) — track keys.
- [ ] [useLocation](https://github.com/streamich/react-use/blob/master/docs/useLocation.md) — tracks page navigation bar location state.
- [ ] [useSearchParam](https://github.com/streamich/react-use/blob/master/docs/useSearchParam.md) — tracks page navigation bar location state.
- [ ] [useLongPress](https://github.com/streamich/react-use/blob/master/docs/useLongPress.md) — tracks long press gesture of some element.
- [x] [useMedia](https://github.com/streamich/react-use/blob/master/docs/useMedia.md) — tracks state of a CSS media query. (implemented as [useMediaQuery](https://react-hookz.github.io/web/?path=/docs/sensor-usemediaquery))
- [ ] [useMediaDevices](https://github.com/streamich/react-use/blob/master/docs/useMediaDevices.md) — tracks state of connected hardware devices.
- [ ] [useMotion](https://github.com/streamich/react-use/blob/master/docs/useMotion.md) — tracks state of device's motion sensor.
- [ ] [useMouse](https://github.com/streamich/react-use/blob/master/docs/useMouse.md) — tracks state of mouse position.
- [ ] [useMouseHovered](https://github.com/streamich/react-use/blob/master/docs/useMouseHovered.md) — tracks state of mouse position.
- [ ] [useMouseWheel](https://github.com/streamich/react-use/blob/master/docs/useMouseWheel.md) — tracks deltaY of scrolled mouse wheel.
- [x] [useNetworkState](https://github.com/streamich/react-use/blob/master/docs/useNetworkState.md) — tracks the state of browser's network connection. (implemented as [useNetwork](https://react-hookz.github.io/web/?path=/docs/navigator-usenetwork))
- [ ] [useOrientation](https://github.com/streamich/react-use/blob/master/docs/useOrientation.md) — tracks state of device's screen orientation.
- [ ] [usePageLeave](https://github.com/streamich/react-use/blob/master/docs/usePageLeave.md) — triggers when mouse leaves page boundaries.
- [ ] [useScratch](https://github.com/streamich/react-use/blob/master/docs/useScratch.md) — tracks mouse click-and-scrub state.
- [ ] [useScroll](https://github.com/streamich/react-use/blob/master/docs/useScroll.md) — tracks an HTML element's scroll position.
- [ ] [useScrolling](https://github.com/streamich/react-use/blob/master/docs/useScrolling.md) — tracks whether HTML element is scrolling.
- [ ] [useStartTyping](https://github.com/streamich/react-use/blob/master/docs/useStartTyping.md) — detects when user starts typing.
- [ ] [useWindowScroll](https://github.com/streamich/react-use/blob/master/docs/useWindowScroll.md) — tracks Window scroll position.
- [ ] [useWindowSize](https://github.com/streamich/react-use/blob/master/docs/useWindowSize.md) — tracks Window dimensions.
- [x] [useMeasure](https://github.com/streamich/react-use/blob/master/docs/useMeasure.md) — tracks an HTML element's dimensions. (implemented as [useMeasure](https://react-hookz.github.io/web/?path=/docs/sensor-usemeasure))
- [ ] [useSize](https://github.com/streamich/react-use/blob/master/docs/useSize.md) — tracks an HTML element's dimensions.

#### createBreakpoint

No plans to implement

- [ ] [useScrollbarWidth](https://github.com/streamich/react-use/blob/master/docs/useScrollbarWidth.md) — detects browser's native scrollbars width.

### UI

- [ ] [useAudio](https://github.com/streamich/react-use/blob/master/docs/useAudio.md) — plays audio and exposes its controls.
- [x] [useClickAway](https://github.com/streamich/react-use/blob/master/docs/useClickAway.md) — triggers callback when user clicks outside target area. (Implmented as [useClickOutside](https://react-hookz.github.io/web/?path=/docs/dom-useclickoutside))
- [ ] [useCss](https://github.com/streamich/react-use/blob/master/docs/useCss.md) — dynamically adjusts CSS.
- [ ] [useDrop](https://github.com/streamich/react-use/blob/master/docs/useDrop.md) — tracks file, link and copy-paste drops.
- [ ] [useDropArea](https://github.com/streamich/react-use/blob/master/docs/useDropArea.md) — tracks file, link and copy-paste drops.
- [ ] [useFullscreen](https://github.com/streamich/react-use/blob/master/docs/useFullscreen.md) — display an element or video full-screen.
- [ ] [useSlider](https://github.com/streamich/react-use/blob/master/docs/useSlider.md) — provides slide behavior over any HTML element.
- [ ] [useSpeech](https://github.com/streamich/react-use/blob/master/docs/useSpeech.md) — synthesizes speech from a text string.
- [ ] [useVibrate](https://github.com/streamich/react-use/blob/master/docs/useVibrate.md) — provide physical feedback using the Vibration API.
- [ ] [useVideo](https://github.com/streamich/react-use/blob/master/docs/useVideo.md) — plays video, tracks its state, and exposes playback controls.

### Animations

- [ ] [useRaf](https://github.com/streamich/react-use/blob/master/docs/useRaf.md) — re-renders component on each requestAnimationFrame.
- [ ] [useInterval](https://github.com/streamich/react-use/blob/master/docs/useInterval.md) and useHarmonicIntervalFn — re-renders component on a set interval using setInterval.
- [ ] [useSpring](https://github.com/streamich/react-use/blob/master/docs/useSpring.md) — interpolates number over time according to spring dynamics.
- [ ] [useTimeout](https://github.com/streamich/react-use/blob/master/docs/useTimeout.md) — re-renders component after a timeout.
- [ ] [useTimeoutFn](https://github.com/streamich/react-use/blob/master/docs/useTimeoutFn.md) — calls given function after a timeout.
- [ ] [useTween](https://github.com/streamich/react-use/blob/master/docs/useTween.md) — re-renders component, while tweening a number from 0 to 1.
- [x] [useUpdate](https://github.com/streamich/react-use/blob/master/docs/useUpdate.md) — returns a callback, which re-renders component when called. (Implemented as [useRerender](https://react-hookz.github.io/web/?path=/docs/lifecycle-useRerender))

### Side-effects

- [x] [useAsync](https://github.com/streamich/react-use/blob/master/docs/useAsync.md) — resolves an async function. (implemented as [useAsync](https://react-hookz.github.io/web/?path=/docs/side-effect-useasync))
- [x] [useAsyncFn](https://github.com/streamich/react-use/blob/master/docs/useAsyncFn.md) — resolves an async function. (implemented as [useAsync](https://react-hookz.github.io/web/?path=/docs/side-effect-useasync))
- [x] [useAsyncRetry](https://github.com/streamich/react-use/blob/master/docs/useAsyncRetry.md) — resolves an async function. (implemented as [useAsync](https://react-hookz.github.io/web/?path=/docs/side-effect-useasync))
- [ ] [useBeforeUnload](https://github.com/streamich/react-use/blob/master/docs/useBeforeUnload.md) — shows browser alert when user try to reload or close the page.
- [x] [useCookie](https://github.com/streamich/react-use/blob/master/docs/useCookie.md) — provides way to read, update and delete a cookie. (implemented as [useCookie](https://react-hookz.github.io/web/?path=/docs/side-effect-usecookie))
- [ ] [useCopyToClipboard](https://github.com/streamich/react-use/blob/master/docs/useCopyToClipboard.md) — copies text to clipboard.
- [x] [useDebounce](https://github.com/streamich/react-use/blob/master/docs/useDebounce.md) — debounces a function. (Implemented as [useDebounceCallback](https://react-hookz.github.io/web/?path=/docs/callback-usedebouncecallback))
- [ ] [useError](https://github.com/streamich/react-use/blob/master/docs/useError.md) — error dispatcher.
- [ ] [useFavicon](https://github.com/streamich/react-use/blob/master/docs/useFavicon.md) — sets favicon of the page.
- [x] [useLocalStorage](https://github.com/streamich/react-use/blob/master/docs/useLocalStorage.md) — manages a value in localStorage. (Implemented as [useLocalStorageValue](https://react-hookz.github.io/web/?path=/docs/side-effect-uselocalstoragevalue))
- [ ] [useLockBodyScroll](https://github.com/streamich/react-use/blob/master/docs/useLockBodyScroll.md) — lock scrolling of the body element.
- [ ] [useRafLoop](https://github.com/streamich/react-use/blob/master/docs/useRafLoop.md) — calls given function inside the RAF loop.
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
- [ ] [useUnmountPromise](https://github.com/streamich/react-use/blob/master/docs/useUnmountPromise.md) — track if component is mounted.
- [ ] [usePromise](https://github.com/streamich/react-use/blob/master/docs/usePromise.md) — resolves promise only while component is mounted.
- [ ] [useLogger](https://github.com/streamich/react-use/blob/master/docs/useLogger.md) — logs in console as component goes through life-cycles.
- [x] [useMount](https://github.com/streamich/react-use/blob/master/docs/useMount.md) — calls mount callbacks. (Implemented as [useMountEffect](https://react-hookz.github.io/web/?path=/docs/lifecycle-useMountEffect))
- [x] [useUnmount](https://github.com/streamich/react-use/blob/master/docs/useUnmount.md) — calls unmount callbacks. (Implemented as [useUnmountEffect](https://react-hookz.github.io/web/?path=/docs/lifecycle-useUnmountEffect))
- [x] [useUpdateEffect](https://github.com/streamich/react-use/blob/master/docs/useUpdateEffect.md) — run an effect only on updates. (Implemented as [useUpdateEffect](https://react-hookz.github.io/web/?path=/docs/lifecycle-useUpdateEffect))
- [x] [useIsomorphicLayoutEffect](https://github.com/streamich/react-use/blob/master/docs/useIsomorphicLayoutEffect.md) — useLayoutEffect that does not show warning when server-side rendering. (Implemented as [useIsomorphicLayoutEffect](https://react-hookz.github.io/web/?path=/docs/lifecycle-useIsomorphicLayoutEffect))
- [ ] [useDeepCompareEffect](https://github.com/streamich/react-use/blob/master/docs/useDeepCompareEffect.md) — run an effect depending on deep comparison of its dependencies
- [ ] [useShallowCompareEffect](https://github.com/streamich/react-use/blob/master/docs/useShallowCompareEffect.md) — run an effect depending on deep comparison of its dependencies
- [ ] [useCustomCompareEffect](https://github.com/streamich/react-use/blob/master/docs/useCustomCompareEffect.md) — run an effect depending on deep comparison of its dependencies

### State

#### createMemo

No plans to implement

#### createReducer

No plans to implement

#### createReducerContext

No plans to implement

#### createStateContext

No plans to implement

- [ ] [useDefault](https://github.com/streamich/react-use/blob/master/docs/useDefault.md) — returns the default value when state is null or undefined.
- [ ] [useGetSet](https://github.com/streamich/react-use/blob/master/docs/useGetSet.md) — returns state getter get() instead of raw state.
- [ ] [useGetSetState](https://github.com/streamich/react-use/blob/master/docs/useGetSetState.md) — as if useGetSet and useSetState had a baby.
- [x] [useLatest](https://github.com/streamich/react-use/blob/master/docs/useLatest.md) — returns the latest state or props (as useSynchedRef)
- [x] [usePrevious](https://github.com/streamich/react-use/blob/master/docs/usePrevious.md) — returns the previous state or props. (Implemented as [usePrevious](https://react-hookz.github.io/web/?path=/docs/state-useprevious))
- [ ] [usePreviousDistinct](https://github.com/streamich/react-use/blob/master/docs/usePreviousDistinct.md) — like usePrevious but with a predicate to determine if previous should update.
- [ ] [useObservable](https://github.com/streamich/react-use/blob/master/docs/useObservable.md) — tracks latest value of an Observable.
- [ ] [useRafState](https://github.com/streamich/react-use/blob/master/docs/useRafState.md) — creates setState method which only updates after requestAnimationFrame.
- [ ] [useSetState](https://github.com/streamich/react-use/blob/master/docs/useSetState.md) — creates setState method which works like this.setState.
- [ ] [useStateList](https://github.com/streamich/react-use/blob/master/docs/useStateList.md) — circularly iterates over an array.
- [x] [useToggle](https://github.com/streamich/react-use/blob/master/docs/useToggle.md) — tracks state of a boolean. (Implemented as [useToggle](https://react-hookz.github.io/web/?path=/docs/state-usetoggle))
- [x] [useBoolean](https://github.com/streamich/react-use/blob/master/docs/useBoolean.md) — tracks state of a boolean. (Implemented as [useToggle](https://react-hookz.github.io/web/?path=/docs/state-usetoggle))
- [ ] [useCounter](https://github.com/streamich/react-use/blob/master/docs/useCounter.md) — tracks state of a number.
- [ ] [useNumber](https://github.com/streamich/react-use/blob/master/docs/useNumber.md) — tracks state of a number.
- [ ] [useList](https://github.com/streamich/react-use/blob/master/docs/useList.md) — tracks state of an array.
- [ ] [useUpsert](https://github.com/streamich/react-use/blob/master/docs/useUpsert.md) — tracks state of an array.
- [x] [useMap](https://github.com/streamich/react-use/blob/master/docs/useMap.md) — tracks state of an object. (Implemented as [useMap](https://react-hookz.github.io/web/?path=/docs/state-usemap))
- [x] [useSet](https://github.com/streamich/react-use/blob/master/docs/useSet.md) — tracks state of a Set. (Implemented as [useSet](https://react-hookz.github.io/web/?path=/docs/state-useset))
- [ ] [useQueue](https://github.com/streamich/react-use/blob/master/docs/useQueue.md) — implements simple queue.
- [x] [useStateValidator](https://github.com/streamich/react-use/blob/master/docs/useStateValidator.md) — tracks state of an object.
- [ ] [useStateWithHistory](https://github.com/streamich/react-use/blob/master/docs/useStateWithHistory.md) — stores previous state values and provides handles to travel through them.
- [ ] [useMultiStateValidator](https://github.com/streamich/react-use/blob/master/docs/useMultiStateValidator.md) — alike the useStateValidator, but tracks multiple states at a time.
- [x] [useMediatedState](https://github.com/streamich/react-use/blob/master/docs/useMediatedState.md) — like the regular useState but with mediation by custom function. (Implemented as [useMediatedState](https://react-hookz.github.io/web/?path=/docs/lifecycle-usemediatedstate))
- [x] [useFirstMountState](https://github.com/streamich/react-use/blob/master/docs/useFirstMountState.md) — check if current render is first. (Implemented as [useFirstMountState](https://react-hookz.github.io/web/?path=/docs/lifecycle-usefirstmountstate))
- [ ] [useRendersCount](https://github.com/streamich/react-use/blob/master/docs/useRendersCount.md) — count component renders.

#### createGlobalState

No plans to implement

- [ ] [useMethods](https://github.com/streamich/react-use/blob/master/docs/useMethods.md) — neat alternative to useReducer.

### Miscellaneous

- [ ] [useEnsuredForwardedRef](https://github.com/streamich/react-use/blob/master/docs/useEnsuredForwardedRef.md) — use a React.forwardedRef safely.
- [ ] [ensuredForwardRef](https://github.com/streamich/react-use/blob/master/docs/ensuredForwardRef.md) — use a React.forwardedRef safely.
