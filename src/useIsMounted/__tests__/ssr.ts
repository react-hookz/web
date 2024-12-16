import { renderHook } from '@testing-library/react-hooks/server';
import { useIsMounted } from '../../index.js';

describe('useIsMounted', () => {
	it('should be defined', () => {
		expect(useIsMounted).toBeDefined();
	});

	it('should return a function', () => {
		const { result } = renderHook(() => useIsMounted());

		expect(result.current).toBeInstanceOf(Function);
	});

	it('should return false within first render', () => {
		const { result } = renderHook(() => {
			const isMounted = useIsMounted();
			return isMounted();
		});

		expect(result.current).toBe(false);
	});

	it('should return false after mount', () => {
		const { result } = renderHook(() => useIsMounted());

		expect(result.current()).toBe(false);
	});
});
