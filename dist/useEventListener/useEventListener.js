/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo } from 'react';
import { useIsMounted } from "../useIsMounted/useIsMounted.js";
import { useSyncedRef } from "../useSyncedRef/useSyncedRef.js";
import { hasOwnProperty, off, on } from "../util/misc.js";
/**
 *  An HTML element or ref object containing an HTML element.
 *
 * @param target An HTML element or ref object containing an HTML element.
 * @param params Parameters specific to the target element's `addEventListener` method. Commonly
 * something like `[eventName, listener, options]`.
 */
export function useEventListener(target, ...params) {
    const isMounted = useIsMounted();
    // create static event listener
    const listenerRef = useSyncedRef(params[1]);
    const eventListener = useMemo(() => 
    // as some event listeners designed to be used through `this`
    // it is better to make listener a conventional function as it
    // infers call context
    // eslint-disable-next-line func-names
    function (...args) {
        // normally, such situation should not happen, but better to
        // have back covered
        /* istanbul ignore next */
        if (!isMounted())
            return;
        // we dont care if non-listener provided, simply dont do anything
        /* istanbul ignore else */
        if (typeof listenerRef.current === 'function') {
            listenerRef.current.apply(this, args);
        }
        else if (typeof listenerRef.current.handleEvent === 'function') {
            listenerRef.current.handleEvent.apply(this, args);
        }
    }, 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);
    useEffect(() => {
        const tgt = target && hasOwnProperty(target, 'current') ? target.current : target;
        if (!tgt)
            return;
        const restParams = params.slice(2);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        on(tgt, params[0], eventListener, ...restParams);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        return () => off(tgt, params[0], eventListener, ...restParams);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [target, params[0]]);
}
