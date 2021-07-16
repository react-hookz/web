export const noop = (): void => {};

export const isBrowser =
  typeof window !== 'undefined' &&
  typeof navigator !== 'undefined' &&
  typeof document !== 'undefined';

export function truthyAndArrayPredicate(conditions: ReadonlyArray<unknown>): boolean {
  return conditions.every((i) => Boolean(i));
}

export function truthyOrArrayPredicate(conditions: ReadonlyArray<unknown>): boolean {
  return conditions.some((i) => Boolean(i));
}
