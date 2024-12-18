/* eslint-disable max-nested-callbacks */
import {act, renderHook} from '@testing-library/react-hooks/dom';
import {describe, expect, it, vi} from 'vitest';
import {useList} from '../index.js';

describe('useList', () => {
	it('should be defined', () => {
		expect(useList).toBeDefined();
	});

	it('should render', () => {
		const {result} = renderHook(() => useList([]));
		expect(result.error).toBeUndefined();
	});

	it('should accept an initial list', () => {
		const {result} = renderHook(() => useList([0, 1, 2]));
		expect(result.current[0]).toEqual([0, 1, 2]);
	});

	it('should return same actions object on every render', () => {
		const {result} = renderHook(() => useList([0, 1, 2]));
		const actions = result.current[1];

		act(() => {
			actions.set([3, 4, 5]);
		});

		expect(result.current[1]).toEqual(actions);
	});

	describe('set', () => {
		it('should replace the current list', () => {
			const {result} = renderHook(() => useList([0, 1, 2]));
			const {set} = result.current[1];

			act(() => {
				set([3, 4, 5]);
			});

			expect(result.current[0]).toEqual([3, 4, 5]);
		});

		it('should replace the current list with empty list', () => {
			const {result} = renderHook(() => useList([0, 1, 2]));
			const {set} = result.current[1];

			act(() => {
				set([]);
			});

			expect(result.current[0]).toEqual([]);
		});

		it('should functionally replace the current list', () => {
			const {result} = renderHook(() => useList([0, 1, 2]));
			const {set} = result.current[1];

			act(() => {
				set(current => [...current, 3]);
			});

			expect(result.current[0]).toEqual([0, 1, 2, 3]);
		});
	});

	describe('push', () => {
		it('should push a new item to the list', () => {
			const {result} = renderHook(() => useList([0, 1, 2]));
			const {push} = result.current[1];

			act(() => {
				push(3);
			});

			expect(result.current[0]).toEqual([0, 1, 2, 3]);
		});

		it('should push multiple items to the list', () => {
			const {result} = renderHook(() => useList([0, 1, 2]));
			const {push} = result.current[1];

			act(() => {
				push(3, 4, 5);
			});

			expect(result.current[0]).toEqual([0, 1, 2, 3, 4, 5]);
		});
	});

	describe('updateAt', () => {
		it('should update item at given position', () => {
			const {result} = renderHook(() => useList([0, 1, 2]));
			const {updateAt} = result.current[1];

			act(() => {
				updateAt(1, 0);
			});

			expect(result.current[0]).toEqual([0, 0, 2]);
		});

		it('should update item at position that is out of of bounds', () => {
			const {result} = renderHook(() => useList([0, 1, 2]));
			const {updateAt} = result.current[1];

			act(() => {
				updateAt(4, 0);
			});

			expect(result.current[0]).toEqual([0, 1, 2, undefined, 0]);
		});
	});

	describe('insertAt', () => {
		it('should insert item into given position in the list', () => {
			const {result} = renderHook(() => useList([0, 1, 2]));
			const {insertAt} = result.current[1];

			act(() => {
				insertAt(1, 0);
			});

			expect(result.current[0]).toEqual([0, 0, 1, 2]);
		});

		it('should insert item into position that is out of bounds', () => {
			const {result} = renderHook(() => useList([0, 1, 2]));
			const {insertAt} = result.current[1];

			act(() => {
				insertAt(4, 0);
			});

			expect(result.current[0]).toEqual([0, 1, 2, undefined, 0]);
		});
	});

	describe('update', () => {
		it('should update all items that match given predicate', () => {
			const {result} = renderHook(() => useList([0, 1, 2]));
			const {update} = result.current[1];

			act(() => {
				update((iteratedItem: number) => iteratedItem > 0, 0);
			});

			expect(result.current[0]).toEqual([0, 0, 0]);
		});

		it('should pass update predicate the iterated element and the replacement', () => {
			const {result} = renderHook(() => useList([0, 1, 2]));
			const {update} = result.current[1];
			const predicate = vi.fn((_iteratedItem, _newElement) => false);

			act(() => {
				update(predicate, 0);
			});

			expect(numberOfMockFunctionCalls(predicate)).toEqual(3);
			expect(mockFunctionCallArgument(predicate, 0, 0)).toBe(0);
			expect(mockFunctionCallArgument(predicate, 0, 1)).toBe(0);
		});

		it('should not update any items if none match given predicate', () => {
			const {result} = renderHook(() => useList([0, 1, 2]));
			const {update} = result.current[1];

			act(() => {
				update((iteratedItem: number) => iteratedItem > 3, 0);
			});

			expect(result.current[0]).toEqual([0, 1, 2]);
		});
	});

	describe('updateFirst', () => {
		it('should update the first item matching the given predicate', () => {
			const {result} = renderHook(() => useList([0, 1, 2]));
			const {updateFirst} = result.current[1];

			act(() => {
				updateFirst((iteratedItem: number) => iteratedItem > 0, 0);
			});

			expect(result.current[0]).toEqual([0, 0, 2]);
		});

		it('should not update any items if none match given predicate', () => {
			const {result} = renderHook(() => useList([0, 1, 2]));
			const {updateFirst} = result.current[1];

			act(() => {
				updateFirst((iteratedItem: number) => iteratedItem > 3, 0);
			});

			expect(result.current[0]).toEqual([0, 1, 2]);
		});
	});

	describe('upsert', () => {
		it('should update the first item matching the given predicate', () => {
			const {result} = renderHook(() => useList([0, 1, 2]));
			const {upsert} = result.current[1];

			act(() => {
				upsert((iteratedItem: number) => iteratedItem > 0, 0);
			});

			expect(result.current[0]).toEqual([0, 0, 2]);
		});

		it('should push given item to list, if no item matches the predicate', () => {
			const {result} = renderHook(() => useList([0, 1, 2]));
			const {upsert} = result.current[1];

			act(() => {
				upsert((iteratedItem: number) => iteratedItem > 3, 0);
			});

			expect(result.current[0]).toEqual([0, 1, 2, 0]);
		});

		it('should pass predicate the iterated element and the new element', () => {
			const {result} = renderHook(() => useList([0, 1, 2]));
			const {upsert} = result.current[1];
			const predicate = vi.fn((_iteratedItem, _newElement) => false);

			act(() => {
				upsert(predicate, 0);
			});

			expect(numberOfMockFunctionCalls(predicate)).toEqual(3);
			expect(mockFunctionCallArgument(predicate, 0, 0)).toBe(0);
			expect(mockFunctionCallArgument(predicate, 0, 1)).toBe(0);
		});
	});

	describe('sort', () => {
		it('should sort list with given sorting function', () => {
			const {result} = renderHook(() => useList([1, 0, 2]));
			const {sort} = result.current[1];

			act(() => {
				sort((a, b) => b - a);
			});

			expect(result.current[0]).toEqual([2, 1, 0]);
		});

		it('should use default sorting if sort is called without arguments', () => {
			const {result} = renderHook(() => useList([1, 0, 2]));
			const {sort} = result.current[1];

			act(() => {
				sort();
			});

			expect(result.current[0]).toEqual([0, 1, 2]);
		});
	});

	describe('filter', () => {
		it('should filter list with given filter function', () => {
			const {result} = renderHook(() => useList([1, 0, 2]));
			const {filter} = result.current[1];

			act(() => {
				filter(a => a > 0);
			});

			expect(result.current[0]).toEqual([1, 2]);
		});

		it('should pass element, its index and iterated list to filter function', () => {
			const {result} = renderHook(() => useList([1, 0, 2]));
			const {filter} = result.current[1];
			const filterFunction = vi.fn((_element, _index, _list) => false);

			act(() => {
				filter(filterFunction);
			});

			expect(numberOfMockFunctionCalls(filterFunction)).toEqual(3);
			expect(mockFunctionCallArgument(filterFunction, 0, 0)).toBe(1);
			expect(mockFunctionCallArgument(filterFunction, 0, 1)).toBe(0);
			expect(mockFunctionCallArgument(filterFunction, 0, 2)).toEqual([1, 0, 2]);
		});
	});

	describe('removeAt', () => {
		it('should remove item from given index', () => {
			const {result} = renderHook(() => useList([1, 0, 2]));
			const {removeAt} = result.current[1];

			act(() => {
				removeAt(1);
			});

			expect(result.current[0]).toEqual([1, 2]);
		});

		it('should not remove items if given index is out of bounds', () => {
			const {result} = renderHook(() => useList([1, 0, 2]));
			const {removeAt} = result.current[1];

			act(() => {
				removeAt(6);
			});

			expect(result.current[0]).toEqual([1, 0, 2]);
		});
	});

	describe('clear', () => {
		it('should clear the list', () => {
			const {result} = renderHook(() => useList([1, 0, 2]));
			const {clear} = result.current[1];

			act(() => {
				clear();
			});

			expect(result.current[0]).toEqual([]);
		});
	});

	describe('reset', () => {
		it('should reset the list to initial value', () => {
			const {result} = renderHook(() => useList([1, 0, 2]));
			const {reset, set} = result.current[1];

			act(() => {
				set([1, 1, 1]);
				reset();
			});

			expect(result.current[0]).toEqual([1, 0, 2]);
		});
	});
});

function numberOfMockFunctionCalls(mockFunction: vi.Mock) {
	return mockFunction.mock.calls.length;
}

function mockFunctionCallArgument(
	mockFunction: vi.Mock,
	callIndex: number,
	argumentIndex: number,
) {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-return
	return mockFunction.mock.calls[callIndex][argumentIndex];
}
