import { useCallback, useEffect, useRef } from 'react';
/**
 * Returns function that yields current mount state.
 *
 * Returned function yields `true` only in case component is mounted. This hook
 * is handy for the cases when you have to detect component mount state within
 * async effects.
 *
 * @param initialValue Initial value. By default, this hook assumes that hook is
 * not mounted yet at first render.
 */
export function useIsMounted(initialValue = false) {
    const isMounted = useRef(initialValue);
    const get = useCallback(() => isMounted.current, []);
    useEffect(() => {
        isMounted.current = true;
        return () => {
            isMounted.current = false;
        };
    }, []);
    return get;
}
