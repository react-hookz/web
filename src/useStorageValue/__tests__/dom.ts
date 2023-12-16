import { act, renderHook } from '@testing-library/react-hooks/dom';
import { useStorageValue } from '../index.js';
import { newStorage } from './misc.js';

describe('useStorageValue', () => {
	it('should be defined', () => {
		expect(useStorageValue).toBeDefined();
	});

	it('should render', () => {
		const { result } = renderHook(() => useStorageValue(newStorage(), 'foo'));

		expect(result.error).toBeUndefined();
	});

	it('should action methods should be stable between renders', () => {
		const { result, rerender } = renderHook(() => useStorageValue(newStorage(), 'foo'));

		rerender();
		act(() => {
			result.current.set('bar');
		});
		rerender();

		type ResultType = typeof result.current;

		expect(result.all[0].set).toBe(result.current.set);
		expect(result.all[0].fetch).toBe(result.current.fetch);
		expect(result.all[0].remove).toBe(result.current.remove);
	});

	it('should fetch value from storage only on init', () => {
		const storage = newStorage((key) => `"${key}"`);
		const { result, rerender } = renderHook(() => useStorageValue(storage, 'foo'));

		expect(result.current.value).toBe('foo');
		expect(storage.getItem).toHaveBeenCalledWith('foo');

		rerender();
		rerender();
		rerender();

		expect(storage.getItem).toHaveBeenCalledTimes(1);
	});

	it('should pass value through JSON.parse during fetch', () => {
		const JSONParseSpy = jest.spyOn(JSON, 'parse');
		const storage = newStorage((key) => `"${key}"`);
		const { result } = renderHook(() => useStorageValue(storage, 'foo'));

		expect(result.current.value).toBe('foo');
		expect(JSONParseSpy).toHaveBeenCalledWith('"foo"');

		JSONParseSpy.mockRestore();
	});

	it('should yield default value in case storage returned null during fetch', () => {
		const { result } = renderHook(() =>
			useStorageValue(newStorage(), 'foo', { defaultValue: 'defaultValue' })
		);

		expect(result.current.value).toBe('defaultValue');
	});

	it('should yield default value and console.warn in case storage returned corrupted JSON', () => {
		const warnSpy = jest.spyOn(console, 'warn').mockImplementationOnce(() => {});
		const { result } = renderHook(() =>
			useStorageValue(
				newStorage(() => 'corrupted JSON'),
				'foo',
				{ defaultValue: 'defaultValue' }
			)
		);

		expect(result.current.value).toBe('defaultValue');
		expect(warnSpy.mock.calls[0][0]).toBeInstanceOf(SyntaxError);

		warnSpy.mockRestore();
	});

	it('should not fetch value on first render in case `initializeWithValue` options is set to false', () => {
		const { result } = renderHook(() =>
			useStorageValue<string>(
				newStorage(() => '"bar"'),
				'foo',
				{ initializeWithValue: false }
			)
		);

		// @ts-expect-error invalid typings of testing library
		expect(result.all[0].value).toBe(undefined);
		// @ts-expect-error invalid typings of testing library
		expect(result.all[1].value).toBe('bar');
	});

	it('should fetch value on first render in case `initializeWithValue` options is set to true', () => {
		const { result } = renderHook(() =>
			useStorageValue<string>(
				newStorage(() => '"bar"'),
				'foo',
				{ initializeWithValue: true }
			)
		);
		// @ts-expect-error invalid typings of testing library
		expect(result.all[0].value).toBe('bar');
	});

	it('should set storage value on .set() call', () => {
		const { result } = renderHook(() => useStorageValue<string>(newStorage(), 'foo'));

		expect(result.current.value).toBe(null);
		act(() => {
			result.current.set('bar');
		});
		expect(result.current.value).toBe('bar');

		const spySetter = jest.fn(() => 'baz');
		act(() => {
			result.current.set(spySetter);
		});
		expect(result.current.value).toBe('baz');
		expect(spySetter).toHaveBeenCalledWith('bar');
	});

	it('should call JSON.stringify on setState call', () => {
		const JSONStringifySpy = jest.spyOn(JSON, 'stringify');
		const { result } = renderHook(() => useStorageValue<string>(newStorage(), 'foo'));

		expect(result.current.value).toBe(null);
		act(() => {
			result.current.set('bar');
		});
		expect(result.current.value).toBe('bar');
		expect(JSONStringifySpy).toHaveBeenCalledWith('bar');
		JSONStringifySpy.mockRestore();
	});

	it('should not store null or data that cannot be processed by JSON serializer', () => {
		const { result } = renderHook(() =>
			useStorageValue<string>(
				newStorage(() => '"bar"'),
				'foo',
				{ defaultValue: 'default value' }
			)
		);

		const invalidData: { a?: unknown } = {};
		invalidData.a = { b: invalidData };

		expect(result.current.value).toBe('bar');
		act(() => {
			// @ts-expect-error testing inappropriate use
			result.current.set(null);
		});
		expect(result.current.value).toBe('bar');
	});

	it('should call storage`s removeItem on .remove() call', () => {
		const storage = newStorage();
		const { result } = renderHook(() => useStorageValue<string>(storage, 'foo'));

		act(() => {
			result.current.remove();
		});
		expect(storage.removeItem).toHaveBeenCalledWith('foo');
	});

	it('should set state to default value on item remove', () => {
		const { result } = renderHook(() =>
			useStorageValue<string>(
				newStorage(() => '"bar"'),
				'foo',
				{ defaultValue: 'default value' }
			)
		);

		expect(result.current.value).toBe('bar');
		act(() => {
			result.current.remove();
		});
		expect(result.current.value).toBe('default value');
	});

	it('should refetch value from store on .fetch() call', () => {
		const storage = newStorage(() => '"bar"');
		const { result } = renderHook(() =>
			useStorageValue<string>(storage, 'foo', { defaultValue: 'default value' })
		);

		expect(storage.getItem).toHaveBeenCalledTimes(1);
		expect(result.current.value).toBe('bar');
		storage.getItem.mockImplementationOnce(() => '"baz"');

		act(() => {
			result.current.fetch();
		});

		expect(storage.getItem).toHaveBeenCalledTimes(2);
		expect(result.current.value).toBe('baz');
	});

	it('should refetch value on key change', () => {
		const storage = newStorage((k) => `"${k}"`);
		const { result, rerender } = renderHook(
			({ key }) => useStorageValue<string>(storage, key, { defaultValue: 'default value' }),
			{ initialProps: { key: 'foo' } }
		);

		expect(result.current.value).toBe('foo');
		rerender({ key: 'bar' });
		expect(result.current.value).toBe('bar');
	});

	it('should use custom stringify option', () => {
		const storage = newStorage();
		const { result } = renderHook(() =>
			useStorageValue<number[]>(storage, 'foo', {
				stringify(data) {
					return data.map((number_) => number_.toString(16)).join(':');
				},
				parse(str, fallback) {
					if (str === null) return fallback;

					if (str === '') return [];

					return str.split(':').map((number_) => Number.parseInt(number_, 16));
				},
			})
		);

		expect(result.current.value).toBe(null);
		act(() => {
			result.current.set([1, 2, 3]);
		});
		expect(storage.setItem).toHaveBeenCalledWith('foo', '1:2:3');
	});

	it('should use custom parse option', () => {
		const storage = newStorage();
		storage.getItem.mockImplementationOnce(() => '1:2:3');
		const { result } = renderHook(() =>
			useStorageValue<number[]>(storage, 'foo', {
				stringify(data) {
					return data.map((number_) => number_.toString(16)).join(':');
				},
				parse(str, fallback) {
					if (str === null) return fallback;

					if (str === '') return [];

					return str.split(':').map((number_) => Number.parseInt(number_, 16));
				},
			})
		);
		expect(result.current.value).toEqual([1, 2, 3]);
	});

	describe('should handle window`s `storage` event', () => {
		it('should update state if tracked key is updated', () => {
			const { result } = renderHook(() => useStorageValue<string>(localStorage, 'foo'));
			expect(result.current.value).toBe(null);

			localStorage.setItem('foo', 'bar');
			act(() => {
				window.dispatchEvent(
					new StorageEvent('storage', { key: 'foo', storageArea: localStorage, newValue: '"foo"' })
				);
			});

			expect(result.current.value).toBe('foo');
			localStorage.removeItem('foo');
		});

		it('should not update data on event storage or key mismatch', () => {
			const { result } = renderHook(() => useStorageValue<string>(localStorage, 'foo'));
			expect(result.current.value).toBe(null);

			act(() => {
				window.dispatchEvent(
					new StorageEvent('storage', {
						key: 'foo',
						storageArea: sessionStorage,
						newValue: '"foo"',
					})
				);
			});
			expect(result.current.value).toBe(null);

			act(() => {
				window.dispatchEvent(
					new StorageEvent('storage', {
						key: 'bar',
						storageArea: localStorage,
						newValue: 'foo',
					})
				);
			});
			expect(result.current.value).toBe(null);

			localStorage.removeItem('foo');
		});
	});

	describe('synchronisation', () => {
		it('should update state of all hooks with the same key in same storage', () => {
			const { result: res } = renderHook(() => useStorageValue<string>(localStorage, 'foo'));
			const { result: res1 } = renderHook(() => useStorageValue<string>(localStorage, 'foo'));

			expect(res.current.value).toBe(null);
			expect(res1.current.value).toBe(null);

			act(() => {
				res.current.set('bar');
			});
			expect(res.current.value).toBe('bar');
			expect(res1.current.value).toBe('bar');

			act(() => {
				res.current.remove();
			});
			expect(res.current.value).toBe(null);
			expect(res1.current.value).toBe(null);

			localStorage.setItem('foo', '"123"');
			act(() => {
				res.current.fetch();
			});
			expect(res.current.value).toBe('123');
			expect(res1.current.value).toBe('123');
			localStorage.removeItem('foo');
		});
	});
});
