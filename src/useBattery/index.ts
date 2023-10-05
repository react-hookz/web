import { isEqual } from '@react-hookz/deep-equal';
import { isBrowser } from '../util/const';
import { useState } from 'react';

export type BatteryState = {
	charging: boolean | undefined;
	chargingTime: number | undefined;
	dischargingTime: number | undefined;
	level: number | undefined;
};
export function useBattery(): BatteryState {
	const [state, setState] = useState<BatteryState>({
		charging: undefined,
		chargingTime: undefined,
		dischargingTime: undefined,
		level: undefined,
	});
	return state;
}
