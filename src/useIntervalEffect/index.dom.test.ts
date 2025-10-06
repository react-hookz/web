import {renderHook} from '@ver0/react-hooks-testing';
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

	it('should be defined', async () => {
		expect(useIntervalEffect).toBeDefined();
	});

	it('should render', async () => {
		const {result} = await renderHook(() => {
			useIntervalEffect(() => {}, 123);
		});
		expect(result.error).toBeUndefined();
	});

	it('should set interval and cancel it on unmount', async () => {
		const spy = vi.fn();
		const {unmount} = await renderHook(() => {
			useIntervalEffect(spy, 100);
		});

		vi.advanceTimersByTime(99);
		expect(spy).not.toHaveBeenCalled();

		vi.advanceTimersByTime(1);
		expect(spy).toHaveBeenCalledTimes(1);

		vi.advanceTimersByTime(300);
		expect(spy).toHaveBeenCalledTimes(4);

		await unmount();
		expect(spy).toHaveBeenCalledTimes(4);
	});

	it('should reset interval in delay change', async () => {
		const spy = vi.fn();
		const {rerender} = await renderHook(
			({delay}) => {
				useIntervalEffect(spy, delay);
			},
			{
				initialProps: {delay: 100},
			},
		);

		vi.advanceTimersByTime(99);
		expect(spy).not.toHaveBeenCalled();

		await rerender({delay: 50});
		vi.advanceTimersByTime(49);
		expect(spy).not.toHaveBeenCalled();

		vi.advanceTimersByTime(1);
		expect(spy).toHaveBeenCalledTimes(1);
	});

	it('should cancel interval if delay is undefined', async () => {
		const spy = vi.fn();
		const {rerender} = await renderHook<{delay: number | undefined}, void>(
			({delay}) => {
				useIntervalEffect(spy, delay);
			},
			{
				initialProps: {delay: 100},
			},
		);

		vi.advanceTimersByTime(99);
		expect(spy).not.toHaveBeenCalled();

		await rerender({delay: undefined});
		vi.advanceTimersByTime(2000);
		expect(spy).not.toHaveBeenCalled();
	});
});
