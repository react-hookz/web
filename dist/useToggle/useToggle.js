import { useCallback } from 'react';
import { useSyncedRef } from "../useSyncedRef/useSyncedRef.js";
import { useSafeState } from "../useSafeState/useSafeState.js";
import { resolveHookState } from "../util/resolveHookState.js";
/**
 * Like `useSafeState`, but can only become `true` or `false`.
 *
 * State setter, in case called without arguments, will change the state to opposite. React
 * synthetic events are ignored by default so state setter can be used as event handler directly,
 * such behaviour can be changed by setting 2nd parameter to `false`.
 */
export function useToggle(initialState = false, ignoreReactEvents = true) {
    // We don't use useReducer (which would end up with less code), because exposed
    // action does not provide functional updates feature.
    // Therefore, we have to create and expose our own state setter with
    // toggle logic.
    const [state, setState] = useSafeState(initialState);
    const ignoreReactEventsRef = useSyncedRef(ignoreReactEvents);
    return [
        state,
        useCallback((nextState) => {
            setState((prevState) => {
                if (nextState === undefined ||
                    (ignoreReactEventsRef.current &&
                        typeof nextState === 'object' &&
                        (nextState.constructor.name === 'SyntheticBaseEvent' ||
                            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,no-underscore-dangle,@typescript-eslint/no-explicit-any
                            typeof nextState._reactName === 'string'))) {
                    return !prevState;
                }
                return Boolean(resolveHookState(nextState, prevState));
            });
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []),
    ];
}
