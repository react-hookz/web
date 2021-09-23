import { useMemo, useRef } from 'react';
import { IAsyncState, IUseAsyncActions, IUseAsyncMeta, useAsync } from '..';

export interface IUseAsyncAbortableActions<Result, Args extends unknown[] = unknown[]>
  extends IUseAsyncActions<Result, Args> {
  /**
   *  Abort currently running async.
   */
  abort: () => void;

  /**
   * Abort currently running async and reset state to initial, when async function haven't been executed.
   */
  reset: () => void;
}

export interface IUseAsyncAbortableMeta<Result, Args extends unknown[] = unknown[]>
  extends IUseAsyncMeta<Result, Args> {
  /**
   * Current abort controller. New one created each async execution.
   */
  abortController: AbortController | undefined;
}

export type IArgsWithAbortSignal<Args extends unknown[] = unknown[]> = [AbortSignal, ...Args];

export function useAsyncAbortable<Result, Args extends unknown[] = unknown[]>(
  asyncFn: (...params: IArgsWithAbortSignal<Args>) => Promise<Result>,
  initialValue: Result
): [
  IAsyncState<Result>,
  IUseAsyncAbortableActions<Result, Args>,
  IUseAsyncAbortableMeta<Result, Args>
];
export function useAsyncAbortable<Result, Args extends unknown[] = unknown[]>(
  asyncFn: (...params: IArgsWithAbortSignal<Args>) => Promise<Result>,
  initialValue?: Result
): [
  IAsyncState<Result | undefined>,
  IUseAsyncAbortableActions<Result, Args>,
  IUseAsyncAbortableMeta<Result, Args>
];

/**
 * Like `useAsync`, but also provides `AbortSignal` as first function argument to async function.
 *
 * @param asyncFn Function that returns a promise.
 * @param initialValue Value that will be set on initialisation, before the async function is
 * executed.
 */
export function useAsyncAbortable<Result, Args extends unknown[] = unknown[]>(
  asyncFn: (...params: IArgsWithAbortSignal<Args>) => Promise<Result>,
  initialValue?: Result
): [
  IAsyncState<Result | undefined>,
  IUseAsyncAbortableActions<Result, Args>,
  IUseAsyncAbortableMeta<Result, Args>
] {
  const abortController = useRef<AbortController>();

  const fn = async (...args: Args): Promise<Result> => {
    // abort previous async
    abortController.current?.abort();

    // create new controller for ongoing async call
    const ac = new AbortController();
    abortController.current = ac;

    // pass down abort signal and received arguments
    return asyncFn(ac.signal, ...args).finally(() => {
      // unset ref uf the call is last
      if (abortController.current === ac) {
        abortController.current = undefined;
      }
    });
  };

  const [state, asyncActions, asyncMeta] = useAsync<Result, Args>(fn, initialValue);

  return [
    state,
    useMemo(() => {
      const actions = {
        reset: () => {
          actions.abort();
          asyncActions.reset();
        },
        abort: () => {
          abortController.current?.abort();
        },
      };

      return {
        ...asyncActions,
        ...actions,
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
    { ...asyncMeta, abortController: abortController.current },
  ];
}
