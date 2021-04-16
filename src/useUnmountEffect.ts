import { EffectCallback, useEffect } from 'react';

/**
 * Run effect only when component is unmounted.
 *
 * @param effect effector to run on unmount
 */
export function useUnmountEffect(effect: EffectCallback): void {
  useEffect(
    () => () => {
      effect();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
}
