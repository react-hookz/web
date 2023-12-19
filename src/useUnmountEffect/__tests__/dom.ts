import { renderHook } from '@testing-library/react-hooks/dom';
import { useUnmountEffect } from '#root/index.js';

describe('useUnmountEffect', () => {
	it('should call effector only when component unmounted', () => {
		const spy = jest.fn();

		const { result, rerender, unmount } = renderHook(() => {
			useUnmountEffect(spy);
		});

		expect(result.current).toBe(undefined);
		expect(spy).toHaveBeenCalledTimes(0);

		rerender();
		unmount();

		expect(spy).toHaveBeenCalledTimes(1);
	});

	it('should call effect even if it has been updated', () => {
		const spy = jest.fn();

		const { rerender, unmount } = renderHook<{ fn: () => void }, void>(
			({ fn }) => {
				useUnmountEffect(fn);
			},
			{
				initialProps: {
					fn() {},
				},
			}
		);

		rerender({ fn: spy });
		unmount();

		expect(spy).toHaveBeenCalled();
	});
});
