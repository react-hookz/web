import {renderHook} from '@testing-library/react-hooks/dom';
import {afterAll, beforeAll, beforeEach, describe, expect, it, vi} from 'vitest';
import {useIntervalEffect} from '../index.js';

describe('useIntervalEffect', () => {
	beforeAll(() => {
		vi.useFakeTimers();
	});

	beforeEach(() => {
		vi.clearAllTimers();
	});

	afterAll(() => {
		vi.useRealTimers();
	});

	it('should be defined', () => {
		expect(useIntervalEffect).toBeDefined();
	});

	it('should render', () => {
		const {result} = renderHook(() => {
			useIntervalEffect(() => {}, 123);
		});
		expect(result.error).toBeUndefined();
	});

	it('should set interval and cancel it on unmount', () => {
		const spy = vi.fn();
		const {unmount} = renderHook(() => {
			useIntervalEffect(spy, 100);
		});

		vi.advanceTimersByTime(99);
		expect(spy).not.toHaveBeenCalled();

		vi.advanceTimersByTime(1);
		expect(spy).toHaveBeenCalledTimes(1);

		vi.advanceTimersByTime(300);
		expect(spy).toHaveBeenCalledTimes(4);

		unmount();
		expect(spy).toHaveBeenCalledTimes(4);
	});

	it('should reset interval in delay change', () => {
		const spy = vi.fn();
		const {rerender} = renderHook(
			({delay}) => {
				useIntervalEffect(spy, delay);
			},
			{
				initialProps: {delay: 100},
			},
		);

		vi.advanceTimersByTime(99);
		expect(spy).not.toHaveBeenCalled();

		rerender({delay: 50});
		vi.advanceTimersByTime(49);
		expect(spy).not.toHaveBeenCalled();

		vi.advanceTimersByTime(1);
		expect(spy).toHaveBeenCalledTimes(1);
	});

	it('should cancel interval if delay is undefined', () => {
		const spy = vi.fn();
		const {rerender} = renderHook<{delay: number | undefined}, void>(
			({delay}) => {
				useIntervalEffect(spy, delay);
			},
			{
				initialProps: {delay: 100},
			},
		);

		vi.advanceTimersByTime(99);
		expect(spy).not.toHaveBeenCalled();

		rerender({delay: undefined});
		vi.advanceTimersByTime(2000);
		expect(spy).not.toHaveBeenCalled();
	});
});
