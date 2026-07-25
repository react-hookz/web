# Contributing

First of all, thanks for contributing to `@react-hookz`! The collective developing and using this library appreciates
your efforts.

If you are contributing for the first time, we recommend reading this
[First Contributions guide](https://github.com/firstcontributions/first-contributions) first.

## Project setup

1. Fork the main repo
2. Clone the repo to your computer (add `--depth=1` to `git clone` command to save time)
3. Change folder to the cloned repo: `cd ./web`
4. Enable corepack so the pinned yarn version is used: `corepack enable`
5. Install dependencies: `yarn`
6. Make sure everything passes: `yarn lint && yarn test && yarn build`
7. Create a branch for your PR: `git checkout -b pr/my-awesome-hook`
   - if you are adding a new hook, name the branch based on the hook: `pr/useUpdateEffect`
   - if your change fixes an issue, name the branch based on the issue number: `pr/fix-12345`
8. Follow the directions below:

> **Tip:** to keep your `master` branch pointing to the original repo's `master` (instead of your fork's `master`) do
> this:
>
> ```shell
> git remote add upstream https://github.com/react-hookz/web.git
> git fetch upstream
> git branch --set-upstream-to=upstream/master master
> ```
>
> After running these commands you'll be able to easily pull changes from the original repository with `git pull`.

## Toolchain

The repo runs on [Vite+](https://vite.plus): `vp` handles formatting, linting and tests, all configured in
`vite.config.ts`. The build is plain `tsc` with the TypeScript 7 native compiler. Use the package scripts — they are
what CI runs:

| Script           | What it does                                                          |
| ---------------- | --------------------------------------------------------------------- |
| `yarn fmt`       | format sources with oxfmt (`yarn fmt:check` verifies without writing) |
| `yarn lint`      | oxlint with type-aware rules; also reports TypeScript errors          |
| `yarn lint:fix`  | the same, applying autofixes                                          |
| `yarn typecheck` | `tsc --noEmit` on its own                                             |
| `yarn test`      | full test suite (`yarn test:coverage` adds coverage)                  |
| `yarn build`     | emit `dist` from `tsconfig.build.json`                                |

## Development

0. Perform self-check on hook usefulness. We're not interested in hooks that has too specific usecase or hooks that can
   be easily achieved by composition of existing hooks.
1. Implement the hook in the `src` folder.
   - The file with hook implementation should be named `index.ts` and placed in a subdirectory named after the hook.
   - The hook should have return types explicitly defined. The build runs with `isolatedDeclarations`, so every exported
     symbol needs an explicit type annotation — inference is not enough.
   - The hook should have a JSDoc comment containing a description of the hook and an overview of its arguments.
   - The hook should be exported by name, not default-exported.
   - If the hook has custom types in its parameters or return values, they should be exported as well.
   - Types and interfaces should not have prefixes like `I` or `T`.
   - The hook should be developed with SSR in mind, meaning that usage of hook in SSR environment should not lead to
     errors. Guard browser-only APIs with `isBrowser` from `src/util/const.ts`.
   - If your hook reuses other @react-hookz/web hooks, import them as `import {useToggle} from '../useToggle/index.js';`
     instead of `import {useToggle} from '..';`. Relative imports always carry the `.js` extension.
   - Target current browsers. Vendor-prefixed fallbacks and existence checks for standard platform methods are not
     accepted.
2. Re-export the hook implementation and all its custom types in `src/index.ts`, under the matching category comment.
3. Fully test your hook. The tests should include tests for both DOM and SSR environments.
   - Tests live next to the implementation and are split by filename: `index.dom.test.ts` runs in jsdom,
     `index.ssr.test.ts` runs in node.  
     For example: `src/useFirstMountState/index.dom.test.ts` and `src/useFirstMountState/index.ssr.test.ts`.
   - Ideally, your hook should have 100% test coverage. If that is impossible, you should leave a comment in the code
     describing why.
   - Each hook should have at least `'should be defined'` and `'should render'` tests in `SSR` environment.
   - Read hook output through the helpers in `src/util/testing/test-helpers.ts` (`expectResultValue`, `expectCallArgs`,
     `expectCallResult`) rather than indexing renders and mock calls directly.
   - All utility functions should also be tested.
4. Document your hook.
   - The JSDoc comment on the hook is the documentation — describe behaviour and every argument.
   - Add a summary line and a link to the source to the hook list in `README.md`. A hook missing from that list is
     invisible to users.
5. Before opening the PR run `yarn fmt`, `yarn lint:fix`, `yarn test` and `yarn build`.

### Notes on porting a hook from `react-use`

- Check [#33](https://github.com/react-hookz/web/issues/33) that the hook has been approved for porting. If there is no
  previous discussion on the hook there, leave a comment asking if you could port the hook. In your comment, provide a
  valid use-case for the hook.
- Don't just copy-paste the hook. Think through the code:
  - Is there sufficient tests?
  - Could the hook be implemented by reusing existing hooks in `@react-hookz/web`?
  - Is the documentation exhaustive?
  - Is the example useful?

## Committing

This repo uses [semantic-release](https://github.com/semantic-release/semantic-release) and
[conventional commit messages](https://conventionalcommits.org), so the subject prefix decides the released version:

- `feat:` — new hook or new capability, released as a minor
- `fix:` / `perf:` — released as a patch
- `chore:`, `ci:`, `docs:`, `test:`, `style:`, `refactor:` — no release

Scope the subject to the hook when it applies: `feat(useMeasure): accept custom measurer`.

A change that breaks the public API needs both an `!` after the type and a `BREAKING CHANGE:` footer describing the
migration — the footer is what triggers the major release:

```
fix(useQueue)!: type remove as possibly empty

BREAKING CHANGE: `QueueMethods.remove` returns `T | undefined` instead of `T`.
```

Merging to `master` publishes to npm automatically, so keep commits releasable and self-contained.

## Continuous integration

Every pull request runs lint (formatting, oxlint and type checks), build, and the test suite on the current Node LTS.
Workflow runs on fork PRs need a maintainer's approval before they start.
