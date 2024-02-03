import { act, renderHook } from '@testing-library/react-hooks/dom';
import { useAsyncAbortable } from '../../index.js';

function getControllableAsync<Res, Args extends unknown[] = unknown[]>() {
	const resolve: { current: undefined | ((result: Res) => void) } = { current: undefined };
	const reject: { current: undefined | ((err: Error) => void) } = { current: undefined };

	return [
		jest.fn(
			(..._args: Args) =>
				// eslint-disable-next-line promise/param-names
				new Promise<Res>((res, rej) => {
					resolve.current = res;
					reject.current = rej;
				})
		),
		resolve,
		reject,
	] as const;
}

describe('useAsyncAbortable', () => {
	it('should be defined', () => {
		expect(useAsyncAbortable).toBeDefined();
	});

	it('should render', () => {
		const { result } = renderHook(() => useAsyncAbortable(async (_) => {}));
		expect(result.error).toBeUndefined();
	});

	it('should not change methods between renders', () => {
		const spy = jest.fn(async () => {});
		const { rerender, result } = renderHook(() => useAsyncAbortable(spy));

		const res1 = result.current;
		rerender();

		expect(res1[1].execute).toBe(result.current[1].execute);
		expect(res1[1].reset).toBe(result.current[1].reset);
		expect(res1[1].abort).toBe(result.current[1].abort);
	});

	it('should pass abort signal as first argument', async () => {
		const spy = jest.fn(async (s: AbortSignal, n: number) => n);
		const { result } = renderHook(() => useAsyncAbortable(spy));

		await act(async () => {
			void result.current[1].execute(123);
		});

		expect(spy.mock.calls[0][0]).toBeInstanceOf(AbortSignal);
		expect(spy.mock.calls[0][0].aborted).toBe(false);
		expect(spy.mock.calls[0][1]).toBe(123);

		expect(result.current[0]).toStrictEqual({
			status: 'success',
			error: undefined,
			result: 123,
		});
	});

	it('should abort signal in case of actions.abort call', async () => {
		const [spy, resolve] = getControllableAsync<number, [AbortSignal, number]>();
		const { result } = renderHook(() => useAsyncAbortable(spy));

		await act(async () => {
			void result.current[1].execute(123);
		});

		result.current[1].abort();

		expect(spy.mock.calls[0][0].aborted).toBe(true);

		await act(async () => {
			if (resolve.current) {
				resolve.current(123);
			}
		});
	});

	it('should also abort signal in case of actions.reset call', async () => {
		const [spy, resolve] = getControllableAsync<number, [AbortSignal, number]>();
		const { result } = renderHook(() => useAsyncAbortable(spy, 321));

		await act(async () => {
			void result.current[1].execute(123);
		});

		await act(async () => {
			result.current[1].reset();
		});

		expect(spy.mock.calls[0][0].aborted).toBe(true);

		expect(result.current[0]).toStrictEqual({
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
		const { result } = renderHook(() => useAsyncAbortable(spy, 321));

		await act(async () => {
			void result.current[1].execute(123);
		});

		const resolve1 = resolve.current;

		await act(async () => {
			void result.current[1].execute(1234);
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
