import {act, renderHook} from '@testing-library/react-hooks/dom';
import indexeddb from 'fake-indexeddb';
import {afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi} from 'vitest';
import {useIndexedDBValue} from '../useIndexedDBValue/index.js';

const mockSuccess = vi.fn(() => {
	console.log('done');
});

const mockError = vi.fn(() => {
	console.log('error');
});

describe('useIndexedDBValue', () => {
	const initialIndexedDB = globalThis.indexedDB;

	beforeAll(() => {
		vi.useFakeTimers();

		vi.stubGlobal('indexedDB', indexeddb);
	});

	afterEach(() => {
		vi.clearAllMocks();
		vi.clearAllTimers();

		indexeddb.deleteDatabase('users');
	});

	afterAll(() => {
		vi.useRealTimers();

		globalThis.indexedDB = initialIndexedDB;
	});

	it('should be defined', () => {
		expect(useIndexedDBValue).toBeDefined();
	});

	it('should initialize', () => {
		const {result} = renderHook(() =>
			useIndexedDBValue({
				name: 'test',
				version: 1,
				tables: ['users'],
			}));

		act(() => {
			vi.advanceTimersByTime(1);
		});

		expect(result.current.isConnecting).toBe(false);
		expect(result.current.isReady).toBe(true);
	});

	it('should return undefined if value does not exist', async () => {
		const {result} = renderHook(() =>
			useIndexedDBValue({
				name: 'test',
				version: 1,
				tables: ['users'],
			}));

		act(() => {
			vi.advanceTimersByTime(1);
		});

		let user;

		result.current
			.get('users', 1)
			.then((response) => {
				mockSuccess();
				user = response;
			})
			.catch(mockError);

		await act(async () => {
			vi.advanceTimersByTime(1);
		});

		expect(mockError).not.toHaveBeenCalled();
		expect(mockSuccess).toHaveBeenCalledTimes(1);
		expect(user).toBe(undefined);
	});

	it('should put a new value with valid id', async () => {
		const {result} = renderHook(() =>
			useIndexedDBValue({
				name: 'test',
				version: 1,
				tables: ['users'],
			}));

		act(() => {
			vi.advanceTimersByTime(1);
		});

		let key;

		result.current
			.put('users', {name: 'John Doe'})
			.then((response) => {
				key = response;
				mockSuccess();
			})
			.catch(mockError);

		await act(async () => {
			vi.advanceTimersByTime(1);
		});

		expect(mockError).not.toHaveBeenCalled();
		expect(mockSuccess).toHaveBeenCalledTimes(1);
		expect(key).toBeDefined();
	});

	it('should return valid value of existing entity', async () => {
		const {result} = renderHook(() =>
			useIndexedDBValue({
				name: 'test',
				version: 1,
				tables: ['users'],
			}));

		act(() => {
			vi.advanceTimersByTime(1);
		});

		let key;

		result.current
			.put('users', {name: 'John Doe'})
			.then((response) => {
				key = response;
			})
			.catch(() => {});

		await act(async () => {
			vi.advanceTimersByTime(1);
		});

		expect(key).toBeDefined();

		let user;

		result.current
			.get('users', key! as number)
			.then((response) => {
				user = response;
				mockSuccess();
			})
			.catch(mockError);

		await act(async () => {
			vi.advanceTimersByTime(1);
		});

		expect(mockError).not.toHaveBeenCalled();
		expect(mockSuccess).toHaveBeenCalledTimes(1);
		expect(user).toBeDefined();
	});

	it('should remove existing entity', async () => {
		const {result} = renderHook(() =>
			useIndexedDBValue({
				name: 'test',
				version: 1,
				tables: ['users'] as const,
			}));

		act(() => {
			vi.advanceTimersByTime(1);
		});

		let key;

		result.current
			.put('users', {name: 'John Doe'})
			.then((response) => {
				key = response;
			})
			.catch(() => {});

		await act(async () => {
			vi.advanceTimersByTime(1);
		});

		expect(key).toBeDefined();

		let user;

		result.current
			.get('users', key! as number)
			.then((response) => {
				user = response;
			})
			.catch(() => {});

		act(() => {
			vi.advanceTimersByTime(1);
		});

		const removedKey = result.current.remove('users', key! as number);

		act(() => {
			vi.advanceTimersByTime(1);
		});

		expect(removedKey).toEqual(key);
	});
});
