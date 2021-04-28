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

As hooks was introduced to the world in React 16.8, `@react-hookz/web` requires - you gessed
it - `react` and `react-dom` 16.8+.  
Also, as React does not support IE, `@react-hookz/web` does not do so either. You'll have to
transpile your `node-modules` in order to run in IE.

## Usage

This package provides three levels of compilation:

1. **Main**, the `/cjs` folder — CommonJS modules, with ES5 lang level.
2. **ESM**, the `/esm` folder — it is ES modules, with ES5 lang level.
3. **ESNext**, the `/esnext` folder — it is ES modules, with ESNext lang level.

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

- #### Lifecycle
  - [`useFirstMountState`](https://react-hookz.github.io/web/?path=/docs/lifecycle-usefirstmountstate)
    — Return boolean that is `true` only on first render.
  - [`useMountEffect`](https://react-hookz.github.io/web/?path=/docs/lifecycle-usemounteffect)
    — Run effect only when component is first mounted.
  - [`useRerender`](https://react-hookz.github.io/web/?path=/docs/lifecycle-usererender)
    — Return callback that re-renders component.
  - [`useUnmountEffect`](https://react-hookz.github.io/web/?path=/docs/lifecycle-useunmounteffect)
    — Run effect only when component is unmounted.
  - [`useUpdateEffect`](https://react-hookz.github.io/web/?path=/docs/lifecycle-useupdateeffect)
    — Effect hook that ignores the first render (not invoked on mount).
- #### State
  - [`useToggle`](https://react-hookz.github.io/web/?path=/docs/lifecycle-usetoggle)
    — Like `useState`, but can only become `true` or `false`.
  - [`usePrevious`](https://react-hookz.github.io/web/?path=/docs/lifecycle-useprevious)
    — Returns the value passed to the hook on previous render.
