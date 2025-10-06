import {act, renderHook} from '@ver0/react-hooks-testing';
import {describe, expect, it, vi} from 'vitest';
import type {UseValidatorReturn} from '../index.js';
import {useValidator} from '../index.js';
import {expectResultValue} from '../util/testing/test-helpers.js';

describe('useValidator', () => {
	it('should be defined', async () => {
		expect(useValidator).toBeDefined();
	});

	it('should render', async () => {
		const {result} = await renderHook(() => useValidator(() => ({isValid: false}), []));
		expect(result.error).toBeUndefined();
	});

	it('should return undefined validity on first render', async () => {
		const {result} = await renderHook(() => useValidator(() => ({isValid: true}), []));
		const value = expectResultValue(result.all[0]) as UseValidatorReturn<{isValid: boolean}>;
		expect(value[0].isValid).toBeUndefined();
	});

	it('should apply initial state parameter', async () => {
		const {result} = await renderHook(() => useValidator(() => ({isValid: true}), [], {isValid: true}));
		const value = expectResultValue(result.all[0]) as UseValidatorReturn<{isValid: boolean}>;
		expect(value[0].isValid).toBe(true);
	});

	it('should call validator on first render', async () => {
		const spy = vi.fn(() => ({isValid: true}));
		const {result} = await renderHook(() => useValidator(spy, []));
		const value = expectResultValue(result);
		expect(spy).toHaveBeenCalledTimes(1);
		expect(value[0].isValid).toBe(true);
	});

	it('should call validator on if deps changed', async () => {
		const spy = vi.fn(() => ({isValid: true}));
		const {rerender} = await renderHook(({dep}) => useValidator(spy, [dep]), {
			initialProps: {dep: 1},
		});
		expect(spy).toHaveBeenCalledTimes(1);

		await rerender({dep: 2});
		expect(spy).toHaveBeenCalledTimes(2);
	});

	it('should call validator on revalidator invocation', async () => {
		const spy = vi.fn(() => ({isValid: true}));
		const {result} = await renderHook(({dep}) => useValidator(spy, [dep]), {
			initialProps: {dep: 1},
		});
		const value = expectResultValue(result);
		expect(spy).toHaveBeenCalledTimes(1);

		await act(async () => {
			value[1]();
		});
		expect(spy).toHaveBeenCalledTimes(2);
	});

	it('should pass the validity setter if validator expects it', async () => {
		const {result} = await renderHook(() =>
			useValidator<{isValid: false; customError: Error}>((d) => {
				d({isValid: false, customError: new Error('this is custom error')});
			}, []),
		);
		const value = expectResultValue(result);

		expect(value[0]).toStrictEqual({
			isValid: false,
			customError: new Error('this is custom error'),
		});
	});
});
