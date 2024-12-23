import {act, renderHook} from '@testing-library/react-hooks/dom';
import {useRef} from 'react';
import {describe, expect, it} from 'vitest';
import {useRerender} from '../index.js';

describe('useRerender', () => {
	it('should be defined', () => {
		expect(useRerender).toBeDefined();
	});

	it('should return same function on each re-render', () => {
		const {result, rerender} = renderHook(() => useRerender());
		const fn1 = result.current;
		rerender();
		const fn2 = result.current;
		rerender();
		const fn3 = result.current;

		expect(fn1).toBeInstanceOf(Function);
		expect(fn1).toBe(fn2);
		expect(fn2).toBe(fn3);
	});

	it('should rerender component on returned function invocation', () => {
		const {result} = renderHook(() => {
			const cnt = useRef(0);
			const rerender = useRerender();

			return [rerender, ++cnt.current] as const;
		});

		expect(result.current[1]).toBe(1);

		act(() => {
			// https://github.com/react-hookz/web/issues/691
			result.current[0]();
			result.current[0]();
		});
		expect(result.current[1]).toBe(2);

		act(() => {
			result.current[0]();
			result.current[0]();
			result.current[0]();
		});
		expect(result.current[1]).toBe(3);
	});
});
