import { act, renderHook } from '@testing-library/react-hooks/dom';
import { useMediaQuery } from '../..';

describe('useMediaQuery', () => {
  type IMutableMediaQueryList = {
    matches: boolean;
    media: string;
    onchange: null;
    addListener: jest.Mock; // Deprecated
    removeListener: jest.Mock; // Deprecated
    addEventListener: jest.Mock;
    removeEventListener: jest.Mock;
    dispatchEvent: jest.Mock;
  };

  const matchMediaMock = jest.fn();
  let initialMatchMedia: typeof window.matchMedia;

  beforeAll(() => {
    initialMatchMedia = window.matchMedia;
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: matchMediaMock,
    });
  });

  afterAll(() => {
    window.matchMedia = initialMatchMedia;
  });

  beforeEach(() => {
    matchMediaMock.mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));
  });

  afterEach(() => {
    matchMediaMock.mockClear();
  });

  it('should be defined', () => {
    expect(useMediaQuery).toBeDefined();
  });

  it('should render', () => {
    const { result } = renderHook(() => useMediaQuery('max-width : 768px'));
    expect(result.error).toBeUndefined();
  });

  it('should return undefined on first render', () => {
    const { result } = renderHook(() => useMediaQuery('max-width : 768px'));
    expect(result.all[0]).toBeUndefined();
  });

  it('should return match state', () => {
    const { result } = renderHook(() => useMediaQuery('max-width : 768px'));
    expect(result.current).toBe(false);
  });

  it('should update state if query state changed', () => {
    const { result } = renderHook(() => useMediaQuery('max-width : 768px'));
    expect(result.current).toBe(false);

    const mql = matchMediaMock.mock.results[0].value as IMutableMediaQueryList;
    mql.matches = true;

    act(() => {
      mql.addEventListener.mock.calls[0][1]();
    });
    expect(result.current).toBe(true);
  });

  it('several hooks tracking same rule must listen same mql', () => {
    const { result: result1 } = renderHook(() => useMediaQuery('max-width : 768px'));
    const { result: result2 } = renderHook(() => useMediaQuery('max-width : 768px'));
    const { result: result3 } = renderHook(() => useMediaQuery('max-width : 768px'));
    expect(result1.current).toBe(false);
    expect(result2.current).toBe(false);
    expect(result3.current).toBe(false);

    const mql = matchMediaMock.mock.results[0].value as IMutableMediaQueryList;
    mql.matches = true;

    act(() => {
      mql.addEventListener.mock.calls[0][1]();
    });
    expect(result1.current).toBe(true);
    expect(result2.current).toBe(true);
    expect(result3.current).toBe(true);
  });

  it('should unsubscribe from previous mql when query changed', () => {
    const { result: result1 } = renderHook(() => useMediaQuery('max-width : 768px'));
    const { result: result2 } = renderHook(() => useMediaQuery('max-width : 768px'));
    const { result: result3, rerender: rerender3 } = renderHook(
      ({ query }) => useMediaQuery(query),
      {
        initialProps: { query: 'max-width : 768px' },
      }
    );
    expect(result1.current).toBe(false);
    expect(result2.current).toBe(false);
    expect(result3.current).toBe(false);

    rerender3({ query: 'max-width : 760px' });

    expect(matchMediaMock).toBeCalledTimes(2);

    const mql = matchMediaMock.mock.results[0].value as IMutableMediaQueryList;
    mql.matches = true;

    act(() => {
      mql.addEventListener.mock.calls[0][1]();
    });
    expect(result1.current).toBe(true);
    expect(result2.current).toBe(true);
    expect(result3.current).toBe(false);
  });

  it('should unsubscribe from previous mql when query changed', () => {
    const { unmount: unmount1 } = renderHook(() => useMediaQuery('max-width : 768px'));
    const { unmount: unmount2 } = renderHook(() => useMediaQuery('max-width : 768px'));
    const { unmount: unmount3 } = renderHook(() => useMediaQuery('max-width : 768px'));

    const mql = matchMediaMock.mock.results[0].value as IMutableMediaQueryList;
    expect(mql.removeEventListener).not.toHaveBeenCalled();
    unmount3();
    expect(mql.removeEventListener).not.toHaveBeenCalled();
    unmount2();
    expect(mql.removeEventListener).not.toHaveBeenCalled();
    unmount1();
    expect(mql.removeEventListener).toHaveBeenCalledTimes(1);
  });

  it('should use addListener and removeListener in case of absence of modern methods', () => {
    matchMediaMock.mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));

    const { unmount } = renderHook(() => useMediaQuery('max-width : 1024px'));

    const mql = matchMediaMock.mock.results[0].value as IMutableMediaQueryList;
    expect(mql.addListener).toHaveBeenCalledTimes(1);

    unmount();
    expect(mql.removeListener).toHaveBeenCalledTimes(1);
  });
});
