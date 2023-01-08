import { useCallback } from 'react';
import { useSafeState } from "../useSafeState/useSafeState.js";
import { useSyncedRef } from "../useSyncedRef/useSyncedRef.js";
import { resolveHookState } from "../util/resolveHookState.js";
/**
 * Like `useState`, but every value set is passed through a mediator function.
 */
export function useMediatedState(initialState, mediator) {
    const [state, setState] = useSafeState(() => {
        return mediator ? mediator(resolveHookState(initialState)) : initialState;
    });
    const mediatorRef = useSyncedRef(mediator);
    return [
        state,
        useCallback((value) => {
            if (mediatorRef.current) {
                setState((prevState) => mediatorRef.current?.(resolveHookState(value, prevState)));
            }
            else {
                setState(value);
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []),
    ];
}
