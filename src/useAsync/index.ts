import { useMemo, useRef, useState } from 'react';
import { useSyncedRef } from '../useSyncedRef';

export type AsyncStatus = 'loading' | 'success' | 'error' | 'not-executed';

export type AsyncState<Result> =
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
			status: AsyncStatus;
			error: Error | undefined;
			result: Result;
	  };

export type UseAsyncActions<Result, Args extends unknown[] = unknown[]> = {
	/**
	 * Reset state to initial.
	 */
	reset: () => void;
	/**
	 * Execute the async function manually.
	 */
	execute: (...args: Args) => Promise<Result>;
};

export type UseAsyncMeta<Result, Args extends unknown[] = unknown[]> = {
	/**
	 * Latest promise returned from the async function.
	 */
	promise: Promise<Result> | undefined;
	/**
	 * List of arguments applied to the latest async function invocation.
	 */
	lastArgs: Args | undefined;
};

export function useAsync<Result, Args extends unknown[] = unknown[]>(
	asyncFn: (...params: Args) => Promise<Result>,
	initialValue: Result
): [AsyncState<Result>, UseAsyncActions<Result, Args>, UseAsyncMeta<Result, Args>];
export function useAsync<Result, Args extends unknown[] = unknown[]>(
	asyncFn: (...params: Args) => Promise<Result>,
	initialValue?: Result
): [AsyncState<Result | undefined>, UseAsyncActions<Result, Args>, UseAsyncMeta<Result, Args>];

/**
 * Tracks the result and errors of the provided async function and provides handles to control its execution.
 *
 * @param asyncFn Function that returns a promise.
 * @param initialValue Value that will be set on initialisation before the async function is
 * executed.
 */
export function useAsync<Result, Args extends unknown[] = unknown[]>(
	asyncFn: (...params: Args) => Promise<Result>,
	initialValue?: Result
): [AsyncState<Result | undefined>, UseAsyncActions<Result, Args>, UseAsyncMeta<Result, Args>] {
	const [state, setState] = useState<AsyncState<Result | undefined>>({
		status: 'not-executed',
		error: undefined,
		result: initialValue,
	});
	const promiseRef = useRef<Promise<Result>>();
	const argsRef = useRef<Args>();

	const methods = useSyncedRef({
		execute(...params: Args) {
			argsRef.current = params;
			const promise = asyncFn(...params);
			promiseRef.current = promise;

			setState((s) => ({ ...s, status: 'loading' }));

			// eslint-disable-next-line promise/catch-or-return
			promise.then(
				(result) => {
					// We dont want to handle result/error of non-latest function
					// this approach helps to avoid race conditions
					// eslint-disable-next-line promise/always-return
					if (promise === promiseRef.current) {
						setState((s) => ({ ...s, status: 'success', error: undefined, result }));
					}
				},
				(error: Error) => {
					// We dont want to handle result/error of non-latest function
					// this approach helps to avoid race conditions
					if (promise === promiseRef.current) {
						setState((s) => ({ ...s, status: 'error', error }));
					}
				}
			);

			return promise;
		},
		reset() {
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
				reset() {
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
