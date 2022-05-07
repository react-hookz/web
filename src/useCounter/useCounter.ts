import { SetStateAction, useCallback, useRef } from 'react';
import { IInitialState, resolveHookState } from '../util/resolveHookState';
import { useSafeState, useSyncedRef } from '..';

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
  const resolvedInitialValue = resolveHookState(initialValue);

  const fitInRange = useCallback(
    (value: number) => {
      let fittedValue = value;

      if (typeof max !== 'undefined') {
        fittedValue = Math.min(max, fittedValue);
      }

      if (typeof min !== 'undefined') {
        fittedValue = Math.max(min, fittedValue);
      }

      return fittedValue;
    },
    [max, min]
  );

  const init = useRef(fitInRange(resolvedInitialValue));

  const [counter, setCounter] = useSafeState(init.current);
  const counterRef = useSyncedRef(counter);

  const get = useCallback(() => counterRef.current, [counterRef]);

  const set = useCallback(
    (value: SetStateAction<number>) => {
      const resolvedValue = resolveHookState(value, counterRef.current);
      setCounter(fitInRange(resolvedValue));
    },
    [counterRef, fitInRange, setCounter]
  );

  const inc = useCallback(
    (delta: SetStateAction<number> = 1) => {
      const resolvedDelta = resolveHookState(delta, counterRef.current);
      set((prevState) => prevState + resolvedDelta);
    },
    [counterRef, set]
  );

  const dec = useCallback(
    (delta: SetStateAction<number> = 1) => {
      const resolvedDelta = resolveHookState(delta, counterRef.current);
      set((prevState) => prevState - resolvedDelta);
    },
    [counterRef, set]
  );

  const reset = useCallback(
    (value: SetStateAction<number> = init.current) => {
      const resolvedValue = resolveHookState(value, counterRef.current);
      const fittedResolvedValue = fitInRange(resolvedValue);
      init.current = fittedResolvedValue;
      set(fittedResolvedValue);
    },
    [counterRef, fitInRange, set]
  );

  const counterActions: CounterActions = { get, inc, dec, set, reset };

  return [counter, counterActions];
}
