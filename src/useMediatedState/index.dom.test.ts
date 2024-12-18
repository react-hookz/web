import {act, renderHook} from '@testing-library/react-hooks/dom';
import {describe, expect, it, vi} from 'vitest';
import {useMediatedState} from '../index.js';

describe('useMediatedState', () => {
	it('should be defined', () => {
		expect(useMediatedState).toBeDefined();
	});

	it('should render', () => {
		const {result} = renderHook(() => useMediatedState());
		expect(result.error).toBeUndefined();
	});

	it('should act like useState if mediator not passed', () => {
		const {result} = renderHook(() => useMediatedState(123));

		expect(result.current[0]).toBe(123);
		act(() => {
			result.current[1](321);
		});
		expect(result.current[0]).toBe(321);
	});

	it('should pass received sate through mediator', () => {
		const spy = vi.fn((value: string) => Number.parseInt(value, 10));
		const {result} = renderHook(() => useMediatedState(123, spy));

		expect(result.current[0]).toBe(123);
		act(() => {
			result.current[1]('321');
		});
		expect(result.current[0]).toBe(321);
		expect(spy).toHaveBeenCalledTimes(2);
		expect(spy).toHaveBeenCalledWith('321');
	});

	it('should pass initial sate through mediator', () => {
		const {result} = renderHook(() =>
			useMediatedState('a123', (value: string) => value.replaceAll(/[^a-z]+/gi, '')));

		expect(result.current[0]).toBe('a');
	});

	it('should return same setState method each render even if callback is changed', () => {
		const {result, rerender} = renderHook(() =>
			useMediatedState(123, (value: string) => Number.parseInt(value, 10)));

		const f1 = result.current[1];
		rerender();
		const f2 = result.current[1];
		rerender();
		const f3 = result.current[1];

		expect(f1).toBe(f2);
		expect(f3).toBe(f2);
	});
});
