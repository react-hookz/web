/* eslint-disable @typescript-eslint/no-explicit-any */
import { DependencyList, useMemo, useRef } from 'react';
import { useUnmountEffect } from '..';

export interface IThrottledFunction<Args extends any[], This> {
  (this: This, ...args: Args): void;
}

/**
 * Makes passed function throttled, otherwise acts like `useCallback`.
 *
 * @param callback Function that will be throttled.
 * @param deps Dependencies list when to update callback.
 * @param delay Throttle delay.
 * @param noTrailing If noTrailing is true, callback will only execute every
 * `delay` milliseconds, otherwise, callback will be executed one final time
 * after the last throttled-function call.
 */
export function useThrottledCallback<Args extends any[], This>(
  callback: (this: This, ...args: Args) => any,
  deps: DependencyList,
  delay: number,
  noTrailing = false
): IThrottledFunction<Args, This> {
  const timeout = useRef<ReturnType<typeof setTimeout>>();
  const lastCall = useRef<{ args: Args; this: This }>();

  useUnmountEffect(() => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
  });

  return useMemo(() => {
    const execute = (context: This, args: Args) => {
      lastCall.current = undefined;
      callback.apply(context, args);

      timeout.current = setTimeout(() => {
        timeout.current = undefined;

        // if trailing execution is not disabled - call callback with last
        // received arguments and context
        if (!noTrailing && lastCall.current) {
          execute(lastCall.current.this, lastCall.current.args);

          lastCall.current = undefined;
        }
      }, delay);
    };

    // eslint-disable-next-line func-names
    const wrapped = function (this, ...args) {
      if (timeout.current) {
        // if we cant execute callback immediately - save its arguments and
        // context to execute it when delay is passed
        lastCall.current = { args, this: this };

        return;
      }

      execute(this, args);
    } as IThrottledFunction<Args, This>;

    Object.defineProperties(wrapped, {
      length: { value: callback.length },
      name: { value: `${callback.name || 'anonymous'}__throttled__${delay}` },
    });

    return wrapped;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay, noTrailing, ...deps]);
}
