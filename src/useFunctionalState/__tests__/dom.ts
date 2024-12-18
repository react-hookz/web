import {act, renderHook} from '@testing-library/react-hooks/dom';
import {useFunctionalState} from '../../index.js';

describe('useFunctionalState', () => {
	it('should be defined', () => {
		expect(useFunctionalState).toBeDefined();
	});

	it('should render', () => {
		const {result} = renderHook(() => useFunctionalState());
		expect(result.error).toBeUndefined();
	});

	it('should return proper values', () => {
		const {result} = renderHook(() => useFunctionalState(1));
		expect(result.current[1]).toBeInstanceOf(Function);
		expect(result.current[0]).toBeInstanceOf(Function);
	});

	it('should return state getter', () => {
		const {result} = renderHook(() => useFunctionalState(1));

		expect(result.current[0]()).toBe(1);

		act(() => {
			result.current[1](2);
		});

		expect(result.current[0]()).toBe(2);
	});
});
