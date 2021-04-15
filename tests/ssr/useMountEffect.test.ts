import { renderHook } from '@testing-library/react-hooks/server';
import { useMountEffect } from '../../src/useMountEffect';

describe('useMountEffect', () => {
  it('should call effector only on first render', () => {
    const spy = jest.fn();

    const { result } = renderHook(() => useMountEffect(spy));

    expect(result.current).toBe(undefined);
    expect(spy).toHaveBeenCalledTimes(0);
  });
});
