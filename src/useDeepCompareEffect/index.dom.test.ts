import {renderHook} from '@testing-library/react-hooks/dom';
import {describe, expect, it, vi} from 'vitest';
import {useDeepCompareEffect} from '../index.js';

describe('useDeepCompareEffect', () => {
	it('should be defined', () => {
		expect(useDeepCompareEffect).toBeDefined();
	});

	it('should render', () => {
		const {result} = renderHook(() => {
			useDeepCompareEffect(() => {}, []);
		});
		expect(result.error).toBeUndefined();
	});

	it('should run only in case deps are changed', () => {
		const spy = vi.fn();
		const {rerender} = renderHook(
			({deps}) => {
				useDeepCompareEffect(spy, deps);
			},
			{
				initialProps: {deps: [{foo: 'bar'}]},
			},
		);

		expect(spy).toHaveBeenCalledTimes(1);

		rerender({deps: [{foo: 'bar'}]});
		expect(spy).toHaveBeenCalledTimes(1);

		rerender({deps: [{foo: 'baz'}]});
		expect(spy).toHaveBeenCalledTimes(2);

		rerender({deps: [{foo: 'baz'}]});
		expect(spy).toHaveBeenCalledTimes(2);
	});
});
