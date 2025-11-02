import {renderHook} from '@ver0/react-hooks-testing';
import {describe, expect, it} from 'vitest';
import {useFirstMountState} from '../index.js';

describe('useFirstMountState', () => {
	it('should return true on first render', async () => {
		const {result} = await renderHook(() => useFirstMountState());

		expect(result.value).toBe(true);
	});

	it('should return false on second and next renders', async () => {
		const {result, rerender} = await renderHook(() => useFirstMountState());
		expect(result.error).toBeUndefined();

		expect(result.value).toBe(true);
		await rerender();
		expect(result.value).toBe(false);
		await rerender();
		expect(result.value).toBe(false);
	});
});
