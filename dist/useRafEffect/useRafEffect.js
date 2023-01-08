/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import { useRafCallback } from "../useRafCallback/useRafCallback.js";
/**
 * Like `React.useEffect`, but state is only updated within animation frame.
 *
 * @param callback Callback like for `useEffect`, but without ability to return
 * a cleanup function.
 * @param deps Dependencies list that will be passed to underlying `useEffect`.
 */
export function useRafEffect(callback, deps) {
    const [rafCallback, cancelRaf] = useRafCallback(callback);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        rafCallback();
        return cancelRaf;
    }, 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    deps);
}
