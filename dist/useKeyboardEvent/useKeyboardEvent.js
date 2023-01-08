import { useMemo } from 'react';
import { useSyncedRef } from "../useSyncedRef/useSyncedRef.js";
import { useEventListener } from "../useEventListener/useEventListener.js";
import { isBrowser } from "../util/const.js";
import { yieldFalse, yieldTrue } from "../util/misc.js";
const createKeyPredicate = (keyFilter) => {
    if (typeof keyFilter === 'function')
        return keyFilter;
    if (typeof keyFilter === 'string')
        return (ev) => ev.key === keyFilter;
    return keyFilter ? yieldTrue : yieldFalse;
};
const WINDOW_OR_NULL = isBrowser ? window : null;
/**
 * Invokes a callback when a keyboard event occurs on the chosen target element.
 *
 * @param keyOrPredicate Filters key presses on which `callback` is invoked.
 * @param callback Function to call when a key is pressed and `keyOrPredicate` matches positive.
 * @param deps Dependencies list that is passed to the underlying `useMemo`.
 * @param options Hook options.
 */
export function useKeyboardEvent(keyOrPredicate, callback, deps, options = {}) {
    const { event = 'keydown', target = WINDOW_OR_NULL, eventOptions } = options;
    const cbRef = useSyncedRef(callback);
    const handler = useMemo(() => {
        const predicate = createKeyPredicate(keyOrPredicate);
        return function kbEventHandler(ev) {
            if (predicate(ev)) {
                cbRef.current.call(this, ev);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);
    useEventListener(target, event, handler, eventOptions);
}
