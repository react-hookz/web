import { act, renderHook } from '@testing-library/react-hooks/dom';
import { useScreenOrientation } from '../..';

describe('useScreenOrientation', () => {
  // have to copy implementation as jsdom lacks of it
  type MutableMediaQueryList = {
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
    expect(useScreenOrientation).toBeDefined();
  });

  it('should render', () => {
    const { result } = renderHook(() => useScreenOrientation());
    expect(result.error).toBeUndefined();
  });

  it('should initialize without value if initializeWithValue option is set to false', () => {
    const { result } = renderHook(() => useScreenOrientation({ initializeWithValue: false }));
    expect(result.all[0]).toBeUndefined();
    expect(result.all[1]).toBe('landscape');
  });

  it('should return `portrait` in case media query matches and `landscape` otherwise', () => {
    const { result } = renderHook(() => useScreenOrientation());
    expect(result.current).toBe('landscape');

    const mql = matchMediaMock.mock.results[0].value as MutableMediaQueryList;
    mql.matches = true;

    act(() => {
      mql.addEventListener.mock.calls[0][1]();
    });

    expect(result.current).toBe('portrait');
  });
});
