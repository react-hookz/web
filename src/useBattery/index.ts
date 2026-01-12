import {useEffect, useState} from 'react';
import {isBrowser} from '../util/const.js';
import {off, on} from '../util/misc.js';

export type BatteryState = {
	/**
	 * Whether the battery is currently being charged.
	 */
	charging: boolean | undefined;
	/**
	 * Time in seconds until the battery is fully charged, or Infinity if not charging.
	 */
	chargingTime: number | undefined;
	/**
	 * Time in seconds until the battery is fully discharged, or Infinity if charging.
	 */
	dischargingTime: number | undefined;
	/**
	 * Battery charge level between 0 and 1.
	 */
	level: number | undefined;
};

export type UseBatteryState = BatteryState & {
	/**
	 * Whether the Battery Status API is supported by the browser.
	 */
	isSupported: boolean;
	/**
	 * Whether the battery state has been fetched.
	 */
	fetched: boolean;
};

type BatteryManager = {
	charging: boolean;
	chargingTime: number;
	dischargingTime: number;
	level: number;
} & EventTarget;

type NavigatorWithBattery = Navigator & {
	getBattery?: () => Promise<BatteryManager>;
};

const nav = isBrowser ? (globalThis.navigator as NavigatorWithBattery) : undefined;
const isSupported = Boolean(nav?.getBattery);

function getBatteryState(battery: BatteryManager | null): UseBatteryState {
	if (!battery) {
		return {
			isSupported,
			fetched: false,
			charging: undefined,
			chargingTime: undefined,
			dischargingTime: undefined,
			level: undefined,
		};
	}

	return {
		isSupported,
		fetched: true,
		charging: battery.charging,
		chargingTime: battery.chargingTime,
		dischargingTime: battery.dischargingTime,
		level: battery.level,
	};
}

/**
 * Tracks the state of device's battery.
 *
 * @returns An object containing the battery state and whether the API is supported.
 *
 * @example
 * const { isSupported, level, charging } = useBattery();
 *
 * if (!isSupported) {
 *   return <p>Battery API not supported</p>;
 * }
 *
 * return (
 *   <p>
 *     Battery level: {level ? `${Math.round(level * 100)}%` : 'Unknown'}
 *     {charging && ' (Charging)'}
 *   </p>
 * );
 */
export function useBattery(): UseBatteryState {
	const [state, setState] = useState<UseBatteryState>(() => getBatteryState(null));

	useEffect(() => {
		if (!isSupported || !nav?.getBattery) {
			return;
		}

		let battery: BatteryManager | null = null;
		let mounted = true;

		const handleChange = () => {
			if (battery && mounted) {
				setState(getBatteryState(battery));
			}
		};

		// eslint-disable-next-line @typescript-eslint/no-floating-promises,promise/prefer-await-to-then,promise/always-return
		nav
			.getBattery()
			.then((b) => {
				if (!mounted) {
					return;
				}

				battery = b;
				setState(getBatteryState(battery));

				on(battery, 'chargingchange', handleChange);
				on(battery, 'chargingtimechange', handleChange);
				on(battery, 'dischargingtimechange', handleChange);
				on(battery, 'levelchange', handleChange);
			})
			.catch((error) => {
				// Gracefully handle getBattery() rejections to avoid unhandled promise rejections
				if (process.env.NODE_ENV !== 'production') {
					// eslint-disable-next-line no-console
					console.error('Failed to get battery status:', error);
				}
				if (mounted) {
					setState(getBatteryState(null));
				}
			});

		return () => {
			mounted = false;
			if (battery) {
				off(battery, 'chargingchange', handleChange);
				off(battery, 'chargingtimechange', handleChange);
				off(battery, 'dischargingtimechange', handleChange);
				off(battery, 'levelchange', handleChange);
			}
		};
	}, []);

	return state;
}
