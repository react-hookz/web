import {act, renderHook} from '@ver0/react-hooks-testing';
import {describe, expect, it} from 'vitest';
import {useControlledRerenderState} from '../index.js';
import {expectResultValue} from '../util/testing/test-helpers.js';

describe('useControlledRerenderState', () => {
	it('should be defined', async () => {
		expect(useControlledRerenderState).toBeDefined();
	});

	it('should render', async () => {
		const {result} = await renderHook(() => useControlledRerenderState());
		expectResultValue(result);
	});

	it('should behave as `useState` by default', async () => {
		const {result} = await renderHook(() => useControlledRerenderState(() => 0));

		let value = expectResultValue(result);
		expect(value[0]).toBe(0);

		await act(async () => {
			value = expectResultValue(result);
			value[1](1);
		});
		value = expectResultValue(result);
		expect(value[0]).toBe(1);

		await act(async () => {
			value = expectResultValue(result);
			value[1]((i) => i + 3);
		});
		value = expectResultValue(result);
		expect(value[0]).toBe(4);
	});

	it('should not re-render in case setter extra-argument set to false', async () => {
		const {result} = await renderHook(() => useControlledRerenderState(() => 0));

		let value = expectResultValue(result);
		expect(value[0]).toBe(0);

		await act(async () => {
			value = expectResultValue(result);
			value[1](1, false);
		});
		value = expectResultValue(result);
		expect(value[0]).toBe(0);

		await act(async () => {
			value = expectResultValue(result);
			value[1]((i) => i + 3);
		});
		value = expectResultValue(result);
		expect(value[0]).toBe(4);
	});
});
