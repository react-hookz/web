import { DependencyList, EffectCallback, useEffect } from 'react';
import { useFirstMountState } from './useFirstMountState';

/**
 * React effect hook that ignores the first invocation (e.g. on mount)
 *
 * @param effect effector to run on updates
 * @param deps dependencies list, as for `useEffect` hook
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
