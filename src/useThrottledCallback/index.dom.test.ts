import {renderHook} from '@ver0/react-hooks-testing';
import {afterAll, afterEach, beforeAll, describe, expect, it, vi} from 'vitest';
import {useThrottledCallback} from '../index.js';
import {expectResultValue} from '../util/testing/test-helpers.js';

function testFn(_a: any, _b: any, _c: any) {}

describe('useThrottledCallback', () => {
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
		expect(useThrottledCallback).toBeDefined();
	});

	it('should render', async () => {
		const {result} = await renderHook(() => {
			useThrottledCallback(() => {}, [], 200);
		});
		expect(result.error).toBeUndefined();
	});

	it('should return function same length and wrapped name', async () => {
		const hook1 = await renderHook(() => useThrottledCallback((_a: any, _b: any, _c: any) => {}, [], 200));
		let value = expectResultValue(hook1.result);

		expect(value.length).toBe(3);
		expect(value.name).toBe('anonymous__throttled__200');

		const hook2 = await renderHook(() => useThrottledCallback(testFn, [], 100));
		value = expectResultValue(hook2.result);

		expect(value.length).toBe(3);
		expect(value.name).toBe('testFn__throttled__100');
	});

	it('should return new callback if delay is changed', async () => {
		const {result, rerender} = await renderHook(({delay}) => useThrottledCallback(() => {}, [], delay), {
			initialProps: {delay: 200},
		});
		const cb1 = expectResultValue(result);
		await rerender({delay: 123});

		const cb2 = expectResultValue(result);
		expect(cb1).not.toBe(cb2);
	});

	it('should invoke given callback immediately', async () => {
		const cb = vi.fn();
		const {result} = await renderHook(() => useThrottledCallback(cb, [], 200));
		const throttledCb = expectResultValue(result);

		throttledCb();
		expect(cb).toHaveBeenCalledTimes(1);
	});

	it('should pass parameters to callback', async () => {
		const cb = vi.fn((_a: number, _c: string) => {});
		const {result} = await renderHook(() => useThrottledCallback(cb, [], 200));
		const throttledCb = expectResultValue(result);

		throttledCb(1, 'abc');
		expect(cb).toHaveBeenCalledWith(1, 'abc');
	});

	it('should ignore consequential calls occurred within delay, but execute last call after delay is passed', async () => {
		const cb = vi.fn();
		const {result} = await renderHook(() => useThrottledCallback(cb, [], 200));
		const throttledCb = expectResultValue(result);

		throttledCb();
		throttledCb();
		throttledCb();
		throttledCb();
		expect(cb).toHaveBeenCalledTimes(1);
		vi.advanceTimersByTime(199);
		throttledCb();
		expect(cb).toHaveBeenCalledTimes(1);
		vi.advanceTimersByTime(1);
		expect(cb).toHaveBeenCalledTimes(2);
		throttledCb();
		expect(cb).toHaveBeenCalledTimes(2);
		vi.advanceTimersByTime(200);
		expect(cb).toHaveBeenCalledTimes(3);
	});

	it('should drop trailing execution if `noTrailing is set to true`', async () => {
		const cb = vi.fn();
		const {result} = await renderHook(() => useThrottledCallback(cb, [], 200, true));
		const throttledCb = expectResultValue(result);

		throttledCb();
		throttledCb();
		throttledCb();
		throttledCb();
		expect(cb).toHaveBeenCalledTimes(1);
		vi.advanceTimersByTime(199);
		throttledCb();
		expect(cb).toHaveBeenCalledTimes(1);
		vi.advanceTimersByTime(1);
		expect(cb).toHaveBeenCalledTimes(1);
		throttledCb();
		throttledCb();
		throttledCb();
		expect(cb).toHaveBeenCalledTimes(2);
		vi.advanceTimersByTime(200);
		expect(cb).toHaveBeenCalledTimes(2);
	});
});
