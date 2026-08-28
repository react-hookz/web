import {vi} from 'vitest';

type ListenerMock = ReturnType<typeof vi.fn<(type: string, listener: () => void) => void>>;

export type BatteryManagerMock = {
	charging: boolean;
	chargingTime: number;
	dischargingTime: number;
	level: number;
	addEventListener: ListenerMock;
	removeEventListener: ListenerMock;
};

const initialReadings = {
	charging: true,
	chargingTime: 3600,
	dischargingTime: Infinity,
	level: 0.75,
};

export const mockBattery: BatteryManagerMock = {
	...initialReadings,
	addEventListener: vi.fn(),
	removeEventListener: vi.fn(),
};

export const getBatteryMock: ReturnType<typeof vi.fn<() => Promise<BatteryManagerMock>>> = vi.fn(
	async () => mockBattery,
);

/**
 * Restores the mock battery readings and clears every recorded call.
 *
 * The battery manager is a single object shared by all `getBattery()` calls, so
 * a test that mutates a reading would otherwise leak it into later tests.
 */
export function resetBatteryMock(): void {
	Object.assign(mockBattery, initialReadings);
	mockBattery.addEventListener.mockClear();
	mockBattery.removeEventListener.mockClear();
	getBatteryMock.mockClear();
	getBatteryMock.mockImplementation(async () => mockBattery);
}

Object.defineProperty(globalThis.navigator, 'getBattery', {
	value: getBatteryMock,
	writable: true,
	configurable: true,
});
