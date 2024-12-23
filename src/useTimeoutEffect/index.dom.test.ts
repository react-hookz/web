import {renderHook} from '@testing-library/react-hooks/dom';
import {afterAll, beforeAll, beforeEach, describe, expect, it, vi} from 'vitest';
import {useTimeoutEffect} from '../index.js';

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

	it('should be defined', () => {
		expect(useTimeoutEffect).toBeDefined();
	});

	it('should render', () => {
		const {result} = renderHook(() => useTimeoutEffect(() => {}, 123));
		expect(result.error).toBeUndefined();
	});

	it('should set and call function after timeout', () => {
		const spy = vi.fn();
		renderHook(() => useTimeoutEffect(spy, 100));

		vi.advanceTimersByTime(99);
		expect(spy).not.toHaveBeenCalled();

		vi.advanceTimersByTime(1);
		expect(spy).toHaveBeenCalledTimes(1);
	});

	it('should set timeout and cancel on unmount', () => {
		const spy = vi.fn();
		const {unmount} = renderHook(() => useTimeoutEffect(spy, 100));

		vi.advanceTimersByTime(99);
		expect(spy).not.toHaveBeenCalled();
		unmount();
		vi.advanceTimersByTime(1);
		expect(spy).not.toHaveBeenCalled();
	});

	it('should reset timeout in delay change', () => {
		const spy = vi.fn();
		const {rerender} = renderHook(({delay}) => useTimeoutEffect(spy, delay), {
			initialProps: {delay: 100},
		});

		vi.advanceTimersByTime(99);
		expect(spy).not.toHaveBeenCalled();

		rerender({delay: 50});
		vi.advanceTimersByTime(49);
		expect(spy).not.toHaveBeenCalled();

		vi.advanceTimersByTime(1);
		expect(spy).toHaveBeenCalledTimes(1);
	});

	it('should not reset timeout in callback change', () => {
		const spy = vi.fn();
		const {rerender} = renderHook<{callback: () => void}, void>(
			({callback}) => useTimeoutEffect(callback, 100),
		{
			initialProps: {
				callback() {},
			},
		},
		);

		vi.advanceTimersByTime(99);
		expect(spy).not.toHaveBeenCalled();

		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		rerender({callback: () => spy()});
		vi.advanceTimersByTime(1);
		expect(spy).toHaveBeenCalledTimes(1);
	});

	it('should cancel timeout if delay is undefined', () => {
		const spy = vi.fn();
		const {rerender} = renderHook<{delay: number | undefined}, void>(
			({delay}) => useTimeoutEffect(spy, delay),
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

	it('should not cancel timeout if delay is 0', () => {
		const spy = vi.fn();
		renderHook(() => useTimeoutEffect(spy, 0));

		vi.advanceTimersByTime(1);
		expect(spy).toHaveBeenCalledTimes(1);
	});

	it('should cancel timeout if cancel method is called', () => {
		const spy = vi.fn();
		const {result} = renderHook(() => useTimeoutEffect(spy, 100));

		vi.advanceTimersByTime(99);
		expect(spy).not.toHaveBeenCalled();

		result.current[0]();
		vi.advanceTimersByTime(1);
		expect(spy).not.toHaveBeenCalled();
	});

	it('should reset timeout if reset method is called', () => {
		const spy = vi.fn();
		const {result} = renderHook(() => useTimeoutEffect(spy, 100));

		vi.advanceTimersByTime(99);
		expect(spy).not.toHaveBeenCalled();

		result.current[1]();
		vi.advanceTimersByTime(1);
		expect(spy).not.toHaveBeenCalled();

		vi.advanceTimersByTime(100);
		expect(spy).toHaveBeenCalledTimes(1);
	});
});
