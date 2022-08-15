/* eslint-disable @typescript-eslint/no-explicit-any */
import { DependencyList, useMemo, useRef } from 'react';
import { useUnmountEffect } from '../useUnmountEffect/useUnmountEffect';

export interface DebouncedFunction<Fn extends (...args: any[]) => any> {
  (this: ThisParameterType<Fn>, ...args: Parameters<Fn>): void;
}

/**
 * Makes passed function debounced, otherwise acts like `useCallback`.
 *
 * @param callback Function that will be debounced.
 * @param deps Dependencies list when to update callback.
 * @param delay Debounce delay.
 * @param maxWait The maximum time `callback` is allowed to be delayed before
 * it's invoked. 0 means no max wait.
 */
export function useDebouncedCallback<Fn extends (...args: any[]) => any>(
  callback: Fn,
  deps: DependencyList,
  delay: number,
  maxWait = 0
): DebouncedFunction<Fn> {
  const timeout = useRef<ReturnType<typeof setTimeout>>();
  const waitTimeout = useRef<ReturnType<typeof setTimeout>>();
  const lastCall = useRef<{ args: Parameters<Fn>; this: ThisParameterType<Fn> }>();

  const clear = () => {
    if (timeout.current) {
      clearTimeout(timeout.current);
      timeout.current = undefined;
    }

    if (waitTimeout.current) {
      clearTimeout(waitTimeout.current);
      waitTimeout.current = undefined;
    }
  };

  // cancel scheduled execution on unmount
  useUnmountEffect(clear);

  return useMemo(
    () => {
      const execute = () => {
        // barely possible to test this line
        /* istanbul ignore next */
        if (!lastCall.current) return;

        const context = lastCall.current;
        lastCall.current = undefined;

        callback.apply(context.this, context.args);

        clear();
      };

      // eslint-disable-next-line func-names
      const wrapped = function (this, ...args) {
        if (timeout.current) {
          clearTimeout(timeout.current);
        }

        lastCall.current = { args, this: this };

        // plan regular execution
        timeout.current = setTimeout(execute, delay);

        // plan maxWait execution if required
        if (maxWait > 0 && !waitTimeout.current) {
          waitTimeout.current = setTimeout(execute, maxWait);
        }
      } as DebouncedFunction<Fn>;

      Object.defineProperties(wrapped, {
        length: { value: callback.length },
        name: { value: `${callback.name || 'anonymous'}__debounced__${delay}` },
      });

      return wrapped;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps,@typescript-eslint/no-unsafe-assignment
    [delay, maxWait, ...deps]
  );
}
