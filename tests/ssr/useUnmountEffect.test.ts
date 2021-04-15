import { renderHook } from '@testing-library/react-hooks/server';
import { useUnmountEffect } from '../../src/useUnmountEffect';

describe('useUnmountEffect', () => {
  it('should call effector only when component unmounted', () => {
    const spy = jest.fn();

    const { result } = renderHook(() => useUnmountEffect(spy));

    expect(result.current).toBe(undefined);
    expect(spy).toHaveBeenCalledTimes(0);
  });
});
