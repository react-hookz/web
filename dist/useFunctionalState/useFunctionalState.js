import { useCallback } from 'react';
import { useSafeState } from "../useSafeState/useSafeState.js";
import { useSyncedRef } from "../useSyncedRef/useSyncedRef.js";
/**
 * Like `useState` but instead of raw state, state getter returned. `useSafeState` is
 * used underneath.
 */
export function useFunctionalState(initialState) {
    const [state, setState] = useSafeState(initialState);
    const stateRef = useSyncedRef(state);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return [useCallback(() => stateRef.current, []), setState];
}
