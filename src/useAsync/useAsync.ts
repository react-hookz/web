import { useMemo, useRef } from 'react';
import { useSafeState, useSyncedRef } from '..';

export type IAsyncStatus = 'loading' | 'success' | 'error' | 'not-executed';

export type IAsyncState<Result> =
  | {
      status: 'not-executed';
      error: undefined;
      result: Result;
    }
  | {
      status: 'success';
      error: undefined;
      result: Result;
    }
  | {
      status: 'error';
      error: Error;
      result: Result;
    }
  | {
      status: IAsyncStatus;
      error: Error | undefined;
      result: Result;
    };

export interface IUseAsyncActions<Result, Args extends unknown[] = unknown[]> {
  /**
   * Reset state to initial, when async function haven't been executed.
   */
  reset: () => void;
  /**
   * Execute async function manually.
   */
  execute: (...args: Args) => Promise<Result>;
}

export interface IUseAsyncMeta<Result, Args extends unknown[] = unknown[]> {
  /**
   * Recent promise returned from async function.
   */
  promise: Promise<Result> | undefined;
  /**
   * List of arguments applied to recent async function invocation.
   */
  lastArgs: Args | undefined;
}

export function useAsync<Result, Args extends unknown[] = unknown[]>(
  asyncFn: (...params: Args) => Promise<Result>,
  initialValue: Result
): [IAsyncState<Result>, IUseAsyncActions<Result, Args>, IUseAsyncMeta<Result, Args>];
export function useAsync<Result, Args extends unknown[] = unknown[]>(
  asyncFn: (...params: Args) => Promise<Result>,
  initialValue?: Result
): [IAsyncState<Result | undefined>, IUseAsyncActions<Result, Args>, IUseAsyncMeta<Result, Args>];

/**
 * Tracks result and error of provided async function and provides handles to execute and reset it.
 *
 * @param asyncFn Function that returns a promise.
 * @param initialValue Value that will be set on initialisation, before the async function is
 * executed.
 */
export function useAsync<Result, Args extends unknown[] = unknown[]>(
  asyncFn: (...params: Args) => Promise<Result>,
  initialValue?: Result
): [IAsyncState<Result | undefined>, IUseAsyncActions<Result, Args>, IUseAsyncMeta<Result, Args>] {
  const [state, setState] = useSafeState<IAsyncState<Result | undefined>>({
    status: 'not-executed',
    error: undefined,
    result: initialValue,
  });
  const promiseRef = useRef<Promise<Result>>();
  const argsRef = useRef<Args>();

  const methods = useSyncedRef({
    execute: (...params: Args) => {
      argsRef.current = params;
      const promise = asyncFn(...params);
      promiseRef.current = promise;

      setState((s) => ({ ...s, status: 'loading' }));

      // eslint-disable-next-line promise/catch-or-return
      promise.then(
        (result) => {
          // we dont want to handle result/error of non-latest function
          // this approach helps to avoid race conditions
          // eslint-disable-next-line promise/always-return
          if (promise === promiseRef.current) {
            setState((s) => ({ ...s, status: 'success', error: undefined, result }));
          }
        },
        (error: Error) => {
          // we dont want to handle result/error of non-latest function
          // this approach helps to avoid race conditions
          if (promise === promiseRef.current) {
            setState((s) => ({ ...s, status: 'error', error }));
          }
        }
      );

      return promise;
    },
    reset: () => {
      setState({
        status: 'not-executed',
        error: undefined,
        result: initialValue,
      });
      promiseRef.current = undefined;
      argsRef.current = undefined;
    },
  });

  return [
    state,
    useMemo(
      () => ({
        reset: () => {
          methods.current.reset();
        },
        execute: (...params: Args) => methods.current.execute(...params),
      }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      []
    ),
    { promise: promiseRef.current, lastArgs: argsRef.current },
  ];
}
