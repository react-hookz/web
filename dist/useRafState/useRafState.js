import { useRafCallback } from "../useRafCallback/useRafCallback.js";
import { useSafeState } from "../useSafeState/useSafeState.js";
import { useUnmountEffect } from "../useUnmountEffect/useUnmountEffect.js";
/**
 * Like `React.useState`, but state is only updated within animation frame.
 */
export function useRafState(initialState) {
    const [state, innerSetState] = useSafeState(initialState);
    const [setState, cancelRaf] = useRafCallback(innerSetState);
    useUnmountEffect(cancelRaf);
    return [state, setState];
}
