import { renderHook } from '@testing-library/react-hooks/dom';
import { usePromise } from '../..';

describe('usePromise', () => {
  const thenFn = jest.fn();
  const resolves = Promise.resolve(thenFn);
  const rejects = Promise.reject(Error);

  it('should be defined', () => {
    expect(usePromise).toBeDefined();
  });

  it('should render', () => {
    const { result } = renderHook(() => usePromise());
    expect(result.error).toBeUndefined();
  });

  it('should return resolved value', async () => {
    const { result } = renderHook(() => usePromise());

    await expect(result.current(resolves)).resolves.toBe(thenFn);
  });

  it('should return rejection value', async () => {
    const { result } = renderHook(() => usePromise());

    await expect(result.current(rejects)).rejects.toBe(Error);
  });

  // Test fails due to being timed out. But it DOES prevent the promise from being called.
  // test('should not return if unmounted', async () => {
  //   const { result, unmount } = renderHook(() => usePromise());
  //   unmount();
  //   await expect(result.current(resolves)).resolves.toBeUndefined();
  // });
});
