import { AsyncState, UseAsyncActions, UseAsyncMeta } from '../useAsync/useAsync';
export interface UseAsyncAbortableActions<Result, Args extends unknown[] = unknown[]> extends UseAsyncActions<Result, Args> {
    /**
     *  Abort the currently running async function invocation.
     */
    abort: () => void;
    /**
     * Abort the currently running async function invocation and reset state to initial.
     */
    reset: () => void;
}
export interface UseAsyncAbortableMeta<Result, Args extends unknown[] = unknown[]> extends UseAsyncMeta<Result, Args> {
    /**
     * Currently used `AbortController`. New one is created on each execution of the async function.
     */
    abortController: AbortController | undefined;
}
export type ArgsWithAbortSignal<Args extends unknown[] = unknown[]> = [AbortSignal, ...Args];
export declare function useAsyncAbortable<Result, Args extends unknown[] = unknown[]>(asyncFn: (...params: ArgsWithAbortSignal<Args>) => Promise<Result>, initialValue: Result): [
    AsyncState<Result>,
    UseAsyncAbortableActions<Result, Args>,
    UseAsyncAbortableMeta<Result, Args>
];
export declare function useAsyncAbortable<Result, Args extends unknown[] = unknown[]>(asyncFn: (...params: ArgsWithAbortSignal<Args>) => Promise<Result>, initialValue?: Result): [
    AsyncState<Result | undefined>,
    UseAsyncAbortableActions<Result, Args>,
    UseAsyncAbortableMeta<Result, Args>
];
