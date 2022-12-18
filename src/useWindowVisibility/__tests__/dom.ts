import { renderHook } from '@testing-library/react-hooks/dom';
import { useWindowVisibility } from '../..';

describe('useWindowVisibility', () => {
  it('should be defined', () => {
    expect(useWindowVisibility).toBeDefined();
  });

  it('should return true when window is visible', () => {
    const { result } = renderHook(() => useWindowVisibility());

    expect(result.current).toBe(true);
  });

  it('should return false when window is hidden', () => {
    Object.defineProperty(document, 'visibilityState', {
      configurable: true,
      value: 'hidden',
    });

    const { result } = renderHook(() => useWindowVisibility());

    expect(result.current).toBe(false);
  });
});
