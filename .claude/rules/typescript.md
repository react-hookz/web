---
paths:
  - "**/*.ts"
  - "**/*.tsx"
  - "**/*.mts"
  - "**/*.cts"
---

# TypeScript Conventions

Extends [javascript.md](javascript.md). Types encode intent — let the compiler prove the rest. If you need `as` or
`any`, the types are wrong; fix the types, don't fight the checker.

## Type Safety

- `strict: true` always; also `noUncheckedIndexedAccess` and `noImplicitOverride`.
- `unknown` over `any`: external values (API responses, `JSON.parse`, user input) and pass-through parameters are
  `unknown`, narrowed with guards. `any` only for incremental JS migration or test mocks that deliberately bypass
  checking — with a comment saying why.
- No non-null assertions (`!`) without a comment explaining why the value cannot be null — prefer narrowing.
- No `as` on object literals — annotate (`: Foo`); assertions hide missing/extra property errors. `as` is justified
  only when you genuinely know more than the compiler (DOM APIs returning wide types, trusted external data). Always
  `as` syntax, never angle brackets. Double assertion goes through `unknown`, never `any`.
- Never `@ts-ignore` or `@ts-nocheck`. `@ts-expect-error` in tests only, with a comment.
- `{}` means "any non-nullish value" — almost never what you want. Opaque value: `unknown`; dict-like:
  `Record<string, unknown>`; any non-primitive: `object`.

## Annotations & Shapes

- Omit trivially inferred types (`const x = 5`). Annotate exported function signatures (params and return) and
  complex return types where inference goes opaque or wide. Annotate at declaration so errors surface where the bug
  is, not at distant call sites.
- `import type` / `export type` for type-only imports and re-exports (`verbatimModuleSyntax`).
- `interface` for object shapes; `type` for everything else (unions, intersections, tuples, functions,
  mapped/conditional). Stay consistent within a project.
- No empty interfaces, no `namespace`, no wrapper types (`String`, `Number`). Data shapes are interfaces, not
  classes.
- Nullability: optional `?` over `| undefined`; keep `| null` at the use site (`getUser(): User | null`), not baked
  into type aliases. `!= null` checks both null and undefined.

## Generics

- Constrain with `extends`, and keep constraints tight. `T` is fine for one parameter; `TKey`/`TValue`/`TItem` for
  several. Every type parameter must appear in the signature — no unused ones, no return-type-only generics (they
  can't be inferred).
- Let inference work: don't pass type arguments the compiler can infer. `NoInfer<T>` when a parameter should be
  constrained by others rather than drive inference. Defaults: `interface Container<T, U = T[]>`.
- Built-in utility types over hand-rolled equivalents: `Partial`, `Pick`, `Omit`, `Record`, `Exclude`, `Extract`,
  `ReturnType`, `Parameters`, `Awaited`. An explicit interface when the type is a distinct domain concept.
- Complexity budget: unions/interfaces always; utility types for well-known transformations; conditional/mapped/
  template-literal types for library code only; recursive `infer` chains last resort. If you can't explain a type in
  one sentence, split or simplify it.

## Narrowing

- Discriminated unions (`kind`/`type` literal field) for variants. Exhaustive switch with
  `default: { const _exhaustive: never = value; ... }` to catch new variants at compile time.
- Type predicates (`pet is Fish`) for reusable guards; assertion functions (`asserts value is Error`) for boundary
  validation. `typeof`/`instanceof`/`in` narrow natively.
- Pitfalls: `typeof null === "object"` — check null first; truthiness narrowing fails on `""`, `0`, `NaN`, `false` —
  explicit null checks when those are valid values.

## Enums

- Union of string literals over enum (`type Status = "active" | "inactive"`). If an enum is warranted (runtime
  object, iteration, namespace for constants), use a string enum; never numeric with implicit values, never mixed
  members, never coerced to boolean (`level !== Level.NONE`, not `!!level`).

## Functions & Classes

- Union types or optional parameters over overloads; when overloads are unavoidable, specific signatures before
  general.
- Callbacks: `void` return when the result is ignored; no optional parameters in callback types — callers may ignore
  extra args.
- Classes: omit `public` (default); `readonly` on never-reassigned properties; constructor parameter properties
  (`constructor(private readonly db: Database)`); initialize fields at declaration; `override` keyword on overrides.
- Branded types for nominal safety where structural typing is too permissive (domain IDs, validated strings):
  `type UserId = string & { readonly __brand: unique symbol }` — keep the mechanism consistent project-wide.
- Array syntax: `T[]` for simple element types, `Array<T>` for complex ones (`Array<string | number>`).
- Doc comments describe behavior and semantics, not types already visible in the signature.

## tsconfig

- `module: "NodeNext"` when transpiling with tsc; `module: "preserve"` with bundlers (Vite, esbuild);
  `verbatimModuleSyntax: true` in both. Target `ESNext`; `lib` includes `dom` for browser projects.
- Keep configs minimal: `extends` for sharing; separate `tsconfig.build.json` excluding tests/scripts.
