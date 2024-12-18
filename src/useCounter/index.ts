import {type SetStateAction, useMemo} from 'react';
import {useMediatedState} from '../useMediatedState/index.js';
import {useSyncedRef} from '../useSyncedRef/index.js';
import {type InitialState, resolveHookState} from '../util/resolveHookState.js';

export type CounterActions = {
	/**
	 * Returns the current value of the counter.
	 */
	get: () => number;
	/**
	 * Increment the counter by the given `delta`.
	 *
	 * @param `delta` number or function returning a number. By default, `delta` is 1.
	 */
	inc: (delta?: SetStateAction<number>) => void;
	/**
	 * Decrement the counter by the given `delta`.
	 *
	 * @param `delta` number or function returning a number. By default, `delta` is 1.
	 */
	dec: (delta?: SetStateAction<number>) => void;
	/**
	 * Set the counter to any value, limited only by the `min` and `max` parameters of the hook.
	 *
	 * @param `value` number or function returning a number
	 */
	set: (value: SetStateAction<number>) => void;
	/**
	 * Resets the counter to its original initial value.
	 *
	 * If `value` is given, then it becomes the new initial value of the hook and
	 * following calls to `reset` without arguments will reset the counter to `value`.
	 *
	 * @param `value` number or function returning a number
	 */
	reset: (value?: SetStateAction<number>) => void;
};

/**
 * Tracks a numeric value.
 *
 * @param initialValue The initial value of the counter.
 * @param max The maximum value the counter is allowed to reach.
 *            If `initialValue` is greater than `max`, then `max` is set as the initial value.
 * @param min The minimum value the counter is allowed to reach.
 *            If `initialValue` is smaller than `min`, then `min` is set as the initial value.
 */
export function useCounter(
	initialValue: InitialState<number> = 0,
	max?: number,
	min?: number,
): [number, CounterActions] {
	const [state, setState] = useMediatedState(initialValue, (v: number): number => {
		if (max !== undefined) {
			v = Math.min(max, v);
		}

		if (min !== undefined) {
			v = Math.max(min, v);
		}

		return v;
	});
	const stateRef = useSyncedRef(state);

	return [
		state,
		useMemo<CounterActions>(
			() => ({
				get: () => stateRef.current,
				set: setState,
				dec(delta = 1) {
					setState(value => value - resolveHookState(delta, value));
				},
				inc(delta = 1) {
					setState(value => value + resolveHookState(delta, value));
				},
				reset(value = initialValue) {
					setState(v => resolveHookState(value, v));
				},
			}),
			[initialValue, setState, stateRef],
		),
	];
}
