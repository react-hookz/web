import { useEffect } from 'react';

/**
 * Run effect only when component is first mounted.
 *
 * @param fn effector to run on nmount
 */
export function useMountEffect(fn: () => void): void {
  useEffect(() => {
    fn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
