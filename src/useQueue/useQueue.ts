import { useMemo } from 'react';
import { useList } from '../useList/useList';

export interface QueueMethods<T> {
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
}

/**
 * A state hook in the form of a first-in first-out (FIFO) queue.
 * @param initialValue The initial value. Defaults to an empty array.
 */
export const useQueue = <T>(initialValue: T[] = []): QueueMethods<T> => {
  const [list, { insertAt, removeAt }] = useList(initialValue);

  return useMemo(
    () => ({
      add: (value: T) => insertAt(list.length, value),
      remove: () => {
        const removed = list[0];
        removeAt(0);
        return removed;
      },
      get first() {
        return list[0];
      },
      get last() {
        return list[list.length - 1];
      },
      get size() {
        return list.length;
      },
    }),
    [list, insertAt, removeAt]
  );
};
