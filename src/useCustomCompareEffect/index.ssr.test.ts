import {renderHook} from '@testing-library/react-hooks/server';
import {useCustomCompareEffect} from '../../index.js';

describe('useCustomCompareEffect', () => {
	it('should be defined', () => {
		expect(useCustomCompareEffect).toBeDefined();
	});

	it('should render', () => {
		const {result} = renderHook(() => {
			useCustomCompareEffect(() => {}, []);
		});
		expect(result.error).toBeUndefined();
	});

	it('should not invoke comparator', () => {
		const spy = jest.fn();
		renderHook(() => {
			useCustomCompareEffect(() => {}, [], spy);
		});
		expect(spy).not.toHaveBeenCalled();
	});
});
