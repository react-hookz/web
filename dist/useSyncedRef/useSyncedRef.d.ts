/**
 * Like `useRef`, but it returns immutable ref that contains actual value.
 *
 * @param value
 */
export declare function useSyncedRef<T>(value: T): {
    readonly current: T;
};
