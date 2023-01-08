import { Dispatch, SetStateAction } from 'react';
/**
 * Like `useSafeState` but its state setter is debounced.
 *
 * @param initialState Initial state to pass to underlying `useSafeState`.
 * @param delay Debounce delay.
 * @param maxWait Maximum amount of milliseconds that function can be delayed
 * before it's force execution. 0 means no max wait.
 */
export declare function useDebouncedState<S>(initialState: S | (() => S), delay: number, maxWait?: number): [S, Dispatch<SetStateAction<S>>];
