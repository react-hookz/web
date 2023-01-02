import { act, renderHook } from '@testing-library/react-hooks/dom';
import { useDocumentVisibility } from '../..';

describe('useDocumentVisibility', () => {
  it('should be defined', () => {
    expect(useDocumentVisibility).toBeDefined();
  });

  it('should return current visibility state if initializing with value', () => {
    Object.defineProperty(document, 'visibilityState', {
      configurable: true,
      value: 'hidden',
    });
    expect(renderHook(() => useDocumentVisibility()).result.current).toBe(false);

    Object.defineProperty(document, 'visibilityState', {
      configurable: true,
      value: 'visible',
    });
    expect(renderHook(() => useDocumentVisibility(true)).result.current).toBe(true);
  });

  it('should return undefined on first render and set state on effects stage if not initializing with value', () => {
    Object.defineProperty(document, 'visibilityState', {
      configurable: true,
      value: 'hidden',
    });

    {
      const { result } = renderHook(() => useDocumentVisibility(false));

      expect(result.current).toBe(false);
      expect(result.all[0]).toBe(undefined);
    }

    Object.defineProperty(document, 'visibilityState', {
      configurable: true,
      value: 'visible',
    });

    {
      const { result } = renderHook(() => useDocumentVisibility(false));

      expect(result.current).toBe(true);
      expect(result.all[0]).toBe(undefined);
    }
  });

  it('should update state on visibilitychange event', () => {
    Object.defineProperty(document, 'visibilityState', {
      configurable: true,
      value: 'hidden',
    });

    const { result } = renderHook(() => useDocumentVisibility());

    expect(result.current).toBe(false);

    Object.defineProperty(document, 'visibilityState', {
      configurable: true,
      value: 'visible',
    });

    act(() => {
      document.dispatchEvent(new Event('visibilitychange'));
    });

    expect(result.current).toBe(true);
  });
});
