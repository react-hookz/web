import {act, renderHook} from '@ver0/react-hooks-testing';
import {describe, expect, it, vi} from 'vitest';
import {useMediatedState} from '../index.js';
import {expectResultValue} from '../util/testing/test-helpers.js';

describe('useMediatedState', () => {
	it('should be defined', async () => {
		expect(useMediatedState).toBeDefined();
	});

	it('should render', async () => {
		const {result} = await renderHook(() => useMediatedState());
		expectResultValue(result);
	});

	it('should act like useState if mediator not passed', async () => {
		const {result} = await renderHook(() => useMediatedState(123));
		let value = expectResultValue(result);

		expect(value[0]).toBe(123);
		await act(async () => {
			value[1](321);
		});
		value = expectResultValue(result);
		expect(value[0]).toBe(321);
	});

	it('should pass received sate through mediator', async () => {
		const spy = vi.fn((value: string) => Number.parseInt(value, 10));
		const {result} = await renderHook(() => useMediatedState(123, spy));
		let value = expectResultValue(result);

		expect(value[0]).toBe(123);
		await act(async () => {
			value[1]('321');
		});
		value = expectResultValue(result);
		expect(value[0]).toBe(321);
		expect(spy).toHaveBeenCalledTimes(2);
		expect(spy).toHaveBeenCalledWith('321');
	});

	it('should pass initial sate through mediator', async () => {
		const {result} = await renderHook(() =>
			useMediatedState('a123', (value: string) => value.replaceAll(/[^a-z]+/gi, '')),
		);
		const value = expectResultValue(result);

		expect(value[0]).toBe('a');
	});

	it('should return same setState method each render even if callback is changed', async () => {
		const {result, rerender} = await renderHook(() =>
			useMediatedState(123, (value: string) => Number.parseInt(value, 10)),
		);
		let value = expectResultValue(result);

		const f1 = value[1];
		await rerender();
		value = expectResultValue(result);
		const f2 = value[1];
		await rerender();
		value = expectResultValue(result);
		const f3 = value[1];

		expect(f1).toBe(f2);
		expect(f3).toBe(f2);
	});
});
