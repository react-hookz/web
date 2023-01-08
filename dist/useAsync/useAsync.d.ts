export type AsyncStatus = 'loading' | 'success' | 'error' | 'not-executed';
export type AsyncState<Result> = {
    status: 'not-executed';
    error: undefined;
    result: Result;
} | {
    status: 'success';
    error: undefined;
    result: Result;
} | {
    status: 'error';
    error: Error;
    result: Result;
} | {
    status: AsyncStatus;
    error: Error | undefined;
    result: Result;
};
export interface UseAsyncActions<Result, Args extends unknown[] = unknown[]> {
    /**
     * Reset state to initial.
     */
    reset: () => void;
    /**
     * Execute the async function manually.
     */
    execute: (...args: Args) => Promise<Result>;
}
export interface UseAsyncMeta<Result, Args extends unknown[] = unknown[]> {
    /**
     * Latest promise returned from the async function.
     */
    promise: Promise<Result> | undefined;
    /**
     * List of arguments applied to the latest async function invocation.
     */
    lastArgs: Args | undefined;
}
export declare function useAsync<Result, Args extends unknown[] = unknown[]>(asyncFn: (...params: Args) => Promise<Result>, initialValue: Result): [AsyncState<Result>, UseAsyncActions<Result, Args>, UseAsyncMeta<Result, Args>];
export declare function useAsync<Result, Args extends unknown[] = unknown[]>(asyncFn: (...params: Args) => Promise<Result>, initialValue?: Result): [AsyncState<Result | undefined>, UseAsyncActions<Result, Args>, UseAsyncMeta<Result, Args>];
