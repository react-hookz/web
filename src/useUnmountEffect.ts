import { useEffect } from 'react';

/**
 * Run effect only when component is unmounted.
 *
 * @param fn effector to run on unmount
 */
export function useUnmountEffect(fn: () => void): void {
  useEffect(
    () => () => {
      fn();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
}
