import {act, renderHook} from '@ver0/react-hooks-testing';
import {describe, expect, it, vi} from 'vitest';
import {useAsyncAbortable} from '../index.js';
import {expectResultValue} from '../util/testing/test-helpers.js';

function getControllableAsync<Response, Args extends unknown[] = unknown[]>() {
	const resolve: {current: undefined | ((result: Response) => void)} = {current: undefined};
	const reject: {current: undefined | ((err: Error) => void)} = {current: undefined};

	return [
		vi.fn(
			async (..._args: Args) =>
				// eslint-disable-next-line promise/param-names
				new Promise<Response>((reslv, rejct) => {
					resolve.current = reslv;
					reject.current = rejct;
				}),
		),
		resolve,
		reject,
	] as const;
}

describe('useAsyncAbortable', () => {
	it('should be defined', async () => {
		expect(useAsyncAbortable).toBeDefined();
	});

	it('should render', async () => {
		const {result} = await renderHook(() => useAsyncAbortable(async (_) => {}));
		expect(result.error).toBeUndefined();
	});

	it('should not change methods between renders', async () => {
		const spy = vi.fn(async () => {});
		const {rerender, result} = await renderHook(() => useAsyncAbortable(spy));

		const result1 = expectResultValue(result);
		await rerender();

		const result2 = expectResultValue(result);
		expect(result1[1].execute).toBe(result2[1].execute);
		expect(result1[1].reset).toBe(result2[1].reset);
		expect(result1[1].abort).toBe(result2[1].abort);
	});

	it('should pass abort signal as first argument', async () => {
		const spy = vi.fn(async (s: AbortSignal, n: number) => n);
		const {result} = await renderHook(() => useAsyncAbortable(spy));

		await act(async () => {
			const hookValue = expectResultValue(result);
			void hookValue[1].execute(123);
		});

		expect(spy.mock.calls[0][0]).toBeInstanceOf(AbortSignal);
		expect(spy.mock.calls[0][0].aborted).toBe(false);
		expect(spy.mock.calls[0][1]).toBe(123);

		const finalValue = expectResultValue(result);
		expect(finalValue[0]).toStrictEqual({
			status: 'success',
			error: undefined,
			result: 123,
		});
	});

	it('should abort signal in case of actions.abort call', async () => {
		const [spy, resolve] = getControllableAsync<number, [AbortSignal, number]>();
		const {result} = await renderHook(() => useAsyncAbortable(spy));

		await act(async () => {
			const value = expectResultValue(result);
			void value[1].execute(123);
		});

		const value = expectResultValue(result);
		value[1].abort();

		expect(spy.mock.calls[0][0].aborted).toBe(true);

		await act(async () => {
			if (resolve.current) {
				resolve.current(123);
			}
		});
	});

	it('should also abort signal in case of actions.reset call', async () => {
		const [spy, resolve] = getControllableAsync<number, [AbortSignal, number]>();
		const {result} = await renderHook(() => useAsyncAbortable(spy, 321));

		await act(async () => {
			const value = expectResultValue(result);
			void value[1].execute(123);
		});

		await act(async () => {
			const value = expectResultValue(result);
			value[1].reset();
		});

		expect(spy.mock.calls[0][0].aborted).toBe(true);

		const value = expectResultValue(result);
		expect(value[0]).toStrictEqual({
			status: 'not-executed',
			error: undefined,
			result: 321,
		});

		await act(async () => {
			if (resolve.current) {
				resolve.current(123);
			}
		});
	});

	it('should abort previous async in case new one executed before first resolution', async () => {
		const [spy, resolve] = getControllableAsync<number, [AbortSignal, number]>();
		const {result} = await renderHook(() => useAsyncAbortable(spy, 321));

		await act(async () => {
			const value = expectResultValue(result);
			void value[1].execute(123);
		});

		const resolve1 = resolve.current;

		await act(async () => {
			const value = expectResultValue(result);
			void value[1].execute(1234);
		});

		expect(spy.mock.calls[0][1]).toBe(123);
		expect(spy.mock.calls[0][0].aborted).toBe(true);

		expect(spy.mock.calls[1][1]).toBe(1234);
		expect(spy.mock.calls[1][0].aborted).toBe(false);

		await act(async () => {
			if (resolve1) {
				resolve1(123);
			}

			if (resolve.current) {
				resolve.current(1234);
			}
		});
	});
});
