import {renderHook} from '@testing-library/react-hooks/dom';
import {afterAll, beforeEach, describe, expect, it, vi} from 'vitest';
import {useVibrate} from '../index.js';

describe('useVibrate', () => {
	const vibrateSpy = vi.spyOn(navigator, 'vibrate');

	beforeEach(() => {
		vibrateSpy.mockReset();
	});

	afterAll(() => {
		vibrateSpy.mockRestore();
	});

	it('should be defined', () => {
		expect(useVibrate).toBeDefined();
	});

	it('should render', () => {
		const {result} = renderHook(() => {
			useVibrate(true, 100);
		});
		expect(result.error).toBeUndefined();
	});

	it('should call navigator.vibrate', () => {
		renderHook(() => {
			useVibrate(true, [100, 200]);
		});
		expect(vibrateSpy).toHaveBeenCalledTimes(1);
		expect(vibrateSpy.mock.calls[0][0]).toEqual([100, 200]);
	});

	it('should call navigator.vibrate(0) on unmount', () => {
		const {unmount} = renderHook(() => {
			useVibrate(true, [100, 200], true);
		});
		unmount();

		expect(vibrateSpy.mock.calls[1][0]).toEqual(0);
	});

	it('should vibrate constantly using interval', () => {
		vi.useFakeTimers();
		renderHook(() => {
			useVibrate(true, 300, true);
		});

		expect(vibrateSpy).toHaveBeenCalledTimes(1);
		expect(vibrateSpy.mock.calls[0][0]).toEqual(300);

		vi.advanceTimersByTime(299);
		expect(vibrateSpy).toHaveBeenCalledTimes(1);

		vi.advanceTimersByTime(1);
		expect(vibrateSpy).toHaveBeenCalledTimes(2);
		expect(vibrateSpy.mock.calls[1][0]).toEqual(300);

		vi.advanceTimersByTime(300);
		expect(vibrateSpy).toHaveBeenCalledTimes(3);
		expect(vibrateSpy.mock.calls[2][0]).toEqual(300);

		vi.useRealTimers();
	});
});
