import { renderHook } from '@testing-library/react-hooks/server';
import { useMeasure } from '../../src/useMeasure';
import Mock = jest.Mock;

describe('useMeasure', () => {
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
});
