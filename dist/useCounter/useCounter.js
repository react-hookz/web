import { useMemo } from 'react';
import { useMediatedState } from "../useMediatedState/useMediatedState.js";
import { useSyncedRef } from "../useSyncedRef/useSyncedRef.js";
import { resolveHookState } from "../util/resolveHookState.js";
/**
 * Tracks a numeric value.
 *
 * @param initialValue The initial value of the counter.
 * @param max The maximum value the counter is allowed to reach.
 *            If `initialValue` is greater than `max`, then `max` is set as the initial value.
 * @param min The minimum value the counter is allowed to reach.
 *            If `initialValue` is smaller than `min`, then `min` is set as the initial value.
 */
export function useCounter(initialValue = 0, max, min) {
    const [state, setState] = useMediatedState(initialValue, (v) => {
        if (max !== undefined) {
            v = Math.min(max, v);
        }
        if (min !== undefined) {
            v = Math.max(min, v);
        }
        return v;
    });
    const stateRef = useSyncedRef(state);
    return [
        state,
        useMemo(() => ({
            get: () => stateRef.current,
            set: setState,
            dec: (delta = 1) => {
                setState((val) => val - resolveHookState(delta, val));
            },
            inc: (delta = 1) => {
                setState((val) => val + resolveHookState(delta, val));
            },
            reset: (val = initialValue) => {
                setState((v) => resolveHookState(val, v));
            },
        }), [initialValue, setState, stateRef]),
    ];
}
