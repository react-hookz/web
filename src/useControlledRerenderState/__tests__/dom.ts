import { act, renderHook } from '@testing-library/react-hooks/dom';
import { useControlledRerenderState } from '../..';

describe('useControlledRerenderState', () => {
	it('should be defined', () => {
		expect(useControlledRerenderState).toBeDefined();
	});

	it('should render', () => {
		const { result } = renderHook(() => useControlledRerenderState());
		expect(result.error).toBeUndefined();
	});

	it('should behave as `useState` by default', () => {
		const { result } = renderHook(() => useControlledRerenderState(() => 0));

		expect(result.current[0]).toBe(0);

		act(() => {
			result.current[1](1);
		});
		expect(result.current[0]).toBe(1);

		act(() => {
			result.current[1]((i) => i + 3);
		});
		expect(result.current[0]).toBe(4);
	});

	it('should not re-render in case setter extra-argument set to false', () => {
		const { result } = renderHook(() => useControlledRerenderState(() => 0));

		expect(result.current[0]).toBe(0);

		act(() => {
			result.current[1](1, false);
		});
		expect(result.current[0]).toBe(0);

		act(() => {
			result.current[1]((i) => i + 3);
		});
		expect(result.current[0]).toBe(4);
	});
});
