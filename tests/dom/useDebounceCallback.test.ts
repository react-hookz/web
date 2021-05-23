import { renderHook } from '@testing-library/react-hooks/dom';
import { useDebounceCallback } from '../../src';

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

  it('should return new callback if delay is changed', () => {
    const { result, rerender } = renderHook(
      ({ delay }) => useDebounceCallback(() => {}, delay, []),
      {
        initialProps: { delay: 200 },
      }
    );

    const cb1 = result.current;
    rerender({ delay: 123 });

    expect(cb1).not.toBe(result.current);
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

  it('should cancel previously scheduled call even if parameters changed', () => {
    const cb1 = jest.fn(() => {});
    const cb2 = jest.fn(() => {});

    const { result, rerender } = renderHook(
      ({ i }) => useDebounceCallback(() => (i === 1 ? cb1() : cb2()), 200, [i]),
      { initialProps: { i: 1 } }
    );

    result.current();
    jest.advanceTimersByTime(100);

    rerender({ i: 2 });
    result.current();
    jest.advanceTimersByTime(200);

    expect(cb1).not.toHaveBeenCalled();
    expect(cb2).toHaveBeenCalledTimes(1);
  });
});
