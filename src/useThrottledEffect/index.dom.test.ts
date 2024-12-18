import {renderHook} from '@testing-library/react-hooks/dom';
import {afterAll, afterEach, beforeAll, describe, expect, it, vi} from 'vitest';
import {useThrottledEffect} from '../index.js';

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

	it('should be defined', () => {
		expect(useThrottledEffect).toBeDefined();
	});

	it('should render', () => {
		const {result} = renderHook(() => {
			useThrottledEffect(() => {}, [], 200);
		});
		expect(result.error).toBeUndefined();
	});

	it('should throttle passed callback', () => {
		const spy = vi.fn();
		const {rerender} = renderHook(
			(dep) => {
				useThrottledEffect(spy, [dep], 200, true);
			},
			{
				initialProps: 1,
			},
		);

		expect(spy).toHaveBeenCalledTimes(1);
		rerender(2);
		rerender(3);
		rerender(4);
		expect(spy).toHaveBeenCalledTimes(1);

		vi.advanceTimersByTime(200);
		expect(spy).toHaveBeenCalledTimes(1);
		rerender(5);
		expect(spy).toHaveBeenCalledTimes(2);
	});
});
