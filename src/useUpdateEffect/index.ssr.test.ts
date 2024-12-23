import {renderHook} from '@testing-library/react-hooks/server';
import {describe, expect, it, vi} from 'vitest';
import {useUpdateEffect} from '../index.js';

describe('useUpdateEffect', () => {
	it('should not call effector on mount', () => {
		const spy = vi.fn();

		renderHook(() => {
			useUpdateEffect(spy);
		});

		expect(spy).toHaveBeenCalledTimes(0);
	});
});
