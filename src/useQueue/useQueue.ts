import { useMemo } from 'react';
import { useList } from '../useList/useList';

export interface QueueMethods<T> {
  /**
   * Function for adding an item to to the queue
   * @param item The item to be added
   */
  add: (item: T) => void;
  /**
   * Function to remove and return an item from the queue
   */
  remove: () => T;
  /**
   * The first item in current queue
   */
  first: T;
  /**
   * The last item in current queue
   */
  last: T;
  /**
   * The current size of te queue
   */
  size: number;
}

/**
 * A react state hook implements a simple first-in first-out (FIFO) queue.
 * @param initialValue an array for the initial value of the queue
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
