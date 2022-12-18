import { renderHook } from '@testing-library/react-hooks/server';
import { useWindowVisibility } from '../..';

describe('useWindowVisibility', () => {
  it('should be defined', () => {
    expect(useWindowVisibility()).toBeDefined();
  });

  it('should return default value on server-side rendering', () => {
    const { result } = renderHook(() => useWindowVisibility(true));

    expect(result.current).toBe(true);
  });
});
