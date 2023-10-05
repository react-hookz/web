import { renderHook } from '@testing-library/react-hooks/server';
import { useBattery } from '../..';

describe('useBattery', () => {
	it('should be defined', () => {
		expect(useBattery).toBeDefined();
	});

	it('should render', () => {
		const { result } = renderHook(() => useBattery());
		expect(result.error).toBeUndefined();
	});
	it('should return an object of certain structure', () => {
		const hook = renderHook(() => useBattery(), { initialProps: false });

		expect(typeof hook.result.current).toEqual('object');
		expect(Object.keys(hook.result.current)).toEqual([
			'charging',
			'chargingTime',
			'dischargingTime',
			'level',
		]);
	});
	it('should return undefined values', () => {
		const hook = renderHook(() => useBattery(), { initialProps: false });

		expect(hook.result.current.charging).toBeUndefined();
		expect(hook.result.current.chargingTime).toBeUndefined();
		expect(hook.result.current.dischargingTime).toBeUndefined();
		expect(hook.result.current.level).toBeUndefined();
	});
});
