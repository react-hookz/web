/**
 * Tracks the state of a `Map`.
 *
 * @param entries Initial entries iterator for underlying `Map` constructor.
 */
export declare function useMap<K = any, V = any>(entries?: readonly (readonly [K, V])[] | null): Map<K, V>;
