import {act, renderHook} from '@testing-library/react-hooks/server';
import {useStorageValue} from '../index.js';
import {newStorage} from './misc.js';

describe('useStorageValue', () => {
	it('should be defined', () => {
		expect(useStorageValue).toBeDefined();
	});

	it('should render', () => {
		const {result} = renderHook(() => useStorageValue(newStorage(), 'foo'));
		expect(result.error).toBeUndefined();
	});

	describe('if initializeWithValue set to false', () => {
		it('should not fetch value from storage on init', () => {
			const storage = newStorage();
			const {result} = renderHook(() =>
				useStorageValue(storage, 'foo', {initializeWithValue: false}));

			expect(result.current.value).toBe(undefined);
			expect(storage.getItem).not.toHaveBeenCalled();
		});

		it('should not fetch value from storage on .fetch() call', () => {
			const storage = newStorage();
			const {result} = renderHook(() =>
				useStorageValue(storage, 'foo', {initializeWithValue: false}));

			expect(result.current.value).toBe(undefined);
			act(() => {
				result.current.fetch();
			});
			expect(result.current.value).toBe(undefined);
			expect(storage.getItem).not.toHaveBeenCalled();
		});

		it('should not set storage value on .set() call', () => {
			const storage = newStorage();
			const {result} = renderHook(() =>
				useStorageValue < string > (storage, 'foo', {initializeWithValue: false}));

			expect(result.current.value).toBe(undefined);
			act(() => {
				result.current.set('bar');
			});
			expect(result.current.value).toBe(undefined);
			expect(storage.setItem).not.toHaveBeenCalled();
		});

		it('should not call storage`s removeItem on .remove() call', () => {
			const storage = newStorage();
			const {result} = renderHook(() =>
				useStorageValue < string > (storage, 'foo', {initializeWithValue: false}));

			act(() => {
				result.current.remove();
			});
			expect(storage.removeItem).not.toHaveBeenCalled();
		});

		it('should not set state to default value on item remove', () => {
			const storage = newStorage(() => '"bar"');
			const {result} = renderHook(() =>
				useStorageValue < string > (storage, 'foo', {
					defaultValue: 'default value',
					initializeWithValue: false,
				}));

			expect(result.current.value).toBe(undefined);
			act(() => {
				result.current.remove();
			});
			expect(result.current.value).toBe(undefined);
		});
	});
});
