import { useMemo } from 'react';
import { useSyncedRef } from "../useSyncedRef/useSyncedRef.js";
/**
 * Like `React.useRef` but it is possible to define get and set handlers.
 *
 * @param initialValue Initial value of a hook.
 * @param onSet Function to be called while ref.current value set. Return value
 * will be stored in ref.
 * @param onGet Function to be called while ref.current value accessed. Return
 * value will be used as a return value.
 */
export function useHookableRef(initialValue, onSet, onGet) {
    const onSetRef = useSyncedRef(onSet);
    const onGetRef = useSyncedRef(onGet);
    return useMemo(() => {
        let v = initialValue;
        return {
            get current() {
                return onGetRef.current === undefined ? v : onGetRef.current(v);
            },
            set current(val) {
                v = onSetRef.current === undefined ? val : onSetRef.current(val);
            },
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
}
