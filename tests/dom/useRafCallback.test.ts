import { renderHook } from '@testing-library/react-hooks/dom';
import { useRafCallback } from '../../src';

describe('useRafCallback', () => {
  const raf = global.requestAnimationFrame;
  const caf = global.cancelAnimationFrame;

  beforeAll(() => {
    jest.useFakeTimers();

    global.requestAnimationFrame = (cb) => setTimeout(cb);
    global.cancelAnimationFrame = (cb) => clearTimeout(cb);
  });

  afterAll(() => {
    global.requestAnimationFrame = raf;
    global.cancelAnimationFrame = caf;

    jest.useRealTimers();
  });

  it('should be defined', () => {
    expect(useRafCallback).toBeDefined();
  });

  it('should render', () => {
    renderHook(() => useRafCallback(() => {}));
  });

  it('should return array of functions', () => {
    const { result } = renderHook(() => useRafCallback(() => {}));

    expect(result.current).toBeInstanceOf(Array);
    expect(result.current[0]).toBeInstanceOf(Function);
    expect(result.current[1]).toBeInstanceOf(Function);
  });

  it('should invoke passed function only on next raf', () => {
    const spy = jest.fn();
    const { result } = renderHook(() => useRafCallback(spy));

    result.current[0]();

    expect(spy).not.toHaveBeenCalled();

    jest.advanceTimersToNextTimer();

    expect(spy).toHaveBeenCalled();
  });

  it('should auto-cancel scheduled invocation on consequential calls', () => {
    const spy = jest.fn();
    const { result } = renderHook(() => useRafCallback(spy));

    result.current[0]();
    result.current[0]();
    result.current[0]();
    result.current[0]();

    expect(spy).not.toHaveBeenCalled();

    jest.advanceTimersToNextTimer(5);

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should cancel scheduled invocation on second function call', () => {
    const spy = jest.fn();
    const { result } = renderHook(() => useRafCallback(spy));

    result.current[0]();

    result.current[1]();

    jest.advanceTimersToNextTimer(5);

    expect(spy).not.toHaveBeenCalled();
  });

  it('should auto-cancel scheduled invocation on component unmount', () => {
    const spy = jest.fn();
    const { result, unmount } = renderHook(() => useRafCallback(spy));

    result.current[0]();

    unmount();

    jest.advanceTimersToNextTimer(5);

    expect(spy).not.toHaveBeenCalled();
  });
});
