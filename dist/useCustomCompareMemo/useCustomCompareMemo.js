import { useMemo, useRef } from 'react';
/**
 * Like useMemo but uses provided comparator function to validate dependency changes.
 *
 * @param factory useMemo factory function
 * @param deps useMemo dependency list
 * @param comparator function to validate dependency changes
 * @returns useMemo result
 */
export const useCustomCompareMemo = (factory, deps, comparator) => {
    const dependencies = useRef();
    if (dependencies.current === undefined || !comparator(dependencies.current, deps)) {
        dependencies.current = deps;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- missing factory function
    return useMemo(factory, dependencies.current);
};
