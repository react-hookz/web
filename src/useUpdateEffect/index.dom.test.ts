import {renderHook} from '@ver0/react-hooks-testing';
import {describe, expect, it, vi} from 'vitest';
import {useUpdateEffect} from '../index.js';

describe('useUpdateEffect', () => {
	it('should call effector only on updates (after first render)', async () => {
		const spy = vi.fn();

		const {rerender, unmount} = await renderHook(() => {
			useUpdateEffect(spy);
		});

		expect(spy).toHaveBeenCalledTimes(0);

		await rerender();
		expect(spy).toHaveBeenCalledTimes(1);

		await rerender();
		expect(spy).toHaveBeenCalledTimes(2);

		await unmount();
		expect(spy).toHaveBeenCalledTimes(2);
	});

	it('should accept dependencies as useEffect', async () => {
		const spy = vi.fn();

		const {rerender, unmount} = await renderHook(
			({deps}) => {
				useUpdateEffect(spy, deps);
			},
			{
				initialProps: {deps: [1, 2, 3]},
			},
		);

		expect(spy).toHaveBeenCalledTimes(0);

		await rerender();
		expect(spy).toHaveBeenCalledTimes(0);

		await rerender({deps: [1, 2, 4]});
		expect(spy).toHaveBeenCalledTimes(1);

		await rerender({deps: [1, 2, 4]});
		expect(spy).toHaveBeenCalledTimes(1);

		await unmount();
		expect(spy).toHaveBeenCalledTimes(1);
	});
});
