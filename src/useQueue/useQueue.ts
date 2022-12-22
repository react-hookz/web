import { useMemo } from 'react';
import { useList } from '../useList/useList';
import { useSyncedRef } from '../useSyncedRef/useSyncedRef';

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
 * A state hook in the form of a queue. Can be either first-in-first-out or last-in-last-out.
 * @param initialValue The initial value. Defaults to an empty array.
 * @param type 'fifo' | 'lilo' for  either first-in-first-out or last-in-last-out @default 'fifo'
 */
export const useQueue = <T>(
  initialValue: T[] = [],
  type: 'fifo' | 'lilo' = 'fifo'
): QueueMethods<T> => {
  const [list, { insertAt, removeAt }] = useList(initialValue);
  const isFifo = type === 'fifo';
  const listRef = useSyncedRef(list);

  return useMemo(
    () => ({
      add: (value: T) => insertAt(isFifo ? listRef.current.length : 0, value),
      remove: () => {
        const removedIndex = isFifo ? 0 : listRef.current.length - 1;
        const removed = listRef.current[removedIndex];
        removeAt(removedIndex);
        return removed;
      },
      get first() {
        return isFifo ? listRef.current[0] : listRef.current[listRef.current.length - 1];
      },
      get last() {
        return isFifo ? listRef.current[listRef.current.length - 1] : listRef.current[0];
      },
      get size() {
        return listRef.current.length;
      },
    }),
    [insertAt, listRef, removeAt, isFifo]
  );
};
