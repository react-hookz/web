import {renderHook} from '@ver0/react-hooks-testing';
import type {DependencyList, EffectCallback} from 'react';
import {describe, expect, it, vi} from 'vitest';
import {truthyAndArrayPredicate, truthyOrArrayPredicate, useConditionalEffect, useUpdateEffect} from '../index.js';

describe('useConditionalEffect', () => {
	it('should be defined', async () => {
		expect(useConditionalEffect).toBeDefined();
	});

	it('should render', async () => {
		const {result} = await renderHook(() => {
			useConditionalEffect(() => {}, undefined, []);
		});
		expect(result.error).toBeUndefined();
	});

	it('by default should invoke effect only in case all conditions are truthy', async () => {
		const spy = vi.fn();
		const {rerender} = await renderHook(
			({cond}) => {
				useConditionalEffect(spy, undefined, cond);
			},
			{
				initialProps: {cond: [1] as unknown[]},
			},
		);
		expect(spy).toHaveBeenCalledTimes(1);

		await rerender({cond: [0, 1, 1]});
		expect(spy).toHaveBeenCalledTimes(1);

		await rerender({cond: [1, {}, null]});
		expect(spy).toHaveBeenCalledTimes(1);

		await rerender({cond: [true, {}, [], 25]});
		expect(spy).toHaveBeenCalledTimes(2);
	});

	it('should not be called on mount if conditions are falsy', async () => {
		const spy = vi.fn();
		await renderHook(
			({cond}) => {
				useConditionalEffect(spy, undefined, cond);
			},
			{
				initialProps: {cond: [null] as unknown[]},
			},
		);
		expect(spy).toHaveBeenCalledTimes(0);
	});

	it('should invoke callback only if deps are changed and conditions match predicate', async () => {
		const spy = vi.fn();
		const {rerender} = await renderHook(
			({cond, deps}) => {
				useConditionalEffect(spy, deps, cond);
			},
			{
				initialProps: {cond: [false], deps: [1]},
			},
		);
		expect(spy).toHaveBeenCalledTimes(0);

		await rerender({cond: [false], deps: [2]});
		expect(spy).toHaveBeenCalledTimes(0);

		await rerender({cond: [true], deps: [2]});
		expect(spy).toHaveBeenCalledTimes(0);

		await rerender({cond: [true], deps: [3]});
		expect(spy).toHaveBeenCalledTimes(1);

		await rerender({cond: [true], deps: [3]});
		expect(spy).toHaveBeenCalledTimes(1);

		await rerender({cond: [true], deps: [4]});
		expect(spy).toHaveBeenCalledTimes(2);

		await rerender({cond: [false], deps: [5]});
		expect(spy).toHaveBeenCalledTimes(2);
	});

	it('should apply custom predicate', async () => {
		const spy = vi.fn();
		const predicateSpy = vi.fn((conditions: any[]) => truthyOrArrayPredicate(conditions));
		const {rerender} = await renderHook(
			({cond}) => {
				useConditionalEffect(spy, undefined, cond, predicateSpy);
			},
			{
				initialProps: {cond: [null] as unknown[]},
			},
		);
		expect(predicateSpy).toHaveBeenCalledTimes(1);
		expect(spy).toHaveBeenCalledTimes(0);

		await rerender({cond: [true, {}, [], 25]});
		expect(predicateSpy).toHaveBeenCalledTimes(2);
		expect(spy).toHaveBeenCalledTimes(1);

		await rerender({cond: [true, false, 0, null]});
		expect(predicateSpy).toHaveBeenCalledTimes(3);
		expect(spy).toHaveBeenCalledTimes(2);

		await rerender({cond: [undefined, false, 0, null]});
		expect(predicateSpy).toHaveBeenCalledTimes(4);
		expect(spy).toHaveBeenCalledTimes(2);
	});

	it('should accept custom hooks and pass extra args to it', async () => {
		const callbackSpy = vi.fn();
		const effectSpy = vi.fn((cb: EffectCallback, deps: DependencyList | undefined, _number: number) => {
			useUpdateEffect(cb, deps);
		});
		const {rerender} = await renderHook(() => {
			useConditionalEffect(callbackSpy, undefined, [true], truthyAndArrayPredicate, effectSpy, 123);
		});

		expect(callbackSpy).not.toHaveBeenCalled();
		expect(effectSpy).toHaveBeenCalledTimes(1);
		expect(effectSpy.mock.calls[0][2]).toBe(123);
		await rerender();

		expect(callbackSpy).toHaveBeenCalledTimes(1);
	});
});
