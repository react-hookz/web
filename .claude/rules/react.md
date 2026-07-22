---
paths:
  - "**/*.jsx"
  - "**/*.tsx"
---

# React Conventions

Components are pure functions. State is minimal. Effects are escape hatches — before reaching for `useEffect`, verify
you actually need it. Rules target React 19. Testing conventions in [react-testing.md](react-testing.md) (loads for
`*.test.tsx`/`*.spec.tsx`).

## Component Design

- Break UI into a hierarchy where each component does one thing; build static (props-only) first; then find minimal
  state — if it's passed from a parent, never changes, or can be computed, it is not state; put state in the closest
  common parent of everything that renders from it; children update it through callbacks.
- Purity: same props + state = same JSX. Never mutate props, state, or anything declared before the render. Local
  mutation within a render is fine; event handlers don't need to be pure.
- One component per file; co-located small helpers acceptable until reused. Function declarations for components.
  Never `React.FC` — implicit `children`, breaks generics; use `function Button(props: ButtonProps)`.
- Every component with props gets a dedicated named type (`ButtonProps`) — never inline prop types in the signature.
  Type events explicitly when needed (`React.ChangeEvent<HTMLInputElement>`).

## Component Body Organization

Logic in the body, declarative JSX in the return.

- Group all event handlers in a single `handle` object (`handle.submit()`, `onChange={handle.inputChange}`). Never
  inline handler logic in JSX.
- Compute derived JSX and element arrays in the body; `.map()` inside the return statement is discouraged —
  build the array first, reference it in JSX.
- Inline conditionals (`{isVisible && <X />}`) only when simple; multi-branch or complex conditions are computed in
  the body.

## JSX

- Self-closing tags without children; boolean attributes bare (`disabled`, not `disabled={true}`); fragments over
  wrapper divs.
- `count && <List />` renders `0` — use `count > 0 &&` or a ternary.
- `key` on every list item: stable unique IDs, never array index when items can reorder. `key` also resets component
  state when the entity changes (`<Profile key={userId} />`) — cleaner than an Effect.
- Spread props sparingly — explicit props over `{...props}`. No side effects during render.

## Composition

- Props down, events up. Composition over configuration — pass JSX as `children`/render props instead of stacking
  boolean flags. A stateful wrapper's unchanged `children` skip re-rendering.
- Compound components (shared context between sub-components) for tabs, menus, accordions. Controlled when a parent
  coordinates siblings; uncontrolled for isolated UI.
- Refs: `ref` is a regular prop — never `forwardRef` (deprecated). Ref callbacks may return a cleanup; use block
  bodies, not implicit returns.

## Hooks

- Top level only — never in conditions, loops, or nested functions. Exception: `use()` may be called conditionally —
  prefer `use(Ctx)` over `useContext(Ctx)`.
- Exhaustive deps always — the linter is right; if a dependency causes unwanted re-runs, restructure, don't suppress.
- One Effect per concern; separate Effects for separate external systems.
- Custom hooks share stateful logic, not state — each call is independent. `use` prefix only for functions that call
  hooks. Name by use case (`useOnlineStatus`), not lifecycle (`useMount`). Don't wrap a lone `useState` in a hook.
  Return: single value directly; value+setter as `[value, setValue] as const`; several related values as an object.
- External stores: `useSyncExternalStore` over manual Effect + state.

## Effects Are Escape Hatches

Effects synchronize with external systems only — browser events, WebSockets, third-party widgets, non-React DOM,
prop/state-dependent fetching (with cleanup).

You do NOT need an Effect to: transform data for rendering (compute in render), handle user events (event handler),
reset or adjust state on prop change (`key` or compute), notify the parent (call the callback in the handler), share
logic between handlers (extract a function), or chain state updates (compute everything in one handler).

Every subscribing Effect returns a cleanup. Fetching in an Effect uses an `ignore` flag against races — but prefer
react-query (already used in this repo's frontends) over raw fetch Effects.

## State Management

- Placement chain: local `useState` → lift to common parent → composition (restructure to pass `children`) → Context
  → external library. Context is not the first fix for prop drilling.
- Server cache (API data) is not UI state: react-query/SWR — never hand-rolled `useState` + `useEffect` caching. UI
  state (modal open, form input, selected tab) stays in `useState`/`useReducer`/Context.
- `useState`: don't store what you can compute; colocate; updater function when next depends on previous
  (`setCount(c => c + 1)`); lazy init for expensive values (`useState(() => build())`).
- `useReducer` when many handlers touch the same state or transitions are non-trivial. Reducers are pure; actions
  describe what happened (`'added_task'`, not `'set_tasks'`), one action per user interaction; `default` case throws;
  `as const` on action types.
- Context: consumption always wrapped in a custom hook that throws outside the provider. Keep providers close to
  usage; split logically (data vs dispatch contexts so dispatch-only consumers don't re-render). `<Context value>`
  directly, not `<Context.Provider value>`.
- Actions: `useActionState` for form submissions/mutations (pending, errors, queuing built in); return
  error states instead of throwing; `useOptimistic` for instant feedback; `useFormStatus` only from a component
  rendered inside the `<form>`.

## Performance

- Decision tree: no perceptible lag → don't optimize. Slow render → profile and fix the computation. Unnecessary
  re-renders → restructure first (push state down, lift content up). Only then memoize. Fix the slow render before
  the re-render.
- `memo` when a component re-renders often with identical props and that's expensive; `useMemo` for genuinely
  expensive computation or reference stability into memoized children; `useCallback` for callbacks into memoized
  children, custom hook returns, and Effect deps. If a project enables React Compiler, stop memoizing manually but
  leave existing memoization in place.
- Import from concrete files, not barrels. `lazy(() => import('./Chart'))` + `<Suspense>` for heavy components.
  Independent fetches through `Promise.all`, never sequential awaits.
