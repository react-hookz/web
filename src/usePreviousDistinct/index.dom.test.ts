import { renderHook } from '@testing-library/react-hooks/dom';
import { usePreviousDistinct } from '../../index.js';
import { type Predicate } from '../../types.js';
import { isStrictEqual } from '../../util/const.js';

describe('usePreviousDistinct', () => {
	it('should be defined', () => {
		expect(usePreviousDistinct).toBeDefined();
	});

	it('should render', () => {
		const { result } = renderHook(() => usePreviousDistinct(0));
		expect(result.error).toBeUndefined();
	});

	it('should return undefined on first render', () => {
		const { result } = renderHook(() => usePreviousDistinct(0));
		expect(result.current).toBeUndefined();
	});

	it('should return undefined on first render with compare function passed', () => {
		const { result } = renderHook(() => usePreviousDistinct(0, isStrictEqual));
		expect(result.current).toBeUndefined();
	});

	it('should not invoke predicate on first render', () => {
		const mockedCompare = jest.fn() as Predicate;

		const { result } = renderHook(() => usePreviousDistinct(0, mockedCompare));
		expect(result.current).toBeUndefined();
		expect(mockedCompare).not.toHaveBeenCalled();
	});

	it('should not return passed value after unrelated rerender', () => {
		const { result, rerender } = renderHook(({ state }) => usePreviousDistinct(state), {
			initialProps: { state: 0 },
		});

		expect(result.current).toBeUndefined();
		rerender();
		expect(result.current).not.toBe(0);
		expect(result.current).toBeUndefined();
	});

	it('should return passed value after related rerender', () => {
		const { result, rerender } = renderHook(({ state }) => usePreviousDistinct(state), {
			initialProps: { state: 0 },
		});

		expect(result.current).toBeUndefined(); // Asserting against initial render.
		rerender({ state: 1 });
		expect(result.current).toBe(0); // Asserting against first re-render. value has now changed
	});

	it('should update previous value only after render with different value', () => {
		const { result, rerender } = renderHook(({ state }) => usePreviousDistinct(state), {
			initialProps: { state: 0 },
		});

		expect(result.current).toBeUndefined();
		rerender({ state: 1 }); // Update
		expect(result.current).toBe(0);
		rerender({ state: 5 }); // Update
		expect(result.current).toBe(1);
		rerender({ state: 5 }); // No update
		expect(result.current).toBe(1);
	});

	it('should not update to value if it never changes, depsite rerenders', () => {
		const value = 'yo';
		const { result, rerender } = renderHook(({ state }) => usePreviousDistinct(state), {
			initialProps: { state: value },
		});

		expect(result.current).toBeUndefined();
		rerender({ state: value });
		expect(result.current).toBeUndefined();
		rerender({ state: value });
		expect(result.current).toBeUndefined();
		rerender({ state: value });
	});

	it('should update even when going between defined and undefined values', () => {
		const { result, rerender } = renderHook<{ state: number | undefined }, number | undefined>(
			({ state }: { state: number | undefined }) => usePreviousDistinct(state),
			{
				initialProps: { state: 0 },
			}
		);

		expect(result.current).toBeUndefined();
		rerender({ state: 1 });
		expect(result.current).toBe(0);
		rerender({ state: undefined });
		expect(result.current).toBe(1);
		rerender({ state: 10 });
		expect(result.current).toBeUndefined();
	});
});
