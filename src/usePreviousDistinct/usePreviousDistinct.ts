import { useRef } from 'react';
import { useFirstMountState } from '..';

export type Predicate<T> = (prev: T | undefined, next: T) => boolean;

const checkIfStrictlyEqual = <T>(prev: T | undefined, next: T) => prev === next;

/**
 * Returns the most recent _distinct_ value passed to the hook on previous render. Distinct here
 * means that the hook's return value will only update when the passed value updates. This is
 * useful when other renders are involved potentially making multiple, irrelavant updates.
 *
 * Yields `undefined` on first render.
 *
 * @param value Value to yield on next render
 */
export function usePreviousDistinct<T>(
  value: T,
  compare: Predicate<T> = checkIfStrictlyEqual
): T | undefined {
  const previousRef = useRef<T>();
  const currentRef = useRef<T>(value);
  const isFirstMount = useFirstMountState();

  if (!isFirstMount && !compare(currentRef.current, value)) {
    previousRef.current = currentRef.current;
    currentRef.current = value;
  }

  return previousRef.current;
}
