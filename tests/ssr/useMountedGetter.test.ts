import { renderHook } from '@testing-library/react-hooks/server';
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

  it('should return false after mount', () => {
    const { result } = renderHook(() => useMountedGetter());

    expect(result.current()).toBe(false);
  });
});
