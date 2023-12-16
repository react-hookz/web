import { renderHook } from '@testing-library/react-hooks/server';
import { useMediaQuery } from '#root/index.js';

describe('useMediaQuery', () => {
	it('should be defined', () => {
		expect(useMediaQuery).toBeDefined();
	});

	it('should render', () => {
		const { result } = renderHook(() =>
			useMediaQuery('max-width : 768px', { initializeWithValue: false })
		);
		expect(result.error).toBeUndefined();
	});

	it('should return undefined on first render, if initializeWithValue is set to false', () => {
		const { result } = renderHook(() =>
			useMediaQuery('max-width : 768px', { initializeWithValue: false })
		);
		expect(result.current).toBeUndefined();
	});
});
