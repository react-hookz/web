import { useEffect } from 'react';
import { off, on } from "../util/misc.js";
import { useSyncedRef } from "../useSyncedRef/useSyncedRef.js";
const DEFAULT_EVENTS = ['mousedown', 'touchstart'];
/**
 * Triggers a callback when the user clicks outside a target element.
 *
 * @param ref React ref object containing the target HTML element.
 * @param callback Callback invoked when the user clicks outside the target element.
 * @param events List of events that will be used as triggers for the outside click. Default:
 * 'mousedown', 'touchstart'
 */
export function useClickOutside(ref, callback, events = DEFAULT_EVENTS) {
    const cbRef = useSyncedRef(callback);
    const refRef = useSyncedRef(ref);
    useEffect(() => {
        function handler(event) {
            if (!refRef.current.current)
                return;
            const { target: evtTarget } = event;
            const cb = cbRef.current;
            if (!evtTarget || (!!evtTarget && !refRef.current.current.contains(evtTarget))) {
                cb.call(this, event);
            }
        }
        events.forEach((name) => on(document, name, handler, { passive: true }));
        return () => {
            events.forEach((name) => off(document, name, handler, { passive: true }));
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [...events]);
}
