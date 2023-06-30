import { renderHook } from '@testing-library/react-hooks/server';
import { act } from '@testing-library/react-hooks/dom';
import { useSet } from '../..';

describe('useSet', () => {
	it('should be defined', () => {
		expect(useSet).toBeDefined();
	});

	it('should render', () => {
		const { result } = renderHook(() => useSet());
		expect(result.error).toBeUndefined();
	});

	it('should return a Set instance with altered add, clear and delete methods', () => {
		const { result } = renderHook(() => useSet());
		expect(result.current).toBeInstanceOf(Set);
		expect(result.current.add).not.toBe(Set.prototype.add);
		expect(result.current.clear).not.toBe(Set.prototype.clear);
		expect(result.current.delete).not.toBe(Set.prototype.delete);
	});

	it('should accept initial values', () => {
		const { result } = renderHook(() => useSet([1, 2, 3]));
		expect(result.current.has(1)).toBe(true);
		expect(result.current.has(2)).toBe(true);
		expect(result.current.has(3)).toBe(true);
		expect(result.current.size).toBe(3);
	});

	it('`add` should invoke original method and rerender component', () => {
		const spy = jest.spyOn(Set.prototype, 'add');
		let i = 0;
		const { result } = renderHook(() => [++i, useSet()] as const);

		act(() => {
			expect(result.current[1].add(1)).toBe(result.current[1]);
			expect(spy).toHaveBeenCalledWith(1);
		});

		expect(result.current[0]).toBe(1);

		spy.mockRestore();
	});

	it('`clear` should invoke original method and rerender component', () => {
		const spy = jest.spyOn(Set.prototype, 'clear');
		let i = 0;
		const { result } = renderHook(() => [++i, useSet()] as const);

		act(() => {
			result.current[1].clear();
		});

		expect(result.current[0]).toBe(1);

		spy.mockRestore();
	});

	it('`delete` should invoke original method and rerender component', () => {
		const spy = jest.spyOn(Set.prototype, 'delete');
		let i = 0;
		const { result } = renderHook(() => [++i, useSet([1])] as const);

		act(() => {
			expect(result.current[1].delete(1)).toBe(true);
			expect(spy).toHaveBeenCalledWith(1);
		});

		expect(result.current[0]).toBe(1);

		spy.mockRestore();
	});
});
