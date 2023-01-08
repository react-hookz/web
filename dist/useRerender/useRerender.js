import { useCallback } from 'react';
import { useSafeState } from "../useSafeState/useSafeState.js";
const stateChanger = (state) => (state + 1) % Number.MAX_SAFE_INTEGER;
/**
 * Return callback function that re-renders component.
 */
export function useRerender() {
    const [, setState] = useSafeState(0);
    return useCallback(() => {
        setState(stateChanger);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
}
