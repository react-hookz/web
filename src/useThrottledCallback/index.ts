import { type DependencyList, useMemo, useRef } from 'react';
import { useUnmountEffect } from '../useUnmountEffect';

export type ThrottledFunction<Fn extends (...args: any[]) => any> = (
  this: ThisParameterType<Fn>,
  ...args: Parameters<Fn>
) => void;

/**
 * Makes passed function throttled, otherwise acts like `useCallback`.
 *
 * @param callback Function that will be throttled.
 * @param deps Dependencies list when to update callback.
 * @param delay Throttle delay.
 * @param noTrailing If `noTrailing` is true, callback will only execute every
 * `delay` milliseconds, otherwise, callback will be executed one final time
 * after the last throttled-function call.
 */
export function useThrottledCallback<Fn extends (...args: any[]) => any>(
  callback: Fn,
  deps: DependencyList,
  delay: number,
  noTrailing = false
): ThrottledFunction<Fn> {
  const timeout = useRef<ReturnType<typeof setTimeout>>();
  const lastCall = useRef<{ args: Parameters<Fn>; this: ThisParameterType<Fn> }>();

  useUnmountEffect(() => {
    if (timeout.current) {
      clearTimeout(timeout.current);
      timeout.current = undefined;
    }
  });

  return useMemo(() => {
    const execute = (context: ThisParameterType<Fn>, args: Parameters<Fn>) => {
      lastCall.current = undefined;
      callback.apply(context, args);

      timeout.current = setTimeout(() => {
        timeout.current = undefined;

        // If trailing execution is not disabled - call callback with last
        // received arguments and context
        if (!noTrailing && lastCall.current) {
          execute(lastCall.current.this, lastCall.current.args);

          lastCall.current = undefined;
        }
      }, delay);
    };

    const wrapped = function (this, ...args) {
      if (timeout.current) {
        // If we cant execute callback immediately - save its arguments and
        // context to execute it when delay is passed
        lastCall.current = { args, this: this };

        return;
      }

      execute(this, args);
    } as ThrottledFunction<Fn>;

    Object.defineProperties(wrapped, {
      length: { value: callback.length },
      name: { value: `${callback.name || 'anonymous'}__throttled__${delay}` },
    });

    return wrapped;
  }, [delay, noTrailing, ...deps]);
}
