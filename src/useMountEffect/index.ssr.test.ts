import {renderHook} from '@testing-library/react-hooks/server';
import {describe, expect, it, vi} from 'vitest';
import {useMountEffect} from '../index.js';

describe('useMountEffect', () => {
	it('should call effector only on first render', () => {
		const spy = vi.fn();

		renderHook(() => {
			useMountEffect(spy);
		});

		expect(spy).toHaveBeenCalledTimes(0);
	});
});
