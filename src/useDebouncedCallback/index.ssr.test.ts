import {renderHook} from '@testing-library/react-hooks/server';
import {afterAll, afterEach, beforeAll, describe, expect, it, vi} from 'vitest';
import {useDebouncedCallback} from '../index.js';

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

	it('should be defined', () => {
		expect(useDebouncedCallback).toBeDefined();
	});

	it('should render', () => {
		const {result} = renderHook(() => {
			useDebouncedCallback(() => {}, [], 200);
		});
		expect(result.error).toBeUndefined();
	});

	it('should run given callback only after specified delay since last call', () => {
		const cb = vi.fn();
		const {result} = renderHook(() => useDebouncedCallback(cb, [], 200));

		result.current();
		expect(cb).not.toHaveBeenCalled();

		vi.advanceTimersByTime(100);
		result.current();

		vi.advanceTimersByTime(199);
		expect(cb).not.toHaveBeenCalled();

		vi.advanceTimersByTime(1);
		expect(cb).toHaveBeenCalledTimes(1);
	});

	it('should pass parameters to callback', () => {
		const cb = vi.fn((_a: number, _c: string) => {});
		const {result} = renderHook(() => useDebouncedCallback(cb, [], 200));

		result.current(1, 'abc');
		vi.advanceTimersByTime(200);
		expect(cb).toHaveBeenCalledWith(1, 'abc');
	});
});
