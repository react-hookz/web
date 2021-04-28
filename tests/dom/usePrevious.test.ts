import { renderHook } from '@testing-library/react-hooks/dom';
import { usePrevious } from '../../src';

describe('usePrevious', () => {
  it('should be defined', () => {
    expect(usePrevious).toBeDefined();
  });

  it('should render', () => {
    renderHook(() => usePrevious());
  });

  it('should return undefined on first render', () => {
    const { result } = renderHook(() => usePrevious());

    expect(result.current).toBeUndefined();
  });

  it('should return previously passed value on rerender', () => {
    const { result, rerender } = renderHook(({ state }) => usePrevious(state), {
      initialProps: { state: 0 },
    });

    expect(result.current).toBeUndefined();
    rerender({ state: 1 });
    expect(result.current).toBe(0);
    rerender({ state: 5 });
    expect(result.current).toBe(1);
    rerender({ state: 10 });
    expect(result.current).toBe(5);
    rerender({ state: 25 });
  });
});
