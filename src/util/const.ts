import { IConditionsPredicate } from '..';

export const noop = (): void => {};

export const isBrowser =
  typeof window !== 'undefined' &&
  typeof navigator !== 'undefined' &&
  typeof document !== 'undefined';

export const truthyAndArrayPredicate: IConditionsPredicate = (conditions): boolean =>
  conditions.every((i) => Boolean(i));

export const truthyOrArrayPredicate: IConditionsPredicate = (conditions): boolean =>
  conditions.some((i) => Boolean(i));
