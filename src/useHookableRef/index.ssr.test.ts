import {renderHookServer as renderHook} from '@ver0/react-hooks-testing';
import {describe, expect, it} from 'vitest';
import {useHookableRef} from '../index.js';

describe('useHookableRef', () => {
	it('should be defined', () => {
		expect(useHookableRef).toBeDefined();
	});

	it('should render', async () => {
		const {result} = await renderHook(() => useHookableRef());
		expect(result.error).toBeUndefined();
	});
});
