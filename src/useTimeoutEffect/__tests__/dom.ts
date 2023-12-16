import { renderHook } from '@testing-library/react-hooks/dom';
import { useTimeoutEffect } from '../../index.js';

describe('useTimeoutEffect', () => {
	beforeAll(() => {
		jest.useFakeTimers();
	});

	beforeEach(() => {
		jest.clearAllTimers();
	});

	afterAll(() => {
		jest.useRealTimers();
	});

	it('should be defined', () => {
		expect(useTimeoutEffect).toBeDefined();
	});

	it('should render', () => {
		const { result } = renderHook(() => useTimeoutEffect(() => {}, 123));
		expect(result.error).toBeUndefined();
	});

	it('should set and call function after timeout', () => {
		const spy = jest.fn();
		renderHook(() => useTimeoutEffect(spy, 100));

		jest.advanceTimersByTime(99);
		expect(spy).not.toHaveBeenCalled();

		jest.advanceTimersByTime(1);
		expect(spy).toHaveBeenCalledTimes(1);
	});

	it('should set timeout and cancel on unmount', () => {
		const spy = jest.fn();
		const { unmount } = renderHook(() => useTimeoutEffect(spy, 100));

		jest.advanceTimersByTime(99);
		expect(spy).not.toHaveBeenCalled();
		unmount();
		jest.advanceTimersByTime(1);
		expect(spy).not.toHaveBeenCalled();
	});

	it('should reset timeout in delay change', () => {
		const spy = jest.fn();
		const { rerender } = renderHook(({ delay }) => useTimeoutEffect(spy, delay), {
			initialProps: { delay: 100 },
		});

		jest.advanceTimersByTime(99);
		expect(spy).not.toHaveBeenCalled();

		rerender({ delay: 50 });
		jest.advanceTimersByTime(49);
		expect(spy).not.toHaveBeenCalled();

		jest.advanceTimersByTime(1);
		expect(spy).toHaveBeenCalledTimes(1);
	});

	it('should not reset timeout in callback change', () => {
		const spy = jest.fn();
		const { rerender } = renderHook<{ callback: () => void }, void>(
			({ callback }) => useTimeoutEffect(callback, 100),
			{
				initialProps: { callback() {} },
			}
		);

		jest.advanceTimersByTime(99);
		expect(spy).not.toHaveBeenCalled();

		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		rerender({ callback: () => spy() });
		jest.advanceTimersByTime(1);
		expect(spy).toHaveBeenCalledTimes(1);
	});

	it('should cancel timeout if delay is undefined', () => {
		const spy = jest.fn();
		const { rerender } = renderHook<{ delay: number | undefined }, void>(
			({ delay }) => useTimeoutEffect(spy, delay),
			{
				initialProps: { delay: 100 },
			}
		);

		jest.advanceTimersByTime(99);
		expect(spy).not.toHaveBeenCalled();

		rerender({ delay: undefined });
		jest.advanceTimersByTime(2000);
		expect(spy).not.toHaveBeenCalled();
	});

	it('should not cancel timeout if delay is 0', () => {
		const spy = jest.fn();
		renderHook(() => useTimeoutEffect(spy, 0));

		jest.advanceTimersByTime(1);
		expect(spy).toHaveBeenCalledTimes(1);
	});

	it('should cancel timeout if cancel method is called', () => {
		const spy = jest.fn();
		const { result } = renderHook(() => useTimeoutEffect(spy, 100));

		jest.advanceTimersByTime(99);
		expect(spy).not.toHaveBeenCalled();

		result.current[0]();
		jest.advanceTimersByTime(1);
		expect(spy).not.toHaveBeenCalled();
	});

	it('should reset timeout if reset method is called', () => {
		const spy = jest.fn();
		const { result } = renderHook(() => useTimeoutEffect(spy, 100));

		jest.advanceTimersByTime(99);
		expect(spy).not.toHaveBeenCalled();

		result.current[1]();
		jest.advanceTimersByTime(1);
		expect(spy).not.toHaveBeenCalled();

		jest.advanceTimersByTime(100);
		expect(spy).toHaveBeenCalledTimes(1);
	});
});
