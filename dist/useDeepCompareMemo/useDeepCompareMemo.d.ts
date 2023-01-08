import { DependencyList } from 'react';
/**
 * Like useMemo but validates dependency changes using deep equality check instead of reference check.
 *
 * @param factory Function calculating the value to be memoized.
 * @param deps The list of all reactive values referenced inside `factory`.
 * @returns Initially returns the result of calling `factory`. On subsequent renders, it will return
 * the same value, if dependencies haven't changed, or the result of calling `factory` again, if they have changed.
 */
export declare function useDeepCompareMemo<T, Deps extends DependencyList>(factory: () => T, deps: Deps): T;
