import {act, renderHook} from '@ver0/react-hooks-testing';
import {describe, expect, it, vi} from 'vitest';
import {useAsync} from '../index.js';
import {expectResultValue} from '../util/testing/test-helpers.js';

function getControllableAsync<Resp, Args extends unknown[] = unknown[]>() {
	const resolve: {current: undefined | ((result: Resp) => void)} = {current: undefined};
	const reject: {current: undefined | ((err: Error) => void)} = {current: undefined};

	return [
		vi.fn(
			async (..._args: Args) =>
				// eslint-disable-next-line promise/param-names
				new Promise<Resp>((reslv, rej) => {
					resolve.current = reslv;
					reject.current = rej;
				}),
		),
		resolve,
		reject,
	] as const;
}

describe('useAsync', () => {
	it('should be defined', async () => {
		expect(useAsync).toBeDefined();
	});

	it('should render', async () => {
		const {result} = await renderHook(() => useAsync(async () => true));
		expect(result.error).toBeUndefined();
	});

	it('should not invoke async function on mount if `skipMount` option is passed', async () => {
		const spy = vi.fn(async () => undefined);
		await renderHook(() => useAsync(spy));

		expect(spy).not.toHaveBeenCalled();
	});

	it('should apply `initialValue` arg', async () => {
		const [spy, resolve] = getControllableAsync<number>();
		const {result} = await renderHook(() => useAsync(spy, 3));

		if (result.all[0] instanceof Error) {
			throw result.all[0];
		}

		const [state] = expectResultValue(result);
		expect(state).toStrictEqual({
			status: 'not-executed',
			error: undefined,
			result: 3,
		});

		await act(async () => {
			if (resolve.current) {
				resolve.current(2);
			}
		});
	});

	it('should have `not-executed` status initially', async () => {
		const [spy, resolve] = getControllableAsync<void>();
		const {result} = await renderHook(() => useAsync(spy));

		const [state] = expectResultValue(result);
		expect(state).toStrictEqual({
			status: 'not-executed',
			error: undefined,
			result: undefined,
		});

		await act(async () => {
			if (resolve.current) {
				resolve.current();
			}
		});
	});

	it('should have `loading` status while promise invoked but not resolved', async () => {
		const [spy, resolve] = getControllableAsync<void>();
		const {result} = await renderHook(() => useAsync(spy));

		let [state] = expectResultValue(result);
		expect(state).toStrictEqual({
			status: 'not-executed',
			error: undefined,
			result: undefined,
		});

		await act(async () => {
			const [, actions] = expectResultValue(result);
			void actions.execute();
		});

		[state] = expectResultValue(result);
		expect(state).toStrictEqual({
			status: 'loading',
			error: undefined,
			result: undefined,
		});

		await act(async () => {
			if (resolve.current) {
				resolve.current();
			}
		});
	});

	it('should set `success` status and store `result` state field on fulfill', async () => {
		const [spy, resolve] = getControllableAsync<number>();
		const {result} = await renderHook(() => useAsync(spy));

		let [state] = expectResultValue(result);
		expect(state).toStrictEqual({
			status: 'not-executed',
			error: undefined,
			result: undefined,
		});

		await act(async () => {
			const [, actions] = expectResultValue(result);
			void actions.execute();

			if (resolve.current) {
				resolve.current(123);
			}
		});

		[state] = expectResultValue(result);
		expect(state).toStrictEqual({
			status: 'success',
			error: undefined,
			result: 123,
		});
	});

	it('should set `error` status and store `error` state field on reject', async () => {
		const [spy, , reject] = getControllableAsync<number>();
		const {result} = await renderHook(() => useAsync(spy));

		let [state] = expectResultValue(result);
		expect(state).toStrictEqual({
			status: 'not-executed',
			error: undefined,
			result: undefined,
		});

		const err = new Error('some error');

		await act(async () => {
			const [, actions] = expectResultValue(result);
			const promise = actions.execute();

			if (reject.current) {
				reject.current(err);
			}

			// Wait for the promise to be rejected and handled
			try {
				await promise;
			} catch {
				// Expected to catch the error here
			}
		});

		[state] = expectResultValue(result);
		expect(state).toStrictEqual({
			status: 'error',
			error: err,
			result: undefined,
		});
	});

	it('should rollback state to initial on `reset` method call', async () => {
		const [spy, resolve] = getControllableAsync<number>();
		const {result} = await renderHook(() => useAsync(spy, 42));

		let [state] = expectResultValue(result);
		expect(state).toStrictEqual({
			status: 'not-executed',
			error: undefined,
			result: 42,
		});

		await act(async () => {
			const [, actions] = expectResultValue(result);
			void actions.execute();

			if (resolve.current) {
				resolve.current(1);
			}
		});

		[state] = expectResultValue(result);
		expect(state).toStrictEqual({
			status: 'success',
			error: undefined,
			result: 1,
		});

		await act(async () => {
			const [, actions] = expectResultValue(result);
			actions.reset();
		});

		[state] = expectResultValue(result);
		expect(state).toStrictEqual({
			status: 'not-executed',
			error: undefined,
			result: 42,
		});
	});

	it('should not process results of promise if another was executed', async () => {
		const [spy, resolve] = getControllableAsync<number>();
		const {result} = await renderHook(() => useAsync(spy, 42));

		await act(async () => {
			const [, actions] = expectResultValue(result);
			void actions.execute();
		});
		const resolve1 = resolve.current;

		await act(async () => {
			const [, actions] = expectResultValue(result);
			void actions.execute();
		});
		const resolve2 = resolve.current;

		await act(async () => {
			if (resolve1) {
				resolve1(1);
			}

			if (resolve2) {
				resolve2(2);
			}
		});

		const [state] = expectResultValue(result);
		expect(state).toStrictEqual({
			status: 'success',
			error: undefined,
			result: 2,
		});
	});

	it('should not process error of promise if another was executed', async () => {
		const [spy, resolve, reject] = getControllableAsync<number>();
		const {result} = await renderHook(() => useAsync(spy, 42));

		let promise1: Promise<number>;
		await act(async () => {
			const [, actions] = expectResultValue(result);
			promise1 = actions.execute();
		});
		const reject1 = reject.current;

		let promise2: Promise<number>;
		await act(async () => {
			const [, actions] = expectResultValue(result);
			promise2 = actions.execute();
		});
		const resolve2 = resolve.current;

		await act(async () => {
			if (reject1) {
				reject1(new Error('some err'));
			}

			if (resolve2) {
				resolve2(2);
			}

			// Wait for both promises to complete
			try {
				await promise1;
			} catch {
				// Expected to catch the error from the first promise
			}

			await promise2;
		});

		const [state] = expectResultValue(result);
		expect(state).toStrictEqual({
			status: 'success',
			error: undefined,
			result: 2,
		});
	});

	it('should not change methods between renders', async () => {
		const spy = vi.fn(async () => undefined);
		const {rerender, result} = await renderHook(() => useAsync(spy));

		const previous = expectResultValue(result);
		await rerender();

		const current = expectResultValue(result);
		expect(previous[1].execute).toBe(current[1].execute);
		expect(previous[1].reset).toBe(current[1].reset);
	});
});
