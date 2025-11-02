import {renderHookServer as renderHook} from '@ver0/react-hooks-testing';
import {describe, expect, it} from 'vitest';
import {useRafState} from '../index.js';

describe('useRafState', () => {
	it('should be defined', () => {
		expect(useRafState).toBeDefined();
	});

	it('should render', async () => {
		const {result} = await renderHook(() => useRafState());
		expect(result.error).toBeUndefined();
	});
});
