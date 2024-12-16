import { type SetStateAction, useMemo, useRef } from 'react';
import { useRerender } from '../useRerender/index.js';
import { useSyncedRef } from '../useSyncedRef/index.js';
import { type InitialState, resolveHookState } from '../util/resolveHookState.js';

export type ListActions<T> = {
	/**
	 * Replaces the current list.
	 */
	set: (newList: SetStateAction<T[]>) => void;

	/**
	 * Adds an item or items to the end of the list.
	 */
	push: (...items: T[]) => void;

	/**
	 * Replaces the item at the given index of the list. If the given index is out of bounds, empty
	 * elements are appended to the list until the given item can be set to the given index.
	 */
	updateAt: (index: number, newItem: T) => void;

	/**
	 * Inserts an item at the given index of the list. All items following the given index are shifted
	 * one position. If the given index is out of bounds, empty elements are appended to the list until
	 * the given item can be set to the given index.
	 */
	insertAt: (index: number, item: T) => void;

	/**
	 * Replaces all items of the list that match the given predicate with the given item.
	 */
	update: (predicate: (iteratedItem: T, newItem: T) => boolean, newItem: T) => void;

	/**
	 * Replaces the first item of the list that matches the given predicate with the given item.
	 */
	updateFirst: (predicate: (iteratedItem: T, newItem: T) => boolean, newItem: T) => void;

	/**
	 * Replaces the first item of the list that matches the given predicate with the given item. If
	 * none of the items match the predicate, the given item is pushed to the list.
	 */
	upsert: (predicate: (iteratedItem: T, newItem: T) => boolean, newItem: T) => void;

	/**
	 * Sorts the list with the given sorting function. If no sorting function is given, the default
	 * Array.prototype.sort() sorting is used.
	 */
	sort: (compareFn?: (a: T, b: T) => number) => void;

	/**
	 * Filters the list with the given filter function.
	 */
	// We're allowing the type of thisArg to be any, because we are following the Array.prototype.filter API.

	filter: (callbackFn: (value: T, index?: number, array?: T[]) => boolean, thisArg?: any) => void;

	/**
	 * Removes the item at the given index of the list. All items following the given index will be
	 * shifted. If the given index is out of the bounds of the list, the list will not be modified,
	 * but a rerender will occur.
	 */
	removeAt: (index: number) => void;

	/**
	 * Deletes all items of the list.
	 */
	clear: () => void;

	/**
	 * Replaces the current list with the initial list given to this hook.
	 */
	reset: () => void;
};

export function useList<T>(initialList: InitialState<T[]>): [T[], ListActions<T>] {
	const initial = useSyncedRef(initialList);
	const list = useRef(resolveHookState(initial.current));
	const rerender = useRerender();

	const actions = useMemo(
		() => ({
			set(newList: SetStateAction<T[]>) {
				list.current = resolveHookState(newList, list.current);
				rerender();
			},

			push(...items: T[]) {
				actions.set((currentList: T[]) => [...currentList, ...items]);
			},

			updateAt(index: number, newItem: T) {
				actions.set((currentList: T[]) => {
					const listCopy = [...currentList];
					listCopy[index] = newItem;
					return listCopy;
				});
			},

			insertAt(index: number, newItem: T) {
				actions.set((currentList: T[]) => {
					const listCopy = [...currentList];

					if (index >= listCopy.length) {
						listCopy[index] = newItem;
					} else {
						listCopy.splice(index, 0, newItem);
					}

					return listCopy;
				});
			},

			update(predicate: (iteratedItem: T, newItem: T) => boolean, newItem: T) {
				actions.set((currentList: T[]) =>
					currentList.map((item: T) => (predicate(item, newItem) ? newItem : item))
				);
			},

			updateFirst(predicate: (iteratedItem: T, newItem: T) => boolean, newItem: T) {
				const indexOfMatch = list.current.findIndex((item: T) => predicate(item, newItem));

				const NO_MATCH = -1;
				if (indexOfMatch > NO_MATCH) {
					actions.updateAt(indexOfMatch, newItem);
				}
			},

			upsert(predicate: (iteratedItem: T, newItem: T) => boolean, newItem: T) {
				const indexOfMatch = list.current.findIndex((item: T) => predicate(item, newItem));

				const NO_MATCH = -1;
				if (indexOfMatch > NO_MATCH) {
					actions.updateAt(indexOfMatch, newItem);
				} else {
					actions.push(newItem);
				}
			},

			sort(compareFn?: (a: T, b: T) => number) {
				actions.set((currentList: T[]) => [...currentList].sort(compareFn));
			},

			filter(callbackFn: (value: T, index: number, array: T[]) => boolean, thisArg?: never) {
				// eslint-disable-next-line unicorn/no-array-callback-reference,unicorn/no-array-method-this-argument
				actions.set((currentList: T[]) => [...currentList].filter(callbackFn, thisArg));
			},

			removeAt(index: number) {
				actions.set((currentList: T[]) => {
					const listCopy = [...currentList];
					if (index < listCopy.length) {
						listCopy.splice(index, 1);
					}

					return listCopy;
				});
			},

			clear() {
				actions.set([]);
			},

			reset() {
				actions.set([...resolveHookState(initial.current)]);
			},
		}),
		[initial, rerender]
	);

	return [list.current, actions];
}
