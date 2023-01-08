import { useEffect } from 'react';
/**
 * Run effect only when component is first mounted.
 *
 * @param effect Effector to run on mount
 */
export function useMountEffect(effect) {
    useEffect(() => {
        effect();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
}
