import { SetStateAction } from 'react';
import { InitialState } from '../util/resolveHookState';
export interface CounterActions {
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
}
/**
 * Tracks a numeric value.
 *
 * @param initialValue The initial value of the counter.
 * @param max The maximum value the counter is allowed to reach.
 *            If `initialValue` is greater than `max`, then `max` is set as the initial value.
 * @param min The minimum value the counter is allowed to reach.
 *            If `initialValue` is smaller than `min`, then `min` is set as the initial value.
 */
export declare function useCounter(initialValue?: InitialState<number>, max?: number, min?: number): [number, CounterActions];
