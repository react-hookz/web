import {renderHookServer as renderHook} from '@ver0/react-hooks-testing';
import {describe, expect, it} from 'vitest';
import {useIsMounted} from '../index.js';
import {expectResultValue} from '../util/testing/test-helpers.js';

describe('useIsMounted', () => {
	it('should be defined', () => {
		expect(useIsMounted).toBeDefined();
	});

	it('should return a function', async () => {
		const {result} = await renderHook(() => useIsMounted());

		const value = expectResultValue(result);
		expect(value).toBeInstanceOf(Function);
	});

	it('should return false within first render', async () => {
		const {result} = await renderHook(() => {
			const isMounted = useIsMounted();
			return isMounted();
		});

		const value = expectResultValue(result);
		expect(value).toBe(false);
	});

	it('should return false after mount', async () => {
		const {result} = await renderHook(() => useIsMounted());

		const value = expectResultValue(result);
		expect(value()).toBe(false);
	});
});
