import { renderHook } from '@testing-library/react-hooks/server';
import { useMediaQuery } from '../..';

describe('useMediaQuery', () => {
  it('should be defined', () => {
    expect(useMediaQuery).toBeDefined();
  });

  it('should render', () => {
    const { result } = renderHook(() => useMediaQuery('max-width : 768px'));
    expect(result.error).toBeUndefined();
  });

  it('should return undefined on first render', () => {
    const { result } = renderHook(() => useMediaQuery('max-width : 768px'));
    expect(result.current).toBeUndefined();
  });
});
