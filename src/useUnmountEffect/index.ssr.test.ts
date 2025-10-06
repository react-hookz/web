import {renderHookServer as renderHook} from '@ver0/react-hooks-testing';
import {describe, expect, it, vi} from 'vitest';
import {useUnmountEffect} from '../index.js';

describe('useUnmountEffect', () => {
	it('should call effector only when component unmounted', async () => {
		const spy = vi.fn();

		await renderHook(() => {
			useUnmountEffect(spy);
		});

		expect(spy).toHaveBeenCalledTimes(0);
	});
});
