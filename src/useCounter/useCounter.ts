import { SetStateAction, useMemo } from 'react';
import { useMediatedState, useSyncedRef } from '..';
import { IInitialState, resolveHookState } from '../util/resolveHookState';

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
export function useCounter(
  initialValue: IInitialState<number> = 0,
  max?: number,
  min?: number
): [number, CounterActions] {
  const [state, setState] = useMediatedState(initialValue, (v: number): number => {
    if (typeof max !== 'undefined') {
      v = Math.min(max, v);
    }

    if (typeof min !== 'undefined') {
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
        dec: (delta = 1) => {
          setState((val) => val - resolveHookState(delta, val));
        },
        inc: (delta = 1) => {
          setState((val) => val + resolveHookState(delta, val));
        },
        reset: (val = initialValue) => {
          setState((v) => resolveHookState(val, v));
        },
      }),
      [initialValue, setState, stateRef]
    ),
  ];
}
