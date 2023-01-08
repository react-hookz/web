import { DependencyList } from 'react';
/**
 * Like `useEffect`, but passed function is throttled.
 *
 * @param callback Callback like for `useEffect`, but without ability to return
 * a cleanup function.
 * @param deps Dependencies list that will be passed to underlying `useEffect`
 * and `useThrottledCallback`.
 * @param delay Throttle delay.
 * @param noTrailing If `noTrailing` is true, callback will only execute every
 * `delay` milliseconds, otherwise, callback will be executed one final time
 * after the last throttled-function call.
 */
export declare function useThrottledEffect(callback: (...args: any[]) => void, deps: DependencyList, delay: number, noTrailing?: boolean): void;
