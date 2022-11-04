# Contributing

First of all, thanks for being willing to contribute to `@react-hookz`, the collective creating and
using this library appreciates that.

If you are contributing for the first time - we would recommend reading
[First Contributions](https://github.com/firstcontributions/first-contributions) guide first.

## Project setup

1. Fork the main repo
2. Clone repo to your computer (add `--depth=1` to `git clone` command to save time)
3. Change folder to just cloned repo: `cd ./web`
4. Install dependencies: `yarn`
5. Make sure everything builds and tests: `yarn build && yarn test`
6. Create the branch for your PR, like: `git checkout -b pr/my-awesome-hook`
   - in case you are adding a new hook - it is better to name your branch by the hook:
     `pr/useUpdateEffect`
   - in case your change fixes an issue - it is better to name branch by the issue id:
     `pr/fix-12345`
7. Follow the directions below

> **Tip:** to keep your `master` branch pointing at the original repo's `master` (instead of your
> fork's `master`) do this:
>
> ```shell
> git remote add upstream https://github.com/react-hookz/web.git
> git fetch upstream
> git branch --set-upstream-to=upstream/master master
> ```
>
> After running these commands you'll be able to easily pull changes from the original repository by
> `git pull`.

## Development

1. Implement the hook in `src` folder.
   - File should be named after the hook and placed in subdirectory also named after the hook.
   - Hook should have return types explicitly defined.
   - Hook should have JSDoc containing hook description and an overview of its arguments.
   - Hook should be exported by name, not default exported.
   - In case hook has some custom types as arguments or return values - it should also be exported.
   - Types and interfaces should not have prefixes like `I` or `T` (it is only left in existing code
     for compatibility reasons and will be removed).
   - Hook should be developed with SSR in mind.
   - In case hook is stateful and exposes `setState` method, or is has async callbacks (that can
     theoretically be resolved after component unmount), it should use `useSafeState` instead of
     `useState`.
   - In case of hooks reuse, import them as `import { useSafeState } from '../useSafeState/useSafeState';` instead of
     `import { useSafeState } from '..';`
2. Reexport hook implementation and all custom types in `src/index.ts`.
   - Custom types should be also reexported.
3. Write complete tests for your hook, tests should consist of both DOM and SSR parts.
   - Hook's test should be placed in `__tests__` sub-folder, near the source file, `dom.ts` for DOM
     environment, `ssr.ts` for SSR environment.  
     4ex: `src/useFirstMountState/__tests__/dom.ts` and `src/useFirstMountState/__tests__/ssr.ts`.
   - Ideally your hook should have 100% test coverage. For cases where that is impossible, you
     should comment above the code exactly why it is impossible to have 100% coverage.
   - Each hook should have at least 'should be defined' and 'should render' tests in `SSR`
     environment.
   - All utility functions should also be tested.
4. Write docs for your hook.
   - Docs should be placed in `__docs__` sub-folder, near the source file.  
     4ex: `src/useFirstMountState/__docs__/story.mdx`.
   - Docs are built with storybook, to help you during writing docs - start webserver with
     `yarn storybook:watch`.
   - Components representing hook functionality should be placed in `example.stories.tsx` within
     `__docs__` folder. In case file name will be missing `.stories.tsx` part - code preview won't
     work.  
     4ex: `src/useFirstMountState/__docs__/example.stories.tsx`.
   - Preferred format to write the docs is MDX.
     [Read more about storybook docs](https://storybook.js.org/docs/react/writing-docs/introduction).
5. Add docs link and hook summary to the `README.md`.
6. After all above steps are done - run `yarn lint:fix` and ensure that everything is styled by our
   standards.
7. Command `yarn new-hook myAwesomeHook` will help you create proper file structure for new hook.

## Committing

### Commit message

This repo uses [semantic-release](https://github.com/semantic-release/semantic-release) and
[conventional commit messages](https://conventionalcommits.org) so prefix your commits with `fix:`,
`feat:`, etc., if you want your changes to appear in
[release notes](https://github.com/react-hookz/web/blob/master/CHANGELOG.md).

Also, there is a script that helps to properly format commit message:

```shell
git add .
yarn commit
```

It will guide you through several prompts that will ease filling non-obvious and easy-to-forget
parts.

### Git hooks

There are git hooks set up with this project that are automatically enabled when you install
dependencies. These hooks automatically test and validate your code and commit message. In most
cases disabling these hooks is not recommended.
