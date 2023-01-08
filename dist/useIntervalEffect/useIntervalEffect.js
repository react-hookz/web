import { useEffect } from 'react';
import { useSyncedRef } from "../useSyncedRef/useSyncedRef.js";
/**
 * Like `setInterval` but in form of react hook.
 *
 * @param callback Callback to be called within interval.
 * @param ms Interval delay in milliseconds, `undefined` disables the interval.
 * Keep in mind, that changing this parameter will re-set interval, meaning
 * that it will be set as new after the change.
 */
export function useIntervalEffect(callback, ms) {
    const cbRef = useSyncedRef(callback);
    useEffect(() => {
        if (!ms && ms !== 0) {
            return;
        }
        const id = setInterval(() => cbRef.current(), ms);
        return () => clearInterval(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ms]);
}
