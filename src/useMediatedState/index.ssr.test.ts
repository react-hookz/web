import {renderHookServer as renderHook} from '@ver0/react-hooks-testing';
import {describe, expect, it} from 'vitest';
import {useMediatedState} from '../index.js';
import {expectResultValue} from '../util/testing/test-helpers.js';

describe('useMediatedState', () => {
	it('should be defined', () => {
		expect(useMediatedState).toBeDefined();
	});

	it('should render', async () => {
		const {result} = await renderHook(() => useMediatedState());
		expect(result.error).toBeUndefined();
	});

	it('should return initial state on first mount', async () => {
		const {result} = await renderHook(() => useMediatedState(123));
		expect(result.error).toBeUndefined();

		const value = expectResultValue(result);
		expect(value[0]).toBe(123);

		const {result: result2} = await renderHook(() =>
			useMediatedState(123, (value: string) => Number.parseInt(value, 10)),
		);
		expect(result2.error).toBeUndefined();

		const value2 = expectResultValue(result2);
		expect(value2[0]).toBe(123);
	});
});
