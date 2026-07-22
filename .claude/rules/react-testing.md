---
paths:
  - "**/*.test.jsx"
  - "**/*.test.tsx"
  - "**/*.spec.jsx"
  - "**/*.spec.tsx"
---

# React Testing (Testing Library)

Tests resemble how users interact with the app: query by what users see (roles, labels, text), never by
implementation details (class names, internals, test IDs).

## Setup & Interactions

- Always query via `screen` — never destructure from `render()`. `userEvent.setup()` before rendering.
- `userEvent` over `fireEvent` — it simulates real behavior (focus, blur, full key event sequences).
- Don't call `cleanup` manually — it's automatic. Don't wrap in `act` — `render()` and interactions already do; an
  `act` warning means a real bug (state update after the test finished), fix the cause.

## Queries

- Priority: `getByRole` > `getByLabelText` > `getByText` > `getByTestId` (last resort). If you can't query by role,
  the element is probably inaccessible to screen readers — fix the markup, not the test.
- Variants: `getBy` for elements that must be present, `queryBy` only for asserting absence, `findBy` for async
  appearance.
- Don't add `role` attributes to native elements (`<button>` already has `role="button"`). Inputs get `type` and a
  `<label>` — that's what makes them queryable by role.

## Async

- Prefer `findBy` over `waitFor` + `getBy`.
- `waitFor`: one assertion per callback (faster failure diagnosis); no side effects inside (the callback retries);
  never an empty callback.

## Assertions

- Use `@testing-library/jest-dom` matchers: `toBeInTheDocument()`, `toBeVisible()`, `toBeDisabled()`,
  `toHaveTextContent()`, `toHaveAttribute()`, `toHaveValue()` — not raw attribute/DOM poking.
- Forms with `useFormStatus`: the component under test must render inside a `<form>` with an `action`.
