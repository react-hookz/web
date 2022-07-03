## [14.7.1](https://github.com/react-hookz/web/compare/v14.7.0...v14.7.1) (2022-07-03)


### Bug Fixes

* **useCookieValue:** proper js-cookie import ([#864](https://github.com/react-hookz/web/issues/864)) ([bb6464b](https://github.com/react-hookz/web/commit/bb6464b9893370c73edcf462a65f09de23efbf44)), closes [#280](https://github.com/react-hookz/web/issues/280)

# [14.7.0](https://github.com/react-hookz/web/compare/v14.6.0...v14.7.0) (2022-06-30)


### Features

* implement `useFunctionalState` ([#862](https://github.com/react-hookz/web/issues/862)) ([1491d38](https://github.com/react-hookz/web/commit/1491d38024cf2c5c3646e5dcf5a31e9f0a0e1aec)), closes [#530](https://github.com/react-hookz/web/issues/530)

# [14.6.0](https://github.com/react-hookz/web/compare/v14.5.1...v14.6.0) (2022-06-30)


### Features

* **useIsMounted:** allow to set initial value ([a63188a](https://github.com/react-hookz/web/commit/a63188a79e6b920fb6d2bd4fd18f26b3dadb7036))
* **useSafeState:** fix issue with inability to set state before mount ([af8f4cd](https://github.com/react-hookz/web/commit/af8f4cdcc498260a6cdb763dc13605102ab9ba9b))

## [14.5.1](https://github.com/react-hookz/web/compare/v14.5.0...v14.5.1) (2022-06-30)


### Bug Fixes

* **useMeasure:** support conditional rendering ([76ac155](https://github.com/react-hookz/web/commit/76ac155f65223bdc51570138f55a4ca89d299079)), closes [#755](https://github.com/react-hookz/web/issues/755)

# [14.5.0](https://github.com/react-hookz/web/compare/v14.4.0...v14.5.0) (2022-06-30)


### Features

* implement `useHookableRef` hook ([f41ab22](https://github.com/react-hookz/web/commit/f41ab226d4708a827724be3580d74dcef2baaee9))

# [14.4.0](https://github.com/react-hookz/web/compare/v14.3.0...v14.4.0) (2022-06-30)


### Features

* implement `useIntervalEffect` ([a3869a3](https://github.com/react-hookz/web/commit/a3869a35b80ded1f0abd96366038ccd0b10d9040)), closes [#33](https://github.com/react-hookz/web/issues/33) [#452](https://github.com/react-hookz/web/issues/452)

# [14.3.0](https://github.com/react-hookz/web/compare/v14.2.3...v14.3.0) (2022-06-25)


### Features

* **useList:** port useList from react-use ([#810](https://github.com/react-hookz/web/issues/810)) ([73639fb](https://github.com/react-hookz/web/commit/73639fb55793c01ff8a8f1d7ad8bb3c7a9665561))

## [14.2.3](https://github.com/react-hookz/web/compare/v14.2.2...v14.2.3) (2022-06-22)


### Bug Fixes

* apply correct order of operations in `useRerender` ([#850](https://github.com/react-hookz/web/issues/850)) ([5fc735a](https://github.com/react-hookz/web/commit/5fc735ad2b582394c913ffc2440495213d1dff2d))
* change storybook builder to webpack5 ([#830](https://github.com/react-hookz/web/issues/830)) ([2df44c1](https://github.com/react-hookz/web/commit/2df44c1fc206dd0f6108da0bd282db259ab73010))

## [14.2.2](https://github.com/react-hookz/web/compare/v14.2.1...v14.2.2) (2022-05-12)


### Bug Fixes

* `useResizeObserver` now respects element changes within ref object ([#759](https://github.com/react-hookz/web/issues/759)) ([2a4e848](https://github.com/react-hookz/web/commit/2a4e8482c29a8374bcd3eabb2e26c7899bc5a4a2)), closes [#755](https://github.com/react-hookz/web/issues/755)

## [14.2.1](https://github.com/react-hookz/web/compare/v14.2.0...v14.2.1) (2022-05-12)


### Bug Fixes

* `useUnmountEffect` now invokes changing effect functions ([#758](https://github.com/react-hookz/web/issues/758)) ([380637a](https://github.com/react-hookz/web/commit/380637a1bd1e91d1f22ad5fb9ef7557598700cb3)), closes [#756](https://github.com/react-hookz/web/issues/756)

# [14.2.0](https://github.com/react-hookz/web/compare/v14.1.0...v14.2.0) (2022-05-12)


### Features

* `useVibration` hook implementation and docs ([#757](https://github.com/react-hookz/web/issues/757)) ([db40294](https://github.com/react-hookz/web/commit/db4029403dfa11a0e00fda8cf2427c6f94e406d2))

# [14.1.0](https://github.com/react-hookz/web/compare/v14.0.0...v14.1.0) (2022-05-12)


### Features

* **useCounter:** port `useCounter` from `react-use` ([#751](https://github.com/react-hookz/web/issues/751)) ([510947b](https://github.com/react-hookz/web/commit/510947bdd9006fc9c5f0c15c37f7983e950955e6)), closes [#33](https://github.com/react-hookz/web/issues/33)

# [14.0.0](https://github.com/react-hookz/web/compare/v13.3.0...v14.0.0) (2022-05-11)


### Bug Fixes

* **`useMediatedState`:** make initial state be passed through mediator ([#753](https://github.com/react-hookz/web/issues/753)) ([727d224](https://github.com/react-hookz/web/commit/727d224bf55373a6f0ea15bc661a666b3f1e1631))


### BREAKING CHANGES

* **`useMediatedState`:** `useMediatedState` now passes initial state through mediator

# [13.3.0](https://github.com/react-hookz/web/compare/v13.2.1...v13.3.0) (2022-04-25)


### Features

* implement `useLifecycleEffect` hook ([#652](https://github.com/react-hookz/web/issues/652)) ([357b018](https://github.com/react-hookz/web/commit/357b01802ef2d98a17a36f653a3e6aa90ad5b4ef))

## [13.2.1](https://github.com/react-hookz/web/compare/v13.2.0...v13.2.1) (2022-04-10)


### Bug Fixes

* make `useRerender` operate integer increment instead of bool switch ([#711](https://github.com/react-hookz/web/issues/711)) ([409a21f](https://github.com/react-hookz/web/commit/409a21f73d3250ad08e5a46da59cc2db88f29390)), closes [#691](https://github.com/react-hookz/web/issues/691)

# [13.2.0](https://github.com/react-hookz/web/compare/v13.1.0...v13.2.0) (2022-03-30)


### Features

* create `useRafEffect` ([#693](https://github.com/react-hookz/web/issues/693)) ([6548831](https://github.com/react-hookz/web/commit/65488314e7a0845a10f263e05026490171891bda))

# [13.1.0](https://github.com/react-hookz/web/compare/v13.0.0...v13.1.0) (2022-03-14)


### Features

* implement `useRafState` hook ([6cd44ec](https://github.com/react-hookz/web/commit/6cd44ecead3864aa1f0ece8ab3f5e02ae4e42cbf))
* implement `useWindowSize` hook ([81819cf](https://github.com/react-hookz/web/commit/81819cf63315564ee5f41174f5a036c158dad913))

# [13.0.0](https://github.com/react-hookz/web/compare/v12.3.0...v13.0.0) (2022-02-25)


### Features

* **`useMediaQuery`:** add synchronous mql state fetch ([0e0be56](https://github.com/react-hookz/web/commit/0e0be5626bbe3ab0815e25f9aef49dbb1be681b1))
* implement new hook - `useScreenOrientation` ([107cc21](https://github.com/react-hookz/web/commit/107cc2116f09d44757495d688f41eeb5cad11760))


### BREAKING CHANGES

* **`useMediaQuery`:** `useMediaQuery` now does synchronous fetch, this means
that in browser it will return final state on first render, while SSR
mode still return `undefined`.
SSR users should set second parameter of this hook to `true`, to
postpone state fetch until effects phase.

# [12.3.0](https://github.com/react-hookz/web/compare/v12.2.0...v12.3.0) (2022-01-17)


### Features

* new hook `usePreviousDistinct` ([#585](https://github.com/react-hookz/web/issues/585)) ([1bf69d6](https://github.com/react-hookz/web/commit/1bf69d66e951e8a09427aa5f9f652fb8be5d8229)), closes [#33](https://github.com/react-hookz/web/issues/33)

# [12.2.0](https://github.com/react-hookz/web/compare/v12.1.2...v12.2.0) (2022-01-14)


### Features

* new hook `useDeepCompareEffect` ([#581](https://github.com/react-hookz/web/issues/581)) ([3dfa7b5](https://github.com/react-hookz/web/commit/3dfa7b5664746fd5288d488fb477c23f8e765f43))

## [12.1.2](https://github.com/react-hookz/web/compare/v12.1.1...v12.1.2) (2022-01-13)


### Bug Fixes

* move to stricter linting configuration ([#580](https://github.com/react-hookz/web/issues/580)) ([f455992](https://github.com/react-hookz/web/commit/f455992a60b06846fa86a4627d206053b279e96c))

## [12.1.1](https://github.com/react-hookz/web/compare/v12.1.0...v12.1.1) (2022-01-11)


### Bug Fixes

* **`useLocalStorage`, `useSessionStorage`:** replace hook with noop in case of storage absence. ([#540](https://github.com/react-hookz/web/issues/540)) ([790b302](https://github.com/react-hookz/web/commit/790b30257a15e936f5c4d776917fc2dd6dcad931)), closes [#521](https://github.com/react-hookz/web/issues/521)

# [12.1.0](https://github.com/react-hookz/web/compare/v12.0.3...v12.1.0) (2022-01-11)


### Features

* **useMeasure,useResizeObserver:** ability yo disable observation ([#573](https://github.com/react-hookz/web/issues/573)) ([4c6f074](https://github.com/react-hookz/web/commit/4c6f074eca31604d0975a9c8de1262b2fa8bda48)), closes [#523](https://github.com/react-hookz/web/issues/523)

## [12.0.3](https://github.com/react-hookz/web/compare/v12.0.2...v12.0.3) (2021-12-23)


### Bug Fixes

* **451:** attempt to fix issue [#451](https://github.com/react-hookz/web/issues/451) ([#539](https://github.com/react-hookz/web/issues/539)) ([c2f99da](https://github.com/react-hookz/web/commit/c2f99da82b88d78488c84ad793d3e4c99b4c2141))

# [12.0.0](https://github.com/react-hookz/web/compare/v11.1.0...v12.0.0) (2021-10-01)


### Features

* exclude `@types/react` and `@types/react-dom` from deps ([bcaca2e](https://github.com/react-hookz/web/commit/bcaca2e045136033cf587348a0cf791aa9065954)), closes [#353](https://github.com/react-hookz/web/issues/353)


### BREAKING CHANGES

* `@types/react` and `@types/react-dom` are no more
presented in `dependencies`.

# [11.1.0](https://github.com/react-hookz/web/compare/v11.0.0...v11.1.0) (2021-09-28)


### Features

* new hook `useCustomCompareEffect` ([#346](https://github.com/react-hookz/web/issues/346)) ([ef4248a](https://github.com/react-hookz/web/commit/ef4248a1ea2bcac86472675d07cd9928985419f3))

# [11.0.0](https://github.com/react-hookz/web/compare/v10.1.1...v11.0.0) (2021-09-28)


### Bug Fixes

* proper links in readme that don't break in firefox ([b406dc6](https://github.com/react-hookz/web/commit/b406dc69d0ad5a08d26ab85144d056b6916b18f7))


### Features

* improve `useConditionalEffect` and remove `useConditionalUpdateEffect` ([#345](https://github.com/react-hookz/web/issues/345)) ([4474cf7](https://github.com/react-hookz/web/commit/4474cf730f9e02599eb3c2674ac3304d9f33ec93))


### BREAKING CHANGES

* `useConditionalEffect` conditions and deps arguments now switched places.

* feat(useConditionalEffect): added ability to wrap other effect hooks

* feat: remove `useConditionalUpdateEffect`
* `useConditionalUpdateEffect` removed in favor of
composition with `useConditionalEffect`.

Now you should simpy pass extra argument to achieve same functionality:
`useConditionalEffect(()=>{}, undefined, [], truthyAndArrayPredicate,
useUpdateEffect)`
* Interface `IUseConditionalEffectPredicate` renamed to
`IConditionsPredicate`

* docs: cleanup, remove `useConditionalUpdateEffect` from readme

Co-authored-by: Joe Duncko <JoeDuncko@users.noreply.github.com>

## [10.1.1](https://github.com/react-hookz/web/compare/v10.1.0...v10.1.1) (2021-09-24)


### Bug Fixes

* fix the examples of useAsync ([#344](https://github.com/react-hookz/web/issues/344)) ([ee064ec](https://github.com/react-hookz/web/commit/ee064ec21bfe1ba5570f48b4c21daff717885680))

# [10.1.0](https://github.com/react-hookz/web/compare/v10.0.0...v10.1.0) (2021-09-23)


### Features

* new hook `useAsyncAbortable` ([#340](https://github.com/react-hookz/web/issues/340)) ([5604d9c](https://github.com/react-hookz/web/commit/5604d9cd6bcf4d980af1b2281b0f9f6c51f30e04))

# [10.0.0](https://github.com/react-hookz/web/compare/v9.0.0...v10.0.0) (2021-09-23)


### Features

* **useAsync:** remove effector behaviour from hook ([#339](https://github.com/react-hookz/web/issues/339)) ([0e47ff2](https://github.com/react-hookz/web/commit/0e47ff2c540b22b503f2dba31706d0c2d3cf5fee))


### BREAKING CHANGES

* **useAsync:** `useAsync` hook now has only 2 arguments, `asyncFn` and `initialValue`
and do not execute provided function on its own.

* chore(useAsync): remove unused `IUseAsyncOptions` interface

# [9.0.0](https://github.com/react-hookz/web/compare/v8.0.0...v9.0.0) (2021-08-30)


### Documentation

* fix error on `useCookieValue` page ([#296](https://github.com/react-hookz/web/issues/296)) ([a390f10](https://github.com/react-hookz/web/commit/a390f10fb657c24c893eeaaf13e7545ae87d1bb1))


### BREAKING CHANGES

* `IAnyPermissionDescriptor` type removed in favor of
built-in `PermissionDescriptor`.

* docs(useCookieValue): example been using old index import

# [8.0.0](https://github.com/react-hookz/web/compare/v7.0.0...v8.0.0) (2021-08-30)


### chore

* **TS:** migrate to TypeScript 4.4 ([#295](https://github.com/react-hookz/web/issues/295)) ([91429f4](https://github.com/react-hookz/web/commit/91429f4723c370c32abc1bb4b6cf4ba72f3918ea))


### BREAKING CHANGES

* **TS:** `IAnyPermissionDescriptor` type removed in favor of
built-in `PermissionDescriptor`.

# [7.0.0](https://github.com/react-hookz/web/compare/v6.1.0...v7.0.0) (2021-08-06)


### Bug Fixes

* **useMediaQuery:** add support for safari 13- that has obsolete `useMediaQuery` implementation ([#249](https://github.com/react-hookz/web/issues/249)) ([25c8599](https://github.com/react-hookz/web/commit/25c85991c7e3af1f474b67b3264d76b74744f768)), closes [#242](https://github.com/react-hookz/web/issues/242)


### Code Refactoring

* **useKeyboardEvent:** improve the code and change signature ([#248](https://github.com/react-hookz/web/issues/248)) ([a0e1b24](https://github.com/react-hookz/web/commit/a0e1b243f5ad899d5617ce50016902bfc775b5c2))


### BREAKING CHANGES

* **useKeyboardEvent:** hook call signature has changed.

# [6.1.0](https://github.com/react-hookz/web/compare/v6.0.1...v6.1.0) (2021-08-04)


### Features

* new hook `useKeyboardEvent` ([#240](https://github.com/react-hookz/web/issues/240)) ([8ca6713](https://github.com/react-hookz/web/commit/8ca6713123e090a92286071adf99783ef76147ac))

## [6.0.1](https://github.com/react-hookz/web/compare/v6.0.0...v6.0.1) (2021-07-25)


### Bug Fixes

* make hooks that not listed in index.ts to be built too ([c119371](https://github.com/react-hookz/web/commit/c11937193d391da32c810eae63e4a6ea87edf679))

# [6.0.0](https://github.com/react-hookz/web/compare/v5.0.0...v6.0.0) (2021-07-25)


### Bug Fixes

* remove `useCookieValue` from index ([#225](https://github.com/react-hookz/web/issues/225)) ([c3b708d](https://github.com/react-hookz/web/commit/c3b708d5b08680b36884e926aec62fed30062aed))


### BREAKING CHANGES

* `useCookieValue` is no more exported from index file.

# [5.0.0](https://github.com/react-hookz/web/compare/v4.0.0...v5.0.0) (2021-07-20)


### Bug Fixes

* improve `useThrottledCallback` and `useDebouncedCallback` types ([04e965a](https://github.com/react-hookz/web/commit/04e965a520a60fbd3d12e4de16ddc57c4d990112))


### BREAKING CHANGES

* types changed, now only one generic argument received
by `useThrottledCallback` and `useDebouncedCallback` - the original
function type.

# [4.0.0](https://github.com/react-hookz/web/compare/v3.8.0...v4.0.0) (2021-07-16)


### Features

* deps for `useConditionalUpdateEffect` and `useConditionalEffect` ([#201](https://github.com/react-hookz/web/issues/201)) ([bd56af3](https://github.com/react-hookz/web/commit/bd56af3c775123450867931aa07a33eaf08415e7))


### BREAKING CHANGES

* `useConditionalUpdateEffect` and `useConditionalEffect`
now has changed call signature (new argument).

# [3.8.0](https://github.com/react-hookz/web/compare/v3.7.0...v3.8.0) (2021-07-03)


### Features

* new hook useIntersectionObserver ([#170](https://github.com/react-hookz/web/issues/170)) ([e97c163](https://github.com/react-hookz/web/commit/e97c16317b8113d957a7eb8fd6856c405956cb67))

# [3.7.0](https://github.com/react-hookz/web/compare/v3.6.0...v3.7.0) (2021-07-03)


### Features

* improve `useEventListener` ([#169](https://github.com/react-hookz/web/issues/169)) ([d016ea9](https://github.com/react-hookz/web/commit/d016ea9f0d1ab42712695e886c2b3794fdb629de))

# [3.6.0](https://github.com/react-hookz/web/compare/v3.5.0...v3.6.0) (2021-07-03)


### Features

* improve `useResizeObserver` ([#168](https://github.com/react-hookz/web/issues/168)) ([f6fa33a](https://github.com/react-hookz/web/commit/f6fa33a7d135f85a75c5e12bb9b0cc8a4d412fb1))

# [3.5.0](https://github.com/react-hookz/web/compare/v3.4.0...v3.5.0) (2021-06-24)


### Features

* new hook `useMap` ([#155](https://github.com/react-hookz/web/issues/155)) ([523dd81](https://github.com/react-hookz/web/commit/523dd818b2a99b0996654b49416b0499d27d0063))

# [3.4.0](https://github.com/react-hookz/web/compare/v3.3.0...v3.4.0) (2021-06-24)


### Features

* new hook `useClickOutside` ([#147](https://github.com/react-hookz/web/issues/147)) ([3dece07](https://github.com/react-hookz/web/commit/3dece073a5444d6f5f5acfe7c67dbff2781ce1b3))
* new hook `useSet` ([#154](https://github.com/react-hookz/web/issues/154)) ([f1d781c](https://github.com/react-hookz/web/commit/f1d781cef81b6664699d8a4d648af918117aff6d))

# [3.3.0](https://github.com/react-hookz/web/compare/v3.2.0...v3.3.0) (2021-06-22)


### Features

* new hook `useEventListener` ([#140](https://github.com/react-hookz/web/issues/140)) ([9c5dce3](https://github.com/react-hookz/web/commit/9c5dce34d04584fba9990cde76b144e2eb19818c))

# [3.2.0](https://github.com/react-hookz/web/compare/v3.1.0...v3.2.0) (2021-06-22)


### Features

* new hook `usePermission` ([#143](https://github.com/react-hookz/web/issues/143)) ([9eb06f4](https://github.com/react-hookz/web/commit/9eb06f455338b034b89d1b8137a45beac16029df))

# [3.1.0](https://github.com/react-hookz/web/compare/v3.0.1...v3.1.0) (2021-06-17)


### Features

* new hooks `useThrottledEffect` and `useThrottledState` ([#137](https://github.com/react-hookz/web/issues/137)) ([1cc6677](https://github.com/react-hookz/web/commit/1cc66777c847c166e760f47ce4526350f54217a3))

## [3.0.1](https://github.com/react-hookz/web/compare/v3.0.0...v3.0.1) (2021-06-16)


### Bug Fixes

* improve `useAsync` typings ([#135](https://github.com/react-hookz/web/issues/135)) ([73b42ff](https://github.com/react-hookz/web/commit/73b42ffd2442b56f1e2f1c98e2d2215fe966b533)), closes [#134](https://github.com/react-hookz/web/issues/134)

# [3.0.0](https://github.com/react-hookz/web/compare/v2.2.0...v3.0.0) (2021-06-16)


### Bug Fixes

* rename useThrottleCallback and useDebounceCallback ([#130](https://github.com/react-hookz/web/issues/130)) ([77f66d7](https://github.com/react-hookz/web/commit/77f66d7be8e985e19db4ca4d19b5f05efdc6019e)), closes [#129](https://github.com/react-hookz/web/issues/129)


### Features

* add `maxWait` parameter to `useDebouncedCallback` hook ([#131](https://github.com/react-hookz/web/issues/131)) ([600baa8](https://github.com/react-hookz/web/commit/600baa89831fa5d41e001612d1e2d2d256bdcc90))
* change args for `useThrottledCallback` and `useDebouncedCallback` ([#132](https://github.com/react-hookz/web/issues/132)) ([131d98e](https://github.com/react-hookz/web/commit/131d98eb254bf78084c8cf2d996e29d6ecb35bf1))
* new hooks `useDebouncedEffect` and `useDebouncedState` ([#133](https://github.com/react-hookz/web/issues/133)) ([1d164ff](https://github.com/react-hookz/web/commit/1d164ffd9226fbee919d9cc768df35208d65db2b))


### BREAKING CHANGES

* `delay` and `deps` arguments are swapped position for
`useThrottledCallback` and `useDebouncedCallback` hooks to be aligned
with `useCallback` signature.
* `useDebounceCallback` renamed to `useDebouncedCallback`
`useThrottleCallback` renamed to `useThrottledCallback`

# [2.2.0](https://github.com/react-hookz/web/compare/v2.1.0...v2.2.0) (2021-06-15)


### Features

* new hook useThrottleCallback ([#118](https://github.com/react-hookz/web/issues/118)) ([afec60b](https://github.com/react-hookz/web/commit/afec60b8ca945872ca24f86fc854abb39cddfb9e))

# [2.1.0](https://github.com/react-hookz/web/compare/v2.0.0...v2.1.0) (2021-06-14)


### Features

* import reused hooks from the index file instead of its definition ([f4bd609](https://github.com/react-hookz/web/commit/f4bd60984472c90d2a06cc8c21439f69fc490b12))

# [2.0.0](https://github.com/react-hookz/web/compare/v1.28.0...v2.0.0) (2021-06-14)


### Features

* add `initializeWithValue` option to `useCookie` hook ([#120](https://github.com/react-hookz/web/issues/120)) ([17c9543](https://github.com/react-hookz/web/commit/17c9543926bf870ddf8c2c161f987a03841fc6d2))


### BREAKING CHANGES

* `useCookie` renamed to `useCookieValue`
* `useCookieValue` default behaviour for browsers
changed to fetch cookie value on state initialisation.

SSR remains untouched, but requires implicit setting of
`initializeWithValue` option to false, to avoid hydration mismatch.

# [1.28.0](https://github.com/react-hookz/web/compare/v1.27.0...v1.28.0) (2021-06-14)


### Features

* new hook `useAsync` ([#119](https://github.com/react-hookz/web/issues/119)) ([54bbc00](https://github.com/react-hookz/web/commit/54bbc006fd606cd31ea03ad00a3903d95303783c))

# [1.27.0](https://github.com/react-hookz/web/compare/v1.26.0...v1.27.0) (2021-06-11)


### Features

* new hook `useCookie` ([#117](https://github.com/react-hookz/web/issues/117)) ([faae68b](https://github.com/react-hookz/web/commit/faae68b6826916b8b2bb5ddff3b9cccabbb9219e))

# [1.26.0](https://github.com/react-hookz/web/compare/v1.25.1...v1.26.0) (2021-06-11)


### Features

* new hook `useMediaQuery` ([#116](https://github.com/react-hookz/web/issues/116)) ([be6fff9](https://github.com/react-hookz/web/commit/be6fff9a4752b59a59e7e0f5b02aa6e05fbea62c))

## [1.25.1](https://github.com/react-hookz/web/compare/v1.25.0...v1.25.1) (2021-06-02)


### Bug Fixes

* tsconfig.build.json missconfig ([ba92152](https://github.com/react-hookz/web/commit/ba921522169d9c64495e6c5b0467eb12a355821e)), closes [#102](https://github.com/react-hookz/web/issues/102)

# [1.25.0](https://github.com/react-hookz/web/compare/v1.24.1...v1.25.0) (2021-06-02)


### Features

* new hook `useValidator` ([#101](https://github.com/react-hookz/web/issues/101)) ([8c517e0](https://github.com/react-hookz/web/commit/8c517e097ba26bccc4ffdc18dd700799b73b0dc0))

## [1.24.1](https://github.com/react-hookz/web/compare/v1.24.0...v1.24.1) (2021-06-02)


### Bug Fixes

* make `useDebounceCallback` and `useRafCallback` return proper fns ([#100](https://github.com/react-hookz/web/issues/100)) ([906d6e4](https://github.com/react-hookz/web/commit/906d6e46410a044522176168f2753781926e80d8))
* make `useDebounceCallback` and `useRafCallback` return proper fns ([#100](https://github.com/react-hookz/web/issues/100)) ([2495e53](https://github.com/react-hookz/web/commit/2495e537563462250e9ba5fc17c16f3a29e916c4))
* make `useDebounceCallback` and `useRafCallback` return proper fns ([#100](https://github.com/react-hookz/web/issues/100)) ([1dcb083](https://github.com/react-hookz/web/commit/1dcb083931f00f1b0569790a10fb2423fa9c26e3))

# [1.24.0](https://github.com/react-hookz/web/compare/v1.23.0...v1.24.0) (2021-05-26)


### Features

* `useTitle` -> `useDocumentTitle` ([24daf77](https://github.com/react-hookz/web/commit/24daf778815564185fd0c7c34c19011dea8b1e37))

# [1.23.0](https://github.com/react-hookz/web/compare/v1.22.0...v1.23.0) (2021-05-25)


### Features

* new hook `useTitle` ([#68](https://github.com/react-hookz/web/issues/68)) ([84e4cbf](https://github.com/react-hookz/web/commit/84e4cbf5d966b11a0e637937e4cc975360602f7e))

# [1.22.0](https://github.com/react-hookz/web/compare/v1.21.0...v1.22.0) (2021-05-25)


### Features

* new hook `useMeasure` ([#80](https://github.com/react-hookz/web/issues/80)) ([354efc6](https://github.com/react-hookz/web/commit/354efc61883e8ffc7aeb468b9367197c63da170c))

# [1.21.0](https://github.com/react-hookz/web/compare/v1.20.4...v1.21.0) (2021-05-25)


### Features

* new hook `useResizeObserver` ([#67](https://github.com/react-hookz/web/issues/67)) ([ccf2c26](https://github.com/react-hookz/web/commit/ccf2c268636f66194f96ef8f232a1fb46b6af056))

## [1.20.4](https://github.com/react-hookz/web/compare/v1.20.3...v1.20.4) (2021-05-24)


### Bug Fixes

* add `module` field to package.json so bundlers use proper version ([b0119ce](https://github.com/react-hookz/web/commit/b0119ce2a68af5cb2a40a224074425525bc0f73b))

## [1.20.3](https://github.com/react-hookz/web/compare/v1.20.2...v1.20.3) (2021-05-24)


### Bug Fixes

* mark package as side-effects free ([74d6f1c](https://github.com/react-hookz/web/commit/74d6f1ce4e1073171b24d69b3657131b3cd0afcc))

## [1.20.2](https://github.com/react-hookz/web/compare/v1.20.1...v1.20.2) (2021-05-24)


### Bug Fixes

* proper 'types' and 'esnext' fields values ([069ae24](https://github.com/react-hookz/web/commit/069ae249301ae4d0529d43f1e643a7d4acfa2ee9))

## [1.20.1](https://github.com/react-hookz/web/compare/v1.20.0...v1.20.1) (2021-05-20)


### Bug Fixes

* remove `types` field in package.json ([#75](https://github.com/react-hookz/web/issues/75)) ([340e7d7](https://github.com/react-hookz/web/commit/340e7d765bad760737b477c3139e55a218d2a3b0))

# [1.20.0](https://github.com/react-hookz/web/compare/v1.19.0...v1.20.0) (2021-05-18)


### Features

* new hook `useRafCallback` ([#66](https://github.com/react-hookz/web/issues/66)) ([9e2255e](https://github.com/react-hookz/web/commit/9e2255eadfb184b081ee65d70608ed0b9c60f511))

# [1.19.0](https://github.com/react-hookz/web/compare/v1.18.0...v1.19.0) (2021-05-16)


### Features

* new hooks `useLocalStorageValue` and `useSessionStorageValue` ([#43](https://github.com/react-hookz/web/issues/43)) ([f02e8ea](https://github.com/react-hookz/web/commit/f02e8ea61adffe8626d4e4b31073b24996802479))

# [1.18.0](https://github.com/react-hookz/web/compare/v1.17.0...v1.18.0) (2021-05-06)


### Features

* new hook `useSyncedRef` ([#42](https://github.com/react-hookz/web/issues/42)) ([49810a0](https://github.com/react-hookz/web/commit/49810a0d4c1e9055db8bcbc614768707837224d8))

# [1.17.0](https://github.com/react-hookz/web/compare/v1.16.0...v1.17.0) (2021-05-06)


### Features

* use stricter TS config and fix issues caused by this ([6af7867](https://github.com/react-hookz/web/commit/6af786767f4d68c64b4116eb2e92f1343100aaf8))

# [1.16.0](https://github.com/react-hookz/web/compare/v1.15.0...v1.16.0) (2021-05-06)


### Features

* new hook `useDebounceCallback` ([#40](https://github.com/react-hookz/web/issues/40)) ([8018be1](https://github.com/react-hookz/web/commit/8018be1acbcdaef69f283444c7f6b38249734c65))

# [1.15.0](https://github.com/react-hookz/web/compare/v1.14.0...v1.15.0) (2021-05-06)


### Features

* new hook `useIsomorphicLayoutEffect` ([#41](https://github.com/react-hookz/web/issues/41)) ([8e17b3c](https://github.com/react-hookz/web/commit/8e17b3c3390ece7ab39e989cfd81d80f5130d321))

# [1.14.0](https://github.com/react-hookz/web/compare/v1.13.0...v1.14.0) (2021-05-03)


### Features

* new hook, useNetworkState ([#35](https://github.com/react-hookz/web/issues/35)) ([b5b082c](https://github.com/react-hookz/web/commit/b5b082cc67820fcf87f6fd529bf5cbaad91d9aff))

# [1.13.0](https://github.com/react-hookz/web/compare/v1.12.0...v1.13.0) (2021-05-02)


### Features

* make stateful hooks use `useSafeState` ([d181c7f](https://github.com/react-hookz/web/commit/d181c7f56c5abab1c6e2b7064425a10bec668062))

# [1.12.0](https://github.com/react-hookz/web/compare/v1.11.0...v1.12.0) (2021-05-01)


### Features

* new hook useMediatedState ([#32](https://github.com/react-hookz/web/issues/32)) ([9c99e61](https://github.com/react-hookz/web/commit/9c99e61bdcb6abf6f285d676d24de74cd5048c17))

# [1.11.0](https://github.com/react-hookz/web/compare/v1.10.0...v1.11.0) (2021-04-30)


### Features

* new hook `useSafeState` ([#31](https://github.com/react-hookz/web/issues/31)) ([0718afe](https://github.com/react-hookz/web/commit/0718afe1569d2b900147bc9756ba3fba0a1bdde5))

# [1.10.0](https://github.com/react-hookz/web/compare/v1.9.1...v1.10.0) (2021-04-28)


### Features

* new hooks, useConditionalEffect and useConditionalUpdateEffect ([#26](https://github.com/react-hookz/web/issues/26)) ([eb7f0a5](https://github.com/react-hookz/web/commit/eb7f0a525d00e9b66955177599a4a77ae1647867))

## [1.9.1](https://github.com/react-hookz/web/compare/v1.9.0...v1.9.1) (2021-04-28)


### Bug Fixes

* default useUnmountEffect example to false ([#27](https://github.com/react-hookz/web/issues/27)) ([2ed0aa3](https://github.com/react-hookz/web/commit/2ed0aa382f2e6f597192ad323b1ba24121b10ab2))

# [1.9.0](https://github.com/react-hookz/web/compare/v1.8.0...v1.9.0) (2021-04-28)


### Features

* new hook useIsMounted ([#24](https://github.com/react-hookz/web/issues/24)) ([7ad0d7e](https://github.com/react-hookz/web/commit/7ad0d7ed044463ef82987c44ae72f34ec4cd717a))

# [1.8.0](https://github.com/react-hookz/web/compare/v1.7.5...v1.8.0) (2021-04-28)


### Features

* new hook usePrevious ([#25](https://github.com/react-hookz/web/issues/25)) ([132032a](https://github.com/react-hookz/web/commit/132032a6193a71e793f320233774d46d9613bc36))

## [1.7.5](https://github.com/react-hookz/web/compare/v1.7.4...v1.7.5) (2021-04-28)


### Bug Fixes

* rollback husky version and add it to dependabot ignore ([099ea5b](https://github.com/react-hookz/web/commit/099ea5bb95208951e98ea6c894ce135a7b149668))

## [1.7.4](https://github.com/react-hookz/web/compare/v1.7.3...v1.7.4) (2021-04-25)


### Bug Fixes

* lint issues auto-fix with ESLint ([9f9e53e](https://github.com/react-hookz/web/commit/9f9e53edb87065b9a2bbbc2d851d9f5d1ed67aa3))

## [1.7.3](https://github.com/react-hookz/web/compare/v1.7.2...v1.7.3) (2021-04-24)

### Bug Fixes

* better not to split declarations from files ([c6a2d92](https://github.com/react-hookz/web/commit/c6a2d9210e7886f490973994da12c3bb88c09020))
* lint issues auto-fix with ESLint ([63bf8e2](https://github.com/react-hookz/web/commit/63bf8e26878a705e632c185f3bf6a2232633be19))

## [1.7.2](https://github.com/react-hookz/web/compare/v1.7.1...v1.7.2) (2021-04-24)

### Bug Fixes

* lint issues auto-fix with ESLint ([11b9a07](https://github.com/react-hookz/web/commit/11b9a07fe6f23a305a0581d0e05bf93f55ca53a2))
* replace husky v6 with husky v4 as v5+ ruins CI lint autofix ([a50955a](https://github.com/react-hookz/web/commit/a50955a44d9fe0d7a90cc481f7d0f2855f708d9a))

## [1.7.1](https://github.com/react-hookz/web/compare/v1.7.0...v1.7.1) (2021-04-23)

### Bug Fixes

* add ci yarn caching layer ([5aa8ae1](https://github.com/react-hookz/web/commit/5aa8ae199e72a88d17809cf5cc5023c7344ed025))

# [1.7.0](https://github.com/react-hookz/web/compare/v1.6.2...v1.7.0) (2021-04-23)

### Bug Fixes

* add `md` and `mdx` files to lint-staged hook glob ([d1d3d72](https://github.com/react-hookz/web/commit/d1d3d7200313c023f874e74720f9d787a9321d78))
* add readme clarification about different lang level usages ([0632992](https://github.com/react-hookz/web/commit/0632992a39f18e99ca4bd9929d6bdcdb236e9182))
* exclude new distributed directories from eslint and tsconfig ([058960e](https://github.com/react-hookz/web/commit/058960e9eb60893ce94504a3aac68d4ec1e131a4))

### Features

* package now has /cjs, /esm, /esnext distibuted versions ([4911c9d](https://github.com/react-hookz/web/commit/4911c9d3c0813bff5e52ae98cfc4dfc542996a0b))

# [1.7.0](https://github.com/react-hookz/web/compare/v1.6.2...v1.7.0) (2021-04-23)

### Features

* package now has /cjs, /esm, /esnext distibuted versions ([4911c9d](https://github.com/react-hookz/web/commit/4911c9d3c0813bff5e52ae98cfc4dfc542996a0b))

## [1.6.2](https://github.com/react-hookz/web/compare/v1.6.1...v1.6.2) (2021-04-22)

### Bug Fixes

* add hook link to README.md ([368f1d9](https://github.com/react-hookz/web/commit/368f1d9b595eec113cadffa217ef01041a6a4c72))

# [1.7.0](https://github.com/react-hookz/web/compare/v1.6.1...v1.7.0) (2021-04-22)

### Features

* add storybook docs with deploy to gh-pages ([84de312](https://github.com/react-hookz/web/commit/84de312a607f202c8957ae3f6d32c453cffe134a))

## [1.6.1](https://github.com/react-hookz/web/compare/v1.6.0...v1.6.1) (2021-04-21)

### Bug Fixes

* useUnmountEffect and useMountEffect typings fix ([32ec0c7](https://github.com/react-hookz/web/commit/32ec0c7f7b63c8d8941b95f5f8e5c369e5e87f1a))

# [1.6.0](https://github.com/react-hookz/web/compare/v1.5.0...v1.6.0) (2021-04-21)

### Features

* useToggle hook ([#3](https://github.com/react-hookz/web/issues/3)) ([3a51779](https://github.com/react-hookz/web/commit/3a51779e21c83c51994a3da59aaf88d729ecc43f))

# [1.5.0](https://github.com/react-hookz/web/compare/v1.4.3...v1.5.0) (2021-04-21)

### Features

* make tests import hooks from the index ([3210650](https://github.com/react-hookz/web/commit/3210650220f6e685d91bb7921c725596199eec84))

## [1.4.3](https://github.com/react-hookz/web/compare/v1.4.2...v1.4.3) (2021-04-21)

### Bug Fixes

* dist package returned to bundle ([e92bd18](https://github.com/react-hookz/web/commit/e92bd18a2feafe9ae1770b992d723d31027c72d9))

## [1.4.2](https://github.com/react-hookz/web/compare/v1.4.1...v1.4.2) (2021-04-18)

### Bug Fixes

* add @semantic-release/github plugin ([9f7e1b3](https://github.com/react-hookz/web/commit/9f7e1b3a441674c03ab29af3682f9619fc668806))

## [1.4.1](https://github.com/react-hookz/web/compare/v1.4.0...v1.4.1) (2021-04-16)

### Bug Fixes

* add types field to package json and tweak build ([8d64b9a](https://github.com/react-hookz/web/commit/8d64b9a1e240df938f177f565c0427b9bedfe934))

# [1.4.0](https://github.com/react-hookz/web/compare/v1.3.0...v1.4.0) (2021-04-16)

### Features

* add main file and reexport new hooks ([e2ea1cb](https://github.com/react-hookz/web/commit/e2ea1cbf6b5de909945fadde15eafd5ab70cea9f))

# [1.3.0](https://github.com/react-hookz/web/compare/v1.2.3...v1.3.0) (2021-04-16)

### Features

* useUpdateEffect hook ([bc3a655](https://github.com/react-hookz/web/commit/bc3a655f5cbfe3b4edb94c6084f62e95806ea6de))

## [1.2.3](https://github.com/react-hookz/web/compare/v1.2.2...v1.2.3) (2021-04-16)

### Bug Fixes

* properly name useMountEffect and useUnmountEffect parameter ([5218bfc](https://github.com/react-hookz/web/commit/5218bfcc359b34fe61a46a635c41fb093182a56e))

## [1.2.2](https://github.com/react-hookz/web/compare/v1.2.1...v1.2.2) (2021-04-15)

### Bug Fixes

* attempt to make codecov push only occur on release publish ([ac5c221](https://github.com/react-hookz/web/commit/ac5c221659ce8173268c88d9da385411a07009f3))

## [1.2.1](https://github.com/react-hookz/web/compare/v1.2.0...v1.2.1) (2021-04-15)

### Bug Fixes

* codecov push should only occur on release publish ([2a9e024](https://github.com/react-hookz/web/commit/2a9e0249d83bd7df2b126ad62e5b3aee3ca8dfbc))

# [1.2.0](https://github.com/react-hookz/web/compare/v1.1.0...v1.2.0) (2021-04-15)

### Features

* add codecov coverage reporting ([3254871](https://github.com/react-hookz/web/commit/325487121b3fb8a27ab129e31a0cec3bcf7cce1f))

# [1.1.0](https://github.com/react-hookz/web/compare/v1.0.0...v1.1.0) (2021-04-15)

### Features

* implement useMountEffect and useUnmountEffect hooks ([98ec434](https://github.com/react-hookz/web/commit/98ec434d3b9b9e56ebb92ce4bf047a2ef9d19c8f))

# 1.0.0 (2021-04-14)

### Features

* add .npmignore and filler .gitignore files. ([e12375f](https://github.com/react-hookz/web/commit/e12375f2d489938e85dd7abb0fac4dae6d5be7fa))
* add CI workflow and dependabot config. ([7e365cf](https://github.com/react-hookz/web/commit/7e365cfe16fe1f7ce6c4a5792f7f490890dc14b5))
* add semantic release dep. ([4e39fa3](https://github.com/react-hookz/web/commit/4e39fa3ee5de0d7a1712601985567320a44b04c6))
* configure basic builds. ([34aafe4](https://github.com/react-hookz/web/commit/34aafe4d67ea2c27b2a321df8fed15b7e2d50bab))
* improve ci config and set initial version to 0.0.1 ([adf4dca](https://github.com/react-hookz/web/commit/adf4dca9cbd4e76ffed71fddc05d4875cb67365c))
* introduce useFirstMountState ([bd7123b](https://github.com/react-hookz/web/commit/bd7123b08dd1dd4d25ce8ae1765bfde19368a7fe))

# 1.0.0 (2021-04-14)

### Features

* add .npmignore and filler .gitignore files. ([e12375f](https://github.com/react-hookz/web/commit/e12375f2d489938e85dd7abb0fac4dae6d5be7fa))
* add CI workflow and dependabot config. ([7e365cf](https://github.com/react-hookz/web/commit/7e365cfe16fe1f7ce6c4a5792f7f490890dc14b5))
* add semantic release dep. ([4e39fa3](https://github.com/react-hookz/web/commit/4e39fa3ee5de0d7a1712601985567320a44b04c6))
* configure basic builds. ([34aafe4](https://github.com/react-hookz/web/commit/34aafe4d67ea2c27b2a321df8fed15b7e2d50bab))
* improve ci config and set initial version to 0.0.1 ([adf4dca](https://github.com/react-hookz/web/commit/adf4dca9cbd4e76ffed71fddc05d4875cb67365c))
* introduce useFirstMountState ([bd7123b](https://github.com/react-hookz/web/commit/bd7123b08dd1dd4d25ce8ae1765bfde19368a7fe))

# 1.0.0 (2021-04-12)

### Features

* add .npmignore and filler .gitignore files. ([e12375f](https://github.com/react-hookz/web/commit/e12375f2d489938e85dd7abb0fac4dae6d5be7fa))
* add CI workflow and dependabot config. ([7e365cf](https://github.com/react-hookz/web/commit/7e365cfe16fe1f7ce6c4a5792f7f490890dc14b5))
* add semantic release dep. ([4e39fa3](https://github.com/react-hookz/web/commit/4e39fa3ee5de0d7a1712601985567320a44b04c6))
* configure basic builds. ([34aafe4](https://github.com/react-hookz/web/commit/34aafe4d67ea2c27b2a321df8fed15b7e2d50bab))
* improve ci config and set initial version to 0.0.1 ([adf4dca](https://github.com/react-hookz/web/commit/adf4dca9cbd4e76ffed71fddc05d4875cb67365c))
* introduce useFirstMountState ([bd7123b](https://github.com/react-hookz/web/commit/bd7123b08dd1dd4d25ce8ae1765bfde19368a7fe))
