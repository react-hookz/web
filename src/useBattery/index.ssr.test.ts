import {renderHookServer as renderHook} from '@ver0/react-hooks-testing';
import {describe, expect, it} from 'vitest';
import {useBattery} from '../index.js';
import {expectResultValue} from '../util/testing/test-helpers.js';

describe('useBattery', () => {
	it('should be defined', () => {
		expect(useBattery).toBeDefined();
	});

	it('should render', async () => {
		const {result} = await renderHook(() => useBattery());
		expectResultValue(result);
	});

	it('should return isSupported as false in SSR', async () => {
		const {result} = await renderHook(() => useBattery());
		expect(expectResultValue(result).isSupported).toBe(false);
	});

	it('should return fetched as false in SSR', async () => {
		const {result} = await renderHook(() => useBattery());
		expect(expectResultValue(result).fetched).toBe(false);
	});

	it('should return undefined values in SSR', async () => {
		const {result} = await renderHook(() => useBattery());
		const value = expectResultValue(result);

		expect(value.charging).toBeUndefined();
		expect(value.chargingTime).toBeUndefined();
		expect(value.dischargingTime).toBeUndefined();
		expect(value.level).toBeUndefined();
	});
});
