import {renderHook} from '@ver0/react-hooks-testing';
import {describe, expect, it, vi} from 'vitest';
import {useDeepCompareMemo} from '../index.js';

describe('useDeepCompareMemo', () => {
	it('should be defined', async () => {
		expect(useDeepCompareMemo).toBeDefined();
	});

	it('should render', async () => {
		const {result} = await renderHook(() => {
			useDeepCompareMemo(() => {}, []);
		});
		expect(result.error).toBeUndefined();
	});

	it('should run only if dependencies change, defined by deep comparison', async () => {
		const spy = vi.fn(() => 1);

		const {rerender} = await renderHook(({deps}) => useDeepCompareMemo(spy, deps), {
			initialProps: {deps: [{foo: 'bar'}]},
		});

		expect(spy).toHaveBeenCalledTimes(1);

		await rerender({deps: [{foo: 'bar'}]});
		expect(spy).toHaveBeenCalledTimes(1);

		await rerender({deps: [{foo: 'baz'}]});
		expect(spy).toHaveBeenCalledTimes(2);

		await rerender({deps: [{foo: 'baz'}]});
		expect(spy).toHaveBeenCalledTimes(2);
	});
});
