import { useMemo } from 'react';
import { useList } from '../useList/index.js';
import { useSyncedRef } from '../useSyncedRef/index.js';

export type QueueMethods<T> = {
	/**
	 * The entire queue.
	 */
	items: T[];
	/**
	 * The first item in the queue.
	 */
	first: T | undefined;
	/**
	 * The last item in the queue.
	 */
	last: T | undefined;
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
				const value = listRef.current[0];

				removeAt(0);

				return value;
			},
			get first() {
				return listRef.current.at(0);
			},
			get last() {
				return listRef.current.at(-1);
			},
			get size() {
				return listRef.current.length;
			},
			get items() {
				return listRef.current;
			},
		}),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	);
}
