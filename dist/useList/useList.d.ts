import { SetStateAction } from 'react';
import { InitialState } from '../util/resolveHookState';
export interface ListActions<T> {
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
}
export declare function useList<T>(initialList: InitialState<T[]>): [T[], ListActions<T>];
