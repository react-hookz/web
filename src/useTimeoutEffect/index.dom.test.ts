import {renderHook} from '@ver0/react-hooks-testing';
import {afterAll, beforeAll, beforeEach, describe, expect, it, vi} from 'vitest';
import {useTimeoutEffect} from '../index.js';
import {noop} from '../util/const.js';
import {expectResultValue} from '../util/testing/test-helpers.js';

describe('useTimeoutEffect', () => {
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
		expect(useTimeoutEffect).toBeDefined();
	});

	it('should render', async () => {
		const {result} = await renderHook(() => useTimeoutEffect(() => {}, 123));
		expect(result.error).toBeUndefined();
	});

	it('should set and call function after timeout', async () => {
		const spy = vi.fn();
		await renderHook(() => useTimeoutEffect(spy, 100));

		vi.advanceTimersByTime(99);
		expect(spy).not.toHaveBeenCalled();

		vi.advanceTimersByTime(1);
		expect(spy).toHaveBeenCalledTimes(1);
	});

	it('should set timeout and cancel on unmount', async () => {
		const spy = vi.fn();
		const {unmount} = await renderHook(() => useTimeoutEffect(spy, 100));

		vi.advanceTimersByTime(99);
		expect(spy).not.toHaveBeenCalled();
		await unmount();
		vi.advanceTimersByTime(1);
		expect(spy).not.toHaveBeenCalled();
	});

	it('should reset timeout in delay change', async () => {
		const spy = vi.fn();
		const {rerender} = await renderHook(({delay}) => useTimeoutEffect(spy, delay), {
			initialProps: {delay: 100},
		});

		vi.advanceTimersByTime(99);
		expect(spy).not.toHaveBeenCalled();

		await rerender({delay: 50});
		vi.advanceTimersByTime(49);
		expect(spy).not.toHaveBeenCalled();

		vi.advanceTimersByTime(1);
		expect(spy).toHaveBeenCalledTimes(1);
	});

	it('should not reset timeout in callback change', async () => {
		const spy = vi.fn();
		const {rerender} = await renderHook<{callback: () => void}, void>(({callback}) => useTimeoutEffect(callback, 100), {
			initialProps: {
				callback: noop,
			},
		});

		vi.advanceTimersByTime(99);
		expect(spy).not.toHaveBeenCalled();

		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		await rerender({callback: () => spy()});
		vi.advanceTimersByTime(1);
		expect(spy).toHaveBeenCalledTimes(1);
	});

	it('should cancel timeout if delay is undefined', async () => {
		const spy = vi.fn();
		const {rerender} = await renderHook<{delay: number | undefined}, void>(({delay}) => useTimeoutEffect(spy, delay), {
			initialProps: {delay: 100},
		});

		vi.advanceTimersByTime(99);
		expect(spy).not.toHaveBeenCalled();

		await rerender({delay: undefined});
		vi.advanceTimersByTime(2000);
		expect(spy).not.toHaveBeenCalled();
	});

	it('should not cancel timeout if delay is 0', async () => {
		const spy = vi.fn();
		await renderHook(() => useTimeoutEffect(spy, 0));

		vi.advanceTimersByTime(1);
		expect(spy).toHaveBeenCalledTimes(1);
	});

	it('should cancel timeout if cancel method is called', async () => {
		const spy = vi.fn();
		const {result} = await renderHook(() => useTimeoutEffect(spy, 100));
		const value = expectResultValue(result);

		vi.advanceTimersByTime(99);
		expect(spy).not.toHaveBeenCalled();

		value[0]();
		vi.advanceTimersByTime(1);
		expect(spy).not.toHaveBeenCalled();
	});

	it('should reset timeout if reset method is called', async () => {
		const spy = vi.fn();
		const {result} = await renderHook(() => useTimeoutEffect(spy, 100));
		const value = expectResultValue(result);

		vi.advanceTimersByTime(99);
		expect(spy).not.toHaveBeenCalled();

		value[1]();
		vi.advanceTimersByTime(1);
		expect(spy).not.toHaveBeenCalled();

		vi.advanceTimersByTime(100);
		expect(spy).toHaveBeenCalledTimes(1);
	});
});
