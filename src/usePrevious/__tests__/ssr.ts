import { renderHook } from '@testing-library/react-hooks/server';
import { usePrevious } from '#root/index.js';

describe('usePrevious', () => {
	it('should be defined', () => {
		expect(usePrevious).toBeDefined();
	});

	it('should render', () => {
		const { result } = renderHook(() => usePrevious());
		expect(result.error).toBeUndefined();
	});

	it('should return undefined on first render', () => {
		const { result } = renderHook(() => usePrevious());

		expect(result.current).toBeUndefined();
	});
});
