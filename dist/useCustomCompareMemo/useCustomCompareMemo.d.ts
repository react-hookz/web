import type { DependencyList } from 'react';
import type { DependenciesComparator } from '../types';
/**
 * Like useMemo but uses provided comparator function to validate dependency changes.
 *
 * @param factory useMemo factory function
 * @param deps useMemo dependency list
 * @param comparator function to validate dependency changes
 * @returns useMemo result
 */
export declare const useCustomCompareMemo: <T, Deps extends DependencyList>(factory: () => T, deps: Deps, comparator: DependenciesComparator<Deps>) => T;
