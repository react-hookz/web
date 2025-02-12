import {renderHook} from '@testing-library/react-hooks/dom';
import {describe, expect, it, vi} from 'vitest';
import {useMountEffect} from '../index.js';

describe('useMountEffect', () => {
	it('should call effector only on first render', () => {
		const spy = vi.fn();

		const {result, rerender, unmount} = renderHook(() => {
			useMountEffect(spy);
		});

		expect(result.current).toBe(undefined);
		expect(spy).toHaveBeenCalledTimes(1);

		rerender();
		rerender();
		rerender();
		rerender();

		expect(spy).toHaveBeenCalledTimes(1);

		unmount();

		expect(spy).toHaveBeenCalledTimes(1);
	});
});
