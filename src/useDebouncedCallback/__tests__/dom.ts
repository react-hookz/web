import { renderHook } from '@testing-library/react-hooks/dom';
import { useDebouncedCallback } from '../..';

describe('useDebouncedCallback', () => {
	beforeAll(() => {
		jest.useFakeTimers();
	});

	afterEach(() => {
		jest.clearAllTimers();
	});

	afterAll(() => {
		jest.useRealTimers();
	});

	it('should be defined', () => {
		expect(useDebouncedCallback).toBeDefined();
	});

	it('should render', () => {
		const { result } = renderHook(() => {
			useDebouncedCallback(() => {}, [], 200);
		});
		expect(result.error).toBeUndefined();
	});

	it('should return function same length and wrapped name', () => {
		let { result } = renderHook(() =>
			useDebouncedCallback((_a: any, _b: any, _c: any) => {}, [], 200)
		);

		expect(result.current.length).toBe(3);
		expect(result.current.name).toBe(`anonymous__debounced__200`);

		function testFn(_a: any, _b: any, _c: any) {}

		result = renderHook(() => useDebouncedCallback(testFn, [], 100)).result;

		expect(result.current.length).toBe(3);
		expect(result.current.name).toBe(`testFn__debounced__100`);
	});

	it('should return new callback if delay is changed', () => {
		const { result, rerender } = renderHook(
			({ delay }) => useDebouncedCallback(() => {}, [], delay),
			{
				initialProps: { delay: 200 },
			}
		);

		const cb1 = result.current;
		rerender({ delay: 123 });

		expect(cb1).not.toBe(result.current);
	});

	it('should run given callback only after specified delay since last call', () => {
		const cb = jest.fn();
		const { result } = renderHook(() => useDebouncedCallback(cb, [], 200));

		result.current();
		expect(cb).not.toHaveBeenCalled();

		jest.advanceTimersByTime(100);
		result.current();

		jest.advanceTimersByTime(199);
		expect(cb).not.toHaveBeenCalled();

		jest.advanceTimersByTime(1);
		expect(cb).toHaveBeenCalledTimes(1);
	});

	it('should pass parameters to callback', () => {
		const cb = jest.fn((_a: number, _c: string) => {});
		const { result } = renderHook(() => useDebouncedCallback(cb, [], 200));

		result.current(1, 'abc');
		jest.advanceTimersByTime(200);
		expect(cb).toHaveBeenCalledWith(1, 'abc');
	});

	it('should cancel previously scheduled call even if parameters changed', () => {
		const cb1 = jest.fn(() => {});
		const cb2 = jest.fn(() => {});

		const { result, rerender } = renderHook(
			({ i }) =>
				useDebouncedCallback(
					() => {
						if (i === 1) {
							cb1();
						} else {
							cb2();
						}
					},
					[i],
					200
				),
			{ initialProps: { i: 1 } }
		);

		result.current();
		jest.advanceTimersByTime(100);

		rerender({ i: 2 });
		result.current();
		jest.advanceTimersByTime(200);

		expect(cb1).not.toHaveBeenCalled();
		expect(cb2).toHaveBeenCalledTimes(1);
	});

	it('should cancel debounce execution after component unmount', () => {
		const cb = jest.fn();

		const { result, unmount } = renderHook(() => useDebouncedCallback(cb, [], 150, 200));

		result.current();
		expect(cb).not.toHaveBeenCalled();
		jest.advanceTimersByTime(149);
		expect(cb).not.toHaveBeenCalled();
		unmount();
		jest.advanceTimersByTime(100);
		expect(cb).not.toHaveBeenCalled();
	});

	it('should force execute callback after maxWait milliseconds', () => {
		const cb = jest.fn();

		const { result } = renderHook(() => useDebouncedCallback(cb, [], 150, 200));

		result.current();
		expect(cb).not.toHaveBeenCalled();
		jest.advanceTimersByTime(149);
		result.current();
		expect(cb).not.toHaveBeenCalled();
		jest.advanceTimersByTime(50);
		expect(cb).not.toHaveBeenCalled();
		jest.advanceTimersByTime(1);
		expect(cb).toHaveBeenCalledTimes(1);
	});

	it('should not execute callback twice if maxWait equals delay', () => {
		const cb = jest.fn();

		const { result } = renderHook(() => useDebouncedCallback(cb, [], 200, 200));

		result.current();
		expect(cb).not.toHaveBeenCalled();
		jest.advanceTimersByTime(200);
		expect(cb).toHaveBeenCalledTimes(1);
	});
});
