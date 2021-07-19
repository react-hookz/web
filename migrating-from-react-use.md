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

No API changes, besides name change.

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

No API changes, besides name change.

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

No API changes.

#### useSize

Use [useMeasure](https://react-hookz.github.io/web/?path=/docs/sensor-usemeasure) instead.

#### createBreakpoint

No plans to implement

#### useScrollbarWidth

Not implemented yet

### UI

#### useAudio

Not implemented yet

#### useClickAway

Implmented as [useClickOutside](https://react-hookz.github.io/web/?path=/docs/dom-useclickoutside))

No API changes, besides name change.

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

No API changes, besides name change.

### Side-effects

#### useAsync

Implemented as [useAsync](https://react-hookz.github.io/web/?path=/docs/side-effect-useasync)

OLD in `react-use`:

```javascript
const { loading, value, error } = useAsync(async () => {
  const response = await fetch(url);
  const result = await response.text();
  return result;
}, [url]);

console.log(loading);
console.log(value);
console.log(error.message);
```

NEW in `@react-hookz/web`:

```javascript
const [{ status, result, error }] = useAsync(async () => {
  const response = await fetch(url);
  const result = await response.text();
  return result;
}, [url]);

console.log(status === "loading");
console.log(result);
console.log(error.message);
```

#### useAsyncFn

Implemented as part of [useAsync](https://react-hookz.github.io/web/?path=/docs/side-effect-useasync)

OLD in `react-use`:

```javascript
const [{ loading, value, error }, doFetch] = useAsync(async () => {
  const response = await fetch(url);
  const result = await response.text();
  return result;
}, [url]);

doFetch();
```

NEW in `@react-hookz/web`:

```javascript
const [{ status, result, error }, { execute }] = useAsync(
  async () => {
    const response = await fetch(url);
    const result = await response.text();
    return result;
  },
  [url],
  { skipMount: true, skipUpdate: true }
);

execute();
```

#### useAsyncRetry

Implemented as part of [useAsync](https://react-hookz.github.io/web/?path=/docs/side-effect-useasync)

OLD in `react-use`:

```javascript
const { loading, value, error, retry } = useAsync(async () => {
  const response = await fetch(url);
  const result = await response.text();
  return result;
}, [url]);

retry();
```

NEW in `@react-hookz/web`:

```javascript
const [{ status, result, error }, { execute }] = useAsync(async () => {
  const response = await fetch(url);
  const result = await response.text();
  return result;
}, [url]);

execute();
```

#### useBeforeUnload

Not implemented yet

#### useCookie

Implemented as [useCookieValue](https://react-hookz.github.io/web/?path=/docs/side-effect-useCookieValue)

OLD in `react-use`:

```javascript
const [value, set, remove] = useCookie("my-cookie");

console.log(value);
set("Hello world!", options);
remove();
```

NEW in `@react-hookz/web`:

```javascript
const [value, set, remove] = useCookieValue("react-hookz", options);

console.log(value);
set("Hello world!");
remove();
```

NOTES:

- `js-cookies` needs installed separately from `@react-hookz/web` to use `useCookie`
- `useCookie` instances with the same key on the same page are synchronised. This synchronisation does not work across tabs or on changes that are triggered by third-party code.

#### useCopyToClipboard

Not implemented yet

#### useDebounce

`@react-hookz/web` has three options for debouncing, which we feel are both more ergonomic and flexible than `react-use`'s implementation.

Depending on your use case, [useDebouncedEffect](https://react-hookz.github.io/web/?path=/docs/lifecycle-usedebouncedeffect), [useDebounceCallback](https://react-hookz.github.io/web/?path=/docs/callback-usedebouncecallback), or [useDebouncedState](https://react-hookz.github.io/web/?path=/docs/state-usedebouncedstate) may be more appropriate.

#### useError

Not implemented yet

#### useFavicon

Not implemented yet

#### useLocalStorage

Implemented as [useLocalStorageValue](https://react-hookz.github.io/web/?path=/docs/side-effect-uselocalstoragevalue)

Backwards compatiable API, minus the `raw` option.

NOTE: `useLocalStorage` instances with the same key on the same page are synchronised. This synchronisation does not work across tabs or on changes that are triggered by third-party code.

#### useLockBodyScroll

Not implemented yet

#### useRafLoop

Not implemented yet

#### useSessionStorage

Implemented as [useSessionStorageValue](https://react-hookz.github.io/web/?path=/docs/side-effect-usesessionstoragevalue)

Backwards compatiable API, minus the `raw` option.

NOTE: `useSessionStorage` instances with the same key on the same page are synchronised. This synchronisation does not work across tabs or on changes that are triggered by third-party code.

#### useThrottle and useThrottleFn

`@react-hookz/web` has three options for throttling, which we feel are both more ergonomic and flexible than `react-use`'s implementations.

Depending on your use case, [useThrottledEffect](https://react-hookz.github.io/web/?path=/docs/lifecycle-usethrottledeffect), [useThrottledCallback](https://react-hookz.github.io/web/?path=/docs/callback-usethrottledcallback), or [useThrottledState](https://react-hookz.github.io/web/?path=/docs/state-usethrottledstate) may be more appropriate.

#### useTitle

Implemented as [useDocumentTitle](https://react-hookz.github.io/web/?path=/docs/dom-usedocumenttitle)

Backwards compatiable API.

#### usePermission

Implemented as [usePermission](https://react-hookz.github.io/web/?path=/docs/navigator-usepermission)

No API changes.

### Lifecycles

#### useEffectOnce

No plans to implement

#### useEvent

Implemented as [useEventListener](https://react-hookz.github.io/web/?path=/docs/dom-useeventlistener)

OLD in `react-use`:

```javascript
useEvent(
  "mousemove",
  () => {
    setState(new Date());
  },
  window,
  { passive: true }
);
```

NEW in `@react-hookz/web`:

```javascript
useEventListener(
  window,
  "mousemove",
  () => {
    setState(new Date());
  },
  { passive: true }
);
```

#### useLifecycles

No plans to implement

#### useMountedState

Implemented as [useIsMounted](https://react-hookz.github.io/web/?path=/docs/lifecycle-useIsMounted)

No API change, besides name change.

#### useUnmountPromise

Not implemented yet

#### usePromise

Not implemented yet

#### useLogger

Not implemented yet

#### useMount

Implemented as [useMountEffect](https://react-hookz.github.io/web/?path=/docs/lifecycle-useMountEffect)

No API change, besides name change.

#### useUnmount

Implemented as [useUnmountEffect](https://react-hookz.github.io/web/?path=/docs/lifecycle-useUnmountEffect)

No API change, besides name change.

#### useUpdateEffect

Implemented as [useUpdateEffect](https://react-hookz.github.io/web/?path=/docs/lifecycle-useUpdateEffect)

No API change.

#### useIsomorphicLayoutEffect

Implemented as [useIsomorphicLayoutEffect](https://react-hookz.github.io/web/?path=/docs/lifecycle-useIsomorphicLayoutEffect)

No API changes.

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

No API changes, besides name change.

#### usePrevious

Implemented as [usePrevious](https://react-hookz.github.io/web/?path=/docs/state-useprevious)

No API changes.

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

No API changes.

#### useBoolean

Use [useToggle](https://react-hookz.github.io/web/?path=/docs/state-usetoggle) instead

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

OLD in `react-use`:

```javascript
const [map, { set, remove, reset, setAll }] = useMap({
  hello: "there",
});

console.log(JSON.stringify(map, null, 2));
set("some", "thing");
remove("hello");
reset();
setAll({ hello: "there", some: "thing" });
```

NEW in `@react-hookz/web`:

```javascript
const map = useMap(new Map([['hello', 'there']]););

console.log(JSON.stringify(Array.from(map), null, 2));
map.set("some", "thing");
map.delete("hello");
map.clear();
// There is no native `setAll` method on `Map`s, but we can create our own easily
const setAll = (values) => {
    map.clear();
    valuePairs.forEach((valuePair) => map.set(valuePair[0], valuePair[1]));
}
setAll([['hello', 'there']]);
```

NOTES: `@react-hookz/web`'s implementation is the same signature as the native `Map` object, but its methods are wrapped to cause components to rerender with changes.

#### useSet

Implemented as [useSet](https://react-hookz.github.io/web/?path=/docs/state-useset)

OLD in `react-use`:

```javascript
const [set, { add, reset, remove, has, toggle }] = useSet(new Set(["hello", "world"]));

console.log(JSON.stringify(Array.from(set), null, 2));
add(String(Date.now()));
reset();
remove("hello");
has("hello");
toggle("hello");
```

NEW in `@react-hookz/web`:

```javascript
const set = useSet(["hello", "world"]);

console.log(JSON.stringify(Array.from(set), null, 2));
set.add(String(Date.now()));
set.clear();
set.delete("hello");
set.has("hello");
// There is no native `toggle` method on `Set`s, but we can create our own easily
const toggle = (value) => (set.has(value) ? set.delete(value) : set.add(value));
toggle("hello");
```

NOTES: `@react-hookz/web`'s implementation is the same signature as the native `Set` object, but its methods are wrapped to cause components to rerender with changes.

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

OLD in `react-use`:

```javascript
const [state, setState] = useMediatedState((value) => value, "");

console.log(state);
setState("Hello world!");
```

NEW in `@react-hookz/web`:

```javascript
const [state, setState] = useMediatedState("", (value) => value);

console.log(state);
setState("Hello world!");
```

#### useFirstMountState

Implemented as [useFirstMountState](https://react-hookz.github.io/web/?path=/docs/lifecycle-usefirstmountstate)

No API changes.

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
