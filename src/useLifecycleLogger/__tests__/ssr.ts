import { renderHook } from '@testing-library/react-hooks/server';
import { useLifecycleLogger } from '../useLifecycleLogger';

describe('useLifecycleLogger', () => {
  it('should be defined', () => {
    expect(useLifecycleLogger).toBeDefined();
  });
  it('should render', () => {
    const { result } = renderHook(() => useLifecycleLogger('TestComponent', []));
    expect(result.error).toBeUndefined();
  });
});
