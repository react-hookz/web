import { renderHook } from '@testing-library/react-hooks/dom';
import { useMountedGetter } from '../../src';

describe('useMountedGetter', () => {
  it('should be defined', () => {
    expect(useMountedGetter).toBeDefined();
  });

  it('should return a function', () => {
    const { result } = renderHook(() => useMountedGetter());

    expect(result.current).toBeInstanceOf(Function);
  });

  it('should return false within first render', () => {
    const { result } = renderHook(() => {
      const isMounted = useMountedGetter();
      return isMounted();
    });

    expect(result.current).toBe(false);
  });

  it('should return true after mount', () => {
    const { result } = renderHook(() => useMountedGetter());

    expect(result.current()).toBe(true);
  });

  it('should return same function on each render', () => {
    const { result, rerender } = renderHook(() => useMountedGetter());

    const fn1 = result.current;
    rerender();
    const fn2 = result.current;
    rerender();
    const fn3 = result.current;

    expect(fn1).toBe(fn2);
    expect(fn2).toBe(fn3);
  });

  it('should return false after component unmount', () => {
    const { result, unmount } = renderHook(() => useMountedGetter());

    expect(result.current()).toBe(true);

    unmount();

    expect(result.current()).toBe(false);
  });
});
