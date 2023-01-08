export interface QueueMethods<T> {
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
}
/**
 * A state hook implementing FIFO queue.
 *
 * @param initialValue The initial value. Defaults to an empty array.
 */
export declare function useQueue<T>(initialValue?: T[]): QueueMethods<T>;
