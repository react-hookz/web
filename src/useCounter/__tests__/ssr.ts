import { renderHook } from '@testing-library/react-hooks/server';
import { useCounter } from '../..';

describe('useCounter', () => {
	it('should be defined', () => {
		expect(useCounter).toBeDefined();
	});

	it('should render', () => {
		const { result } = renderHook(() => useCounter());
		expect(result.error).toBeUndefined();
	});
});
