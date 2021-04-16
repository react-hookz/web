import { DependencyList, EffectCallback, useEffect } from 'react';
import { useFirstMountState } from './useFirstMountState';

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
