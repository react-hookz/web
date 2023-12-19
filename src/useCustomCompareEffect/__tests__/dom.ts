import { renderHook } from '@testing-library/react-hooks/dom';
import { type DependencyList } from 'react';
import { type EffectCallback, useCustomCompareEffect, useUpdateEffect } from '#root/index.js';

describe('useCustomCompareEffect', () => {
	it('should be defined', () => {
		expect(useCustomCompareEffect).toBeDefined();
	});

	it('should render', () => {
		const { result } = renderHook(() => {
			useCustomCompareEffect(() => {}, []);
		});
		expect(result.error).toBeUndefined();
	});

	it('should not call provided comparator on render', () => {
		const spy = jest.fn();
		renderHook(() => {
			useCustomCompareEffect(() => {}, [], spy, useUpdateEffect);
		});
		expect(spy).toHaveBeenCalledTimes(0);
	});

	it('should call comparator with previous and current deps as args', () => {
		const spy = jest.fn();
		const { rerender } = renderHook(
			({ deps }) => {
				useCustomCompareEffect(() => {}, deps, spy, useUpdateEffect);
			},
			{ initialProps: { deps: [1, 2] } }
		);
		rerender({ deps: [1, 3] });

		expect(spy).toHaveBeenCalledTimes(1);
		expect(spy.mock.calls[0][0]).toStrictEqual([1, 2]);
		expect(spy.mock.calls[0][1]).toStrictEqual([1, 3]);
	});

	it('should not pass new deps to underlying effect only if comparator reported unequal deps', () => {
		const spy = jest.fn(useUpdateEffect);
		const { rerender } = renderHook(
			({ deps }) => {
				useCustomCompareEffect(() => {}, deps, undefined, spy);
			},
			{ initialProps: { deps: [1, 2] } }
		);
		rerender({ deps: [1, 2] });

		expect(spy).toHaveBeenCalledTimes(2);
		expect(spy.mock.calls[0][1]).toStrictEqual([1, 2]);
		expect(spy.mock.calls[0][1]).toBe(spy.mock.calls[1][1]);

		rerender({ deps: [1, 3] });

		expect(spy).toHaveBeenCalledTimes(3);
		expect(spy.mock.calls[2][1]).toStrictEqual([1, 3]);
		expect(spy.mock.calls[0][1]).not.toBe(spy.mock.calls[2][1]);
	});

	it('should pass res argument to underlying hook', () => {
		const spy = jest.fn((c: EffectCallback, d: DependencyList, _n: number) => {
			useUpdateEffect(c, d);
		});
		renderHook(
			({ deps }) => {
				useCustomCompareEffect(() => {}, deps, undefined, spy, 123);
			},
			{
				initialProps: { deps: [1, 2] },
			}
		);

		expect(spy.mock.calls[0][2]).toBe(123);
	});
});
