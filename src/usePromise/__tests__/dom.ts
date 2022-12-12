import { renderHook } from '@testing-library/react-hooks/dom';
import { usePromise } from '../..';

jest.useFakeTimers();

describe('usePromise', () => {
  const resolves = new Promise<number>((resolve, reject) => {
    resolve(1);
    reject(Error);
  });

  const rejects = new Promise<number>((resolve, reject) => {
    // eslint-disable-next-line no-constant-condition
    if (1 < 0) {
      resolve(1);
    }
    reject(Error);
  });

  it('should be defined', () => {
    expect(usePromise).toBeDefined();
  });

  it('should render', () => {
    const { result } = renderHook(() => usePromise());
    expect(result.error).toBeUndefined();
  });

  it('should return resolved value', async () => {
    const { result } = renderHook(() => usePromise());

    await expect(result.current(resolves)).resolves.toBe(1);
  });

  it('should return rejection value', async () => {
    const { result } = renderHook(() => usePromise());

    expect.assertions(1);
    await expect(result.current(rejects)).rejects.toBe(Error);
  });

  // it('should not return if unmounted', async () => {
  //   const { result, unmount } = renderHook(() => usePromise());
  //   unmount();

  //   expect(result.error).toBeUndefined();
  //   await expect(result.current(resolves)).resolves.toBeUndefined();
  // });
});

jest.clearAllTimers();
