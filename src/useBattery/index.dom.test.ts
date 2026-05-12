import {act, renderHook} from '@ver0/react-hooks-testing';
import type {vi} from 'vitest';
import {describe, expect, it, beforeEach} from 'vitest';
import {useBattery} from '../index.js';
import {expectResultValue} from '../util/testing/test-helpers.js';

type MockFn = ReturnType<typeof vi.fn>;

type BatteryManager = {
	charging: boolean;
	chargingTime: number;
	dischargingTime: number;
	level: number;
	addEventListener: MockFn;
	removeEventListener: MockFn;
};

describe('useBattery', () => {
	// Use the global getBattery mock that's already set up in the test environment
	// eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
	const getBatteryMock = globalThis.navigator.getBattery as MockFn;

	// Access the mock battery object from the getBattery mock
	let mockBattery: BatteryManager;

	beforeEach(async () => {
		getBatteryMock.mockClear();
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		mockBattery = await getBatteryMock();
		mockBattery.addEventListener.mockClear();
		mockBattery.removeEventListener.mockClear();
	});

	it('should be defined', () => {
		expect(useBattery).toBeDefined();
	});

	it('should render', async () => {
		const {result} = await renderHook(() => useBattery());
		expectResultValue(result);
	});

	it('should return an object of certain structure', async () => {
		const {result} = await renderHook(() => useBattery());
		const value = expectResultValue(result);

		expect(typeof value).toBe('object');
		expect(Object.keys(value)).toEqual([
			'isSupported',
			'fetched',
			'charging',
			'chargingTime',
			'dischargingTime',
			'level',
		]);
	});

	it('should return isSupported: true when API is available', async () => {
		const {result} = await renderHook(() => useBattery());
		const value = expectResultValue(result);
		expect(value.isSupported).toBe(true);
	});

	it('should fetch battery state when API is supported', async () => {
		const {result} = await renderHook(() => useBattery());

		await act(async () => {
			await Promise.resolve();
		});

		const value = expectResultValue(result);
		expect(value.fetched).toBe(true);
		expect(value.charging).toBe(true);
		expect(value.chargingTime).toBe(3600);
		expect(value.dischargingTime).toBe(Infinity);
		expect(value.level).toBe(0.75);
	});

	it('should subscribe to battery events', async () => {
		await renderHook(() => useBattery());

		await act(async () => {
			await Promise.resolve();
		});

		expect(mockBattery.addEventListener).toHaveBeenCalledWith('chargingchange', expect.any(Function));
		expect(mockBattery.addEventListener).toHaveBeenCalledWith('chargingtimechange', expect.any(Function));
		expect(mockBattery.addEventListener).toHaveBeenCalledWith('dischargingtimechange', expect.any(Function));
		expect(mockBattery.addEventListener).toHaveBeenCalledWith('levelchange', expect.any(Function));
	});

	it('should unsubscribe from battery events on unmount', async () => {
		const {unmount} = await renderHook(() => useBattery());

		await act(async () => {
			await Promise.resolve();
		});

		await unmount();

		expect(mockBattery.removeEventListener).toHaveBeenCalledWith('chargingchange', expect.any(Function));
		expect(mockBattery.removeEventListener).toHaveBeenCalledWith('chargingtimechange', expect.any(Function));
		expect(mockBattery.removeEventListener).toHaveBeenCalledWith('dischargingtimechange', expect.any(Function));
		expect(mockBattery.removeEventListener).toHaveBeenCalledWith('levelchange', expect.any(Function));
	});

	it('should update state when battery events fire', async () => {
		const {result} = await renderHook(() => useBattery());

		await act(async () => {
			await Promise.resolve();
		});

		let value = expectResultValue(result);
		expect(value.level).toBe(0.75);

		// Simulate battery level change
		mockBattery.level = 0.5;

		// Get the handler that was registered for levelchange
		// eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
		const levelChangeHandler = mockBattery.addEventListener.mock.calls.find(
			(call) => call[0] === 'levelchange',
		)?.[1] as () => void;

		await act(async () => {
			levelChangeHandler();
		});

		value = expectResultValue(result);
		expect(value.level).toBe(0.5);
	});
});
