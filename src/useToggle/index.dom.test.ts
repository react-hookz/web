import {act, renderHook} from '@ver0/react-hooks-testing';
import type {BaseSyntheticEvent} from 'react';
import {useRef} from 'react';
import {describe, expect, it} from 'vitest';
import {useToggle} from '../index.js';
import {expectResultValue} from '../util/testing/test-helpers.js';

describe('useToggle', () => {
	it('should be defined', async () => {
		expect(useToggle).toBeDefined();
	});

	it('should default to false', async () => {
		const {result} = await renderHook(() => useToggle());
		const value = expectResultValue(result);

		expect(value[0]).toBe(false);
	});

	it('should be instantiatable with value', async () => {
		const hook1 = await renderHook(() => useToggle(true));
		let value = expectResultValue(hook1.result);
		expect(value[0]).toBe(true);

		const hook2 = await renderHook(() => useToggle(() => true));
		value = expectResultValue(hook2.result);
		expect(value[0]).toBe(true);

		const hook3 = await renderHook(() => useToggle(() => false));
		value = expectResultValue(hook3.result);
		expect(value[0]).toBe(false);
	});

	it('should change state to the opposite when toggler called without args or undefined', async () => {
		const {result} = await renderHook(() => useToggle());
		let value = expectResultValue(result);
		await act(async () => {
			value[1]();
		});
		value = expectResultValue(result);
		expect(value[0]).toBe(true);

		await act(async () => {
			value[1]();
		});
		value = expectResultValue(result);
		expect(value[0]).toBe(false);
	});

	it('should not rerender when toggler called with same value', async () => {
		const {result} = await renderHook(() => {
			const cnt = useRef(0);

			return [...useToggle(), ++cnt.current] as const;
		});
		let value = expectResultValue(result);
		expect(value[0]).toBe(false);
		expect(value[2]).toBe(1);

		await act(async () => {
			value[1](false);
		});
		value = expectResultValue(result);
		expect(value[2]).toBe(1);

		await act(async () => {
			value[1](false);
		});
		value = expectResultValue(result);
		expect(value[2]).toBe(1);
	});

	it('should change state to one that passed to toggler', async () => {
		const {result} = await renderHook(() => useToggle(false, false));
		let value = expectResultValue(result);
		await act(async () => {
			value[1](false);
		});
		value = expectResultValue(result);
		expect(value[0]).toBe(false);

		await act(async () => {
			value[1](true);
		});
		value = expectResultValue(result);
		expect(value[0]).toBe(true);

		await act(async () => {
			value[1](() => false);
		});
		value = expectResultValue(result);
		expect(value[0]).toBe(false);

		await act(async () => {
			value[1](() => true);
		});
		value = expectResultValue(result);
		expect(value[0]).toBe(true);
	});

	it('should not account react events', async () => {
		const {result} = await renderHook(() => useToggle());
		let value = expectResultValue(result);

		await act(async () => {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
			value[1]({_reactName: 'abcdef'} as unknown as BaseSyntheticEvent);
			// eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
			value[1]({_reactName: 'abcdef'} as unknown as BaseSyntheticEvent);
		});
		value = expectResultValue(result);
		expect(value[0]).toBe(false);

		await act(async () => {
			// eslint-disable-next-line @typescript-eslint/no-extraneous-class,@typescript-eslint/no-unsafe-type-assertion
			value[1](new (class SyntheticBaseEvent {})() as unknown as BaseSyntheticEvent);
		});
		value = expectResultValue(result);
		expect(value[0]).toBe(true);
	});
});
