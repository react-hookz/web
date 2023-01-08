import { useSafeState } from "../useSafeState/useSafeState.js";
import { useThrottledCallback } from "../useThrottledCallback/useThrottledCallback.js";
/**
 * Like `useSafeState` but its state setter is throttled.
 *
 * @param initialState Initial state to pass to underlying `useSafeState`.
 * @param delay Throttle delay.
 * @param noTrailing If `noTrailing` is true, callback will only execute every
 * `delay` milliseconds, otherwise, callback will be executed one final time
 * after the last throttled-function call.
 */
export function useThrottledState(initialState, delay, noTrailing = false) {
    const [state, setState] = useSafeState(initialState);
    return [state, useThrottledCallback(setState, [], delay, noTrailing)];
}
