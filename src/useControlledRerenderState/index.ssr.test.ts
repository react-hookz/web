import {renderHookServer as renderHook} from '@ver0/react-hooks-testing';
import {describe, expect, it} from 'vitest';
import {useControlledRerenderState} from '../index.js';

describe('useControlledRerenderState', () => {
	it('should be defined', () => {
		expect(useControlledRerenderState).toBeDefined();
	});

	it('should render', async () => {
		const {result} = await renderHook(() => useControlledRerenderState());
		expect(result.error).toBeUndefined();
	});
});
