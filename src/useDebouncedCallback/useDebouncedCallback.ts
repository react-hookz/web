/* eslint-disable @typescript-eslint/no-explicit-any */
import { DependencyList, useMemo, useRef } from 'react';

/**
 * Makes passed function debounced, otherwise acts like `useCallback`.
 *
 * @param cb Function that will be debounced.
 * @param delay Debounce delay.
 * @param deps Dependencies list when to update callback.
 */
export function useDebouncedCallback<T extends (...args: any[]) => any>(
  cb: T,
  delay: number,
  deps: DependencyList
): (...args: Parameters<T>) => void {
  const timeout = useRef<ReturnType<typeof setTimeout>>();
  return useMemo(
    () => {
      // eslint-disable-next-line func-names
      const debounced = function (...args: Parameters<T>): void {
        if (timeout.current) clearTimeout(timeout.current);

        timeout.current = setTimeout(() => {
          timeout.current = undefined;

          cb(...args);
        }, delay);
      };

      Object.defineProperties(debounced, {
        length: { value: cb.length },
        name: { value: `${cb.name || 'anonymous'}__debounced__${delay}` },
      });

      return debounced;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [delay, ...deps]
  );
}
