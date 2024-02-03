import { renderHook } from '@testing-library/react-hooks/server';
import { usePermission } from '../../index.js';

describe('usePermission', () => {
	it('should be defined', () => {
		expect(usePermission).toBeDefined();
	});

	it('should render', () => {
		const { result } = renderHook(() => usePermission({ name: 'geolocation' }));
		expect(result.error).toBeUndefined();
	});
});
