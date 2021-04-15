import { renderHook } from '@testing-library/react-hooks/dom';
import { useUnmountEffect } from '../../src/useUnmountEffect';

describe('useUnmountEffect', () => {
  it('should call effector only when component unmounted', () => {
    const spy = jest.fn();

    const { result, rerender, unmount } = renderHook(() => useUnmountEffect(spy));

    expect(result.current).toBe(undefined);
    expect(spy).toHaveBeenCalledTimes(0);

    rerender();
    rerender();
    rerender();
    rerender();

    expect(spy).toHaveBeenCalledTimes(0);

    unmount();

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
