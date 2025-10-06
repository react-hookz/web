# Contributing

First of all, thanks for contributing to `@react-hookz`! The collective developing and using this library appreciates
your efforts.

If you are contributing for the first time, we recommend reading this
[First Contributions guide](https://github.com/firstcontributions/first-contributions) first.

## Project setup

1. Fork the main repo
2. Clone the repo to your computer (add `--depth=1` to `git clone` command to save time)
3. Change folder to the cloned repo: `cd ./web`
4. Install dependencies: `yarn`
5. Make sure everything builds and tests: `yarn build && yarn test`
6. Create a branch for your PR: `git checkout -b pr/my-awesome-hook`
   - if you are adding a new hook, name the branch based on the hook: `pr/useUpdateEffect`
   - if your change fixes an issue, name the branch based on the issue number: `pr/fix-12345`
7. Follow the directions below:

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

## Development

0. Perform self-check on hook usefulness. We're not interested in hooks that has too specific usecase or hooks that can
   be easily achieved by composition of existing hooks.
1. Implement the hook in the `src` folder.
   - The file with hook implementation should be named `index.ts` and placed in a subdirectory named after the hook.
   - The hook should have return types explicitly defined.
   - The hook should have a JSDoc comment containing a description of the hook and an overview of its arguments.
   - The hook should be exported by name, not default-exported.
   - If the hook has custom types in its parameters or return values, they should be exported as well.
   - Types and interfaces should not have prefixes like `I` or `T`.
   - The hook should be developed with SSR in mind, meaning that usage of hook in SSR environment should not lead to
     errors.
   - If your hook reuses other @react-hookz/web hooks, import them as `import { useToggle } from '../useToggle';`
     instead of `import { useToggle } from '..';`
2. Re-export the hook implementation and all its custom types in `src/index.ts`.
3. Fully test your hook. The tests should include tests for both DOM and SSR environments.
   - Hook's tests should be placed in `__tests__` subdirectory, next to the source file - `dom.ts` for DOM environment,
     `ssr.ts` for SSR environment.  
     For example: `src/useFirstMountState/__tests__/dom.ts` and `src/useFirstMountState/__tests__/ssr.ts`.
   - Ideally, your hook should have 100% test coverage. If that is impossible, you should leave a comment in the code
     describing why.
   - Each hook should have at least `'should be defined'` and `'should render'` tests in `SSR` environment.
   - All utility functions should also be tested.
4. Write docs for your hook.
   - Docs should be placed in `__docs__` sub-folder, near the source file.  
     For example: `src/useFirstMountState/__docs__/story.mdx`.
   - Docs are built with Storybook. You can run `yarn storybook:watch` to preview your work.
   - Write a short example demonstrating your hook in `example.stories.tsx` within the `__docs__` folder. (If the
     filename misses the `.stories.tsx` part, Storybook won't find your example.)  
     For example: `src/useFirstMountState/__docs__/example.stories.tsx`.
   - Docs are written in MDX format.  
     [Read more about storybook docs](https://storybook.js.org/docs/react/writing-docs/introduction).
5. Add a summary of the hook and a link to the docs to `README.md`.
6. After all the above steps are done, run `yarn lint:fix` to ensure that everything is styled by our standards and
   there are no linting issues.
7. `yarn new-hook myAwesomeHook` will help you to create a proper file structure for the new hook.

### Notes on porting a hook from `react-use`

- Check from #33 and the [migration guide](src/__docs__/migrating-from-react-use.story.mdx) that the hook has been
  approved for porting. If there is no previous discussion on the hook in #33, leave a comment there asking if you could
  port the hook. In your comment, provide a valid use-case for the hook.
- Don't just copy-paste the hook. Think through the code:
  - Is there sufficient tests?
  - Could the hook be implemented by reusing existing hooks in `@react-hookz/web`?
  - Is the documentation exhaustive?
  - Is the example useful?

## Committing

### Commit message

This repo uses [semantic-release](https://github.com/semantic-release/semantic-release) and
[conventional commit messages](https://conventionalcommits.org) so prefix your commits with `fix:`, `feat:`, etc., so
that your changes appear in the [release notes](https://github.com/react-hookz/web/blob/master/CHANGELOG.md).

Also, there is a script that helps you to properly format commit messages:

```shell
git add .
yarn commit
```

The script guides you through several prompts that help you with writing a good commit message, including many
non-obvious and easy-to-forget parts.

### Git hooks

This project includes Git hooks that are automatically enabled when you install the dependencies. These hooks
automatically test and validate your code and commit messages before each commit. In most cases disabling these hooks is
not recommended.
