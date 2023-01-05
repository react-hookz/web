import { useRef } from 'react';
import { useRerender } from '../useRerender';

const proto = Set.prototype;

/**
 * Tracks the state of a `Set`.
 *
 * @param values Initial values iterator for underlying `Set` constructor.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useSet<T = any>(values?: readonly T[] | null): Set<T> {
  const setRef = useRef<Set<T>>();
  const rerender = useRerender();

  if (!setRef.current) {
    const set = new Set<T>(values);

    setRef.current = set;

    set.add = (...args) => {
      proto.add.apply(set, args);
      rerender();
      return set;
    };

    set.clear = (...args) => {
      proto.clear.apply(set, args);
      rerender();
    };

    set.delete = (...args) => {
      const res = proto.delete.apply(set, args);
      rerender();

      return res;
    };
  }

  return setRef.current;
}
