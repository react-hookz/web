import { useEffect, useMemo, useRef } from 'react';
import { useSafeState } from '../useSafeState/useSafeState';
import { useFirstMountState } from '../useFirstMountState/useFirstMountState';
import { useSyncedRef } from '../useSyncedRef/useSyncedRef';

export type IAsyncStatus = 'loading' | 'success' | 'error' | 'not-executed';

export type IAsyncState<Result> =
  | {
      status: 'not-executed';
      error: undefined;
      result: Result | undefined;
    }
  | {
      status: 'success';
      error: undefined;
      result: Result;
    }
  | {
      status: 'error';
      error: Error;
      result: Result | undefined;
    }
  | {
      status: IAsyncStatus;
      error: Error | undefined;
      result: Result | undefined;
    };

export interface IUseAsyncOptions<Result> {
  /**
   * Value that will be set on initialisation, before the async function is
   * executed.
   */
  initialValue?: Result;
  /**
   * Skip mount async function execution.
   */
  skipMount?: boolean;
  /**
   * Skip update async function execution.
   */
  skipUpdate?: boolean;
}

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
  promise: Promise<Result> | undefined;
  lastArgs: Args | undefined;
}

/**
 * Executes provided async function and tracks its result and error.
 *
 * @param asyncFn Function that returns a promise.
 * @param args Arguments list that will be passed to async function. Acts as
 *             dependencies list for underlying `useEffect` hook.
 * @param options Hook options.
 */
export function useAsync<Result, Args extends unknown[] = unknown[]>(
  asyncFn: (...params: Args) => Promise<Result>,
  args: Args,
  options?: IUseAsyncOptions<Result>
): [IAsyncState<Result>, IUseAsyncActions<Result, Args>, IUseAsyncMeta<Result, Args>] {
  const [state, setState] = useSafeState<IAsyncState<Result>>({
    status: 'not-executed',
    error: undefined,
    result: options?.initialValue,
  });
  const isFirstMount = useFirstMountState();
  const asyncFnRef = useSyncedRef(asyncFn);
  const promiseRef = useRef<Promise<Result>>();
  const argsRef = useRef<Args>();

  const methods = useSyncedRef({
    execute: (...params: Args) => {
      argsRef.current = params;
      promiseRef.current = asyncFn(...params);

      setState((s) => ({ ...s, status: 'loading' }));

      promiseRef.current.then(
        (result) => {
          // we dont want to handle result/error of non-latest function
          // this approach helps to avoid race conditions
          if (asyncFn === asyncFnRef.current) {
            setState((s) => ({ ...s, status: 'success', error: undefined, result }));
          }
        },
        (error) => {
          // we dont want to handle result/error of non-latest function
          // this approach helps to avoid race conditions
          if (asyncFn === asyncFnRef.current) {
            setState((s) => ({ ...s, status: 'error', error }));
          }
        }
      );

      return promiseRef.current;
    },
    reset: () => {
      setState({
        status: 'not-executed',
        error: undefined,
        result: options?.initialValue,
      });
      promiseRef.current = undefined;
      argsRef.current = undefined;
    },
  });

  useEffect(() => {
    if ((isFirstMount && !options?.skipMount) || !options?.skipUpdate) {
      methods.current.execute(...args);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, args);

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
