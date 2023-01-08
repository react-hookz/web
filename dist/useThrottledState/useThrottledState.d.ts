import { Dispatch, SetStateAction } from 'react';
/**
 * Like `useSafeState` but its state setter is throttled.
 *
 * @param initialState Initial state to pass to underlying `useSafeState`.
 * @param delay Throttle delay.
 * @param noTrailing If `noTrailing` is true, callback will only execute every
 * `delay` milliseconds, otherwise, callback will be executed one final time
 * after the last throttled-function call.
 */
export declare function useThrottledState<S>(initialState: S | (() => S), delay: number, noTrailing?: boolean): [S, Dispatch<SetStateAction<S>>];
