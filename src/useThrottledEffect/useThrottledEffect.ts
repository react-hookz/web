import { DependencyList, useEffect } from 'react';
import { useThrottledCallback } from '..';

/**
 * Like `useEffect`, but passed function is throttled.
 *
 * @param callback Callback like for `useEffect`, but without ability to return
 * a cleanup function.
 * @param deps Dependencies list that will be passed to underlying `useEffect`
 * and `useThrottledCallback`.
 * @param delay Throttle delay.
 * @param noTrailing If noTrailing is true, callback will only execute every
 * `delay` milliseconds, otherwise, callback will be executed one final time
 * after the last throttled-function call.
 */
export function useThrottledEffect(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  callback: (...args: any[]) => void,
  deps: DependencyList,
  delay: number,
  noTrailing = false
): void {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(useThrottledCallback(callback, deps, delay, noTrailing), deps);
}
