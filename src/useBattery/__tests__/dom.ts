import { renderHook } from '@testing-library/react-hooks/dom';
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
});
