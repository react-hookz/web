import {renderHook} from '@ver0/react-hooks-testing';
import {afterAll, afterEach, beforeAll, describe, expect, it, vi} from 'vitest';
import {useDebouncedCallback} from '../index.js';
import {expectResultValue} from '../util/testing/test-helpers.js';

function testFn(_a: any, _b: any, _c: any) {}

describe('useDebouncedCallback', () => {
	beforeAll(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.clearAllTimers();
	});

	afterAll(() => {
		vi.useRealTimers();
	});

	it('should be defined', async () => {
		expect(useDebouncedCallback).toBeDefined();
	});

	it('should render', async () => {
		const {result} = await renderHook(() => {
			useDebouncedCallback(() => {}, [], 200);
		});
		expect(result.error).toBeUndefined();
	});

	it('should return function same length and wrapped name', async () => {
		let {result} = await renderHook(() => useDebouncedCallback((_a: any, _b: any, _c: any) => {}, [], 200));
		let value = expectResultValue(result);

		expect(value.length).toBe(3);
		expect(value.name).toBe('anonymous__debounced__200');

		({result} = await renderHook(() => useDebouncedCallback(testFn, [], 100)));
		value = expectResultValue(result);

		expect(value.length).toBe(3);
		expect(value.name).toBe('testFn__debounced__100');
	});

	it('should return new callback if delay is changed', async () => {
		const {result, rerender} = await renderHook(({delay}) => useDebouncedCallback(() => {}, [], delay), {
			initialProps: {delay: 200},
		});
		const cb1 = expectResultValue(result);
		await rerender({delay: 123});
		const cb2 = expectResultValue(result);

		expect(cb1).not.toBe(cb2);
	});

	it('should run given callback only after specified delay since last call', async () => {
		const cb = vi.fn();
		const {result} = await renderHook(() => useDebouncedCallback(cb, [], 200));
		const debouncedCb = expectResultValue(result);

		debouncedCb();
		expect(cb).not.toHaveBeenCalled();

		vi.advanceTimersByTime(100);
		debouncedCb();

		vi.advanceTimersByTime(199);
		expect(cb).not.toHaveBeenCalled();

		vi.advanceTimersByTime(1);
		expect(cb).toHaveBeenCalledTimes(1);
	});

	it('should pass parameters to callback', async () => {
		const cb = vi.fn((_a: number, _c: string) => {});
		const {result} = await renderHook(() => useDebouncedCallback(cb, [], 200));
		const debouncedCb = expectResultValue(result);

		debouncedCb(1, 'abc');
		vi.advanceTimersByTime(200);
		expect(cb).toHaveBeenCalledWith(1, 'abc');
	});

	it('should cancel previously scheduled call even if parameters changed', async () => {
		const cb1 = vi.fn(() => {});
		const cb2 = vi.fn(() => {});

		const {result, rerender} = await renderHook(
			({i}) =>
				useDebouncedCallback(
					() => {
						if (i === 1) {
							cb1();
						} else {
							cb2();
						}
					},
					[i],
					200,
				),
			{initialProps: {i: 1}},
		);

		const debouncedCb = expectResultValue(result);
		debouncedCb();
		vi.advanceTimersByTime(100);

		await rerender({i: 2});
		const debouncedCb2 = expectResultValue(result);
		debouncedCb2();
		vi.advanceTimersByTime(200);

		expect(cb1).not.toHaveBeenCalled();
		expect(cb2).toHaveBeenCalledTimes(1);
	});

	it('should cancel debounce execution after component unmount', async () => {
		const cb = vi.fn();

		const {result, unmount} = await renderHook(() => useDebouncedCallback(cb, [], 150, 200));
		const debouncedCb = expectResultValue(result);

		debouncedCb();
		expect(cb).not.toHaveBeenCalled();
		vi.advanceTimersByTime(149);
		expect(cb).not.toHaveBeenCalled();
		await unmount();
		vi.advanceTimersByTime(100);
		expect(cb).not.toHaveBeenCalled();
	});

	it('should force execute callback after maxWait milliseconds', async () => {
		const cb = vi.fn();

		const {result} = await renderHook(() => useDebouncedCallback(cb, [], 150, 200));
		const debouncedCb = expectResultValue(result);

		debouncedCb();
		expect(cb).not.toHaveBeenCalled();
		vi.advanceTimersByTime(149);
		debouncedCb();
		expect(cb).not.toHaveBeenCalled();
		vi.advanceTimersByTime(50);
		expect(cb).not.toHaveBeenCalled();
		vi.advanceTimersByTime(1);
		expect(cb).toHaveBeenCalledTimes(1);
	});

	it('should not execute callback twice if maxWait equals delay', async () => {
		const cb = vi.fn();

		const {result} = await renderHook(() => useDebouncedCallback(cb, [], 200, 200));
		const debouncedCb = expectResultValue(result);

		debouncedCb();
		expect(cb).not.toHaveBeenCalled();
		vi.advanceTimersByTime(200);
		expect(cb).toHaveBeenCalledTimes(1);
	});

	it('should call updated function only when deps changed', async () => {
		const cb = vi.fn();

		const {result, rerender} = await renderHook(
			({cb, deps}: {cb: () => void; deps: any[]}) => useDebouncedCallback(cb, deps, 200, 200),
			{
				initialProps: {
					cb() {},
					deps: [0],
				},
			},
		);

		let debouncedCb = expectResultValue(result);
		debouncedCb();

		await rerender({cb, deps: [0]});

		vi.advanceTimersByTime(200);
		expect(cb).toHaveBeenCalledTimes(0);

		debouncedCb = expectResultValue(result);
		debouncedCb();

		await rerender({cb, deps: [1]});

		vi.advanceTimersByTime(200);
		expect(cb).toHaveBeenCalledTimes(1);
	});
});
