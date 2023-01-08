import { renderHook } from '@testing-library/react-hooks/server';
import { useRenderCount } from '../..';

describe('useRendersCount', () => {
  it('should be defined', () => {
    expect(useRenderCount).toBeDefined();
  });

  it('should return proper amount of renders performed', () => {
    const { result } = renderHook(useRenderCount);

    expect(result.current).toBe(1);
  });
});
