import { useCallback, useState } from 'react';
import { useIsMounted } from "../useIsMounted/useIsMounted.js";
/**
 * Like `useState` but its state setter is guarded against setting the state of an unmounted component.
 */
export function useSafeState(initialState) {
    const [state, setState] = useState(initialState);
    const isMounted = useIsMounted(true);
    return [
        state,
        useCallback((value) => {
            if (isMounted())
                setState(value);
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []),
    ];
}
