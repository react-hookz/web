import { DependencyList, EffectCallback, useEffect } from 'react';
import { useFirstMountState } from './useFirstMountState';

/**
 * Effect hook that ignores the first invocation (not invoked on mount)
 *
 * @param effect Effector to run on updates
 * @param deps Dependencies list, as for `useEffect` hook
 */
export function useUpdateEffect(effect: EffectCallback, deps?: DependencyList): void {
  const isFirstMount = useFirstMountState();

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (!isFirstMount) {
      return effect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
