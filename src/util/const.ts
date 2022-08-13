import { IConditionsPredicate, Predicate } from '..';

export type Noop = () => void;

export const noop = (): void => {};

export const isBrowser =
  typeof window !== 'undefined' &&
  typeof navigator !== 'undefined' &&
  typeof document !== 'undefined';

/**
 * You should only be reaching for this function when you're attempting to prevent multiple
 * redefinitions of the same function. In-place strict equality checks are more performant.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isStrictEqual: Predicate = (prev: any, next: any): boolean => prev === next;

export const truthyAndArrayPredicate: IConditionsPredicate = (conditions): boolean =>
  conditions.every(Boolean);

export const truthyOrArrayPredicate: IConditionsPredicate = (conditions): boolean =>
  conditions.some(Boolean);
