import {act, renderHookServer as renderHook} from '@ver0/react-hooks-testing';
import {describe, expect, it} from 'vitest';
import {expectResultValue} from '../util/testing/test-helpers.js';
import {newStorage} from './misc.test.js';
import {useStorageValue} from './index.js';

describe('useStorageValue', () => {
	it('should be defined', () => {
		expect(useStorageValue).toBeDefined();
	});

	it('should render', async () => {
		const {result} = await renderHook(() => useStorageValue(newStorage(), 'foo'));
		expect(result.error).toBeUndefined();
	});

	describe('if initializeWithValue set to false', () => {
		it('should not fetch value from storage on init', async () => {
			const storage = newStorage();
			const {result} = await renderHook(() => useStorageValue(storage, 'foo', {initializeWithValue: false}));

			const value = expectResultValue(result);
			expect(value.value).toBe(undefined);
			expect(storage.getItem).not.toHaveBeenCalled();
		});

		it('should not fetch value from storage on .fetch() call', async () => {
			const storage = newStorage();
			const {result} = await renderHook(() => useStorageValue(storage, 'foo', {initializeWithValue: false}));

			let value = expectResultValue(result);
			expect(value.value).toBe(undefined);
			await act(async () => {
				value.fetch();
			});
			value = expectResultValue(result);
			expect(value.value).toBe(undefined);
			expect(storage.getItem).not.toHaveBeenCalled();
		});

		it('should not set storage value on .set() call', async () => {
			const storage = newStorage();
			const {result} = await renderHook(() => useStorageValue<string>(storage, 'foo', {initializeWithValue: false}));

			let value = expectResultValue(result);
			expect(value.value).toBe(undefined);
			await act(async () => {
				value.set('bar');
			});
			value = expectResultValue(result);
			expect(value.value).toBe(undefined);
			expect(storage.setItem).not.toHaveBeenCalled();
		});

		it('should not call storage`s removeItem on .remove() call', async () => {
			const storage = newStorage();
			const {result} = await renderHook(() => useStorageValue<string>(storage, 'foo', {initializeWithValue: false}));

			const value = expectResultValue(result);
			await act(async () => {
				value.remove();
			});
			expect(storage.removeItem).not.toHaveBeenCalled();
		});

		it('should not set state to default value on item remove', async () => {
			const storage = newStorage(() => '"bar"');
			const {result} = await renderHook(() =>
				useStorageValue<string>(storage, 'foo', {
					defaultValue: 'default value',
					initializeWithValue: false,
				}),
			);

			let value = expectResultValue(result);
			expect(value.value).toBe(undefined);
			await act(async () => {
				value.remove();
			});
			value = expectResultValue(result);
			expect(value.value).toBe(undefined);
		});
	});
});
