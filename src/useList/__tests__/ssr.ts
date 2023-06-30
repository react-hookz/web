import { renderHook } from '@testing-library/react-hooks/server';
import { useList } from '../..';

describe('useList', () => {
	it('should be defined', () => {
		expect(useList).toBeDefined();
	});

	it('should render', () => {
		const { result } = renderHook(() => useList([1, 0, 2]));
		expect(result.error).toBeUndefined();
	});
});
