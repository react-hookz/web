import {useEffect, useState} from 'react';
import {isBrowser} from '../util/const.js';
import {off, on} from '../util/misc.js';

export type UseBatteryState = {
	/**
	 * Whether the Battery Status API is supported by the browser.
	 */
	isSupported: boolean;
	/**
	 * Whether the battery state has been fetched.
	 */
	fetched: boolean;
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

type BatteryManager = {
	charging: boolean;
	chargingTime: number;
	dischargingTime: number;
	level: number;
} & EventTarget;

type NavigatorWithBattery = Navigator & {
	getBattery?: () => Promise<BatteryManager>;
};

const BATTERY_EVENTS = ['chargingchange', 'chargingtimechange', 'dischargingtimechange', 'levelchange'] as const;

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
 *     Battery level: {level === undefined ? 'Unknown' : `${Math.round(level * 100)}%`}
 *     {charging && ' (Charging)'}
 *   </p>
 * );
 */
export function useBattery(): UseBatteryState {
	const [state, setState] = useState<UseBatteryState>(() => getBatteryState(null));

	useEffect(() => {
		// Not covered by the DOM suite: `nav` is resolved once at module scope (as in
		// useNetworkState), so the mocked `getBattery` is always present by the time a
		// test runs. The unsupported path is exercised by the SSR suite instead.
		if (!nav?.getBattery) {
			return undefined;
		}

		const {getBattery} = nav;

		let battery: BatteryManager | null = null;
		let mounted = true;

		const handleChange = () => {
			if (battery && mounted) {
				setState(getBatteryState(battery));
			}
		};

		const subscribe = async (): Promise<void> => {
			try {
				const current = await getBattery.call(nav);

				// The effect may have been cleaned up while getBattery() was pending;
				// subscribing then would leak listeners nothing will ever remove.
				if (!mounted) {
					return;
				}

				battery = current;
				setState(getBatteryState(current));

				for (const event of BATTERY_EVENTS) {
					on(current, event, handleChange);
				}
			} catch (error: unknown) {
				// Some browsers reject when the API is disabled by policy; report the
				// state as unfetched rather than leaving the rejection unhandled.
				// The warning itself stays uncovered: NODE_ENV is 'test' under vitest.
				if (process.env.NODE_ENV === 'development') {
					// eslint-disable-next-line no-console
					console.error('Failed to get battery status:', error);
				}

				if (mounted) {
					setState(getBatteryState(null));
				}
			}
		};

		void subscribe();

		return () => {
			mounted = false;

			if (battery) {
				for (const event of BATTERY_EVENTS) {
					off(battery, event, handleChange);
				}
			}
		};
	}, []);

	return state;
}
