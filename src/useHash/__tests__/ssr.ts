import { renderHook } from '@testing-library/react-hooks/server';

import { useHash } from '../useHash';

describe('useHash', () => {
  it('should be defined', () => {
    expect(useHash).toBeDefined();
  });

  it('should render', () => {
    const { result } = renderHook(() => useHash());
    expect(result.error).toBeUndefined();
  });

  it('should return empty string', () => {
    const { result } = renderHook(() => useHash());
    const [hash] = result.current;

    expect(hash).toBe('');
  });
});
