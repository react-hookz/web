import { useState } from 'react';

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
 * A react state hook implements simple first-in first-out (FIFO) queue.
 * @param initialValue an array for the initial value of the queue
 */
export const useQueue = <T>(initialValue: T[] = []): QueueMethods<T> => {
  const [state, set] = useState(initialValue);
  return {
    add: (value) => {
      set((queue) => [...queue, value]);
    },
    remove: () => {
      const result = state[0];
      set((current) => current.slice(1, current.length));
      return result;
    },
    get first() {
      return state[0];
    },
    get last() {
      return state[state.length - 1];
    },
    get size() {
      return state.length;
    },
  };
};
