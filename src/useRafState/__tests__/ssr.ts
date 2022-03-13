import { renderHook } from '@testing-library/react-hooks/server';
import { useRafState } from '../..';

describe('useRafState', () => {
  it('should be defined', () => {
    expect(useRafState).toBeDefined();
  });

  it('should render', () => {
    const { result } = renderHook(() => useRafState());
    expect(result.error).toBeUndefined();
  });
});
