# ![@react-hookz/web](.github/logo.png)

React hooks done right, for browser and SSR.

[![NPM Version](https://flat.badgen.net/npm/v/@react-hookz/web)](https://www.npmjs.com/package/@react-hookz/web)
[![NPM Downloads](https://flat.badgen.net/npm/dm/@react-hookz/web)](https://www.npmjs.com/package/@react-hookz/web)
[![NPM Dependents](https://flat.badgen.net/npm/dependents/@react-hookz/web)](https://www.npmjs.com/package/@react-hookz/web)
[![Build](https://img.shields.io/github/workflow/status/react-hookz/web/CI?style=flat-square)](https://github.com/react-hookz/web/actions)
[![Coverage](https://flat.badgen.net/codecov/c/github/react-hookz/web)](https://app.codecov.io/gh/react-hookz/web)

`@react-hookz/web` is a library of general-purpose React hooks built with care and SSR compatibility
in mind.

This package provides three levels of compilation:

1. **Main**, the `/cjs` folder — CommonJS modules, with ES5 lang level.
2. **ESM**, the `/esm` folder — it is ES modules, with ES5 lang level.
3. **ESNext**, the `/esnext` folder — it is ES modules, with ESNext lang level.

- #### Lifecycle hooks
  - [`useFirstMountState`](https://react-hookz.github.io/web/?path=/docs/lifecycle-usefirstmountstate)
    — Return boolean that is `true` only on first render.
  - [`useUpdateEffect`](https://react-hookz.github.io/web/?path=/docs/lifecycle-useupdateeffect)
    — Effect hook that ignores the first render (not invoked on mount).
