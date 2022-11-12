# Contributing

First of all, thanks for contributing to `@react-hookz`! The collective developing and
using this library appreciates your efforts.

If you are contributing for the first time, we recommend reading this
[First Contributions guide](https://github.com/firstcontributions/first-contributions) first.

## Project setup

1. Fork the main repo
2. Clone the repo to your computer (add `--depth=1` to `git clone` command to save time)
3. Change folder to the just cloned repo: `cd ./web`
4. Install dependencies: `yarn`
5. Make sure everything builds and tests: `yarn build && yarn test`
6. Create a branch for your PR: `git checkout -b pr/my-awesome-hook`
   - if you are adding a new hook, name the branch based on the hook: `pr/useUpdateEffect`
   - if your change fixes an issue, name the branch based on the issue ID: `pr/fix-12345`
7. Follow the directions below:

> **Tip:** to keep your `master` branch pointing to the original repo's `master` (instead of your
> fork's `master`) do this:
>
> ```shell
> git remote add upstream https://github.com/react-hookz/web.git
> git fetch upstream
> git branch --set-upstream-to=upstream/master master
> ```
>
> After running these commands you'll be able to easily pull changes from the original repository with
> `git pull`.

## Development

1. Implement the hook in the `src` folder.
   - The file should be named after the hook and placed in a subdirectory also named after the hook.
   - The hook should have return types explicitly defined.
   - The hook should have a JSDoc comment containing a description of the hook and an overview of its arguments.
   - The hook should be exported by name, not default exported.
   - If the hook has custom types in its parameters or return values, they should be exported as well.
   - Types and interfaces should not have prefixes like `I` or `T` (currently some types like this
     still exists for compatibility reasons, but they will be removed in the future).
   - The hook should be developed with SSR in mind.
   - If the hook is stateful and exposes `setState` method, or is has async callbacks (that can
     theoretically be resolved after component unmount), it should use `useSafeState` instead of
     `useState`.
   - If you reuse hooks from this library, import them as `import { useSafeState } from '../useSafeState/useSafeState';` instead of
     `import { useSafeState } from '..';`
2. Re-export the hook implementation and all its custom types in `src/index.ts`.
3. Fully test your hook. The tests should include tests for both DOM and SSR environments.
   - Hook's tests should be placed in `__tests__` subdirectory, next to the source file - `dom.ts` for DOM
     environment, `ssr.ts` for SSR environment.
     For example: `src/useFirstMountState/__tests__/dom.ts` and `src/useFirstMountState/__tests__/ssr.ts`.
   - Ideally, your hook should have 100% test coverage. If that is impossible, you should leave a comment
     in the code describing why.
   - Each hook should have at least 'should be defined' and 'should render' tests in `SSR`
     environment.
   - All utility functions should also be tested.
4. Write docs for your hook.
   - Docs should be placed in `__docs__` sub-folder, near the source file.  
     For example: `src/useFirstMountState/__docs__/story.mdx`.
   - Docs are built with Storybook. You can run `yarn storybook:watch` to preview your work.
   - Write a short example demonstrating your hook in `example.stories.tsx` within the `__docs__` folder.
     (If the filename misses the `.stories.tsx` part, Storybook can't find your example.)
     For example: `src/useFirstMountState/__docs__/example.stories.tsx`.
   - Docs are written in MDX format.
     [Read more about storybook docs](https://storybook.js.org/docs/react/writing-docs/introduction).
5. Add a summary of the hook and a link to the docs to `README.md`.
6. After all the above steps are done, run `yarn lint:fix` to ensure that everything is styled by our
   standards.
7. Command `yarn new-hook myAwesomeHook` will help you to create a proper file structure for the new hook.

## Committing

### Commit message

This repo uses [semantic-release](https://github.com/semantic-release/semantic-release) and
[conventional commit messages](https://conventionalcommits.org) so prefix your commits with `fix:`,
`feat:`, etc., if you want your changes to appear in the
[release notes](https://github.com/react-hookz/web/blob/master/CHANGELOG.md).

Also, there is a script that helps you to properly format commit messages:

```shell
git add .
yarn commit
```

The script guides you through several prompts that help you with writing a good commit message,
including many non-obvious and easy-to-forget parts.

### Git hooks

This project includes Git hooks that are automatically enabled when you install the dependencies.
These hooks automatically test and validate your code and commit messages before each commit. In
most cases disabling these hooks is not recommended.
