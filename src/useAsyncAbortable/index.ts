import { useMemo, useRef } from 'react';
import { type AsyncState, useAsync, type UseAsyncActions, type UseAsyncMeta } from '../useAsync';

export type UseAsyncAbortableActions<Result, Args extends unknown[] = unknown[]> = {
	/**
	 *  Abort the currently running async function invocation.
	 */
	abort: () => void;

	/**
	 * Abort the currently running async function invocation and reset state to initial.
	 */
	reset: () => void;
} & UseAsyncActions<Result, Args>;

export type UseAsyncAbortableMeta<Result, Args extends unknown[] = unknown[]> = {
	/**
	 * Currently used `AbortController`. New one is created on each execution of the async function.
	 */
	abortController: AbortController | undefined;
} & UseAsyncMeta<Result, Args>;

export type ArgsWithAbortSignal<Args extends unknown[] = unknown[]> = [AbortSignal, ...Args];

export function useAsyncAbortable<Result, Args extends unknown[] = unknown[]>(
	asyncFn: (...params: ArgsWithAbortSignal<Args>) => Promise<Result>,
	initialValue: Result
): [
	AsyncState<Result>,
	UseAsyncAbortableActions<Result, Args>,
	UseAsyncAbortableMeta<Result, Args>
];
export function useAsyncAbortable<Result, Args extends unknown[] = unknown[]>(
	asyncFn: (...params: ArgsWithAbortSignal<Args>) => Promise<Result>,
	initialValue?: Result
): [
	AsyncState<Result | undefined>,
	UseAsyncAbortableActions<Result, Args>,
	UseAsyncAbortableMeta<Result, Args>
];

/**
 * Like `useAsync`, but also provides `AbortSignal` as the first argument to the async function.
 *
 * @param asyncFn Function that returns a promise.
 * @param initialValue Value that will be set on initialisation before the async function is
 * executed.
 */
export function useAsyncAbortable<Result, Args extends unknown[] = unknown[]>(
	asyncFn: (...params: ArgsWithAbortSignal<Args>) => Promise<Result>,
	initialValue?: Result
): [
	AsyncState<Result | undefined>,
	UseAsyncAbortableActions<Result, Args>,
	UseAsyncAbortableMeta<Result, Args>
] {
	const abortController = useRef<AbortController>();

	const fn = async (...args: Args): Promise<Result> => {
		// Abort previous async
		abortController.current?.abort();

		// Create new controller for ongoing async call
		const ac = new AbortController();
		abortController.current = ac;

		// Pass down abort signal and received arguments
		return asyncFn(ac.signal, ...args).finally(() => {
			// Unset ref uf the call is last
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
				reset() {
					actions.abort();
					asyncActions.reset();
				},
				abort() {
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
