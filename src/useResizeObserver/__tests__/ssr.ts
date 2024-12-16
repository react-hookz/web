import { renderHook } from '@testing-library/react-hooks/server';
import { useResizeObserver } from '../../index.js';

describe('useResizeObserver', () => {
	it('should be defined', () => {
		expect(useResizeObserver).toBeDefined();
	});

	it('should render', () => {
		const { result } = renderHook(() => {
			useResizeObserver(null, () => {});
		});

		expect(result.error).toBeUndefined();
	});
});
