import {act, renderHook} from '@ver0/react-hooks-testing';
import {afterAll, afterEach, beforeAll, describe, expect, it, vi} from 'vitest';
import {useRafEffect} from '../index.js';

describe('useRafEffect', () => {
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
		expect(useRafEffect).toBeDefined();
	});

	it('should render', async () => {
		const {result} = await renderHook(() => {
			useRafEffect(() => {}, []);
		});
		expect(result.error).toBeUndefined();
	});

	it('should not run unless animation frame', async () => {
		const spy = vi.fn();
		const {rerender} = await renderHook(
			(dep) => {
				useRafEffect(spy, [dep]);
			},
			{
				initialProps: 1,
			},
		);

		expect(spy).toHaveBeenCalledTimes(0);

		await rerender(2);

		expect(spy).toHaveBeenCalledTimes(0);

		await act(async () => {
			vi.advanceTimersToNextTimer();
		});

		expect(spy).toHaveBeenCalledTimes(1);
	});

	it('should cancel animation frame on unmount', async () => {
		const spy = vi.fn();
		const {rerender, unmount} = await renderHook(
			(dep) => {
				useRafEffect(spy, [dep]);
			},
			{
				initialProps: 1,
			},
		);

		expect(spy).toHaveBeenCalledTimes(0);

		await rerender(2);

		expect(spy).toHaveBeenCalledTimes(0);

		await unmount();

		await act(async () => {
			vi.advanceTimersToNextTimer();
		});

		expect(spy).toHaveBeenCalledTimes(0);
	});
});
