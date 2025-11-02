import {renderHookServer as renderHook} from '@ver0/react-hooks-testing';
import {describe, expect, it} from 'vitest';
import {useSyncedRef} from '../index.js';

describe('useSyncedRef', () => {
	it('should be defined', () => {
		expect(useSyncedRef).toBeDefined();
	});

	it('should render', async () => {
		const {result} = await renderHook(() => useSyncedRef(1));
		expect(result.error).toBeUndefined();
	});

	it('should return ref object', async () => {
		const {result} = await renderHook(() => useSyncedRef(1));

		expect(result.value).toEqual({current: 1});
	});
});
