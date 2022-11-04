import { renderHook } from '@testing-library/react-hooks/server';
import { useDeepCompareMemo } from '../..';

describe('useDeepCompareMemo', () => {
  it('should be defined', () => {
    expect(useDeepCompareMemo).toBeDefined();
  });

  it('should render', () => {
    const { result } = renderHook(() => useDeepCompareMemo(() => {}, []));
    expect(result.error).toBeUndefined();
  });
});
