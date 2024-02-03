import { act, renderHook } from '@testing-library/react-hooks/dom';
import { useCounter } from '../../index.js';

describe('useCounter', () => {
	it('should be defined', () => {
		expect(useCounter).toBeDefined();
	});

	it('should render', () => {
		const { result } = renderHook(() => useCounter());
		expect(result.error).toBeUndefined();
	});

	it('should have default initial value of 0', () => {
		const { result } = renderHook(() => useCounter());
		const counter = result.current[0];
		expect(counter).toEqual(0);
	});

	it('should accept custom initial value', () => {
		const { result } = renderHook(() => useCounter(5));
		const counter = result.current[0];
		expect(counter).toEqual(5);
	});

	it('should accept function returning a number as initial value', () => {
		const { result } = renderHook(() => useCounter(() => 5));
		const counter = result.current[0];
		expect(counter).toEqual(5);
	});

	it('should force initial value to be at least the given minimum value', () => {
		const { result } = renderHook(() => useCounter(0, 10, 5));
		const counter = result.current[0];
		expect(counter).toEqual(5);
	});

	it('should force initial value to be at most the given maximum value', () => {
		const { result } = renderHook(() => useCounter(10, 5));
		const counter = result.current[0];
		expect(counter).toEqual(5);
	});

	it('get returns the current counter value', () => {
		const { result } = renderHook(() => useCounter(0));
		const { get } = result.current[1];

		act(() => {
			expect(get()).toEqual(result.current[0]);
		});
	});

	it('set sets the counter to any value', () => {
		const { result } = renderHook(() => useCounter(0));
		const { set } = result.current[1];

		act(() => {
			set(2);
		});

		expect(result.current[0]).toEqual(2);

		act(() => {
			set((current: number) => current + 5);
		});

		expect(result.current[0]).toEqual(7);

		act(() => {
			set(12);
		});

		expect(result.current[0]).toEqual(12);
	});

	it('set respects min and max parameters', () => {
		const { result } = renderHook(() => useCounter(0, 10, 0));
		const { set } = result.current[1];

		act(() => {
			set(-2);
		});

		expect(result.current[0]).toEqual(0);

		act(() => {
			set(12);
		});

		expect(result.current[0]).toEqual(10);
	});

	it('inc increments the counter by 1 if no delta given', () => {
		const { result } = renderHook(() => useCounter(0));
		const { inc } = result.current[1];

		act(() => {
			inc();
		});

		const counter = result.current[0];
		expect(counter).toEqual(1);
	});

	it('inc increments the counter by the given delta', () => {
		const { result } = renderHook(() => useCounter(0));
		const { inc } = result.current[1];

		act(() => {
			inc(2);
		});

		expect(result.current[0]).toEqual(2);

		act(() => {
			inc((current) => current + 1);
		});

		expect(result.current[0]).toEqual(5);
	});

	it('inc respects min and max parameters', () => {
		const { result } = renderHook(() => useCounter(0, 5, 0));
		const { inc } = result.current[1];

		act(() => {
			inc(-2);
		});

		expect(result.current[0]).toEqual(0);

		act(() => {
			inc(12);
		});

		expect(result.current[0]).toEqual(5);
	});

	it('dec decrements the counter by 1 if no delta given', () => {
		const { result } = renderHook(() => useCounter(0));
		const { dec } = result.current[1];

		act(() => {
			dec();
		});

		const counter = result.current[0];
		expect(counter).toEqual(-1);
	});

	it('dec decrements the counter by the given delta', () => {
		const { result } = renderHook(() => useCounter(0));
		const { dec } = result.current[1];

		act(() => {
			dec(2);
		});

		expect(result.current[0]).toEqual(-2);

		act(() => {
			dec((current) => current + 1);
		});

		expect(result.current[0]).toEqual(-1);
	});

	it('dec respects min and max parameters', () => {
		const { result } = renderHook(() => useCounter(0, 5, 0));
		const { dec } = result.current[1];

		act(() => {
			dec(2);
		});

		expect(result.current[0]).toEqual(0);

		act(() => {
			dec(-12);
		});

		expect(result.current[0]).toEqual(5);
	});

	it('reset without arguments sets the counter to its initial value', () => {
		const { result } = renderHook(() => useCounter(0));
		const { reset, inc } = result.current[1];

		act(() => {
			inc();
			reset();
		});

		expect(result.current[0]).toEqual(0);
	});

	it('reset with argument sets the counter to its new initial value', () => {
		const { result } = renderHook(() => useCounter(0));
		const { reset, inc } = result.current[1];

		act(() => {
			inc();
			reset(5);
		});

		expect(result.current[0]).toEqual(5);

		act(() => {
			inc();
			reset();
		});

		expect(result.current[0]).toEqual(0);
	});

	it('reset respects min and max parameters', () => {
		const { result } = renderHook(() => useCounter(0, 10, 0));
		const { reset } = result.current[1];

		act(() => {
			reset(25);
		});

		expect(result.current[0]).toEqual(10);

		act(() => {
			reset(-10);
		});

		expect(result.current[0]).toEqual(0);
	});
});
