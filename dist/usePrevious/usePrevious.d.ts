/**
 * Returns the value passed to the hook on previous render.
 *
 * Yields `undefined` on first render.
 *
 * @param value Value to yield on next render
 */
export declare function usePrevious<T>(value?: T): T | undefined;
