import { useMemo, useRef } from 'react';
import { resolveHookState } from "../util/resolveHookState.js";
import { useRerender } from "../useRerender/useRerender.js";
import { useSyncedRef } from "../useSyncedRef/useSyncedRef.js";
export function useList(initialList) {
    const initial = useSyncedRef(initialList);
    const list = useRef(resolveHookState(initial.current));
    const rerender = useRerender();
    const actions = useMemo(() => ({
        set: (newList) => {
            list.current = resolveHookState(newList, list.current);
            rerender();
        },
        push: (...items) => {
            actions.set((currentList) => [...currentList, ...items]);
        },
        updateAt: (index, newItem) => {
            actions.set((currentList) => {
                const listCopy = [...currentList];
                listCopy[index] = newItem;
                return listCopy;
            });
        },
        insertAt: (index, newItem) => {
            actions.set((currentList) => {
                const listCopy = [...currentList];
                if (index >= listCopy.length) {
                    listCopy[index] = newItem;
                }
                else {
                    listCopy.splice(index, 0, newItem);
                }
                return listCopy;
            });
        },
        update: (predicate, newItem) => {
            actions.set((currentList) => currentList.map((item) => (predicate(item, newItem) ? newItem : item)));
        },
        updateFirst: (predicate, newItem) => {
            const indexOfMatch = list.current.findIndex((item) => predicate(item, newItem));
            const NO_MATCH = -1;
            if (indexOfMatch > NO_MATCH) {
                actions.updateAt(indexOfMatch, newItem);
            }
        },
        upsert: (predicate, newItem) => {
            const indexOfMatch = list.current.findIndex((item) => predicate(item, newItem));
            const NO_MATCH = -1;
            if (indexOfMatch > NO_MATCH) {
                actions.updateAt(indexOfMatch, newItem);
            }
            else {
                actions.push(newItem);
            }
        },
        sort: (compareFn) => {
            actions.set((currentList) => [...currentList].sort(compareFn));
        },
        filter: (callbackFn, thisArg) => {
            /*
             We're implementing filter based on the Array.prototype.filter API, thus the API is not going
             to change, and we can turn off the no-array-callback-reference rule. Also, the filter API
             requires the thisArg, so we can turn off the no-array-method-this-argument-rule.
            */
            // eslint-disable-next-line unicorn/no-array-callback-reference, unicorn/no-array-method-this-argument
            actions.set((currentList) => [...currentList].filter(callbackFn, thisArg));
        },
        removeAt: (index) => {
            actions.set((currentList) => {
                const listCopy = [...currentList];
                if (index < listCopy.length) {
                    listCopy.splice(index, 1);
                }
                return listCopy;
            });
        },
        clear: () => actions.set([]),
        reset: () => actions.set([...resolveHookState(initial.current)]),
    }), [initial, rerender]);
    return [list.current, actions];
}
