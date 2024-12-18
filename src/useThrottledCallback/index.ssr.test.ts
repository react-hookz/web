import {renderHook} from '@testing-library/react-hooks/server';
import {afterAll, afterEach, beforeAll, describe, expect, it, vi} from 'vitest';
import {useThrottledCallback} from '../index.js';

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

	it('should be defined', () => {
		expect(useThrottledCallback).toBeDefined();
	});

	it('should render', () => {
		const {result} = renderHook(() => {
			useThrottledCallback(() => {}, [], 200);
		});
		expect(result.error).toBeUndefined();
	});

	it('should invoke given callback immediately', () => {
		const cb = vi.fn();
		const {result} = renderHook(() => useThrottledCallback(cb, [], 200));

		result.current();
		expect(cb).toHaveBeenCalledTimes(1);
	});

	it('should pass parameters to callback', () => {
		const cb = vi.fn((_a: number, _c: string) => {});
		const {result} = renderHook(() => useThrottledCallback(cb, [], 200));

		result.current(1, 'abc');
		vi.advanceTimersByTime(200);
		expect(cb).toHaveBeenCalledWith(1, 'abc');
	});
});
