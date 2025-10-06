import {renderHook} from '@ver0/react-hooks-testing';
import {beforeEach, describe, expect, it, vi} from 'vitest';
import {useVibrate} from '../index.js';

describe('useVibrate', () => {
	// Use the global vibrate mock that's already set up in the test environment
	// eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
	const vibrateMock = globalThis.navigator.vibrate as ReturnType<typeof vi.fn>;

	beforeEach(() => {
		vibrateMock.mockClear();
	});

	it('should be defined', async () => {
		expect(useVibrate).toBeDefined();
	});

	it('should render', async () => {
		const {result} = await renderHook(() => {
			useVibrate(true, 100);
		});
		expect(result.error).toBeUndefined();
	});

	it('should call navigator.vibrate', async () => {
		await renderHook(() => {
			useVibrate(true, [100, 200]);
		});
		expect(vibrateMock).toHaveBeenCalledTimes(1);
		expect(vibrateMock.mock.calls[0][0]).toEqual([100, 200]);
	});

	it('should call navigator.vibrate(0) on unmount', async () => {
		const {unmount} = await renderHook(() => {
			useVibrate(true, [100, 200], true);
		});

		await unmount();

		expect(vibrateMock.mock.calls[1][0]).toEqual(0);
	});

	it('should vibrate constantly using interval', async () => {
		vi.useFakeTimers();

		await renderHook(() => {
			useVibrate(true, 300, true);
		});

		expect(vibrateMock).toHaveBeenCalledTimes(1);
		expect(vibrateMock.mock.calls[0][0]).toEqual(300);

		vi.advanceTimersByTime(299);
		expect(vibrateMock).toHaveBeenCalledTimes(1);

		vi.advanceTimersByTime(1);
		expect(vibrateMock).toHaveBeenCalledTimes(2);
		expect(vibrateMock.mock.calls[1][0]).toEqual(300);

		vi.advanceTimersByTime(300);
		expect(vibrateMock).toHaveBeenCalledTimes(3);
		expect(vibrateMock.mock.calls[2][0]).toEqual(300);

		vi.useRealTimers();
	});
});
