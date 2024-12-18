import {renderHook} from '@testing-library/react-hooks/dom';
import {afterAll, afterEach, beforeAll, describe, expect, it, vi} from 'vitest';
import {useRafCallback} from '../index.js';

function testFn(_a: any, _b: any, _c: any) {}

describe('useRafCallback', () => {
	const raf = globalThis.requestAnimationFrame;
	const caf = globalThis.cancelAnimationFrame;

	beforeAll(() => {
		vi.useFakeTimers();

		globalThis.requestAnimationFrame = cb => setTimeout(cb);
		globalThis.cancelAnimationFrame = (cb) => {
			clearTimeout(cb);
		};
	});

	afterEach(() => {
		vi.clearAllTimers();
	});

	afterAll(() => {
		vi.useRealTimers();

		globalThis.requestAnimationFrame = raf;
		globalThis.cancelAnimationFrame = caf;
	});

	it('should be defined', () => {
		expect(useRafCallback).toBeDefined();
	});

	it('should render', () => {
		const {result} = renderHook(() => useRafCallback(() => {}));
		expect(result.error).toBeUndefined();
	});

	it('should return function same length and wrapped name', () => {
		let {result} = renderHook(() => useRafCallback((_a: any, _b: any, _c: any) => {}));

		expect(result.current[0].length).toBe(3);
		expect(result.current[0].name).toBe('anonymous__raf');

		result = renderHook(() => useRafCallback(testFn)).result;

		expect(result.current[0].length).toBe(3);
		expect(result.current[0].name).toBe('testFn__raf');
	});

	it('should return array of functions', () => {
		const {result} = renderHook(() => useRafCallback(() => {}));

		expect(result.current).toBeInstanceOf(Array);
		expect(result.current[0]).toBeInstanceOf(Function);
		expect(result.current[1]).toBeInstanceOf(Function);
	});

	it('should invoke passed function only on next raf', () => {
		const spy = vi.fn();
		const {result} = renderHook(() => useRafCallback(spy));

		result.current[0]();

		expect(spy).not.toHaveBeenCalled();

		vi.advanceTimersToNextTimer();

		expect(spy).toHaveBeenCalled();
	});

	it('should auto-cancel scheduled invocation on consequential calls', () => {
		const spy = vi.fn();
		const {result} = renderHook(() => useRafCallback(spy));

		result.current[0]();
		result.current[0]();
		result.current[0]();
		result.current[0]();

		expect(spy).not.toHaveBeenCalled();

		vi.advanceTimersToNextTimer(5);

		expect(spy).toHaveBeenCalledTimes(1);
	});

	it('should cancel scheduled invocation on second function call', () => {
		const spy = vi.fn();
		const {result} = renderHook(() => useRafCallback(spy));

		result.current[0]();

		result.current[1]();

		vi.advanceTimersToNextTimer(5);

		expect(spy).not.toHaveBeenCalled();
	});

	it('should auto-cancel scheduled invocation on component unmount', () => {
		const spy = vi.fn();
		const {result, unmount} = renderHook(() => useRafCallback(spy));

		result.current[0]();

		unmount();

		vi.advanceTimersToNextTimer(5);

		expect(spy).not.toHaveBeenCalled();
	});
});
