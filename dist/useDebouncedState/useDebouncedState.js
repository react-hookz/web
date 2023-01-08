import { useDebouncedCallback } from "../useDebouncedCallback/useDebouncedCallback.js";
import { useSafeState } from "../useSafeState/useSafeState.js";
/**
 * Like `useSafeState` but its state setter is debounced.
 *
 * @param initialState Initial state to pass to underlying `useSafeState`.
 * @param delay Debounce delay.
 * @param maxWait Maximum amount of milliseconds that function can be delayed
 * before it's force execution. 0 means no max wait.
 */
export function useDebouncedState(initialState, delay, maxWait = 0) {
    const [state, setState] = useSafeState(initialState);
    return [state, useDebouncedCallback(setState, [], delay, maxWait)];
}
