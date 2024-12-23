import {renderHook} from '@testing-library/react-hooks/dom';
import {afterAll, afterEach, beforeAll, describe, expect, it, vi} from 'vitest';
import {useDebouncedCallback} from '../index.js';

function testFn(_a: any, _b: any, _c: any) {}

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

	it('should return function same length and wrapped name', () => {
		let {result} = renderHook(() =>
			useDebouncedCallback((_a: any, _b: any, _c: any) => {}, [], 200));

		expect(result.current.length).toBe(3);
		expect(result.current.name).toBe('anonymous__debounced__200');

		result = renderHook(() => useDebouncedCallback(testFn, [], 100)).result;

		expect(result.current.length).toBe(3);
		expect(result.current.name).toBe('testFn__debounced__100');
	});

	it('should return new callback if delay is changed', () => {
		const {result, rerender} = renderHook(
			({delay}) => useDebouncedCallback(() => {}, [], delay),
			{
				initialProps: {delay: 200},
			},
		);

		const cb1 = result.current;
		rerender({delay: 123});

		expect(cb1).not.toBe(result.current);
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

	it('should cancel previously scheduled call even if parameters changed', () => {
		const cb1 = vi.fn(() => {});
		const cb2 = vi.fn(() => {});

		const {result, rerender} = renderHook(
			({i}) =>
				useDebouncedCallback(
					() => {
						if (i === 1) {
							cb1();
						} else {
							cb2();
						}
					},
					[i],
					200,
				),
			{initialProps: {i: 1}},
		);

		result.current();
		vi.advanceTimersByTime(100);

		rerender({i: 2});
		result.current();
		vi.advanceTimersByTime(200);

		expect(cb1).not.toHaveBeenCalled();
		expect(cb2).toHaveBeenCalledTimes(1);
	});

	it('should cancel debounce execution after component unmount', () => {
		const cb = vi.fn();

		const {result, unmount} = renderHook(() => useDebouncedCallback(cb, [], 150, 200));

		result.current();
		expect(cb).not.toHaveBeenCalled();
		vi.advanceTimersByTime(149);
		expect(cb).not.toHaveBeenCalled();
		unmount();
		vi.advanceTimersByTime(100);
		expect(cb).not.toHaveBeenCalled();
	});

	it('should force execute callback after maxWait milliseconds', () => {
		const cb = vi.fn();

		const {result} = renderHook(() => useDebouncedCallback(cb, [], 150, 200));

		result.current();
		expect(cb).not.toHaveBeenCalled();
		vi.advanceTimersByTime(149);
		result.current();
		expect(cb).not.toHaveBeenCalled();
		vi.advanceTimersByTime(50);
		expect(cb).not.toHaveBeenCalled();
		vi.advanceTimersByTime(1);
		expect(cb).toHaveBeenCalledTimes(1);
	});

	it('should not execute callback twice if maxWait equals delay', () => {
		const cb = vi.fn();

		const {result} = renderHook(() => useDebouncedCallback(cb, [], 200, 200));

		result.current();
		expect(cb).not.toHaveBeenCalled();
		vi.advanceTimersByTime(200);
		expect(cb).toHaveBeenCalledTimes(1);
	});

	it('should call updated function only when deps changed', () => {
		const cb = vi.fn();

		const {result, rerender} = renderHook(
			({cb, deps}: {cb: () => void; deps: any[]}) => useDebouncedCallback(cb, deps, 200, 200),
			{
				initialProps: {
					cb() {},
					deps: [0],
				},
			},
		);

		result.current();

		rerender({cb, deps: [0]});

		vi.advanceTimersByTime(200);
		expect(cb).toHaveBeenCalledTimes(0);

		result.current();

		rerender({cb, deps: [1]});

		vi.advanceTimersByTime(200);
		expect(cb).toHaveBeenCalledTimes(1);
	});
});
