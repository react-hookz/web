/* eslint-disable max-nested-callbacks */
import {act, renderHook} from '@ver0/react-hooks-testing';
import type {Mock} from 'vitest';
import {describe, expect, it, vi} from 'vitest';
import {useList} from '../index.js';
import {expectResultValue} from '../util/testing/test-helpers.js';

describe('useList', () => {
	it('should be defined', async () => {
		expect(useList).toBeDefined();
	});

	it('should render', async () => {
		const {result} = await renderHook(() => useList([]));
		expect(result.error).toBeUndefined();
	});

	it('should accept an initial list', async () => {
		const {result} = await renderHook(() => useList([0, 1, 2]));
		const value = expectResultValue(result);
		expect(value[0]).toEqual([0, 1, 2]);
	});

	it('should return same actions object on every render', async () => {
		const {result} = await renderHook(() => useList([0, 1, 2]));
		const initialValue = expectResultValue(result);
		const actions = initialValue[1];

		await act(async () => {
			actions.set([3, 4, 5]);
		});

		const updatedValue = expectResultValue(result);
		expect(updatedValue[1]).toEqual(actions);
	});

	describe('set', () => {
		it('should replace the current list', async () => {
			const {result} = await renderHook(() => useList([0, 1, 2]));
			const initialValue = expectResultValue(result);
			const {set} = initialValue[1];

			await act(async () => {
				set([3, 4, 5]);
			});

			const updatedValue = expectResultValue(result);
			expect(updatedValue[0]).toEqual([3, 4, 5]);
		});

		it('should replace the current list with empty list', async () => {
			const {result} = await renderHook(() => useList([0, 1, 2]));
			const initialValue = expectResultValue(result);
			const {set} = initialValue[1];

			await act(async () => {
				set([]);
			});

			const updatedValue = expectResultValue(result);
			expect(updatedValue[0]).toEqual([]);
		});

		it('should functionally replace the current list', async () => {
			const {result} = await renderHook(() => useList([0, 1, 2]));
			const initialValue = expectResultValue(result);
			const {set} = initialValue[1];

			await act(async () => {
				set((current) => [...current, 3]);
			});

			const updatedValue = expectResultValue(result);
			expect(updatedValue[0]).toEqual([0, 1, 2, 3]);
		});
	});

	describe('push', () => {
		it('should push a new item to the list', async () => {
			const {result} = await renderHook(() => useList([0, 1, 2]));
			const initialValue = expectResultValue(result);
			const {push} = initialValue[1];

			await act(async () => {
				push(3);
			});

			const updatedValue = expectResultValue(result);
			expect(updatedValue[0]).toEqual([0, 1, 2, 3]);
		});

		it('should push multiple items to the list', async () => {
			const {result} = await renderHook(() => useList([0, 1, 2]));
			const initialValue = expectResultValue(result);
			const {push} = initialValue[1];

			await act(async () => {
				push(3, 4, 5);
			});

			const updatedValue = expectResultValue(result);
			expect(updatedValue[0]).toEqual([0, 1, 2, 3, 4, 5]);
		});
	});

	describe('updateAt', () => {
		it('should update item at given position', async () => {
			const {result} = await renderHook(() => useList([0, 1, 2]));

			const initialValue = expectResultValue(result);
			const {updateAt} = initialValue[1];

			await act(async () => {
				updateAt(1, 0);
			});

			const updatedValue = expectResultValue(result);
			expect(updatedValue[0]).toEqual([0, 0, 2]);
		});

		it('should update item at position that is out of of bounds', async () => {
			const {result} = await renderHook(() => useList([0, 1, 2]));

			const initialValue = expectResultValue(result);
			const {updateAt} = initialValue[1];

			await act(async () => {
				updateAt(4, 0);
			});

			const updatedValue = expectResultValue(result);
			expect(updatedValue[0]).toEqual([0, 1, 2, undefined, 0]);
		});
	});

	describe('insertAt', () => {
		it('should insert item into given position in the list', async () => {
			const {result} = await renderHook(() => useList([0, 1, 2]));

			const initialValue = expectResultValue(result);
			const {insertAt} = initialValue[1];

			await act(async () => {
				insertAt(1, 0);
			});

			const updatedValue = expectResultValue(result);
			expect(updatedValue[0]).toEqual([0, 0, 1, 2]);
		});

		it('should insert item into position that is out of bounds', async () => {
			const {result} = await renderHook(() => useList([0, 1, 2]));

			const initialValue = expectResultValue(result);
			const {insertAt} = initialValue[1];

			await act(async () => {
				insertAt(4, 0);
			});

			const updatedValue = expectResultValue(result);
			expect(updatedValue[0]).toEqual([0, 1, 2, undefined, 0]);
		});
	});

	describe('update', () => {
		it('should update all items that match given predicate', async () => {
			const {result} = await renderHook(() => useList([0, 1, 2]));

			const initialValue = expectResultValue(result);
			const {update} = initialValue[1];

			await act(async () => {
				update((iteratedItem: number) => iteratedItem > 0, 0);
			});

			const updatedValue = expectResultValue(result);
			expect(updatedValue[0]).toEqual([0, 0, 0]);
		});

		it('should pass update predicate the iterated element and the replacement', async () => {
			const {result} = await renderHook(() => useList([0, 1, 2]));
			const initialValue = expectResultValue(result);
			const {update} = initialValue[1];
			const predicate = vi.fn((_iteratedItem, _newElement) => false);

			await act(async () => {
				update(predicate, 0);
			});

			expect(numberOfMockFunctionCalls(predicate)).toEqual(3);
			expect(mockFunctionCallArgument(predicate, 0, 0)).toBe(0);
			expect(mockFunctionCallArgument(predicate, 0, 1)).toBe(0);
		});

		it('should not update any items if none match given predicate', async () => {
			const {result} = await renderHook(() => useList([0, 1, 2]));

			const initialValue = expectResultValue(result);
			const {update} = initialValue[1];

			await act(async () => {
				update((iteratedItem: number) => iteratedItem > 3, 0);
			});

			const updatedValue = expectResultValue(result);
			expect(updatedValue[0]).toEqual([0, 1, 2]);
		});
	});

	describe('updateFirst', () => {
		it('should update the first item matching the given predicate', async () => {
			const {result} = await renderHook(() => useList([0, 1, 2]));

			const initialValue = expectResultValue(result);
			const {updateFirst} = initialValue[1];

			await act(async () => {
				updateFirst((iteratedItem: number) => iteratedItem > 0, 0);
			});

			const updatedValue = expectResultValue(result);
			expect(updatedValue[0]).toEqual([0, 0, 2]);
		});

		it('should not update any items if none match given predicate', async () => {
			const {result} = await renderHook(() => useList([0, 1, 2]));

			const initialValue = expectResultValue(result);
			const {updateFirst} = initialValue[1];

			await act(async () => {
				updateFirst((iteratedItem: number) => iteratedItem > 3, 0);
			});

			const updatedValue = expectResultValue(result);
			expect(updatedValue[0]).toEqual([0, 1, 2]);
		});
	});

	describe('upsert', () => {
		it('should update the first item matching the given predicate', async () => {
			const {result} = await renderHook(() => useList([0, 1, 2]));
			const initialValue = expectResultValue(result);
			const {upsert} = initialValue[1];

			await act(async () => {
				upsert((iteratedItem: number) => iteratedItem > 0, 0);
			});

			const updatedValue = expectResultValue(result);
			expect(updatedValue[0]).toEqual([0, 0, 2]);
		});

		it('should push given item to list, if no item matches the predicate', async () => {
			const {result} = await renderHook(() => useList([0, 1, 2]));
			const initialValue = expectResultValue(result);
			const {upsert} = initialValue[1];

			await act(async () => {
				upsert((iteratedItem: number) => iteratedItem > 3, 0);
			});

			const updatedValue = expectResultValue(result);
			expect(updatedValue[0]).toEqual([0, 1, 2, 0]);
		});

		it('should pass predicate the iterated element and the new element', async () => {
			const {result} = await renderHook(() => useList([0, 1, 2]));
			const initialValue = expectResultValue(result);
			const {upsert} = initialValue[1];
			const predicate = vi.fn((_iteratedItem, _newElement) => false);

			await act(async () => {
				upsert(predicate, 0);
			});

			expect(numberOfMockFunctionCalls(predicate)).toEqual(3);
			expect(mockFunctionCallArgument(predicate, 0, 0)).toBe(0);
			expect(mockFunctionCallArgument(predicate, 0, 1)).toBe(0);
		});
	});

	describe('sort', () => {
		it('should sort list with given sorting function', async () => {
			const {result} = await renderHook(() => useList([1, 0, 2]));

			const initialValue = expectResultValue(result);
			const {sort} = initialValue[1];

			await act(async () => {
				sort((a, b) => b - a);
			});

			const updatedValue = expectResultValue(result);
			expect(updatedValue[0]).toEqual([2, 1, 0]);
		});

		it('should use default sorting if sort is called without arguments', async () => {
			const {result} = await renderHook(() => useList([1, 0, 2]));

			const initialValue = expectResultValue(result);
			const {sort} = initialValue[1];

			await act(async () => {
				sort();
			});

			const updatedValue = expectResultValue(result);
			expect(updatedValue[0]).toEqual([0, 1, 2]);
		});
	});

	describe('filter', () => {
		it('should filter list with given filter function', async () => {
			const {result} = await renderHook(() => useList([1, 0, 2]));

			const initialValue = expectResultValue(result);
			const {filter} = initialValue[1];

			await act(async () => {
				filter((a) => a > 0);
			});

			const updatedValue = expectResultValue(result);
			expect(updatedValue[0]).toEqual([1, 2]);
		});

		it('should pass element, its index and iterated list to filter function', async () => {
			const {result} = await renderHook(() => useList([1, 0, 2]));

			const initialValue = expectResultValue(result);
			const {filter} = initialValue[1];
			const filterFunction = vi.fn((_element, _index, _list) => false);

			await act(async () => {
				filter(filterFunction);
			});

			expect(numberOfMockFunctionCalls(filterFunction)).toEqual(3);
			expect(mockFunctionCallArgument(filterFunction, 0, 0)).toBe(1);
			expect(mockFunctionCallArgument(filterFunction, 0, 1)).toBe(0);
			expect(mockFunctionCallArgument(filterFunction, 0, 2)).toEqual([1, 0, 2]);
		});
	});

	describe('removeAt', () => {
		it('should remove item from given index', async () => {
			const {result} = await renderHook(() => useList([1, 0, 2]));

			const initialValue = expectResultValue(result);
			const {removeAt} = initialValue[1];

			await act(async () => {
				removeAt(1);
			});

			const updatedValue = expectResultValue(result);
			expect(updatedValue[0]).toEqual([1, 2]);
		});

		it('should not remove items if given index is out of bounds', async () => {
			const {result} = await renderHook(() => useList([1, 0, 2]));

			const initialValue = expectResultValue(result);
			const {removeAt} = initialValue[1];

			await act(async () => {
				removeAt(6);
			});

			const updatedValue = expectResultValue(result);
			expect(updatedValue[0]).toEqual([1, 0, 2]);
		});
	});

	describe('clear', () => {
		it('should clear the list', async () => {
			const {result} = await renderHook(() => useList([1, 0, 2]));

			const initialValue = expectResultValue(result);
			const {clear} = initialValue[1];

			await act(async () => {
				clear();
			});

			const updatedValue = expectResultValue(result);
			expect(updatedValue[0]).toEqual([]);
		});
	});

	describe('reset', () => {
		it('should reset the list to initial value', async () => {
			const {result} = await renderHook(() => useList([1, 0, 2]));

			const initialValue = expectResultValue(result);
			const {reset, set} = initialValue[1];

			await act(async () => {
				set([1, 1, 1]);
				reset();
			});

			const updatedValue = expectResultValue(result);
			expect(updatedValue[0]).toEqual([1, 0, 2]);
		});
	});
});

function numberOfMockFunctionCalls(mockFunction: Mock): number {
	return mockFunction.mock.calls.length;
}

function mockFunctionCallArgument(mockFunction: Mock, callIndex: number, argumentIndex: number) {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-return
	return mockFunction.mock.calls[callIndex][argumentIndex];
}
