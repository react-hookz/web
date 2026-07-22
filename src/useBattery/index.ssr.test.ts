import {renderHookServer as renderHook} from '@ver0/react-hooks-testing';
import {describe, expect, it} from 'vitest';
import {useBattery} from '../index.js';

describe('useBattery', () => {
	it('should be defined', () => {
		expect(useBattery).toBeDefined();
	});

	it('should render', async () => {
		const {result} = await renderHook(() => useBattery());
		expect(result.error).toBeUndefined();
	});

	it('should return isSupported as false in SSR', async () => {
		const {result} = await renderHook(() => useBattery());
		expect(result.value?.isSupported).toBe(false);
	});

	it('should return fetched as false in SSR', async () => {
		const {result} = await renderHook(() => useBattery());
		expect(result.value?.fetched).toBe(false);
	});

	it('should return undefined values in SSR', async () => {
		const {result} = await renderHook(() => useBattery());
		expect(result.value?.charging).toBeUndefined();
		expect(result.value?.chargingTime).toBeUndefined();
		expect(result.value?.dischargingTime).toBeUndefined();
		expect(result.value?.level).toBeUndefined();
	});
});
