import { type Predicate, type ConditionsPredicate } from '../types.js';

export const noop = (): void => {};

export const isBrowser =
	typeof window !== 'undefined' &&
	typeof navigator !== 'undefined' &&
	typeof document !== 'undefined';

/**
 * You should only be reaching for this function when you're attempting to prevent multiple
 * redefinitions of the same function. In-place strict equality checks are more performant.
 */

export const isStrictEqual: Predicate = (previous: any, next: any): boolean => previous === next;

export const truthyAndArrayPredicate: ConditionsPredicate = (conditions): boolean =>
	conditions.every(Boolean);

export const truthyOrArrayPredicate: ConditionsPredicate = (conditions): boolean =>
	conditions.some(Boolean);
