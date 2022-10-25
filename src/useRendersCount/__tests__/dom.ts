import { renderHook } from '@testing-library/react-hooks';
import { useRendersCount } from '../useRendersCount';

describe('useRendersCount', () => {
  it('should be defined', () => {
    expect(useRendersCount).toBeDefined();
  });

  it('should return number', () => {
    expect(renderHook(() => useRendersCount()).result.current).toEqual(expect.any(Number));
  });

  it('should return actual number of renders', () => {
    const hook = renderHook(() => useRendersCount());

    expect(hook.result.current).toBe(1);
    hook.rerender();
    expect(hook.result.current).toBe(2);
    hook.rerender();
    expect(hook.result.current).toBe(3);
  });
});
