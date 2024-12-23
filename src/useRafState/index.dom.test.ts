import {act, renderHook} from '@testing-library/react-hooks/dom';
import {afterAll, afterEach, beforeAll, describe, expect, it, vi} from 'vitest';
import {useRafState} from '../index.js';

describe('useRafState', () => {
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
		expect(useRafState).toBeDefined();
	});

	it('should render', () => {
		const {result} = renderHook(() => useRafState());
		expect(result.error).toBeUndefined();
	});

	it('should not update state unless animation frame', () => {
		const {result} = renderHook(() => useRafState<number>());

		act(() => {
			result.current[1](1);
			result.current[1](2);
			result.current[1](3);
		});

		expect(result.current[0]).toBeUndefined();

		act(() => {
			vi.advanceTimersToNextTimer();
		});

		expect(result.current[0]).toBe(3);
		expect(result.all.length).toBe(2);
	});

	it('should cancel animation frame on unmount', () => {
		const {result, unmount} = renderHook(() => useRafState<number>());

		act(() => {
			result.current[1](1);
			result.current[1](2);
			result.current[1](3);
		});

		unmount();

		expect(result.current[0]).toBeUndefined();
	});
});
