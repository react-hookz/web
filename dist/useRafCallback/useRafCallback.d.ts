/**
 * Makes passed function to be called within next animation frame.
 *
 * Consequential calls, before the animation frame occurred, cancel previously scheduled call.
 *
 * @param cb Callback to fire within animation frame.
 */
export declare function useRafCallback<T extends (...args: any[]) => any>(cb: T): [(...args: Parameters<T>) => void, () => void];
