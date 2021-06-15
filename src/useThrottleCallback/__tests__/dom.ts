import { renderHook } from '@testing-library/react-hooks/dom';
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

  it('should return function same length and wrapped name', () => {
    let { result } = renderHook(() =>
      useThrottleCallback((_a: any, _b: any, _c: any) => {}, 200, [])
    );

    expect(result.current.length).toBe(3);
    expect(result.current.name).toBe(`anonymous__throttled__200`);

    function testFn(_a: any, _b: any, _c: any) {}

    result = renderHook(() => useThrottleCallback(testFn, 100, [])).result;

    expect(result.current.length).toBe(3);
    expect(result.current.name).toBe(`testFn__throttled__100`);
  });

  it('should return new callback if delay is changed', () => {
    const { result, rerender } = renderHook(
      ({ delay }) => useThrottleCallback(() => {}, delay, []),
      {
        initialProps: { delay: 200 },
      }
    );

    const cb1 = result.current;
    rerender({ delay: 123 });

    expect(cb1).not.toBe(result.current);
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
    expect(cb).toHaveBeenCalledWith(1, 'abc');
  });

  it('should ignore consequential calls occurred within delay, but execute last call after delay is passed', () => {
    const cb = jest.fn();
    const { result } = renderHook(() => useThrottleCallback(cb, 200, []));

    result.current();
    result.current();
    result.current();
    result.current();
    expect(cb).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(199);
    result.current();
    expect(cb).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(1);
    expect(cb).toHaveBeenCalledTimes(2);
    result.current();
    expect(cb).toHaveBeenCalledTimes(2);
    jest.advanceTimersByTime(200);
    expect(cb).toHaveBeenCalledTimes(3);
  });

  it('should drop trailing execution if `noTrailing is set to true`', () => {
    const cb = jest.fn();
    const { result } = renderHook(() => useThrottleCallback(cb, 200, [], true));

    result.current();
    result.current();
    result.current();
    result.current();
    expect(cb).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(199);
    result.current();
    expect(cb).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(1);
    expect(cb).toHaveBeenCalledTimes(1);
    result.current();
    result.current();
    result.current();
    expect(cb).toHaveBeenCalledTimes(2);
    jest.advanceTimersByTime(200);
    expect(cb).toHaveBeenCalledTimes(2);
  });
});
