import { renderHook, act } from '@testing-library/react-hooks/server';
import { useMap } from '#root/index.js';

describe('useMap', () => {
	it('should be defined', () => {
		expect(useMap).toBeDefined();
	});

	it('should render', () => {
		const { result } = renderHook(() => useMap());
		expect(result.error).toBeUndefined();
	});

	it('should return a Map instance with altered set, clear and delete methods', () => {
		const { result } = renderHook(() => useMap());
		expect(result.current).toBeInstanceOf(Map);
		expect(result.current.set).not.toBe(Map.prototype.set);
		expect(result.current.clear).not.toBe(Map.prototype.clear);
		expect(result.current.delete).not.toBe(Map.prototype.delete);
	});

	it('should accept initial values', () => {
		const { result } = renderHook(() =>
			useMap([
				['foo', 1],
				['bar', 2],
				['baz', 3],
			])
		);
		expect(result.current.get('foo')).toBe(1);
		expect(result.current.get('bar')).toBe(2);
		expect(result.current.get('baz')).toBe(3);
		expect(result.current.size).toBe(3);
	});

	it('`set` should invoke original method and not rerender component', () => {
		const spy = jest.spyOn(Map.prototype, 'set');
		let i = 0;
		const { result } = renderHook(() => [++i, useMap()] as const);

		act(() => {
			expect(result.current[1].set('foo', 'bar')).toBe(result.current[1]);
			expect(spy).toHaveBeenCalledWith('foo', 'bar');
		});

		expect(result.current[0]).toBe(1);

		spy.mockRestore();
	});

	it('`clear` should invoke original method and not rerender component', () => {
		const spy = jest.spyOn(Map.prototype, 'clear');
		let i = 0;
		const { result } = renderHook(() => [++i, useMap()] as const);

		act(() => {
			result.current[1].clear();
		});

		expect(result.current[0]).toBe(1);

		spy.mockRestore();
	});

	it('`delete` should invoke original method and not rerender component', () => {
		const spy = jest.spyOn(Map.prototype, 'delete');
		let i = 0;
		const { result } = renderHook(() => [++i, useMap([['foo', 1]])] as const);

		act(() => {
			expect(result.current[1].delete('foo')).toBe(true);
			expect(spy).toHaveBeenCalledWith('foo');
		});

		expect(result.current[0]).toBe(1);

		spy.mockRestore();
	});
});
