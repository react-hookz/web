import {renderHook} from '@ver0/react-hooks-testing';
import {describe, expect, it, vi} from 'vitest';
import {useMountEffect} from '../index.js';

describe('useMountEffect', () => {
	it('should call effector only on first render', async () => {
		const spy = vi.fn();

		const {result, rerender, unmount} = await renderHook(() => {
			useMountEffect(spy);
		});

		expect(result.value).toBe(undefined);
		expect(spy).toHaveBeenCalledTimes(1);

		await rerender();
		await rerender();
		await rerender();
		await rerender();

		expect(spy).toHaveBeenCalledTimes(1);

		await unmount();

		expect(spy).toHaveBeenCalledTimes(1);
	});
});
