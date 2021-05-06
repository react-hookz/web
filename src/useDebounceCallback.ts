import { DependencyList, useMemo, useRef } from 'react';

/**
 * Makes passed function debounced, otherwise acts like `useCallback`.
 *
 * @param cb Function that will be debounced.
 * @param delay Debounce delay.
 * @param deps Dependencies list when to update callback.
 */
export function useDebounceCallback<T extends unknown[]>(
  cb: (...args: T) => unknown,
  delay: number,
  deps: DependencyList
): (...args: T) => void {
  const timeout = useRef<ReturnType<typeof setTimeout>>();

  return useMemo(
    () => (...args: T): void => {
      if (timeout.current) clearTimeout(timeout.current);

      timeout.current = setTimeout(() => {
        timeout.current = undefined;

        cb(...args);
      }, delay);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [delay, ...deps]
  );
}
