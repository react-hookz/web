import { renderHook } from '@testing-library/react-hooks/server';
import { useMediatedState } from '../..';

describe('useMediatedState', () => {
	it('should be defined', () => {
		expect(useMediatedState).toBeDefined();
	});

	it('should render', () => {
		const { result } = renderHook(() => useMediatedState());
		expect(result.error).toBeUndefined();
	});

	it('should return initial state on first mount', () => {
		const { result } = renderHook(() => useMediatedState(123));

		expect(result.current[0]).toBe(123);

		const { result: result2 } = renderHook(() =>
			useMediatedState(123, (value: string) => Number.parseInt(value, 10))
		);

		expect(result2.current[0]).toBe(123);
	});
});
