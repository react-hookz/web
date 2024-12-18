import {renderHook} from '@testing-library/react-hooks/dom';
import {describe, expect, it, vi} from 'vitest';
import {useUpdateEffect} from '../index.js';

describe('useUpdateEffect', () => {
	it('should call effector only on updates (after first render)', () => {
		const spy = vi.fn();

		const {rerender, unmount} = renderHook(() => {
			useUpdateEffect(spy);
		});

		expect(spy).toHaveBeenCalledTimes(0);

		rerender();
		expect(spy).toHaveBeenCalledTimes(1);

		rerender();
		expect(spy).toHaveBeenCalledTimes(2);

		unmount();
		expect(spy).toHaveBeenCalledTimes(2);
	});

	it('should accept dependencies as useEffect', () => {
		const spy = vi.fn();

		const {rerender, unmount} = renderHook(
			({deps}) => {
				useUpdateEffect(spy, deps);
			},
			{
				initialProps: {deps: [1, 2, 3]},
			},
		);

		expect(spy).toHaveBeenCalledTimes(0);

		rerender();
		expect(spy).toHaveBeenCalledTimes(0);

		rerender({deps: [1, 2, 4]});
		expect(spy).toHaveBeenCalledTimes(1);

		rerender({deps: [1, 2, 4]});
		expect(spy).toHaveBeenCalledTimes(1);

		unmount();
		expect(spy).toHaveBeenCalledTimes(1);
	});
});
