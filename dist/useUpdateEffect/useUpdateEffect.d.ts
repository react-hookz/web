import { DependencyList, EffectCallback } from 'react';
/**
 * Effect hook that ignores the first render (not invoked on mount).
 *
 * @param effect Effector to run on updates
 * @param deps Dependencies list, as for `useEffect` hook
 */
export declare function useUpdateEffect(effect: EffectCallback, deps?: DependencyList): void;
