import { useRef, useState } from 'react';
import { useUpdateEffect } from '..';
import { isStrictEqual } from '../util/const';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Predicate = (prev: any, next: any) => boolean;

/**
 * Returns the most recent _distinct_ value passed to the hook on previous render. Distinct here
 * means that the hook's return value will only update when the passed value updates. This is
 * useful when other renders are involved potentially making multiple, irrelevant updates.
 *
 * Yields `undefined` on first render.
 *
 * @param value Value to yield on next render if it's different from the previous one.
 * @param predicate Optional predicate to determine if the value is distinct. If not provided,
 * the value will be updated if it is strictly equal (`===`) to the previous value.
 */
export function usePreviousDistinct<T>(
  value: T,
  predicate: Predicate = isStrictEqual
): T | undefined {
  const [previousState, setPreviousState] = useState<T>();
  const currentRef = useRef<T>(value);

  useUpdateEffect(() => {
    if (!predicate(currentRef.current, value)) {
      setPreviousState(currentRef.current);
      currentRef.current = value;
    }
  }, [value]);

  return previousState;
}
