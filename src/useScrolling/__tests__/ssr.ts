import { renderHook } from '@testing-library/react-hooks/server';
import { useScrolling } from '../..';

describe('useScrolling', () => {
	it('should be defined', () => {
		expect(useScrolling).toBeDefined();
	});

	it('should render', () => {
		const { result } = renderHook(() => useScrolling({ current: null }));
		expect(result.error).toBeUndefined();
	});
});
