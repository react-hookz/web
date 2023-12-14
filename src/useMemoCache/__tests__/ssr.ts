import { renderHook } from '@testing-library/react-hooks/server';
import { useMemoCache } from '../..';

describe('useMemoCache', () => {
  it('should be defined', () => {
    expect(useMemoCache).toBeDefined();
  });

  it('should render', () => {
    const { result } = renderHook(() => useMemoCache(() => 10, []));
    expect(result.error).toBeUndefined();
  });
});
