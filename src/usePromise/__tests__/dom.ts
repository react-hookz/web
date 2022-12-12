import { renderHook } from '@testing-library/react-hooks/dom';
import { usePromise } from '../..';

describe('usePromise', () => {
  const promise = new Promise<number>((resolve) => {
    resolve(1);
  });

  it('should be defined', () => {
    expect(usePromise).toBeDefined();
  });

  it('should render', () => {
    const { result } = renderHook(() => usePromise());
    expect(result.error).toBeUndefined();
  });

  it('should not return if unmounted', async () => {
    const { result, unmount } = renderHook(() => usePromise());
    unmount();
    const res = await result.current(promise);

    expect(result.error).toBeUndefined();
    expect(res).toBeUndefined();
  });
});
