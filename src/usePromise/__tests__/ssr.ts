import { renderHook } from '@testing-library/react-hooks/server';
import { usePromise } from '../..';

describe('usePromise', () => {
  it('should be defined', () => {
    expect(usePromise).toBeDefined();
  });

  it('should render', () => {
    const { result } = renderHook(() => usePromise());
    expect(result.error).toBeUndefined();
  });
});
