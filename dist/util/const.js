export const noop = () => { };
export const isBrowser = typeof window !== 'undefined' &&
    typeof navigator !== 'undefined' &&
    typeof document !== 'undefined';
/**
 * You should only be reaching for this function when you're attempting to prevent multiple
 * redefinitions of the same function. In-place strict equality checks are more performant.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isStrictEqual = (prev, next) => prev === next;
export const truthyAndArrayPredicate = (conditions) => conditions.every(Boolean);
export const truthyOrArrayPredicate = (conditions) => conditions.some(Boolean);
