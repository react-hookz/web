import { useMemo } from 'react';
import { useList } from "../useList/useList.js";
import { useSyncedRef } from "../useSyncedRef/useSyncedRef.js";
/**
 * A state hook implementing FIFO queue.
 *
 * @param initialValue The initial value. Defaults to an empty array.
 */
export function useQueue(initialValue = []) {
    const [list, { removeAt, push }] = useList(initialValue);
    const listRef = useSyncedRef(list);
    return useMemo(() => ({
        add: (value) => push(value),
        remove: () => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);
}
