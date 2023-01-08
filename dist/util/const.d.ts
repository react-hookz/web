import type { Predicate, ConditionsPredicate } from '../types';
export declare const noop: () => void;
export declare const isBrowser: boolean;
/**
 * You should only be reaching for this function when you're attempting to prevent multiple
 * redefinitions of the same function. In-place strict equality checks are more performant.
 */
export declare const isStrictEqual: Predicate;
export declare const truthyAndArrayPredicate: ConditionsPredicate;
export declare const truthyOrArrayPredicate: ConditionsPredicate;
