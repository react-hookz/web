import { DependencyList } from 'react';
export interface DebouncedFunction<Fn extends (...args: any[]) => any> {
    (this: ThisParameterType<Fn>, ...args: Parameters<Fn>): void;
}
/**
 * Makes passed function debounced, otherwise acts like `useCallback`.
 *
 * @param callback Function that will be debounced.
 * @param deps Dependencies list when to update callback.
 * @param delay Debounce delay.
 * @param maxWait The maximum time `callback` is allowed to be delayed before
 * it's invoked. 0 means no max wait.
 */
export declare function useDebouncedCallback<Fn extends (...args: any[]) => any>(callback: Fn, deps: DependencyList, delay: number, maxWait?: number): DebouncedFunction<Fn>;
