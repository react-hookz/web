import { useMemo } from 'react';
import { useList } from '../useList';
import { useSyncedRef } from '../useSyncedRef';

export type QueueMethods<T> = {
  /**
   * The entire queue.
   */
  items: T[];
  /**
   * The first item in the queue.
   */
  first: T;
  /**
   * The last item in the queue.
   */
  last: T;
  /**
   * Adds an item to the end of the queue.
   * @param item The item to be added.
   */
  add: (item: T) => void;
  /**
   * Removes and returns the head of the queue.
   */
  remove: () => T;
  /**
   * The current size of the queue.
   */
  size: number;
};

/**
 * A state hook implementing FIFO queue.
 *
 * @param initialValue The initial value. Defaults to an empty array.
 */
export function useQueue<T>(initialValue: T[] = []): QueueMethods<T> {
  const [list, { removeAt, push }] = useList(initialValue);
  const listRef = useSyncedRef(list);

  return useMemo(
    () => ({
      add(value: T) {
        push(value);
      },
      remove() {
        const val = listRef.current[0];

        removeAt(0);

        return val;
      },
      get first() {
        return listRef.current[0];
      },
      get last() {
        return listRef.current[listRef.current.length - 1];
      },
      get size() {
        return listRef.current.length;
      },
      get items() {
        return listRef.current;
      },
    }),

    []
  );
}
