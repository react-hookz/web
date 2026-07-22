import {vi} from 'vitest';

type BatteryManager = {
	charging: boolean;
	chargingTime: number;
	dischargingTime: number;
	level: number;
	addEventListener: ReturnType<typeof vi.fn>;
	removeEventListener: ReturnType<typeof vi.fn>;
};

const mockBattery: BatteryManager = {
	charging: true,
	chargingTime: 3600,
	dischargingTime: Infinity,
	level: 0.75,
	addEventListener: vi.fn(),
	removeEventListener: vi.fn(),
};

const getBatteryMock = vi.fn<() => Promise<BatteryManager>>(async () => mockBattery);

Object.defineProperty(globalThis.navigator, 'getBattery', {
	value: getBatteryMock,
	writable: true,
	configurable: true,
});
