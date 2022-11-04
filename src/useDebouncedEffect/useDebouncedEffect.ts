/* eslint-disable @typescript-eslint/no-explicit-any */
import { DependencyList, useEffect } from 'react';
import { useDebouncedCallback } from '../useDebouncedCallback/useDebouncedCallback';

/**
 * Like `useEffect`, but passed function is debounced.
 *
 * @param callback Callback like for `useEffect`, but without ability to return
 * a cleanup function.
 * @param deps Dependencies list that will be passed to underlying `useEffect`
 * and `useDebouncedCallback`.
 * @param delay Debounce delay.
 * @param maxWait Maximum amount of milliseconds that function can be delayed
 * before it's force execution. 0 means no max wait.
 */
export function useDebouncedEffect(
  callback: (...args: any[]) => void,
  deps: DependencyList,
  delay: number,
  maxWait = 0
): void {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(useDebouncedCallback(callback, deps, delay, maxWait), deps);
}
