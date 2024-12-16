import { renderHook } from '@testing-library/react-hooks/server';
import { useUpdateEffect } from '../../index.js';

describe('useUpdateEffect', () => {
	it('should not call effector on mount', () => {
		const spy = jest.fn();

		renderHook(() => {
			useUpdateEffect(spy);
		});

		expect(spy).toHaveBeenCalledTimes(0);
	});
});
