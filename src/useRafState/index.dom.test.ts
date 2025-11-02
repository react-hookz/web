import {act, renderHook} from '@ver0/react-hooks-testing';
import {afterAll, afterEach, beforeAll, describe, expect, it, vi} from 'vitest';
import {useRafState} from '../index.js';
import {expectResultValue} from '../util/testing/test-helpers.js';

describe('useRafState', () => {
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
		expect(useRafState).toBeDefined();
	});

	it('should render', async () => {
		const {result} = await renderHook(() => useRafState());
		expect(result.error).toBeUndefined();
	});

	it('should not update state unless animation frame', async () => {
		const {result} = await renderHook(() => useRafState<number>());
		let value = expectResultValue(result);

		await act(async () => {
			value[1](1);
			value[1](2);
			value[1](3);
		});

		value = expectResultValue(result);
		expect(value[0]).toBeUndefined();

		await act(async () => {
			vi.advanceTimersToNextTimer();
		});

		value = expectResultValue(result);
		expect(value[0]).toBe(3);
		expect(result.all.length).toBe(2);
	});

	it('should cancel animation frame on unmount', async () => {
		const {result, unmount} = await renderHook(() => useRafState<number>());
		let value = expectResultValue(result);

		await act(async () => {
			value[1](1);
			value[1](2);
			value[1](3);
		});

		await unmount();

		value = expectResultValue(result);
		expect(value[0]).toBeUndefined();
	});
});
