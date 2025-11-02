import {renderHook} from '@ver0/react-hooks-testing';
import {afterAll, afterEach, beforeAll, describe, expect, it, vi} from 'vitest';
import {useThrottledEffect} from '../index.js';
import {noop} from '../util/const.js';

describe('useThrottledEffect', () => {
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
		expect(useThrottledEffect).toBeDefined();
	});

	it('should render', async () => {
		const {result} = await renderHook(() => {
			useThrottledEffect(noop, [], 200);
		});
		expect(result.error).toBeUndefined();
	});

	it('should throttle passed callback', async () => {
		const spy = vi.fn();
		const {rerender} = await renderHook(
			(dep) => {
				useThrottledEffect(spy, [dep], 200, true);
			},
			{
				initialProps: 1,
			},
		);

		expect(spy).toHaveBeenCalledTimes(1);
		await rerender(2);
		await rerender(3);
		await rerender(4);
		expect(spy).toHaveBeenCalledTimes(1);

		vi.advanceTimersByTime(200);
		expect(spy).toHaveBeenCalledTimes(1);
		await rerender(5);
		expect(spy).toHaveBeenCalledTimes(2);
	});
});
