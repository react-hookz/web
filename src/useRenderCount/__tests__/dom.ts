import { renderHook } from '@testing-library/react-hooks';
import { useRenderCount } from '../useRenderCount';

describe('useRendersCount', () => {
  it('should be defined', () => {
    expect(useRenderCount).toBeDefined();
  });

  it('should return amount of renders performed', () => {
    const { result, rerender } = renderHook(useRenderCount);

    expect(result.current).toBe(1);
    rerender();
    expect(result.current).toBe(2);
  });
});
