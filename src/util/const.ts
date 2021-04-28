export const noop = (): void => {};

export const isBrowser =
  typeof window !== 'undefined' &&
  typeof navigator !== 'undefined' &&
  typeof document !== 'undefined';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function truthyArrayItemsPredicate(conditions: ReadonlyArray<any>): boolean {
  return conditions.every((i) => Boolean(i));
}
