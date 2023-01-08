import { useEffect } from 'react';
import { useSyncedRef } from "../useSyncedRef/useSyncedRef.js";
/**
 * Run effect only when component is unmounted.
 *
 * @param effect Effector to run on unmount
 */
export function useUnmountEffect(effect) {
    const effectRef = useSyncedRef(effect);
    useEffect(() => () => {
        effectRef.current();
    }, 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);
}
