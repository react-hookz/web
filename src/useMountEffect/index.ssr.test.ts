import {renderHook} from '@testing-library/react-hooks/server';
import {useMountEffect} from '../../index.js';

describe('useMountEffect', () => {
	it('should call effector only on first render', () => {
		const spy = jest.fn();

		renderHook(() => {
			useMountEffect(spy);
		});

		expect(spy).toHaveBeenCalledTimes(0);
	});
});
