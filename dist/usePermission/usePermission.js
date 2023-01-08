import { useEffect } from 'react';
import { useSafeState } from "../useSafeState/useSafeState.js";
import { off, on } from "../util/misc.js";
/**
 * Tracks a permission state.
 *
 * @param descriptor Permission request descriptor that passed to `navigator.permissions.query`
 */
export function usePermission(descriptor) {
    const [state, setState] = useSafeState('not-requested');
    useEffect(() => {
        const unmount = { current: null };
        setState('requested');
        // eslint-disable-next-line @typescript-eslint/no-floating-promises,promise/catch-or-return
        navigator.permissions
            .query(descriptor)
            // eslint-disable-next-line promise/always-return
            .then((status) => {
            const handleChange = () => {
                setState(status.state);
            };
            setState(status.state);
            on(status, 'change', handleChange, { passive: true });
            unmount.current = () => {
                off(status, 'change', handleChange);
            };
        });
        return () => {
            if (unmount.current) {
                unmount.current();
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [descriptor.name]);
    return state;
}
