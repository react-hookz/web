import { renderHook } from '@testing-library/react-hooks/server';
import { useVibrate } from '../..';

describe('useVibrate', () => {
	it('should be defined', () => {
		expect(useVibrate).toBeDefined();
	});

	it('should render', () => {
		const { result } = renderHook(() => {
			useVibrate(true, 100);
		});
		expect(result.error).toBeUndefined();
	});
});
