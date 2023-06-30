import { renderHook } from '@testing-library/react-hooks/dom';
import { useIntervalEffect } from '../..';
import advanceTimersByTime = jest.advanceTimersByTime;

describe('useIntervalEffect', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  beforeEach(() => {
    jest.clearAllTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('should be defined', () => {
    expect(useIntervalEffect).toBeDefined();
  });

  it('should render', () => {
    const { result } = renderHook(() => {
      useIntervalEffect(() => {}, 123);
    });
    expect(result.error).toBeUndefined();
  });

  it('should set interval and cancel it on unmount', () => {
    const spy = jest.fn();
    const { unmount } = renderHook(() => {
      useIntervalEffect(spy, 100);
    });

    jest.advanceTimersByTime(99);
    expect(spy).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1);
    expect(spy).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(300);
    expect(spy).toHaveBeenCalledTimes(4);

    unmount();
    expect(spy).toHaveBeenCalledTimes(4);
  });

  it('should reset interval in delay change', () => {
    const spy = jest.fn();
    const { rerender } = renderHook(
      ({ delay }) => {
        useIntervalEffect(spy, delay);
      },
      {
        initialProps: { delay: 100 },
      }
    );

    advanceTimersByTime(99);
    expect(spy).not.toHaveBeenCalled();

    rerender({ delay: 50 });
    advanceTimersByTime(49);
    expect(spy).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should cancel interval if delay is undefined', () => {
    const spy = jest.fn();
    const { rerender } = renderHook<{ delay: number | undefined }, void>(
      ({ delay }) => {
        useIntervalEffect(spy, delay);
      },
      {
        initialProps: { delay: 100 },
      }
    );

    advanceTimersByTime(99);
    expect(spy).not.toHaveBeenCalled();

    rerender({ delay: undefined });
    advanceTimersByTime(2000);
    expect(spy).not.toHaveBeenCalled();
  });
});
