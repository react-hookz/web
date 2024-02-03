import { renderHook } from '@testing-library/react-hooks/dom';
import { useHookableRef } from '../../index.js';

describe('useHookableRef', () => {
	it('should be defined', () => {
		expect(useHookableRef).toBeDefined();
	});

	it('should render', () => {
		const { result } = renderHook(() => useHookableRef());
		expect(result.error).toBeUndefined();
	});

	it('should return ref object with initial value', () => {
		const { result } = renderHook(() => useHookableRef(123));
		expect(result.current).toEqual({ current: 123 });
	});

	it('should persist same reference between re-renders', () => {
		const { result, rerender } = renderHook(() => useHookableRef(123));
		const firstResult = result.current;

		rerender();
		expect(result.current).toBe(firstResult);

		rerender();
		expect(result.current).toBe(firstResult);
	});

	it('should call getter and setter hook', () => {
		const getter = jest.fn((v: number) => v);
		const setter = jest.fn((v: number) => v);

		const { result } = renderHook(() => useHookableRef(123, setter, getter));

		expect(getter).not.toHaveBeenCalled();
		expect(setter).not.toHaveBeenCalled();

		expect(result.current.current).toBe(123);
		expect(getter).toHaveBeenCalledTimes(1);

		result.current.current = 321;
		expect(result.current.current).toBe(321);
		expect(getter).toHaveBeenCalledTimes(2);
		expect(setter).toHaveBeenCalledTimes(1);
	});

	it('should work properly without getter and setter', () => {
		const { result } = renderHook(() => useHookableRef(123));
		expect(result.current.current).toBe(123);

		result.current.current = 321;
		expect(result.current.current).toBe(321);
	});
});
