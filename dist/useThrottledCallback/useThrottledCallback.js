/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useRef } from 'react';
import { useUnmountEffect } from "../useUnmountEffect/useUnmountEffect.js";
/**
 * Makes passed function throttled, otherwise acts like `useCallback`.
 *
 * @param callback Function that will be throttled.
 * @param deps Dependencies list when to update callback.
 * @param delay Throttle delay.
 * @param noTrailing If `noTrailing` is true, callback will only execute every
 * `delay` milliseconds, otherwise, callback will be executed one final time
 * after the last throttled-function call.
 */
export function useThrottledCallback(callback, deps, delay, noTrailing = false) {
    const timeout = useRef();
    const lastCall = useRef();
    useUnmountEffect(() => {
        if (timeout.current) {
            clearTimeout(timeout.current);
        }
    });
    return useMemo(() => {
        const execute = (context, args) => {
            lastCall.current = undefined;
            callback.apply(context, args);
            timeout.current = setTimeout(() => {
                timeout.current = undefined;
                // if trailing execution is not disabled - call callback with last
                // received arguments and context
                if (!noTrailing && lastCall.current) {
                    execute(lastCall.current.this, lastCall.current.args);
                    lastCall.current = undefined;
                }
            }, delay);
        };
        // eslint-disable-next-line func-names
        const wrapped = function (...args) {
            if (timeout.current) {
                // if we cant execute callback immediately - save its arguments and
                // context to execute it when delay is passed
                lastCall.current = { args, this: this };
                return;
            }
            execute(this, args);
        };
        Object.defineProperties(wrapped, {
            length: { value: callback.length },
            name: { value: `${callback.name || 'anonymous'}__throttled__${delay}` },
        });
        return wrapped;
        // eslint-disable-next-line react-hooks/exhaustive-deps,@typescript-eslint/no-unsafe-assignment
    }, [delay, noTrailing, ...deps]);
}
