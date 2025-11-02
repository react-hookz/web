import {renderHookServer as renderHook} from '@ver0/react-hooks-testing';
import {describe, expect, it} from 'vitest';
import {useFunctionalState} from '../index.js';

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
		if (result.value !== undefined) {
			expect(result.value[1]).toBeInstanceOf(Function);
			expect(result.value[0]).toBeInstanceOf(Function);
		}
	});
});
