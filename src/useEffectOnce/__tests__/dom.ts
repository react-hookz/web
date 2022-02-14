import { renderHook } from '@testing-library/react-hooks/dom';
import { useEffectOnce } from '../useEffectOnce';

describe('useEffectOnce', () => {
  it('should call effector once on every re-renders', () => {
    const spy = jest.fn();

    const { rerender, unmount } = renderHook(() => useEffectOnce(spy));

    expect(spy).toHaveBeenCalledTimes(1);

    rerender();
    expect(spy).toHaveBeenCalledTimes(1);

    unmount();
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
