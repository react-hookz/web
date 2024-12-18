import {renderHook} from '@testing-library/react-hooks/dom';
import {describe, expect, it, vi} from 'vitest';
import {useDeepCompareMemo} from '../index.js';

describe('useDeepCompareMemo', () => {
	it('should be defined', () => {
		expect(useDeepCompareMemo).toBeDefined();
	});

	it('should render', () => {
		const {result} = renderHook(() => {
			useDeepCompareMemo(() => {}, []);
		});
		expect(result.error).toBeUndefined();
	});

	it('should run only if dependencies change, defined by deep comparison', () => {
		const spy = vi.fn();

		const {rerender} = renderHook(({deps}) => useDeepCompareMemo(spy, deps), {
			initialProps: {deps: [{foo: 'bar'}]},
		});

		expect(spy).toHaveBeenCalledTimes(1);

		rerender({deps: [{foo: 'bar'}]});
		expect(spy).toHaveBeenCalledTimes(1);

		rerender({deps: [{foo: 'baz'}]});
		expect(spy).toHaveBeenCalledTimes(2);

		rerender({deps: [{foo: 'baz'}]});
		expect(spy).toHaveBeenCalledTimes(2);
	});
});
