import { renderHook } from '@testing-library/react-hooks/dom';
import { useResizeObserver } from '../../src';
import Mock = jest.Mock;

describe('useResizeObserver', () => {
  const observeSpy = jest.fn();
  const unobserveSpy = jest.fn();
  const disconnectSpy = jest.fn();

  let ResizeObserverSpy: Mock<ResizeObserver>;
  const initialRO = global.ResizeObserver;

  beforeAll(() => {
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

  afterAll(() => {
    global.ResizeObserver = initialRO;
  });

  it('should be defined', () => {
    expect(useResizeObserver).toBeDefined();
  });

  it('should render', () => {
    const { result } = renderHook(() => useResizeObserver(null, () => {}));

    expect(result.error).toBeUndefined();
  });

  it('should create ResizeObserver instance only on first hook render', () => {
    expect(ResizeObserverSpy).toHaveBeenCalledTimes(1);

    renderHook(() => useResizeObserver(null, () => {}));
    renderHook(() => useResizeObserver(null, () => {}));

    expect(ResizeObserverSpy).toHaveBeenCalledTimes(1);
  });
});
