import {renderHookServer as renderHook} from '@ver0/react-hooks-testing';
import {describe, expect, it, vi} from 'vitest';
import {useMountEffect} from '../index.js';

describe('useMountEffect', () => {
	it('should call effector only on first render', async () => {
		const spy = vi.fn();

		await renderHook(() => {
			useMountEffect(spy);
		});

		expect(spy).toHaveBeenCalledTimes(0);
	});
});
