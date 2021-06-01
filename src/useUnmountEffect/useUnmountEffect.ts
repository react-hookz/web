import { useEffect } from 'react';

/**
 * Run effect only when component is unmounted.
 *
 * @param effect Effector to run on unmount
 */
export function useUnmountEffect(effect: CallableFunction): void {
  useEffect(
    () => () => {
      effect();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
}
