import {renderHook} from '@ver0/react-hooks-testing';
import {afterAll, afterEach, beforeAll, describe, expect, it, vi} from 'vitest';
import {useRafCallback} from '../index.js';
import {expectResultValue} from '../util/testing/test-helpers.js';

function testFn(_a: any, _b: any, _c: any) {}

describe('useRafCallback', () => {
	const raf = globalThis.requestAnimationFrame;
	const caf = globalThis.cancelAnimationFrame;

	beforeAll(() => {
		vi.useFakeTimers();

		globalThis.requestAnimationFrame = (cb) => setTimeout(cb);
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

	it('should be defined', async () => {
		expect(useRafCallback).toBeDefined();
	});

	it('should render', async () => {
		const {result} = await renderHook(() => useRafCallback(() => {}));
		expect(result.error).toBeUndefined();
	});

	it('should return function same length and wrapped name', async () => {
		let {result} = await renderHook(() => useRafCallback((_a: any, _b: any, _c: any) => {}));
		let value = expectResultValue(result);

		expect(value[0].length).toBe(3);
		expect(value[0].name).toBe('anonymous__raf');

		({result} = await renderHook(() => useRafCallback(testFn)));
		value = expectResultValue(result);

		expect(value[0].length).toBe(3);
		expect(value[0].name).toBe('testFn__raf');
	});

	it('should return array of functions', async () => {
		const {result} = await renderHook(() => useRafCallback(() => {}));
		const value = expectResultValue(result);

		expect(value).toBeInstanceOf(Array);
		expect(value[0]).toBeInstanceOf(Function);
		expect(value[1]).toBeInstanceOf(Function);
	});

	it('should invoke passed function only on next raf', async () => {
		const spy = vi.fn();
		const {result} = await renderHook(() => useRafCallback(spy));
		const value = expectResultValue(result);

		value[0]();

		expect(spy).not.toHaveBeenCalled();

		vi.advanceTimersToNextTimer();

		expect(spy).toHaveBeenCalled();
	});

	it('should auto-cancel scheduled invocation on consequential calls', async () => {
		const spy = vi.fn();
		const {result} = await renderHook(() => useRafCallback(spy));
		const value = expectResultValue(result);

		value[0]();
		value[0]();
		value[0]();
		value[0]();

		expect(spy).not.toHaveBeenCalled();

		vi.advanceTimersToNextTimer();

		expect(spy).toHaveBeenCalledTimes(1);
	});

	it('should cancel scheduled invocation on second function call', async () => {
		const spy = vi.fn();
		const {result} = await renderHook(() => useRafCallback(spy));
		const value = expectResultValue(result);

		value[0]();

		value[1]();

		vi.advanceTimersToNextTimer();

		expect(spy).not.toHaveBeenCalled();
	});

	it('should auto-cancel scheduled invocation on component unmount', async () => {
		const spy = vi.fn();
		const {result, unmount} = await renderHook(() => useRafCallback(spy));
		const value = expectResultValue(result);

		value[0]();

		await unmount();

		vi.advanceTimersToNextTimer();

		expect(spy).not.toHaveBeenCalled();
	});
});
