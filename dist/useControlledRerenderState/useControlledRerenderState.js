import { useCallback, useRef } from 'react';
import { useFirstMountState } from "../useFirstMountState/useFirstMountState.js";
import { useRerender } from "../useRerender/useRerender.js";
import { resolveHookState } from "../util/resolveHookState.js";
/**
 * Like `React.useState`, but its state setter accepts extra argument, that allows to cancel
 * rerender.
 */
export function useControlledRerenderState(initialState) {
    const state = useRef(useFirstMountState() ? resolveHookState(initialState) : undefined);
    const rr = useRerender();
    return [
        state.current,
        useCallback((value, rerender) => {
            const newState = resolveHookState(value, state.current);
            if (newState !== state.current) {
                state.current = newState;
                if (rerender === undefined || rerender) {
                    rr();
                }
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []),
    ];
}
