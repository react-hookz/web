import { renderHook } from '@testing-library/react-hooks/server';
import { useLogger } from '../useLogger';

describe('useLogger', () => {
  it('should be defined', () => {
    expect(useLogger).toBeDefined();
  });
  it('should render', () => {
    const { result } = renderHook(() => useLogger('TestComponent'));
    expect(result.error).toBeUndefined();
  });
});
