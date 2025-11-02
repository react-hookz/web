import {renderHook} from '@ver0/react-hooks-testing';
import {describe, expect, it, vi} from 'vitest';
import {useDeepCompareEffect} from '../index.js';

describe('useDeepCompareEffect', () => {
	it('should be defined', async () => {
		expect(useDeepCompareEffect).toBeDefined();
	});

	it('should render', async () => {
		const {result} = await renderHook(() => {
			useDeepCompareEffect(() => {}, []);
		});
		expect(result.error).toBeUndefined();
	});

	it('should run only in case deps are changed', async () => {
		const spy = vi.fn();
		const {rerender} = await renderHook(
			({deps}) => {
				useDeepCompareEffect(spy, deps);
			},
			{
				initialProps: {deps: [{foo: 'bar'}]},
			},
		);

		expect(spy).toHaveBeenCalledTimes(1);

		await rerender({deps: [{foo: 'bar'}]});
		expect(spy).toHaveBeenCalledTimes(1);

		await rerender({deps: [{foo: 'baz'}]});
		expect(spy).toHaveBeenCalledTimes(2);

		await rerender({deps: [{foo: 'baz'}]});
		expect(spy).toHaveBeenCalledTimes(2);
	});
});
