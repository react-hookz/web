---
paths:
  - "**/*.js"
  - "**/*.jsx"
  - "**/*.mjs"
  - "**/*.cjs"
  - "**/*.ts"
  - "**/*.tsx"
  - "**/*.mts"
  - "**/*.cts"
---

# JavaScript Conventions

Clarity is the highest virtue — if control flow needs a comment, rewrite it. Prefer boring patterns over clever
tricks. If existing code contradicts a rule below, follow the code and flag the divergence. For TypeScript files these
rules are the base layer; [typescript.md](typescript.md) stacks on top.

## Declarations & Naming

- `const` by default, `let` only when reassigned, never `var`. One declaration per line; `const` group before `let`.
  `const` prevents reassignment, not mutation.
- camelCase for variables/functions, PascalCase for classes, `#private` class fields (not `_` convention),
  `is`/`has`/`can`/`should` prefixes for booleans, kebab-case file names.
- SCREAMING_SNAKE_CASE only for true compile-time constants — a variable holding a computed value is camelCase.
- Descriptive names; short names (`i`, `x`) only in tiny scopes. Accepted abbreviations: `url`, `id`, `err`, `ctx`,
  `req`, `res` — avoid others. No redundant context (`car.make`, not `car.carMake`). Same word for the same concept
  across the codebase.

## Equality & Safety

- Always `===`/`!==`; the only valid `==` is `value == null` (catches both `null` and `undefined`).
- `??` over `||` for defaults — `||` swallows `0`, `""`, `false`.
- `?.` sparingly: data you expect to exist should throw, not silently yield `undefined`.
- Falsy values: `false`, `0`, `-0`, `0n`, `""`, `null`, `undefined`, `NaN` — everything else is truthy, including
  `[]`, `{}`, `"0"`.
- Ternaries: one-liner or one-branch-per-line only; anything else becomes `if`/`else` or early return. Nested
  ternaries are banned — no exceptions.

## Syntax

- Template literals only when interpolating; plain quotes otherwise.
- Spread for copies (`{ ...obj }`, `[...arr]`), never `Object.assign`. Shorthand properties, grouped at the top of
  the literal. Computed keys `{ [key]: value }`. Logical assignment: `opts.timeout ??= 5000`.

## Functions

- Arrows for callbacks/anonymous functions; function declarations when hoisting or `this` binding is needed.
  Parentheses around single arrow params. Never arrows as object methods or on prototypes (lexical `this`).
- Destructured options object for 3+ parameters. Default parameters over `||`/manual checks. Rest params over
  `arguments`.
- Early return, guard clauses first, happy path flat. One function, one job — a name containing "and" means split.
  Keep under ~30 lines; extract helpers.
- Prefer pure functions; isolate side effects (DOM, network, logging) — don't hide them inside data transformations.
- Closures retain references, not copies — beware large objects captured unintentionally.

## Async

- `async`/`await` over `.then()` chains. Always `await` promises — a floating promise is a silent failure.
  Fire-and-forget must attach `.catch(reportError)`.
- `return await` only inside `try` where you catch the error; otherwise return the promise directly.
- Parallel independent work: `Promise.all`; all results regardless of failure: `Promise.allSettled`; timeout:
  `Promise.race`; fallback: `Promise.any`. No sequential awaits in loops — `Promise.all(items.map(...))`, or a
  concurrency limiter (`p-map`) for large arrays.
- Throw `Error` objects, never strings. Custom error classes (extend `Error`, set `name`, add context) when callers
  must distinguish.
- Never swallow errors — every `catch` handles, rethrows, or reports; `console.log(err)` is not handling. Let errors
  propagate to a top-level handler; don't wrap every `await` in `try`/`catch`.
- `new Promise()` only to wrap callback APIs. `AbortController`/`{ signal }` for cancellation. `for await...of` for
  async iterables.

## Modules

- ES modules only; CommonJS is legacy. Named exports over default (exceptions: framework-required conventions).
  Never export mutable `let` — export accessor functions.
- Imports at top, grouped with blank lines: built-in (`node:fs`), external, internal. Merge imports from the same
  module. Namespace import (`import * as x`) at 5+ items, named below that.
- Include file extensions in relative import paths (`"./user.js"`); no directory imports resolving to `index.js`.
- No barrel files in subdirectories — acceptable only as a package entry point enforced via `package.json` `exports`.
  No wildcard re-exports. No circular dependencies — extract a third module or inject.
- Dynamic `import()` for code splitting: routes, large conditional deps, feature flags. One concern per module.
  Side-effect imports are rare and documented.

## Objects, Arrays, Classes

- Literals (`{}`, `[]`), never constructors. Method shorthand. Dot notation for static keys, brackets for dynamic.
  `Object.hasOwn(obj, key)` over `hasOwnProperty`.
- Functional methods (`map`/`filter`/`find`/`some`/`every`/`flatMap`/`reduce`) for transforms — always return in the
  callback; `for...of` for side-effect loops; never `for...in` on arrays.
- Don't mutate inputs — return new objects/arrays: add `[...arr, item]`, remove `arr.filter`, update `arr.map`.
  Return objects (not arrays) for multiple values. `Array.from(arrayLike)`; `Array.from(iterable, mapFn)` over
  `[...iterable].map()`.
- `Map` when keys aren't strings or are user-provided (prototype pollution); `Set` for dedup; generators for lazy
  sequences. Never extend built-in prototypes.
- ES `class` only; `#private` fields; composition over inheritance (`extends` only for true is-a); no empty
  constructors; `static` for state-free operations. Don't force classes — one method with state is a closure, one
  method without is a function.

## Docs & JSDoc

- Doc comments (`/** */`) are API documentation — the "no comments" default does not apply. Every exported function,
  class, and module-level constant gets one; `@param`/`@returns`/`@throws` for non-trivial signatures. Behavior and
  intent, not implementation. Update the doc in the same edit that changes behavior.
- Pure-JS (non-TS) code: type via JSDoc with `// @ts-check`; annotate exported boundaries, `@typedef` for shared
  shapes, skip the obvious.
