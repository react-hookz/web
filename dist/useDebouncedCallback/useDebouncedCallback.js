/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useRef } from 'react';
import { useUnmountEffect } from "../useUnmountEffect/useUnmountEffect.js";
/**
 * Makes passed function debounced, otherwise acts like `useCallback`.
 *
 * @param callback Function that will be debounced.
 * @param deps Dependencies list when to update callback.
 * @param delay Debounce delay.
 * @param maxWait The maximum time `callback` is allowed to be delayed before
 * it's invoked. 0 means no max wait.
 */
export function useDebouncedCallback(callback, deps, delay, maxWait = 0) {
    const timeout = useRef();
    const waitTimeout = useRef();
    const lastCall = useRef();
    const clear = () => {
        if (timeout.current) {
            clearTimeout(timeout.current);
            timeout.current = undefined;
        }
        if (waitTimeout.current) {
            clearTimeout(waitTimeout.current);
            waitTimeout.current = undefined;
        }
    };
    // cancel scheduled execution on unmount
    useUnmountEffect(clear);
    return useMemo(() => {
        const execute = () => {
            // barely possible to test this line
            /* istanbul ignore next */
            if (!lastCall.current)
                return;
            const context = lastCall.current;
            lastCall.current = undefined;
            callback.apply(context.this, context.args);
            clear();
        };
        // eslint-disable-next-line func-names
        const wrapped = function (...args) {
            if (timeout.current) {
                clearTimeout(timeout.current);
            }
            lastCall.current = { args, this: this };
            // plan regular execution
            timeout.current = setTimeout(execute, delay);
            // plan maxWait execution if required
            if (maxWait > 0 && !waitTimeout.current) {
                waitTimeout.current = setTimeout(execute, maxWait);
            }
        };
        Object.defineProperties(wrapped, {
            length: { value: callback.length },
            name: { value: `${callback.name || 'anonymous'}__debounced__${delay}` },
        });
        return wrapped;
    }, 
    // eslint-disable-next-line react-hooks/exhaustive-deps,@typescript-eslint/no-unsafe-assignment
    [delay, maxWait, ...deps]);
}
