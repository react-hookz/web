import { useEffect, useRef } from 'react';
/**
 * Returns the value passed to the hook on previous render.
 *
 * Yields `undefined` on first render.
 *
 * @param value Value to yield on next render
 */
export function usePrevious(value) {
    const prev = useRef();
    useEffect(() => {
        prev.current = value;
    });
    return prev.current;
}
