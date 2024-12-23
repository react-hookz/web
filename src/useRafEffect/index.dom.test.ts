import {act, renderHook} from '@testing-library/react-hooks/dom';
import {afterAll, afterEach, beforeAll, describe, expect, it, vi} from 'vitest';
import {useRafEffect} from '../index.js';

describe('useRafEffect', () => {
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
		expect(useRafEffect).toBeDefined();
	});

	it('should render', () => {
		const {result} = renderHook(() => {
			useRafEffect(() => {}, []);
		});
		expect(result.error).toBeUndefined();
	});

	it('should not run unless animation frame', () => {
		const spy = vi.fn();
		const {rerender} = renderHook(
			(dep) => {
				useRafEffect(spy, [dep]);
			},
			{
				initialProps: 1,
			},
		);

		expect(spy).toHaveBeenCalledTimes(0);

		rerender(2);

		expect(spy).toHaveBeenCalledTimes(0);

		act(() => {
			vi.advanceTimersToNextTimer();
		});

		expect(spy).toHaveBeenCalledTimes(1);
	});

	it('should cancel animation frame on unmount', () => {
		const spy = vi.fn();
		const {rerender, unmount} = renderHook(
			(dep) => {
				useRafEffect(spy, [dep]);
			},
			{
				initialProps: 1,
			},
		);

		expect(spy).toHaveBeenCalledTimes(0);

		rerender(2);

		expect(spy).toHaveBeenCalledTimes(0);

		unmount();

		act(() => {
			vi.advanceTimersToNextTimer();
		});

		expect(spy).toHaveBeenCalledTimes(0);
	});
});
