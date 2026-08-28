import {act, renderHook} from '@ver0/react-hooks-testing';
import {beforeEach, describe, expect, it} from 'vitest';
import {useBattery} from '../index.js';
import type {BatteryManagerMock} from '../util/testing/setup/battery.test.js';
import {getBatteryMock, mockBattery, resetBatteryMock} from '../util/testing/setup/battery.test.js';
import {expectCallArgs, expectResultValue} from '../util/testing/test-helpers.js';

/** Flushes the microtask queue so the hook's pending getBattery() settles. */
const flushBattery = async () => {
	await act(async () => {
		await Promise.resolve();
	});
};

describe('useBattery', () => {
	beforeEach(() => {
		resetBatteryMock();
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

		expect(Object.keys(value).toSorted()).toEqual([
			'charging',
			'chargingTime',
			'dischargingTime',
			'fetched',
			'isSupported',
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

		await flushBattery();

		const value = expectResultValue(result);
		expect(value.fetched).toBe(true);
		expect(value.charging).toBe(true);
		expect(value.chargingTime).toBe(3600);
		expect(value.dischargingTime).toBe(Infinity);
		expect(value.level).toBe(0.75);
	});

	it('should subscribe to battery events', async () => {
		await renderHook(() => useBattery());

		await flushBattery();

		expect(mockBattery.addEventListener).toHaveBeenCalledWith('chargingchange', expect.any(Function));
		expect(mockBattery.addEventListener).toHaveBeenCalledWith('chargingtimechange', expect.any(Function));
		expect(mockBattery.addEventListener).toHaveBeenCalledWith('dischargingtimechange', expect.any(Function));
		expect(mockBattery.addEventListener).toHaveBeenCalledWith('levelchange', expect.any(Function));
	});

	it('should unsubscribe the very handlers it registered on unmount', async () => {
		const {unmount} = await renderHook(() => useBattery());

		await flushBattery();

		// Compared by reference, so removing a different function than the one
		// registered -- a listener leak -- fails here.
		const registered = [...mockBattery.addEventListener.mock.calls];
		expect(registered).toHaveLength(4);

		await unmount();

		expect(mockBattery.removeEventListener.mock.calls).toEqual(registered);
	});

	it('should update state when battery events fire', async () => {
		const {result} = await renderHook(() => useBattery());

		await flushBattery();

		let value = expectResultValue(result);
		expect(value.level).toBe(0.75);

		// Simulate battery level change
		mockBattery.level = 0.5;

		const [, levelChangeHandler] = expectCallArgs(mockBattery.addEventListener, 3);

		await act(async () => {
			levelChangeHandler();
		});

		value = expectResultValue(result);
		expect(value.level).toBe(0.5);
	});

	it('should not subscribe when unmounted before getBattery() resolves', async () => {
		let resolveBattery: (battery: BatteryManagerMock) => void = () => undefined;

		getBatteryMock.mockImplementation(
			async () =>
				new Promise<BatteryManagerMock>((resolve) => {
					resolveBattery = resolve;
				}),
		);

		const {unmount} = await renderHook(() => useBattery());
		await unmount();

		resolveBattery(mockBattery);
		await flushBattery();

		expect(mockBattery.addEventListener).not.toHaveBeenCalled();
	});

	it('should report unfetched state when getBattery() rejects', async () => {
		getBatteryMock.mockImplementation(async () => {
			throw new Error('Battery API blocked by permissions policy');
		});

		const {result} = await renderHook(() => useBattery());

		await flushBattery();

		const value = expectResultValue(result);
		expect(value.fetched).toBe(false);
		expect(value.isSupported).toBe(true);
		expect(value.charging).toBeUndefined();
		expect(value.level).toBeUndefined();
		expect(mockBattery.addEventListener).not.toHaveBeenCalled();
	});
});
