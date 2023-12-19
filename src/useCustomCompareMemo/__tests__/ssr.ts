import { renderHook } from '@testing-library/react-hooks/server';
import { useCustomCompareMemo } from '#root/index.js';

describe('useCustomCompareMemo', () => {
	it('should be defined', () => {
		expect(useCustomCompareMemo).toBeDefined();
	});

	it('should render', () => {
		const { result } = renderHook(() =>
			useCustomCompareMemo(
				() => ({ user: { name: 'John' } }),
				[],
				() => true
			)
		);
		expect(result.error).toBeUndefined();
	});
});
