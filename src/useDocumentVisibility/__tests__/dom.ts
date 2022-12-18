import { renderHook } from '@testing-library/react-hooks/dom';
import { useDocumentVisibility } from '../..';

describe('useDocumentVisibility', () => {
  it('should be defined', () => {
    expect(useDocumentVisibility).toBeDefined();
  });

  it('should return true when window is visible', () => {
    const { result } = renderHook(() => useDocumentVisibility());

    expect(result.current).toBe(true);
  });

  it('should return false when window is hidden', () => {
    Object.defineProperty(document, 'visibilityState', {
      configurable: true,
      value: 'hidden',
    });

    const { result } = renderHook(() => useDocumentVisibility());

    expect(result.current).toBe(false);
  });
});
