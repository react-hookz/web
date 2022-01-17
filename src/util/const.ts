import { IConditionsPredicate, TPredicate } from '..';

export const noop = (): void => {};

export const isBrowser =
  typeof window !== 'undefined' &&
  typeof navigator !== 'undefined' &&
  typeof document !== 'undefined';

/**
 * You should only be reaching for this function when you're attempting to prevent multiple
 * redefinitions of the same function. In-place strict equality checks are more performant.
 */
export const isStrictEqual: TPredicate = <T>(prev: T, next: any) => prev === next;

export const truthyAndArrayPredicate: IConditionsPredicate = (conditions): boolean =>
  conditions.every((i) => Boolean(i));

export const truthyOrArrayPredicate: IConditionsPredicate = (conditions): boolean =>
  conditions.some((i) => Boolean(i));
