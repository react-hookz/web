import {act, renderHook} from '@ver0/react-hooks-testing';
import {beforeEach, describe, expect, it, vi} from 'vitest';
import {useStorageValue} from './index.js';
import {expectResultValue} from '../util/testing/test-helpers.js';

describe.each(['localStorage', 'sessionStorage'] as const)('useStorageValue sequences with %s', (storageName) => {
	beforeEach(() => {
		globalThis[storageName].clear();
	});

	it('composes consecutive functional updates before a render', async () => {
		const storage = globalThis[storageName];
		const {result} = await renderHook(() => useStorageValue<number>(storage, 'counter', {defaultValue: 0}));
		const {set} = expectResultValue(result);
		const previousValues: Array<number | null | undefined> = [];
		const increment = (previous: number | null | undefined): number => {
			previousValues.push(previous);
			return (previous ?? 0) + 1;
		};
		await act(async () => {
			set(increment);
			set(increment);
			set(increment);
		});
		expect(previousValues).toEqual([0, 1, 2]);
		expect(expectResultValue(result).value).toBe(3);
		expect(storage.getItem('counter')).toBe('3');
	});

	it('uses updates from another hook before either hook renders', async () => {
		const storage = globalThis[storageName];
		const first = await renderHook(() => useStorageValue<number>(storage, 'counter', {defaultValue: 0}));
		const second = await renderHook(() => useStorageValue<number>(storage, 'counter', {defaultValue: 0}));
		await act(async () => {
			expectResultValue(first.result).set(5);
			expectResultValue(second.result).set((previous) => (previous ?? 0) + 1);
			expectResultValue(first.result).set((previous) => (previous ?? 0) + 1);
		});
		expect(expectResultValue(first.result).value).toBe(7);
		expect(expectResultValue(second.result).value).toBe(7);
		expect(storage.getItem('counter')).toBe('7');
	});

	it('uses the fallback after removal in the same event', async () => {
		const storage = globalThis[storageName];
		storage.setItem('counter', '10');
		const {result} = await renderHook(() => useStorageValue<number>(storage, 'counter', {defaultValue: 2}));
		const actions = expectResultValue(result);
		await act(async () => {
			actions.remove();
			actions.set((previous) => (previous ?? 0) + 1);
		});
		expect(expectResultValue(result).value).toBe(3);
	});

	it('uses an explicitly fetched value before the next render', async () => {
		const storage = globalThis[storageName];
		const {result} = await renderHook(() => useStorageValue<number>(storage, 'counter', {defaultValue: 0}));
		const actions = expectResultValue(result);
		await act(async () => {
			storage.setItem('counter', '8');
			actions.fetch();
			actions.set((previous) => (previous ?? 0) + 1);
		});
		expect(expectResultValue(result).value).toBe(9);
	});

	it('keeps the last accepted value when serialization rejects an update', async () => {
		const storage = globalThis[storageName];
		const {result} = await renderHook(() =>
			useStorageValue<number>(storage, 'counter', {
				defaultValue: 0,
				stringify: (value) => (value === 100 ? null : String(value)),
			}),
		);
		const {set} = expectResultValue(result);
		await act(async () => {
			set(5);
			set(100);
			set((previous) => (previous ?? 0) + 1);
		});
		expect(expectResultValue(result).value).toBe(6);
		expect(storage.getItem('counter')).toBe('6');
	});
	it('uses the parsed value rather than the unprocessed setter argument', async () => {
		const storage = globalThis[storageName];
		const {result} = await renderHook(() =>
			useStorageValue<number>(storage, 'counter', {
				defaultValue: 0,
				parse: (raw, fallback) => (raw === null ? fallback : Math.floor(Number(raw))),
			}),
		);
		const {set} = expectResultValue(result);
		await act(async () => {
			set(2.7);
			set((previous) => (previous ?? 0) + 1);
		});
		expect(expectResultValue(result).value).toBe(3);
		expect(storage.getItem('counter')).toBe('3');
	});

	it('does not advance the current value after a failed write', async () => {
		const storage = globalThis[storageName];
		const {result} = await renderHook(() => useStorageValue<number>(storage, 'counter', {defaultValue: 0}));
		const {set} = expectResultValue(result);
		await act(async () => {
			set(5);
			const write = vi.spyOn(Storage.prototype, 'setItem').mockImplementationOnce(() => {
				throw new Error('Storage write failed');
			});
			try {
				expect(() => {
					set(100);
				}).toThrow('Storage write failed');
			} finally {
				write.mockRestore();
			}
			set((previous) => (previous ?? 0) + 1);
		});
		expect(expectResultValue(result).value).toBe(6);
		expect(storage.getItem('counter')).toBe('6');
	});
});
