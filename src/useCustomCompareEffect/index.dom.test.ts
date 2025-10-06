import {renderHook} from '@ver0/react-hooks-testing';
import type {DependencyList} from 'react';
import {describe, expect, it, vi} from 'vitest';
import type {EffectCallback} from '../index.js';
import {useCustomCompareEffect, useUpdateEffect} from '../index.js';

describe('useCustomCompareEffect', () => {
	it('should be defined', async () => {
		expect(useCustomCompareEffect).toBeDefined();
	});

	it('should render', async () => {
		const {result} = await renderHook(() => {
			useCustomCompareEffect(() => {}, []);
		});
		expect(result.error).toBeUndefined();
	});

	it('should not call provided comparator on render', async () => {
		const spy = vi.fn();
		const {rerender} = await renderHook(() => {
			useCustomCompareEffect(() => {}, [], spy, useUpdateEffect);
		});
		expect(spy).toHaveBeenCalledTimes(0);
	});

	it('should call comparator with previous and current deps as args', async () => {
		const spy = vi.fn();
		const {rerender} = await renderHook(
			({deps}) => {
				useCustomCompareEffect(() => {}, deps, spy, useUpdateEffect);
			},
			{initialProps: {deps: [1, 2]}},
		);
		await rerender({deps: [1, 3]});

		expect(spy).toHaveBeenCalledTimes(1);
		expect(spy.mock.calls[0][0]).toStrictEqual([1, 2]);
		expect(spy.mock.calls[0][1]).toStrictEqual([1, 3]);
	});

	it('should not pass new deps to underlying effect only if comparator reported unequal deps', async () => {
		const spy = vi.fn(useUpdateEffect);
		const {rerender} = await renderHook(
			({deps}) => {
				useCustomCompareEffect(() => {}, deps, undefined, spy);
			},
			{initialProps: {deps: [1, 2]}},
		);
		await rerender({deps: [1, 2]});

		expect(spy).toHaveBeenCalledTimes(2);
		expect(spy.mock.calls[0][1]).toStrictEqual([1, 2]);
		expect(spy.mock.calls[0][1]).toBe(spy.mock.calls[1][1]);

		await rerender({deps: [1, 3]});

		expect(spy).toHaveBeenCalledTimes(3);
		expect(spy.mock.calls[2][1]).toStrictEqual([1, 3]);
		expect(spy.mock.calls[0][1]).not.toBe(spy.mock.calls[2][1]);
	});

	it('should pass res argument to underlying hook', async () => {
		const spy = vi.fn((c: EffectCallback, d: DependencyList, _n: number) => {
			useUpdateEffect(c, d);
		});
		const {rerender} = await renderHook(
			({deps}) => {
				useCustomCompareEffect(() => {}, deps, undefined, spy, 123);
			},
			{
				initialProps: {deps: [1, 2]},
			},
		);

		// The spy should be called once on initial render
		expect(spy).toHaveBeenCalledTimes(1);
		expect(spy.mock.calls[0]).toHaveLength(3);
		expect(spy.mock.calls[0][2]).toBe(123);

		// Trigger a rerender to make sure the hook works properly
		await rerender({deps: [1, 3]});

		expect(spy).toHaveBeenCalledTimes(2);
		expect(spy.mock.calls[1][2]).toBe(123);
	});
});
