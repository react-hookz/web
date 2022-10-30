import { useMemo, useRef } from 'react';

/**
 * Like `useRef`, but it returns immutable ref that contains actual value.
 *
 * @param value
 */
export function useSyncedRef<T>(value: T): { readonly current: T } {
  const ref = useRef(value);

  ref.current = value;

  return useMemo(
    () =>
      Object.freeze({
        get current() {
          return ref.current;
        },
      }),
    []
  );
}
