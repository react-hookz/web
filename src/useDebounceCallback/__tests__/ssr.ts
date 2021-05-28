import { renderHook } from '@testing-library/react-hooks/server';
import { useDebounceCallback } from '../..';

describe('useDebounceCallback', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('should be defined', () => {
    expect(useDebounceCallback).toBeDefined();
  });

  it('should render', () => {
    const { result } = renderHook(() => {
      useDebounceCallback(() => {}, 200, []);
    });
    expect(result.error).toBeUndefined();
  });

  it('should run given callback only after specified delay since last call', () => {
    const cb = jest.fn();
    const { result } = renderHook(() => useDebounceCallback(cb, 200, []));

    result.current();
    expect(cb).not.toHaveBeenCalled();

    jest.advanceTimersByTime(100);
    result.current();

    jest.advanceTimersByTime(199);
    expect(cb).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1);
    expect(cb).toHaveBeenCalledTimes(1);
  });

  it('should pass parameters to callback', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const cb = jest.fn((_a: number, _c: string) => {});
    const { result } = renderHook(() => useDebounceCallback(cb, 200, []));

    result.current(1, 'abc');
    jest.advanceTimersByTime(200);
    expect(cb).toHaveBeenCalledWith(1, 'abc');
  });
});
