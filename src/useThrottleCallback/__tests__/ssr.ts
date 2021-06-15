import { renderHook } from '@testing-library/react-hooks/server';
import { useThrottleCallback } from '../..';

describe('useThrottleCallback', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('should be defined', () => {
    expect(useThrottleCallback).toBeDefined();
  });

  it('should render', () => {
    const { result } = renderHook(() => {
      useThrottleCallback(() => {}, 200, []);
    });
    expect(result.error).toBeUndefined();
  });

  it('should invoke given callback immediately', () => {
    const cb = jest.fn();
    const { result } = renderHook(() => useThrottleCallback(cb, 200, []));

    result.current();
    expect(cb).toHaveBeenCalledTimes(1);
  });

  it('should pass parameters to callback', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const cb = jest.fn((_a: number, _c: string) => {});
    const { result } = renderHook(() => useThrottleCallback(cb, 200, []));

    result.current(1, 'abc');
    jest.advanceTimersByTime(200);
    expect(cb).toHaveBeenCalledWith(1, 'abc');
  });
});
