import { EffectCallback, useEffect } from 'react';

/**
 * Run effect only when component is first mounted.
 *
 * @param effect effector to run on nmount
 */
export function useMountEffect(effect: EffectCallback): void {
  useEffect(() => {
    effect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
