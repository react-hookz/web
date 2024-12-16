import { type DependencyList, useEffect } from 'react';
import { useDebouncedCallback } from '../useDebouncedCallback/index.js';

/**
 * Like `useEffect`, but the passed function is debounced.
 *
 * @param callback Callback like for `useEffect`, but without ability to return
 * a cleanup function.
 * @param deps Dependency list like the one passed to `useEffect`.
 * @param delay Debounce delay (in milliseconds).
 * @param maxWait The maximum time `callback` is allowed to be delayed
 * before it's invoked. `0` means no max wait.
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
