import {renderHookServer as renderHook} from '@ver0/react-hooks-testing';
import {describe, expect, it} from 'vitest';
import {useFunctionalState} from '../index.js';
import {expectResultValue} from '../util/testing/test-helpers.js';

describe('useFunctionalState', () => {
	it('should be defined', () => {
		expect(useFunctionalState).toBeDefined();
	});

	it('should render', async () => {
		const {result} = await renderHook(() => useFunctionalState());
		expect(result.error).toBeUndefined();
	});

	it('should return proper values', async () => {
		const {result} = await renderHook(() => useFunctionalState(1));
		const value = expectResultValue(result);
		expect(value[1]).toBeInstanceOf(Function);
		expect(value[0]).toBeInstanceOf(Function);
	});
});
