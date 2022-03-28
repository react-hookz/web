import { act, renderHook } from '@testing-library/react-hooks/dom';
import { useRafEffect } from '../..';

describe('useRafEffect', () => {
  const raf = global.requestAnimationFrame;
  const caf = global.cancelAnimationFrame;

  beforeAll(() => {
    jest.useFakeTimers();

    global.requestAnimationFrame = (cb) => setTimeout(cb);
    global.cancelAnimationFrame = (cb) => clearTimeout(cb);
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  afterAll(() => {
    jest.useRealTimers();

    global.requestAnimationFrame = raf;
    global.cancelAnimationFrame = caf;
  });

  it('should be defined', () => {
    expect(useRafEffect).toBeDefined();
  });

  it('should render', () => {
    const { result } = renderHook(() => useRafEffect(() => {}, []));
    expect(result.error).toBeUndefined();
  });

  it('should not run unless animation frame', () => {
    const spy = jest.fn();
    const { rerender } = renderHook((dep) => useRafEffect(spy, [dep]), {
      initialProps: 1,
    });

    expect(spy).toHaveBeenCalledTimes(0);

    rerender(2);

    expect(spy).toHaveBeenCalledTimes(0);

    act(() => {
      jest.advanceTimersToNextTimer();
    });

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should cancel animation frame on unmount', () => {
    const spy = jest.fn();
    const { rerender, unmount } = renderHook((dep) => useRafEffect(spy, [dep]), {
      initialProps: 1,
    });

    expect(spy).toHaveBeenCalledTimes(0);

    rerender(2);

    expect(spy).toHaveBeenCalledTimes(0);

    unmount();

    act(() => {
      jest.advanceTimersToNextTimer();
    });

    expect(spy).toHaveBeenCalledTimes(0);
  });
});
