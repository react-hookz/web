import { type Dispatch, type SetStateAction, useState } from 'react';
import { useDebouncedCallback } from '../useDebouncedCallback/index.js';

/**
 * Like `useState` but its state setter is debounced.
 *
 * @param initialState Initial state to pass to underlying `useState`.
 * @param delay Debounce delay.
 * @param maxWait Maximum amount of milliseconds that function can be delayed
 * before it's force execution. 0 means no max wait.
 */
export function useDebouncedState<S>(
	initialState: S | (() => S),
	delay: number,
	maxWait = 0
): [S, Dispatch<SetStateAction<S>>] {
	const [state, setState] = useState(initialState);

	return [state, useDebouncedCallback(setState, [], delay, maxWait)];
}
