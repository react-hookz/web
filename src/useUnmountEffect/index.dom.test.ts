import {renderHook} from '@ver0/react-hooks-testing';
import {describe, expect, it, vi} from 'vitest';
import {useUnmountEffect} from '../index.js';
import {noop} from '../util/const.js';

describe('useUnmountEffect', () => {
	it('should call effector only when component unmounted', async () => {
		const spy = vi.fn();

		const {result, rerender, unmount} = await renderHook(() => {
			useUnmountEffect(spy);
		});

		expect(result.value).toBe(undefined);
		expect(spy).toHaveBeenCalledTimes(0);

		await rerender();
		await unmount();

		expect(spy).toHaveBeenCalledTimes(1);
	});

	it('should call effect even if it has been updated', async () => {
		const spy = vi.fn();

		const {rerender, unmount} = await renderHook<{fn: () => void}, void>(
			({fn}) => {
				useUnmountEffect(fn);
			},
			{
				initialProps: {
					fn: noop,
				},
			},
		);

		await rerender({fn: spy});
		await unmount();

		expect(spy).toHaveBeenCalled();
	});
});
