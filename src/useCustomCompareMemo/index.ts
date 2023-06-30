import { useMemo, useRef } from 'react';
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
export const useCustomCompareMemo = <T, Deps extends DependencyList>(
	factory: () => T,
	deps: Deps,
	comparator: DependenciesComparator<Deps>
): T => {
	const dependencies = useRef<Deps>();

	if (dependencies.current === undefined || !comparator(dependencies.current, deps)) {
		dependencies.current = deps;
	}

	return useMemo<T>(factory, dependencies.current);
};
