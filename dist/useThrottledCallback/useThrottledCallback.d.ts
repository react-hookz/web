import { DependencyList } from 'react';
export interface ThrottledFunction<Fn extends (...args: any[]) => any> {
    (this: ThisParameterType<Fn>, ...args: Parameters<Fn>): void;
}
/**
 * Makes passed function throttled, otherwise acts like `useCallback`.
 *
 * @param callback Function that will be throttled.
 * @param deps Dependencies list when to update callback.
 * @param delay Throttle delay.
 * @param noTrailing If `noTrailing` is true, callback will only execute every
 * `delay` milliseconds, otherwise, callback will be executed one final time
 * after the last throttled-function call.
 */
export declare function useThrottledCallback<Fn extends (...args: any[]) => any>(callback: Fn, deps: DependencyList, delay: number, noTrailing?: boolean): ThrottledFunction<Fn>;
