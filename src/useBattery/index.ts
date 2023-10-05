import { isEqual } from '@react-hookz/deep-equal';
import { isBrowser } from '../util/const';
import { off, on } from '../util/misc';
import { useEffect, useState } from 'react';

/**
 * The BatteryState interface is the return type of the useBattery Hook.
 *
 * provides information about the system's battery charge level
 * and whether the device is charging, discharging, or fully charged.
 *
 * Uses the [BatteryManager](https://developer.mozilla.org/en-US/docs/Web/API/BatteryManager) interface.
 *
 * In server-side rendering (SSR) environments, the returned values will be undefined.
 */
export type BatteryState = {
	charging: boolean | undefined;
	chargingTime: number | undefined;
	dischargingTime: number | undefined;
	level: number | undefined;
};

type BatteryManager = {
	readonly charging: boolean;
	readonly chargingTime: number;
	readonly dischargingTime: number;
	readonly level: number;
} & EventTarget;

type NavigatorWithPossibleBattery = Navigator & {
	getBattery?: () => Promise<BatteryManager>;
};

const nav: NavigatorWithPossibleBattery | undefined = isBrowser ? navigator : undefined;
/**
 * React hook that tracks battery state.
 *
 * @see https://react-hookz.github.io/web/?path=/docs/navigator-usebattery
 *
 * @returns
 * - {charging} - whether the system is charging
 * - {chargingTime} - time remaining in seconds until the system is fully charged
 * - {dischargingTime} - time remaining in seconds until the system is fully discharged
 * - {level} - battery level in percent
 *
 * In server-side rendering (SSR) environments, the returned values will be undefined.
 */
export function useBattery(): BatteryState {
	const [state, setState] = useState<BatteryState>({
		charging: undefined,
		chargingTime: undefined,
		dischargingTime: undefined,
		level: undefined,
	});

	useEffect(() => {
		let isMounted = true;
		let battery: BatteryManager | null = null;

		const handleChange = () => {
			if (!isMounted || !battery) {
				return;
			}

			const newState: BatteryState = {
				level: battery.level,
				charging: battery.charging,
				dischargingTime: battery.dischargingTime,
				chargingTime: battery.chargingTime,
			};

			// eslint-disable-next-line @typescript-eslint/no-unused-expressions
			!isEqual(state, newState) && setState(newState);
		};

		nav
			?.getBattery?.()
			.then((bat: BatteryManager) => {
				// eslint-disable-next-line promise/always-return
				if (!isMounted) {
					return;
				}

				battery = bat;
				on(battery, 'chargingchange', handleChange);
				on(battery, 'chargingtimechange', handleChange);
				on(battery, 'dischargingtimechange', handleChange);
				on(battery, 'levelchange', handleChange);
				handleChange();
			})
			.catch(() => {
				// ignore
			});

		return () => {
			isMounted = false;
			if (battery) {
				off(battery, 'chargingchange', handleChange);
				off(battery, 'chargingtimechange', handleChange);
				off(battery, 'dischargingtimechange', handleChange);
				off(battery, 'levelchange', handleChange);
			}
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return state;
}
