import { renderHook } from '@testing-library/react-hooks/server';
import { useDocumentVisibility } from '../..';

describe('useDocumentVisibility', () => {
  it('should be defined', () => {
    expect(useDocumentVisibility()).toBeDefined();
  });

  it('should return default value on server-side rendering', () => {
    const { result } = renderHook(() => useDocumentVisibility(true));

    expect(result.current).toBe(true);
  });
});
