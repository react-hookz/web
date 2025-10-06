import {renderHookServer as renderHook} from '@ver0/react-hooks-testing';
import {describe, expect, it, vi} from 'vitest';
import {useUpdateEffect} from '../index.js';

describe('useUpdateEffect', () => {
	it('should not call effector on mount', async () => {
		const spy = vi.fn();

		await renderHook(() => {
			useUpdateEffect(spy);
		});

		expect(spy).toHaveBeenCalledTimes(0);
	});
});
