import {renderHookServer as renderHook} from '@ver0/react-hooks-testing';
import {afterAll, afterEach, beforeAll, describe, expect, it, vi} from 'vitest';
import {useDebouncedCallback} from '../index.js';
import {expectResultValue} from '../util/testing/test-helpers.js';

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

	it('should render', async () => {
		const {result} = await renderHook(() => {
			useDebouncedCallback(() => {}, [], 200);
		});
		expectResultValue(result);
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
});
