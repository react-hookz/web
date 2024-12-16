import { renderHook } from '@testing-library/react-hooks/server';
import { useQueue } from '../../index.js';

describe('useQueue', () => {
	it('should be defined', () => {
		expect(useQueue).toBeDefined();
	});

	it('should render', () => {
		const { result } = renderHook(() => useQueue());
		expect(result.error).toBeUndefined();
	});

	it('should return an object', () => {
		const { result } = renderHook(() => useQueue());
		expect(result.current).toBeInstanceOf(Object);
	});
});
