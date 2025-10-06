import {renderHookServer as renderHook} from '@ver0/react-hooks-testing';
import {afterAll, afterEach, beforeAll, describe, expect, it, vi} from 'vitest';
import {useThrottledCallback} from '../index.js';
import {expectResultValue} from '../util/testing/test-helpers.js';

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
		vi.advanceTimersByTime(200);
		expect(cb).toHaveBeenCalledWith(1, 'abc');
	});
});
