import { act, renderHook } from '@testing-library/react-hooks/dom';
import { useEffect } from 'react';
import { useMeasure } from '../..';
import Mock = jest.Mock;

describe('useMeasure', () => {
  const raf = global.requestAnimationFrame;
  const caf = global.cancelAnimationFrame;
  const observeSpy = jest.fn();
  const unobserveSpy = jest.fn();
  const disconnectSpy = jest.fn();

  let ResizeObserverSpy: Mock<ResizeObserver>;
  const initialRO = global.ResizeObserver;

  beforeAll(() => {
    jest.useFakeTimers();

    global.requestAnimationFrame = (cb) => setTimeout(cb, 1);
    global.cancelAnimationFrame = (cb) => clearTimeout(cb);

    ResizeObserverSpy = jest.fn(() => ({
      observe: observeSpy,
      unobserve: unobserveSpy,
      disconnect: disconnectSpy,
    }));

    global.ResizeObserver = ResizeObserverSpy;
  });

  beforeEach(() => {
    observeSpy.mockClear();
    unobserveSpy.mockClear();
    disconnectSpy.mockClear();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  afterAll(() => {
    jest.useRealTimers();

    global.ResizeObserver = initialRO;

    global.requestAnimationFrame = raf;
    global.cancelAnimationFrame = caf;
  });

  it('should be defined', () => {
    expect(useMeasure).toBeDefined();
  });

  it('should render', () => {
    const { result } = renderHook(() => useMeasure());

    expect(result.error).toBeUndefined();
  });

  it('should return undefined sate on initial render', () => {
    const { result } = renderHook(() => useMeasure());

    expect(result.current[0]).toBeUndefined();
  });

  it('should return reference as a second array element', () => {
    const { result } = renderHook(() => useMeasure());

    expect(result.current[1]).toStrictEqual({ current: null });
  });

  it('should only set state within animation frame', () => {
    const div = document.createElement('div');
    const { result } = renderHook(() => {
      const res = useMeasure<HTMLDivElement>();

      useEffect(() => {
        res[1].current = div;
      });

      return res;
    });

    const entry = {
      target: div,
      contentRect: {},
      borderBoxSize: {},
      contentBoxSize: {},
    } as unknown as ResizeObserverEntry;

    ResizeObserverSpy.mock.calls[0][0]([entry]);
    expect(result.current[0]).toBeUndefined();

    act(() => {
      jest.advanceTimersByTime(1);
    });

    expect(result.current[1]).toStrictEqual({ current: div });
    expect(result.current[0]).toBe(entry.contentRect);
  });
});
